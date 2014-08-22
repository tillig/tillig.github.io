---
layout: post
title: "WHS v1 End of Life – What’s Next?"
date: 2013-01-07 -0800
comments: true
disqus_identifier: 1799
tags: [GeekSpeak,Media]
---
Windows Home Server v1 is end of mainstream support tomorrow and some
folks have asked me what I'm going to do.

Options for switching include upgrading to WHS 2011, switching to
Windows Server 2012 Essentials, or moving off the Windows platform
entirely to something else.

If you've been following [my Media Center
solution](/archive/2008/09/30/overview-of-my-media-center-solution.aspx),
you'll know I have both [an HP MediaSmart Windows Home Server
v1](/archive/2008/08/25/windows-home-server-first-impressions.aspx) and
a [Synology
DS1010+](/archive/2010/05/20/moving-to-a-synology-ds1010.aspx).

I use the WHS for:

-   PC image-based backups
-   General file sharing
-   Image sharing
-   Music sharing (both via file system and [via UPnP using
    Asset](/archive/2009/08/11/stream-more-music-from-windows-home-server-with-asset-upnp.aspx)).
-   Windows 8 File History

I use the Synology DS1010+ for:

-   Storing DVD movie images
-   Serving the MySQL instance for my XBMC machines

Both machines have all drive bays full. The Synology doesn't have enough
space to hold all the stuff I have on the Home Server and the Home
Server can't hold all the stuff on the Synology. We're talking about
terabytes on both machines. Keeping that in mind, if I were to want to
change the OS on the WHS it'd require me to…

-   Move everything off the WHS to… somewhere.
-   Reformat and upgrade the OS on the HP MediaSmart box, which is older
    and not super-powerful. It's also headless (no video card and no DVD
    drive) so… that's pretty limiting. If there's any troubleshooting to
    do during the installation, that's going to be painful.
-   Hope against hope that the new OS won't tank the HP box into
    non-performance and that all the drivers are properly found.
-   If I go with Windows Server 2012 Essentials, I get to set up a
    domain for my home computers and go around joining everything so
    they can be backed up. If I go with WHS 2011, I will get the same
    backup functionality I'm used to. If I go with something else… I get
    to figure out my backup solution.
-   Move everything back to the WHS that was previously there and set
    all that junk up again.

If, instead, I moved everything to the Synology I'd need to upgrade all
the drives in the RAID array. It's RAID 5 so I can't do one at a time.
And I can't switch to a different RAID strategy (like the Hybrid RAID
they provide) without moving everything off the NAS and back on.

UGH. There was a time in my life where I had a bunch of time at home and
loved to tinker with things. Now… it takes me two nights to watch a
two-hour movie. I just want things to work.

**So what am I going to do?**

**Not a damn thing.**

I don't expose my WHS to the outside world so I'm not worried much about
the security aspect of things. I will probably run it until it dies. In
the meantime I'll slowly be moving things over to the Synology. I will
probably end up investing in the five-drive expansion bay for it so I
can add more drives in a new array. Then I can stock those drives up and
slowly but surely both expand storage and switch to the Hybrid RAID
approach. I'll also have to figure out my UPnP answer (I've admittedly
not tried the Music Station that Synology offers, but I hope it does
transcoding of, like, Apple Lossless and whatnot). And I'll have to
figure out the backup strategy; probably something like Acronis
TrueImage.

In the meantime… the plan is "no action."

