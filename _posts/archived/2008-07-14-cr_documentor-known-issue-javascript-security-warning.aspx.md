---
layout: post
title: "CR_Documentor Known Issue: JavaScript Security Warning"
date: 2008-07-14 -0800
comments: true
disqus_identifier: 1417
tags: [net,vs]
---
There's [a known issue with the latest
CR\_Documentor](http://code.google.com/p/cr-documentor/wiki/KnownIssues)
- sometimes, on an unpredictable basis, it'll start issuing that "active
content" JavaScript security warning. It does that because we're
updating the document by poking data into the DOM directly. Usually
setting your IE security settings to "allow active content to run in
files on My Computer" fixes it, but not always.

Unfortunately, it's not really something I can replicate easily, but I
know the fix is to, well, stop doing that dynamic poking thing and just
serve it up like a regular web server. [I have a couple of
options](http://code.google.com/p/cr-documentor/wiki/ProductRoadmap):

1.  **Create a custom in-proc web server from scratch.** I'd have the
    most control over it and the least dependencies, but it's the most
    amount of work, too.
2.  **Add a dependency to the ASP.NET development server and use that.**
    Basically, just fire up the ASP.NET development server and serve
    from a temporary filesystem location.

**Is it safe to assume most folks have the ASP.NET development server
installed with Visual Studio?** I could detect if it was installed and
issue an error when the user displays the window to tell them they need
to have it installed. I'm thinking writing web servers, however tiny, is
not my "core competency" so I'd rather use something off the shelf than
try to roll everything myself.

**UPDATE:** Turns out [rolling your own is easy with
HttpListener](/archive/2008/07/16/simplest-embedded-web-server-ever-with-httplistener.aspx).
I'm going to try that first.

**UPDATE 2:**This is currently being worked on and should be fixed in
the next version. You can follow the issue progress [on the
CR\_Documentor
site](http://code.google.com/p/cr-documentor/issues/detail?id=1).

**UPDATE 3: [It's fixed! Go get
it!](http://cr-documentor.googlecode.com)**

