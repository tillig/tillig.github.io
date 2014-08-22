---
layout: post
title: "Autofac 3.0 Released"
date: 2013-01-30 -0800
comments: true
disqus_identifier: 1806
tags: [.NET,Release Notices]
---
The final version of [Autofac](https://autofac.googlecode.com) 3.0.0 is
released and you can [get it on
NuGet](https://nuget.org/packages/Autofac) or download [directly from
Google Code](https://code.google.com/p/autofac/downloads/list).

If you're upgrading from 2.6, the big changes are:

-   NuGet packages for everything - you can get core Autofac, the
    integrations, and the extras, all on NuGet.
-   Symbol/source packages are deployed to
    [SymbolSource](http://www.symbolsource.org/Public) so you can debug
    into the source.
-   New integration with
    [MVC4](https://nuget.org/packages/Autofac.Mvc4),
    [WebAPI](https://nuget.org/packages/Autofac.WebApi), and
    [SignalR](https://nuget.org/packages/Autofac.SignalR).
-   Autofac core is now a Portable Class Library that can work on the
    full .NET stack, Windows Store apps, Silverlight 5, and Windows
    Phone 8 apps.
-   AutofacContrib projects are now Autofac.Extras (namespace and
    assembly name change).

There are also **a ton of issues resolved** and we're working on
enhancing [the wiki docs](https://code.google.com/p/autofac/wiki/). The
[Release Notes](https://code.google.com/p/autofac/wiki/ReleaseNotes)
page on the Autofac wiki has the detailed list of changes.

Huge thanks to [Alex Meyer-Gleaves](http://alexmg.com/) for all the work
he does (and managing the release process!) and to [Nicholas
Blumhardt](http://nblumhardt.com/) for getting Autofac going.

