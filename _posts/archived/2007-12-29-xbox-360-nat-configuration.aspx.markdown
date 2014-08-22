---
layout: post
title: "Xbox 360 NAT Configuration"
date: 2007-12-29 -0800
comments: true
disqus_identifier: 1330
tags: [Gaming]
---
Amid the other problems I'm having with my Xbox 360 and Xbox Live, this
morning I seemed unable to recover my gamertag. When I did the network
diagnostic, I found that the NAT settings came up as "Moderate" (on the
Xbox Live scale of "Strict," "Moderate," and "Open," you really need
that to say "Open").

To make it read "Open," you need to forward the following ports through
your router to your Xbox (which means you'll also need a static IP
address on your Xbox):

-   UDP 88
-   UDP 3074
-   TCP 3074

Lucky for me, [PortForward.com](http://portforward.com/) has some great
free how-to articles on setting up just that. Here's [the guide to
setting up a static IP address on your Xbox
360](http://portforward.com/networking/staticip-xbox360.htm) and [the
guide for Xbox Live port forwarding on a Linksys
WRT54G](http://portforward.com/english/routers/port_forwarding/Linksys/WRT54G/Xbox_Live_360.htm).

Interestingly enough, after futzing around with this and getting it to a
situation where I couoldn't even connect to Xbox Live at all, I put all
my settings back the way they were (remember they were "Moderate?") and
suddenly it was seen as "Open." I guess you never can tell.

