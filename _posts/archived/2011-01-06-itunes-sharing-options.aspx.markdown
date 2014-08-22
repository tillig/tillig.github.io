---
layout: post
title: "iTunes Sharing options"
date: 2011-01-06 -0800
comments: true
disqus_identifier: 1688
tags: [Media]
---
Being the Family Tech Support Guy, I got a question from my cousin about
sharing music in iTunes and rather than answer it in email (since it’s
not a short answer), I figured I’d blog it since it is probably helpful
to other folks out there.

First, you need to determine your requirements. The phrase “sharing
music in iTunes” is actually pretty vague. Let’s walk through figuring
out what you want to do.

-   **Do you have multiple computers?**This is important because you’ll
    need to make some choices about what you want to do on each of the
    computers.
    1.  If you have multiple computers and you want your entire iTunes
        library (playlists and music files) accessible from each
        computer… You have a couple of choices.
        -   Copy everything to each computer over the network. This will
            put a physical copy of the iTunes library and all of the
            music files on every computer you want to share with. You’ll
            need to use a program like
            [SyncToy](http://www.microsoft.com/downloads/en/details.aspx?familyid=C26EFA36-98E0-4EE9-A7C5-98D0592D8C52&displaylang=en)
            or [Allway Sync](http://allwaysync.com/) to keep your iTunes
            library and music files copied over the network. Honestly, I
            don’t recommend this option.
        -   Keep your music files on a central network drive and only
            copy the iTunes library file across computers. This is
            common and is way better than the “copy everything” option.
            [Lifehacker has a nice tutorial that explains how to do
            this](http://lifehacker.com/230605/hack-attack-share-your-itunes-music-library-over-your-home-network).

    2.  If you have multiple computers and you want to manage iTunes on
        one computer and just listen from the other computers… the
        easiest solution is to use iTunes library sharing to enable
        sharing on the master computer and then attach to that shared
        library over the network from the other computers. You will be
        able to listen to the music but will only be able to synchronize
        devices from the master computer. There’s a decent [tutorial
        about how to set up iTunes library sharing on
        About.com](http://ipod.about.com/od/itunesbasics/ss/itunes_sharing.htm).
    3.  If you have multiple computers and only run iTunes on one but
        need the music files on all of them (for whatever reason), you
        can store the music files on the network, no problem.
        [Lifehacker has a tutorial on how to do
        that](http://lifehacker.com/230605/hack-attack-share-your-itunes-music-library-over-your-home-network),
        just skip the bits where you set up something to synchronize the
        iTunes library file. At the time of this writing, that’s steps 6
        and 7 on the tutorial that you can skip.
    4.  If you don’t have multiple computers… continue on. Nothing to
        see here.

-   **Do you have multiple user accounts?** That is, when you sit down
    at your computer, do you “log in” as you or does everyone just sit
    down and start using the computer?
    1.  If everyone uses the same account, your options are limited.
        -   Live with one iTunes library. This is probably what you have
            now.
        -   Create a separate iTunes library file for each person. Every
            time you open iTunes you’ll have to remember to hold down
            Shift when you click the link to start iTunes or it’ll just
            open up the last library that was used. [There is an Apple
            knowledge base article about how to open and create
            alternate libraries.](http://support.apple.com/kb/HT1589)
            This is a big pain and I wouldn’t recommend it. If you do
            this, you have additional options…
            -   Share your music files. Each iTunes library will use the
                same set of music files. This may be problematic because
                when you change certain things in iTunes (like the
                artist name or the song name), iTunes will actually
                modify the physical file and may even move it to a new
                location (if you’ve told iTunes to keep your library
                organized). That will mess up other libraries that
                assume the files stay in the same location.
            -   Keep separate copies of your music files. This could eat
                up space really quickly, but hard drives are cheap.
                Doing this would mean that each time you add a file into
                one library, you need to create another copy of the same
                file and add the copy into the other library.

    2.  If everyone has a different account, things open up.
        -   Share your iTunes library and music files across user
            accounts. There is [an Apple knowledge base article that
            explains how to do
            this](http://support.apple.com/kb/ht1203). [I have a
            tutorial on this as
            well](/archive/2005/04/10/multi-user-itunes.aspx) and while
            it’s a little more lengthy, it’s my preferred way.
        -   Each user has their own iTunes library but shares music
            files. The key here is that each user will fire up iTunes
            and create a new library – making sure the “Keep iTunes
            music files organized” option is the same for each user –
            and pointing each iTunes library to the same central
            location for music files (Edit –\> Preferences –\> Advanced
            and change the music folder location to the same place for
            each user). When you add a music file to one library, each
            other user will need to manually add the file to their
            library as well. Or not, as the case may be. Note, again,
            that if someone changes an artist name, song name, etc., it
            may move the files out from under someone else, so this may
            not be great.
        -   Each user has their own iTunes library and their own music
            files. This is how it works by default when you have
            multiple user accounts. If someone adds music to their
            library, the other person can make a copy and add it
            separately, later, to their own library.

**Things to think about…**

-   **You can mix and match.** For example, if you want to keep your
    music on the network because you have multiple computers and you
    want to share iTunes across multiple user accounts on those
    computers, you can do that. It’ll take some work to figure out which
    parts of the various tutorials out there need to be fixed up, but
    it’s possible.
-   **You will probably run into issues with iTunes Store purchased
    music and apps.** As soon as you get into music sharing that
    involves copying things around, separate libraries, etc., you will
    most likely start running into problems where one user can play
    purchased music but another can’t. This is technically by design –
    one person purchases music and that person owns the music. That’s
    the problem with DRM (digital rights management) today. Other
    sources like Amazon MP3 don’t cause this problem because they don’t
    have DRM.
-   **Have a backup plan.** When you switch this stuff around, you have
    a chance of accidentally hosing things up. Make sure you back things
    up before you do anything.
-   **Take your time.** Especially if you’re a non-technical person,
    some of the stuff explained in the above tutorials may be a bit
    daunting. It’s not too hard, but it’s not fall-down easy, either.
    Set aside some dedicated time to work on this and if it becomes too
    much, take a break. Write down all the stuff you’re doing so if you
    have to undo it (or restore from backup, or ask someone for help –
    NOT ME), you can.

As always, all of this is **AT YOUR OWN RISK and SELF-SUPPORTED**. I
haven’t actually tried every combination of all of these things so I
can’t guarantee all of it works.**IF IT DOESN’T WORK, YOU’RE ON YOUR
OWN**. I can’t offer you individual help on this. Sorry.

