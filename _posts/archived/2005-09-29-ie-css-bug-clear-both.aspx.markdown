---
layout: post
title: "IE CSS Bug: 'clear: both'"
date: 2005-09-29 -0800
comments: true
disqus_identifier: 897
tags: [GeekSpeak]
---
With the new look and feel, I've noticed that if I throw a picture in
there and align it to the right, sort of like I do in [some
entries](/archive/2005/09/28/supernanny.aspx), if the picture is longer
than the entry, you get some odd overlapping and such.
 
 I've tried to fix it, but IE's rendering engine just can't seem to
handle the CSS 'clear: both' directive correctly. That is, I tried to
say "each entry should clear on both sides so you don't get overlapping
entries," but when I do that, IE loads the page up then the top entry on
the page blinks out of existence until you scroll it off the screen,
then back on... then after a few seconds, it just blinks out of
existence again. Obvious rendering engine bug. (Works on Firefox just
fine, though.)
 
 Long and short of it is, I'm not sure if there's anything I can do
about the overlap in a browser-independent fashion (which is what I was
hoping to achieve). I'll keep plugging away at it, but for now, I'll
just have to watch my image sizes.
