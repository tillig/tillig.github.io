---
layout: post
title: "Rotating HD Video with FFmpeg"
date: 2012-12-08 -0800
comments: true
disqus_identifier: 1796
tags: [Media]
---
I've seen a ton of forum posts and blog posts trying to explain how to
use [mencoder](http://www.mplayerhq.hu) or [FFmpeg](http://ffmpeg.org/)
to rotate video that you took on your phone.

Thing is... they didn't work for me.

No matter what I tried, something went awry.

-   The video rotated but no sound came through.
-   The video rotated and sound came through but the quality was
    horrible.
-   The audio came through but the video wasn't visible.

...and so on. Ugh.

I'm a technical guy. Trying to figure this thing out I learned far more
about audio and video codecs and container types than I really ever
cared to know. It really shouldn't be this hard.

The answer, for me, came with [WinFF](http://winff.org/), a GUI wrapper
on FFmpeg. There are some "presets" that come with it that set up the
high quality video command line part of things so I only had to add the
"rotate" bit.

For reference, the command line that worked for me was:

`ffmpeg.exe -y -i input.mp4 -crf 15.0 -vcodec libxvid -acodec libfaac -ar 48000 -b:a 192k -coder 1 -flags +loop -cmp +chroma -partitions +parti4x4+partp8x8+partb8x8 -me_method hex -subq 6 -me_range 16 -g 250 -keyint_min 25 -sc_threshold 40 -i_qfactor 0.71 -b_strategy 1 -qcomp 0.6 -qmin 0 -qmax 69 -qdiff 4 -bf 8 -refs 16 -direct-pred 3 -trellis 2 -wpredp 2 -rc_lookahead 60 -threads 0 -b 12000k -vf transpose=1 output.mp4`

Yeah.

The "transpose" option at the end is the bit that rotates.

-   0 = 90 degrees counterclockwise and vertical flip
-   1 = 90 degrees clockwise
-   2 = 90 degrees counterclockwise
-   3 = 90 degrees clockwise and vertical flip

And I know someone is going to want to comment something about *blah
blah orientation flag blah blah file metadata blah blah some players
don't support it*. I know. I really just want the stupid thing rotated
so I don't have to figure out which players work and which ones don't.
Ubiquitous play, minimal loss of quality, video rotated. Done.

I may tinker with the audio to see if I can just get it to pass through
without re-encoding, but since I finally got it to work after this much
research, I figured I'd post it.

Note that command line works great with the build of FFmpeg that comes
with WinFF, but they've updated some of the options in later builds so
it needs to be adjusted.

