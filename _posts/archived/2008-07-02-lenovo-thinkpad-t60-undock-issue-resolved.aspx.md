---
layout: post
title: "Lenovo ThinkPad T60 Undock Issue Resolved"
date: 2008-07-02 -0800
comments: true
disqus_identifier: 1405
tags: [GeekSpeak]
---
I have a Lenovo/IBM ThinkPad T60 at work with a docking station. For the
longest time, I'd get this error when trying to undock:

> You cannot eject your computer because one of the devices in the
> docking station, "Printer Port (LPT1)," cannot be stopped because a
> program is still accessing it.

For the life of me, I couldn't figure out what the problem was. I don't
have any printers hooked up, I hadn't printed anything, I couldn't find
anything that was using the port.

There's [a KB article on it](http://support.microsoft.com/?kbid=330833),
and I found [forum posts about
it](http://forums.lenovo.com/lnv/board/message?board.id=T_Series_Thinkpads&message.id=4636),
but no real solutions. The way I solved it:

In the BIOS at boot time, there is an option for disallowing access to
the printer port from the docking station. I set that. (There is an
option to disable the printer port entirely, but I didn't need to do
that - I just needed to stop the docking station from accessing it.) A
quick save and reboot, and I'm ready to eject from the docking station
at any time - no more error.

Note that I don't have any printers locally attached to my machine, so
disabling the printer port connection to the docking station didn't hurt
me. If you have a local printer attached to your docking station, this
may not be the best solution for you.

**UPDATE**: I am on ThinkPad T60 BIOS version 2.21 and the option is
under Config -\> Docking Station. Set the "Legacy Devices on Mini Dock"
setting to "Disabled" to disallow the docking station access to the
parallel port.

