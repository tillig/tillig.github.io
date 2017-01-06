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
the C++ formats like IMPLEMENT_OLECREATE so someone will have to tell
me if what I'm doing is messed up) and it lets you create multiple GUIDs
at once. The entire output gets copied to the clipboard, too, so if you
just generated 15 GUIDs and you need to paste them into a file, you
don't have to copy each individually or generate 15 separate GUIDs.

![GuidGenConsole
Help](https://cloud.githubusercontent.com/assets/1156571/21691848/23635fac-d32f-11e6-990c-b2601f42437d.png)

 I didn't bother even including a readme or anything with this because
it's dead simple.

[**Download GuidGenConsole
2.0.0**](https://github.com/tillig/GuidGenConsole/releases/tag/v2.0.0)
[**Download GuidGenConsole 2.0.0
Source**](https://github.com/tillig/GuidGenConsole/archive/v2.0.0.zip)
