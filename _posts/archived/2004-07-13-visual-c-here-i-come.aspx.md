---
layout: post
title: "Visual C++, Here I Come!"
date: 2004-07-13 -0800
comments: true
disqus_identifier: 614
tags: [net,vs]
---
I'm working on some ideas to enhance
[Solvent](/archive/2004/06/25/solvent-power-toys-for-visual-studio-.net.aspx)
and I've realized that one of the things I want to do will require some
low-level shell programming.

 I hate low level shit.

 [Looking at
MSDN](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/shellcc/platform/shell/programmersguide/shell_intro.asp),
it seems that the only real way to do it is to use C++ (because of the
ridiculous amount of weird pointer stuff that's happening).

 I tried [pInvoking my way to freedom and
leisure](http://www.pinvoke.net/). There's only one problem with that:
When there are
[marshaling](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpguide/html/cpcontlbexpmemberconversion.asp)
issues, I'm not a COM person... I don't know how to fix them. I live in
a higher-level programming world: garbage collection and high-level data
structures and no fussing with memory allocation issues. It's been like
seven years since I've dealt with anything C or C++ related.

 Try as I might, though, I can't get myself quite
[DllImported](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpref/html/frlrfSystemRuntimeInteropServicesDllImportAttributeClassTopic.asp)
into the Windows Shell.

 As such, this weekend I went out and bought [*Visual C++ .NET - Step By
Step*](http://www.amazon.com/exec/obidos/ASIN/0735619077/mhsvortex). I'm
only on like the second chapter (no time!) but I've skimmed through the
rest.

 Lots has changed since I last worked with this stuff. ATL? Funky
reserved words (\_\_gc, \_\_value, etc.)? Maybe that's standard stuff
that has always been around, but then, I learned C++ in Solaris on SPARC
workstations, which means I read a little about MFC but never had
opportunity to use any of it.

 (By now, all of you VC++ people out there are shaking your heads. Gimme
a break; I'm [re]learning!)

 It'll be good to come up to speed on it; if anything, an interesting
exercise in crash-course style learning. Who knows... I might even read
the whole thing instead of just enough to get my project done. Heh.
