---
layout: post
title: "Putting Controllers in Plugin Assemblies for ASP.NET MVC"
date: 2013-01-21 -0800
comments: true
disqus_identifier: 1803
tags: [net,gists,aspnet,csharp]
---
With [Autofac](https://autofac.googlecode.com) (particularly the multitenant extensions) I see a lot of questions come through that boil down to this:

**I have an ASP.NET MVC project. I have some controllers in a plugin assembly that isn't referenced by the main project. At application startup, I do some scanning and use Autofac to dynamically register the controllers. For some reason I get an error when I try to visit one of these controllers. How can I have a controller in a plugin assembly?**

[Shannon Deminick has a nice blog article](http://shazwazza.com/post/developing-a-plugin-framework-in-aspnet-with-medium-trust.aspx) that explains this in a different context - similar question, but the same answer.

The problem is that the default controller factory in ASP.NET MVC 3 and 4 (the latest version as of this writing) is really tied to the [BuildManager](http://msdn.microsoft.com/en-us/library/system.web.compilation.buildmanager.aspx). The BuildManager is the class that maintains the internal list of all the referenced application assemblies and handles ASP.NET compilation.

The [DefaultControllerFactory](http://aspnetwebstack.codeplex.com/SourceControl/changeset/view/c53dfc7ee085#src/System.Web.Mvc/DefaultControllerFactory.cs) in ASP.NET MVC, in the CreateController method, uses a [ControllerTypeCache](http://aspnetwebstack.codeplex.com/SourceControl/changeset/view/c53dfc7ee085#src/System.Web.Mvc/ControllerTypeCache.cs) internal type to locate the controller type being instantiated. The ControllerTypeCache uses another internal, [TypeCacheUtil](http://aspnetwebstack.codeplex.com/SourceControl/changeset/view/c53dfc7ee085#src/System.Web.Mvc/TypeCacheUtil.cs), to load the set of controllers from the list of referenced assemblies. TypeCacheUtil uses the [BuildManager.GetReferencedAssemblies()](http://msdn.microsoft.com/en-us/library/system.web.compilation.buildmanager.getreferencedassemblies.aspx) method to initialize that list. BuildManager.GetReferencedAssemblies() includes:

-   Assemblies that are referenced by the main web application.
-   Assemblies you list in the `<assemblies>` part of web.config.
-   Assemblies built from `App_Code`.

Note that none of those automatically include non-referenced, already-built plugin assemblies.

**You need to add your plugin assembly to the list of referenced assemblies in the BuildManager.**

You can do that in one of three ways.

**First, you can register the assembly in web.config.** This makes for a less "drop-in-an-assembly" plugin model, but it also means no code getting executed. If you put your plugins in a folder other than bin, you will also have to register that path. Here's a snippet showing a web.config with this sort of registration.

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <runtime>
    <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
      <!--
          IF you put your plugin in a folder that isn't bin, add it to the probing path
      -->
      <probing privatePath="bin;bin\plugins" />
    </assemblyBinding>
  </runtime>
  <system.web>
    <compilation>
      <assemblies>
        <add assembly="The.Name.Of.Your.Plugin.Assembly.Here" />
      </assemblies>
    </compilation>
  </system.web>
</configuration>
```

**Another alternative is to register your assemblies in code at PreApplicationStart.** This is the method outlined in Deminick's article in more detail. The idea is that you use the [PreApplicationStartMethodAttribute](http://msdn.microsoft.com/en-us/library/system.web.preapplicationstartmethodattribute.aspx) to bootstrap some assembly scanning and registration with the BuildManager (since that all has to happen before app startup).

Basically, you mark your main project assembly with the attribute and point to a class that has a static method that will do the auto-registration, like this:

`[assembly: PreApplicationStartMethod(typeof(Initializer), "Initialize")]`

Then you write your initializer class to do the assembly loading and registration with the BuildManager. Something like this:

```csharp
using System.IO;
using System.Reflection;
using System.Web.Compilation;

namespace MyNamespace
{
  public static class Initializer
  {
    public static void Initialize()
    {
      var pluginFolder = new DirectoryInfo(HostingEnvironment.MapPath("~/plugins"));
      var pluginAssemblies = pluginFolder.GetFiles("*.dll", SearchOption.AllDirectories);
      foreach (var pluginAssemblyFile in pluginAssemblyFiles)
      {
        var asm = Assembly.LoadFrom(pluginAssemblyFile.FullName);
        BuildManager.AddReferencedAssembly(asm);
      }
    }
  }
}
```

**A third way would be to create your own ControllerFactory implementation.** In your custom controller factory you could search your plugin assemblies for the controller types or use some other convention to determine which controller type to resolve. I don't have any sample code for that and there is a lot of work to accomplish that and get it right - supporting areas, properly handling the type resolution… If you go that route, and some people have, you'll have to go out searching for samples. I don't have any here to readily provide.

**I'd recommend one of the first two options.** They're the easiest and require the least "messing around with the framework" to get things working for you.

