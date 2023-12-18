---
layout: post
title: "Editing Creative Vado HD Video in Sony Vegas"
date: 2011-01-19 -0800
comments: true
disqus_identifier: 1689
tags: [media]
---
In Christmas 2009 I got [a Creative Vado HD
camera](http://www.amazon.com/gp/product/B001LK8P14?ie=UTF8&tag=mhsvortex&linkCode=as2&camp=1789&creative=390957&creativeASIN=B001LK8P14).
It's a nice, convenient little camera and we use it quite a bit. The
only real issue I've found with it is in editing the video it takes. On
Windows XP, if you install the software that comes with the camera, the
files play just fine but you can only edit them using the editor that
comes with the camera. On Windows 7, the files play just fine without
installing any additional software, and you can edit the files... in
Windows Live Movie Maker and that's about it. There's something
not-quite-right with the file format and [I'm not the only person who's
encountered
it](http://forum.videohelp.com/threads/302604-Creative-Vado-HD-AVI-%28H-264%29-Editing).

**I use Sony Vegas to edit my videos.** It's a nice program with a lot
of power behind it, and while it's not the easiest thing to figure out,
it is certainly flexible enough to grow with you as you get better at
editing and making movies. Problem is, **when you drop a Vado HD file
into Vegas 9.0, it sees the audio but no video.**

[I blogged how to add H.264 video support to
Vegas](/archive/2009/12/31/support-h.264-in-sony-vegas-with-x264vfw.aspx)
once I figured it out - install [the x264vfw
codec](http://x264vfw.sourceforge.net/). For Sony Vegas 9, that fixes
it.

Unfortunately, that doesn't work in Vegas 10.

I upgraded to Sony Vegas 10 because it's actually noticeably faster in
processing/rendering video and is far more reliable than Vegas 9. Vegas
9 would occasionally crash on me for no reason; 10 really hasn't
crashed... but now I see a different symptom.

**Without x264vfw, Vegas 10 doesn't see the video on Vado HD files**...
and while it sees that audio exists, it can't interpret it, so you see a
flat line audio track that can't play. If you try to play it, Vegas
hangs.

**Adding the x264vfw codec, Vegas 10 sees the video, but the audio still
doesn't work.**

Again, on Windows 7 with Windows Live Movie Maker, you can play and edit
these Vado HD files just fine.

I submitted a support question to Sony and after a fairly lengthy delay,
I got the following response:

> Hi Travis,
>
> Thank you for contacting Sony Creative Software. First, I apologize
> for the unusually long delay in responding to you. Our new Vegas Pro
> 10 has been well-received and as such, a high number of people are
> coming to us for support on this product.
>
> Unfortunately, we (and other editing programs) have encountered issues
> with Creative Vado footage and are currently looking to correct it. I
> have found that this forum link has helpful suggestions for your
> problem (and includes links to codec packs that help the product read
> the files better):
>
> [http://forum.videohelp.com/threads/302604-Creative-Vado-HD-AVI-%28H-264%29-Editing](http://forum.videohelp.com/threads/302604-Creative-Vado-HD-AVI-%28H-264%29-Editing)
>
> These codec packs are not created by us and we do not do support on
> them, so any questions you may have regarding them I recommend you
> direct them to that forum.
>
> We hope to include this codec in future versions of the software so
> that this extra step is no longer needed. Thank you for your report!

So it turns out Sony is aware of the issue but hasn't yet addressed it.
At least they're aware of it.

In the suggested forum link (and in other forums), people have arrived
at basically three solutions:

1. Convert the Vado HD file to another format that Vegas understands
    and drop the converted file in.
2. Split the audio and video in the Vado HD file into separate files.
    Convert the video part but leave the audio alone. Add the two
    separately into Vegas.
3. Install x264vfw. That fixes it for Vegas 9 but not Vegas 10.

My solution went with option 1 - convert the Vado HD file to another
format that Vegas understands. I use Windows Live Movie Maker (since
it's free) to do that conversion.

In Windows Live Movie Maker, create a new custom setting for videos. Use
the following values, which will work for converting the high quality
Vado HD files into something with no noticeable quality loss:

- Width: 1280
- Height: 720
- Bit rate: 8500
- Frame rate: 30
- Audio format: 192kbps, 48kHz, stereo

Drop your movie into the Windows Live Movie Maker timeline.

Save the movie using the new custom setting.

Import the new/converted movie into Vegas.

Done and done. Not perfect, but better than nothing. Hopefully this gets
addressed soon.
