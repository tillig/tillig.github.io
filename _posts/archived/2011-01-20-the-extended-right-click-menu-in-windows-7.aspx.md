---
layout: post
title: "The Extended Right-Click Menu in Windows 7"
date: 2011-01-20 -0800
comments: true
disqus_identifier: 1690
tags: [windows]
---
I'm probably the only person who didn't realize that if you hold down
Shift and right-click a folder in Windows 7, you get additional commands
that you don't normally see. For example, holding shift down when you
right-click a folder gives you an "Open command window here" option,
which obviates the need for [a "Command Prompt Here" power
toy](/archive/2007/11/20/command-prompt-here-round-up.aspx) (at least
for the basic prompt).

Thing is, I don't want to have to hold Shift down. I just want it there
all the time.

The "Open command window here" item is listed in your registry under
`HKCR\Directory\shell\cmd` and `HKCR\Drive\shell\cmd`. If you look in
those keys, you'll see a REG_SZ value called "Extended" that is
floating there without any actual value assigned.

![The "Extended" registry
value](https://hyqi8g.blu.livefilestore.com/y2pc9KHnJskvEqi072GsUUkOpfUj-dE--ueY92VO5FSjrlfK_BFzDmLWeq1VmA8bvE7L7WQCbtuYmeRg5g8WHs-6DtUiGXrwiiu9gg-D-8kvVQ/20110120extendedvalue.png?psid=1)

**If you delete that "Extended" value, then "Open command window here"
will always show up** and you don't have to hold Shift down. Conversely,
if you add a no-value "Extended" key to things, they'll stop showing up
until you hold Shift down.

And don't forget to look at both the Directory and the Drive registry
keys as mentioned above or you'll wonder why it shows up sometimes and
not in others.

**YMMV. This works for me, might not for you. I'm not responsible if you
delete something important and your machine comes crashing down around
you. You have to be extra careful when you muck with the registry.**

