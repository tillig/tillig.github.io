---
layout: post
title: "Video RAM Limitations in Virtual PC"
date: 2007-03-20 -0800
comments: true
disqus_identifier: 1166
tags: [media,windows]
---
I think my [virtual machine trials for Windows Media
Center](/archive/2007/03/15/vista-ultimate-media-center-in-virtual-pc-form-not.aspx)
may be coming to an end. The reason? I'm running into unfortunate
limitations due to the video RAM that [Virtual PC
2007](http://www.microsoft.com/downloads/details.aspx?FamilyId=04D26402-3199-48A3-AFA2-2DC0B40A73B6&displaylang=en)
gives me. [Virtual PC emulates an S3 Trio 64 video card with 8MB of
video
RAM](http://blogs.msdn.com/virtual_pc_guy/archive/2005/11/21/494961.aspx)

- apparently not enough to get a DVD to play, at least for me.

 See, I installed Windows XP Media Center Edition 2005 on a Virtual PC
yesterday and while I got a bit further than I did with Vista Ultimate
([My Movies](http://www.mymovies.name/) installed correctly, for
example), I'm still unable to actually play a DVD in the virtual machine
because there's not enough video memory. Of course, that's not the error
I get - it's usually something about files or drivers not working or
some crap like that, but since I've got actual physical machines running
Windows XP that can play DVDs fine, I have to blame it on the video RAM
because everything else seems to be just fine.

 Hmmm... unless it's the whole virtualized video card that's the
problem. Eh. Regardless, there's trouble in video town.

 I can see why people go with [VMware](http://www.vmware.com/) for
anything beyond the most basic virtualization needs. Virtual PC is great
if you're throwing together a quick server-based, non-UI-intensive
thing, but when you get to trying something like a virtual media center,
it falls flat on its face. (Granted, I haven't tried this in VMware, so
it, too, might fall flat. But since I don't have VMware and it's not
free, I can't really do much to test that theory.)

 I did get [DVD Decrypter](http://www.dvddecrypter.org.uk/) installed on
the Windows XP VM, but it kept coming across errors when I tried to rip
a movie. I'm guessing that, too, is virutalization problems having to do
with the drive or something.

 My last ditch effort with both of these VMs: I'm going to rip a movie
on a non-virtual machine. I'll transfer the movie over to each virtual
machine, making the assumption that if these were on real hardware we
wouldn't be running into the ripping issues. I'll then try to get my
Xbox 360 to communicate with each virtual machine and see how that goes.
Technically speaking, if it works, I won't really be playing movies
directly on the media server anyway, so I'll just make the assumption
that everything works as far as the ripped movie is concerned and see if
the media server can at least serve it up to the extender.

 If I can get that to work, it'll at least give me hope that allocating
actual hardware to the effort is worth it. Assuming it works, I'll see
if I can dredge up some sort of low-end spare computer from someone and
try it on actual hardware.

 My last-ditch e
