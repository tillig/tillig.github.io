---
layout: post
title: "iTunes for Windows - GEARSecurity Service Won't Start"
date: 2003-11-05 -0800
comments: true
disqus_identifier: 395
tags: [Media,GeekSpeak]
---
This is something that I think should go in the user-written FAQ area
for [iTunes](http://www.apple.com/itunes/) on the Apple site, but they
don't have one for [iTunes for
Windows](http://www.info.apple.com/usen/itunes/windows/), so I'll just
post it here.
 
 **Problem:** The GEARSecurity service won't start up automatically.
This can result in the inability to read/rip CDs as well as the ability
to burn a CD in iTunes for Windows. You may get a popup window when you
start iTunes for Windows that says something like "You have no
compatible hardware for CD reading/burning" or "The iTunes service for
importing and burning CDs and DVDs has not been started. Please restart
the service to enable burning and importing."
 
 **Solution:** One of two things could be going wrong here. First, check
to make sure the service called "GEARSecurity" is set to "Automatic"
startup. You can do that by right-clicking the "My Computer" icon,
selecting "Manage" from the options, and selecting "Services" from the
tree on the left-hand side. In the service listing, find "GEARSecurity"
and make sure it's set to "Automatic." Chances are it is.
 
 The other thing could be that iTunes for Windows 4.1.1 distributes an
*old version* of the GEARSecurity service that doesn't work quite right.
You may need to [download and install the latest GEAR driver
set](http://www.gearsoftware.com/support/index.cfm). That's what fixed
my problem, but I'll be damned if I didn't have to search deep in the
forums to find it.
 
 If it still doesn't work, you're hosed.
