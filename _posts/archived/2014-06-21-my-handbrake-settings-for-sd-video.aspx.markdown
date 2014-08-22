---
layout: post
title: "My Handbrake Settings for SD Video"
date: 2014-06-21 -0800
comments: true
disqus_identifier: 1845
tags: [Media]
---
I’ve been ripping a lot of SD video lately, converting my full-disc
VIDEO\_TS folder images to .m4v files for use with Plex, and I’ve
learned quite a bit about what I like (or don’t) and things I have to
look for in the final conversion. Surprisingly enough, default settings
never seem to work quite right for me.

The settings I use are some minor changes to the “High Profile” default.
I’ll note the differences.

Picture

-   Width: 720 (same as the source)
-   Anamorphic: Loose
-   Modulus: 2
-   Cropping: Automatic

Filters

-   Detelecine: Off
-   Decomb: Default
-   Deinterlace: Off
-   Denoise: Off
-   Deblock: Off
-   Grayscale: Unchecked

Video

-   Video Codec: H.264 (x.264)
-   Framerate FPS: Same as source
-   Constant Framerate (this is different than High Profile)
-   x264 Preset: Slower
-   x264 Tune: Film, Animation, or Grain (depends on the source – I
    change this per item ripped; this is different than High Profile)
-   H.264 Profile: High
-   H.264 Level: 4.1
-   Fast Decode: Unchecked
-   Extra Options: Empty
-   Quality: Constant Quality 18 (this is different than High Profile)

Audio

Track 1:

-   Source: The best AC3 sound track on there with the most channels.
    (It usually does a good job of auto-detecting.)
-   Codec: AAC (faac)
-   Bitrate: 256 (this is different than High Profile)
-   Samplerate: Auto
-   Mixdown: Dolby Pro Logic II
-   DRC: 0.0
-   Gain: 0

Track 2:

-   Source: Same as Track 1.
-   Codec: AC3 Passthru

Track 3 (depending on source)

-   Source: The DTS track, if there is one.
-   Codec: DTS Passthru

Subtitles: Generally none, but there are some movies that need them, in
which case I’ll add one track. High Profile (and my settings) generally
don’t include this.

-   Source: English (VobSub)
-   Forced Only: Unchecked
-   Burn In: Checked
-   Default: Unchecked
-   Everything else default.

Chapters: I do select “Create chapter markers” but I let the automatic
detection do the naming and timing.

This seems to give me the best bang for my buck. I tried with lower
quality settings and such, but it never quite got where I wanted it.
With these settings, I generally can’t tell the difference between the
original source and the compressed version.

Now, when a rip is done, I’ve found that I have to check for a few
things to see if something needs to be tweaked or re-ripped.

-   **Cropping**: About 80% of the time, Handbrake does an awesome job
    cropping the letterbox off and cleaning up the sides. That other
    20%, you get this odd floating black bar on one or more of the sides
    where the picture wasn’t cropped right. If this happens, I re-rip
    and change the cropping on the picture settings to “manual” and go
    through a series of preview/fix/preview/fix until I get it right.
    I’ve found that [a screen ruler
    program](http://www.sliver.com/dotnet/Ruler/) can help with that
    first “fix” to get it pretty close to where it should be. Anymore,
    I’ll usually run a five-second preview of the rip to check the crop
    before letting the machine run the whole thing.
-   **Film grain**: By default I try the “Film” x264 Tune setting for
    most movies unless I’m sure there’s a grain or high level of detail
    to it. Nevertheless, sometimes I’ll come across a film where dark
    spots have the background appear as though it’s “moving” – like a
    thousand little grains of sand vibrating. If I see that, I re-rip
    and switch to the “Grain” x264 Tune setting and that fixes it right
    up. I also sometimes see a film that looks like all the definition
    was lost and things are blocky – in this case, I’ll also switch to
    “Grain.”
-   **Lip sync**: I started out using the default “Variable Framerate”
    setting on the Video tab. I’m now in the process of re-ripping like
    a quarter of my movies because I didn’t stop to see if the lips were
    synchronized with the words in the soundtrack. By switching to
    “Constant Framerate,” everything syncs up and looks right. I’ve
    since switched my default setting to Constant Framerate.


