---
layout: post
title: "The Reinstall Proceeds"
date: 2004-07-17 -0800
comments: true
disqus_identifier: 620
tags: [personal,home,windows]
---
I ran into this ridiculous chicken-and-egg scenario while trying to
repair my Windows installation.

 See, the problem I was having was that the DVD-ROM drives (plural - two
different drives) would not read any media. I decided, [after jumping
through a bunch of
hoops](/archive/2004/07/17/dvd-drives-not-working.aspx), that it was
time to run the Windows repair. (I could do system restore until I'm
blue in the face; I don't know when the problem started, so I don't know
how far back I should go, or even if I still have a good restore point.
Bah.)

 Now, here's the real killer on the Windows repair: If the problem
you're having is with some sort of registry entry or driver thing, it
doesn't fix it. That is, it doesn't undo registry entries for you or
repair files it didn't put there in the first place. Normally I'd say
that's fine, but the problem seems to be that some driver(s) that some
other program put in there are not communicating nicely with the Windows
drivers. That means the registry needs to have entries related to the
bad driver(s) removed.

 It doesn't do that.

 Instead, it goes about making you *think* you can repair the install,
and when it finally reboots it comes back and says ["The file asms on
Windows XP Professional CD-ROM is
needed."](http://support.microsoft.com/default.aspx?scid=kb;EN-US;Q311755)

 That translates to: "I can't talk to your CD-ROM."

 The [Microsoft article on
this](http://support.microsoft.com/default.aspx?scid=kb;EN-US;Q311755)
says that in order to fix it (basically) you either have to edit the
registry or you need to install Windows on a different partition, boot
from that, and get your data off the disk.

 I have issue with this. I can't edit the registry because it won't let
me get to a spot in the installation where it allows for that. It boots
up, goes straight to setup - do not stop at GO, do not collect $200 -
and pops up the error. Safe mode doesn't work - it thinks it's in setup.
Command prompt doesn't work - it thinks it's in setup. Recovery console
doesn't work - you can't edit the registry from there. I don't have any
other partitions to install Windows to, so that's out.

 Basically, I'm screwed.

 So I reformatted using the built-in IBM restore function that puts all
of the hardware back to factory settings.

 Except that they forgot to put in the Intel INF stuff and it gets
confused when it loads up and sees all the devices I have (God forbid it
just detect and install them all) so it pretty much hosed stuff right
from the get-go.

 I tried installing a clean version of Windows except I think the
version I got from the IBM factory was a volume license version - the
sticker on the side of the machine (with the license and serial number
and all that) has a Windows XP Pro key... but my Windows XP Pro disc
tells me it's not valid (which is bullshit, otherwise why did I pay for
it?).

 So I've unplugged all of the unnecessary devices (didn't remove
internal stuff) and I'm back to trying the IBM restore route. I'm in the
process of downloading all of the drivers they forgot so I can burn them
to a disc on my work laptop and get them over to my home machine.

 Assuming the DVD drives finally decide to work, that is.

 This is *exactly* what I wanted to be doing this weekend. Reinstalling
Windows. Because I don't get enough of this sort of tedium elsewhere in
my life.
