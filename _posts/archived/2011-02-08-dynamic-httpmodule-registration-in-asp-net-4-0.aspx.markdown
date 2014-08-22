---
layout: post
title: "Dynamic HttpModule Registration in ASP.NET 4.0"
date: 2011-02-08 -0800
comments: true
disqus_identifier: 1698
tags: [.NET,Web Development]
---
I came across this trick while perusing the
[Autofac](http://autofac.googlecode.com) code base with the new MVC3
integration. You no longer have to register the HttpModule that disposes
of request lifetime scopes because they do it for you dynamically.
Figuring out how they did it revealed two really cool little tricks I've
not seen documentation on.

**Trick
\#1:**[**System.Web.PreApplicationStartMethodAttribute**](http://msdn.microsoft.com/en-us/library/system.web.preapplicationstartmethodattribute.aspx)

.NET 4 adds a new attribute that allows you to programmatically do
things just before application startup (that is, before
Application\_Start in your Global.asax). ASP.NET MVC3, for example, uses
this hook to register build providers for the Razor view engine so you
won't have to do it manually in web.config.

To use it, first create a static class with a static method in it that
contains your application startup logic. Be sure to guard against it
getting called twice by having a flag indicating if it was called (sort
of the way you track whether Dispose was called):

    namespace MyNamespace
    {
      private bool _startWasCalled = false;
      public static class PreApplicationStartCode
      {
        public static void Start()
        {
          if(!_startWasCalled)
          {
            _startWasCalled = true;
            // Do your startup logic here.
          }
        }
      }
    }

You don't have to call your class "PreApplicationStartCode," nor do you
have to call the method "Start," but that seems to be the convention.

Once you have that class and method, mark your assembly with the
attribute and point to your method:

    [assembly: PreApplicationStartMethod(typeof(MyNamespace.PreApplicationStartCode), "Start")]

When the application starts, the
`System.Web.Hosting.HostingEnvironment.Intialize()` method calls
`System.Web.Compilation.BuildManager.CallPreStartInitMethods()` (all of
that is internal, of course) and magic happens - your application
startup logic runs.

**Trick
\#2:**[**Microsoft.Web.Infrastructure.DynamicModuleHelper.DynamicModuleUtility.RegisterModule**](http://msdn.microsoft.com/en-us/library/microsoft.web.infrastructure.dynamicmodulehelper.dynamicmoduleutility.registermodule.aspx)

The Microsoft.Web.Infrastructure assembly seems to have [appeared along
with MVC3 and
WebMatrix](http://msdn.microsoft.com/en-us/library/gg549171%28v=VS.99%29.aspx).
The
[DynamicModuleUtility.RegisterModule](http://msdn.microsoft.com/en-us/library/microsoft.web.infrastructure.dynamicmodulehelper.dynamicmoduleutility.registermodule.aspx)
method is a ridiculously helpful and equally ridiculously undocumented
method that allows you to add an
[IHttpModule](http://msdn.microsoft.com/en-us/library/system.web.ihttpmodule.aspx)
to the request pipeline programmatically so you don't have to put an
entry into web.config. You just pass it the type of the IHttpModule
implementation and it gets added to the pipeline:

    DynamicModuleUtility.RegisterModule(typeof(MyNamespace.MyHttpModule));

The only catch is… you need to call it just before application startup.
(See where I'm going with this?)

Tie it together: Call DynamicModuleUtility.RegisterModule() from inside
PreApplicationStartCode.Start() and you can programmatically add
HttpModules to the request pipeline.

Pretty nifty, huh?

Again, I saw this first in the Autofac codebase, so props to [Alex
Meyer-Gleaves](http://alexmg.com/) (who added that code to the MVC3
support in Autofac) for figuring that one out.

