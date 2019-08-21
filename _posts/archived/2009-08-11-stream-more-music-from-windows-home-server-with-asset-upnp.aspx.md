---
layout: post
title: "Stream More Music From Windows Home Server with Asset UPnP"
date: 2009-08-11 -0800
comments: true
disqus_identifier: 1555
tags: [media,windows,music]
---
When setting up [my Windows Media Center
solution](/archive/2008/09/30/overview-of-my-media-center-solution.aspx)
the primary goal was access to my DVD movie library. Getting access to
my music was a "nice to have" feature, but not really required.

Since then, I've figured out [how to get iTunes music (AAC, M4A, Apple
Lossless) to play natively in Windows Media
Center](/archive/2009/05/19/getting-itunes-music-to-play-in-windows-media-center.aspx),
but my other [DLNA](http://www.dlna.org) media devices - Playstation 3,
Xbox 360 - still couldn't play that music because [Windows Media
Connect](http://en.wikipedia.org/wiki/Windows_Media_Connect), the thing
that Windows Home Server uses for UPnP media sharing, is an older
service that doesn't understand those formats.

Some folks have solved this by doing a [sort of hacky upgrade to Windows
Media Player
11](http://social.microsoft.com/forums/en-US/whssoftware/thread/82fd0c09-86e0-45a8-b49e-762f89ede333)
(which is not supported on WHS, but enables more file formats to be
shared). One of my big goals with Windows Home Server (and my media
center solution in general) is to not hack around on the thing. **I want
a polished, appliance-like experience.** I want support. I really don't
want to have to mess around with tweaking this and fixing that just to
get things working. I get to do that all day at work; at home I just
want things to behave.

To that end,**I'd all but abandoned the idea that the Xbox or PS3 could
share my music until I found**[**Asset
UPnP**](http://www.dbpoweramp.com/asset-upnp-dlna.htm)**.**

Asset UPnP is a Windows Home Server add-in that enables sharing of
virtually every kind of music format out there. The really cool bit is
that it can transcode formats that your player doesn't support into
either Wave, LPCM, or MP3 format so your DLNA player will understand
them.

[**We Got
Served**](http://www.wegotserved.com/2009/07/19/add-in-review-asset-upnp-media-server/)**and**[**Home
Server Plus**](http://www.whsplus.com/2009/06/01/asset-upnp/)**have some
good discussions about the functionality** of the server and how it
works, at least for version 1.1. [The Asset UPnP
page](http://www.dbpoweramp.com/asset-whs-manual.html) also has some
good screen shots showing how to set things up and what your options
are. I won't duplicate all of that here.

Setting up Asset UPnP in its default configuration will enable DLNA
media players and renderers to access the files that Windows Media
Connect previously didn't share because it didn't understand. **The
power (and coolness) is in Asset's "Force Streaming" function**, which
decodes audio formats before streaming them to the player - that enables

What I will tell you is how to get things working with your Playstation
3 and Xbox 360.

**Get your metadata in order.** Asset UPnP makes a lot of use of
metadata tags - artist, album, album art, etc. - to generate the
hierarchy you can browse to get to your music. Getting this right will
make it far easier to find your music through your player.

**Install version 2 of Asset UPnP.** As of this writing, version 2 is
in release candidate status but it has some features and bug fixes that
version 1.1 doesn't have that you're going to want. I didn't bother with
version 1.1 and have found the RC of version 2 to be nice and stable.
You can get the installer from [the Asset UPnP
page](http://www.dbpoweramp.com/asset-upnp-dlna.htm). **Make sure you
download the Windows Home Server version and not the standalone
version.**

**Use the "Force Streaming" function for unsupported formats.** You can
get to the advanced configuration screen by seleting the "Edit Advanced
Settings" button on the main WHS plugin control panel for Asset.

Select the AAC, M4A, M4B, and MP4 formats for iTunes music (that's what
I was working with). If you have FLAC or other music that isn't
supported directly by your player, select those formats, too.

Now the tricky part is to pick which format to stream the selected items
in. For Playstation 3, select Wave. For Xbox 360, select LPCM.
Unfortunately, Xbox 360 does not understand the Wave streaming and
Playstation 3 doesn't understand LPCM streaming. That means you can't
have both players working at the same time. At least, not right now. I
don't know if a fix is planned for a later release or not.

**UPDATE 9/26/2010:** Since the time of the original article, new
versions of Asset UPnP have been released. If you are using Asset UPnP
version 2, select LPCM streaming and it works with both PS3 and Xbox
360. If you are using Asset UPnP version 3, select 256kbps MP3 streaming
and it will work with PS3, Xbox 360, and Android DLNA clients.

![Asset UPnP "Force Streaming"
configuration]({{ site.url }}/images/20090811assetitunesconfiguratio.png)

Once you've got that set up, Asset will restart itself and you should be
able to use your player (PS3 or Xbox 360 or whatever) to play your whole
music library. If that's good enough, you won't have to mess with adding
[codec support to Windows Media
Center](/archive/2009/05/19/getting-itunes-music-to-play-in-windows-media-center.aspx).

**UPDATE 9/26/2010:** I posted an article explaining how to get your
iTunes or Windows Media Player playlists into Asset. If you're
interested, [check out that
article](/archive/2010/09/26/creating-playlists-in-asset-upnp.aspx).

