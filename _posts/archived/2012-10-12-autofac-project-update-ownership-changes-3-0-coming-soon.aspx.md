---
layout: post
title: "Autofac Project Update - Ownership Changes; 3.0 Coming Soon"
date: 2012-10-12 -0800
comments: true
disqus_identifier: 1792
tags: [dotnet,autofac]
---
For those of you who use [Autofac](http://autofac.googlecode.com), I
thought I'd provide a bit of a project update to let you know what's
going on.

First, there's been a little shake-up in the project ownership role.
[Nick Blumhardt](http://nblumhardt.com/), original creator, will still
be working on the project as a committer but has stepped down as an
owner. [Alex Meyer-Gleaves](http://alexmg.com/) will remain an owner,
and **I've now been made a co-owner** with him. [Nick has posted a
formal announcement in the Autofac
newsgroup](https://groups.google.com/d/topic/autofac/_23kI_91VaE/discussion).
**Huge props to Nick for making such an awesome product**; I hope I can
help carry that forward with as much success.

Next, **we're working hard on the upcoming release of Autofac**, which
we'll be calling 3.0. The core Autofac assembly will be a [Portable
Class Library](http://msdn.microsoft.com/en-us/library/gg597391.aspx) so
we can support WinRT, Silverlight, and full .NET. That will potentially
mean a few small breaking changes, but it shouldn't be too bad to adjust
to. We'll be adding NuGet packages for all of the contributed projects
(which are now the "Autofac Extras"). Dependencies have been updated so
we'll link to more current releases. We're running down the issues list
to see if we can get as many resolved as possible before the final
release. And we've done a ton of updating to the build and static
analysis process so it's easier to work on, easier to extend, and adds a
lot more confidence to the shipping builds. I really think you'll like
it.

I anticipate **that should all be showing up Real Soon Now**. You can
follow the progress [on the Autofac
newsgroup](https://groups.google.com/forum/#forum/autofac).
