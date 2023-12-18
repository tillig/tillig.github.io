---
layout: post
title: "My Netflix/Comcast Conundrum"
date: 2014-02-21 -0800
comments: true
disqus_identifier: 1834
tags: [media]
---
Over the last six months, give or take, I've noticed that my Netflix
streaming performance over my Comcast internet has taken a dive.

If I stream a show during the day, I can get a full 1080P HD signal.
Watching through my PS3, I get [Super
HD](https://help.netflix.com/en/node/8731). It's awesome.

However, watching that same show once it hits "prime time" – between,
say, 7:30p and 10:30p – I get a maximum of 480SD.

[I saw this
article](http://davesblog.com/blog/2014/02/05/verizon-using-recent-net-neutrality-victory-to-wage-war-against-netflix/)
that went around about a fellow who caught Verizon supposedly doing some
traffic shaping around Amazon Web Services and it got me wondering if
Comcast was doing the same thing.

I called Comcast support and got the expected runaround. The internet
people sent me to the TV people (because you watch Netflix on your
TV?!); the TV people sent me to the home network support people (because
*no way* is it a Comcast issue), then the home network people said they
would transfer me to their dedicated Netflix support team...

...which transferred me to *actual Netflix support*. No affiliation with
Comcast at all.

Netflix support ran me through [the usual network troubleshooting
steps](https://help.netflix.com/en/node/85), which I'd already done and
basically amounts to "reboot everything and use a wired connection," all
of which I'd already done, and then we ended up with "call your ISP."
*That's how I got here in the first place.* Sigh.

I reached out this time to [@comcastcares on
Twitter](https://twitter.com/comcastcares) and had a much better result.
I got in touch with [a very helpful person,
@comcastcamille](https://twitter.com/comcastcamille), who did a few
diagnostics on their end and then got me in touch with their "executive
support" department.

The executive support department sent a tech to my house who replaced my
aging cable modem. That actually improved my speed tests – I used to
only occasionally make it to \~25Mbps down, but with the new modem I
consistently get between 25Mbps and 30Mbps. Unfortunately, that didn't
fix the Netflix issue, so I called back.

This time I got ahold of a network tech named Miguel who not only *spoke
very clearly* but also *knew what he was talking about*. A rare find in
tech support.

First we did a speed test on two different sites. My results:

- [speedtest.comcast.net](http://speedtest.comcast.net): 10ms ping,
    28.52Mbps down, 5.95Mbps up
- [www.speedtest.net](http://www.speedtest.net): 0ms ping, 28.67Mbps
    down, 5.90Mbps up

Looking good. On that same computer, I then tried streaming Netflix.
480SD. Lame.

Then he mentioned something I didn't consider: Amazon Prime is also
backed by AWS. Same computer, streamed an Amazon Prime video... full HD in
less than three seconds buffering.

For giggles, we tried streaming Netflix and running the speed test at
the same time and got similar results as the first speed test. I also
ran [the Net Neutrality speed test](http://netneutralitytest.com/) and
got great results.

Of course, [as mentioned on the Net Neutrality test
site](http://netneutralitytest.com/is_verizon_limiting_not_yet.html),
much of the Netflix traffic doesn't actually flow from AWS, but through
Open Connect peering agreements. [Ars Technica has a nice article about
how several providers are having
trouble](http://arstechnica.com/information-technology/2014/02/netflix-performance-on-verizon-and-comcast-has-been-dropping-for-months/)
keeping up with Netflix and it may not necessarily be intentional
traffic shaping so much as sheer volume.

In the end, Miguel convinced me that it may not be entirely a Comcast
problem. He also mentioned that he, himself, switched from Netflix to
Amazon Prime because the quality is so much better. Something to
consider.

Of course, [Google Fiber is now looking at
Portland](http://www.oregonlive.com/silicon-forest/index.ssf/2014/02/google_fiber_gigabit_portland.html),
so that may be a good alternative.

**For the record, I've never really had any problems with Comcast** the
way many people have. I admit I am possibly an exception. Other than the
phone runaround, which you often get with any type of service provider,
Comcast service has been reliable and good for me. Netflix aside, the TV
works, the phone works, the internet is getting good speed and is always
up... I can't complain. (Well, the prices do continue to go up, which
sucks, but that's only peripherally related to the service quality
discussion.) We tried Frontier, the primary local competitor, and I had
the experiences with Frontier that other people seem to report with
Comcast. Frontier (when I was with them) had outages constantly, pretty
much refused to help... and actually did things that required me to [reset
my router
periodically](/archive/2009/04/04/verizon-fios-router-auto-updating-and-configuration-problems.aspx)
and fully reconfigure the network.

But, you know, Google Fiber...
