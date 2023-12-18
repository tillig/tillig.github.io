---
layout: post
title: "What To Do If &quot;Copy Local&quot; Works In VS But Not MSBuild"
date: 2008-02-13 -0800
comments: true
disqus_identifier: 1350
tags: [dotnet,vs]
---
I'm in the process of updating a bunch of old Visual Studio 2003
projects and solutions to, well, something a little newer. I found this
odd behavior issue where there were some references that were marked to
as "Copy Local" and that would work fine in a Visual Studio build, but
when run from MSBuild, the references weren't getting copied correctly,
which would cause unit tests to fail and such because things weren't
where they should be.

A little Googling led me to [this forum
post](http://forums.microsoft.com/MSDN/ShowPost.aspx?PostID=2344232&SiteID=1)
which basically boils down to:

> Go through your projects in a text editor and look for references with
> `<Private>` tags in them. Like `<Private>True</Private>` or
> `<Private>False</Private>`. "Private" is a synonym for "Copy Local."
> Somewhere in the actions MSBuild is taking to locate dependencies,
> it's finding your dependency somewhere else and deciding not to copy
> it.

What I ended up donig is going through each converted .csproj file and
removing the `<Private>` tags manually. Rebuild, and everything works in
both Visual Studio and MSBuild. Once you've got that working, you can go
back in and update things to where you think they need to be, and when
things start failing, you'll know exactly where the problem is.
