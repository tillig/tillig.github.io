---
layout: post
title: "CR_Documentor 2.5.0.0 Released"
date: 2010-09-17 -0800
comments: true
disqus_identifier: 1666
tags: [downloads,vs,coderush]
---
It's been a while in the making, but [the new version of
CR\_Documentor](http://cr-documentor.googlecode.com) is out.

It took a while because I did two pretty major updates to it.

First, I totally overhauled the syntax preview generation so each
preview style (NDoc or Sandcastle) uses the same syntax preview engine.
As part of that, I added a bunch more testing and support for complex
syntax like multiple type parameters with multiple type constraints per
parameter. What? What does that mean? It means you can see stuff like
this in your preview:

![](https://hyqi8g.blu.livefilestore.com/y2pSpjGUvEpOYkXbEkxgCRdz5Dc3PwGYKsNvRxCZkYVssmftVOYnVdQ7Vdy8Tc40ADE1EMJKpj-CrKmIUjKsiUsJAwdEVBnedRnH7pCxjzT_Ws/20100917csharptypeparam.png?psid=1)

And, of course, it works in VB, too (which, based on the way Sandcastle
does it, actually all ends up on one line...):

![](https://hyqi8g.bl3301.livefilestore.com/y2peIbVOAQoD-DWM3Y_Rw_eZ7GInvK63UGn2FK6ZyJGgL6R5weHSGKf4mX3BJopaSYAsnXSaSKNQEEJ9Zw-7Q4fHJmhH2-jFX9TIFyBzZLWFCA/20100917vbtypeparams.png?psid=1)

The other thing I did was add support for serving images and other
files, so now when you look at the preview for a class and see all the
members listed, you see the associated icons, too. Not a huge deal, but
it does make the preview more authentic.

![](https://hyqi8g.bl3302.livefilestore.com/y2pLGANudgJELY-HgCdEcMy6wrU1syN4gr11zVXZjYoeJWtgUkCTwUzgchNXjDfNiAN2zNpE_XKg81y-u0NzymHBOz1TBZH1rKl7faU3DDp0YI/20100917icons.png?psid=1)

Hopefully that adds to you documentation preview enjoyment.

As always, it's free. [Go get it!](http://cr-documentor.googlecode.com)

