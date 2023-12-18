---
layout: post
title: "XFCE Add/Remove Programs and Synaptic Package Manager Fail"
date: 2008-11-17 -0800
comments: true
disqus_identifier: 1466
tags: [GeekSpeak]
---
[As mentioned in an earlier
post](/archive/2008/11/14/running-ubuntu-on-the-xo-laptop.aspx), I got
my XO laptop up and running on Ubuntu so I can do a little more useful
work with it. (Firefox is a far-and-away superior web browser to the
built-in browser that comes with Sugar.) Of course, never satisfied, I
noticed there were a few simple applications I'd like to have on there
(like a calculator), so I went to install them.

I fired up the "Add/Remove" app in XFCE to see what apps were available.
It got to a stage where it said, "Building dependency tree..." and
disappeared. Tried a few more times and got the same result. I dropped
to the command line, ran `gnome-app-install` (it took a while to figure
out that's what the app was called) and saw there was a segmentation
fault occurring. Then I tried `apt-get` and got a message about a
"segmentation faulty tree." Very clear.

Doing an additional, oh, *hour of searching*, I found that this happens
when certain cache files get corrupted. The fix?

`sudo rm /var/cache/apt/*.bin`

Basically, **delete a set of cached files that the installation system
uses because they've gotten corrupted**. Re-running the `apt-get`
commands will then work, as will the "Add/Remove" program.

I had updated the OS and installed packages after getting things
working, so I know for a fact `apt-get` was correctly working. I'm not
really sure where/how these files got corrupted, but it's fixed now.

**Before I get off on a tiny rant, let me be clear: I started my career
on a LAMP stack.** I used to be a huge Linux guy, loved me some Perl,
and lived life on the FOSS side. I still like Perl, though I haven't
written any for a few years. It's been a while since I've been in that
world so it's taking a little getting used to getting back in. I've been
there, and I appreciate what's available.

That said, **this, right here, is precisely why Linux will never
overtake Windows or MacOS on consumer desktops**. There is *precisely
zero chance* that any member of my family would have had the time,
patience, or wherewithal to figure out what the name of the "Add/Remove"
app is, run it at the command line, figure out that it's just a wrapper
for `apt-get`, run *that* from a command line, and then figure out what
the cryptic "segmentation faulty tree" error message meant. And my
family is chock full of smart folks. They're just not computer geeks,
and investing the time to get into it at this level isn't something
they're interested in doing. They shouldn't have to be.

Windows and MacOS definitely have their problems. Windows, sure, maybe
more so than MacOS. That said, **I have never once had an
inexplicable failure in Windows on something so critically low-level as
the installation system**, and any time there is a problem, there's a
single, central event log I can go look at to see what happened. Even if
it doesn't tell me exactly what happened, it's at least got enough
information that if I literally copy and paste the error into Google,
I'll come out with a pretty good chance of getting the answer in the
first few hits. Blue Screen of Death? Sure, I've had my fill. Weird
glitches? Absolutely. Usually, though, it's because I'm installing and
uninstalling all nature of things, combined with the fact that I'm a
developer, so I'm always tweaking and changing and updating and doing
all sorts of unconventional stuff - unlike the standard user.

Anyway, rant over. I'll probably disable comments on this one because
I'm really not interested in getting into a religious OS war here; I
just needed to vent my frustrations in getting what I feel should be a
simple thing up and running. **I'm excited to get back into the Linux
world and to have the XO as an excuse to mess around with it.** We'll
see how the journey continues.
