---
layout: post
title: "Running Ubuntu on the XO Laptop"
date: 2008-11-14 -0800
comments: true
disqus_identifier: 1465
tags: [GeekSpeak]
---
About a year ago now, [I participated in the "Give One, Get One" program
for the One Laptop Per Child
foundation](/archive/2007/11/14/bought-my-xo-laptop.aspx). As part of
that, I got one of the little XO laptops. They're neat little machines,
433MHz processors with 256MB RAM - not a lot of computing power, but fun
to play with.

I messed around with the Sugar OS for a while, but admittedly got a
little tired of it since there's not a lot you can do in it - it's an
educational item, after all, not a little netbook or something. To that
effect, it sat dormant in my office for a few months... until now.

I got the urge to get an alternate OS working on there so I could use
Firefox and browse the web - actually use it like a mini notebook for
light tasks. I found [some instructions on the OLPC
wiki](http://wiki.laptop.org/go/Ubuntu_On_OLPC_XO) that explain how to
get Ubuntu installed on the XO, but after trying several times, it just
wasn't working for me. I couldn't get past the step where you set up the
Ubuntu image using QEMU. The image would always boot poorly or, in some
cases, not at all... and, frankly, while I used to be a Linux guy, my
skills in that arena are a bit too rusty to adequately troubleshoot
those issues. Plus, the way they explain it, you're actually putting
Ubuntu right on the system - no going back to the original Sugar OS.

Thankfully, I found another set of instructions - [how to install Ubuntu
on an SD card and boot the XO from
that](http://sprocket.io/blog/2008/05/ubuntu-hardy-heron-on-the-olpc-xo-1/).
While the setup takes some time, it was super simple and worked like a
charm. Plus, it's non-destructive: if you mess anything up, you can
always just remove the SD card and you're back to Sugar OS.

I have my XO booting Ubuntu now and it's in the process of running
system updates. I'm excited to put it back to use! If you have an XO and
are interested in getting it running more interesting applications than
what's available on Sugar, [try booting Ubuntu from an SD
card](http://sprocket.io/blog/2008/05/ubuntu-hardy-heron-on-the-olpc-xo-1/).
It's worth it.

**UPDATES!**

I'm going to post updates to this entry as I get experience with the XO
using Ubuntu and include additional things you may want to do, or
gotchas you might run into.

-   **Make sure to read the comments on that blog article** that
    explains the SD card installation of Ubuntu. There are some things
    in there that you'll need to know or might help you out.
-   **Check out [this wiki entry about customizing Ubuntu on
    XO](http://wiki.laptop.org/go/Customizing_Ubuntu_for_XO).** It has a
    lot of things you might want to do to this base install.
-   **Change your hostname.** The default hostname for the installation
    is "OLPC" - a little generic, and if you have more than one at home,
    problematic. In order to do this, edit your `/etc/hostname` file to
    have your new hostname. Also, edit the `/etc/hosts` file, find the
    line in there for "OLPC," and replace "OLPC" with your new hostname.
    Yes, you have to do it in both places. Reboot and you're good.
-   **Some settings you change won't persist across reboots.** I think
    this boils down to my not understanding where various settings get
    updated. For example, the touch pad speed was super slow for me and
    no matter how many times I changed the setting in the control panel,
    it wouldn't persist the setting. Turns out there's a
    `.xfce4_startup` file in the OLPC user's home directory that
    specifies the mouse speed - and it overrides any setting you may
    have put in the control panel. You can change the mouse setting by
    modifying the `xset m 6/10 15` line to be something more
    appropriate. [According to the wiki
    entry](http://wiki.laptop.org/go/Customizing_Ubuntu_for_XO), this
    will differ based on your firmware verson. For me, `xset m 5 12`
    seems to work really well. I assume you could just remove the line
    and have it fall back to use the settings from the control panel...
    but I didn't try it.


