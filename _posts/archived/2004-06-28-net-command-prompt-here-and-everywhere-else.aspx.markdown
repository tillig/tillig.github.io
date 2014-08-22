---
layout: post
title: ".NET Command Prompt Here... and Everywhere Else!"
date: 2004-06-28 -0800
comments: true
disqus_identifier: 599
tags: [Software / Downloads,Release Notices,.NET]
---
**NOTE: Something you may be interested in is [the Command Prompt Here
Generator](http://app.paraesthesia.com/CommandPromptHere/).**

I got a comment on [my Solvent
entry](/archive/2004/06/25/solvent---power-toys-for-visual-studio-.net.aspx)
about how a VS.NET command prompt would be a handy thing to have on the
right-click menu.
 
 I guess I assumed everyone developing had already fixed their default
command prompt so it's ALWAYS a VS.NET command prompt. I find I have
little use for a command prompt that doensn't have all of the VS.NET
environment stuff set up on it.
 
 For those who haven't, and figured it'd be nice, here's the registry
hack that will automatically run the vsvars32.bat file when you get a
command prompt. Note that there is a similar article out there
advocating the use of the "/k" option to run the file. I don't use that;
instead, I use the "AutoRun" registry key so regardless of how you
access the command prompt - even if you do a Start -\> Run and type
"cmd" and click OK - you'll always get a VS.NET command prompt. (It'll
even fix it so if you have the [Command Prompt Here power
toy](http://www.microsoft.com/windowsxp/downloads/powertoys/xppowertoys.mspx)
installed, that command prompt is a VS.NET command prompt, too.)
 
 It looks like this:
 
`Windows Registry Editor Version 5.00  [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Command Processor] "AutoRun"="\"%VS71COMNTOOLS%vsvars32.bat\""`
 
 Or you can download a text file with that already set. Rename it to
have a ".reg" extension, then merge it with your registry.
 
 [Download
vsnetcmd.reg](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!44172&authkey=!ABZAAm6rmWX6L90&v=3&ithint=photo%2cgif)
