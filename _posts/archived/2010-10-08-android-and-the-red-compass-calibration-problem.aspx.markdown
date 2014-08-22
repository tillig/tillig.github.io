---
layout: post
title: "Android and the Red Compass Calibration Problem"
date: 2010-10-08 -0800
comments: true
disqus_identifier: 1672
tags: [GeekSpeak]
---
After you update Android on your phone (or whatever) you should
recalibrate the compass so it, literally, knows which end is up. This
involves flipping the phone around along all axes so it can figure
things out. After a while, the little on-screen compass thing turns
green and lets you know it's calibrated.

Except when it turns red and *never turns green*, which is what happened
to me.

I looked around in forums and [it turns out this is reasonably
common](http://androidforums.com/droid-x-tips-tricks/184714-calibrate-your-compass-after-ota-wipe.html).
I fixed it in the same way other people have fixed it, which was:

1.  **Uninstall any compass-related applications.** This includes fancy
    on-screen compasses as well as apps like [GPS Test
    Plus](http://www.androlib.com/android.application.com-chartcross-gpstestplus-wjnE.aspx),
    which is a great app for helping you test out your GPS
    reception/settings but also has an on-screen compass component.
2.  **Power cycle the phone.** Turn it all the way off and back on
    again.
3.  **Sit in the middle of the room.** Well, you don't have to sit smack
    in the middle of the room, just make sure you're not sitting next to
    speakers, or an MRI machine, or something that's going to create
    magnetic interference.
4.  **Start the calibration.** Settings -\> Location and Security -\>
    Calibrate Compass.
5.  **Rotate the phone slowly.** Don't fling it around really fast. Take
    about two seconds to complete a full rotation of the phone in any
    direction. Flip it around all different ways. It should take around
    a minute to turn green.
6.  **If it doesn't turn green, or if it turns red**, go look and make
    double sure you don't have any compass apps installed. I didn't even
    think about GPS Test Plus until I remembered there was one screen in
    there that did, in fact, deal with the compass. It may be a game, it
    may be a utility... whatever. The compass app thing was, I think,
    the real key for me, though it does sound like some folks are moving
    the phone around too fast as well.
7.  **Reinstall your app(s) after calibration.** Done and done.

This was really annoying for a few hours while I couldn't for the life
of me figure out why the compass calibrator kept turning red and never
completing. I followed the above steps (which is an amalgamation of
things that worked for different people) and had no issues. Hopefully
it'll help you, too.

