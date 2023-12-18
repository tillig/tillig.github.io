---
layout: post
title: "Beware the WD Green Drives"
date: 2010-06-16 -0800
comments: true
disqus_identifier: 1650
tags: [media,windows,synology]
---
That headline sounds a little foreboding, but this is important: **If
you are expanding your storage at home, be careful of choosing WD Green
drives - only certain model numbers are good.**

A while ago [I upgraded my Windows Home Server
storage](/archive/2009/02/04/increase-your-windows-home-server-capacity-with-esata.aspx)
with an eSATA port multiplier and some 1TB WD Green drives. A few months
later [I added more storage in the form of a 2TB WD Green
drive](/archive/2010/01/07/windows-home-server-storage-upgraded.aspx).

During this time, I had installed PerfectDisk on the Windows Home Server
and was using that to defrag my drives. When running it, I'd get all
sorts of errors on random drives... but during regular day-to-day use,
there were no problems. I was pretty well [convinced this was a problem
with
PerfectDisk](/archive/2010/02/05/working-through-perfectdisk-for-whs-issues.aspx)
since that application was the only one causing issues. I couldn't have
PerfectDisk enabled for more than a couple of days before the server
would blue screen or hang and require a hard reboot.

After all of this trouble, I started losing faith in the reliability of
the server and [got a Synology DS1010+ to move my DVD images
to](/archive/2010/05/20/moving-to-a-synology-ds1010.aspx) - the primary
bulk of my data. While researching compatible drives for the DS1010+, I
found that there are [actually specific notes on their compatibility
list](http://www.synology.com/support/faq_show.php?q_id=130#three_n)
about certain model numbers of the WD Green drives testing well and most
others causing problems. There are [forum
posts](http://forum.synology.com/enu/viewtopic.php?f=151&t=19131) about
this as well.

Per these sources, **the only reliable WD Green model numbers are**:

- **2TB: WD20EADS-00R6B0**
- **1.5TB: WD15EADS-00R6B0**
- **1TB: WD10EADS-00L5B1**

I looked at my drives in my Windows Home Server and, sure enough, about
half of the drives were the "good" model numbers and half were "bad"
models. As part of the move to the DS1010+, **I reorganized the drives
in my Windows Home Server so only the "good" model numbers remained in
the system**.

**I've been running PerfectDisk on the Windows Home Server for a little
over two weeks now with no issue.**

There are a lot of factors in play here, to be sure.

- I moved the drives in the WHS around so they're in different slots
    than they originally were. If there was some sort of problem with a
    drive being seated incorrectly or a particular slot disagreeing with
    a particular drive, that may no longer exist.
- There are fewer drives in the eSATA port multiplier just because
    there are fewer drives in the system in general. If the port
    multiplier didn't like having so many drives in it, that issue may
    not be showing itself now.
- I moved several terabytes of data off the home server so the
    majority of the space there is empty. If the problem was with
    PerfectDisk managing drives that have very little free space, that
    may not be displaying now.

Even given all of that, it's hard for me to deny that my experience with
these drives is backed up by Synology testing and user experience, too.
It's not just me. Moving these drives out of my system seems to have
increased reliability quite a bit.

**YMMV, but my recommendation: Beware the WD Green drives.**
