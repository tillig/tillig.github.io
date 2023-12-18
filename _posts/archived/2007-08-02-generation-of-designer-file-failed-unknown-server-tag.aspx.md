---
layout: post
title: "Generation of Designer File Failed: Unknown Server Tag"
date: 2007-08-02 -0800
comments: true
disqus_identifier: 1245
tags: [aspnet,dotnet]
---
I was doing some experimentation with custom web server controls in
ASP.NET 2.0 so I created a quick [Web Application
Project](http://msdn2.microsoft.com/en-us/asp.net/aa336618.aspx) and
started throwing some controls in, using them on the page that gets put
in the app by default.  Unfortunately, I started getting the following
warning:

**Generation of designer file failed: Unknown server tag
'cc1:MyServerControlName'.**

For a minute, I thought maybe I had forgotten the `<%@ Register %>`
directive at the top of the page, but, no, there it was:

`<%@ Register Assembly="MyTestAssembly" Namespace="MyTestNamespace" TagPrefix="cc1" %>`

I struggled for this with some time, building and rebuilding, searching
and not really finding much on the web at large, and then I tried
something that worked:

**If the page and the custom control are in the same assembly, remove
the "Assembly" portion of the directive.**  For some reason, the
designer just doesn't understand it if you specify the assembly you're
tasked to build.  I'm not sure why.  So the directive becomes:

`<%@ Register Namespace="MyTestNamespace" TagPrefix="cc1" %>`

Once I did that, everything worked great.  YMMV.

**UPDATE:** If you're using master pages and the control in question is
inside a Content control, you may still see weirdness about unrecognized
server tags.  In that case, add the tag prefix registration to
web.config, again omitting the assembly:

```xml
<?xml version="1.0"?>
<configuration>
  <system.web>
    <pages>
      <controls>
        <add tagPrefix="cc1" namespace="MyTestNamespace"/>
      </controls>
    </pages>
  </system.web>
</configuration>
```

One thing I noticed was that this seems to be... maybe a little flakey.
Depending on the circumstances, you may get a page that says your
control tag is unrecognized at runtime.  That will require you add the
"assembly" bit to the tag prefix registration in web.config... but that
will cause you to have trouble in design time because the designer file
won't be generated properly.  Erg.
