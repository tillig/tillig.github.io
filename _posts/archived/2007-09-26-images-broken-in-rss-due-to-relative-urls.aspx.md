---
layout: post
title: "Images Broken in RSS Due to Relative URLs"
date: 2007-09-26 -0800
comments: true
disqus_identifier: 1275
tags: [GeekSpeak]
---
I just did a quick peek at my feed in RSSBandit and it looks like my
images aren't showing up in my feed.  Turns out it's because, in many
cases, I specify image URLs as "/path/to/image.gif" rather than
"<http://www.paraesthesia.com/path/to/image.gif" -> relative rather than
absolute.

I'm looking into ways to fix this in an automated fashion.  I don't want
to have to manually go back and edit every post that has an image in it,
and I'm sure there are links that are also specified in relative format
that won't work in feeds.  I found [a WordPress plugin that does exactly
what I need](http://fucoder.com/code/url-absolutifier/) for exactly the
same reasons.  I just need to find a .NET HttpModule that does this
(that I can selectively enable just for the feed).

If I can't find it, I guess I'll have to write it.
