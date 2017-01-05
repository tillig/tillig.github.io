---
layout: post
title: "EmbeddedPageHandlerFactory - Binary-Only ASP.NET 1.1"
date: 2007-05-31 -0800
comments: true
disqus_identifier: 1209
tags: [downloads,aspnet,net]
---
I'm constantly looking for ways to make deployment of ASP.NET
applications easier. One of the things that makes it difficult is the
ASPX markup files that have to be deployed with the app. Wouldn't it be
nice not to have those? Wouldn't it be nice to be able to drop the
application .dll into the bin folder, pop in your web.config file, and
let 'er rip?

 Since I work primarily in ASP.NET 1.1 right now, the solution I came up
with is for ASP.NET 1.1. [**There is a different/better way to do this
in ASP.NET
2.0**](http://msdn2.microsoft.com/en-us/library/system.web.hosting.virtualpathprovider.aspx)
and I will be writing/posting that as I get time.

**UPDATE:** [The ASP.NET 2.0 version is here - based on
System.Web.Hosting.VirtualPathProvider.](http://www.paraesthesia.com/archive/2007/07/13/embeddedresourcepathprovider-binary-only-asp.net-2.0.aspx)

 The idea: Embed your ASPX files in your ASP.NET application assembly.
To deploy the app, drop your .dll in the bin folder and set up your
web.config file. At runtime, embedded ASPX pages get extracted to a
temporary location and get served up from there. When the app shuts
down, the temporary fileset gets cleaned up. Easy deployment, easy
upgrades.

 The solution: An HttpModule that does exactly that. You set your
application web.config file to use the EmbeddedPageHandlerFactory and in
your ASP.NET project set your ASPX files from "Content" to "Embedded
Resource." At application startup, the module will go through the
assemblies you registered as containing pages and extracts the ASPX to a
temporary location. A replacement for the standard PageHandlerFactory
redirects requests to the temporary location so pages get served up just
like usual. When the application shuts down, the temporary files get
cleaned up.

 Here's a snippet of the relevant bits in web.config:

    <?xml version="1.0" encoding="utf-8" ?>
    <configuration>
      <configSections>
        <section
          name="embeddedPageAssemblies"
          type="System.Configuration.DictionarySectionHandler, System, Version=1.0.5000.0, Culture=neutral, PublicKeyToken=b77a5c561934e089, Custom=null"
          />
      </configSections>
      <embeddedPageAssemblies>
        <add
          key="Paraesthesia.EmbeddedPageHandlerFactory.Demo"
          value="Paraesthesia.EmbeddedPageHandlerFactory.Demo" />
      </embeddedPageAssemblies>
      <system.web>
        <httpModules>
          <add
            name="EmbeddedPageHandlerFactory"
            type="Paraesthesia.Web.UI.EmbeddedPageHandlerFactory, Paraesthesia.EmbeddedPageHandlerFactory" />
        </httpModules>
        <httpHandlers>
          <add
            verb="*"
            path="*.aspx"
            type="Paraesthesia.Web.UI.EmbeddedPageHandlerFactory, Paraesthesia.EmbeddedPageHandlerFactory" />
        </httpHandlers>
      </system.web>
      </appSettings>
        <add
          key="Paraesthesia.Web.UI.EmbeddedPageHandlerFactory.AllowFileSystemPages"
          value="false" />
      <appSettings>
    </configuration>

Key points:
-   The `embeddedPageAssemblies` section is how you tell the module
    which assemblies have ASPX in them. The "key" is the name of the
    assembly; the "value" is the root namespace in the assembly.
-   The `httpModules` section is where you register the module portion
    of the solution. This is how the pages get extracted at app startup.
-   The `httpHandlers` section is where you tell all requests for ASPX
    files to go through the EmbeddedPageHandlerFactory and get served up
    from the temporary location.
-   The `appSettings` has an optional key for AllowFileSystemPages.
    Setting this to true will allow you to "override" ASPX by putting a
    file of the same path/name in the ASP.NET application file system.
    If the file exists in the app, it will be served from there. If not,
    it falls back to the temporary filesystem.

In your web project, change your ASPX pages in your application to be
"Embedded Resource" rather than "Content." Embedded resources get named
based on namespace and file path. For example, if you have an assembly
called "MyApp.Web" where the default namespace is "MyApp.Web" and you
have a file at "\~/Admin/Default.aspx" then when it gets embedded as a
resource, it'll be called "MyApp.Web.Admin.Default.aspx" - notice the
namespace, then the path, then the file, all delimited by periods.

 What the module does is look for resources that end with ".aspx" and,
if it finds them, removes the namespace from the front (as specified in
web.config) and substitutes out / for . to convert back to a path. In
this example, "MyApp.Web.Admin.Default.aspx" would become
"Admin.Default.aspx" and then "Admin/Default.aspx."

 Once the mapping is done, a temporary location is generated and the
page is extracted to that location with the full relative path intact.
As requests come in, the EmbeddedPageHandlerFactory will look at the
request, map it into the temporary location, and serve the temporary
file.

 Using the `appSettings` key, you can specify that you'd like to allow
pages in the actual ASP.NET filesystem to override the extracted pages.
In this case, the actual ASP.NET filesystem would be searched for
"Admin/Default.aspx" and if it is found, serve it from there just like a
standard ASP.NET application. If it isn't found, then it'll fall back to
look in the temporary location.

 Caveats:
-   This won't work for sites that rely on file system security. I
    primarily work with forms authentication, so this isn't a problem
    for me. It may be for you.
-   This is definitely not the way you'd want to do this for .NET 2.0.
    This is really meant for .NET 1.1.
-   It only works for ASPX. The ASCX load process is different and
    doesn't pass through a handler factory like pages. [The .NET 2.0
    mechanism](http://msdn2.microsoft.com/en-us/library/system.web.hosting.virtualpathprovider.aspx)
    should work for any files, not just ASPX.
-   This is going to be a one-shot deal. I'm not going to be posting
    updates or actively supporting it or anything. Take it at your own
    risk, your mileage may vary, etc.
-   The source bundle includes the source for the
    EmbeddedPageHandlerFactory as well as a demo web application and
    unit tests.
-   I wrote the unit tests using [TypeMock](http://www.typemock.com) so
    you'll need to go get that if you want to build/run the tests.
-   It's totally free and open-source. Do whatcha like.

[Download EmbeddedPageHandlerFactory Compiled
Assembly](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!45413&authkey=!ABecYtDsPb2Lf48&ithint=file%2czip)
 [Download EmbeddedPageHandlerFactory
Source](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!45412&authkey=!AMY3tJyWNqJVjnE&ithint=file%2czip)
