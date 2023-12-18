---
layout: post
title: "Web Part Context"
date: 2004-01-16 -0800
comments: true
disqus_identifier: 458
tags: [gists,sharepoint,csharp]
---
For those writing web parts for SharePoint Portal Server 2003 or Windows
SharePoint Services, you may want to determine what context your web
part is running in - is it WSS or SPS? I wrote a web part that had
optional use of Audiences in SPS, but I wanted it to work (and ignore
Audience settings) in WSS, too.

 Here's a static method to help you out.

```csharp
/// <summary>
/// Returns a Boolean indicating whether we're running in SharePoint Portal Server
/// or not.
/// </summary>
/// <returns>True if we're running in SPS; false otherwise.</returns>
public static bool ContextIsSPS()
{
    var assemblyInstance = (Assembly)null;
    try
    {
        // Try to bind to the Microsoft.SharePoint.Portal assembly.
        // If it isn't there, we're not in SPS.
        assemblyInstance = Assembly.LoadWithPartialName("Microsoft.Sharepoint.Portal");
        if (assemblyInstance != null)
        {
            // We've successfully bound to the assembly, so now let's try to determine
            // the current PortalContext.
            var oType = assemblyInstance.GetType("Microsoft.SharePoint.Portal.PortalContext");
            var oInfo = oType.GetProperty("Current");
            var result = oInfo.GetValue(null, null);
            if (result == null)
            {
                // SPS Installation, but WSS context
                return false;
            }
            else
            {
                // Running in SPS context
                // To determine SPS site URL:
                // PropertyInfo oSiteURLInfo = result.GetType().GetProperty("SiteUrl");
                // string siteurl = (string)oSiteURLInfo.GetValue(result,null);
                return true;
            }
        }
        else
        {
            // We couldn't bind to the Portal assembly, so we're not on an SPS box
            return false;
        }
    }
    catch (Exception err)
    {
        System.Diagnostics.Debug.WriteLine("ContextIsSPS(): Exception determining SPS context; returning FALSE.");
        System.Diagnostics.Debug.WriteLine(err.Message);
        return false;
    }
    finally
    {
        assemblyInstance = null;
    }
}
```
