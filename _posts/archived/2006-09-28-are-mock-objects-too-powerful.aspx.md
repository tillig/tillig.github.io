---
layout: post
title: "Are Mock Objects Too Powerful?"
date: 2006-09-28 -0800
comments: true
disqus_identifier: 1079
tags: [net,testing]
---
![Playing with matches will get you
burned.](https://hyqi8g.dm2301.livefilestore.com/y2pUjRc1WbHs8-5OavEnwprobjwmR2-Xf6CH90Ni9bnVL1k2qjUw_raq-ES0FCc2Zls3gAU_WJqml9BY3XUc50nJLUvExcM3apEC3xSAL_hKik/20060928match.jpg?psid=1)Lately
at work we've been working towards test driven development and not just
"having a lot of tests." For pretty much anyone who has written unit
tests for anything with any complexity, you know that's a lot harder
than it sounds. You need to be able to test certain components in an
isolated fashion and the bits that you need to integrate with may not
actually be written yet.

 To get around this, you generally end up writing a lot of test and
helper classes to stub in the functionality your component interacts
with, but that's a heck of a lot of work. In some cases, you might have
to drop live configuration files into the system to get things to work
correctly, you might need to craft some dynamic logic into your test
classes... it's a big pain.

 Some folks choose to architect their components to be easier to test.
This usually implies there are more publicly exposed methods than you
might normally have so that certain internal properties can be checked
on, substituted in, or otherwise dealt with in a test environment. It
also means there are a lot more moving parts - interfaces for "plugging
in" components that wouldn't normally be there except for the need to
swap in at test time. We'll call that "designing for testability."

 Unfortunately, much of what I work on has the API as a deliverable.
Which is to say, I can't just have a load of exposed public methods
floating out there solely to support my tests. I can't "over-architect"
the usage of the components because part of the goal is to make the
components simple to use. Instead of designing for testability, we have
to test what's designed.

 The problem, then, is how to "plug in" or stub out things in testing to
isolate the component being tested? Enter mock object frameworks.

 Mock object frameworks allow you to do that sort of thing on the fly.
You can say "give me a mock data provider and whenever anyone queries it
for data, have it return this data set here." It's a really nice, simple
way of doing things that doesn't require you to bloat your design just
so you can test it.

 Okay, so that's your quick "mock objects" intro. The question I'm
leading to is: mock objects are very powerful. You can do a lot of stuff
with them. So much, that if you aren't really paying attention, you
could very well mock your way into invalid tests. The question on the
table, then, is "are mock objects too powerful?"

 This is actually an ongoing debate at work as we investigate different
mock object frameworks. If we end up with a site license for a fairly
powerful mock object framework, what's to stop an untrained developer
from misusing it and giving us a false sense of quality by writing
invalid tests?

 My view: it's a tool, like a screwdriver or a hammer. Or matches. If
you don't know what you're doing with the matches, you're going to get
burned. If you know what you're doing, matches can be very helpful. It
all comes down to education. People just need to be smart enough to know
when they're not smart enough to start using the tool and get educated
before picking it up and heading down that path. I don't think "people
might misuse it" is a convincing enough argument to not use the tool. I
might also consider that if it's worrisome to a particular team or
project, the folks overseeing that team or project need to pay attention
and ensure the right tools are being used by the right people for the
job.

 Besides, there are *so many other ways* the uninitiated can mess up
production code, somehow I think "using a mock object framework
improperly in testing" doesn't qualify on the top 10 threat list.
