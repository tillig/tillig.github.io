---
layout: post
title: "Media Center Storage Win"
date: 2008-09-02 -0800
comments: true
disqus_identifier: 1440
media
---
I got a "prototype system" up and running for [a media center
solution](/archive/2008/08/21/more-media-server-options.aspx) using [my
new Windows Home
Server](/archive/2008/08/25/windows-home-server-first-impressions.aspx)
as the storage for the video. I set up a new shared folder called "DVD"
on the home server and fixed it so it's not using file duplication (no
need eating up double the amount of space for each movie), then ripped a
disc to it.

My laptop is running Vista Ultimate, so I set up the DVD Library to
automatically watch for movies in the DVD shared folder and enabled it
to play VIDEO\_TS folder structures [following the instructions
here](http://apcmag.com/how_to_play_ripped_dvds_on_vista_media_center.htm).
Doing this worked perfectly and it played the ripped disc as though I
had put it into the local drive. Exactly what I was looking for. It even
played without glitches over the wireless network, which was surprising,
but very cool.

The next step is to figure out how I want to deal with the media center
itself. I know I'm going to need some sort of dedicated machine, so that
will probably end up being a Mac Mini, similar to [the "death of DVD"
story I was
reading](http://angryhacker.com/blog/archive/2007/08/20/the-death-of-dvd.aspx).
The question is, what software do I want to run?

-   Under Windows Vista Media Center, I have two choices:
    -   The out-of-the-box DVD Library, which is the simplest way to go
        but doesn't offer much in the way of searching/sorting by genre,
        cast, etc.
    -   [My Movies](http://www.mymovies.name), a plugin for Media
        Center, which provides a much richer interface but also is
        higher-touch. There's [a server component I'd have to install on
        the Windows Home
        Server](http://wiki.mymovies.dk/Installation%20In%20a%20Windows%20Home%20Server%20Environment.ashx)
        that, frankly, scares me because the WHS is working so well
        right now, I'd hate to start hacking on it.

-   Sticking with straight Mac, I have some choices, too (probably more
    than I'm aware of):
    -   [Front Row](http://en.wikipedia.org/wiki/Front_Row), which, as
        of version 10.5, [finally supports playback of VIDEO\_TS
        folders](http://www.macosxhints.com/article.php?story=20071029182617245).
        Doesn't look like it's much richer than the DVD Library in Vista
        Media Center, but if I went Mac Mini, it'd require less to be
        installed on the Mac. (No Boot Camp running Vista, for example.)
    -   [Matinee](http://matinee.dizandat.com/), which looks pretty
        thin. I'm thinking if Front Row supports VIDEO\_TS, I'd probably
        be best off with that over Matinee.
    -   [DistantDVD](http://www.distantdvd.com/), which is also pretty
        thin but is specifically geared towards what I'm trying to do -
        play the video off the network. It doesn't show any more info
        than the DVD Library, though, so, again, if Front Row supports
        VIDEO\_TS over the network, that might be the way to go.

There are technically a lot of other choices for both platforms, but
I've ruled out non-Windows-Media-Center choices for the Windows platform
because I really don't need most of the options the other servers offer
and I don't want to hassle with a lot of extra configuration and
hackery. I didn't list any different platforms for the Mac because,
frankly, I'm ignorant. I'm really hoping to keep it simple, though, so
as much out-of-the-box, it-just-works as I can get, the better.

It looks like it boils down to a small hierarchy of choices:

-   Do I need to have cast/genre/etc. information with the movies or is
    the title and cover art enough?
    -   If I need more than title/cover art, My Movies seems to be the
        way.
    -   If I don't need more than title/cover art... Do I want to use
        out-of-the-box Mac stuff or do I want Vista Media Center?
        -   If it's OOTB Mac, which would be the easiest, it looks like
            Front Row is probably the answer.
        -   If it's Vista Media Center, DVD Library.

I'll do a little more research on Front Row, but my media center
solution is getting close...

