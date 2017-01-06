---
layout: post
title: "Windows Home Server Storage Upgraded"
date: 2010-01-07 -0800
comments: true
disqus_identifier: 1603
tags: [media,windows]
---
I found I was running out of space with all of my DVDs and such, even
after [adding an eSATA port
multiplier](/archive/2009/02/04/increase-your-windows-home-server-capacity-with-esata.aspx)
and a few 1TB drives. I only have one drive slot left, and while at
first I thought I'd fill it, I realized that doesn't leave me much
wiggle room in the event of a real emergency where I need to do some
fancy drive swapping. As such, I decided to replace one of the 500GB
drives with a 2TB drive. The 500GB drive I took out will stand ready as
a replacement for the system drive should catastrophe strike.

I started the upgrade with about 750GB free because I wanted to be sure
there was enough free space to remove the 500GB drive without losing any
data.

Post upgrade, I have **a total of 7.73TB in storage with 2.08TB free**.

[![My WHS storage screen - click to
enlarge.](https://hyqi8g.bl3302.livefilestore.com/y2pMQr2pyNZZWHYotLyosKGqHs4iQM2Lp2zZH2_su2baS6HaVpYtg5gh9JuJ9TNwPpCjeXN8YdZfcW-FSNGjGAtatvssgn8i79tMWiieTxyny8/20100104whsstorageexpan.png?psid=1 "My WHS storage screen - click to enlarge.")](https://hyqi8g.bl3302.livefilestore.com/y2pMQr2pyNZZWHYotLyosKGqHs4iQM2Lp2zZH2_su2baS6HaVpYtg5gh9JuJ9TNwPpCjeXN8YdZfcW-FSNGjGAtatvssgn8i79tMWiieTxyny8/20100104whsstorageexpan.png?psid=1)

Given that [I've figured DVD images run about 6.7GB
each](/archive/2009/05/06/finished-ripping-movies.aspx), that gives me
room for another 300 DVDs before I run out of space. Of course, when I
hit a bit over 1TB free, I'll have to consider what my upgrade options
are in case I need to remove a 1TB drive to replace it with something
larger.

**UPDATE 1/9/2010**: Turns out I got a bad drive. The first night it was
in I got a bunch of errors from WNAS.SYS telling me something about "VRM
temperature too high." Doesn't make a ton of sense, but that's what
happened. Anyway, that first night it totally disappeared from the
storage pool, as if by magic. The second night I decided to re-seat it
(thinking "bad connection") [and run chkdsk on all
drives](http://social.microsoft.com/Forums/en-US/whsfaq/thread/b5372407-1f24-4eff-9092-069c4b4f0cee).
Got the WNAS errors again and a bunch of disk errors, so... back it
goes. Most of my drives are Western Digital and the drive I tried out
was a Samsung. Being a little technology-superstitious, I'll probably
get a WD drive as a replacement.

**UPDATE 1/15/2010**: I put a Western Digital Caviar Green 2TB drive in
and I'm back up to 7.73TB. So far I'm not seeing any of the weird
WNAS.SYS errors I was seeing before which leads me to believe I had a
bad drive. Every other drive in the system, save the system drive, is a
WD Caviar Green drive, and I've had good luck with them, so I'm hoping
my luck will hold.

**UPDATE 1/16/2010**: I see the WNAS.SYS temperature warning errors
again, but it appears that [so many in succession is generally
understood to be some sort of bug in the
driver](http://www.mediasmartserver.net/forums/viewtopic.php?f=2&t=1102&start=420)
rather than a health issue. The system didn't restart itself or
anything, so I guess I'll just watch it. One thing I found while I was
looking for the solution to the WNAS.SYS issue is [this article over on
the HP site that says how Samsung SpinPoint drives will suddenly
"disappear" from the
system](http://h10025.www1.hp.com/ewfrf/wc/document?docname=c01368548&tmp_task=solveCategory&lc=en&dlc=en&cc=us&lang=en&product=3548164)
and it's a compatibility issue. As it turns out, that's the type of
drive I ordered that failed - [a Samsung SpinPoint
2TB](http://www.newegg.com/Product/Product.aspx?Item=N82E16822152202).
Looks like the WNAS.SYS error and the drive failure were unrelated. I'm
still watching how this WD drive behaves. I can ignore false errors in
the logs (though it's fishy that they show up when I add a 2TB drive -
maybe I'm crossing some size boundary that causes the bug to show up?),
but if a drive "disappears" on me, that's trouble. I'll probably wait a
week or so before putting any additional info on the server that might
make it so I can't remove the drive.

**UPDATE 6/16/2010**: Be careful of using the WD Green drives. [Only
some model numbers appear to be
good](/archive/2010/06/16/beware-the-wd-green-drives.aspx).

