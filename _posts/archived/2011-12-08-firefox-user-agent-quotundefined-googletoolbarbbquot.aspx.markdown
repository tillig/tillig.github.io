---
layout: post
title: "Firefox User Agent &quot;undefined GoogleToolbarBB&quot;"
date: 2011-12-08 -0800
comments: true
disqus_identifier: 1756
tags: [Web Development,GeekSpeak]
---
At some random point today, I started going to various web sites and
they seemed to be falling back to basic views without anything dynamic
going on. For example, in GMail, I saw "Some important features may not
work in this version of your browser, so you have been redirected to the
Basic HTML version. Upgrade to a modern browser, such as Google Chrome."

Weird, because it was just working a second ago.

Realizing it was not properly detecting my browser, at first I thought
GMail just didn't support Firefox 8, then I thought, "No, that's silly,
something else must be up. Let me check my user agent string."

So, really quick I hit
[whatsmyuseragent.com](http://whatsmyuseragent.com/) and my user agent
string was showing as

`undefined GoogleToolbarBB`

WTF?!

A quick venture into **about:config** in Firefox and I saw that the
**general.useragent.override** preference was set to exactly that -
`undefined GoogleToolbarBB`.

**I reset that to default (empty) and now everything works again.**

I have no idea when (or why) that happened, but if you see the same
thing, that's how you fix it.

**Note:** [Seems I'm not the first person to see
this](http://support.mozilla.com/en-US/questions/900917).

