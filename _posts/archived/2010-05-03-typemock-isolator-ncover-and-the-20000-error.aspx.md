---
layout: post
title: "Typemock Isolator, NCover, and the #20000 Error"
date: 2010-05-03 -0800
comments: true
disqus_identifier: 1635
tags: [net]
---
If you are running [Typemock Isolator](http://www.typemock.com) along
with another profiler like [NCover](http://www.ncover.com) and a crash
occurs (e.g., the parent build process gets killed), it has the
potential to corrupt the registry. What that means is that subsequent
operations when you link/unlink with your coverage profiler may not work
properly.

For NCover, you may see the build fail with exit code \#20000 and the
message **"NCover.Console is returning exit code \#20000. NCover
couldn't create a coverage report."** The reason it couldn't create a
coverage report is that Isolator and NCover weren't linked correctly so
NCover wasn't actually running.

**To fix it, repair your NCover installation.** This will fix the
corrupt registry keys and subsequent Typemock Isolator/NCover linkages
will work correctly.

Thanks to Ohad at Typemock, Alan at NCover, and Jamie Cansdale from
TestDriven.NET for helping me track this one down.

