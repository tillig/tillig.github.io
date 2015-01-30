---
layout: post
title: "Running Static Files Through VirtualPathProvider in IIS7"
date: 2011-07-21 -0800
comments: true
disqus_identifier: 1727
tags: [net,Code Snippets,Web Development]
---
We have a custom VirtualPathProvider that [serves some static files
(\*.js, \*.css) from embedded resources in
assemblies](/archive/2007/07/13/embeddedresourcepathprovider---binary-only-asp.net-2.0.aspx).
It is similar in function to the WebResource.axd that ships with
ASP.NET, but instead of having some crazy URL, you just access the file
directly and the VPP finds it in embedded resources and serves it just
like it was on the disk. It makes for a nice deployment experience and
easy upgrade.

The problem I've run into a bunch, particularly with routing showing up,
is that even with a wildcard map to ASP.NET, my static files end up with
a 404 error code because routing is catching them, sending the requests
to the MVC handler, and no route is found. Fail.

So, as a note to myself (and anyone else who's doing something similar),
here's what I've found you need to do to get your VPP serving up static
files.

**First, you need to get the desired static file types mapped to
ASP.NET**. In an integrated pipeline, that means adding the
StaticFileHandler in your web.config ([or doing some other machinations,
based on your
setup](http://learn.iis.net/page.aspx/508/wildcard-script-mapping-and-iis-7-integrated-pipeline/),
but the web.config method makes it easy and controlled from the web app
rather than the IIS console). A snippet of web.config looks like this:

    <?xml version="1.0"?>
    <configuration>
      <system.webServer>
        <handlers>
          <add name="AspNetStaticFileHandler-GIF" path="*.gif" verb="GET,HEAD" type="System.Web.StaticFileHandler"/>
          <add name="AspNetStaticFileHandler-JPG" path="*.jpg" verb="GET,HEAD" type="System.Web.StaticFileHandler"/>
          <add name="AspNetStaticFileHandler-CSS" path="*.css" verb="GET,HEAD" type="System.Web.StaticFileHandler"/>
          <add name="AspNetStaticFileHandler-JS" path="*.js" verb="GET,HEAD" type="System.Web.StaticFileHandler"/>
        </handlers>
      </system.webServer>
    </configuration>

Obviously you'll have a whole bunch of other stuff in your web.config,
but this is the relevant bit here. **Make sure the static file handlers
are the last handler entries** in your web.config.

**UPDATE/IMPORTANT**: In the original post for this article
I set a wildcard mapping to `AspNetStaticFileHandler`. That actually
messes other things up. For example, it starts serving web form .aspx
files as text files directly. Not good. Instead, **map the static file
handler directly ONLY to the static file types you plan on serving**.

Now the problem is that ASP.NET routing is going to pick up every
incoming request for those file types and you'll end up with a 404 when
the request doesn't match any route. This is the problem that is so hard
to debug - your
[VirtualPathProvider.FileExists](http://msdn.microsoft.com/en-us/library/system.web.hosting.virtualpathprovider.fileexists.aspx)
method will be properly called to determine whether the file can be
served up... but then you get a 404 without ever getting your
[VirtualPathProvider.GetFile](http://msdn.microsoft.com/en-us/library/system.web.hosting.virtualpathprovider.getfile.aspx)
method to try and serve the thing up. WTF?! The answer is to ignore
routes to the static files.

**In Global.asax, in your RegisterRoutes method, set it up so static
file extensions get ignored.** This is based on [Phil Haack's blog entry
about ignoring requests for a certain file
extension](http://haacked.com/archive/2008/07/14/make-routing-ignore-requests-for-a-file-extension.aspx):

    routes.IgnoreRoute("{*staticfile}", new { staticfile = @".*\.(css|js|gif|jpg)(/.*)?" });

Now when you make a request for your static file, it will properly be
served up by your VirtualPathProvider and won't have to be in the
filesystem.

