---
layout: post
title: "VisualMake 3.0"
date: 2004-09-02 -0800
comments: true
disqus_identifier: 653
tags: [GeekSpeak]
---
I got a copy of [VisualMake
3.0](http://www.xtras.net/products/visualmake.asp) from the [Xtras.Net
Developer Network](http://www.xtras.net/XDN/) (which is cool - you
should join) and played around with it.
 
 Hmmm.
 
 Right now I use [NAnt](http://nant.sourceforge.net/) to automate my
build processes. It's a pretty flexible tool, and while it does require
you script (rather than having some GUI to drag and drop tasks or
organize the thing - hey, there's a cool product idea... a real GUI
editor for NAnt scripts, but something easier - and cheaper - than
[NAntpad](http://www.nantpad.com/)), it's also pretty accommodating and
flexible.
 
 I was hoping VisualMake might be a good, GUI alternative. If not for
corporate/work projects, at least for my home stuff.
 
 No dice.
 
 I [posted a review on it at
Xtras.Net](http://www.xtras.net/products/visualmake.asp#reviews), but
the long and the short of it is that VisualMake would be great for some
straightforward builds, but it doesn't seem to know Visual C++ projects
(.vcproj), nor does it know setup projects (.vdproj). It also can't open
web projects via a URL, so you have to manually find those and add
them.
 
 In VisualMake's defense, NAnt doesn't do web projects, either, so it's
not like it's missing functionality; I just figure when you're
graphically adding a solution (drag and drop) that includes web
projects, a good GUI should automatically add them for you... at a
minimum, it should determine if the project is on your local machine and
start looking in the IIS metabase for the physical location. VisualMake
doesn't do that.
 
 It does have some nice features, and I think for large Windows or
console applications, this would be cool. Solutions that have a lot of
dependencies and all generate .DLL files. I, unfortunately for
VisualMake, don't work in that world. All of my solutions have one or
more web projects, a setup project... none of which works well with
VisualMake.
 
 Guess I'll be sticking with NAnt.
