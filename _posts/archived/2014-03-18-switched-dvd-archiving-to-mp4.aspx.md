---
layout: post
title: "Switched DVD Archiving to MP4"
date: 2014-03-18 -0800
comments: true
disqus_identifier: 1835
tags: [media]
---
Back in 2008 when I originally was looking at the various solutions for
archiving my movies, [I weighed the pros and cons of things and decided
to rip my movies to VIDEO_TS
format](/archive/2008/09/30/overview-of-my-media-center-solution.aspx).
I did that for a few reasons:

-   **I wanted to keep the fidelity of the original movie.** I didn't
    want a whole bunch of additional compression artifacts that would
    detract from the watching experience.
-   **I wanted to keep the sound.** I didn't want everything downmixed
    to stereo sound, I wanted the full surround experience you'd
    normally get with the movie.
-   **I wanted a backup of the original disc.** In the event a disc goes
    bad, I wanted to be able to re-burn the disc.

Well, six years (!) have passed since I made that decision and a lot has
changed, not only with technology, but with my own thoughts on what I
want.

-   **Full DVD rips take a lot of space.** That native MPEG-2
    compression is really not great. Not to mention the digital files
    some DVDs come with for "interactive features" and things.
-   **We don't use the extra features.** After running the media center
    for this long, our usage pattern with it has become pretty clear –
    we watch the main movie but we generally don't make use of the
    behind-the-scenes featurettes, audio commentary, or other features
    of the movies.
-   The FBI warning, menus, previews, and other "up front stuff" is
    annoying. We've known that all along, but it's like that five minute
    tax you just accept for watching a movie. I'm tired of paying that
    tax.
-   **Discs don't go bad as often as you think.** Of the literally
    *hundreds* of discs I have, I think I've had like two go bad. I know
    I've jinxed it now that I've said it.
-   **Disk space isn't free. It's cheap, but not free.** The real
    challenge is that if you have a NAS with all full bays and a RAID 5
    array, it's not really that easy or cheap to expand. You have to
    move all the data off the giant array (to where?), upgrade the
    disks, and move it all back. (Basically. Yeah, there are other ways
    to swap one disk out oat a time, etc., but the idea is that it's
    painful and not free.)
-   **Video containers are way better and more compatible now.**
    Originally it was nigh unto impossible to get actual surround sound
    out of a compressed video in an MKV or MP4 container. I say "nigh
    unto" because some people had figured out this magic incantation and
    had it working, but finding the right spells to make it happen was
    far less straightforward than you might think. I tried for a long
    time to no avail. Plus, compatibility in general was not great – one
    device would play MP4 but not MKV; one device wouldn't play any of
    them; one device would only play MP4 but only certain bit-rates of
    audio. It was horrible. Now pretty much everything plays MP4 and
    DLNA servers stream it nicely.
-   **Compression is way better.** [Handbrake](http://handbrake.fr/) has
    changed a lot since I originally looked and the filters it uses are
    way better. You don't notice the difference in a converted movie the
    way you once did, and it's way easier to get "the right" settings
    for things.

What really got me thinking about it was [this Slashdot article talking
about how a person lost 20TB of
data](http://ask.slashdot.org/story/14/03/12/1253218/how-do-you-backup-20tb-of-data)
because it's basically impossible to back all that up at home. I don't
have 20TB of data, but I have 5TB and my NAS is close to 80% full. I
don't have much room to continue just adding movies and, as noted, disk
space isn't free. It got me thinking about looking at video formats
again.

**I ended up switching to:**

-   [**Handbrake**](http://handbrake.fr/)**'s "High Profile" preset
    modified with...**
-   **The primary audio channel updated from 160kbps to 256kbps**
-   **The "x264 Preset" set to "Slower"**
-   **Based on the content type, choose an "x264 Tune" of "Film,"
    "Animation," or "Grain."**

These settings yield results that are visually comparable to the
original DVD source; and include both stereo mixdown (for iPads and
mobile devices that don't support surround) and surround sound
passthrough audio (for media servers and players that support surround).

I chose the higher quality sound because my primary use case is still
high-fidelity home theater speakers and while I don't need lossless
audio, I wanted really good quality, too. It didn't seem to affect the
file size in any significant way.

I chose the "slower" x264 preset because I could tell in some areas the
difference between "medium" (the default) and the slower settings, but
from a time-to-encode perspective, "slow" and "slower" yielded about the
same amount of time. I tried "very slow" but it nearly doubled the
amount of encode time (not feasible for hundreds of discs).

**The file size is roughly 25% – 50% of the original source content**,
so for a 4GB DVD I see about 1.5GB – 2.0GB compressed movies; for an 8GB
DVD I see 2.0 – 3.5GB compressed movies. This is great from a space
perspective because it means I can put off expanding my RAID array for a
while longer.

On my current (not great) computers, **I can encode a two hour movie in
about 8 – 10 hours**. Thank goodness for the queue feature in Handbrake,
I can just queue up a ton of movies and let it run around the clock. I
have a couple of computers going all the time now. Of course, with the
number of discs I have to go through, it's still going to be a couple of
months.

**This has opened a lot of new doors from a compatibility standpoint**
at home. My Synology NAS comes with a DLNA server that streams these
perfectly to any device at home, so I can watch from my phone or tablet.
The XBMC media center plays them beautifully and gets the full surround
sound. I can put these on the iPad and take them traveling with us. I
don't have the full backup anymore... but for the cost/benefit on that, I
may as well just re-purchase discs that go bad if I have to.

Some documents that helped me determine this new format:

[The Handbrake Guide](https://trac.handbrake.fr/wiki/HandBrakeGuide),
particularly

-   [The discussion on video container
    options](https://trac.handbrake.fr/wiki/Containers)
-   [The x264
    preset/tune/profile](https://trac.handbrake.fr/wiki/x264VideoSettings)
    page
-   [The guide to surround
    sound](https://trac.handbrake.fr/wiki/SurroundSoundGuide)

[This amazingly well done "best settings" guide for Handbrake
0.9.9](http://mattgadient.com/2013/06/12/a-best-settings-guide-for-handbrake-0-9-9/)

[A comparison of the x264 "RF" settings in
Handbrake](http://mattgadient.com/2013/06/20/comparing-x264-rf-settings-in-handbrake-examples/)

If you're interested in the rest of my media center solution, [check out
the main
article](/archive/2008/09/30/overview-of-my-media-center-solution.aspx).

