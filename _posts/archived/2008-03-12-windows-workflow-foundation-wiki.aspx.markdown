---
layout: post
title: "Windows Workflow Foundation Wiki"
date: 2008-03-12 -0800
comments: true
disqus_identifier: 1356
tags: [.NET]
---
While working on some Windows Workflow projects I was having some
trouble getting
[ExternalDataExchangeServices](http://msdn2.microsoft.com/en-us/library/system.workflow.activities.externaldataexchangeservice.aspx)
to raise events. In searching for an answer, I came across [this
wiki](http://wiki.windowsworkflowfoundation.eu) that has the beginnings
of some good material. I think the Windows Workflow community might want
to contribute to efforts like this because, frankly, WF can be hard.

Incidentally, the reason my events weren't getting raised was [found
right on the
wiki](http://wiki.windowsworkflowfoundation.eu/default.aspx/WF/EventDeliveryFailedException.html):
I was raising an event from a service where the event arguments were
serializable but the sender was not. Everything has to be marked
[Serializable], even the sender. Sounds obvious now, but let me tell you
what a pain that was to try and track down.

