---
layout: post
title: "Moving Your iTunes Library"
date: 2007-12-24 -0800
comments: true
disqus_identifier: 1327
tags: [media,music,windows]
---
I bought a new laptop and I want to sync my iPod from the laptop now,
not from the desktop in the other room. Unfortunately, moving your
iTunes library around is kind of difficult. You can copy the library
file (.itl file) over and fire up iTunes on the new computer, but it's
still going to look in the old location for the files and it's not going
to find them.

I tried the iTunes COM SDK but it turns out the physical location of a
file is a read-only property.  Luckily, I found an article that talks
about how you can [manage your library and move things around by using
the "Consolidate Library"
feature](http://www.ilounge.com/index.php/articles/comments/11856/).  I
already have my music on an external drive, but I want to get it to a
different drive that's shared on the network, so here's what I did:

1.  Install iTunes on the new laptop.
2.  Start iTunes so the initial iTunes library files are created and I
    can get past the setup bits.
3.  Copy the iTunes library files (both the .itl and .xml) over the top
    of the new ones on the new laptop.
4.  Plug the old external drive into the laptop. Make sure the drive
    letter on the new laptop is the same as it was on the old computer.
    In my case, this is the "F:" drive.
5.  Open iTunes on the new laptop and verify all the songs are found.
6.  Update the new iTunes settings - change the location of the iTunes
    library folder to the place you want the music files to be, tell
    iTunes to automatically manage your collection, and tell it to copy
    any new files into your iTunes library folder.
7.  In the new installation of iTunes, select Advanced -\> Consolidate
    Library. This will copy the music from the old location to the new
    location and update the database with the appropriate new locations.

The only downside to this is that if you have a large collection (as I
do), it's not a very fast process and it takes up a lot of disk space -
you'll end up with two copies of your music collection. That said, once
the consolidation is complete, you can delete the old copy of the
collection and free up your disk space.

I really wish the iTunes COM SDK allowed me to just change the file
location. It'd have been so much easier just to script the move.

