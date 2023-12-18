---
layout: post
title: "CR_Documentor 2.5.0.0 Released"
date: 2010-09-17 -0800
comments: true
disqus_identifier: 1666
tags: [downloads,vs,coderush]
---
It's been a while in the making, but [the new version of
CR_Documentor](http://cr-documentor.googlecode.com) is out.

It took a while because I did two pretty major updates to it.

First, I totally overhauled the syntax preview generation so each
preview style (NDoc or Sandcastle) uses the same syntax preview engine.
As part of that, I added a bunch more testing and support for complex
syntax like multiple type parameters with multiple type constraints per
parameter. What? What does that mean? It means you can see stuff like
this in your preview:

![]({{ site.url }}/images/20100917csharptypeparam.png)

And, of course, it works in VB, too (which, based on the way Sandcastle
does it, actually all ends up on one line...):

![]({{ site.url }}/images/20100917vbtypeparams.png)

The other thing I did was add support for serving images and other
files, so now when you look at the preview for a class and see all the
members listed, you see the associated icons, too. Not a huge deal, but
it does make the preview more authentic.

![]({{ site.url }}/images/20100917icons.png)

Hopefully that adds to you documentation preview enjoyment.

As always, it's free. [Go get it!](http://cr-documentor.googlecode.com)
