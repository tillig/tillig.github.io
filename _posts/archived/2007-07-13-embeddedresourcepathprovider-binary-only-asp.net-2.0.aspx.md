---
layout: post
title: "EmbeddedResourcePathProvider - Binary-Only ASP.NET 2.0"
date: 2007-07-13 -0800
comments: true
disqus_identifier: 1233
tags: [downloads,aspnet,dotnet]
---
[I posted before about an ASP.NET 1.1 way to deploy in a
close-to-binary-only
format](http://paraesthesia.com/archive/2007/05/31/embeddedpagehandlerfactory-binary-only-asp.net-1.1.aspx),
embedding ASPX files as resources in your assemblies.  That way doesn't
work in .NET 2.0... but it turns out they added something better in .NET
2.0 that lets you create a more complete solution -
[System.Web.Hosting.VirtualPathProvider](http://msdn2.microsoft.com/en-us/library/system.web.hosting.virtualpathprovider.aspx).

The basic idea is that rather than talk directly to the filesystem,
ASP.NET provides a "hosting environment" and asks for files from there.
VirtualPathProviders can register and respond to these requests.  By
default, ASP.NET has a file system based provider registered, so
everything works out like it always did.  While you can't virtualize
everything (web.config, App\_Code, and so forth all actually have to
exist in the filesystem), other ASP.NET files (\*.aspx, \*.ascx) can
exist in a virtual file store.

There's a great article on MSDN about [how to serve your site from a ZIP
file](http://msdn2.microsoft.com/En-US/library/aa479502.aspx), but I
wanted to take it one step further and serve from embedded resources.
Enter Paraesthesia.Web.Hosting.EmbeddedResourcePathProvider.

This VirtualPathProvider implementation allows you to register
assemblies that are allowed to serve embedded files and specify on those
assemblies which embedded resources are allowed to be served.  After you
register the provider (programmatically at app startup), when ASP.NET
asks for a specific page it will ask the provider.  If the provider
finds that file in embedded resources, it's served from there; if not,
it falls back to the filesystem as usual.

Detailed usage is included in the API documentation and an
implementation can be seen in the included demo site.  On a high level,
you need to:

1. Set each page, control, or file in your web project that you wish to
    serve embedded as embedded resource.  (Normally these are "Content"
    files - switch to "Embedded Resource" in your project to embed
    them.)
2. Add a Paraesthesia.Web.Hosting.EmbeddedResourceFileAttribute to your
    web project assembly for each embedded page.  This lets the
    VirtualPathProvider know which resources are allowed to be served
    (and allows you to differentiate files that get served from
    resources that are used for other purposes).
3. In your Global.asax, at application startup, add a registration for
    the EmbeddedResourcePathProvider:
    `HostingEnvironment.RegisterVirtualPathProvider(new EmbeddedResourcePathProvider());`
4. In your web.config, add a `configSection` called
    `embeddedFileAssemblies` that gets parsed by
    `Paraesthesia.Configuration.StringCollectionSectionHandler`. This
    section will contain the list of assemblies that the
    VirtualPathProvider should query for EmbeddedResourceFileAttributes.
5. Optionally specify the ability to override embedded files with files
    in the filesystem by adding an `appSettings` key called
    `Paraesthesia.Web.Hosting.EmbeddedResourcePathProvider.AllowOverrides`
    and setting it to "true".

A demo web site with an installer is included to show the provider in
action.  It will also help you see what the code/config/attribute
declarations are so you can follow that pattern in your own usage.

This sort of thing, in combination with things like the
[WebResourceAttribute](http://msdn2.microsoft.com/en-us/library/system.web.ui.webresourceattribute.aspx)
and
[WebResource.axd](http://weblogs.asp.net/jeff/archive/2005/07/18/419842.aspx)
can get you ever closer to serving an entirely binary web site.

Caveats:

- This won't work for sites that rely on file system security. I
    primarily work with forms authentication, so this isn't a problem
    for me. It may be for you.
- Cache dependencies on embedded resource files are actually set on
    the assemblies that contain the files.
- It doesn't support "directories" so if you use the
    HostingEnvironment to go directory browsing, you won't see the
    embedded files.
- There's some weirdness with IIS where you can't set the "default
    page" for a directory to be an embedded file.  IIS detects it's not
    there and pre-emptively returns a 404.
- Your site has to run in [High trust
    mode](http://msdn2.microsoft.com/en-us/library/system.web.aspnethostingpermissionlevel.aspx)
    for this to work. This is a requirement of the VirtualPathProvider
    framework.
- This is going to be a one-shot deal. I'm not going to be posting
    updates or actively supporting it or anything. Take it at your own
    risk, your mileage may vary, etc.
- The source bundle includes the source for the VirtualPathProvider,
    related attributes, support classes, a readme, and a demo web site
    illustrating the project in action. The compiled bundle is the
    compiled assembly, the XML API doc, the installer for the demo site,
    and a readme.
- It's totally free and open-source. Do whatcha like.

[Download EmbeddedResourcePathProvider Compiled
Package](https://github.com/tillig/EmbeddedResourcePathProvider/releases/download/v1.0.0/Paraesthesia.Web.Hosting.EmbeddedResourcePathProvider.zip)

[Download EmbeddedResourcePathProvider
Source](https://github.com/tillig/EmbeddedResourcePathProvider/archive/v1.0.0.zip)
