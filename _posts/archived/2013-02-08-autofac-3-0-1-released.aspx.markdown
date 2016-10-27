---
layout: post
title: "Autofac 3.0.1 Released"
date: 2013-02-08 -0800
comments: true
disqus_identifier: 1809
tags: [autofac,net]
---
We had to roll out [a minor
feature](https://code.google.com/p/autofac/issues/detail?id=397)
introduced in 3.0.0 because it was causing a memory leak. If you're
running a long-lived app (Windows service, web site) you'll want this.

[Only the core Autofac package](https://nuget.org/packages/Autofac) was
updated; the rest remained. Assembly versions didn't change.

