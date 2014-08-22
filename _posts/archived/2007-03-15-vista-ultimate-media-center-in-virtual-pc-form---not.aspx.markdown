---
layout: post
title: "Vista Ultimate Media Center in Virtual PC Form - Not Great"
date: 2007-03-15 -0800
comments: true
disqus_identifier: 1162
tags: [GeekSpeak]
---
I decided to
[continue](/archive/2006/09/18/dvd-iso-via-mediaportal.aspx)
[my](/archive/2006/10/02/mediaportal-and-dvd-iso-seems-to-work.aspx)
[research](/archive/2007/01/29/iso-vs.-video_ts-storage-for-media-center.aspx)
into getting my DVDs into a network storage format for play by a home
theater PC, this time by getting a [Windows Vista
Ultimate](http://www.microsoft.com/windows/products/windowsvista/editions/ultimate/default.mspx)
system up and running to try out [My Movies](http://www.mymovies.name)
and see how it worked. I also wanted to find out how difficult it was to
get movies playing on my Xbox 360 using the Media Center Extender
functionality. (Yes, I could have tried [Windows Vista Home
Premium](http://www.microsoft.com/windows/products/windowsvista/editions/homepremium/default.mspx),
too, but figured, why not Ultimate?)
 
 The problem is, I don't have a system I can just flatten and dedicate
to this, especially seeing as how I just wanted to try it out really
quick without actually activating it, so it'd be up and running for less
than 30 days. I decided this was the perfect opportunity to use [Virtual
PC
2007](http://www.microsoft.com/downloads/details.aspx?FamilyId=04D26402-3199-48A3-AFA2-2DC0B40A73B6&displaylang=en)
to create a Vista Ultimate virtual machine and do all my work there - in
a totally throw-away environment.
 
 I didn't get far.
 
 Vista itself installed reasonably well. It was simple and
straightforward, though it wasn't super quick. I suppose you can't
really blame it for being slow since it was installing from an ISO image
that was stored on the same physical drive as the VPC software and the
VM image. So the disk churned a lot, and I recognize that as a vastly
non-optimal setup, but I also figured I didn't need it to be *super
fast*, I just needed to see it *basically function*.
 
 The next step I took was to try installing My Movies 2.20.
Unfortunately, it wouldn't install since it requires .NET 1.1 SP1 and
Vista Ultimate only comes with 2.0 and 3.0 pre-installed. Downloaded and
installed [.NET
1.1](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=262D25E3-F589-4842-8157-034D1E7CF3A3)
as well as
[SP1](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=A8F5654F-088E-40B2-BBDB-A83353618B38),
then got My Movies installed. Cool. Time to fire up Windows Media
Center.
 
 Media Center started and after a few setup steps, I was into the menus.
I didn't see the My Movies options, but it turns out there's a [known
defect in
2.20](http://www.mymovies.name/mce/forum/Default.aspx?g=posts&t=3567)
that My Movies doesn't properly add itself to the menus in Media Center.
Luckily there's a "My Movies" icon that gets installed in the Start menu
and if you start Media Center from that, you go straight into My Movies.
But we'll get there in a second.
 
 Not seeing the My Movies options anywhere in the menus, I decided to
poke around Media Center a little. This is where I started seriously
noticing the Virtual PC issues. Menus were slow to redraw, there was no
animation to anything, the mouse cursor sometimes just disappeared... it
was pretty horrible. I tried watching one of the sample videos that get
installed with Vista and got a message about how some files weren't
working correctly or something. Turns out Vista really seems to want
64MB of video RAM and the max that Virtual PC will give it is 8MB.
Exiting Media Center and trying the videos directly from Windows Media
Player was successful (though very jumpy with several frames getting
skipped at a time). I'm thinking Media Center had used up all my
whopping 8MB of virtual video RAM and that was that. No more worky.
 
 But I wasn't going to get mired by that! There was still more to do! I
figured since I wouldn't be actually playing the movies on the VM - I'd
only be streaming them to my Xbox 360 to play - that it didn't really
matter if I couldn't get things playing right there.
 
 Following some tips in the [My Movies
forums](http://www.mymovies.name/forum.aspx), I enabled the DVD Gallery
feature in Media Center [using a KB article at
Microsoft](http://support.microsoft.com/kb/930526). I figured this would
be helpful to troubleshoot differences between how Media Center handles
movies directly and how My Movies handles movies. Regardless, I didn't
figure it hurt anything, so there we go.
 
 I [downloaded and installed
Transcode360](http://www.runtime360.com/projects/transcode-360/) in
preparation for the connection to my Xbox 360. In order to get it to
work properly, I had to right-click the shortcut in the Start menu and
modify the properties to tell it to Run as Administrator. If you have
User Access Control enabled and you don't do that, you only get
exceptions when you try to start it up. (That's not documented anywhere;
I had to figure that out myself.)
 
 OK! I had Vista Ultimate, My Movies, and Transcode360. Time to get a
movie ripped and try this bad boy out!
 
 I brought a DVD in today, fired up the VPC, fired up My Movies, and
inserted the DVD into the drive. I told the VPC to capture the physical
DVD drive as the VM drive so I could access the DVD...
 
 ...and this is where my fun ended. Media Center instantly became
entirely unresponsive. Like, full seconds between putting your mouse
cursor over a menu option and having the menu option highlight in
preparation to be clicked. Removed the DVD from the drive and things
became mildly responsive again.
 
 To test things out, I exited Media Center and put the disc back in the
drive. I wanted to see if the performance death had anything to do with
Media Center. Turns out it didn't - I inserted the DVD and got a few
options on the Autoplay menu - I could install a DVD player from the
disc, play the DVD with Windows Media Player, or play the DVD with
Windows Media Center. I chose Windows Media Player. The player came
up... and sat there doing nothing. I left it for several minutes and it
never responded. I think this is, again, the video RAM issue coming back
to bite me.
 
 Regardless, I think my test of Vista Ultimate in a VPC environment is
done. I believe several issues I fought with were due to the limitations
of the VPC environment, but I also think there was some odd stuff going
on with My Movies that needs to be fixed before I can get back into it.
 
 In my web-based travels trying to find solutions, I found out about a
lot of limitations to Media Center Extender technology (including the
codecs that are supported, which is why Transcode360 is required) that
make me wonder if using the Xbox 360 as an extender really is the best
way to go or if maybe just getting a dedicated home theater PC might be
a better idea and use some network attached storage so if I need to add
more stations, I can put a PC in each room and just connect to the
central storage.
