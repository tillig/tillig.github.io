---
layout: post
title: "Media Center 2005 and Xbox 360 - Success!"
date: 2007-03-23 -0800
comments: true
disqus_identifier: 1168
tags: [GeekSpeak]
---
I got my Windows XP Media Center 2005 virtual machine to stream a movie
stored in [VIDEO\_TS
format](/archive/2007/01/29/iso-vs.-video_ts-storage-for-media-center.aspx)
to my Xbox 360 last night. The picture was sort of choppy due to the
virtual machine overhead and limitations, but I saw it work, proving the
concept.
 
 Here's what I had to do:
1.  Install Windows XP Media Center Edition 2005.
2.  Activate Windows XP. You have to do this to get all the updates you
    need.
3.  Hit Microsoft Update to get all the available patches.
4.  Install [.NET
    1.1](http://www.microsoft.com/downloads/details.aspx?FamilyID=262d25e3-f589-4842-8157-034d1e7cf3a3&displaylang=en)
    and
    [SP1](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=A8F5654F-088E-40B2-BBDB-A83353618B38).
5.  Install [MCE 2005 Update
    2](http://www.microsoft.com/windowsxp/mediacenter/upgrade/rollup2.mspx).
    (You might be able to get this from Windows Update; I got it from a
    separate download.)
6.  Install [My Movies](http://www.mymovies.name/).
7.  Install
    [Transcode360](http://www.runtime360.com/projects/transcode-360/).
8.  Hit Microsoft Update again to make sure all the patches are in
    place. (I did this twice because the first time I missed getting
    Windows Media Player 11 - I might have been able to skip it had I
    done everything the first time. I also had tried to avoid activating
    my MSDN copy of media center because I knew I'd only need it for a
    few days... but you have to be activated to get everything up to
    date.)
9.  Start up Windows Media Player and configure it.
10. Install [FFDShow](http://www.free-codecs.com/download/FFDShow.htm)
    to get the MPEG2 codec. Set it to be the default decoder for MPEG2.
    (I'm given to understand that if you install some DVD player
    software you don't need to do this. I was looking to do a proof of
    concept for free, so I went this route; I think if I do it for real
    I'll get [TheaterTek](http://www.theatertek.com/).)
11. Install [DVD Decrypter](http://www.mrbass.org/dvdrip/) for the movie
    ripping.
12. Rip a DVD to a known location. (I ended up ripping on a different
    machine and transferring the files to the virtual machine - there
    was some weirdness getting the ripping to work inside the VM.)
13. Run the My Movies collection editor and add the ripped movie to the
    collection.
14. Start Windows Media Center.
15. Turn on the Xbox 360. Navigate to the "Media" tab and select the
    "Media Center" option. After you read a couple of screens, you'll be
    given an eight-digit number that you need to write down.
16. Windows Media Center automatically detects the Xbox 360 and asks you
    to connect to it.
17. Follow the Windows Media Center extender setup on the Windows Media
    Center. It will ask you to install some software to allow streaming
    to extenders.
18. When the extender setup is done, it'll finally ask you for that
    eight digit number. Enter that, and you'll be connected.
19. On the Xbox 360, you'll be in a Media Center screen once the
    connection is complete. Navigate to the My Movies section, select
    the movie, and select the "Watch Stream" option. Transcode360 will
    do its job and transcode the VIDEO\_TS directly to your Xbox 360.

The downside to this is that you don't get the option of setting up
sound or other options. If you have foreign language movies, you won't
get the ability to decide whether you watch it overdubbed or in the
original language (or whether you see subtitles). You also don't get to
choose which feature you watch, so if you have, say, an episodic TV DVD,
you'll only really be able to watch the first episode on the disc. But
for the 80% case, you should be set.
 
 Now I have some decisions to make. It turns out my wife isn't quite as
hot on the media center idea as I am, but since she only saw the proof
of concept and it was jumpy and sort of sucked, I don't think she's
fully realized the coolness (sort of how the coolness of DVR is still
setting in - we still end up watching "appointment TV" even though we
know things are getting recorded). That means I need to be super frugal
about how I go about this.
 
 I can start getting storage together and using [the standard Windows XP
UPnP file sharing
deal](http://www.microsoft.com/windows/windowsmedia/devices/wmconnect/default.aspx)
to get movies to my Xbox, storing two copies - the VIDEO\_TS and a
compressed Xbox version. Not optimal, but it would get us in the habit
of using the Xbox for movies and would be a cheap way to see if we like
it.
 
 If we do like it, the question will be whether we have a single media
center and several extenders or whether we have a network attached
storage/file server setup with several full media centers. I think that,
too, will have to be in stages. I'll be getting a copy of Windows Vista
Ultimate from [MIX](http://visitmix.com) and I could upgrade our
existing PC to use that and be a more "central" media center to stream
to extenders. It doesn't have a TV-out on it, so it wouldn't do for a
full media center. If we get to a point where we want the full menus or
the streaming just isn't enough, we can get [a cheap media center PC for
the living room](http://www.cyberpowerpc.com/r07/ri07.asp) and have it
get movies over the network.
 
 Anyway, I'm glad to see it works. Time to determine next steps.
