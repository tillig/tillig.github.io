---
layout: post
title: "MIX07 Day 1 Keynote - Ray Ozzie, Scott Guthrie, and Cross-Platform Debugging"
date: 2007-04-30 -0800
comments: true
disqus_identifier: 1189
tags: [conferences,aspnet,dotnet]
---
Ray Ozzie opened the keynotes today and gave a general intro to
[MIX07](http://visitmix.com). This was a pretty general overview and
focused a lot on the release of
[Silverlight](http://www.microsoft.com/silverlight/), Microsoft's Flash
competitor. It was an interesting talk, but was mostly benign.

 After that, Scott Guthrie came up and that's when the really good stuff
started. Lots of great announcements:

- Silverlight is out, released for download just a little bit ago.
- Silverlight comes with a cross-platform .NET framework that runs in
    the browser. With that comes a lot of interesting things:
  - Initial support is for Firefox, IE, and Safari. Yes, *it runs on
        Mac.*
  - You can now write client-side code on any Silverlight-enabled
        browser in any .NET language you like.
  - Client-side code in .NET has HTML DOM access including all of
        the browser components (status bar, etc.) and runs thousands of
        times faster than JavaScript.
  - There are robust data services including LINQ and caching
        built-in.

- There's a new service called [Silverlight
    Streaming](http://silverlight.live.com/) that lets you upload your
    Silverlight application and assets, up to 4GB, and Microsoft will
    host it *for free*. That's a huge bandwidth-saver for folks wanting
    to use Silverlight to stream video, etc.
- New Visual Studio (Orcas) feature - **Core CLR Remote Cross-Platform
    Debugging**. You can runtime debug a Silverlight application
    executing in a browser on another machine, including remote
    debugging to a Safari instance on a Mac. This is *huge*. Guthrie
    demonstrated one of these sessions, intercepting events and changing
    values in the debug session on the fly and those values get
    real-time updated in the target session. Very, very cool.
- Silverlight projects seem to work like other Visual Studio projects,
    including the ability to "Add Web Reference" and have your
    Silverlight applications call web services.
- If you have a web application project in Visual Studio, you can put
    that in the same solution as your Silverlight app and then select
    "Add Silverlight Link" to your web application. When you build your
    web app, the Silverlight app automatically rebuilds and deploys.
- The dynamic language support in .NET is growing. They've got support
    for Python and JavaScript and are adding official support for Ruby
    via IronRuby. They'll be releasing that source just like IronPython.
- This dynamic language support has an additional meaning - you can
    write your Silverlight apps in any of those languages as well. And,
    again, they'll run cross-platform. *Huge.*
- It installs in like three seconds. The demo showed a user experience
    for someone coming to a Silverlight app and not having the plugin
    installed. From the point where the user clicks the "Install" link
    to the point where the app is running was about three seconds. It
    was super fast.
- After Summer 07 they'll be adding even better mobile support. It has
    pretty good support now (also demonstrated) but I guess they're
    adding more.

There seems to be a big focus on delivering video with Silverlight. Most
of the demos they showed involved integrating video. It does a lot more
than that, and I can envision a lot of cool XAML based apps I could
write, but there's a huge video push, going so far as having NetFlix
come in and demonstrate an application where you can watch movies
on-demand.

 The Silverlight community site is at
[http://www.silverlight.net](http://www.silverlight.net). Check it out.
