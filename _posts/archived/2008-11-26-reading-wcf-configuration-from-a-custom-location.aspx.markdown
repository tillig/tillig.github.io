---
layout: post
title: "Reading WCF Configuration from a Custom Location"
date: 2008-11-26 -0800
comments: true
disqus_identifier: 1469
tags: [Web Development,net]
---
Came across an issue today where we want to be able to read WCF service
and client configuration from a custom location. That's actually more
difficult than you'd think.

By default, WCF configuration is stored in your app.config (or
web.config) file [in the \<system.serviceModel\>
section](http://msdn.microsoft.com/en-us/library/ms731354.aspx). When
you create a client (like with
[ChannelFactory\<T\>](http://msdn.microsoft.com/en-us/library/ms576132.aspx))
or [a service
host](http://msdn.microsoft.com/en-us/library/system.servicemodel.servicehost.aspx),
the application configuration file gets read, the contents get parsed
into the appropriate strong types, and "magic happens" - the appropriate
object is created.

In our situation, we wanted to do exactly that, but in a Powershell
script... and that's a problem, because the only way we could get WCF to
see the configuration was to actually create a Powershell.exe.config
file in the Powershell installation directory, run the script, and then
remove the configuration. Not so great. We needed the ability to say,
"Hey, WCF, use the configuration file that we explicitly specify."

That, as I said, is a little more difficult than you'd think.

A lot of searching led me to two articles:

-   For service hosting, "[Custom Config File for a WCF Service Hosted
    in
    IIS](http://blogs.msdn.com/dotnetinterop/archive/2008/09/22/custom-service-config-file-for-a-wcf-service-hosted-in-iis.aspx)."
-   For clients, a forum thread called "[Config Hosting Multiple WCF
    Services in One NT
    Service](http://social.msdn.microsoft.com/forums/en-US/wcf/thread/f33e620a-e332-4fd4-ae21-88c750437355/)."

I agree, the titles don't necessarily sound like they'd help much, but
they do. They even include source for how to do this so you can see what
I'm talking about. That said, I'll summarize the steps here.

For service hosting, what it boils down to is:

-   Create a custom service host class that derives from
    System.ServiceModel.ServiceHost.
-   Override [the protected ApplyConfiguration
    method](http://msdn.microsoft.com/en-us/library/system.servicemodel.servicehostbase.applyconfiguration.aspx).
    In the override, load your custom configuration file, find the
    [System.ServiceModel.Configuration.ServiceElement](http://msdn.microsoft.com/en-us/library/system.servicemodel.configuration.serviceelement.aspx)
    corresponding to the service you want to host, and call
    [LoadConfigurationSection](http://msdn.microsoft.com/en-us/library/system.servicemodel.servicehostbase.loadconfigurationsection.aspx)
    on it.

For clients, it's slightly more work:

-   Create a custom class deriving from
    [ChannelFactory\<T\>](http://msdn.microsoft.com/en-us/library/ms576132.aspx).
-   Override [the protected CreateDescription
    method](http://msdn.microsoft.com/en-us/library/ms575267.aspx). In
    the override, you need to...
    -   Call base.CreateDescription().
    -   Read in your custom configuration.
    -   Create a custom
        [ServiceEndpoint](http://msdn.microsoft.com/en-us/library/system.servicemodel.description.serviceendpoint.aspx)
        based on your configuration. Don't forget the bindings,
        behaviors, etc. (That's what makes this hard.)
    -   Return that custom ServiceEndpoint.

Once you do that, you're set - you can create a standalone XML
configuration file with the \<system.serviceModel\> section and point
WCF at that rather than having to store the configuration in the default
app.config/web.config. You are limited to using your custom service host
and client classes, but then, if you're getting into things this deep
you're probably not afraid of getting your hands dirty.

Again, both of those articles contain full source to the solutions so
you can see how it works. Check 'em out.

