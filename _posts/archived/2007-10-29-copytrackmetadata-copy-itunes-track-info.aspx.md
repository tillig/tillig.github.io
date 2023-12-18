---
layout: post
title: "CopyTrackMetadata - Copy iTunes Track Info"
date: 2007-10-29 -0800
comments: true
disqus_identifier: 1282
tags: [media,music,windows,dotnet,downloads]
---
I'm in the process of re-ripping a lot of my CD collection in a higher
quality format and I noticed that iTunes doesn't necessarily detect that
I already have the song in my library and offer to copy the metadata
from the old version to the new one for me.  But I need that - I need to
be able to copy all the metadata (including artwork and playlist
membership) from the old version of the track to the new one so I can
delete the old version and keep on truckin'.

It's doubly difficult when you realize that the iTunes UI doesn't
actually allow you to modify all of the metadata - things like play
count don't have an interface.  So - time for a program.

The CopyTrackMetadata program I wrote allows you to copy any or all of
the metadata from a source track to a destination track.  Just open
iTunes, open the app, choose which metadata you want to copy, select the
source and destination tracks, and click "Copy."  Done.

Here's the main window:

![CopyTrackMetadata main
window](https://cloud.githubusercontent.com/assets/1156571/21692345/303fe84c-d331-11e6-8872-2246f6262966.png)

And the myriad options you have on which metadata to copy:

![CopyTrackMetadata options
dialog](https://cloud.githubusercontent.com/assets/1156571/21692353/39ba778e-d331-11e6-9235-254283ffa1a1.png)

It's totally free, and it works great for me, but if it somehow destroys
your music collection, you're on your own - this is totally unsupported.

[**Download CopyTrackMetadata
1.2.0**](https://github.com/tillig/CopyTrackMetadata/releases/download/v1.2.0/CopyTrackMetadata_1.2.0.zip)

[**Download CopyTrackMetadata 1.2.0
Source**](https://github.com/tillig/CopyTrackMetadata/archive/v1.2.0.zip)

**Version History:**

- **1.0.0:** First release.
- **1.2.0:** Updated for .NET 3.5 and fixed a breaking change in the
way tracks get selected in iTunes 9.
