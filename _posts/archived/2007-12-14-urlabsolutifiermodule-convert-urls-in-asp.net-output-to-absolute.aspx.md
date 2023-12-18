---
layout: post
title: "UrlAbsolutifierModule - Convert URLs in ASP.NET Output to Absolute"
date: 2007-12-14 -0800
comments: true
disqus_identifier: 1321
tags: [aspnet,blog,dotnet,subtext,downloads,dotnet]
---
So here's the problem:

You're running your web site or blog and you've got an image you want to
put up.  You put in the HTML something like this:

`<img src="/images/myimage.gif" />`

No problem - you load up the site and it looks great.  You check your
RSS feed and it looks good.  And why wouldn't it?  When a browser hits
your page or a reader looks at your feed, it's all coming from
`http://yoursite.com`, so the site-relative URL gets translated to
`http://yoursite.com/images/myimage.gif`.  No problemo.

Then you decide you want the benefits of a syndication site like
[FeedBurner](http://www.feedburner.com) - it reduces your bandwidth
usage and has some other value added features.  Good times.  You sign
up, get your feed cranking through it, and go check it out.  It looks
horrible - all of your image links are broken!  What's going on?

The problem is the relative URL - now that the feed is coming from
`http://feeds.feedburner.com/yoursite`, the relative image URL gets
translated to `http://feeds.feedburner.com/images/myimage.gif`, which is
plainly wrong.  [Whatcha gonna do, brother, *whatcha
gonna do*?](http://en.wikipedia.org/wiki/Hulk_Hogan)

If you have an ASP.NET-based site, I created an answer:  The
UrlAbsolutifierModule.  It's an HttpModule that filters through content
and converts URLs in HTML tags from relative to absolute.  You can even
configure it to only process certain pages or handlers, so you only
process, say, your RSS feed.

**Note:** I wrote it to be pretty aggressive - anything that looks like
HTML (encoded/embedded in XML, straight HTML, a code snippet you might
have embedded in a blog entry, etc.) will be updated if it's run through
this filter.  If you use it, you will definitely want to be selective
about which pages it processes and not just throw it carte blanche on
your site.  By that same token, if it's not HTML (like if it's your RSS
feed and the URL is in the channel/link element of your feed XML), it
won't be looked at.

Included in the compiled package:

- The UrlAbsolutifierModule assembly.
- XML class documentation.
- A readme explaining how to use it with an example showing how to
    configure it for use with [Subtext](http://www.subtextproject.com),
    my blog of choice.

Included in the source package:

- Source for the UrlAbsolutifierModule assembly.
- Unit tests and a demonstration web site showing it in action.
- The very same readme explaining how to use it.

Want it? Need it? Come and get it. Yours, free, at (of course) your own
risk.

[**[Download UrlAbsolutifierModule 1.0.0
Compiled](https://github.com/tillig/UrlAbsolutifierModule/releases/download/v1.0.0/UrlAbsolutifierModule_1.0.0.zip)**]

[**[Download UrlAbsolutifierModule 1.0.0
Source](https://github.com/tillig/UrlAbsolutifierModule/archive/v1.0.0.zip)**]

**Version History**:
 **1.0.0**: First release.
