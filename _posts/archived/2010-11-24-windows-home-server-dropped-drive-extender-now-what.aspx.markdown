---
layout: post
title: "Windows Home Server Dropped Drive Extender - Now What?"
date: 2010-11-24 -0800
comments: true
disqus_identifier: 1682
tags: [media,windows]
---
A couple years back when I was researching storage solutions for [my
media
center](/archive/2008/09/30/overview-of-my-media-center-solution.aspx),
I [landed on Windows Home
Server](/archive/2008/08/25/windows-home-server-first-impressions.aspx)
because of a feature called "Drive Extender" that basically lets you put
a bunch of disks of different sizes into the server and have them create
One Big Volume. No need to deal with RAID or any super technical stuff
the average user doesn't understand. Plug and play. It's [one of my
favorite
features](/archive/2009/10/26/one-year-retrospective-with-windows-home-server.aspx)
and it's one of the primary reasons I settled on Windows Home Server.

From a features-I-use standpoint, there are really three key use cases
for me:

1.  **Storage**. Photos, music, videos, documents... just general
    storage. Being able to expand that easily and have some fault
    tolerance through the data duplication in Drive Extender is key.
2.  **Backup**. The ability to have my computers automatically backed up
    to a central location is really cool. It's a full disk image, too,
    so if anything goes south you can restore the complete machine, OS
    and all.
3.  **Media (DLNA) server**. Streaming pictures, videos, and music to
    devices on my network.

**It appears that the next version of Windows Home Server
has**[**dropped the Drive Extender
capability**](http://www.mediasmartserver.net/2010/11/23/microsoft-announces-removal-of-drive-extender-from-windows-home-server/)**.**
That's 1/3 of the reason I like my WHS. Technically, the media serving
capability of WHS is pretty limited, so [I use Asset
UPnP](/archive/2009/08/11/stream-more-music-from-windows-home-server-with-asset-upnp.aspx)
to handle music and the videos mostly get dealt with through file
sharing rather than DLNA... so that's 2/3 down, leaving the backup as
the key feature draw.

Looking at the next version of Windows Home Server (code name "Vail"),
even if they keep the backup feature in place, I don't think there's
compelling reason for me to upgrade. (Yes, [I voted to have them keep
Drive Extender in the next
version](https://connect.microsoft.com/WindowsHomeServer/feedback/details/624029/add-drive-extender-back-to-vail?wa=wsignin1.0),
but I'm guessing the decision's been made.) They could update the DLNA
server, but I'll put money down that it won't transcode Apple Lossless
music over the network so I'd still have to use something like Asset
UPnP to fill the gaps. Without the easy storage upgradeability... eh.
It's a file server. Not compelling.

**So now what?**

I ran into a bit of a reliability problem with some bad drives in my WHS
a while ago and went looking for a new storage solution. **I ended
up**[**getting a Synology
DS1010+**](/archive/2010/05/20/moving-to-a-synology-ds1010.aspx) to move
my DVD library to. It's **super stable** - I've not had to reboot it in
months - and the **expandability is easy**. It (along with several other
Synology products) have [a feature called "Synology Hybrid
RAID"](http://www.synology.com/us/products/features/Volume_Management.php)
that is, basically, Drive Extender. It "optimizes volume size when
combining hard disks of different sizes." That said, it also has full-on
RAID if you prefer to manage things that way. It [has a DLNA
server](http://www.synology.com/us/products/features/DLNA.php) (though
I've not had a chance to try it myself, I can't imagine it'd be any more
limited than the WHS v1 server). Really, the only thing it doesn't have
is full image-based backup, though [it will do data backup and
integrates with Apple Time
Machine](http://www.synology.com/us/products/features/backup_desktop.php).

There are also [a ton of other features that come
built-in](http://www.synology.com/us/products/features/index.php).

**Am I trying to sell you a Synology device? Not necessarily. I've just
had good luck with mine so far** and if I had to choose between that and
the new Windows Home Server, I'd probably end up with the Synology. It's
a little more expensive than some of the WHS offerings out there, but
you do seem to get what you pay for, at least in this case.

