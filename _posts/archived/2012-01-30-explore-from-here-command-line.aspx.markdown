---
layout: post
title: "Explore From Here - Command Line"
date: 2012-01-30 -0800
comments: true
disqus_identifier: 1764
tags: [GeekSpeak,Code Snippets]
---
I'm [a big fan of the "command prompt here" context menu
extensions](/archive/2007/11/20/command-prompt-here-round-up.aspx) for
Windows Explorer. I use them all the time. Sometimes, though, I need to
go the other-way-around.

**That is, I'm at a command prompt and I want Windows Explorer open at
the current location of my prompt.**

`explorer %CD%`

Pretty simple, but super helpful. I had one of those "man, I'm stupid"
moments when I put two-and-two together on this.

I ended up making a little batch file "explore.bat" and stuck it in my
path.

    @echo off
    echo Opening Explorer on %CD%
    explorer %CD%

So now it's just "explore" at the prompt and magic happens. (Yes, I do
realize it's only five characters shorter, but I also get a nice little
echo message to tell me what's going on, plus I don't have to remember
it anymore.)

Note you can get some slightly different functionality if you use [some
of the command line switches for Windows
Explorer](http://support.microsoft.com/kb/130510), but for me, this
works.

