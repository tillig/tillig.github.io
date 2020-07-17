---
layout: post
title: "Switching from Windows Media Center to XBMC for my Media Front End"
date: 2011-12-29 -0800
comments: true
disqus_identifier: 1759
tags: [media,windows]
---
I've had [my media center running for a while using standard Windows Media Center](/archive/2008/09/30/overview-of-my-media-center-solution.aspx). I like it because it is simple, has few moving pieces, and basically "just works."

Unfortunately, what I've been finding is that, when you have some [900+ DVDs in the DVD Library](/archive/2008/09/12/how-to-set-up-a-dvd-library-in-windows-media.aspx) then it's a bit slow to open. When you select the "Movie Library" option in WMC, it'll take upwards of 45 seconds to come up. Not only that, but when you scroll through the movies it's a bit slow, too.

There's also some room for improvement when it comes to the UI for the library. Basically you get the poster for the movie, some actor and plot metadata, and that's about it.

So, since I'd had WMC running for a while, I thought I'd look at some other options for the front end. Again, few moving pieces is a goal. And, in this case, a minimal amount of work is key – I don't want to redo my whole setup just to switch front ends. After some research, I thought I'd give [XBMC](http://www.xbmc.org) a try. It has progressed quite a bit since I originally did my research and appeared to be reasonably easy to get running.

**Before I get into how I set it up, if you haven't read about how I have things set up, what my goals are, and so on,**[**please take a moment to check out my overview post**](/archive/2008/09/30/overview-of-my-media-center-solution.aspx)**.** You'll see that my use cases are common but not necessarily the most common – for example, all of my movies are in DVD rip (VIDEO_TS) format. When I explain how I got things set up it will be helpful to understand these things since I won't be explaining, say, how to set up your music... since that's not one of my use cases. Nor will I cover handling movies that are ripped files (e.g. WMV or MP4 or whatever) because I don't have that, either. But if you're looking to set up XBMC and you have a working WMC setup, maybe this will get you pointed in the right direction.

**Goals**:

- **Minimal rework**. I already have a working Windows Media Center installation. I'd like to keep it working and add the ability for XBMC to work.
- **Few moving pieces**. Using Windows Media Center, I didn't have any additional software to install beyond the OS. I don't mind installing a couple of other things, but I don't want some complex setup that's going to require a ton of maintenance and tweaking. I just want it to work.
- **Improved UI response time**. The WMC DVD Library takes a long time to come up and show the list of movies. I'd like to see a UI come up in < 5 seconds.
- **Improved UI display**. The WMC DVD Library is pretty simple. I'd like to see fan art, metadata, posters, etc.

Given all that... here's what I did.

**First, choose where you want to get your movie metadata from.** Windows Media Center uses a single source to get posters, actor info, plot info, and so on. With XBMC you get your choice of where to get your TV and Movie data from. The reason you need to make this decision is that each "scraper" (the thing that goes and gets the data) is a little different and if you want things to just fall into place, you need to make the choice. **I recommend using**[**TheTVDB.com**](http://thetvdb.com/)**for the TV show scraper and**[**IMDb**](http://imdb.com)**for the Movie scraper**.

Next, update your video folder structure so the XBMC metadata scrapers can find the movie or TV show based on the folder names. This is the biggest part of the work. By way of comparison, my old folder structure looked like this:

- \\\\server\\DVD
  - Alias 1.1
    - VIDEO_TS
    - AUDIO\_TS

  - Alias 1.2
    - VIDEO_TS
    - AUDIO\_TS

  - Aliens
    - VIDEO_TS
    - AUDIO\_TS

  - Blade Runner
    - VIDEO_TS
    - AUDIO\_TS

  - Die Hard
    - VIDEO_TS
    - AUDIO\_TS

**Again, that's the OLD structure** so don't use that if you're starting fresh. Things you'll notice in that old structure:

- **TV and Movies were intermixed**. I didn't separate the two types of DVD rips. With XBMC, you need to separate them because each scraper works against a folder tree.
- **The TV folder names were based on DVD structure** and didn't say which seasons/episodes were actually on each disc. XBMC needs that information and gets it from the folder structure.
- **Movie folders didn't include the year of the movie in the folder name**. While that's not required, it really helps the scrapers to find the right data for the movie.

**I solved those problems** by doing a little moving around and renaming of files and folders. After that work, I ended up with a structure that looked like this:

- \\\\server\\DVD
  - Movies
    - Aliens (1986)
      - AUDIO\_TS
      - VIDEO_TS

    - Blade Runner (1982)
      - AUDIO\_TS
      - VIDEO_TS

    - Die Hard (1988)
      - AUDIO\_TS
      - VIDEO_TS

  - TV
    - Alias
      - Season 01
        - s01e01e02e03
          - AUDIO\_TS
          - VIDEO_TS

        - s01e04e05e06e07
          - AUDIO\_TS
          - VIDEO_TS

**That is the NEW structure – use that.**

As you can see, there are some differences.

- **Under the top-level DVD folder, I now have Movies and TV as sub-folders**. This allows me to tell XBMC "this folder has movies in it; this one has TV."
- **Each movie folder includes the full name of the movie along with the year** the movie was made. It is important that this matches the title and year of the movie that is in the movie metadata source you chose earlier. Remember how I recommended using IMDb for movies? Go to IMDb and look the information up. If IMDb says the movie is called "The Terminator" and the year it was made is 1984, then the folder should be "The Terminator (1984)" – not "Terminator, The (1984)" or "Terminator (1984)". It needs to match exactly. Different movie databases may have it listed slightly differently, which is why you need to already know where you want to get your data from.
- **Under the TV folder, each TV series has a folder.** Notice the folder doesn't necessarily include the year of the TV show. The name of the show needs to match the name of the show found in the TV scraper data source. Remember I recommended TheTVDB.com? Go to TheTVDB.com and look up your show. Some shows do have the year listed (if there is more than one show with the same name). Others don't. Make sure you match what the site says.
- **Under each TV series folder, there are season folders.** In the example, you see "Season 01" – the word "Season" with a two-digit season number including a leading zero. Follow that.
- **Under each TV season folder, there are folders with each disc rip.** The folder for a disc lists which season(s) and episodes the disc has. In the example, the first disc has season one, episodes one through three on it; the second has season one episodes four through seven. If you have season 4 episodes 8 through 10, you'd have "s04e08e09e10". It's OK if there are multiple seasons on one disc – Say you have season 1 episodes 1 and 2, then season 2 episodes 1 and 2 – that would be "s01e01e02s02e01e02" (and I'd put that in the Season 01 folder, but that's your call).

**This structure is really key.** It works with both WMC and XBMC. It allows automatic metadata scrapers to work. You can read more about how XBMC uses scrapers and how to avoid wrong title matches on the XBMC site. These pages will also tell you how to handle Movies and TV that are in ripped files rather than DVD VIDEO_TS folders – something I don't cover.

- [Movie library scraping](http://wiki.xbmc.org/index.php?title=Movies_(Video_Library))
- [TV library scraping](http://wiki.xbmc.org/index.php?title=TV_Shows_(Video_Library))

Now that you have the folder structure whipped into shape, you have to **figure out if you want to have any movies grouped into sets**. A "movie set" is like a series of movies you want to have appear in the list of movies like a "box set." For example, if you have all of the Harry Potter movies, you probably want one "Harry Potter" entry in the top-level movie list and when you select it, you want to see the list of Harry Potter movies in the correct order.

**To do that, you need to put a file called "movie.nfo" into the VIDEO_TS folder** for each movie you want in a set. The file is literally called "movie.nfo," not named after the movie (so, not "Die Hard.nfo" or anything like that).

The contents of the movie.nfo file look like this:

    <?xml version="1.0" encoding="utf-8"?>
    <movie xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <title>Harry Potter and the Goblet of Fire</title>
      <set>Harry Potter</set>
      <sorttitle>Harry Potter 4</sorttitle>
    </movie>
    http://www.imdb.com/title/tt0330373/

The top bit of the file is an XML document with "movie" as the root element. Inside there, you define...

- The title of the movie – this is what will appear in the UI once you dive into the box set.
- The name of the movie set – this is what will appear in the UI at the top level in the movie list. Any movie in a set with the same name will be grouped.
- The sort title for the movie – this is how it sorts inside the set.

At the bottom of the file, outside the XML, put a link directly to the movie on IMDb. You link to IMDb because that's the metadata scraper you're going to use (remember?). If you want to use a different scraper, you need to put a link to the movie in the appropriate site.

Again, that movie.nfo file goes **inside the VIDEO_TS folder**.

**You need to do the movie.nfo setup before you index your movies with XBMC** or it will be painful to fix later.

You can read about [.nfo file formats](http://wiki.xbmc.org/index.php?title=.nfo) and [movie sets](http://wiki.xbmc.org/index.php?title=Movie_Sets) over on the XBMC site.

You now have a decision to make: Do you want to share your library database with multiple XBMC front-ends or do you just have one XBMC front-end? If you only have one XBMC front-end, you can skip the setup of the database and get to the install of XBMC; otherwise, you'll need to set up an XBMC media database.

There are three things to share across XBMC front ends: the media, the media library database, and the poster/art thumbnails.

- Sharing the media is as simple as putting it on a network share that all the machines can access. I already have that.
- Sharing the media library is a little more involved and requires you to set up MySQL. [XBMC has a good article](http://wiki.xbmc.org/index.php?title=HOW-TO:Synchronize_multiple_XBMC_libraries) on how to do this, [as does Lifehacker](http://lifehacker.com/5634515/how-to-synchronize-your-xbmc-media-center-across-every-room-in-the-house). I won't go into the setup of MySQL or the databases here. I will say: I'm using the built-in MySQL on my Synology DS1010+ so it was super minimal to get running. I didn't need to set up a new server or anything, just check the "enable MySQL" box on the Diskstation. Done.
- I had to set up Thumbnail sharing after doing the initial XBMC install using the mklink command and replacing the Thumbnail folder in userdata with a directory link... but we'll get to that in a bit.

Again, if you only have the one XBMC front end, you don't really need to do any of that.

Now... **get XBMC installed and fire it up**. You won't do anything but start it up right now because you need the userdata folder to be created.

XBMC stores all of its data in [a user-specific folder called "userdata."](http://wiki.xbmc.org/index.php?title=Userdata) You need to know where this is and be familiar with it. By starting XBMC up that first time, the folder should have been created.

There are a metric ton of "advanced settings" for XBMC that don't have any UI to them. You have to put these settings [in the userdata folder in a file called advancedsettings.xml](http://wiki.xbmc.org/index.php?title=Advancedsettings.xml). This file will not exist – you have to create it.

**Create your advancedsettings.xml file** and put the following in it
(this is from my advancedsettings.xml):

    <advancedsettings>
      <sorttokens>
        <token>the</token>
        <token>a</token>
        <token>an</token>
      </sorttokens>
      <tvshowmatching append="no">
        <regexp>\[[Ss]([0-9]+)\]_\[[Ee]([0-9]+)\]?([^\\/]*)(?:(?:[\\/]video_ts)[\\/]video_ts.ifo)?</regexp>
        <regexp>[\._ \[\-\\/]([0-9]+)x([0-9]+)([^\\/]*)(?:(?:[\\/]video_ts)[\\/]video_ts.ifo)?</regexp>
        <regexp>[Ss]([0-9]+)[\.\-]?[Ee]([0-9]+)([^\\/]*)(?:(?:[\\/]video_ts)[\\/]video_ts.ifo)?</regexp>
        <regexp>[\._ \-\\/]([0-9]+)([0-9][0-9])([\._ \-][^\\/]*)(?:(?:[\\/]video_ts)[\\/]video_ts.ifo)?</regexp>
      </tvshowmatching>
      <video>
        <playcountminimumpercent>101</playcountminimumpercent>
      </video>
      <videoextensions>
        <!-- add>.ex1|.ex2</add -->
        <remove>.dat|.bin</remove>
      </videoextensions>

      <!-- Database Sharing/Synchronization -->
      <videodatabase>
        <type>mysql</type>
        <host>192.168.xxx.xxx</host>
        <port>3306</port>
        <user>xbmc</user>
        <pass>xxxxxxxx</pass>
        <name>xbmc_video</name>
      </videodatabase>
      <musicdatabase>
        <type>mysql</type>
        <host>192.168.xxx.xxx</host>
        <port>3306</port>
        <user>xbmc</user>
        <pass>xxxxxxxx</pass>
        <name>xbmc_music</name>
      </musicdatabase>
      <pathsubstitution>
        <substitute>
          <from>special://masterprofile/Thumbnails</from>
          <to>smb://yourserver/path/to/shared/Thumbnails</to>
        </substitute>
        <substitute>
          <from>special://profile/Thumbnails</from>
          <to>smb://yourserver/path/to/shared/Thumbnails</to>
        </substitute>
      </pathsubstitution>
    </advancedsettings>

There's a lot there, but I'll explain it:

- The sorttokens section explains which things to ignore when sorting titles. I don't want "A Bug's Life" to show up under "A" so I added that to the list of tokens. I think the only one in place by default is "The."
- The tvshowmatching section defines some regular expressions that help the TV show scraper figure out that "s01e01e02e03" in your folder structure corresponds to season 1, episodes 1 through 3.
- The video/playcountminimumpercent setting basically says "don't mark things as played or unplayed." I don't want checkmarks to show up by movies based on what I've watched.
- The videoextensions setting is set to ignore some files that show up in VIDEO_TS rips but aren't actually video files. In this case, I don't have any .dat or .bin files that are actually video files, so I don't want them indexed as videos.
- The last few bits – videodatabase, musicdatabase, pathsubstitution – are for sharing the database across front ends. These are explained in those articles explaining how to set up MySQL as the central database. If you're not doing that database sharing, omit those sections. If you're sharing, make sure to update the IP addresses, passwords, and share paths to point to your shared locations.

**Now that you have your advancedsettings.xml in place, delete the database and Thumbnails folders** out of the userdata folder. They will be recreated as necessary when you restart XBMC.

**Note: Using XBMC 10.1, I found the pathsubstitution for getting shared Thumbnails to work... didn't work**. Instead, I manually created a Thumbnails folder on my server in a shared location. I then manually went into the userdata folder at a command prompt and created a link to the shared location:

`mklink /d Thumbnails \\yourserver\path\to\shared\Thumbnails`

**Fire up XBMC again**. If you're sharing the media library database, XBMC will now be using the shared locations.

Go into the system settings and find the section where you can get add-ons.**You need to go to the Movie Metadata add-ons section and get the IMDb metadata add-on**. This will let you use IMDb as the metadata source; by default it's not installed.

**Add your movie and TV sources to XBMC** pointing to the Movie and TV shared folders, respectively. Do this one at a time and let the indexing of each source finish before adding the next; I found that if you interrupt the indexing process by adding a new source, the original indexing never completes. When you add each source, you get to choose what type of data is in each source (Movies, TV, etc.) and which scraper to use. Be sure to select the IMDb scraper for movies and the TheTVDB scraper for TV.

**Once everything is indexed, go check out the results.** Look at the list of movies and TV shows and make sure everything was properly picked up. You may need to add .nfo files or change some folder names in order to get things scraped right. If you do, you have the choice of trying to just remove one movie/show from the database and re-scraping that or removing the whole movie/TV source and re-indexing from scratch. I didn't have a ton of luck cherry-picking to fix, so I reindexed my whole library about five times before I got it right.

**The last thing you have to do is make it look pretty**. [Go to the system settings and find the skins](http://wiki.xbmc.org/index.php?title=Installing_Skins). Install the [MediaStream Redux skin](http://xbmc.org/skins/mediastreamredu/). Now go visit your movies and TV and use the left/right arrows to get the view menu to pop up. By default the view is "List" – not pretty. Select a different view mode like "Media Info" and you'll start seeing that super-nice display. Another option is to "show fanart" – do that. You'll start seeing really nice backdrops related to the movie you're currently selecting.

**That all looks like a lot of work, but it's actually not that bad.** Basically it's just cleaning up the directory structure and adding a few little XML files. XBMC does the rest of the work.

**If you have any other XBMC front ends**, just do the advancedsettings.xml placement and Thumbnail sharing steps. You don't need to re-add the sources or set up the scrapers (I'd recommend against it). You do need to set up the skin. Whenever you add a new movie, tell your original XBMC front end to scan the new movie and add it to the database – once it's there, the other front ends will find it.

**I CAN'T OFFER YOU SUPPORT ON THIS**. XBMC has [a great wiki](http://wiki.xbmc.org/index.php?title=Main_Page) and [some really nice forums](http://forum.xbmc.org/) – I recommend asking the experts if you have questions. My setup works for me and I hope this article can help you, but I can't support it. If you're interested in other aspects of my media center – my network setup, why I chose what I did, what tools I use to rip DVDs, etc., [check out my media center overview](/archive/2008/09/30/overview-of-my-media-center-solution.aspx).
