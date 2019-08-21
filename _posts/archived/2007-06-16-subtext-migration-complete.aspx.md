---
layout: post
title: "Subtext Migration Complete!"
date: 2007-06-16 -0800
comments: true
disqus_identifier: 1215
tags: [blog,subtext,net,aspnet]
---
[![Subtext]({{ site.url }}/images/20070616subtextwo1.png)](http://www.subtextproject.com)I
just finished converting over to Subtext, and, all things considered, it
went reasonably well.

A lot of work went into the migration, though - a lot more than I really
feel should have.  But at least I'm moved over.

What I ended up having to do:

-   Get a SQL 2005 database (pMachine was stored in MySQL).
-   Write a BlogML export utility for pMachine (which I will be
    contributing to [the BlogML
    project](http://www.codeplex.com/BlogML)).
-   Write a utility that creates a map of old IDs for my blog posts to
    new Subtext friendly URLs.
-   Write a converter that takes the ID map and generates a redirection
    utility in PHP to replace the old blog pages (so they'll get you to
    the new blog).
-   Write a utility that goes through the BlogML export and updates all
    URLs to the new Subtext URLs so the blog proper doesn't actually
    rely on the redirection mechanism for cross-post links and images.
-   Write a utility that goes through the BlogML export and updates all
    the comment text because there's a weird issue with Subtext BlogML
    import that converts all newlines to line break tags... and then
    encodes any line break tags you already have so they end up being
    visible.  Not pretty.
-   Manually break the BlogML export into three pieces - the request
    times out if you try to upload a 5MB BlogML file.
-   Install and configure Subtext.
-   Import all of the BlogML pieces.
-   Swap out all of the old pMachine pages with my redirection utility.
-   Update my old RSS feed so folks know they need to get the RSS
    through [Feedburner](http://www.feedburner.com).
-   Little fine-tuning things.  The BlogML import doesn't populate the
    author name or email in the Subtext database so I'm going to have to
    do some work there.  The Subtext configuration proper is easy, but
    you have to set things up (like your Feedburner name and stuff).

So I'm pretty much converted, which is super cool, as far as I'm
concerned.  Things I want to do now that I've got myself moved over:

-   Category cleanup.  I've got a pretty crappy category breakdown and
    it's time to clean that up.
-   Custom skin.  I picked a decent stock theme for now, but I want the
    site to be *me*.
-   Blogroll and links.  I didn't really export the original set of
    links or anything, figuring I'll add links as I see their
    usefulness.  I already know of a couple of blogs that I read I
    should add.
-   "About" section.  The old "about me" section had seen better days
    and depended on the old pMachine code to generate its template.  I
    need to come up with a new section.
-   Script integration.  I want to get my little Xbox Gamercard popup
    thing working again, and the Amazon link script where they pop up a
    nice review and image of things you're interested in - that's neat. 
    I also want to add some other stuff, like a scrolling Twitter
    history deal and maybe a few other fun items.

Oh, and **if anyone knows how to write a PHP page that will not only
send the "Location" header but also let me change the status code,
that'd be awesome**.  I'm trying to do that in PHP
4-point-something-or-other so I don't have the ability to do much.  I've
tried the http_redirect method and that doesn't work.  Right now I'm
using `header("Location: $newlocation")` which is supposed to
automatically throw out a 302 redirect status, but I'll be damned if I
see anything other than a 200 come through when I watch in Fiddler.  The
browser sees the "Location" header and displays the content from the
right page in Subtext, but the URL in the browser doesn't change.

Regardless, I'm back in the saddle with a new blog package and finally
feel like I'm living in the now.  Time to join up on the Subtext project
and start contributing!

