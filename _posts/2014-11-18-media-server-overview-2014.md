---
layout: post
title: "Media Server Overview 2014"
date: 2014-11-18 -0800
comments: true
tags: [media,music,movies,hardware,home,synology]
---
**UPDATE 7/8/2015** - All current documentation for my media center and home network is at [illigmediacenter.readthedocs.org](http://illigmediacenter.readthedocs.org/).

[Way back in 2008 I put up an overview of my media server solution]({{ site.url }}/archive/2008/09/30/overview-of-my-media-center-solution.aspx) based on the various requirements I had at the time - what I wanted out of it, what I wasn't so interested in.

I've tried to keep that up to date somewhat, but I figured it was time to provide a nice, clean update with everything I've got set up thus far and a little info on where I'm planning on taking it. Some of my requirements have changed, some of the ideas about what I want out of it have changed.

# Requirements

- **Access to my DVD collection**: I want to be able to get to all of the movies and TV shows in my collection. I am not terribly concerned with keeping the menus or extra features, but I do want the full audio track and video without noticeably reduced fidelity.
- **Family acceptance factor**: I want my wife and daughter to be able to navigate through the system and find what they want to watch with minimal effort.
- **Access to my pictures**: I want to be able to see my family photos from a  place outside my office where the computers generally sit.
- **Access to my music**: I want to be able to listen to my music collection from any room in the house.
- **As compatible as possible**: When choosing formats, software, communication protocols, etc., I want it to be compatible with as many devices I own as possible. I have an Android phone, an iPod classic, an iPad, Windows machines, a PS4, an Xbox 360, a Kindle Fire, and a Google Chromecast.

# Hardware

My hardware footprint has changed a bit since I started, but I'm in a pretty comfortable spot with my current setup and I think it has a good way forward.

- **Synology DS1010+**: I use the Synology DS1010+ for my movie storage and as the Plex server (more on Plex in the software section). The 1010+ is an earlier version of the [Synology DS1513+](http://www.amazon.com/dp/B00CM9K7E6?tag=mhsvortex) and is amazingly flexible and extensible.
- **HP EX475 MediaSmart Server**: This little machine was my [first home server]({{ site.url }}/archive/2008/08/25/windows-home-server-first-impressions.aspx) and was originally going to be my full end-to-end solution. Right now it serves as picture and audio storage as well as the audio server.
- **Playstation 3**: My main TV has an Xbox 360, a PS3, and a small home theater PC attached to it... but I primarily use the PS3 for the front end for all of this stuff. The Xbox 360 may become the primary item once the Plex app is released for it. The PC was primary for a while but it's pretty underpowered and cumbersome to turn on, put to sleep, etc.
- **Google Chromecast**: Upstairs I have the Chromecast and an Xbox 360 on it. The Chromecast does pretty well as the movie front end. I sort of switch between this and the 360, but I find I spend more time with the Chromecast when it comes to media.

# Software

I use a fairly sizable combination of software to manage my media collection, organize the files, and convert things into compatible formats.

- [**Picasa**](http://picasa.google.com/): I use Picasa to manage my photos. I mostly like it, though I've had some challenges as I have moved it from machine to machine over the years in keeping all of the photo album metadata and the ties to the albums synchronized online. Even with these challenges, it is the one tool I've seen with the best balance of flexibility and ease of use. My photos are stored on a network mounted drive on the HP MediaSmart home server.
- [**Asset UPnP**](http://www.dbpoweramp.com/asset-upnp-dlna.htm): Asset UPnP is the most flexible audio DLNA server I've found. [You can configure the junk out of it]({{ site.url }}/archive/2009/08/11/stream-more-music-from-windows-home-server-with-asset-upnp.aspx) to make sure it transcodes audio into the most compatible formats for devices, and you can even [get your iTunes playlists in there]({{ site.url }}/archive/2010/09/26/creating-playlists-in-asset-upnp.aspx). I run Asset UPnP on the HP MediaSmart server.
- [**Plex**](https://plex.tv/): I switched from [XBMC/Kodi](http://kodi.tv/) to Plex for serving video, and I've also got Plex serving up my photos. The beauty of Plex is that it has a client on *darn near every platform*; it has a beautiful front end menu system; and it's really flexible so you can have it, say, transcode different videos into formats the clients require (if you're using the Plex client). Plex is a DLNA server, so if you have a client like the Playstation 3 that can play videos over DLNA, you don't even need a special client. Plex can allow you to stream content outside your local network so I can get to my movies from anywhere, like my own personal Netflix. Plex is running on the Synology DS1010+ for the server; and I have the Plex client on my iPad, Surface RT, home theater PC, Android phones, and Kindle Fire.
- [**Handbrake**](https://handbrake.fr/): Handbrake is great for taking DVD rips and converting to MP4 format. (See below for why I am using MP4.) [I blogged my settings for what I use when converting movies.]({{ site.url }}/archive/2014/03/18/switched-dvd-archiving-to-mp4.aspx)
- [**DVDFab HD Decrypter**](http://www.dvdfab.cn/hd-decrypter.htm): I've been using DVDFab for ripping DVDs to `VIDEO_TS` images in the past. It works really well for that. These rips easily feed into Handbrake for getting MP4s.
- [**MakeMKV**](http://www.makemkv.com/): Recently I've been doing some rips from DVD using MakeMKV. I've found sometimes there are odd lip sync issues when ripping with DVDFab that don't show up with MakeMKV. (And vice versa - sometimes ripping with MakeMKV shows some odd sync issues that you don't see with DVDFab.) When I get to ripping Blu-ray discs, MakeMKV will probably be my go-to.
- [**DVD Profiler**](http://www.invelos.com/): I use this for tracking [my movie collection](http://www.invelos.com/dvdcollection.aspx/tillig). I like the interface and the well-curated metadata it provides. I also like the free online collection interface - it helps a lot while I'm at the store browsing for new stuff to make sure I don't get any duplicates. Also helpful for insurance purposes.
- [**Music Collector**](http://www.collectorz.com/music/): I use this for tracking [my music collection](http://cloud.collectorz.com/tillig/music). The feature set is nice, though the metadata isn't quite as clean. Again, big help when looking at new stuff to make sure I don't get duplicates as well as for insurance purposes.
- [**CrashPlan**](http://www.code42.com/crashplan/): I back up my music and photo collection using CrashPlan. I don't have my movies backed up because I figured I can always re-rip from the original media... but with CrashPlan it's unlimited data, so *I could back it up if I wanted*. CrashPlan runs on my MediaSmart home server right now; if I moved everything to Plex, I might switch CrashPlan to run on the DS1010+ instead.

# Media Formats and Protocols

- **DLNA**: I've been a fan from the start of DLNA, but the clients and servers just weren't quite there when I started out. This seems to be much less problematic nowadays. The PS3 handles DLNA really well and I even have a DLNA client on my Android phone so I can easily stream music. This is super helpful in getting compatibility out there.
- **Videos are MP4**: I started out with full DVD rips for video, but as I've moved to Plex [I've switched to MP4]({{ site.url }}/archive/2014/03/18/switched-dvd-archiving-to-mp4.aspx). While it can be argued that MKV is a more flexible container, MP4 is far more compatible with my devices. The video codec I use is x264. For audio, I put the first track as a 256kbps AAC track (for compatibility) and make the second track the original AC3 (or whatever) for the home theater benefit. [I blogged my settings info.]({{ site.url }}/archive/2014/03/18/switched-dvd-archiving-to-mp4.aspx)
- **Audio is MP3, AAC, and Apple Lossless**: I like MP3 and [get them from Amazon](http://www.amazon.com/MP3-Music-Download/b/?_encoding=UTF8&*Version*=1&*entries*=0&camp=1789&creative=390957&linkCode=ur2&node=163856011&redirected=1&tag=mhsvortex&linkId=ILDIAON5TQZJS6ML) on occasion, but I am still not totally convinced that 256kbps MP3 is *the way and the light*. I still get a little scared that there'll be some better format at some point and if I bought the MP3 directly I won't be able to switch readily. I still buy CDs and I rip those into Apple Lossless format. (Asset UPnP will transcode Apple Lossless for devices that need the transcoding; or I can plug the iPod/iPad in and play the lossless directly from there.) And I have a few AAC files, but not too many.

# Media Organization

**Videos are organized using the Plex recommendations**: I have a share on the Synology DS1010+ called "video" and in there I have "Movies," "TV," and "Home Movies" folders. I have Plex associating the appropriate data scrapers for each folder.

    /videos
        /Home Movies
            /2013
            /2014
                /20140210 Concert 01.mp4
                /20140210 Concert 02.mp4
        /Movies
            /Avatar (2009).mp4
            /Batman Begins (2014).mp4
        /TV
            /Heroes
                /Season 01
                    /Heroes.s01e01.mp4
                    /Heroes.s01e02.mp4

You can read about the Plex media naming recommendations here:

- [Media preparation guidelines](https://support.plex.tv/hc/en-us/categories/200028098-Media-Preparation)
- [Movie naming](https://support.plex.tv/hc/en-us/articles/200381023-Naming-Movie-files)
- [TV naming](https://support.plex.tv/hc/en-us/articles/200220687-Naming-Series-Season-Based-TV-Shows)

**Audio is kept auto-organized in iTunes**: I just checked the box in iTunes to keep media automatically organized and left it at that. The media itself is on a mapped network drive on the HP MediaSmart server and that works reasonably enough, though at times the iTunes UI hangs as it transfers data over the network.

**Photos are organized in folders by year and major event**: I've not found a good auto-organization method that isn't just "a giant folder that dumps randomly named pictures into folders by year." I want it a little more organized than that, though it means manual work on my part. If I have a large number of photos corresponding to an event, I put those in a separate folder. For "one-off photos" I keep a separate monthly folder. Files generally have the date and time in YYYYMMDD_HHMMSS format so it's sortable.

    /photos
        /2012
        /2013
        /2014
            /20140101 Random Pictures
                /20140104_142345 Lunch at McMenamins.jpg
                /20140117_093542 Traffic Jam.jpg
            /20140307 Birthday Party
                /20140307_112033.jpg
                /20140307_112219.jpg

Picasa works well with this sort of folder structure and it appears nicely in DLNA clients when they browse the photos by folder via Plex.

# Network

My main router is a [Netgear WNDR3700v2](http://www.amazon.com/dp/B002HWRJY4?tag=mhsvortex) and *I love it*. I've been through a few routers and wireless access points in the past but this thing has been solid and flexible enough with the out-of-the-box firmware such that I don't have to tweak with it to get things working. It just works.

I have wired network downstairs between the office/servers and the main TV/PS3/Xbox 360/HTPC. This works well and is pretty much zero maintenance. I have two D-Link switches (one in the office, one in the TV room) to reach all the devices. ([Here's the updated version of the ones I use.](http://www.amazon.com/dp/B003X7TRWO?tag=mhsvortex))

The router provides simultaneous dual-band 2.4GHz and 5GHz wireless-N through the house which covers *almost everywhere* except a few corners. I've just recently added [some Netgear powerline adapters](http://www.amazon.com/dp/B008LTPEXU?tag=mhsvortex) to start getting wired networking upstairs into places where the wireless won't reach.

# The Road Ahead

This setup works pretty well so far. I'm really enjoying the accessibility of my media collection and I find I'm using it even more often than I previously was. So where do I go next?

- **Plex on Xbox 360**: The only reason I still have that home theater PC in my living room is that it's running the Plex app and if I want a nice interface with which to browse my movies, the HTPC is kinda the way to go. [Plex has just come out with an app for Xbox One](https://plex.tv/xbox) and should shortly be available for Xbox 360. This will remove the last reason I have an HTPC at all.
- **Add a higher-powered Plex server**: My Synology DS1010+ does a great job running Plex right now, but *it can't transcode video very well*. Specifically, if I have a high-def video and I want to watch it on my phone, the server wants to transcode that to accommodate for bandwidth constraints and whatnot... but the Synology is too underpowered to handle that. I'd like to see about getting a more powerful server running as the actual Plex server - store the data on the Synology, but use a different machine to serve it up, handle transcodingI, and so forth. (That little HTPC in the living room isn't powerful enough, so I'll have to figure something else out.)
- **Add wireless coverage upstairs**: It's great that I can hook the Xbox upstairs to wired networking using the powerline adapters but that doesn't work so well for, say, my phone or the Chromecast. I'd like to add some wireless coverage upstairs (maybe chain another WNDR3700 in?) so I can "roam" in my house. I think even with the powerline stuff in there, it'd be fast enough for my purposes.
- **Integrate music into Plex**: I haven't tried the Plex music facilities and I'm given to understand that not all Plex clients support music streaming. This is much lower priority for me given my current working (and awesome) Asset UPnP installation, but it'd be nice long-term to just have one primary server streaming content rather than having multiple endpoints to get different things.