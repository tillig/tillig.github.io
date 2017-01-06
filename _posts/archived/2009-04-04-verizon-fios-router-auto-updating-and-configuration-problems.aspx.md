---
layout: post
title: "Verizon FiOS Router Auto-Updating and Configuration Problems"
date: 2009-04-04 -0800
comments: true
disqus_identifier: 1510
tags: [General Ramblings,GeekSpeak]
---
This is more of a vent than anything else, but there's a bit of a lesson
learned, at least for me, here.

I just spent the last three hours fighting my home network. I got a
little snippy with Jenn, who didn't deserve it, due to the ridiculously
high frustration levels. Darn close to broke a lot of stuff at random
just because I was so pissed.

**The problem**: Xbox Live was not connecting and, on testing, was
telling me that my NAT settings were set to "moderate."

Let me give you a little background.

Xbox Live requires certain ports to be freely available to it. I don't
recall which ones and I'm too irritated right now to go Google them for
you so I'll trust you can do that on your own. The ports are not the
point. The point is, if you don't have these ports available, Xbox Live
will sometimes decide to throw little network curve balls your way, like
you'll be able to connect to half of your gaming group but not the other
half. Or you'll be able to do video chat but you'll get no audio. Crap
like that.

In order to determine if you've figured out the magic combo, you do a
"network test" from the Xbox dashboard and it basically gives you either
a green light or an unhelpful message telling you about a problem. The
message will say something about your "NAT settings are Moderate" or
your "NAT settings are Strict."

You don't want Moderate or Strict, you want Open. Open means Xbox Live
can get to all the stuff it needs to get to and will choose not to hose
you in the middle of your Call of Duty session with your dad and uncle.

Usually I have no problems. My NAT has always been Open. Every once in a
while, though, and it's ever since we got Verizon FiOS, my NAT will
suddenly change from Open to Moderate. I've never hit Strict, but it
doesn't matter, because it may as well be black and white - Moderate is
bad news.

The trouble is that I can't predict when it's going to decide to change.
Sometimes it just "changes" and rebooting the Xbox will fix it.
Sometimes rebooting the router fixes it. Sometimes waiting an hour fixes
it. Sometimes checking an arbitrary setting on the router and then
unchecking it again - just change something and change it back - fixes
it. It's entirely unpredictable. I think I figured out what causes it,
though.

Tonight I got the Moderate NAT problem. Again. So I was trolling through
my settings and found that there were a bunch of weird port forwarding
rules that I don't remember setting up. Innocuous stuff for valid
applications like MS Messenger, but I didn't set them up - they got set
up by UPnP. I also noticed that the admin interface was slightly
different from the last time I was in there.

Verizon auto-updates stuff.

I knew they auto-updated the firmware on the set-top boxes, but I didn't
think about the damn routers. They've been updating crap and I'd bet
dollars to donuts the NAT problems I see crop up sporadically coincide
with these helpful updates.

I couldn't figure out how to fix it this time. I had the Xbox as a DHCP
client, so I switched it to a static IP and added some port forwarding
rules. No luck. I messed around with all sorts of crazy settings, no
luck. NAT = Moderate.

In the end, I went catastrophic. Full reset to factory defaults. Put the
WEP key back in, put the SSID back in, reconfigure everything. And you
know what?

THAT FIXED IT. Suddenly the NAT was back to Open.

What a load of crap.

