---
layout: post
title: "Multi-User iTunes"
date: 2005-04-10 -0800
comments: true
disqus_identifier: 785
tags: [media,music,windows]
---
**1/3/08**: Updated for Windows Vista and clarified the instruction set
so it's easier to see the intention of each step.

I fully intended on getting Jenn a present for our anniversary. I really
did. I wanted to get her an iPod Shuffle, sort of as a starter MP3
player, since I have an iPod and use iTunes to manage my music library
(and have a lot of AAC encoded music).

I took her to the local Apple store and after seeing all the options,
she determined she wanted a player with a UI (which I can't really blame
her for). The problem is, the first player up from the Shuffle is the
iPod Mini, which isn't a bad little player, but for $50 more you can
get a straight-up iPod with five times more space, so why go for the
small one? Then Jenn says she'll kick in some money to offset, which
puts us into a new price bracket...

...and so the justification goes. Point being, I went in to get her an
iPod Shuffle but walked out handing her my 15GB iPod and buying myself
the 60GB iPod Photo. I'm not sure how that happened, but it did.

Which means now we have two users on a Windows computer, both of whom
want to use the same music library and such. So for folks in a similar
boat, here's how you do it.

> **IMPORTANT NOTES:**
>
> - **This is all at your own risk.**  If it doesn't work for you, I'm
>     sorry, but **I can't offer individual support**.
> - **You may not be able to follow this verbatim.** If these steps
>     don't work *precisely*, I recommend looking at *the intent* of the
>     steps - putting the iTunes library in a central location and
>     creating links to it from individual user profiles - and adjusting
>     things according to your setup.
> - **As new versions of iTunes, Windows, etc. come out, I may not
>     always update or catch all the little "gotchas."** I originally
>     wrote these back around iTunes 4 time frame (but I just followed
>     these with iTunes 7.5 on Windows Vista)... things change, versions
>     change, OSes change, and I can't keep these up to date for every
>     possible combination of software.
> - **You must have Administrator privileges to set this up.** You
>     don't need Admin rights once you've got it set up, but some of the
>     stuff you do here needs to be run as Administrator, so make
>     sure you can do that.
> - **You need to be comfortable at a command prompt.** If you're not,
>     this may be very frustrating for you.

Now... here's how to get it running:

