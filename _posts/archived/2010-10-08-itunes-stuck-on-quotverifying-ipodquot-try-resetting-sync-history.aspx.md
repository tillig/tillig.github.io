---
layout: post
title: "iTunes Stuck on &quot;Verifying iPod&quot; - Try Resetting Sync History"
date: 2010-10-08 -0800
comments: true
disqus_identifier: 1671
tags: [media,music,windows]
---
![DJ cases full of
CDs.]({{ site.url }}/images/20101008cdcases.jpg)I
admit I'm not the "standard" use case. I have a 160GB iPod Classic and
it's not big enough. My iTunes music library is up in the 150GB range
and much of my music is stored in Apple Lossless format. It's enough now
that if I sync the iPod and include the list of podcasts I listen to,
it's more than 160GB.

At this point, I basically have three options:

1.  Resample everything so it's not lossless. Not on your life. I have
    it in lossless so I can back up the original quality and, if need
    be, create lower bit rate versions as needed. Plus, hello, too much
    work.
2.  Don't include everything in the sync. This is actually plan B, but I
    do like having everything on there. I find I get in weird moods and
    always seem to want to listen to the stuff I don't have.
3.  Check that "Convert higher bit rate songs to 128 kbps AAC" box and
    sync the whole library. This is what I'm trying to do. I wish they
    had a 256 kbps option, but my primary iPod use case is listening
    with reasonably cheap headphones, so 128 isn't killing me.

When you check that "convert" box, iTunes recompresses anything higher
than 128 kbps on the fly. The source stays intact, the iPod gets the
converted version. Saves space, and I get to keep my library.

Problem is, iTunes also doesn't really handle a ton of data well, nor
does it handle it well if your music is stored on a network drive. All
of these factors mean the sync takes *literally days to finish*.

I have been lucky enough to have the sync fail on me pretty constantly.
I go to work, leave it running, come home and see "iTunes has stopped
working." Then when I restart iTunes and plug the iPod in, I get the
message "Verifying iPod..." and it just verifies... infinitely.
Previously the only way I could figure out how to fix it was to do a
full restore on the iPod and start over. Yeah, I've been doing this for
a week or so now.

But I did find something that seems to get me up and running, past the
"Verifying iPod," without having to fully wipe the iPod.

1.  Plug in the iPod and wait until the "Verifying iPod" message shows
    up.
2.  Eject the iPod. It'll warn you that the sync's not done, and that's
    fine. Eject and disconnect the iPod.

    **Steps 1 and 2 are important. If you skip them and go straight for
    the reset sync history bit, things don't get fixed.**
3.  Go into Edit -\> Preferences and look at the "Devices" tab.
    ![Devices tab in iTunes
    preferences.]({{ site.url }}/images/20101008deviceoptions.png)

4.  Click the "Reset Sync History" button. You'll get a little warning.

    ![Reset sync history
    warning.]({{ site.url }}/images/20101008resethistory.png)

5.  Click the "Reset Sync History" button on the warning.
6.  Plug the iPod back in. It will start syncing again.

Now, something I've noticed - if it fails in the middle of a sync, after
doing this it won't remember any of the stuff it already completed. For
me, that means I'm breaking up my library into 1000 - 3000 song chunks
and syncing bit by bit.

YMMV; This has worked for me a few times now so hopefully it'll work for
you.

