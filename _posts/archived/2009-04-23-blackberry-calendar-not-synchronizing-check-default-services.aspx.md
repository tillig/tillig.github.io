---
layout: post
title: "BlackBerry Calendar Not Synchronizing? Check Default Services"
date: 2009-04-23 -0800
comments: true
disqus_identifier: 1518
tags: [GeekSpeak]
---
I noticed this morning that my BlackBerry Curve, using the BlackBerry
Desktop Manager software, was not synchronizing my calendar. It'd sync
everything else, just not calendar. It worked before... what changed?

Well, I had installed a new theme, so I uninstalled that. No luck. I had
installed the new Facebook app to see if it would get me more into
Facebook, so I uninstalled that. Still no luck. I upgraded the
BlackBerry Desktop Manager software (which took like an hour to
download/install/reboot/re-setup). No luck. I ransacked my Outlook
calendar and archived all of the appointments up to about two months ago
that weren't relevant anymore (kept the recurrences, etc.). Still no
luck. Ran SCANOST and SCANPST on my Outlook profile. Nothing.

I was about to recreate my freaking Outlook profile (I've had sync
problems before due to corrupt profile) when I started searching through
the BlackBerry help site. As I was typing in my search for sync
problems, I noticed this item in the "What's New" section:

[**Default Calendar service is changed after installing Facebook for
BlackBerry
1.5**](http://www.blackberry.com/btsc/microsites/microsite.do?cmd=displayKC&docType=kc&externalId=KB18078&sliceId=1&docTypeID=DT_SUPPORTISSUE_1_1)

What, now? I had installed that... but I uninstalled it. Uninstalling it
doesn't fix it. You have to go into your "Options" on the BlackBerry
and, under "Advanced Options," look at "Default Services." *That
sonofabitch is set to Facebook*. Even if you told the Facebook app not
to integrate with your calendar. Even if you uninstalled the app.

Switch the default calendar service back to what it was. For me it's my
Verizon BlackBerry email address. Re-sync and everything works peachy
keen.

On a side note, ***fuck you, Facebook***. I didn't like you before, and
now ***I really, truly can't stand you***. The only reason I use
Facebook is because I have family and friends on there and I want to
keep up with what they're doing. I don't post, I don't add content
there, I don't participate in apps, I have Twitter update my status, and
that's that.

