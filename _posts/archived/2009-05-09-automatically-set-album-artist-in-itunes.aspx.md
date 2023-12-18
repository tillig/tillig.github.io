---
layout: post
title: "Automatically Set Album Artist in iTunes"
date: 2009-05-09 -0800
comments: true
disqus_identifier: 1522
tags: [media,music,windows,vbscript]
---
I'm working on getting my Windows Media Center to play my iTunes files
(by installing codecs and tag readers) and one of the things I'm doing
is setting the album artist on all of the tracks because that's
something Windows Media Center needs set to get album art properly.
While doing it, I found there were basically two classes of track that
didn't already have the album artist tag set - those that fell into
"Various Artists" (like soundtracks and such) and those where the artist
should also be set as the album artist.

To make it easy and less tedious, I wrote a script to set the album
artist field to the artist. I figured I'd pass it along for other folks
to use at their own risk. No promises this won't corrupt your library or
anything. Keep backups.

**First, make sure you've set all of the tracks that are "Various
Artists" as such.** This script doesn't take care of that for you. It's
not smart, it just sets "artist = album artist" for tracks missing album
artist. Once you've taken care of all of your "Various Artists" tracks,
run this script:

```vbscript
    var ITTrackKindFile  = 1;
    var iTunesApp = WScript.CreateObject("iTunes.Application");
    var numTracksWithoutAlbumArtist = 0;
    var mainLibrary = iTunesApp.LibraryPlaylist;
    var tracks = mainLibrary.Tracks;
    var numTracks = tracks.Count;
    var foundTracks = new Array();

    WScript.Echo("Checking " + numTracks + " tracks for missing album artist...");
    while (numTracks != 0)
    {
      var  currTrack = tracks.Item(numTracks);

      if (currTrack.Kind == ITTrackKindFile && !currTrack.Podcast)
      {
        if(currTrack.AlbumArtist == null || currTrack.AlbumArtist.length == 0)
        {
          numTracksWithoutAlbumArtist++;
          foundTracks.push(currTrack);
        }
      }

      numTracks--;
      if(numTracks % 1000 == 0)
      {
        WScript.Echo(numTracks + " tracks left to check...");
      }
    }

    if (numTracksWithoutAlbumArtist > 0)
    {
      WScript.Echo("Found " + numTracksWithoutAlbumArtist + " tracks missing album artist. Creating playlist and updating artists...");

      var playList = iTunesApp.CreatePlaylist("Fixed Album Artists");
      for(var trackIndex in foundTracks)
      {
        var currTrack = foundTracks[trackIndex];
        currTrack.AlbumArtist = currTrack.Artist;
        playList.AddTrack(currTrack);
      }
      WScript.Echo("Playlist created.");
    }
    else
    {
      WScript.Echo("No tracks missing album artist were found.");
    }
```

What it does is:

- Iterate through all of the tracks in your library and find the ones
    that aren't Podcasts that have no album artist.
- Creates a playlist.
- Sets the artist as the album artist on the tracks it found.
- Adds those tracks to the playlist so you know which tracks were
    updated.

In the event it does something wrong, you can always select all the
tracks in the created playlist and set the album artist back to empty.

Again, YMMV, use at your own risk... but it worked great for me.
