---
layout: post
title: "iTunes Crashes on One Bad Track"
date: 2010-10-13 -0800
comments: true
disqus_identifier: 1674
tags: [media,music]
---
My iTunes library is currently around 160GB, much of which is stored in
Apple Lossless format. I also have podcasts, TV shows, and movies in the
library. I have a 160GB iPod Classic. *I want all of it on the iPod*.

Luckily, iTunes has this nifty option "Convert higher bit rate songs to
128 kbps AAC" which will, on the fly, convert the Apple Lossless stuff
to smaller (and lower quality) files so it all fits. This is fine for my
iPod since my major use case there is middle-of-the-road earphones at
work and podcasts anyway.

The problem is, syncing that much and doing the conversion *literally
takes days*. And if iTunes crashes in the middle... you basically get to
start over.

What I'd find is about a day and a half in, I'd get a little dialog that
would pop up and say "iTunes has stopped working." From there, if I
tried to start things running again, I'd get "Verifying iPod..." and
nothing would happen. ([I figured out how to get past the "Verifying
iPod"
message](/archive/2010/10/08/itunes-stuck-on-quotverifying-ipodquot-try-resetting-sync-history.aspx),
but it still restarted the sync from the beginning.)

After a long process involving syncing small blocks of the library one
at a time onto the iPod and which I'm now referring to as The Great iPod
Sync of '10, **I found the culprit: One. Single. Bad. Track.**

![Windows Explorer showing ONE TRACK not
working.]({{ site.url }}/images/20101011badtrack.png)

See that track where Windows can't pick up the metadata information? Of
the over 14,500 tracks in the library, iTunes encountered this one bad
track and died. Blammo.

(I didn't discover it earlier because I wasn't compressing and
apparently iTunes will just blindly copy the bad track over without
checking.)

Once I removed this track from the library, everything synchronized
fine.

So... if you're finding iTunes crashing in the middle of your sync over
and over... go look to see if you have a bad track.