1. **Get the required tools.** You'll need a tool that allows you to
    make symbolic directory links.
    - On Windows Vista, this is built in - the `mklink` command.
    - On Windows XP, you need to [go to SysInternals and download a
        copy of
        "junction"](http://www.sysinternals.com/ntw2k/source/misc.shtml#junction)
        if you don't already have it and put it somewhere in your path
        (like the `C:\WINDOWS\System32` folder); you're going to need to
        use it from the command prompt later.

2. **Make sure everyone runs iTunes once.** For each user you want to
    set up, make sure they've run iTunes at least once so they've
    accepted the EULA and iTunes has created their initial/empty library
    file.
3. **Choose the iTunes library you want to share.** Decide which user's
    iTunes library you want to be the main one that everyone else will
    share. You'll be manipulating this library. I will call it "the main
    iTunes library" from now on so you know what I'm talking about.
4. **[Optional] Consolidate/move the main iTunes library into a shared
    location.** iTunes has the ability to automatically manage your
    music folder and ensure it stays organized. Allowing it to do this
    as well as consolidating all of your music into one place will save
    you a lot of headache when you find that one user can't access all
    the music that another user can due to security restrictions. [Move
    your
    library](http://www.macworld.com/article/46248/2005/08/shiftitunes.html)
    into a shared location (like create a folder called
     `C:\Users\Public\Music\iTunes Music` in Vista or the
    `C:\Documents and Settings\All Users\Documents\My Music\iTunes Music` in
    XP and move it there) using the Consolidate feature to save some
    pain later.
5. **Find the main iTunes library.** The iTunes library for each user
    is stored in a folder called "iTunes" inside each user's "My Music"
    folder. It has an "itl" extension and is generally called
    `iTunes Music Library.itl`. You will probably see an
    `iTunes Music Library.xml` file in there, too. Both of these are
    part of the library, so when you're working with the library, copy
    them at the same time and keep them together.
    - In Windows XP, it will be in
        `C:\Documents and Settings\username\My Documents\My Music\iTunes`.
    - In Windows Vista, it will be in
        `C:\Users\username\Music\iTunes.`

6. **Back up the main iTunes library.** Copy the main iTunes library
    files somewhere safe for backup purposes. Just in case something
    goes wrong.
7. **Create a shared iTunes library folder.** Create a new iTunes
    folder that all users have access to. I recommend putting it in the
    "Public" or "All Users" areas so you don't have to worry about
    security issues. If you consolidated your library like in step 4,
    you'll have an "iTunes Music" folder in the "Public" or "All Users"
    music folder (given your version of Windows). Make a parallel folder
    to that called "iTunes Library."
    - In Windows XP, this will be
        `C:\Documents and Settings\All Users\Documents\My Music\iTunes Library`.
    - In Windows Vista, this will be
        `C:\Users\Public\Music\iTunes Library`.

8. **Copy the main iTunes library files into the shared iTunes library
    folder.** As simple as drag and drop - copy the .itl and .xml files
    from the main iTunes library into the new shared library folder you
    just created.
9. **Create symbolic links to the shared iTunes library.** You're
    logged in as Administrator (or otherwise have Administrator rights),
    right? Here's where you really need them.
    - *Open a command prompt.* In the Start -\> Run box, type `cmd`
        and hit Enter. A command prompt should pop up.
    - *For each user who needs to share the iTunes library...*
        - Change to the user's music folder.
            - In Windows XP:
                `cd "\Documents and Settings\username\My Documents\My Music"`
            - In Windows Vista: `cd "\Users\username\Documents\Music"`

        - Delete the old iTunes library folder and all of its
            contents. (This is why you backed the main library up
            earlier.)
             `rmdir /s iTunes`
        - Make a symbolic link to the new shared iTunes folder. This
            will replace the old iTunes folder and will "fake out"
            iTunes so it thinks it's talking to a local user's iTunes
            library.
            - In Windows XP:
                `junction iTunes "C:\Documents and Settings\All Users\Documents\My Music\iTunes Library"`
            - In Windows Vista:
                `mklink /d iTunes "C:\Users\Public\Music\iTunes Library"`

10. **Verify the settings by logging each user in.** Everyone you just
    set up should now be working off of the same iTunes library. Have
    each user who's sharing log in and verify they can see the shared
    library. **Do not use "Switch Users" - you must fully log off each
    user and log the next one on.** They will all have to set up their
    own preferences (like their iTunes account, their shopping
    preferences, etc.) but they will all have access to the same music
    library and the same playlists.
11. **[Optional] Update music library/import settings for each user.**
    You may need to set up each user account to import music to the new
    shared music location. You also may need to update the settings in
    iTunes to keep the library organized (if you're using that). I've
    had hit-or-miss luck getting these settings to come along for the
    ride. By default, people will be set up to rip music to their
    personal iTunes folder (you probably don't want that) and to keep
    the music library organized (you probably do want that).
12. **That's it! You're done!**

There are a couple of interesting caveats to note when working in this
scenario. Some good, some not so good.

- **Everything is shared.** Literally everything - playlists, ratings,
    etc. If one person changes a song rating, it gets updated for
    everyone sharing. If you're anal like me, that means you'll tell
    everyone else not to rate anything.
- **You can set up different users with different iPods.** So I can
    sync my iPod with playlists X, Y, Z and Jenn can sync hers
    automatically with playlists A, B, C. No problems there.
- **Authorization for music is shared.** It doesn't seem to matter
    which user's iTunes account purchases music, everyone on the
    computer has access to it and can play it on their iPod. For
    example, Jenn bought a song last night using her account, but when I
    log in and sync the song to my iPod, it plays just fine. [QTFairUse
    and
    myFairTunes](http://www.hymn-project.org/forums/viewtopic.php?t=1314)
    can also will take care of un-DRM-ing music for multiple accounts.
- **You can't have multiple users simultaneously logged in and using
    iTunes.** That includes the "fast user switching" thing Windows
    provides. If one person is using iTunes, no one else can be using
    iTunes on that computer.

I haven't run into any other issues.

**AGAIN, PLEASE NOTE:** Your mileage may vary. You may need to adapt
folder/file paths to match your system; this set of instructions is
pretty simplified so it should work with the out-of-the-box default sort
of system. Also, you definitely need to run this with an account that
has Administrator privileges. If you're set this up with limited
accounts, you probably won't get too far. (You don't need Administrator
privileges once it's set up, just *while* you're setting up.)

***All instructions here are provided for your UNSUPPORTED use and AT
YOUR OWN RISK.***
