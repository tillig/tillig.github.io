---
layout: post
title: "CR_Documentor - The Documentor Plug-In for DXCore"
date: 2004-11-15 -0800
comments: true
disqus_identifier: 695
tags: [downloads,dotnet,vs,coderush]
---
**UPDATE:**[**CR_Documentor has found a new home on Google Code.**](http://code.google.com/p/cr-documentor/)**Head over there to get the latest version and updated information.**

Lutz Roeder, a fantastic developer of ultra-helpful tools, took his "Documentor" application - which allowed a developer to preview what XML document comments would look like rendered into end-user documentation - down from [his site](http://www.aisto.com/roeder/dotnet/). He was nice enough to send me the source for it, though, so I've converted it into a Visual Studio tool window add-in via the rich plug-in framework offered by the Developer Express, Inc. package, DXCore (which also supports CodeRush for Visual Studio .NET).

This plug-in allows you to see a preview of your XML document comments - a la Roeder's original Documentor - real-time, as you edit the comments in Visual Studio.

![CR_Documentor at work - click to enlarge](http://cr-documentor.googlecode.com/svn/site/screenshots/window_in_vs.png)

 CR_Documentor offers the ability to choose the level of tags you want
to be "compatible" with, the manner in which "unrecognized" tags are
handled, and other formatting options.

![CR_Documentor Options - click to enlarge](http://cr-documentor.googlecode.com/svn/site/screenshots/options_dialog.png)

CR_Documentor also offers context-menu support to aid in working with XML documentation comments, including inserting templates, embedding selections in templates, toggling outlining on XML doc comments, and toggling visibility of the CR_Documentor window.

Installation is as easy as copying a DLL into a folder. The included readme.txt outlines installation, usage, and workarounds for known issues.

**UPDATE:**[**CR_Documentor has found a new home on Google
Code.**](http://code.google.com/p/cr-documentor/)**Head over there to
get the latest version and updated information.**
