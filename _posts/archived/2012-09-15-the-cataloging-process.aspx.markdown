---
layout: post
title: "The Cataloging Process"
date: 2012-09-15 -0800
comments: true
disqus_identifier: 1791
tags: [media]
---
As [part of my media center
solution](/archive/2008/09/30/overview-of-my-media-center-solution.aspx),
I have a fairly rigorous media and metadata management process that goes
on any time I acquire new media. I figured I might give folks a glimpse
behind the curtain so you know what goes on. Broken down by media type,
here's how it goes from acquisition to "in the system."

-   **Audio (Music, Audiobooks)**
    -   CD
        1.  Add to [Music Collector](http://www.collectorz.com/music/).
            -   Enter the CD info, generally by bar code.
            -   Clean up artist or album name data if needed.
            -   Synchronize collection with [Music Collector
                Online](http://connect.collectorz.com/users/tillig/music/view).
        2.  Add to iTunes.
            -   Rip CD as Apple Lossless. Files end up on Windows Home
                Server for later serving via [Asset
                UPnP](http://www.dbpoweramp.com/asset-upnp-dlna.htm).
            -   Clean up metadata as needed - artist, album, cover art,
                etc.
        3.  Synchronize iPod.
        4.  File the disc.
            -   Pull the disc, front cover, and back cover out of the
                plastic box.
            -   File the disc with the front cover [in a DJ
                box](/archive/2011/05/20/media-storage.aspx).
            -   File the back cover in an expanding folder.
            -   Recycle the plastic box.
    -   Digital (MP3, AAC)
        1.  Download from original source ([usually Amazon
            MP3](http://www.amazon.com/MP3-Music-Download/b/?_encoding=UTF8&camp=1789&creative=390957&linkCode=ur2&node=163856011&redirect=true&tag=mhsvortex)).
        2.  Add to iTunes.
            -   Drag into iTunes. Files end up on Windows Home Server
                for later serving via [Asset
                UPnP](http://www.dbpoweramp.com/asset-upnp-dlna.htm).
            -   Clean up metadata as needed - artist (last, first),
                album, etc.
        3.  Synchronize iPod.
        4.  Add to [Music Collector](http://www.collectorz.com/music/).
            -   Add the digital files to Music Collector.
            -   Clean up artist or album name data if needed.
            -   Link to a Music Collector album profile.
            -   Synchronize collection with [Music Collector
                Online](http://connect.collectorz.com/users/tillig/music/view).
-   **Video (Movies, TV Shows)**
    -   Blu-ray
        1.  Add to [DVD Profiler](http://www.invelos.com/).
            -   Update the local profile database for my existing
                collection.
            -   Enter the disc info, generally by bar code.
            -   Synchronize collection with [DVD Profiler
                Online](http://www.invelos.com/dvdcollection.aspx/tillig).
            -   Backup the local profile database.
        2.  File the disc.
            -   Pull the disc cover, discs, and inserts out of the
                plastic box.
            -   File the disc with covers and inserts in [a DiscSox
                storage
                set](/archive/2011/08/30/discsox-blu-ray-storage.aspx).
            -   Recycle the plastic box.
    -   DVD
        1.  Add to [DVD Profiler](http://www.invelos.com/).
            -   Update the local profile database for my existing
                collection.
            -   Enter the disc info, generally by bar code.
            -   Synchronize collection with [DVD Profiler
                Online](http://www.invelos.com/dvdcollection.aspx/tillig).
            -   Backup the local profile database.
        2.  Rip the disc and add to media center.
            -   Rip the disc with [DVDFab HD
                Decrypter](http://www.dvdfab.com).
            -   Update the folder name with the disc image so XBMC can
                scrape data.
                -   [IMDb](http://www.imdb.com) format for movies.
                -   [TheTVDB](http://thetvdb.com/) format for TV shows.
            -   Update the DVDID XML file if needed for Windows Media
                Center.
            -   Copy the disc image onto my NAS (Synology DS1010+) for
                later serving.
            -   Start XBMC on my master computer (read/write access to
                the database) and let XBMC scraping add the new item to
                the database.
            -   Verify/correct any XBMC metadata issues.
            -   Start Windows Media Center on my master computer and
                wait for it to add the cached metadata XML file to the
                system.
            -   Correct the metadata using DVD Library Manager including
                better cover scans.
        3.  File the disc.
            -   Pull the disc cover, discs, and inserts out of the
                plastic box.
            -   File the disc in [a
                binder](/archive/2011/05/20/media-storage.aspx).
            -   File the cover in an expandable folder.
            -   File the inserts in a small photo box.
            -   Recycle the plastic box.
        4.  Optional: Convert for Mobile Use (via Handbrake). If I do
            this, I put it into iTunes and then sync iPod and iPad.
    -   Digital
        1.  Redeem the "digital copy" code (in iTunes).
        2.  Update any metadata as needed.
        3.  Sync iPod and iPad.

You'll notice that, at this time, I'm not ripping Blu-ray discs to any
media server/digital format. I don't have a ton of them and they just
eat disc space, so I'm not there yet. I've also still not figured out a
good compression format that retains the surround sound, which is why I
rip full images from DVDs.

You'll also note that I don't really buy digital videos. The only ones I
have are from those "digital copy" things you get with some disc
purchases. There's no DRM-free equivalent that they sell videos in right
now, so these are "neat" but aren't my system of record and probably
won't be if I have anything to say about it. (Which, someday, I may not
- thanks Hollywood...) The only time I even use these is if I've got my
iPad on a trip or something. I don't/can't use them through my media
center.

For all the folks that think maintaining something like this is free...
now you see it isn't. Or maybe it is if you don't care about the
housekeeping part, but I can see that after you get to a sufficient size
then having no organization (or not caring) may render the system
unusable, which is what I'm trying to avoid.

