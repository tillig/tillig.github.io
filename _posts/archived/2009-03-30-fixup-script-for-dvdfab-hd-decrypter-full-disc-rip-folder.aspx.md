---
layout: post
title: "Fixup Script for DVDFab HD Decrypter Full Disc Rip Folder Structure"
date: 2009-03-30 -0800
comments: true
disqus_identifier: 1509
tags: [media]
---
This is, admittedly, a bit of a niche thing, but it's helpful for me so
I figured someone might be interested.

I use [DVDFab HD Decrypter](http://www.dvdfab.com/download.htm) to rip
movies for [my DVD
Library](/archive/2008/09/12/how-to-set-up-a-dvd-library-in-windows-media.aspx) and
it works really well except when you tell it to rip movies to a
particular folder, it generates this little folder structure that makes
it difficult to just copy over the movie to my Windows Home Server. Say
I tell it to rip to the "C:\\Movies\\Really Cool Movie" folder - I'll
come out with a structure like this:

    C:\Movies\Really Cool Movie
        |
        +-FullDisc
           |
           +-DISC_TITLE
              |
              +-AUDIO_TS
              +-VIDEO_TS

The problem is, I want the AUDIO\_TS and VIDEO_TS folders up in the
"C:\\Movies\\Really Cool Movie" folder, not two levels down in some
generated hierarchy:

    C:\Movies\Really Cool Movie
        |
        +-AUDIO_TS
        +-VIDEO_TS

It requires manual file moves to get things rearranged. Not a big deal,
but do it 100 times and it's a pain in the ass. This script fixes that
up:

```
    @echo off
    if .%1. == .. goto :help
    pushd %1
    pushd FullDisc
    for /d %%s in (*) do pushd %%s
    for /d %%s in (*) do move %%s ..\..
    for %%s in (*) do move %%s ..\..
    popd
    popd
    rmdir /s /q FullDisc
    popd
    goto :eof

    :help
    echo This script fixes up DVDFab rip folder structures.
    echo fixmovie [moviefolder]
    goto :eof
```

Copy that into a batch file called "fixmovie.bat" and save it in your
movies folder. Then you can just run it and pass the folder name of the
movie you need to fix the directory structure for. In the case of my
example, I'd run `fixmovie.bat "Really Cool Movie"` from the
"C:\\Movies" folder and it'd clean up the directory structure for me.

Standard disclaimers apply. YMMV, not responsible for destruction of
your universe, etc.

