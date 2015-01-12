---
layout: post
title: "Using CodeRush Duplicate Code Detection in a Real Project"
date: 2012-04-11 -0800
comments: true
disqus_identifier: 1778
tags: [net,vs]
---
I'm working on a fairly major refactoring project, merging a couple of
fairly large libraries together that have some overlapping/similar
functionality. I figured this would be the perfect time to try out the
reasonably new [CodeRush Duplicate Code Detection
feature](http://community.devexpress.com/blogs/markmiller/archive/2011/11/29/duplicate-detection-and-consolidation-in-coderush-for-visual-studio.aspx).

The solution I'm working on has eight projects - four unit test
projects, four shipping class libraries, and a total of 1248 C\# code
files.

I didn't have duplicate code detection running in the background during
the initial pass at the merge. Instead, I ran the detection after the
initial pass to indicate some pain points where I need to start looking
at combining code. (Let me apologize in advance - I wanted to show you
the analysis results in a real life project, but because it's a real
project, I can't actually show you *the code* in which we're detecting
duplicates. I can only show you the duplicate reports. With that...)

First, I started with the default settings (analysis level 4):

![Default Duplicate Code analysis settings - level
4](https://hyqi8g.blu.livefilestore.com/y2pNWmFVAbhgNL8uXUnudVWxCtAlmRscnMM2NCEjI2GsUPBVsWlAnLZfGLBQ_kEDl8-CcMVq7qqSvzM944qdGAW7KFwatqBeeqIK3oCeaTVhjQ/20120411_initial_settings.png?psid=1)

Running that pass took about eight seconds. I found a few duplicate
blocks in unit tests, which weren't unexpected. Things having to do with
similar tests (specifically validating some operator overload
functionality):

![Level 4 analysis
results](https://hyqi8g.blu.livefilestore.com/y2p6kCSgciWlvcH8-ytuKvZThX-wXko_tKDRG2jl24t6RJiJghza02LAKvbonF8uaeopQm8_EgFUJuqDpCGdm1S9HT4UZT5CKX6x1k3cVQxYXU/20120411_initial_pass.png?psid=1)

I wanted to do a little more, so I turned it up a notch to analysis
level 3 and ran another pass. This time the pass took about 12 seconds
and I found a lot more duplicates. This time the duplicates got into the
actual shipping code and started pointing out some great places to start
refactoring and merging code. This pass also grabbed more duplicates
across classes (whereas the previous pass only caught duplicates within
a single class/file).

![Level 3 analysis
results](https://hyqi8g.bl3301.livefilestore.com/y2phohevMZazkceQ_cLdfLZV1H6dgn7sBgtSmoLG1MXimUI44e-CvjvEYDAVcd-0zs7BwHgqGaSL2fxX1ST7hbbPv9UHiZbHT8DJwuovWiGhHY/20120411_second_pass.png?psid=1)

Well, since one notch on the analysis level settings was good, two must
be better, right? Let's crank it up to analysis level 2!

![Duplicate Code settings at analysis level
2](https://hyqi8g.blu.livefilestore.com/y2pxAYe5VNh0sKIMUJWcMVpEjtYV9X_bfwq93U3-XtqpoVW45fyJ3D4Gsn8mAJ7te6-n_Na_PcO5CZkqYlDcnbnoJGsLGfMDzVsZIC9ma8PjWg/20120411_third_settings.png?psid=1)

Once you get to level 2 and below, you get a warning: Analysis might
require significant CPU power and memory. I'm not too concerned with
this right now since I'm running the analysis manually, but if you turn
on the background analysis mechanism you'd probably want to verify
that's really what you want.

Anyway, the third pass using analysis level 2 still only took about 12
seconds... and re-running it, to verify that time, only took around 5
seconds so I'm guessing there is some sort of caching in place. (But
don't hold me to that.)

![Analysis level 2
results](https://hyqi8g.blu.livefilestore.com/y2pjQIdxqSbPbNDiEwAS6iB0Qw4CyHrA4TF6N5TAOgdEwYmcQN0DobtU9ua3PHIiIHCJXhxphT-RSOiRR8GAZTKsik-aItDOR6yoTrpNryZMnE/20120411_third_pass.png?psid=1)

Now we're talking! Tons of duplicates found on the level 2 run. However,
while the code is very similar, there aren't as many "automatic fixes"
that the system can suggest.

![Message - no automatic fix for duplicate
code.](https://hyqi8g.bl3301.livefilestore.com/y2pQmZvmnB_lcyvIK6U9B_Z7gAzK7kuWip-avTxHd1-jCTSe_qY5Pgh3LrmR_E-Vv38u8oqyYy4PBG0xaCxi2UtIsVeGybgES7eJQtoIESeMHk/20120411_no_auto_consolidation.png?psid=1)

I don't fault CodeRush for this - the duplicates will require a bit of
non-automated thought to combine, which is why they pay us
(programmers). (If they could replace us with scripts, they'd do it,
right?) I'm sure the geniuses at DevExpress will shortly replace me with
a keystroke in CodeRush so they can hire my cat in my place, but until
then, I can use this as a checklist of things to look at.

Out of curiosity, I decided to do another run, this time at level 0 -
the tightest analysis level available. This run took \~50 seconds and
found so many duplicates it's insane. Some are actionable, some are what
I'd call "false positives" (like argument validation blocks - I want the
validation to take place in the method being called so the stack trace
is correct if there's an exception thrown). Still, this is good stuff.

![Analysis results - level
0](https://hyqi8g.bl3301.livefilestore.com/y2p29YtD9hIot9gyIvqAiIxxOMeai2eVOuaX6jrnWSDIt7qGqyfXlvlG-dXXGmXTa6EycmHNHusplOJiOxrnrAFsem8Gdsq82zDsG8FAw-bwWQ/20120411_level0_pass.png?psid=1)

Given the balance between the too-granular detection and the
not-granular-enough, I think I'm going to go with the level 2 pass,
address those things, and then maybe turn it up from there.

Overall, I was really impressed with the speed of this thing. I mean,
1248 files, thousands of classes... and it takes less than a minute to
do super-detailed analysis? *That's akin to magic.*

Big props to DevExpress for a super-awesome tool that helps me improve
my code. And, hey, [some of the automatic fixes that are built
in](http://community.devexpress.com/blogs/markmiller/archive/2011/11/29/duplicate-detection-and-consolidation-in-coderush-for-visual-studio.aspx)
don't hurt, either. :)

If you want to use this on your project, [head over and pick up
CodeRush](http://www.devexpress.com/coderush). Honestly, it's the first
thing I install right after Visual Studio, and this sort of feature is
exactly why.

