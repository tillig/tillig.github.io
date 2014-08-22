---
layout: post
title: "Choosing a Format for Your DVD Library"
date: 2008-09-23 -0800
comments: true
disqus_identifier: 1448
tags: [Media]
---
**UPDATE 3/18/2014**: I've re-analyzed my needs and the available
technology and [I've switched to MP4 movie
storage](/archive/2014/03/18/switched-dvd-archiving-to-mp4.aspx).

I blogged a bit ago about [setting up a Windows Media Center DVD
Library](/archive/2008/09/12/how-to-set-up-a-dvd-library-in-windows-media.aspx)
- where to store, how to handle metadata, etc. What I didn't cover was
how to choose a format to rip your movies into.

When I created my DVD Library, I had three primary goals:

-   No loss of quality.
-   Menus, etc. intact.
-   Backup of movie that can be re-ripped to DVD if the original gets
    damaged.

I ended up selecting VIDEO\_TS format for my movies. Based on your
requirements, you may choose a different format. The following table
outlines some common format choices and their relative pros/cons.

 

ISO

VIDEO\_TS

WMV

MPEG-2

DivX

Description

Full-disc image, sector for sector.
[[Wikipedia](http://en.wikipedia.org/wiki/ISO_image)]

The files ripped from the disc's filesystem.
[[Wikipedia](http://en.wikipedia.org/wiki/Video_ts)]

Windows Media Video.
[[Wikipedia](http://en.wikipedia.org/wiki/Windows_Media_Video)]

Moving Picture Experts Group video codec.
[[Wikipedia](http://en.wikipedia.org/wiki/MPEG-2)]

Codec using lossing MPEG-4 compression.
[[Wikipedia](http://en.wikipedia.org/wiki/Divx)]

Playable in Windows Media Center

[Requires a plugin like MyMovies in conjunction with Daemon
Tools.](/archive/2007/01/29/iso-vs.-video_ts-storage-for-media-center.aspx)

Yes, by [enabling the DVD
Library](/archive/2008/09/12/how-to-set-up-a-dvd-library-in-windows-media.aspx).

Yes

Yes

[Requires a plugin like Media Control with
FFDShow.](http://damienbt.free.fr/index.php)

Streams to Media Center Extender (e.g., Xbox 360)

Requires Media Center with
[Transcode360](http://www.runtime360.com/projects/transcode-360/). You
won't get FF/RW/Chapters.

Requires Media Center with
[Transcode360](http://www.runtime360.com/projects/transcode-360/). You
won't get FF/RW/Chapters.

Yes

Yes

No. ([Can play on Xbox360 through file sharing, but not through Media
Center
Extender.](http://gizmodo.com/gadgets/xbox-360-divx%5Cxvid-test/xbox-360-divxxvid-playback-tested-verdict-its-almost-perfect-329769.php))

Same quality as original DVD

Yes

Yes

No

No

No

Menus, extra features, etc. intact

Yes

Yes

No

No

No

All of these can be re-ripped, in some form or another, to a DVD that
will play in a standard player, but you can obviously only burn back to
disc the data you have. For example, if you rip your movie to WMV,
you've lost the menus and quality - you aren't going to get those back
by burning the WMV back to a video disc.

File size was omitted because for the lossy formats, you can adjust the
amount of size the movie takes on disk by compromising quality. The ISO
and VIDEO\_TS formats will take between 4GB and 8GB per disc, regardless
of movie length, because they're basically the whole kit-and-kaboodle.
I've found some discs only use 3GB, but most are between 4 and 8.

**A note on quality**: When I say there's a quality difference between
ISO/VIDEO\_TS and WMV/MPEG-2/DivX, it's not just a little bit. You
will immediately notice that there are more video artifacts and lower
quality sound than if you'd ripped the full movie without additional
compression. The more you try to keep the quality, the larger the file
size gets until you almost may as well have ripped the full
ISO/VIDEO\_TS... and even then, you still may notice quality issues. In
some cases, you may not care - as long as it's "watchable" it may be
good enough for you. I'm a quality freak so I have a really difficult
time with compressed video in my home theater, and my wife, who is far
less picky than I am, even notices a difference. YMMV.

Given that...

**The quick recommendations:**

-   **VIDEO\_TS**: If you want a backup with menus, no lost quality, and
    don't mind watching your movies through a Windows Media Center (or
    Front Row, for you Mac people), then VIDEO\_TS is the way to go.
    It's the easiest of the two full-rip formats to set up and is most
    compatible with media center style software.
-   **MPEG-2**: If you want just the main movie, don't mind losing a
    little quality, and/or have lots of different devices (PS3, Xbox360,
    etc.) that you want to watch on, go with MPEG-2. It's a pretty
    common format that almost everything will play.


