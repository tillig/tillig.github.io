---
layout: post
title: "Solution to Dell Studio Hybrid HDMI Sleep Problems?"
date: 2009-04-05 -0800
comments: true
disqus_identifier: 1511
tags: [media,windows]
---
Something I'd noticed in recent times: [My Dell Studio Hybrid media
center
PC](/archive/2008/09/29/dell-studio-hybrid-media-center-installed.aspx)
wouldn't display a video signal after resuming from sleep.

This would work:

1.  Turn the TV on.
2.  Turn the Dell Studio Hybrid on (power on).
3.  Put the Dell Studio Hybrid to sleep.
4.  Wake the Dell Studio Hybrid up.

Doing that sequence you would correctly see the PC go to sleep, wake up,
and still display a signal on the screen. This, on the other hand, would
not work:

1.  Turn the TV on.
2.  Turn the Dell Studio Hybrid on (power on).
3.  Turn the TV off.
4.  Put the Dell Studio Hybrid to sleep.
5.  Turn the TV on.
6.  Wake the Dell Studio Hybrid up.

Doing that sequence, the TV would never get the video signal from the PC
again. You'd have to hard power off and power it back on to get the
signal. (As it turns out, it's not putting it to sleep that's the
problem, it's the power option to "Turn off display" - the machine
doesn't have to go fully to sleep, but if the display turns off, you
still see this problem.)

I also noticed that there was a problem where occasionally the TV would
lose signal just switching inputs away from the Dell Studio Hybrid and
back.

1.  Turn the TV on.
2.  Switch the TV to the HDMI input for the Dell Studio Hybrid -
    everything looks fine.
3.  Switch the TV to some other input.
4.  Switch the TV back to the HDMI input for the Dell Studio Hybrid -
    signal lost.

This would only happen when Windows Media Center was running full
screen. If you were looking at the desktop, or if WMC was in windowed
mode, you'd never lose signal. Only when WMC was full screen would it be
a problem.

I updated all the drivers, no luck. I messed around with different
driver settings, no luck. After searching around, I found several
workarounds.

**What worked for me**: I bought a little $20 HDMI switchbox [based on
this blog entry here](http://www.edbott.com/weblog/?p=2480). Putting
that between the TV and the PC seems to have cleared up my signal loss
issue.

Other workarounds include...

**Use the "Bubbles" screen saver**. For some reason, I found the
"Bubbles" screen saver does something that other screen savers don't
seem to do and the signal doesn't get lost when it's on. It does mean
you have to set the computer up so it never goes to sleep and the video
signal never shuts off, but if you do that (and set the screen saver to
start at something like one minute) then as long as you don't switch the
TV input to the PC when the screen saver isn't running, you're fine.
Worst case, you switch away from the PC and wait one minute before
switching back. Even with the HDMI switchbox, I'm still running the
"Bubbles" screen saver, though it's running at 15 minutes now instead of
one minute.

**Switch the ACPI suspend type to S1.** I stumbled on this [while
searching through
forums](http://thegreenbutton.com/forums/3/297763/ShowThread.aspx). It
didn't work for me, but it works for some folks. By default, it's set to
S3 - suspend to RAM. Switching it to S1 (sleep) seems to have resolved
it, at least in my tests thus far. I can now do the sequence that
wouldn't work - turn the TV off, put the DSH to sleep, turn the TV on,
and wake up the DSH with the video signal intact. I learned a little
about what the different modes mean while I was figuring this out. [This
is a great FAQ](http://www.lifsoft.com/power/faq.htm) if you want to
know more.

**UPDATE** (5/28/09): I reformatted this post to be a little more clear
about the issue and possible solutions.

