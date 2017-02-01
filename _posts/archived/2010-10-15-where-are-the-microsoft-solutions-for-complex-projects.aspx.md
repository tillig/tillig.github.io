---
layout: post
title: "Where Are the Microsoft Solutions for Complex Projects?"
date: 2010-10-15 -0800
comments: true
disqus_identifier: 1675
tags: [net,process]
---
I've spent the majority of my recent career working on fairly complex
systems. Integrated services across disparate business units with
different data centers. Full multitenancy for SaaS hosted solutions
(remember all that Ray Ozzie hubbub back around MIX 07?)... that can
also be deployed on-premise for larger customers who want to customize
more than the configurable abilities in the hosted environment allow.
It's not The Most Complex System Ever, but it's not what I'd consider
your entry-level project, either.

The thing is, a lot of time gets spent doing things like...  Trying to
pull configuration out of XML files and into a central service-based
configuration store. Localizing for multitenancy where there's not just
culture fallback to consider but also default values and per-tenant
overrides (sort of content management-ish). Correlating logs that run
from the end user all the way through to the [disparate business unit]
back end systems and back to the user.

**Where are all the tools that are supposed to support larger apps and
more complex use cases like that?**

Based on my personal views and having no scientific data whatsoever to
back it up, here's what it feels like is going on:

[![Where I think time is getting spent (click to
embiggen)](https://hyqi8g.bl3301.livefilestore.com/y2p4Tg-cbaUSTZFFKOG-AhV6i54Couog5NAyOYFzoGKQ_WiwSVW6ATiM3_8IAXNt0X_J2apoplUqRn2-NZs3ObkobJtuSC63jbWqQil45wEE_k/20101015bellcurvesmu.gif?psid=1 "Where I think time is getting spent (click to embiggen)")](https://hyqi8g.bl3301.livefilestore.com/y2pIixUfyDCj6e_HVRHAGTJ99f30MW9I55Lo1Yn8Rbr3i0M6ggM1jOSz74marg5Fv2X-wIiezfn4GUAHXDD62xX7Ix-UGOMH52YemlBR3U0t0c/20101015bellcurvelg.gif?psid=1)

There seems to be a ton of stuff trying to get people "just starting
out" up to speed... but once you get past a web site that uses LINQ to
SQL or whatever to display products out of the Northwind database,
where's my tooling? Where are the solutions to the distributed
configuration problem? Where's the solution to getting resources out of
.resx files? Where's all the multitenancy support? How about even the
ability to change the web.config without restarting the application?

**I just feel like I spend a ton of time on infrastructure**, something
we all know Product Management doesn't want to pay for because it's not
something you can see or click on, and not much time on more visible
features. And [I've mentioned stuff like this
before](/archive/2009/04/21/challenges-of-multi-tenant-enterprise-asp.net-applications.aspx).

Venting? Sure. But am I alone in wondering where this stuff is? I don't
think so.

