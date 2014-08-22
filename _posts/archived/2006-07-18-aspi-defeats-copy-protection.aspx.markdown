---
layout: post
title: "ASPI Defeats Copy Protection?"
date: 2006-07-18 -0800
comments: true
disqus_identifier: 1033
tags: [Media]
---
Jenn and I saw [*The Devil Wears
Prada*](http://us.imdb.com/title/tt0458352/) yesterday and [I liked the
soundtrack so I picked up a
copy](http://www.amazon.com/exec/obidos/ASIN/B000FZESR6/mhsvortex). I
listen to my iPod and not CDs, so I tried to rip it this morning So I
could have it for my commute.
 
 No luck.
 
 I have two CDROM drives at home. One didn't recognize the CD at all,
the other recognized it as audio but wouldn't play it (all tracks zero
length).
 
 Reboot, try again (just in case it was a fluke), still no luck.
 
 Did some research in how to figure out what kind of copy protection I
was up against and found that most copy protection detectors need an
ASPI layer to be installed in order to work, something that doesn't come
with Windows XP by default.
 
 I installed the one at [ForceASPI
1.8](http://force_aspi_18.w.interia.pl/) (tried the one at Adaptec and
it didn't work... at least it wasn't recognized by
[ClonyXXL](http://www.cdmediaworld.com/hardware/cdrom/cd_utils_2.shtml#ClonyXXL))
and rebooted. Put the CD in the drive (the drive that didn't even
recognize it to begin with) to inspect it...
 
 ...And it totally knew how to play it. No copy protection circumvention
needed. Just installing the ASPI layer fixed it.
 
 I've never heard of an ASPI layer fixing a drive against copy
protection, so maybe the installation just corrected something that was
wrong - replaced a corrupt driver or something. I'm not going to
question it - the ends justified the means for me. Might be a simple
first step for people having CD ripping issues, though. YMMV.
