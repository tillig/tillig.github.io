---
layout: post
title: "DateTime Calculation and Unit Tests"
date: 2013-09-24 -0800
comments: true
disqus_identifier: 1825
tags: [net]
---
I just had an interesting unit test failure I haven't seen before due to
DateTime calculation.

The code under test was roughly like this:

    public Lifetime GetTokenLifetime(int seconds)
    {
      return new Lifetime(DateTime.UtcNow, DateTime.UtcNow.AddSeconds(seconds));
    }

The unit test was also pretty straightforward:

    [Test]
    public GetTokenLifetime_ExpectedLifetime()
    {
      var provider = new Provider();
      var lifetime = provider.GetTokenLifetime(120);
      Assert.AreEqual(120, lifetime.Seconds);
    }

The test was intermittently failing... and the error pretty much
explained why:

    Expected: 120
    Actual: 120.0000063d

There was just a *tiny fraction of a second* happening between the first
`DateTime.UtcNow` call and the second `DateTime.UtcNow` call.

To fix it, I stored the DateTime in a local variable.

    public Lifetime GetTokenLifetime(int seconds)
    {
      var now = DateTime.UtcNow;
      return new Lifetime(now, now.AddSeconds(seconds));
    }

Something to keep in the back of your mind as you're working with
DateTime - or times in general. If you are setting up a date range based
on a fixed point, best to store that fixed point somewhere and reuse it.

