---
layout: post
title: "Long URL Path Segments in ASP.NET Routing Yield 400 Errors"
date: 2011-08-26 -0800
comments: true
disqus_identifier: 1734
tags: [net,Web Development]
---
Ran into an interesting gotcha while working with routing and a handler
on a web site. We had a route set up like this:

`CustomHandler/{value}`

Nothing too special, except **the "value" route parameters are fairly
long strings**. In some cases 300 characters or more.

We were finding that in some cases things worked great, but in others
**IIS would return a 400 error claiming "invalid URL."**

The URL total length was less than 1000 characters, so it wasn't that.

Turns out [there's a registry
setting](http://support.microsoft.com/kb/820129) for indicating the
maximum length of any individual path segment called
**"UrlMaxSegmentLength." The default value is 260 characters.** When our
route value was longer than that, we'd get the 400 error.

The solution is to **pass the value on the querystring rather than as a
route value**. Something to consider if you have route values that are
going to be long.

Of course, this isn't a problem with routing, just that you can get into
the situation pretty easily when you get into the habit of pushing
parameters into the route. It might be nice in future versions of
routing to have some sort of max length check when generating full route
URLs so you can't generate a path segment greater than, say, 256
characters without getting an exception.

