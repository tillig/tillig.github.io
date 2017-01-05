---
layout: post
title: "GuidGenConsole - Generate GUIDs at the Command Line"
date: 2007-01-24 -0800
comments: true
disqus_identifier: 1134
tags: [downloads,vs,net]
---
For those who haven't jumped neck deep in
[PowerShell](http://www.microsoft.com/windowsserver2003/technologies/management/powershell/default.mspx),
it's a pain to generate GUIDs. That GuidGen app that comes with Visual
Studio is a pain.

 Everyone's chipped in their own three-line GUID command-line generator,
but I wrote one that fits my needs, so I figured I'd post it.

 How's it different? Mine emulates the formatting for all of the
available formats in standard GuidGen (though, admittedly, I don't use
the C++ formats like IMPLEMENT\_OLECREATE so someone will have to tell
me if what I'm doing is messed up) and it lets you create multiple GUIDs
at once. The entire output gets copied to the clipboard, too, so if you
just generated 15 GUIDs and you need to paste them into a file, you
don't have to copy each individually or generate 15 separate GUIDs.

 ![GuidGenConsole
Help](https://jushww.dm2303.livefilestore.com/y2pYM_08x-FaALV8csXmNY3eljq37DD1qcicF-lP7nHCbn6MJp6UFGCoC3OguIz2wQQRKrk4OcBY-I7Ojg5lPazcttaH2kExbShpfvY7BzF0xM/GuidGenConsole.png?psid=1)

 I didn't bother even including a readme or anything with this because
it's dead simple.

 [**Download GuidGenConsole
1.0.0.0**](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!44398&authkey=!APIvkVI-VUqrt1o&ithint=file%2c.zip)
 [**Download GuidGenConsole 1.0.0.0
Source**](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!44397&authkey=!AH24FhekaxlHPN8&ithint=file%2c.zip)
