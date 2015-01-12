---
layout: post
title: "Fusion Log Viewer Settings Changer"
date: 2004-10-20 -0800
comments: true
disqus_identifier: 681
tags: [Software / Downloads,Release Notices,net]
---
The Fusion Log Viewer (in pre-.NET-2.0) is a great tool but is a pain to
work with if you're working with ASP.NET apps. The built-in ASP.NET log
setting is
[useless](http://blogs.msdn.com/junfeng/archive/2004/02/14/72912.aspx),
which means if you're going to debug ASP.NET, you need to use the
[Custom](http://blogs.msdn.com/suzcook/archive/2003/05/29/57120.aspx)
setting. [MSDN talks about how to do
this](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cptools/html/cpgrffusionlogviewerfuslogvwexe.asp),
but I find I do one of two things, always:
 
1.  Enable logging in a custom folder (sometimes logging everything,
    sometimes logging only failures
2.  Disable logging to the custom folder (and, in most, if not all
    cases, logging of binding in general, including failures)


 
 To that end, I wrote a little script to handle that. From the command
line (available by running the script with a "/?" parameter):
> **FusLogVwSet**
>  This script "enables" and "disables" custom settings for the Fusion
> Log Viewer tool.
>  
>  Enabling settings will:
>
> -   Create a log folder (default: C:\\fusionlogs)
> -   Add HKEY\_LOCAL\_MACHINE\\SOFTWARE\\Microsoft\\Fusion\\LogPath and
>     set it to the log folder
> -   Set HKEY\_LOCAL\_MACHINE\\SOFTWARE\\Microsoft\\Fusion\\LogFailures
>     to 1
> -   Optionally set
>     HKEY\_LOCAL\_MACHINE\\SOFTWARE\\Microsoft\\Fusion\\ForceLog to 1
> -   Optionally set
>     HKEY\_LOCAL\_MACHINE\\SOFTWARE\\Microsoft\\Fusion\\LogResourceBinds
>     to 1
>
> 
>  Disabling settings will:
>
> -   Delete the log folder and its contents
> -   Delete HKEY\_LOCAL\_MACHINE\\SOFTWARE\\Microsoft\\Fusion\\LogPath
> -   Set HKEY\_LOCAL\_MACHINE\\SOFTWARE\\Microsoft\\Fusion\\LogFailures
>     to 0
> -   Set HKEY\_LOCAL\_MACHINE\\SOFTWARE\\Microsoft\\Fusion\\ForceLog to
>     0
> -   Set
>     HKEY\_LOCAL\_MACHINE\\SOFTWARE\\Microsoft\\Fusion\\LogResourceBinds
>     to 0
>
> 
>  Usage: FusLogVwSet.wsf [/enable] [/all] [/disable] [/logpath:value]
>  
>  Options:
>  
>  enable : Enable custom fuslogvw.exe settings.
>  all : When used with /enable, logs both failures and successes. Only
> valid with /enable.
>  disable : Disable custom fuslogvw.exe settings.
>  logpath : Sets the log path (default is C:\\fusionlogs). Only valid
> with /enable.


 If you use the Fusion Log Viewer to debug your .NET assembly bindings,
this is pretty handy stuff.
 
 Note that since it writes to your registry, you need rights to do that.
It'll fail if it can't write the appropriate keys.
 
 [**[Download
FusLogVwSet.wsf](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!45406&authkey=!AFKLuFqmu16o_iU&ithint=file%2ctxt)**]
 
 (Of course, no warranty, expressed nor implied... use at your own risk,
etc.)
