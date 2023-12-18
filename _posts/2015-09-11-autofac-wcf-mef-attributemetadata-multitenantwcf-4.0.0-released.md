---
layout: post
title: "Autofac.Wcf, Autofac.Mef, Autofac.Extras.AttributeMetadata, Autofac.Multitenant.Wcf 4.0.0 Released"
date: 2015-09-11 -0800
comments: true
tags: [autofac,dotnet]
---

In the continuing journey toward the Autofac 4.0.0 release, some integration/extras packages have been released:

- [**Autofac.Wcf 4.0.0**](https://www.nuget.org/packages/Autofac.Wcf): Doesn't require `Autofac` 4.0 but is tested to be compatible with it. .NET 4.0 framework support is removed; minimum is now .NET 4.5. No interface changes were made - the major semver increment is for the .NET compatibility break. `AllowPartiallyTrustedCallers` and other pre-4.5 security markings are also removed.
- [**Autofac.Mef 4.0.0**](https://www.nuget.org/packages/Autofac.Wcf): Doesn't require `Autofac` 4.0 but is tested to be compatible with it. .NET 4.0 framework support is removed; minimum is now .NET 4.5. No interface changes were made - the major semver increment is for the .NET compatibility break. `AllowPartiallyTrustedCallers` and other pre-4.5 security markings are also removed.
- [**Autofac.Extras.AttributeMetadata 4.0.0**](https://www.nuget.org/packages/Autofac.Extras.AttributeMetadata): This is a **rename** from `Autofac.Extras.Attributed` to `Autofac.Extras.AttributeMetadata` to express what it actually attributes. Doesn't require `Autofac` 4.0 but is tested to be compatible with it. Requires `Autofac.Mef` 4.0 due to the security attribute changes and minimum .NET 4.5 requirement.
- [**Autofac.Multitenant.Wcf 4.0.0-beta7-223**](https://www.nuget.org/packages/Autofac.Multitenant.Wcf): The WCF component compatible with `Autofac.Multitenant` 4.0 beta. This will stay in beta until `Autofac.Multitenant` can also be fully released. This is a **rename** from `Autofac.Extras.Multitenant.Wcf` to match the rename of `Autofac.Extras.Multitenant` to `Autofac.Multitenant`. Requires `Autofac.Wcf` 4.0 due to the security attribute changes and minimum .NET 4.5 requirement.

There's a lot going on to try and keep up with DNX compatibility (where possible) and checking/testing existing integration packages to ensure they still work with Autofac 4. For the most part, it seems just updating things to use .NET 4.5 instead of .NET 4.0 allows us to retain forward-compatibility, though in some cases the code access security changes require changes.

We're working hard on it. [Watch our Twitter feed for announcements!](https://twitter.com/AutofacIoC)
