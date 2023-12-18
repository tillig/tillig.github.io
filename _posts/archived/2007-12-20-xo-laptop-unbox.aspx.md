---
layout: post
title: "XO Laptop Unbox"
date: 2007-12-20 -0800
comments: true
disqus_identifier: 1325
tags: [personal]
---
[![XO Laptop Unbox](http://lh3.google.com/travis.illig/R2nlZJJGnvE/AAAAAAAAATE/6Pi_Rqwf_7w/s160-c/XOLaptopUnbox.jpg)](http://picasaweb.google.com/travis.illig/XOLaptopUnbox)

[XO Laptop Unbox](http://picasaweb.google.com/travis.illig/XOLaptopUnbox)

Yesterday I received [my XO
laptop](/archive/2007/11/14/bought-my-xo-laptop.aspx) from [the One
Laptop Per Child "Get One, Give One"
program](http://www.laptopgiving.org/en/give-one-get-one.php).  I got
[some pictures of the laptop being unboxed and booted up for the first
time](http://picasaweb.google.com/travis.illig/XOLaptopUnbox) so you can
check those out if you're interested.

It doesn't ship with much in the way of instructions - it relies on you
either connecting to their web site to get started or "exploring" the
interface to see what things do.  That actually brought me to my first
problem - connecting to the Internet.

The way [the networking on the
thing](http://www.laptop.org/en/laptop/start/connecting.shtml) works,
you visit a "neighborhood" page that displays a graphical representation
of the wireless access points available to you as well as mesh networks
and other XOs that you can connect to.  That was my first stumbling
block: It only displays wireless access points that broadcast their SSID
(mine didn't).

It runs a flavor of Linux, so I suppose if you're a Linux person you
could do some manual configuration and get it to connect that way.  I'm
a Windows person, and while I have run Linux before, I'm not really that
knowledgeable about it, so the best I could do was try [their manual
wireless network association
steps](http://wiki.laptop.org/go/Manual_Wireless_Association) to see if
that worked.  It did... for as long as I was in that terminal session.
But as soon as I rebooted, the connection was lost and I was back to
square one.  So, rather than fight that beast, I just turned SSID
broadcast on.  Hey, that wasn't really stopping the malicious folks out
there anyway.

It won't connect to [WPA networks
(yet)](http://wiki.laptop.org/go/WPA_Manual_Setting), which isn't a
problem for me since I'm still in the stone age using WEP.  After some
trouble getting the security on it set up, I finally got connected.
Honestly, I don't know how kids are supposed to do this, but maybe they
assume that school wireless access points are just open without any
security or something.  Maybe that's how it really is.

The only other real problem I had with it was that the initial setup
(when you first boot up) asks you your name and what colors you want
your little computer icon to be.  (Your icon represents you on the
network.)  Once you've set them, though... there's no control panel
applet or anything to change them with.  It took me a while, but I found
that they have [a command-line interface to change these things called
"sugar-control-panel."](http://wiki.laptop.org/go/Sugar_Control_Panel)
Got my stuff all customized up and now I'm set.

The interface is primarily graphically-driven.  There's very little
text, which is good for its purpose (kids, developing countries, etc.),
but not so accessible until you've really explored the thing and learned
what it all means and does.  [Applications are referred to as
"activities"](http://wiki.laptop.org/go/Activities) and it ships with
several pre-installed ones including a web browser, an RSS reader, a
paint program, and a Python programming environment.  There's no email
program, but there is [a Gmail
activity](http://wiki.laptop.org/go/Gmail) currently under development
(right now it just launches the browser).

All in all, I think it's a pretty great tool.  If they'd had this in
school instead of ye olde Apple IIe, I'd maybe have learned something
more than the BASIC code that runs the cannons and castles game.  On the
other hand, I've found already that I've interfaced a lot with a Bash
prompt (the "terminal" activity) already and, without any instruction,
I'm not sure how kids are going to know what to do with some of the
stuff.  From "I've never seen a computer" to "I'm programming in Python"
is a pretty steep learning curve.  I think the real good stuff will be
from the additional activities you can download as well as coupling this
with a teacher's curriculum.

Now they just need to get a [Mono](http://www.mono-project.com)
activity.  Awww yeaaah.  (Luckily, it looks like [someone's thought of
this](http://wiki.laptop.org/go/Mono).)

If you're interested in learning more about the One Laptop Per Child
charity, how to give, or how to use the XO laptop, check out
[www.laptop.org](http://www.laptop.org).
