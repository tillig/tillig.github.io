---
layout: post
title: "Dependency Versioning in Libraries and Applications"
date: 2017-09-07 -0800
comments: true
tags: [autofac,dotnet]
description: "Addressing an FAQ where users want libraries to update minimum dependencies to fix application-level warnings."
---

Time to address a frequently asked question I see with Autofac and many other open source libraries I use or work on:

**I've upgraded the (target framework/base libraries/build/.NET SDK version) for my application and now I see build warnings due to transitive dependencies. Why don't you upgrade the library dependencies to a later version to address an issue I see in my application?**

I see this a lot in the .NET Core realm, where use of many small dependencies rather than a big installed framework is a new thing. It's not so much a question in places like Node.js where the use of many small, chained dependencies has been around for a while.

What it boils down to is that **there's a difference in how you manage dependencies in libraries and applications.**

## Libraries Target Compatibility

When you have a library, you want to make sure it's stable and compatible for your consumers, both at the outset and across upgrades. People want the latest features and bug fixes, right? This means a lot of things including:

- **Interfaces need to be stable.** If you change an interface, people consuming your library may not be able to take the next update. That means for any public and protected interfaces and classes you have to be very mindful about changes.
- **Dependencies need to be stable.** If the library takes an update to a dependency, at a minimum that means anyone taking the next version of your library is forced to take an indirect update to the dependency. It may mean forcing a breaking change onto the library consumers who may be _directly_ referencing the dependency and can't take that update.
- **Target the lowest common denominator.** That means targeting the lowest version of the .NET Framework or [.NET Standard](https://docs.microsoft.com/en-us/dotnet/standard/net-standard) that you can. Lower target version means more compatibility. This also means targeting the lowest version of dependencies you can for the same reason - lower version means generally more compatibility, especially with folks who are already using the transitive dependency.
- **Keep the target framework stable.** Increasing that target [.NET Standard](https://docs.microsoft.com/en-us/dotnet/standard/net-standard) or framework version means the new version of the library may not be compatible with existing applications - people will be forced to update their applications or may just be locked out of using the new version of the library.

As you can imagine, any changes here can cause unforeseen ripple effects. Upgrading a dependency version may fix one issue but could cause downstream consumers problems you can't anticipate.

**The general rule for dependency/framework versions is to target low and keep it stable.**

## Applications Target Features

When you write an app, your largest concerns are the features you need and the target environment in which it's going to run. It means priorities shift as far as compatibility and upgrades are concerned.

- **If you need a new dependency feature, you can just take it.** If you see something new you need out of a dependency - a feature, a bug fix, whatever - you can take the upgrade when you want.
- **Breaking API changes are surfaced differently.** This may be a REST API, a command line argument interface, or a plugin abstraction, but bringing in a new application _dependency_ generally doesn't cause a breaking change for application consumers.

**Application dependencies generally don't end up affecting application consumers.**

## Addressing Library Dependency Scenarios

**By and large, when you see an issue with a transitive dependency coming into your application, the solution is to add a direct dependency in your application to the version you want.**

Some scenarios you may see in the .NET Core world to help make this concrete:

- **Security updates in .NET Core.** When security issues are detected in .NET Core base class/framework libraries, the way you resolve that in your application is to [manually take dependency updates to fixed versions](https://github.com/dotnet/announcements/issues/12). (This doesn't mean libraries _shouldn't_ take these updates, but it _does_ illustrate how application developers don't necessarily get to delegate that responsibility away.)
- **.NET Standard 2.0 Release.** When a new .NET Standard release is issued, that doesn't require every library to move to that release even if that's what your application targets. [If you look at how .NET Standard works](https://docs.microsoft.com/en-us/dotnet/standard/net-standard), a higher .NET Standard means more APIs are available to you, but it also means fewer _existing_ apps that target _lower_ .NET Standard versions are able to use your library. **You can consume _lower_ .NET Standard libraries in _higher_ targeting applications.** For example, a library may target .NET Standard 1.3 and you can totally consume that in your .NET Standard 2.0 app.
- **New dotnet SDK/CLI/build system.** If you upgrade your development/build systems to use a new dotnet SDK/CLI it can start generating warnings on your applications when it finds transitive dependencies that may be stale. The solution is to add a _direct_ reference to the later version of the stale dependency. The reason that's the solution is that _not everyone has updated to that latest version of the dotnet SDK/CLI_. Libraries need to maintain backward compatibility, so forcing the update may indirectly require consumers to upgrade parts of their development or build process that they're not ready or able to upgrade.

The point is that many of the challenges seen at the application level due to transitive dependencies can be solved by adding direct dependencies; those same challenges may not be solved in the same way at the library level.

## Wrapping It Up

Hopefully this helps clarify why _libraries_ you consume "don't just take a dependency upgrade" when you notice something in your _application_.

And, of course, a lot of this is generality. In some cases apps _can't_ just "take upgrades when they want" because customer environments may not support those changes. In some cases libraries _can_ make changes to public APIs or dependency versions and it doesn't hurt anything. There's no hard and fast rule, but basic understanding.

If this sort of discussion interests you, Nick Blumhardt has a similar post on his blog about [logging abstraction usage differences between libraries and applications](https://nblumhardt.com/2016/04/which-logging-abstraction-should-i-use/) - libraries use _abstractions_ (like `Microsoft.Extensions.Logging` or `LibLog`, applications use _implementations_ (like `Serilog` or `log4net`).
