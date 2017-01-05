---
layout: post
title: "&quot;App-Domain could not be created&quot; - Check Your ISAPI Filters"
date: 2007-09-25 -0800
comments: true
disqus_identifier: 1272
tags: [Web Development,net]
---
Ran into an issue this morning where I was working on an IIS instance
that just could not for the life of it create an AppDomain to run any
ASP.NET applications.

> Failed to execute request because the App-Domain could not be created.
> Error: 0x80131522

The server was running a mixture of ASP.NET 1.1 and 2.0 applications and
should have been working just fine.  I looked at the application setup,
the app pool setup, the application mappings... everything was in order.

I created a second IIS server instance, new app pools, and new
applications pointed at the same code as the first server instance -
everything worked.  I compared app pool settings - the same.  Compared
application settings - the same.  The file permissions were the same
(pointed to the same physical files).  The users things were executing
as were the same, but it worked.

I even went so far as to uninstall and re-install ASP.NET 1.1 and 2.0
with the server.  No change.

After investigating, you know what the difference was?

The troubled server instance had an ISAPI filter in it - [specifically
one to force a certain version of the .NET CLR to load
up](http://www.hanselman.com/blog/SOLVEDHowToForceIISToLoadACertainVersionOfTheNETCLR.aspx)
- and the working server instance did not.  After removing the ISAPI
filter in the troubled server instance, everything suddenly started
working again.  Problem solved.

There didn't seem to be enough overt logging to determine exactly why
this was causing a problem.  Since the filter was forcing .NET 1.1 to
load, I hypothesize that having .NET 1.1 loaded into the server process
was trashing things as soon as .NET 2.0 tried to start up.  I'm not sure
why that would be exactly, but I'm guessing somewhere in the bowels of
the system there was a BadImageFormatException (1.1 trying to
read/instantiate 2.0 stuff) and ended up resulting in no AppDomains for
anyone.  I'd have investigated cause further but for various reasons
reaching a verifiable solution was very time-sensitive and once we'd
resolved the issue, determining root causes beyond the presence of the
ISAPI filter was not pursued.

Long story short - if you're having trouble not being able to create an
AppDomain in ASP.NET, don't forget to check your ISAPI filters.

