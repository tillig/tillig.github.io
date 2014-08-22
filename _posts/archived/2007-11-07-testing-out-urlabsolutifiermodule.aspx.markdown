---
layout: post
title: "Testing Out UrlAbsolutifierModule"
date: 2007-11-07 -0800
comments: true
disqus_identifier: 1294
tags: [Web Development]
---
I figured out the problem with my URL absolutifier HttpModule (which I'm
calling "UrlAbsolutifierModule" - gasp).  I was hooking into things too
early in the request lifecycle, so when the Subtext RSS handler attached
a GZip filter to compress the RSS feed it was GZipping things first,
then I was trying to process URLs.  Attaching later in the lifecycle
allows me to wrap the GZip filter so I can do my processing before the
contents get encoded.

If you're reading this site through RSS, pictures should now properly
display.  Here's a little picture of my cat so the RSS folks can see it
in action - if you see the picture in your RSS reader, you've got the
cleaned up feed:

![My cat. If you see this picture in RSS, the UrlAbsolutifier is
working.](https://hyqi8g.dm2302.livefilestore.com/y2p3RslmbwtdTfsQZgVwW2-NVWJg7F84q01A47LISYNS6O8lz8W-cllBc83aH-Rb8pbnw78LJGATnVqTKy7lTT7WhTyeZoJeecV-DFUBmgfm7Q/20071107urlabsolutifiertest.jpg?psid=1)

If you don't see the picture in RSS, it's not working.  Should that be
the case, please leave me a comment to that effect.

I'll test this out for a while before I release it.  If it works, I'll
put it out there for folks to consume.

