---
layout: post
title: "Thank Heaven (or Microsoft) for System Restore"
date: 2004-10-29 -0800
comments: true
disqus_identifier: 686
tags: [GeekSpeak]
---
Just like everyone has that "I forgot to back up and now my ass is in a
sling" story, lots of folks who have learned from those experiences have
at least one "My ass was in a sling but I had backups that saved the
day" story.
 
 That just happened to me.
 
 I was working on a product demo that required the installation and use
of the Loopback Network Adapter to ensure the demo wouldn't come up on
the local network, only my machine.
 
 So I installed it, did the demo work, and went home for the day.
Everything was peachy.
 
 Got in this morning, booted up, and none of my networking connections
worked - only the Loopback Adapter. I tried to disable it, but it
wouldn't disable. Everything was hosed. I tried several things,
including attempting to disable/re-enable all of my network connections
and removing the Loopback Adapter completely. Rebooted several times
over the course of that with no luck. And then...
 
 ...System Restore saved the day. There was a system checkpoint saved
from yesterday morning and once I restored to that point, everything was
back up and running, minus the stupid Loopback Adapter.
 
 Thank you, Microsoft, for bailing my ass out.
