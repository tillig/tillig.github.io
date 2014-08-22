---
layout: post
title: "Elevation Power Toys and VS 2008 Admin Command Prompt Here"
date: 2009-03-12 -0800
comments: true
disqus_identifier: 1500
tags: [GeekSpeak,Software / Downloads,Visual Studio]
---
**NOTE: I'm no longer maintaining the Command Prompt Round-Up. Instead,
[visit the Command Prompt Here
Generator](/images/App/CommandPromptHere/).**

I won't lie - I've been doing most of my development up until now in
Windows XP (not by choice) and as I move into Windows Server 2008
territory, there are little gotchas I'm finding as I work as a non-admin
user. The one I ran into today is that our build script runs regsvr32 to
register and unregister NCover during the build (so different
products/projects can use different versions of NCover without having to
actually install them). That's only something an admin user can do.

The problem comes in when I right-click on a folder and choose "[VS.NET
2008 CMD Prompt
Here](/archive/2007/11/20/command-prompt-here-round-up.aspx)" - it's
running as me, not an administrator. Even if I do a
`runas /user:Administrator "msbuild default.msbuild"` from there it's
not doing what I want it to because the environment's not set up or
whatever. Point is, I needed "VS.NET 2008 **Admin** CMD Prompt Here" so
that's what I made.

I updated my ["Command Prompt Here"
Round-Up](/archive/2007/11/20/command-prompt-here-round-up.aspx) to
include "VS.NET 2008 Admin CMD Prompt Here" so you can download that and
away you go. It basically just does the `runas /user:Administrator`
before running vsvarsall.bat, but it works great from what I can tell.
YMMV.

Something else I found while I was searching to see if someone else had
already done this - the [Elevation Power Toys over on
TechNet](http://technet.microsoft.com/en-us/magazine/2008.06.elevation.aspx).
This is a gargantuan array of scripts and installers for everything from
"Command Prompt Here (as Administrator)" to "PowerShell Prompt Here (as
SYSTEM)" and more. It's well worth the time to check out - enough so
that I'm not replicating all of that in my own roundup. Go ahead and
grab those Power Toys. You'll be glad you did.

