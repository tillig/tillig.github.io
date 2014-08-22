---
layout: post
title: "CR_JoinLines - Join Lines in Visual Studio Code Editor via DXCore"
date: 2005-08-30 -0800
comments: true
disqus_identifier: 878
tags: [Software / Downloads,Release Notices,.NET,Visual Studio]
---
**UPDATE: CR\_JoinLines has found a new home with the**[**DXCore
Community Plugins
project**](http://code.google.com/p/dxcorecommunityplugins/)**. Head
over there to get the latest and read more!**

****

I use [TextPad](http://www.textpad.com) for text editing and one of the
things I like a lot about TextPad is the Ctrl+J shortcut that allows you
to join selected lines to each other. Visual Studio doesn't offer that
line joining capability, so I decided to write it.
 
 CR\_JoinLines adds a command ("Join Lines") that you can bind to a
keyboard shortcut (Ctrl+J, Enter is what I use) and will join lines in
the code editor. It also allows for an optional delimiter, so if you
want a pipe or comma or some other string (yes, string - you're not
limited to a single character) inserted between the joined lines, you
can do that.
 
 ![CR\_JoinLines in
action](http://dxcorecommunityplugins.googlecode.com/svn/trunk/CR_JoinLines/screenshots/join_anim.gif)
 
 Installation is as easy as copying a DLL into a folder and adding the
keyboard shortcuts you want.
 
 [![DXCore Shortcuts Menu - Click for larger
version](http://dxcorecommunityplugins.googlecode.com/svn/trunk/CR_JoinLines/screenshots/shortcuts_sm.gif)](http://dxcorecommunityplugins.googlecode.com/svn/trunk/CR_JoinLines/screenshots/shortcuts_lg.gif)
 
 The included readme.txt outlines installation, usage, and workarounds
for known issues.
 
 Requires DXCore 1.1.58 or later ([DXCore is a **FREE** download from
Developer Express - go get
it!](http://www.devexpress.com/Downloads/NET/DXCore/)).
**UPDATE: CR\_JoinLines has found a new home with the**[**DXCore
Community Plugins
project**](http://code.google.com/p/dxcorecommunityplugins/)**. Head
over there to get the latest and read more!**


 **Version History:**
 **1.0.0.0830**: First release.
 **1.1.0.1012**: Added ability to provide Delimiter parameter to join
lines with a delimiter between each joined line.
 **1.1.1.0307**: Fixed issue where, in later versions of DXCore, joining
on selection functioned incorrectly.
