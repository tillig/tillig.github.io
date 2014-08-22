---
layout: post
title: "How Do Non-Geeks Survive?"
date: 2010-01-06 -0800
comments: true
disqus_identifier: 1602
tags: [GeekSpeak,General Ramblings]
---
In dealing with today's technology, I feel like I'm inundated with what
I usually refer to as "fiddly shit": constant, tiny maintenance tasks to
make sure things are still working together correctly. No one task is a
big deal; most take under five minutes to fix. Some are larger or more
chronic issues that require research and troubleshooting over the course
of weeks. Let me throw out some examples of recent issues:

[![D-Link DAP-1522 wireless access
point/bridge.](http://ecx.images-amazon.com/images/I/41M0l-KYzuL._SL500_AA200_.jpg "D-Link DAP-1522 wireless access point/bridge.")](http://www.amazon.com/gp/product/B001769K3O?ie=UTF8&tag=mhsvortex&linkCode=as2&camp=1789&creative=390957&creativeASIN=B001769K3O)
**Wireless networking at home.** I got Verizon FiOS and the router they
provide only does wireless-G networking. I wanted a faster network to
accommodate my gaming and my media, so I added a wireless-N access
point. This added a ton of fiddly shit to my list.

-   **Access point setup and maintenance.** I bought a
    [DAP-1522](http://www.amazon.com/gp/product/B001769K3O?ie=UTF8&tag=mhsvortex&linkCode=as2&camp=1789&creative=390957&creativeASIN=B001769K3O)
    for its supposedly easy setup. Setting the thing up was not nearly
    as straightforward as the instructions would have you think. Even
    now, once I have it set up, I find sometimes that it won't connect
    things at wireless-N speeds, dropping them back to wireless-G.
    Rebooting the access point (pulling the plug) sometimes fixes this,
    but also requires me to reboot anything that was previously
    connected to the network because for some reason things won't just
    reconnect.
-   **Conversion to WPA security.** There is also an undocumented
    "feature" on the DAP-1522 that makes it such that if you use WEP
    security the access point will not let you have wireless-N
    connectivity. Everything only ever connects at wireless-G. Not
    documented anywhere, mind you, so some time was spent on the phone
    to support for this. I was able to connect at N speeds after
    switching to WPA security... but I have devices (like a Nintendo DS)
    that only support WEP, so now I have to either support two different
    wireless networks (WPA with wireless-N via the access point and WEP
    with wireless-G via the FiOS router) or just not connect the old
    devices. Right now: no old devices.
-   **USB wireless adapters and Windows 7.** I upgraded everything to
    Windows 7 at home and while I love the OS, the drivers don't seem to
    be quite up to snuff for any of the USB wireless-N adapters I have.
    They work... mostly. I found that in some cases you have to install
    not only the driver but also the stupid "configuration utility" that
    the manufacturer provides and then things work, even if you don't
    use that utility or even ever open it. Also, if the computer goes to
    sleep and wakes up, it disconnects and reconnects to the network
    over the course of about the first minute after you log in. It's
    stable after that, but come on. Oh, and the wireless-N built-in
    adapter on my Dell Studio Hybrid just will not connect at N speeds,
    always preferring G. Still don't know what's up with that.

[![HP MediaSmart Home
Server](http://ecx.images-amazon.com/images/I/41n6JU45wRL._SL500_AA200_.jpg "HP MediaSmart Home Server")](http://www.amazon.com/gp/product/B002N8A098?ie=UTF8&tag=mhsvortex&linkCode=as2&camp=1789&creative=390957&creativeASIN=B002N8A098)
**Windows Home Server.** I love my Windows Home Server, don't get me
wrong, but there are some fiddly things that crop up.

-   **Random disk errors.** Every two or three months I'll get an error
    that says my system disk is having problems. I run the repair,
    everything checks out, and all is well with the world again for the
    next two or three months. Is it the weird disk replication thing
    they have going on? Is it PerfectDisk for Windows Home Server doing
    a disk defragmentation number on me? Disk actually going bad? Who
    knows.
-   **More random disk errors.** Since upgrading to Power Pack 3, I had
    a thing where every week or so the server would just stop responding
    to any requests at all. You ended up having to reboot the server
    hard and it would all come back. The lockup seemed to correspond to
    a scheduled task I had running on a client machine that would do a
    full directory listing of a really large set of files and archive
    the list. (My DVD library isn't duplicated, so if a drive dies and I
    lose files, at least I'll know what to re-rip.) Error log looked
    like it just stopped communicating with the eSATA port multiplier. I
    found some upgraded drivers and we'll see how that goes.

**Media sharing.** I've got [my media center
solution](/archive/2008/09/30/overview-of-my-media-center-solution.aspx)
that I'm working on and one of the biggest challenges is figuring out
what format the media should be in. DLNA spec supports some formats,
Windows Home Server supports some formats, Windows Media Center supports
some formats... but which is the right one for me? I'm lucky to have
found something like [Asset
UPnP](/archive/2009/08/11/stream-more-music-from-windows-home-server-with-asset-upnp.aspx)
that will transcode audio formats into something more universal, but
that's just audio. What about video?

**Video editing.** I got a Creative Vado HD for Christmas. I like the
recording capability but the little editor that comes with it is
severely lacking. If you don't want to use that editor, at least on
Windows, you're into something like Sony Vegas. But if you want to edit
the videos the Vado records, you have to figure out that [there's
another codec you have to
install](/archive/2009/12/31/support-h.264-in-sony-vegas-with-x264vfw.aspx).

My point on all this is that I'm a geek and I have the knowledge and
skills to at least know where to start to figure this sort of thing out.
What do the non-geeks do? Do they just give up and use everything out of
the box and accept the crappy limitations of the products and complain
they don't work? Do they get a geek friend/family member to just
continually come fix it?

I can see the appeal of things like the homogenous environment. If you
just give in and accept the box in which a specific brand (Apple, Sony,
whatever) places you, everything pretty much works together. If they
don't have a product that does what you want, well, it's just "not
possible" right now and you wait.

As I get older, I won't lie - this sort of thing appeals to me. I'm
tired of tweaking and fixing and fighting the fiddly shit that is
inherent with getting all this to work together. I don't mind investing
time in getting things set up and configured appropriately as long as I
don't have to keep adjusting and reconfiguring and troubleshooting. *I
just want it to work.* It should. Why doesn't it?

