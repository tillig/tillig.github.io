---
layout: post
title: "Gotcha With DNX Dependency Resolution, the 'dotnet' Target Framework, and PCL"
date: 2015-10-20 -0800
comments: true
tags: [dotnet,aspnet,build,autofac]
---
We recently released [Autofac 4.0.0-beta8-157](https://www.nuget.org/packages/Autofac/4.0.0-beta8-157) to NuGet to coincide with the DNX beta 8 release. As part of that update, we re-added the classic PCL target `.NETPortable,Version=v4.5,Profile=Profile259` (which is `portable-net45+dnxcore50+win+wpa81+wp80+MonoAndroid10+Xamarin.iOS10+MonoTouch10`) because older VS versions and some project types were having trouble finding a compatible version of Autofac 4.0.0 - they didn't rectify the `dotnet` target framework as a match.

If you're not up on the `dotnet` target framework moniker, Oren Novotny has some great articles that help a lot:

- [Demystifying PCLs, .NET Core, DNX and UWP (Redux)](http://oren.codes/2015/06/16/demystifying-pcls-net-core-dnx-and-uwp-redux/)
- [Targeting .NET Core](http://oren.codes/2015/07/29/targeting-net-core/)

I'm now working on a beta 8 compatible version of [Autofac.Configuration](https://github.com/autofac/Autofac.Configuration). For beta 7 we'd targeted `dnx451`, `dotnet`, and `net45`. I figured we could just update to start using Autofac 4.0.0-beta8-157, rebuild, and call it good.

Instead, I started getting a lot of build errors when targeting the `dotnet` framework moniker.

```
Building Autofac.Configuration for .NETPlatform,Version=v5.0
  Using Project dependency Autofac.Configuration 4.0.0-beta8-1
    Source: E:\dev\opensource\Autofac\Autofac.Configuration\src\Autofac.Configuration\project.json

  Using Package dependency Autofac 4.0.0-beta8-157
    Source: C:\Users\tillig\.dnx\packages\Autofac\4.0.0-beta8-157
    File: lib\dotnet\Autofac.dll

  Using Package dependency Microsoft.Framework.Configuration 1.0.0-beta8
    Source: C:\Users\tillig\.dnx\packages\Microsoft.Framework.Configuration\1.0.0-beta8
    File: lib\dotnet\Microsoft.Framework.Configuration.dll

  Using Package dependency Microsoft.Framework.Configuration.Abstractions 1.0.0-beta8
    Source: C:\Users\tillig\.dnx\packages\Microsoft.Framework.Configuration.Abstractions\1.0.0-beta8
    File: lib\dotnet\Microsoft.Framework.Configuration.Abstractions.dll

  Using Package dependency System.Collections 4.0.11-beta-23409
    Source: C:\Users\tillig\.dnx\packages\System.Collections\4.0.11-beta-23409
    File: ref\dotnet\System.Collections.dll

  (...and some more package dependencies that got resolved, then...)

  Unable to resolve dependency fx/System.Collections

  Unable to resolve dependency fx/System.ComponentModel

  Unable to resolve dependency fx/System.Core

  (...and a lot more fx/* items unresolvable.)
```

This was, at best, confusing. I mean, in the same target framework, I see these two things together:

```
  Using Package dependency System.Collections 4.0.11-beta-23409
    Source: C:\Users\tillig\.dnx\packages\System.Collections\4.0.11-beta-23409
    File: ref\dotnet\System.Collections.dll

  Unable to resolve dependency fx/System.Collections
```

So it _found_ System.Collections, but it _didn't find_ System.Collections. Whaaaaaaa?!

After a lot of searching (with little success) I found [David Fowler's indispensible article on troubleshooting dependency issues in ASP.NET 5](http://davidfowl.com/diagnosing-dependency-issues-with-asp-net-5/). This led me to the `dnu list --details` command, where I saw this:

```
[Target framework .NETPlatform,Version=v5.0 (dotnet)]

Framework references:
  fx/System.Collections  - Unresolved
    by Package: Autofac 4.0.0-beta8-157

  fx/System.ComponentModel  - Unresolved
    by Package: Autofac 4.0.0-beta8-157

  (...and a bunch more of these...)


Package references:
* Autofac 4.0.0-beta8-157
    by Project: Autofac.Configuration 4.0.0-beta8-1

* Microsoft.Framework.Configuration 1.0.0-beta8
    by Project: Autofac.Configuration 4.0.0-beta8-1

  Microsoft.Framework.Configuration.Abstractions 1.0.0-beta8
    by Package: Microsoft.Framework.Configuration 1.0.0-beta8

  System.Collections 4.0.11-beta-23409
    by Package: Autofac 4.0.0-beta8-157...
    by Project: Autofac.Configuration 4.0.0-beta8-1

  (...and so on.)
```

**Hold up - Autofac 4.0.0-beta8-157 needs _both_ the framework assembly _and_ the dependency package for `System.Collections`?**

Looking in the generated `.nuspec` file for the updated core Autofac, I see:

```xml
<?xml version="1.0"?>
<package xmlns="http://schemas.microsoft.com/packaging/2012/06/nuspec.xsd">
  <metadata>
    <!-- ... -->
    <dependencies>
      <group targetFramework="DNX4.5.1" />
      <group targetFramework=".NETPlatform5.0">
        <dependency id="System.Collections" version="4.0.11-beta-23409" />
        <dependency id="System.Collections.Concurrent" version="4.0.11-beta-23409" />
        <!-- ... -->
      </group>
      <group targetFramework=".NETFramework4.5" />
      <group targetFramework=".NETCore4.5" />
      <group targetFramework=".NETPortable4.5-Profile259" />
    </dependencies>
    <frameworkAssemblies>
      <!-- ... -->
      <frameworkAssembly assemblyName="System.Collections" targetFramework=".NETPortable4.5-Profile259" />
      <frameworkAssembly assemblyName="System.ComponentModel" targetFramework=".NETPortable4.5-Profile259" />
      <frameworkAssembly assemblyName="System.Core" targetFramework=".NETPortable4.5-Profile259" />
      <frameworkAssembly assemblyName="System.Diagnostics.Contracts" targetFramework=".NETPortable4.5-Profile259" />
      <frameworkAssembly assemblyName="System.Diagnostics.Debug" targetFramework=".NETPortable4.5-Profile259" />
      <frameworkAssembly assemblyName="System.Diagnostics.Tools" targetFramework=".NETPortable4.5-Profile259" />
      <!-- ... -->
    </frameworkAssemblies>
  </metadata>
</package>
```

**The list of failed `fx/*` dependencies is exactly the same as the list of `frameworkAssembly` references that target `.NETPortable4.5-Profile259` in the `.nuspec`.**

**By removing the `dotnet` target framework moniker from Autofac.Configuration and compiling for _specific targets_, everything resolves correctly.**

What I originally thought was that `dotnet` indicated, basically, "I support what my dependencies support," which I took to mean, "we'll figure out the lowest common denominator of all the dependencies and that's the set of stuff this supports."

**What `dotnet` _appears to actually mean_ is, "I support the _superset_ of everything my dependencies support."**

The reason I take that away is that the [Microsoft.Framework.Configuration 1.0.0-beta8 package](https://github.com/aspnet/Configuration/tree/1.0.0-beta8) targets `net45`, `dnx451`, `dnxcore`, and `dotnet` - but it doesn't specifically support `.NETPortable,Version=v4.5,Profile=Profile259`. I figured Autofac.Configuration, targeting `dotnet`, would rectify to support the common frameworks that both core Autofac and Microsft.Framework.Configuration support... which would mean none of the `<frameworkAssembly />` references targeting `.NETPortable4.5-Profile259` would need to be resolved to build Autofac.Configuration.

Since they _do_, apparently, need to be resolved, I have to believe `dotnet` implies _superset_ rather than _subset_.

**This appears to mostly just be a gotcha if you have a dependency that targets one of the older PCL framework profiles.** If everything down the stack just targets `dotnet` it seems to magically work.

If you'd like to try this and see it in action, check out [the Autofac.Configuration repo at `14c10b5bf6`](https://github.com/autofac/Autofac.Configuration/tree/14c10b5bf6216b1bdfb1f5414105161eeba06f9f) and run the `build.ps1` build script.
