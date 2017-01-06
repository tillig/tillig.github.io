---
layout: post
title: "Defragmenting Windows Home Server"
date: 2009-06-22 -0800
comments: true
disqus_identifier: 1542
tags: [media,windows]
---
I was noticing some of the disk access on my Windows Home Server was
running a bit sluggish and I thought about how usually when this happens
on other computers, I'll run a defrag... but since Windows Home Server
has a different filesystem, you can't really just do a stanard defrag,
can you?

Turns out, **there are Windows Home Server defrag products**.

The two that seem to be the most popular are [PerfectDisk
10](http://www.perfectdisk.com/products/home-perfectdisk10-windows-home-server/learn-more)
and [Diskeeper
2009](http://www.diskeeper.com/Diskeeper/home/homeserver.aspx). Both of
those have WHS-specific versions that integrate nicely with the WHS
console and understand that filesystem. [There's a great head-to-head
review of these products over at We Got
Served](http://www.wegotserved.com/2009/02/03/head-to-head-diskeeper-2009-home-server-vs-perfectdisk-10-for-windows-home-server/).
The end result? It's a tie - they are comparable products.

**I ended up choosing PerfectDisk** based on the price point. It
costs just over half of what Diskeeper costs ($50 vs. $80) and I found
this coupon code (*SUMMERFUN20* - expires June 30) [over at Philip
Churchill's site](http://mswhs.com/2009/06/18/defrag-whs-and-save-10/)
that got me $10 off that so I've got WHS defrag for $40. Can't beat
that.

UPDATE 1/26/2010: I noticed after about a couple of weeks of PerfectDisk
for WHS use that I was getting health warnings every three or four days
on my WHS system disk. At first I thought I was going to have to replace
the disk, but on a hunch I disabled defragmentation of the system drive.
While the warnings on the system drive stopped, I did get a warning on
another drive, so I disabled PerfectDisk on the WHS entirely. Since then
I haven't gotten any disk health warnings. I've run all the disks
through extensive diagnostics so I have to blame PerfectDisk for the
warnings. I'm going to post to their user community and see if anyone
else is having the same issue, but in the meantime, YMMV.

UPDATE 2/5/2010: I've started talking with PerfectDisk support about the
issues I'm seeing. [I'll keep updates running on the explanatory blog
entry](/archive/2010/02/05/working-through-perfectdisk-for-whs-issues.aspx).
