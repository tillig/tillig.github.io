---
layout: post
title: "Autofac FAQ: How to Work With and Troubleshoot Per-Request Lifetime Scopes"
date: 2014-08-01 -0800
comments: true
disqus_identifier: 1847
tags: [net]
---
One of the most frequent StackOverflow questions we see for Autofac
involves some confusion over how to deal with components in applications
like MVC and Web API that support per-request dependencies.

To help folks out, [I wrote up a fairly comprehensive document on the
Autofac doc site addressing the various questions around per-request
dependencies](http://autofac.readthedocs.org/en/latest/faq/per-request-scope.html).

We’re still working on porting over the [wiki
content](https://github.com/autofac/Autofac/wiki) into the [doc
site](http://autofac.readthedocs.org/). While that is going on, things
are a little “split” between the two sites. If the content is on the doc
site, go for that over the wiki. The doc site has content that’s a
little more robust and detailed than the wiki had (which is part of the
desire to move to the doc site).

