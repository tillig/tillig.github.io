---
layout: post
title: "Still Working the Absolute URL RSS Problem"
date: 2007-11-06 -0800
comments: true
disqus_identifier: 1291
tags: [subtext,xml,blog]
---
I'm still working on a decent solution to the absolute URL problem I'm
seeing in my RSS feed (which is why the images in my RSS feed appear
broken - the images are sourced from a relative URL, like
"/images/foo.gif" which, paired with FeedBurner, make it look like the
images are supposed to come from
[FeedBurner](http://www.feedburner.com), and they're not).

Anyway, I have a sort of general-purpose HttpModule for filtering
response output and converting URLs to absolute format, but it's not
working with Subtext's RSS feed when compression is turned on.  I think
I'm inserting myself too late in the request lifecycle so my filter is
trying to process GZipped content and is puking on it.

So... I've got some more testing and coding to do.

Another stumbling block I hit and wasn't even thinking of - I wrote my
first run at the module to filter HTML... but what it really needs to
filter is *XML with embedded encoded HTML* because that's what RSS is.

That leaves me with a little bit of a design quandary - I can make it a
general purpose module at the cost of increased development and testing
or I can narrow the scope to my specific case and reduce the set of
customers that would find it useful.  Ah, isn't that just the typical
development dilemma?

