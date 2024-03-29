---
layout: post
title: "Conditionally Getting Audience Information"
date: 2004-01-21 -0800
comments: true
disqus_identifier: 468
tags: [gists,csharp,sharepoint]
---
Okay, so, like, what happens if you're writing a web part that you want
to work on both Windows SharePoint Services *and* SharePoint Portal
Server? First, [you have to determine the web part's
context](/archive/2004/01/16/web-part-context.aspx) - are you running in
WSS or SPS? Doing that, you can conditionally display things like input
fields for audience information, etc. (I dwell on audience stuff because
that seems to be the biggest thing that I'd like to use in my web parts
yet still want to use the parts on WSS, which doesn't support
audiences.)

 The problem is, if you determine that you are running in SharePoint
Portal Server and then start calling objects in the
Microsoft.SharePoint.Portal namespace, that works great on the SPS box,
but gives you compile-time binding errors on WSS. What to do?
System.Reflection to the rescue. Late bind to the assemblies and use the
System.Reflection namespace to call methods and properties on your
late-bound objects.

That sounds like a big pain, and it is. That's why I'm helping you out
by putting up some code here:

```csharp
/// <summary>
/// Gets the list of audience names and GUIDs for the current site
/// </summary>
/// <returns>
/// A SortedList object where the keys are the audience names (string)
/// and the values are the audience GUIDs (System.Guid)
/// </returns>
public SortedList GetAudienceAndGuidList()
{
    var audList = new SortedList();
    var assemblyInstance = Assembly.LoadWithPartialName("Microsoft.SharePoint.Portal");
    if (assemblyInstance != null)
    {
        // We're working on a SharePoint Portal Server, or a WSS site on a server with SPS
        // Get the current portal context
        var portalContext = assemblyInstance.GetType("Microsoft.SharePoint.Portal.PortalContext");
        var currentContextProperty = portalContext.GetProperty("Current");
        var currentContext = currentContextProperty.GetValue(null, null);
        if (currentContext != null)
        {
            // We have a portal context, so we're on SPS
            // Get the types we'll be working with
            var audMgrType = assemblyInstance.GetType("Microsoft.SharePoint.Portal.Audience.AudienceManager");
            var audCollType = assemblyInstance.GetType("Microsoft.SharePoint.Portal.Audience.AudienceCollection");
            var audType = assemblyInstance.GetType("Microsoft.SharePoint.Portal.Audience.Audience");
            // Create the AudienceManager object
            var audMgr = audMgrType.InvokeMember(null,
                BindingFlags.DeclaredOnly | BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.CreateInstance, null, null, new object[] { currentContext });
            // Call the Audiences property to get the collection of audiences from the AudienceManager
            var audColl = (IEnumerable)audMgrType.InvokeMember("Audiences", BindingFlags.DeclaredOnly | BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.GetProperty, null, audMgr, null);
            // Get the name and GUID for each audience and put them in the collection
            foreach (var aud in audColl)
            {
                try { var audName = (string)audType.InvokeMember("AudienceName", BindingFlags.DeclaredOnly | BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.GetProperty, null, aud, null); var audGuid = (Guid)audType.InvokeMember("AudienceID", BindingFlags.DeclaredOnly | BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.GetProperty, null, aud, null); audList.Add(audName, audGuid); }
                catch (Exception exc)
                {
                    // If there are any problems, don't add the audience to the list
                    System.Diagnostics.Debug.WriteLine("EXCEPTION getting audience and guid list: " + exc.Message);
                }
            }
        }
    }
    return audList;
}

/// <summary>
/// Uses System.Reflection to late-bind to the Microsoft.SharePoint.Portal assembly and determine if
/// a user is a member of an audience.
/// </summary>
/// <param name="username">The username of the person to look up</param>
/// <param name="audienceID">The audience ID to check membership for</param>
/// <returns>True if the user is a member of the specified audience; false otherwise</returns>
public bool UserIsMemberOfAudience(string username, Guid audienceID)
{
    var assemblyInstance = Assembly.LoadWithPartialName("Microsoft.SharePoint.Portal"); if (assemblyInstance != null)
    {
        // We're working on a SharePoint Portal Server, or a WSS site on a server with SPS
        // Get the current portal context
        var portalContext = assemblyInstance.GetType("Microsoft.SharePoint.Portal.PortalContext"); var currentContextProperty = portalContext.GetProperty("Current"); var currentContext = currentContextProperty.GetValue(null, null); if (currentContext != null)
        {
            // We have a portal context, so we're on SPS
            // Get the types we'll be working with
            var audMgrType = assemblyInstance.GetType("Microsoft.SharePoint.Portal.Audience.AudienceManager");
            // Create the AudienceManager object
            var audMgr = audMgrType.InvokeMember(null, BindingFlags.DeclaredOnly | BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.CreateInstance, null, null, new object[] { currentContext });
            // Call the IsMemberOfAudience method to determine audience membership
            var userIsMember = false; var isMemberOfAudienceArgs = new object[] { username, audienceID }; try { userIsMember = (bool)audMgrType.InvokeMember("IsMemberOfAudience", BindingFlags.DeclaredOnly | BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.InvokeMethod, null, audMgr, isMemberOfAudienceArgs); }
            catch (Exception err)
            {
                // Do nothing
                System.Diagnostics.Debug.WriteLine("EXCEPTION determining audience membership:\n" + err.Message);
            }
            return userIsMember;
        }
        else
        {
            // We're working in WSS, which doesn't have audiences, so we'll assume that everyone
            // is a member of every audience.
            return true;
        }
    }
    else
    {
        // We're working in WSS, which doesn't have audiences, so we'll assume that everyone
        // is a member of every audience.
        return true;
    }
}
```
