---
layout: post
title: "Increase Your Windows Home Server Capacity With eSATA"
date: 2009-02-04 -0800
comments: true
disqus_identifier: 1494
tags: [media,windows]
---
For [my media center
solution](/archive/2008/09/30/overview-of-my-media-center-solution.aspx),
I'm using [a Windows Home
Server](/archive/2008/09/08/two-weeks-in-with-windows-home-server-what-ive-learned.aspx)
as my primary storage for everything - music, photos, DVD images,
videos, computer backups... the whole shmear. I love it. I bought [the
1TB HP EX-475
model](http://www.amazon.com/gp/product/B000UXZUZC?ie=UTF8&tag=mhsvortex&linkCode=as2&camp=1789&creative=9325&creativeASIN=B000UXZUZC)
and [did a few upgrades](/archive/2008/09/28/home-server-upgrades.aspx),
adding memory and filling out the drive bays.

After ripping all of my movie DVDs to the server, I had about 470GB left

- plenty for music and photos, but not enough for me to rip my TV DVDs
to the server and have those available in the library.

I considered adding storage through USB drives, but they recommend only
plugging directly into the server's USB ports and not using a hub... and
there are only four ports. I know I'm going to use one of them soon for
off-site backups. So... how to add drives in a scalable fashion?

The answer: **Use the eSATA port on the back of the home server.**

I picked up a [Rosewill RSV-S5 5-bay eSATA port
multiplier](http://www.newegg.com/Product/Product.aspx?Item=N82E16816132015)
and two [1TB WD Caviar Green
drives](http://www.newegg.com/Product/Product.aspx?Item=N82E16822136317)
on a great sale at NewEgg. Plugged the drives into the port multiplier,
plugged the port multiplier into power, shut down the home server,
connected the port multiplier to the home server, and powered on the
port multiplier then the home server. No software to install, no fuss,
no muss. After adding the drives to the storage on the home server, I'm
up to 4.55TB total storage with 2.2TB free!

[![My WHS control panel: 4.55TB total, 2.2TB
free.](http://lh3.ggpht.com/_P1NCAbHEm2Q/SYpK7GLIVEI/AAAAAAAAAys/pmqoC6zQ2gU/s400/Increased%20WHS%20Space%20to%204.55%20TB.png.jpg)](http://picasaweb.google.com/lh/photo/Cs-OjiGRwqQcGYEvTilSSw?feat=embedwebsite)

The nice thing is I have three more eSATA bays free in the port
multiplier so I can easily continue expanding. Plus I haven't taken up
the USB ports yet so I still have all of that to go, too. An easy
upgrade that enables even easier future upgrades - you can't beat it.
Next to adding RAM, I'd say this is the most valuable thing you can do
to your home server.

**UPDATE 6/16/2010**: Beware the WD Green drives. [Only some of the
model numbers perform
well](/archive/2010/06/16/beware-the-wd-green-drives.aspx). I ended up
replacing some of the ones I had bought when I originally wrote this
post.
