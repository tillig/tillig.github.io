---
layout: post
title: "Getting iTunes Music to Play in Windows Media Center"
date: 2009-05-19 -0800
comments: true
disqus_identifier: 1528
tags: [Media]
---
While it was not my primary goal, one of the things I thought would be a
"nice to have" in [my Windows Media Center
solution](/archive/2008/09/30/overview-of-my-media-center-solution.aspx)
is the ability to play my music through the Media Center interface. The
big wrench in the works there, though, is that I primarily use iTunes to
manage my music and much of it is in AAC and Apple Lossless formats.
Due, I'm sure, to some ridonkulous licensing crap, Windows Media Center
does not play either of those formats natively, so getting my music in
there looked like it was going to be painful.

**The Goal**: Get my music into Windows Media Center.

**Requirements**:

-   **As few moving pieces as possible**. That is, if I don't have to
    have a script that runs a sync operation that happens on a scheduled
    basis or something, I don't want it. This is similar to the "simple,
    simple, simple" goal [I mentioned in my Media Center
    overview](/archive/2008/09/30/overview-of-my-media-center-solution.aspx).
-   **All music playable except the DRM-laden tracks**. I want my entire
    library available, not just a subset of the tracks. That said, since
    I have very few purchased tracks from iTunes, if I can't play the
    licensed music due to DRM issues, that's OK. Out of like 13,000
    tracks, I think like 10 or less have the DRM on them. (I have a lot
    of CDs.)
-   **Metadata visible in Media Center**. At the very least, I want to
    see album title, track name, artist, and the cover art. Nice to have
    would be the year, genre, etc. but I don't normally navigate by
    those things.
-   **Playlist import is optional**. I have several playlists in iTunes
    but I'm not necessarily glued to them. If they don't make it to
    Media Center, I won't be heartbroken.

**Options**:

Given all that, I basically have two options that I found.

