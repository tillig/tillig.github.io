---
layout: post
title: "Xbox Live Blocked by Wireless Bridge"
date: 2011-11-14 -0800
comments: true
disqus_identifier: 1751
tags: [gaming,xbox,media]
---
I spent far more time than I'd like to admit in troubleshooting this
issue so I figured I'd at least blog it.

**Symptoms**: When you run the "network connection test" on the Xbox it
consistently succeeds. When you try to connect to Xbox Live, either to
sign in with your profile or do a "Recover Gamertag," it fails and tells
you to go run the network connection test.

Let me tell you how frustrating this behavior is. The connection test
says fine, but when you try to connect it says it can't - go run the
test?!

[My
network](/archive/2008/09/30/overview-of-my-media-center-solution.aspx)
is set up right now so I have my wireless router downstairs feeding a
wireless bridge (DAP-1522) upstairs in the game room. The Xbox is
connected through the bridge. Everything was working wonderfully until
around two weeks ago. Nothing changed on the network to my knowledge, no
configuration changes or devices added/removed. Just... magic. Things
are failing.

The first thing I did was disconnect the wired connection to the bridge
and connect using the Xbox onboard wireless adapter. Same symptoms, only
this time I could occasionally connect to Xbox Live if I tried signing
in five or six times in a row. Not a lot of progress, but progress.

I rebooted and reset every network device I own with no luck.

I contacted Xbox Support via email and they directed me to [this page
about troubleshooting connection
issues](http://support.xbox.com/en-us/xbox-live/troubleshoot/connection-issues/performance).
None of the items here helped, but it's understandable - there's no way
they could have guessed what was wrong.

The breakthrough came when I powered down the bridge and then connected
to Xbox Live via wireless. Instant success. Something about that
wireless bridge was interfering hardcore with the rest of the wireless
network.

**I ended up resetting the DAP-1522 bridge to factory defaults**, doing
a firmware upgrade (not sure if that was necessary, but there was a
minor-version update available, so I figured why not), and reconfiguring
the whole thing from scratch.

The Xbox is connected through the bridge once more, but now it signs in
correctly.

**This isn't the first time that DAP-1522 has given me grief.** When I
was using it as an access point rather than a bridge it also had a
couple of times where I had to reset it to factory defaults and start
over. Like running for an extended period of time causes some sort of
"buildup" that has to be flushed out. I may have to replace it with
something more reliable.
