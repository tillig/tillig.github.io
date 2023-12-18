---
layout: post
title: "Working with Windows Identity Foundation in ASP.NET MVC"
date: 2011-02-01 -0800
comments: true
disqus_identifier: 1693
tags: [dotnet,gists,aspnet,csharp]
---
If you've worked with [Windows Identity Foundation](http://msdn.microsoft.com/en-us/security/aa570351), you'll find it very nearly mandates that you implement a passive security token service using classic ASP.NET web forms rather than MVC. It doesn't lend itself well to testability, and in some cases it writes content directly to the response stream without you being able to govern when/how that happens.

All is not lost, though. Here are a couple of helpers and tips when working with Windows Identity Foundation in ASP.NET MVC to create a passive STS.

[![Programming Windows Identity Foundation](http://ecx.images-amazon.com/images/I/41C3nO4WGgL.PC_SY200_.jpg)](http://www.amazon.com/dp/0735627185?tag=mhsvortex)**First, drop what you're doing and go buy a copy of**[***Programming Windows Identity Foundation* by Vittorio Bertocci**](http://www.amazon.com/dp/0735627185?tag=mhsvortex)**.** The documentation on WIF is surprisingly thin and this book is like the lost set of docs that makes everything clear. Will it directly help you specifically with ASP.NET MVC and WIF? No, but it will help you to understand what is going on with WIF so you know where you may need to insert yourself. It'll also explain how things are supposed to work, so when you're setting it up in MVC you can tell if things are going right or not.

[**Reflector**](http://www.red-gate.com/products/dotnet-development/reflector/)**is your friend.** I am not condoning that you copy/paste anything out of the WIF assemblies, but using Reflector to figure out what it's doing is key.

For example, in WIF samples and in the WIF STS template you'll see a call to `FederatedPassiveSecurityTokenServiceOperations.ProcessSignInRequest` followed closely by `FederatedPassiveSecurityTokenServiceOperations.ProcessSignInResponse`. The `ProcessSignInResponse` method takes in an `HttpResponse` rather than an `HttpResponseBase`, which removes you from the ability in your MVC controller to use the System.Web abstractions for testability. However, if you look at what `ProcessSignInResponse` is actually doing, it's just taking the `SignInResponseMessage` that comes from `ProcessSignInRequest` and then it's writing it out to the response stream. You can do the same thing yourself in your controller using the controller's `Response` property and `HttpResponseBase`, allowing you to break that tie to the concrete System.Web classes.

**Make use of model binding.** In the STS template, the Default.aspx page they provide has a big if/then block that switches on query string parameter values to determine which WS-Federation action the incoming message has. Rather than that, wouldn't it be better to have a controller action that looks like this?

```csharp
// This ostensibly replaces Default.aspx in the STS template
public class DefaultController : Controller
{
  public ActionResult Index(WSFederationMessage message)
  {
    if(message.Action == WSFederationConstants.Actions.SignIn)
    {
      // Do your signin processing
    }
    // ...and so on; alternatively you could switch on message.Action.
  }
}
```

That, of course, assumes you have a model binder that will look at the incoming query string and parse a `WSFederationMessage` out of it. That's not too hard to do, and we can pretty easily add support for the derived `WSFederationMessage` types to it, too, like `SignInRequestMessage`.

```csharp
using System;
using System.Web.Mvc;
using Microsoft.IdentityModel.Protocols.WSFederation;

namespace MyNamespace.ModelBinders
{
  public class WSFederationMessageBinder : IModelBinder
  {
    public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
    {
      if (controllerContext == null)
      {
        throw new ArgumentNullException("controllerContext");
      }
      if (bindingContext == null)
      {
        throw new ArgumentNullException("bindingContext");
      }

      try
      {
        var message = WSFederationMessage.CreateFromUri(controllerContext.HttpContext.Request.Url);
        if (!bindingContext.ModelType.IsAssignableFrom(message.GetType()))
        {
          throw new WSFederationMessageException();
        }
        return message;
      }
      catch (WSFederationMessageException ex)
      {
        bindingContext.ModelState.AddModelError("", ex);
        return null;
      }
    }
  }
}
```

You can then register that model binder for the various WS-Federation
message types at app startup:

```csharp
var binder = new WSFederationMessageBinder();
ModelBinders.Binders[typeof(WSFederationMessage)] = binder;
ModelBinders.Binders[typeof(AttributeRequestMessage)] = binder;
ModelBinders.Binders[typeof(PseudonymRequestMessage)] = binder;
ModelBinders.Binders[typeof(SignInRequestMessage)] = binder;
ModelBinders.Binders[typeof(SignOutRequestMessage)] = binder;
ModelBinders.Binders[typeof(SignOutCleanupRequestMessage)] = binder;
```

Now you can actually do the controller action the way you'd like, with a strongly-typed `WSFederationMessage` parameter and it will work.

Of course, if you look at the Default.aspx in the WIF STS template, it throws an UnauthorizedAccessException if a WS-Federation message comes in and isn't a sign-in or sign-out request. You can do the same thing declaratively in MVC using an authorization filter. That would change your controller action to look more like this:

```csharp
[RequireWSFederationMessage(AllowedActions = WSFederationMessageActions.SignIn | WSFederationMessageActions.SignOut)]
public ActionResult Index(WSFederationMessage message)
{
  // ...handle the message...
}
```

Something like that, where you could allow specific message actions to pass through, otherwise the user is seen as "unauthorized."

**Create a filter attribute for ensuring only proper message types are allowed through.** First you'll need that `WSFederationMessageActions` enumeration so you can specify what's allowed and what's not.

```csharp
using System;

namespace MyNamespace.Filters
{
  [Flags]
  public enum WSFederationMessageActions
  {
    All = WSFederationMessageActions.Attribute | WSFederationMessageActions.Pseudonym | WSFederationMessageActions.SignIn | WSFederationMessageActions.SignOut | WSFederationMessageActions.SignOutCleanup,
    Attribute = 1,
    SignIn = 4,
    SignOut = 8,
    SignOutCleanup = 16
  }
}
```

Yes, I could have just calculated the result of the "or" operation for the "All" but this way if any values change, I don't need to mess with "All." Do it your way if you're not cool with this.

Next, the filter attribute:

```csharp
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Microsoft.IdentityModel.Protocols.WSFederation;

namespace MyNamespace.Filters
{
  [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, Inherited = true, AllowMultiple = true)]
  public sealed class RequireWSFederationMessageAttribute : FilterAttribute, IAuthorizationFilter
  {
    // Lookup table for converting string actions to the associated flag
    private static readonly Dictionary<string, WSFederationMessageActions> _actionLookup = new Dictionary<string, WSFederationMessageActions>()
    {
      { WSFederationConstants.Actions.Attribute, WSFederationMessageActions.Attribute },
      { WSFederationConstants.Actions.Pseudonym, WSFederationMessageActions.Pseudonym },
      { WSFederationConstants.Actions.SignIn, WSFederationMessageActions.SignIn },
      { WSFederationConstants.Actions.SignOut, WSFederationMessageActions.SignOut },
      { WSFederationConstants.Actions.SignOutCleanup, WSFederationMessageActions.SignOutCleanup },
    };


    public WSFederationMessageActions AllowedActions { get; set; }

    private object _typeId = new object();
    public override object TypeId
    {
      get
      {
        return this._typeId;
      }
    }

    public RequireWSFederationMessageAttribute()
    {
      // Default to allowing all actions.
      this.AllowedActions = WSFederationMessageActions.All;
    }

    public bool IsAllowed(string action)
    {
      if (
        String.IsNullOrWhiteSpace(action) ||
        !_actionLookup.ContainsKey(action)
      )
      {
        return false;
      }
      var enumAction = _actionLookup[action];
      return (this.AllowedActions & enumAction) == enumAction;
    }

    public void OnAuthorization(AuthorizationContext filterContext)
    {
      if (filterContext == null)
      {
        throw new ArgumentNullException("filterContext");
      }

      WSFederationMessage message = null;
      // If you can't parse out a message or if the parsed message
      // isn't an allowed action, deny the request.
      if (
        !WSFederationMessage.TryCreateFromUri(filterContext.HttpContext.Request.Url, out message) ||
        !this.IsAllowed(message.Action)
        )
      {
        filterContext.Result = new HttpUnauthorizedResult();
        return;
      }
    }
  }
}
```

Now you have a filter attribute that will check to make sure the incoming message is of an expected type and will deny access if it's not.

**Hopefully some of this will help you get working with WIF in ASP.NET MVC.** It'd have been nice if MVC had been considered in the initial rollout of WIF, but no such luck. I don't even see a [Connect](http://connect.microsoft.com) page for accepting suggestions. Fingers crossed for the next release...!
