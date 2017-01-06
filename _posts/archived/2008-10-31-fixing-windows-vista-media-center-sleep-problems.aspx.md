---
layout: post
title: "Fixing Windows Vista Media Center Sleep Problems"
date: 2008-10-31 -0800
comments: true
disqus_identifier: 1461
tags: [media,windows]
---
Since [I've set up my Windows Vista Media
Center](/archive/2008/09/30/overview-of-my-media-center-solution.aspx),
there are two things I've been working on fixing.

First, there's some weirdness with my display resolution (TV runs
1366x768, computer will only do 1280x768), but I think that's tied to
the fact that I'm using DVI/VGA instead of HDMI to connect it. I'll keep
you posted on that. [**UPDATE**: Using HDMI fixes the display resolution
weirdness. Recommended over DVI/VGA.]

Second, I'm backing up my Media Center PC every night with my Windows
Home Server, but for some reason, while the PC will wake up so it can be
backed up, it just wouldn't go back to sleep after that. It's not that
it would go to sleep and wake up again randomly, it's that once awake,
it wouldn't sleep unless I forced it back to sleep. That's the problem I
fixed.

While researching, I came across [this great tutorial on fixing sleep
mode problems in
Vista](http://www.vistax64.com/tutorials/63567-power-options-sleep-mode-problems.html)
that pointed me down some avenues I would never have thought of.

The solution to my sleep mode problems:

-   In power options, I changed the "Multimedia Settings/When sharing
    media" setting to "Allow Computer to Sleep."
-   Reduced the time to turn off the display to 15 minutes.
-   Reduced the time to go to sleep to 30 minutes.
-   Switched to a different screen saver. This is one of those things
    I'd never have thought of. According to the tutorial, some screen
    savers interfere with the ability of the computer to sleep. [I
    recommend the "Bubbles" screen
    saver.](/archive/2009/04/05/solution-to-dell-studio-hybrid-hdmi-sleep-problems.aspx)

I don't know if it was just one of those things that fixed it or the
combination of several, but I didn't have to turn off any of the
abilities of the devices to wake the computer or mess with any other
settings. Since I wasn't sharing media from the computer (though I was
reading from a shared media location), I don't think it was that
setting, and I can't imagine reducing the times had anything to do with
it, so I'm thinking it was the screen saver.

If you're having Vista sleep troubles, [check out that
tutorial](http://www.vistax64.com/tutorials/63567-power-options-sleep-mode-problems.html).

