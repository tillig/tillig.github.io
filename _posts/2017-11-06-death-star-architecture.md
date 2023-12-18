---
layout: post
title: "Death Star Architecture"
date: 2017-11-06 -0800
comments: true
tags: [architecture,process]
description: "What happens when the strangler pattern never gets finished? Welcome to the Death Star."
image: /images/20171106_deathstar_4.png
---

Today I want to talk about something I've seen in a few places that just frustrates me to no end: _the repeated failed strangler pattern_.

To make sure we're all on the same page: **The strangler pattern** is when you want to overhaul an existing system and you do so by wrapping it in a facade. You swap out components under the facade from old bits to new bits, eventually strangling the old system and removing the facade so only the new stuff is left. The idea is that doing this over time potentially has lower risk than rewriting an existing system from scratch.

There are a couple of articles on this pattern here:

- [StranglerApplication from Martin Fowler](https://www.martinfowler.com/bliki/StranglerApplication.html)
- [Strangler Pattern from Microsoft Azure Architecture](https://docs.microsoft.com/en-us/azure/architecture/patterns/strangler)

**In general, I think this is a decent pattern.** However, I take issue with the implication of this line from the Fowler article (emphasis mine):

> They aren't yet at the point where the old application is strangled - but they've delivered valuable functionality to the business that gives the team the credibility to go further. **And even if they stop now, they have a huge return on investment** - which is more than many cut-over rewrites achieve.

My challenge is around the notion that you can do a _partial strangler_ and that's an OK - or even good - thing.

My experience directly contradicts this. Let's take a hypothetical example:

Let's say you started out a long time ago, in a galaxy far, far away, with a simple string processing engine. It was long before SOAP or REST. It did what it needed to do, you sold it, and you got some customers up and running with it.

![String processing engine](/images/20171106_deathstar_1.png)

So far, so good. SOAP comes along, and XML is pretty awesome, so you decide you want to start moving away from arbitrary string-in, string-out and to something with more formal contracts. Cool! Strangler to the rescue. Except... you do still have some customers that won't really be able to update right away... you need to leave access to the original string processing engine in place. New folks can take the new interface, though, so that's good, right?

![XML messages wrapping the string processing engine](/images/20171106_deathstar_2.png)

Turns out the strangler to convert strings to XML wasn't _quite_ SOAP due to some custom extensions you needed to create to make it work with the string processing engine. You still really want some SOAP wrappers on this thing, though, so you can start decoupling things and iterate faster over individual services/features. Let's wrap the XML message handling with actual SOAP contracts that are _pretty close to_ but _not exactly like_ the XML messages.

Except... you sold the XML messaging to some customers and they can't really switch to the _slightly modified_ contracts for the services. And you really haven't pushed those original string processor customers to upgrade yet because they're threatening to leave if you create any breakages.

![SOAP services wrapping XML messages wrapping the string processing engine](/images/20171106_deathstar_3.png)

OK, _this time for reals_ - REST is a bit lighter weight and would lend itself better to some of the new prospective clients' needs. Getting some REST microservice support in there could really get things going, especially since most of the developers you're hiring now are more versed in REST and that's the direction your market is going.

(I bet you see where this is going...)

Except... now you have customers on all three previous layers: SOAP, XML messaging, and string messaging. Gotta keep access to all three of those things. _No breaking changes! Ever!_

![REST services wrapping SOAP services wrapping XML messages wrapping the string processing engine](/images/20171106_deathstar_4.png)

Does that look at all familiar?

![Seems like a bit of a design flaw...](/images/20171106_deathstar_5.jpg)

**This is why I call it "Death Star Architecture."** You're not _finishing_ the strangler, so instead of getting the benefit of the pattern, you're just adding layers to your system that all need to be maintained and tested.

![Finish your strangler!](/images/20171106_deathstar_6.jpg)

**Finish your strangler!** In the short term it may seem like you're getting benefits, but long term the unfinished work results in technical debt that will ultimately cause your destruction.
