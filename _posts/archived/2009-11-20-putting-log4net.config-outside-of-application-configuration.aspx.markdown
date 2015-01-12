---
layout: post
title: "Putting log4net.config Outside of Application Configuration"
date: 2009-11-20 -0800
comments: true
disqus_identifier: 1589
tags: [net,Code Snippets]
---
I use [log4net](http://logging.apache.org/log4net/) for logging in
various applications, but every time I start a new app I forget this and
it never quite comes up in Google for me, so here we go.

Most of the examples on the log4net site showing configuration shows it
right in the App.config/Web.config file for the application. That's a
painful way to go if you have, say, a single log4net.config that you
want used in several projects or if you otherwise want to stick
log4net.config somewhere else.

The magic bit that at least I can't easily find and always forget is:

**If you add an appSettings key called "log4net.Config" you can put an
app-relative path to an external log4net.config file in there and
everything will automatically configure itself using that.**

It looks like this:

    <?xml version="1.0"?>
    <configuration>
      <appSettings>
        <add key="log4net.Config" value="log4net.config" />
      </appSettings>
    </configuration>

That example puts the log4net.config file right in the root of the
application. You could specify "config/log4net.config" to put it in a
"config" subfolder, too, for example. You don't even have to call the
`XmlConfigurator.Configure` method or mark your assembly with an
`XmlConfiguratorAttribute` or anything. Magic happens. It just works.

This is specifically for the default "log4net-default-repository"
repository. If you're doing something fancy with different repositories,
YMMV. I've not tried that.

For folks interested in spelunking, this is a hardcoded setting that
takes effect in the private
`log4net.Core.DefaultRepositorySelector.ConfigureRepository(Assembly, ILoggerRepository)`
method which gets called from the public
`log4net.Core.DefaultRepositorySelector.CreateRepository(Assembly, Type, String, Boolean)`
method.

