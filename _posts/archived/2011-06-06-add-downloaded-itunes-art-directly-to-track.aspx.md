---
layout: post
title: "Add Downloaded iTunes Art Directly to Track"
date: 2011-06-06 -0800
comments: true
disqus_identifier: 1719
tags: [media,windows,music,javascript,downloads]
---
In iTunes, if you have a track that is missing artwork you have the
ability to right-click the track and opt to automatically download
artwork for it. This works well if you play the track in iTunes or an
iTunes-connected device (e.g., iPod)... but if you also use the same
library in a UPnP server to stream your music on your network ([like
Asset
UPnP](/archive/2009/08/11/stream-more-music-from-windows-home-server-with-asset-upnp.aspx))
then you'll notice the artwork doesn't show up. That's because iTunes
stores the downloaded artwork in a separate database outside the actual
physical music track file, but other servers/devices expect artwork to
be embedded in the track.

Luckily, with a little scripting, you can fix this.

I wrote this script to run on a Windows machine and copy the downloaded
artwork directly into the track.

**WARNING: THIS SCRIPT MODIFIES THE TRACKS IN YOUR LIBRARY. BACK YOUR
FILES UP BEFORE RUNNING IT.** That seems obvious, but just in case it
wasn't clear, there you go.

<script src="https://gist.github.com/tillig/2048bf75fd84c5717a47a0d7fc5e7fab.js"></script>

I've run this pretty extensively in a test environment and I'll be
running it on my 15K track library shortly. Again, though, **BACK UP
YOUR LIBRARY BEFORE RUNNING THIS SCRIPT and USE AT YOUR OWN RISK. If
your tracks all end up corrupted, you're on your own.**

**[Download](https://gist.github.com/tillig/2048bf75fd84c5717a47a0d7fc5e7fab)**
