---
layout: post
title: "M4P Backup/Decryption Script"
date: 2004-12-29 -0800
comments: true
disqus_identifier: 717
tags: [Software / Downloads,Release Notices]
---
**IMPORTANT NOTE:** [hymn](http://hymn-project.org/), which I use with
the below script for unlocking protected music, is no longer being
updated. The new version,
[JHymn](http://www.hymn-project.org/jhymndoc/), is a Java-based GUI app
that performs the same function and handles the iTunes 4.7.1 issues. It
also provides the ability to back up your music (when you unlock it) to
a new location. As it does not have a command-line interface, it is not
usable with this script. If a command-line interface comes, I'll update
this script. Until then, use JHymn. [I've posted my JHymn settings
here.](/archive/2005/01/25/jhymn-settings.aspx)
 
 
 I'm a user of [iTunes](http://www.apple.com/itunes/), and I have
purchased music through the [iTunes Music
Store](http://www.apple.com/itunes/store/). I'm also a big believer in
fair use, and while I don't condone anything illegal, I'm irritated by
the [FairPlay DRM system](http://en.wikipedia.org/wiki/FairPlay),
particularly the five-computer authorization limit. I'm not spreading my
purchased music around, but the need to remember what's been authorized
and what hasn't, to authorize and deauthorize machines... it's a pain.
 
 I got [hymn](http://hymn-project.org/) and
[FairKeys](http://www.nanocrew.net/software/) to download a copy of my
FairPlay authorization keys and then un-DRM my purchased music. Then I
made backups of both the protected and unprotected versions of the
songs.
 
 The problem then ended up being that I didn't want to have to manually
do that every time I bought something on iTunes. As such, I figured I
needed a script that would do exactly that: Make a backup copy of the
protected (\*.m4p) files, decrypt any that didn't have a corresponding
decrypted version (\*.m4a), and then make backup copies of the decrypted
versions. "M4P Backup.vbs" was born.
 
 The script will, for each \*.m4p file found in your music library:

1.  XCopy the file into a backup folder for you. (By using XCopy, you
    get a folder tree for your protected music files mimicked from your
    original music library folder.)
2.  Check for a corresponding .m4a file in the same library folder.
3.  If a .m4a isn't found, the script calls "hymn.exe" to create one.
4.  The decrypted .m4a file is backed up alongside the corresponding
    .m4p.


 
 Below is a sample console session of the "M4P Backup.vbs" script. Click
the image to enlarge it.
 
 [![Sample backup session - click to
enlarge.](https://hyqi8g.blu.livefilestore.com/y2pqVW1dUVjWGpwCXdJb2nMeytlz2LxIh46mdIdWPEfR_hTg2IZi-R__RRygJjzfSVF4sHll6qnI2DvTgqOo3Om8ZF5HvTrnT41phT_05fvtSE/20041229m4pbackup_sm.jpg?psid=1)](https://hyqi8g.blu.livefilestore.com/y2pcIISc0ofLYSS5DSyNaFmIvK1CgKXDt4VetA6RDkGMVlWdvzTi_ndGYNJ0v4GSdQOoFpwMQJexkuarc_yQ2D4XS6X7sJwz-uOBEG-yFZM430/20041229m4pbackup_lg.gif?psid=1)
 
 **Installation/Configuration:**
1.  Download hymn at
    [http://hymn-project.org/](http://hymn-project.org/). Get that
    working - I cannot offer technical support on hymn. You may also
    need to get FairKeys from
    [http://www.nanocrew.net/software/](http://www.nanocrew.net/software/)
    if hymn is unable to find your FairPlay keys. Check the [hymn
    forums](http://hymn-project.org/forums/) for information on using
    FairKeys with hymn.
2.  Download "M4P Backup.vbs," below. Unzip the script into a known
    location (i.e., your desktop).
3.  Open your unzipped "M4P Backup.vbs" file in a text editor. At the
    top of the script, in a section marked "CONFIGURATION," set the
    configuration variables as specified. Examples are provided in the
    script.


 
 That's it! Once you're set, you can either double-click the script to
execute it, or you can explicitly call the console script host to run
the backup script in console mode (as shown in the screen shot):
`cscript "M4P Backup.vbs"`
 
 [**Download M4PBackup
1.0**](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!45408&authkey=!AFymbO9RjnQF-qw&ithint=file%2czip)
 
 **Version History:**
 1.0: First release. Tested with hymn 0.7.1.
