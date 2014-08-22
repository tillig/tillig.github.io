---
layout: post
title: "Add Downloaded iTunes Art Directly to Track"
date: 2011-06-06 -0800
comments: true
disqus_identifier: 1719
tags: [Code Snippets,Media]
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

    // Add-DownloadedCoverArtToFile.js
    // By Travis Illig - http://www.paraesthesia.com
    // THIS SCRIPT MODIFIES YOUR ITUNES TRACKS TO EMBED DOWNLOADED
    // ARTWORK INTO TRACKS. USE AT YOUR OWN RISK. BACK UP YOUR FILES
    // BEFORE RUNNING.
    //
    // Open iTunes, then run using cscript:
    // cscript Add-DownloadedCoverArtToFile.js

    // Set MAX_TRACKS_TO_PROCESS to the max number of tracks to process
    // in a single script run. Since artwork processing can take a long
    // time, if you have a large library you may not want the script running
    // for hours to do the whole library at once.
    var MAX_TRACKS_TO_PROCESS = 250;


    // DON'T MODIFY BELOW THIS LINE
    // unless you know what you're doing. :)

    // Get the set of all tracks from the library.
    var iTunesApp = WScript.CreateObject("iTunes.Application");
    var allTracks = iTunesApp.LibraryPlaylist.Tracks;
    if(allTracks == null)
    {
      WScript.Echo("Unable to get list of library tracks!");
      WScript.Quit();
    }

    // Initialize some global values we'll use later.
    var scriptWorkingDirectory = WScript.ScriptFullName.substr(0, WScript.ScriptFullName.length - WScript.ScriptName.length);
    var fso = WScript.CreateObject("Scripting.FileSystemObject")
    var numTracks = allTracks.Count;
    var completePercent = 0;
    var numProcessed = 0;

    // Process the tracks.
    for (var i = 1; i <= numTracks; i++) 
    {
      var currentTrack = allTracks.Item(i);
      
      // Only handle local tracks that aren't podcasts and that have downloaded art.
      if(
        currentTrack.URL != null ||
        currentTrack.Podcast ||
        currentTrack.Location == null ||
        !HasDownloadedArtwork(currentTrack))
      {
        continue;
      }
      
      // Only handle tracks with ONE piece of artwork. If a track has multiple pieces
      // of art, the order can be important and that's not something we want to deal with.
      if(currentTrack.Artwork.Count > 1)
      {
        WScript.Echo("WARNING: '" + currentTrack.Name + "' has " + currentTrack.Artwork.Count + " pieces of art, one of which is downloaded. Process manually.");
        continue;
      }

      try
      {
        WScript.Echo("   * " + currentTrack.Artist + " - " + currentTrack.Album + " - " + currentTrack.Name);

        // Extract the art to a temp file, embed it in the track, and delete the temp file.
        var tempFileName = scriptWorkingDirectory + CreateGuid() + ".bmp";
        var artToSave = currentTrack.Artwork.Item(1);
        artToSave.SaveArtworkToFile(tempFileName);
        artToSave.Delete();
        currentTrack.AddArtworkFromFile(tempFileName);
        fso.DeleteFile(tempFileName);
      }
      catch(ex)
      {
        WScript.Echo("Error processing " + currentTrack.Artist + " - " + currentTrack.Name + ": " + ex);
      }
        

      // Provide a percent complete status message.
      var currentComplete = Math.floor((i / numTracks) * 100);
      if(currentComplete - completePercent >= 5)
      {
        completePercent = currentComplete;
        WScript.Echo("Processed: " + completePercent + "% of library.");
      }
      
      // Bail early if we hit the max tracks to process.
      numProcessed++;
      if(numProcessed >= MAX_TRACKS_TO_PROCESS)
      {
        WScript.Echo("Ending processing early - reached max tracks to process (" + MAX_TRACKS_TO_PROCESS + ")");
        break;
      }
    }
    WScript.Echo("Done.");

    // Checks a track to see if any piece of artwork associated
    // is a downloaded art item.
    function HasDownloadedArtwork(artTrack)
    {
      if(artTrack == null || artTrack.Artwork == null || artTrack.Artwork.Count == 0)
      {
        return false;
      }
      var artwork = artTrack.Artwork;
      var numArtwork = artwork.Count;
      for (var artCounter = 1; artCounter <= numArtwork; artCounter++)
      {
        var currentArtwork = artwork.Item(artCounter);
        if(currentArtwork.IsDownloadedArtwork)
        {
          return true;
        }
      }
      return false;
    }

    // Creates a new GUID that we can use as a temporary filename.
    function CreateGuid()
    {
      var scriptTypeLib = new ActiveXObject("Scriptlet.TypeLib");
      return scriptTypeLib.GUID.substr(1, 36);
    }

I've run this pretty extensively in a test environment and I'll be
running it on my 15K track library shortly. Again, though, **BACK UP
YOUR LIBRARY BEFORE RUNNING THIS SCRIPT and USE AT YOUR OWN RISK. If
your tracks all end up corrupted, you're on your own.**

**Download:**[**Add-DownloadedCoverArtToFile.zip**](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!45335&authkey=!AP_5xIL2w-rWneI&ithint=file%2czip)**(1.7KB)**

