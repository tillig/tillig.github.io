---
layout: post
title: "Error 1625 with Adobe Reader Update on Windows Server 2008 R2"
date: 2010-08-23 -0800
comments: true
disqus_identifier: 1663
tags: [windows]
---
I'm running Windows Server 2008 R2 as a non-admin user with User Account
Control turned on. The stupid Adobe Reader update thing pops up in the
corner saying "Update available" and when I tell it to install, I get:

> Error 1625: Update failed. Update not permitted by system policy.

Last time I fixed this by using
[Autoruns](http://technet.microsoft.com/en-us/sysinternals/bb963902.aspx)
and removing the Adobe Updater thing from the list of programs to run.
Of course, that means no updates unless I apply them manually, either.
Today I found [this forum
thread](http://forums.adobe.com/thread/674459?tstart=0) with the actual
answer:

1.  Open C:\\Program Files (x86)\\Common Files\\Adobe\\ARM\\1.0 in
    Windows Explorer.
2.  Right-click AdobeARM.exe and "Run As Administrator."
3.  When the "update available" balloon pops up in the corner, tell it
    to install. It should work now because it has the right permissions.

Done and done. Sort of annoying that Adobe hasn't fixed this but...
well, it is what it is.

