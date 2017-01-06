---
layout: post
title: "When StaticFileHandler is not StaticFileHandler"
date: 2011-05-02 -0800
comments: true
disqus_identifier: 1712
tags: [net,aspnet]
---
I could also have called this "wildcard .NET mapping in IIS Express from
web.config."

I'm sure that, like, everyone out there but me has figured this out by
now, but... well, I'll blog it anyway.

**Problem: Your ASP.NET web site has
a**[**VirtualPathProvider**](http://msdn.microsoft.com/en-us/library/system.web.hosting.virtualpathprovider.aspx)**that
serves static files (e.g., .jpg, .css, etc.). It works great in the
Visual Studio development web server but switching to IIS Express, it
suddenly doesn't work.**

My team has just such a provider that serves static files out of
embedded resources. We switched from Cassini over to IIS Express and
couldn't for the life of us figure out why it suddenly stopped working.
I mean, it's "integrated pipeline," right? WTF?

OK, so my first "duh!" moment was when I realized that it's integrated
*pipeline*, not ".NET is responsible for handling each *request*." That
is, you have a managed request pipeline but the actual *handler* that
serves the content may or may not be managed. It's one of those things
you know, then forget you know, then remember again when you hit a snag.

At that point I went looking in config to see what the handler was for
static files and I saw this in the `system.webServer/handlers` section
of `applicationhost.config`:

`<add name="StaticFile" path="*" verb="*" modules="StaticFileModule,DefaultDocumentModule,DirectoryListingModule" resourceType="Either" requireAccess="Read" />`

This is where I made my mistake. I know what the line there *says*, but
in my mind, I *read* it as "Use the StaticFileHandler for any files not
previously mentioned." So I'm thinking `System.Web.StaticFileHandler`,
right? It's *integrated*, so that's your built-in wildcard mapping...
right?

**That's not what it says.**

**It says, "When all else fails, use the unmanaged default mechanism to
serve up the static content."** Which, further, means "skip all
VirtualPathProviders and go right to disk."

My teammate, Sagar, figured that one out and we were both slapping our
foreheads. Of course. Again, integrated *pipeline*, not ".NET handles
all *requests*."

**The fix is to add the .NET static file handler back into your
pipeline.** You can do this in your `web.config` in
`system.webServer/handlers`:

`<add name="AspNetStaticFileHandler" path="*" verb="*" type="System.Web.StaticFileHandler" />`

We did that, and suddenly things were working again. Bam! Done.

**Note that doing this has some performance and caching implications.**
The unmanaged, standard IIS static file handler is pretty well optimized
for performance; more so than the managed static file handler. Also, the
managed static file handler doesn't write caching-related information
(e.g., ETag or Expires headers) for virtual files that are not served up
from disk. Something to consider.

