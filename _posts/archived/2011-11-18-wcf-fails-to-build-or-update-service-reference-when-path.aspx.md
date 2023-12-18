---
layout: post
title: "WCF Fails to Build or Update Service Reference When Path Too Long"
date: 2011-11-18 -0800
comments: true
disqus_identifier: 1752
tags: [dotnet,vs]
---
I was working yesterday on a solution in Visual Studio and noticed that
**every time I'd rebuild VS would report the build as failed... but
without any error messages**.

I thought it was just a fluke, but **then I had to update a service
reference**. When I tried, I got the following error message:

> **Could not resolve mscorlib for target framework
> ".NETFramework,v4.0". This can happen if the target framework is not
> installed or if the framework moniker is incorrectly formatted.**

I searched all over and verified the TargetFramework settings on every
project. No luck. Tried removing the service references so I could
re-create them. Got the error and couldn't remove the references.
Rebooted the computer, you know, because that's what you do. Still got
the error. At which point I was like...

![Fuuuuuuuuuuuu]({{ site.url }}/images/20111118fuuus.jpg)

**And then I found**[**this blog
entry**](http://wcfvs.blogspot.com/2011/04/could-not-resolve-mscorlib-for-target.html)**that
saved my life. I was hitting a maximum path length error.**

I'm on Windows 2008, not XP like in the article, but [MAX\_PATH is still
260
characters](http://msdn.microsoft.com/en-us/library/windows/desktop/aa365247%28v=vs.85%29.aspx#maxpath).
I was working on a project that was only about 100 characters deep, but
if you look at the files that VS generates when updating a service
reference, you see filenames that can be 100 characters long with the
fully qualified type name of the proxy type being generated and a suffix
of ".datasource" (e.g.,
"Some.Really.Super.Long.Namespace.That.May.Be.Inside.Your.Project.datasource").
All of that put together and I was bumping up against the max path
length.

**Moving my project closer to the root of my drive resolved the
issue**(*C:\\project* rather than
*C:\\dev\\project\\tasks\\taskname\\trunk* sort of depth) and I was able
to build again.

I'm guessing that something in there isn't using the Unicode path
extensions that would allow for a 32,767 character max path length.
Hopefully that will be fixed in the next VS... but I'm not holding my
breath.
