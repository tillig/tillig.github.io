---
layout: post
title: "Multi-User Picasa"
date: 2008-01-04 -0800
comments: true
disqus_identifier: 1332
tags: [Media]
---
When I was [setting up multi-user
iTunes](/archive/2005/04/10/multi-user-itunes.aspx) on my new Windows
Vista box, I also came across the need to set up
[Picasa](http://picasa.google.com/) for multi-user support. Like iTunes,
Picasa is really a single-user application so you have to do some
special work to get it to share a single library across different user
accounts.

Fortunately, you can use many of the same principles as in [multi-user
iTunes](/archive/2005/04/10/multi-user-itunes.aspx) to get Picasa up and
running without much issue. (Enough so that I can do some pretty easy
copy/paste modification to the iTunes instructions and get Picasa
instructions.)

> **IMPORTANT NOTES:**
>
> -   **This is all at your own risk.**  If it doesn't work for you, I'm
>     sorry, but **I can't offer individual support**.
> -   **You may not be able to follow this verbatim.** If these steps
>     don't work *precisely*, I recommend looking at *the intent* of the
>     steps - putting the Picasa library in a central location and
>     creating links to it from individual user profiles - and adjusting
>     things according to your setup.
> -   **As new versions of Picasa, Windows, etc. come out, I may not
>     always update or catch all the little "gotchas."** I originally
>     wrote these for Picasa 2.7... things change, versions change, OSes
>     change, and I can't keep these up to date for every possible
>     combination of software.
> -   **You must have Administrator privileges to set this up.** You
>     don't need Admin rights once you've got it set up, but some of the
>     stuff you do here needs to be run as Administrator, so make
>     sure you can do that. 
> -   **You need to be comfortable at a command prompt.** If you're not,
>     this may be very frustrating for you.

Now... here's how to get it running:

1.  **Get the required tools.** You'll need a tool that allows you to
    make symbolic directory links.
    -   On Windows Vista, this is built in - the `mklink` command.
    -   On Windows XP, you need to [go to SysInternals and download a
        copy of
        "junction"](http://www.sysinternals.com/ntw2k/source/misc.shtml#junction)
        if you don't already have it and put it somewhere in your path
        (like the `C:\WINDOWS\System32` folder); you're going to need to
        use it from the command prompt later.

2.  **Make sure everyone runs Picasa once.** For each user you want to
    set up, make sure they've run Picasa at least once so they've
    accepted the EULA and Picasa has created their initial/empty library
    file. You'll also be asked to set up "watched directories" when
    Picasa runs the first time. I recommend watching as few directories
    as possible and adding them in later once you've finished getting
    everyone on board.
3.  **Choose the Picasa library you want to share.** Decide which user's
    Picasa library you want to be the main one that everyone else will
    share. You'll be manipulating this library. I will call it "the main
    Picasa library" from now on so you know what I'm talking about.
4.  **[Optional] Consolidate/move the main Picasa library pictures into
    a shared location.** Picasa allows you to backup and restore
    pictures using its built-in tools. You can back up from one place
    and restore to a different place, effectively moving your library.
    (I will not walk you through this. It's sort of a pain, but if you
    search the Picasa forums you'll find info.) Basically: run the
    backup, move your original photos out somewhere else, restore the
    backup to a different/new location, verify you can still see things
    in Picasa, and delete the original photos.  Doing this will save you
    a lot of headache when you find that one user can't access all
    the pictures that another user can due to security restrictions.
    Move the pictures into a shared location (like create a folder
    called  `C:\Users\Public\Pictures\My Pictures` in Vista or the
    `C:\Documents and Settings\All Users\Documents\My Pictures\My Pictures` in
    XP and move it there). Note that you may need to try the "restore"
    operation a few times before you get it the way you like it. Don't
    delete your originals until you're sure the backup restored all of
    the stuff you want. **I am not responsible if you lose data trying
    this. Do it at your own risk.**
5.  **Find the main Picasa library.** The Picasa library for each user
    is stored across two folders inside each user's application data
    folder. Both of these are part of the library, so when you're
    working with the library, copy them at the same time and keep them
    together.
    -   In Windows XP, these folders are:
        -   `C:\Documents and Settings\username\Local Settings\Application Data\Google\Picasa2`
        -   `C:\Documents and Settings\username\Local Settings\Application Data\Google\Picasa2Albums`

    -   In Windows Vista, these folders are:
        -   `C:\Users\username\AppData\Local\Google\Picasa2`
        -   `C:\Users\username\AppData\Local\Google\Picasa2Albums`

6.  **Back up the main Picasa library.** Copy the main Picasa library
    folders somewhere safe for backup purposes. Just in case something
    goes wrong.
7.  **Create a shared Picasa library folder.** Create a new Picasa
    folder that all users have access to. I recommend putting it in the
    "Public" or "All Users" areas so you don't have to worry about
    security issues. It should be something like this: 
    -   In Windows XP, this will be
        `C:\Documents and Settings\All Users\Documents\My Pictures\Picasa Library`.
    -   In Windows Vista, this will be
        `C:\Users\Public\Pictures\Picasa Library`.

8.  **Copy the main Picasa library folders into the shared Picasa
    library folder.** As simple as drag and drop - copy the two folders
    that make up the Picasa library into the new shared library folder
    you just created.
9.  **Create symbolic links to the shared Picasa library folders.**
    You're logged in as Administrator (or otherwise have Administrator
    rights), right? Here's where you really need them.
    -   *Open a command prompt.* In the Start -\> Run box, type `cmd`
        and hit Enter. A command prompt should pop up.
    -   *For each user who needs to share the Picasa library...*
        -   Change to the user's local settings folder.
            -   In Windows XP:
                `cd "\Documents and Settings\username\Local Settings\Application Data\Google"`
            -   In Windows Vista:
                `cd "\Users\username\AppData\Local\Google"`

        -   Delete the old Picasa library folders and all of their
            contents. (This is why you backed the main library up
            earlier.)
             `rmdir /s Picasa2`
             `rmdir /s Picasa2Albums`
        -   Make a symbolic link to the new shared Picasa folders. This
            will replace the old Picasa folders and will "fake out"
            Picasa so it thinks it's talking to a local user's library.
            -   In Windows XP:
                `junction Picasa2 "C:\Documents and Settings\All Users\Documents\My Pictures\Picasa Library\Picasa2"`
                `junction Picasa2Albums "C:\Documents and Settings\All Users\Documents\My Pictures\Picasa Library\Picasa2Albums"`
            -   In Windows Vista:
                 `mklink /d Picasa2 "C:\Users\Public\Pictures\Picasa Library\Picasa2"`
                `mklink /d Picasa2Albums "C:\Users\Public\Pictures\Picasa Library\Picasa2Albums"`

10. **Verify the settings by logging each user in.** Everyone you just
    set up should now be working off of the same Picasa library. Have
    each user who's sharing log in and verify they can see the shared
    library. **Do not use "Switch Users" - you must fully log off each
    user and log the next one on.** They will all have to set up their
    own preferences (like their email settings, etc.) but they will all
    have access to the same picture library and the same albums.
11. **[Optional] Update watched folder settings for each user.** You may
    need to set up each user account to watch the same folders, and make
    sure each user isn't watching their own personal "Pictures" folder.
    You only want Picasa to watch folders that every user sharing the
    library has access to, otherwise you could run into access issues.
12. **That's it! You're done!**

I've had this running for a couple of weeks now and haven't had any
issues. The toughest part really is doing the backup/restore to move
your pictures to a new location that everyone can access. Just be
patient with it and be willing to spend the time it takes to try it a
few times. Oh, and be sure to back things up and verify your changes
take hold before you delete things. You'll get it. It's not that bad.

***All instructions here are provided for your UNSUPPORTED use and AT
YOUR OWN RISK.***

