---
layout: post
title: "Visual Studio .NET 2003 - Configuration Manager / Batch Build... Read Only?"
date: 2004-08-03 -0800
comments: true
disqus_identifier: 635
tags: [vs]
---
I had this weird problem for like two days in Visual Studio .NET 2003. I
would be working on a project and go to the Configuration Manager screen
to change some solution build properties... and I couldn't click
anything. I could change the "Active Solution Configuration," but I
couldn't change any of the settings.

 ![Configuration Manager No
Worky]({{ site.url }}/images/20040803configmgr.gif)

 I fought with this thing. I mean, fought with it. I reinstalled Visual
Studio - no luck. I took the computer home and uninstalled every add-in
I had... and that seemed to do the trick, but when I got it back to work
it stopped working.

 I Googled it. I searched everywhere. I asked everyone I could find.
Nobody had ever heard of this.

 Luckily we have Microsoft Premiere Support at work. I submitted the
question to them and after a couple of hours a guy called me. He told me
he had to call because he couldn't send this one through email, and he
was right.

 With some dual-monitor configurations, the Configuration Manager and
the Batch Build options dialogs stop working. If you switch back to
single-monitor mode, it works again. I tried it, and sure enough, it
worked.

 That's why it worked at home - one monitor - and why it stopped working
when I got back to work - dual monitors.

 After experimenting with it (thanks to [Scott
Hanselman](http://www.computerzen.com)) for a while it turns out the
problem is when the product is running on the second monitor (or, more
precisely, when the Config Manager or Batch Build dialog is on the
second monitor) and the second monitor is "above" or to the "left" of
the primary (so the second monitor is in a virtual "negative" space).
You can drag the dialog onto your primary monitor and it *will work*. It
will also work fine if the second monitor is "below" or to the "right"
of the primary monitor - so everything is always in a "positive" space.
Weird, eh?

 (The easy solution if you're having problems is to drag the
Configuration Manager or Batch Build dialog box onto the primary monitor
then manipulate the properties there. It doesn't matter where VS.NET
itself is running, just where the Configuration Manager or Batch Build
dialog box is physically located at the time.)

 They didn't have a patch for it, but the guy did tell me it is a
product issue. Hopefully they'll have it fixed in the next version.
