---
layout: post
title: "Gizmocafe - Xbox 360 and Media Center"
date: 2007-06-27 -0800
comments: true
disqus_identifier: 1223
tags: [media,gaming,xbox]
---
I haven't gotten a chance to put [my media
center](http://paraesthesia.com/archive/2007/03/23/media-center-2005-and-xbox-360-success.aspx)
together yet, but I got a comment that points to [a pretty decent
article about using the Xbox 360 as a media center
extender](http://www.gizmocafe.com/tv-video/xbox360.aspx).  It may be
easier than I thought.  Looks like the .VOB files you rip from DVDs are
actually renamed .MPG files, which can be directly streamed.  I may have
to try this out.

It would be easy enough to have the DVD backups on a drive and a virtual
filesystem of symbolic links to all of the VOB files that have renamed
targets (so "Cool Movie.mpg" would point to "Cool
Movie/VIDEO_TS/VTS\_01\_1.VOB" and mask the whole rename issue). 
Wouldnt' be hard to write a program that generates that filesystem. 
I'll have to try it.

UPDATE: There seem to be two problems with the way Gizmocafe does
things.  First, it's not really a proper DVD backup solution - it only
works if your sole goal is streaming the movie.  Half of the reason I'm
doing this is as a backup solution.  Second, you may have a little bit
of fudging to do in the DVD ripping software to get movies with multiple
VOB files to work.  For example, the movie *Borat* seems to have three
separate VOB files - those would have to be connected to so they could
stream in one continuous movie.  The Gizmocafe tutorial doesn't really
address that.

