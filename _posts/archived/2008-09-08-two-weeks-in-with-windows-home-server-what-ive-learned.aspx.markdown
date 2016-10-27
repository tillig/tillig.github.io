---
layout: post
title: "Two Weeks In With Windows Home Server: What I've Learned"
date: 2008-09-08 -0800
comments: true
disqus_identifier: 1445
tags: [media,windows]
---
![HP MediaSmart
Server](http://ecx.images-amazon.com/images/I/51yjoKfxx2L._SL500_AA180_.jpg)It
was two weeks ago that [I picked up my Windows Home
Server](/archive/2008/08/25/windows-home-server-first-impressions.aspx)
and on the whole, I really do like it. Hanselman seems to like his, too,
and [his review helped a lot when I was getting things
going](http://www.hanselman.com/blog/ReviewHPMediaSmartWindowsHomeServer.aspx).
That said, there's a lot I wish I had known as I was setting things up,
so here's a rundown of some of the things I've learned.

**Initial Setup:**
 There's a lot more to setting it up than just plugging it in and
turning it on. The setup guide that comes with the server runs you
through some of that, but there's definitely some "follow the on-screen
instructions" detail-free action in that guide and it's nice to know
up-front what you're looking at. I found [a really nice online
description of the initial setup steps for the
server](http://computer2000.wordpress.com/2008/08/05/) that you'll want
to check out.

**Pre-Configured Shares:**
 There are pre-configured folders for sharing Video, Music, and
Pictures. If you go with the pre-configured defaults and just put the
things you want to share into the respective folders, life will be easy
for you. You can override these defaults and do your own thing, but
there's no real compelling reason to do that and it'll just be
difficult.

There are also pre-configured shares for software installation (like the
recovery CD contents in case your backed-up computers take a dive; and
Home Server add-ins) and each user that has an account on the machine.
Again, if you just accept the defaults, your life will be easier.

**Media Sharing is Through Windows Media Connect:
**The default media sharing is done through [Windows Media
Connect](http://en.wikipedia.org/wiki/Windows_Media_Connect). For the
most part, it works really well... unless your music is based in iTunes
and you have a lot of, say, Apple Lossless format music like I do. WMC
only supports a few formats and will filter out anything it can't stream
to a client (like your Apple Lossless music) so when you see the server
appear on your Playstation 3 or Xbox 360 and only half your music is
appearing, that's why.

The WMC limitations also affect video formats, so if you've got your
videos stored in the Videos folder and you're not seeing them on your
client, it's probably a video format issue.

You can potentially overcome some of these issues by using the PVConnect
add-in (see below) with the server, but I can't really tell. A better
solution is to run a real media server (like Windows Media Center) which
can handle a more robust set of media formats.

**PVConnect/TwonkyVision Add-In:**
 The HP MediaSmart Server comes with an add-in called "PVConnect" that
appears to have something to do with the [TwonkyMedia "TwonkyVision"
server](http://www.twonkyvision.de/). Honestly, I'm having a hell of a
time finding any real detail on it. The only concrete thing I can find
is that it will provide album art for your music (if the files have
album art) and will "transcode" your photos so they display properly on
whatever device is requesting them. Neither of these things are
compelling enough for me to want to install an add-in without knowing
what else is going on. It looks like there were some issues with it
working with Playstation 3, but you can do [a little manual hack to get
around
it](http://www.wegotserved.co.uk/2008/07/25/how-to-play-media-stored-on-your-playstation-3-with-windows-home-server-and-pvconnecttwonkymedia/).

I'd love for someone to tell me more about how this thing works and what
it does. If it'll enable Apple Lossless streaming, I'll totally install
it.

**iTunes Library Sharing:**
 The HP MediaSmart Server also comes with an "iTunes Library Sharing"
facility that is comprised of two parts: a client part, that reads in
your library/music info and copies it to the server; and a server part,
that streams the aggregated contents of the "Music" folder over the
network in iTunes format so you'll see it in iTunes as a shared library.

If you already store your iTunes music in the "Music" folder (like if
you're following [my multi-user iTunes
instructions](/archive/2005/04/10/multi-user-itunes.aspx) or if [you've
got iTunes generally set up to store your library on the
network](http://lifehacker.com/software/itunes/hack-attack-share-your-itunes-music-library-over-your-home-network-230605.php)),
you probably don't want the client part running. The problem is, it'll
see your iTunes library and then try to copy that again into the shared
"Music/iTunes" folder on the server. I've read a few horror stories
about duplicate copies of songs ending up in the share and confusing
things. The downside of not having the client portion running is that
you won't get your playlists to display in the shared library... but
maybe that's not a big deal. It's not for me. The client portion of
sharing is disabled by default.

[![iTunes sharing settings for the
client.](http://lh5.ggpht.com/travis.illig/SMU3vXR6d3I/AAAAAAAAAh8/i7vWxkuOGZY/s288/WHS%20-%20iTunes%20Client%20Settings.png.jpg)](http://picasaweb.google.com/lh/photo/AMkfO8Wl69mT4JANTFdbwQ)

The server portion of the iTunes shared library service works just like
[standard iTunes library sharing](http://support.apple.com/kb/HT2358) -
you can stream music from the shared library, you can listen to shared
playlists, but you can't add items from the shared library to your own
playlists or sync the content to your iPod. It will automatically add
anything in the shared "Music" folder into the shared library, even if
the content wasn't originally in iTunes. ("Adding it to the library"
means it'll add it to the list of things that can be streamed from this
shared library. It doesn't mean any files are getting moved around
anywhere.) This is enabled by default on the server.

[![iTunes sharing settings on the
server.](http://lh4.ggpht.com/travis.illig/SMU3viwwuMI/AAAAAAAAAiE/CLwCghXaPPk/s288/WHS%20-%20iTunes%20Server%20Settings.png.jpg)](http://picasaweb.google.com/lh/photo/sRcXp_a90y0qupOEahwmHg)

Since my goal here was more just to store the music on a central server,
not to have "shared library" content or whatever, I have both the client
and server portions of the iTunes music sharing component disabled.
If/when I do end up trying to get actual iTunes content with playlists
and all streaming across the network, I'll probably be looking at either
just using a Mac Mini as my media center PC or using
[MCETunes](http://www.mcetunes.com/) to get Windows Media Center to
recognize iTunes content. ([I've blogged about MCETunes
before.](/archive/2007/09/17/mce-tunes.aspx))

**RAM Upgrade:**
 A lot of folks online say you'll see a huge performance gain by
upgrading the 512MB RAM that comes with the MediaSmart server to 2GB. I,
personally, haven't run into any performance problems yet - it works
peachy keen with the 512MB. That said, if I do run into issues, [it
looks pretty simple to do the
upgrade](http://homeserver.netartifex.com), so I'll probably look into
it then.

**Photo Organization is Important:**
 The way Windows Media Connect shares photos, it actually exposes the
folder structure you store your photos in. If you've not been organizing
your photos too well, you're going to see a mess when you try to browse
from your Xbox or Playstation. I tend to organize by date,
with top-level year folders and subfolders with the full date in
YYYYMMDD and a description of the event being photographed - that way
they sort, alphabetically, in date order. It looks like this:

-   2004
-   2005
-   2006
-   2007
    -   20070704 - Independence Day
    -   20071225 - Christmas

-   2008
    -   20080704 - Independence Day
    -   20080723 - Trav's Birthday
    -   20080908 - Screen Shots of Windows Home Server

This makes it very nice and easy to browse when you're looking at it
from a client.

**Online Backup:**
 I was backing up my computers using [Mozy](http://www.mozy.com), but
the Windows Home Server offers a full backup feature, too, so I've
pretty much switched over to using that. Of course, I need to get the
Windows Home Server backed up, so I started looking at options there.

Philip Churchill has [a great writeup of various online backup solutions
for Windows Home
Server](http://mswhs.com/2007/06/25/online-offsite-whs-backup-solutions/).
I wanted to stick with Mozy, but they require you to get a Mozy Pro
account to back up your Home Server, which costs \$0.50/GB per month...
and with 110GB of music alone, that's \$55/month to back up something I
can back up for \$50/year from my laptop. Disqualified. I also
considered [Carbonite](http://www.carbonite.com/) but really wanted
something that's officially supported, and while they say it should
work, they won't support you backing up Windows Home Server. I'm also
[not interested in "tweaking things" to get it to
work](http://trevinchow.com/blog/2008/02/12/mozy-to-carbonite-oh-no-you-dont/)
- one of the beauties of the WHS so far has been its "appliance-like"
simplicity. I'm not eager to break that. Disqualified.

In the end, I picked [KeepVault](http://www.keepvault.com). It's
\$100/year for unlimited storage and has [a really nice Windows Home
Server add-in](http://www.keepvault.com/tour_2_whs.htm) so you can see
your backup status and do restores right from the console. You tell it
which shares you want to keep backed up and it does the rest. The only
downside to this is it's not backing up the OS or your computer
backups... but since you can recover the OS reasonably easily, and the
chances of my computers AND my WHS taking a dive at the same time are
minimal, this is a perfect solution to me, and it seems [other folks
have had success with it,
too](http://blogs.msdn.com/echarran/archive/2008/05/08/architecture-of-the-charran-ehome.aspx).
I'll keep any really precious documents in my user share on the Home
Server so they'll not only be duplicated (for hardware failure fault
tolerance) but also backed up by KeepVault. The rest will get backed up
by the standard Windows Home Server computer backup facility. Done.

UPDATE 2/25/09: KeepVault has raised its prices to be far, far less
affordable and there is no unlimited storage option. Once my current
subscription expires, I will most likely switch over to use the built-in
Windows Home Server option to backup to a USB drive and store the
backups off-site myself.
**Ripping DVDs:**
 One of my primary goals for getting the server was to store my
VIDEO\_TS rips of my DVDs so I can play them through some sort of media
center. I've gotten this working - even over wireless, which was cool -
through my primary laptop and Windows Media Center on Vista Ultimate.

It might sound obvious, but when you rip a DVD, rip it to your local
drive first and then copy the files to the server. I found the ripping
process was cut from like an hour and a half to about 20 min. when
ripping it locally. Then you can start the copy over to the server while
you're ripping the next disc.

You will probably want to create a new shared folder on the server
outside of the default "Videos" folder that it comes with. Since the
server won't stream VIDEO\_TS or ISO anyway, you're not losing out on
functionality. That said, you probably don't need file duplication
turned on for your ripped movies or you'll be chewing through space.
Creating a separate "DVD" share to store your rips in will let you
selectively turn off duplication for just the rips.

You'll probably also not want to set your online backup solution to back
up the rips. On both Mozy and KeepVault, it seems to take about a day to
back up 7GB, and if you've got a lot of movies like I do, it's going to
take years to get the backup completed. Plus, if you ever do lose the
data, it'll be far faster to just re-rip the movie (or even go to the
store and re-purchase it, if the disc has been destroyed, and re-rip)
than it would be to get the content back from the online backup service.
Save the online backup service for your photos, music, smaller videos,
and documents.

**Continued Work on My Home Media Solution:**
 I'm still learning about the way to handle things - which program I
like best for ripping DVDs, what the best way to add metadata to Windows
Media Center for the ripped discs is, etc. - and I'll post updates as I
find them. I found [one blog that explains almost an identical setup to
what I'm trying to put
together](http://blogs.msdn.com/echarran/archive/2008/05/08/architecture-of-the-charran-ehome.aspx),
so that's been a lot of help. Right now the decision I'm trying to make
is whether to go with Windows Media Center or whether to go with some
sort of Mac solution, maybe using Front Row. I seem to be able to find
information on WMC a lot easier, but maybe I'm just not looking in the
right places. On the other hand, most of the Mac solutions seem to be
appliance-like, just like the Home Server, and I'm a big fan of simple.
We'll see.

