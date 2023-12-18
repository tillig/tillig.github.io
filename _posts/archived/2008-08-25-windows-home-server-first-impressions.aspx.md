---
layout: post
title: "Windows Home Server First Impressions"
date: 2008-08-25 -0800
comments: true
disqus_identifier: 1437
tags: [media,windows]
---
[![HP EX475 MediaSmart
Server](http://ecx.images-amazon.com/images/I/51yjoKfxx2L._SL500_AA180_.jpg)](http://www.amazon.com/gp/product/B000UXZUZC?ie=UTF8&tag=mhsvortex&linkCode=as2&camp=1789&creative=9325&creativeASIN=B000UXZUZC)After
pondering [various
options](/archive/2008/08/21/more-media-server-options.aspx) for media
center related storage, Jenn and I happened to be walking through
[Fry's](http://www.frys.com/) this weekend and saw they had dropped
prices on [HP MediaSmart
Servers](http://www.amazon.com/gp/product/B000UXZUZC?ie=UTF8&tag=mhsvortex&linkCode=as2&camp=1789&creative=9325&creativeASIN=B000UXZUZC)
quite a bit so we bit the bullet and got the 1TB model.

So far, I like it quite a bit.

The form factor really surprised me. It's small. Like, so small we
walked right past it in the store and didn't even notice it. We ended up
asking where they were and when we saw it we were surprised by the size.
I expected a mini-tower; it's really only about nine inches tall and
five inches wide. The whole package is fairly aesthetically pleasing so
if you don't have a desk to put it under, it's not going to look bad
sitting in plain sight.

Setup went surprisingly smoothly, which is far better than I can say
about most of the electronics purchases I make. I always find there's
something "special" about my environment, even though I try not to do
anything too out of the ordinary, and it makes things that are supposed
to be simple very difficult. The only hitch I ran into during the setup
was something they warn you about several times in the guide: your
firewall/antivirus software may cause the server not to be found from
your network, so you may have to adjust accordingly. I shut it down long
enough to connect to the home server and everything is peachy keen. (Of
course, the Home Server detected I had the firewall shut down, so for a
few minutes I couldn't figure out why it kept telling me my "network
health was critical." Eventually I got things set up enough that it was
able to tell me very clearly that the firewall was down. Putting it back
up restored network health to normal.)

The server is headless, so you control it entirely through the "Windows
Home Server Console," a remote desktop style application. It's very easy
to use, not giving you so many thousands of configuration options that
you don't know what to click - it's clear and concise, which is a huge
relief. It removes the burden of finding the checkbox hidden 15 levels
deep and "just works."

Actually, the level of configuration reminded me of a game console. Like
when you set up your Xbox 360 or Playstation 3 on the network and
configure one or two things - you don't have to deal with verifying the
drivers are set up right, or tweaking the registry to get it to perform,
or running command-line programs to register or configure things... it
just works. It will even configure your router for you through UPnP if
you want to expose your server on the internet so you can get to your
media remotely. I'd never seen that before and I wonder why it's not
available in things like the Xbox 360, which requires certain ports to
be open to connect to Xbox Live.

The only real complaint I have, if you could call it that, is that it's
so high-level that it doesn't really reveal what some of the
functionality is doing behind the scenes. For example, there's [an
iTunes sharing
function](http://blogs.technet.com/seanearp/archive/2007/12/02/hp-mediasmart-as-an-itunes-server.aspx)
on it that I'd love to use instead of [my multi-user iTunes
hack](/archive/2005/04/10/multi-user-itunes.aspx), but I'm not sure how
it works so I'm reluctant to start moving things around onto the server
before I understand what it's doing... but there's nothing in the docs
to explain what's going on beyond explaining how to configure it.

Regardless, this solves my media storage problem, so at the very least I
can start ripping DVDs in VIDEO_TS format and saving them here. My
laptop has Vista Ultimate on it, and I have another license for it that
I can put on my Windows XP desktop (once I've migrated the shared data
off there - it's my "file server" right now), so I can try out [My
Movies](http://www.mymovies.dk/) on one of those and see how it goes.
