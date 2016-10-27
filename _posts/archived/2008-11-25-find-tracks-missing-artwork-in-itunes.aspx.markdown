---
layout: post
title: "Find Tracks Missing Artwork in iTunes"
date: 2008-11-25 -0800
comments: true
disqus_identifier: 1468
tags: [media,music,windows,vbscript]
---
I'm a huge stickler for metadata in my iTunes library and for the most
part, I can find incorrect or missing data by using the iTunes smart
playlists - I have one, for example, that checks for "Year is 0" so I
can find tracks that don't have a year associated with them.

One of the missing features in there is that you can't set up a smart
playlist that tells you which tracks don't have artwork. So, to fill
that gap, I wrote a script that does it for you. This little JScript,
when run, will create a regular playlist called "Missing Artwork" with
any tracks that it finds that don't have any artwork items associated (a
track can have multiple pieces of artwork, not just one).

Just ran it myself on my library and it works like a champ. **Standard
disclaimers apply: use at your own risk, YMMV, I'm not responsible for
what happens if something goes awry, etc.**

```vbscript
    var ITTrackKindFile = 1;
    var iTunesApp = WScript.CreateObject("iTunes.Application");
    var numTracksWithoutArtwork = 0;
    var mainLibrary = iTunesApp.LibraryPlaylist;
    var tracks = mainLibrary.Tracks;
    var numTracks = tracks.Count;
    var foundTracks = new Array();

    WScript.Echo("Checking " + numTracks + " tracks for missing artwork...");
    while (numTracks != 0)
    {
      var  currTrack = tracks.Item(numTracks);

      if (currTrack.Kind == ITTrackKindFile)
      {
        if(currTrack.Artwork == null || currTrack.Artwork.Count == 0)
        {
          numTracksWithoutArtwork++;
          foundTracks.push(currTrack);
        }
      }

      numTracks--;
    }

    if (numTracksWithoutArtwork > 0)
    {
      WScript.Echo("Found " + numTracksWithoutArtwork + " tracks missing artwork. Creating playlist...");

      var playList = iTunesApp.CreatePlaylist("Missing Artwork");
      for(var trackIndex in foundTracks)
      {
        var currTrack = foundTracks[trackIndex];
        playList.AddTrack(currTrack);
      }
      WScript.Echo("Playlist created.");
    }
    else
    {
      WScript.Echo("No tracks missing artwork were found.");
    }
```
