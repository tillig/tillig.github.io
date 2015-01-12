---
layout: post
title: "Where Are The .NET Installer Improvements?"
date: 2007-09-17 -0800
comments: true
disqus_identifier: 1268
tags: [net,vs]
---
As new releases of .NET and Visual Studio come out, I find there's
something really missing from them.

Installer technology improvements.

Sure, there's
[ClickOnce](http://msdn2.microsoft.com/en-us/library/t71a733d(VS.80).aspx). 
Sure, there are new and interesting ways to deploy web projects.  But
I'm talking about better, simpler ways to create good old "setup.exe." 
Where are those improvements?  Does it bother anyone else that there's
never been a really good, supported way to build .vdproj files except
through Visual Studio directly?

The community seems to have settled on one of three options:

-   Build .vdproj using devenv.exe from a command line.
-   Use [WiX](http://wix.sourceforge.net/) instead of .vdproj.
-   Skip MSI altogether and look at some other install technology like
    [InstallShield](http://www.macrovision.com/products/installation/installshield.htm)
    or [NSIS](http://nsis.sourceforge.net/) or something.

I sort of feel like the lack of attention to making this easy (like,
officially supported by MSBuild) is one of those glaring holes in
functionality the way, oh, *almost everything* glares at me from
[Sandcastle](http://blogs.msdn.com/sandcastle/).

Here's my proposal for the Visual Studio team:

-   Lose the .vdproj project format.
-   Use WiX in Visual Studio and have a converter from .vdproj to WiX.
-   Enable MSBuild to build WiX.

I'm positive there are glaring problems with my simple proposal, not the
least of which is that WiX is a whole separate product (with its own VS
add-in to enable IDE support), but the premise holds.  It doesn't look
like WiX has a lot of churn; maybe integrate it into VS/MSBuild the same
way Apple uses [WebKit](http://webkit.org/) for Safari and still
releases "official updates."  Something.  Just make it *better*.

