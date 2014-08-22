---
layout: post
title: "Optimize Tortoise SVN Cache (TSVNCache.exe) Disk I/O"
date: 2007-09-26 -0800
comments: true
disqus_identifier: 1274
tags: [GeekSpeak]
---
I've got a lot of background processes running and killing my disk
performance with all the I/O they're doing.  One of the primary
offenders is the TortoiseSVN cache that helps put the icon overlays in
Explorer.  Several folks I know disabled the cache altogether, but I
like the icons.

Rather than disable the cache, you can optimize the paths it looks at so
it only actually looks at working copies and not your whole disk.  If
you keep all of your working copies in specific known locations, this is
a really simple thing to do.  For example, I keep all of my checked out
code in one of three places - a "dev" folder I have, the "Visual Studio
2005" folder in "My Documents," and the "Visual Studio Projects" folder
in "My Documents."

To optimize the disk usage...

1.  Right-click on your desktop and select "TortoiseSVN -\> Settings..."
2.  In the tree view, find the "Look and Feel/Icon Overlays" branch.
3.  In the "Exclude Paths" box, put `C:\*` to exclude the entire C
    drive.  If you have more drives than that, exclude them all at the
    top level.  Separate the values by newlines.
4.  In the "Include Paths" box, list all of the locations you have
    working copies, separated by newlines.  Again, this is easier if you
    keep all of your working copies in a specific folder or set of
    folders.  Using my example, this is what I put in the "Include
    Paths" box:
    `C:\dev\*     C:\Documents and Settings\tillig\My Documents\Visual Studio 2005\*     C:\Documents and Settings\tillig\My Documents\Visual Studio Projects\*`
     
     And here's a screen shot:
     ![TortoiseSVN icon overlay options - set the "Exclude paths" and
    "Include paths"
    values](http://farm4.static.flickr.com/3110/2825266523_d15b74d15f_o.jpg)
5.  Click OK to apply the changes.
6.  Either reboot or open Task Manager and kill "TSVNCache.exe" so it
    restarts when needed.  You have to restart it for these options to
    take effect.

After I did this, the icon overlays still worked great but the disk I/O
went down to nearly nothing.  YMMV.