1.  **Buy MCETunes**. [MCETunes](http://www.mcetunes.com/) is a plugin
    that you install that syncs up with iTunes (on the same machine as
    the Windows Media Center) and updates the Media Center library with
    entries for iTunes music. It syncs up your playlists, too, so those
    are there, and when you play the songs, it's actually [somehow]
    wrapping iTunes. A lot of folks are using it and like it, but there
    are [some forum posts](http://www.proxure.com/forums/index.php?c=2)
    that make me a little wary about the whole thing. Lots of moving
    pieces.
2.  **Get Windows Media Center to play iTunes music natively**. This is
    a little more manual work, but it means enabling AAC and Apple
    Lossless for play directly through the Windows Media Center
    interface. No playlists, and maybe less metadata than with MCETunes.

The road I went with was getting Media Center to understand AAC/ALAC
(Apple Lossless) natively.

**How To:**

Here's how to get Media Center working with your iTunes music. For these
instructions, I'm using Windows Media Player 11 on Windows Vista Home
Premium. (The Windows Media Player info is important because Windows
Media Player and Windows Media Center share the same library. If WMP
indexes a file, it shows up in WMC.) **You will also need Administrator
privileges because you're going to be installing stuff.**

**As with everything, this is all at your own risk.** If it doesn't work
for you, if you hose your machine, if you end up launching a nuclear
attack on a neighboring country... that's all on you.

Also, it may be handy (if you index something you don't want or want to
"clean out" your Media Center library) to know [how to totally flush the
Windows Media Player library and start from
scratch](http://www.krunk4ever.com/blog/2007/09/16/reindexing-media-center-library/).
I had to do that a couple of times before I got it right.

**Read all the instructions before you start**. It will help to
understand the whole process before you start in. You don't want to get
halfway done and have an "oh crap" moment.

With that...

1.  **Make sure the "album artist" field is filled in on all of your
    music.** This is just good metadata practice, but it will come in
    very handy later because "album artist" is how Windows Media Player
    gets album artwork and deals with other metadata issues. [I have a
    script that may help you with
    that](/archive/2009/05/09/automatically-set-album-artist-in-itunes.aspx),
    but it is a lot of work if you have a lot of tracks.
2.  **Get the DirectShow filter.** A DirectShow filter is how you teach
    Windows Media Player/Windows Media Center how to play a new file
    type. [DSP-worx](http://www.dsp-worx.de/) has a filter you can
    download for free that will enable AAC/ALAC playback. [You can
    download it
    here](http://files.dsp-worx.de/dsmp3source_aac_alac.zip).
3.  **Install the filter.** Create a folder on your primary OS drive.
    Make sure it doesn't have any spaces in the pathname or it may not
    work. I made mine "C:\\dsp-worx" - you may want to as well. Once you
    have that folder, unzip the contents of the DirectShow filter zip
    file you just downloaded into that folder. In there you'll see a
    "register.bat" file - double-click to run that. That registers the
    DirectShow filter with Windows so now you can play AAC/ALAC files.
    But you're not done yet.
4.  **Fix up Windows Media Player metadata downloading.** Media Player
    handles automatic downloading of metadata in a weird way that can
    sometimes mess up the metadata you already have on your files. **Go
    to Library -\> More Options... in Windows Media Player.** Now you
    need to make a choice about whether you want Media Player to
    "augment" your iTunes files with metadata it thinks it needs or if
    you want to manage all of it through iTunes.
    -   *If you want Media Player to download data (this is not what I
        did)...*
        1.  On the "Player" tab in "Options," check "Connect to the
            Internet." This has to be checked for the player to be able
            to connect and get the data.
        2.  On the "Library" tab in "Options, check "Retrieve additional
            information from the Intenet" and select "Only add missing
            information." That will allow Media Player/Media Center to
            augment the metadata on files in your library with stuff it
            downloads.

    -   *If you don't want Media Player to download data (this is what I
        did)...*
        1.  On the "Player" tab in "Options," uncheck "Connect to the
            Internet." Doing this stops Media Player/Media Center from
            automatically connecting to get metadata.
        2.  On the "Library" tab in "Options, uncheck "Retrieve
            additional information from the Intenet." This will stop
            Media Player/Media Center from changing anything on your
            music files.

5.  **Fix other Library options.** There are some options you'll want to
    make sure are fixed up before you start indexing iTunes music. Go to
    "Library -\> More Options..." in Windows Media Player and make sure
    you're looking at the "Library" tab.
    -   **Don't let Media Player delete your stuff.** Uncheck "Delete
        files from computer when deleted from library." If you don't do
        this, then Media Player will delete files out from under iTunes
        when you manage your files in Media Player/Media Center.
    -   **Don't let Media Player move your stuff.** Uncheck both "Rename
        music files using rip music settings" and "Rearrange music in
        rip music folder, using rip music settings." If you leave either
        of these checked, Media Player may move your music around out
        from under iTunes.
    -   **Decide on where to maintain ratings.** I maintain my song
        ratings in iTunes so I don't need the ratings in Windows. I
        unchecked the "Maintain my star ratings as global ratings in
        files" option. You may want those ratings. If so, check that
        option. I don't think it hurts either way, I just didn't want to
        hassle with it. If you leave it unchecked, the ratings only
        persist in the Media Player library database.

6.  **Download the tag extender.** A tag extender is what allows Media
    Player to read/index the metadata tag information (title, artist,
    etc.) from the AAC/ALAC files. I'm using [this one from
    Softpointer](http://www.softpointer.com/WMPTagSupport.htm). I tried
    [this one on
    Sourceforge](http://sourceforge.net/projects/wmptagext/) but didn't
    have as much luck with it. Maybe it was just me. The Softpointer one
    also handles a ton of other formats, so big ups there, say, in case
    you want to add FLAC or Ogg Vorbis support later.
7.  **Install the tag extender.**Whichever tag extender you just
    downloaded, install that bad boy.
8.  **Reboot.** I'm not sure if this is entirely necessary, but I did.
    Can't hurt. You just updated WMP/WMC to understand how to play a new
    file type and read those metadata files. I'm sure something is
    cached in memory somewhere that will be hosed up if you don't
    reboot, so start that and go get a refreshing Coke.
9.  **Tell Windows Media Player to index your iTunes music.** I think
    you can technically do this from either WMC or WMP, but you get more
    instant results and a better progress bar in Windows Media Player so
    it's easier to do it there. Since WMC and WMP share a library
    anyway, one is just as good as the other. In WMP, go to "Library -\>
    More Options..." and, on the Library tab, click the "Monitor
    Folders..." button. Follow the prompts to add your iTunes music
    folder to the library. (If it's already there, you may want to
    remove it and re-add it to force the reindexing of the folder.)
10. **Wait.** Depending on the number of tracks you have, it may take a
    while.
11. **Enjoy.** It should have found all of the \*.m4a tracks (AAC/ALAC)
    that were in the folders and they should show up in the library.
    Double-click one - it should play. You should also, at a minimum,
    see the track title, album title, and artist on there. If you fire
    up Windows Media Center, the same information should be present.

**Postscript - Album Art:**

My experience was that the album art didn't automatically make it
through when I indexed my tracks. There are a couple of things you can
do about that.

1.  **Easy but painstakingly slow:** You can right-click on each album
    in the library that doesn't have album art and select the "Find
    album art" option. From what I can tell, this downloads the album
    art and stores it in the WMP database. (For a while I thought it was
    downloading the album art and saving the images in the folder with
    the music as hidden files named
    "AlbumArt\_{LONG-GUID-HERE}\_Large.jpg" and such, but after
    reindexing a couple of times, I'm not finding those files. I can
    only surmise they're in the library.)
2.  **Faster but more work up front:** If the cover art is stored in a
    file called "Folder.jpg" in the folder along with the songs that
    make up the album, the album art will be assumed to be that image.
    (This is the same as [how the DVD Library
    works](/archive/2008/09/12/how-to-set-up-a-dvd-library-in-windows-media.aspx).) If
    all of your tracks have album art, you could write a script using
    the iTunes scripting interface that goes through each track, figures
    out what folder it's in, and if there's no "Folder.jpg" in there,
    have it extract the album artwork from the track and save it as
    "Folder.jpg" in that folder. When the scheduled/background indexing
    process runs to update the WMP/WMC album art, it'll find this image
    and automatically update the displayed album art.

I'm taking the scripting route, but I haven't written the script yet.
I'm still assigning album art to my tracks so it'll run without any
hitches. When I have the script written, I'll be sure to post it.

**Anyway, that should do it - you should be able to play your iTunes
music natively in Windows Media Center.**

**Other articles you might be interested in:**

-   [The original forum
    thread](http://www.technologyquestions.com/technology/windows-media/133228-displaying-m4a-media-player-11-library-media-center-vista.html)
    where I gathered the majority of the instructions on how to do this.
    Props to the folks there; it's unfortunate that most of this sort of
    information is "tribal" and hidden away in forums.
-   [Overview of my Media Center
    solution](/archive/2008/09/30/overview-of-my-media-center-solution.aspx).
    What I've got set up, how I did it, why I chose the things I did.
-   [How to set up a DVD Library in Media
    Center](/archive/2008/09/12/how-to-set-up-a-dvd-library-in-windows-media.aspx).
    If you've got your music playing, why not get your movies playing,
    too?
-   [Stream More Music From Windows Home Server with Asset
    UPnP](/archive/2009/08/11/stream-more-music-from-windows-home-server-with-asset-upnp.aspx).
    If you're less concerned with getting the music into Windows Media
    Center and more concerned with DLNA streaming to things like PS3 and
    Xbox 360, this might help you out.


