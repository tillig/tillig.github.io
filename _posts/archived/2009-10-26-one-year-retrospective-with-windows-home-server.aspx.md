---
layout: post
title: "One Year Retrospective with Windows Home Server"
date: 2009-10-26 -0800
comments: true
disqus_identifier: 1578
tags: [media,windows]
---
A little over a year ago I was looking for a storage solution for [my
tags: [media]
center](/archive/2008/09/30/overview-of-my-media-center-solution.aspx)
and [landed on Windows Home
Server](/archive/2008/08/25/windows-home-server-first-impressions.aspx).
A year in, is it still all I thought it would be?

*Mostly.*

**The Good Bits:**

- **Expandability.** I've [upgraded the RAM in
    it](/archive/2008/09/28/home-server-upgrades.aspx) and [added a
    bunch of
    drives](/archive/2009/02/04/increase-your-windows-home-server-capacity-with-esata.aspx)
    to it. It just keeps getting bigger, and that's awesome. I don't
    have to mess with partitioning things or allocating space to this or
    that. It just works.
- **Computer Backup.** The fact it backs up all of the Windows
    computers on my network is great. It's almost worth the price for
    that peace of mind alone.
- **Redundancy.** The "file duplication" thing it uses to store two
    copies of a file on two physical spindles is great. I don't worry
    about a drive going out because I won't lose my important data.
- **Photo Sharing.** I can get to my photo library from anywhere -
    computer, Xbox 360, Playstation 3 - and it just works.
- **Appliance-Like Functionality.** Stick it in the corner, attach to
    network, plug it in, turn it on. It really is that simple and
    maintenance-free.

**The Decent Bits:**

- **Music and Video Sharing.** While the photo sharing works great,
    the whole DLNA/UPnP media sharing bit of Windows Home Server is
    built on Windows Media Connect, which is unacceptably old. To get
    newer music types working, you need [an additional plugin like Asset
    UPnP](/archive/2009/08/11/stream-more-music-from-windows-home-server-with-asset-upnp.aspx)
    or you need to be accessing the music like a file from a network
    share. Same thing for video sharing (though I've not found a plugin
    like Asset UPnP for video).
- **Online Backup.** Since Windows Home Server is built on Windows
    Server 2003 but has some differences to it, it's hard to find an
    online backup service for it that's affordable.
    [Mozy](http://www.mozy.com), for example, classifies it as a "server
    OS" so you have to pay the expensive business pricing for it... even
    if you're only storing the same stuff on there that you'd normally
    have on your PC. You end up either paying through the nose or
    [rigging up something to get around the backup
    restrictions](/archive/2009/08/17/backing-up-windows-home-server-to-mozyhome.aspx).

**The Not-So-Great Bits:**

- **File Access Time.** Streaming music or pictures works pretty well
    and I've seen no hiccups there. On the other hand, the original
    intent for this system was to [store and serve my DVD
    library](/archive/2008/09/12/how-to-set-up-a-dvd-library-in-windows-media.aspx).
    I've got [somewhere around 800 discs in my
    collection](http://www.invelos.com/dvdcollection.aspx/tillig)
    (considering a TV season might be six discs, give or take). With 100
  - 200 movies in there (which is where I was testing things), the
    speed is reasonable and except for a few network hiccups, you could
    play a full DVD image over the network to a Windows Media Center.
    Looked beautiful. You get 6TB of storage on that thing with 800 disc
    images on there and the file access time *tanks*. I thought my
    network was just getting bogged down or there was bandwidth trouble
    since I was seeing a ton of the little "hangs" where the picture and
    sound would freeze while watching a movie. I upgraded my network
    equipment and got no better result. It's totally file access time.
    As such, I'm going to have to [reinvestigate which video format to
    store my movies
    in](/archive/2008/09/23/choosing-a-format-for-your-dvd-library.aspx)
    and switch to something a little more
    network-and-file-access-time-friendly. Unfortunately I think that'll
    mean giving up some of the features I was hoping to keep (like the
    menus and "special features" videos).
- **Developer Resources.** I'm a developer and I've considered
    developing a plugin for Windows Home Server (not sure what, but
    thought it might be interesting) and... there's pretty much nothing
    out there on this. Not the major use case for people out there, but
    still - lame.

**Knowing all of that, would I still recommend a Windows Home Server?
Sure.** The good things far outweigh the bad things. The file access
time thing leaves me with a little egg on my face as far as my wife is
concerned, though. ("So we bought that and it's not working?") Seeing as
how the point was to get a functional video library and that's the part
that's failing right now... well, I've got some more work to do.
