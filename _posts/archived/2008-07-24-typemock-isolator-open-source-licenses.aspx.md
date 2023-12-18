---
layout: post
title: "Typemock Isolator Open Source Licenses"
date: 2008-07-24 -0800
comments: true
disqus_identifier: 1423
tags: [dotnet,vs]
---
Just got word from the folks over at [Typemock](http://www.typemock.com)

- if you have an open source project and you want to use Typemock
Isolator, they're going to be coming out with a new (free) license type
that allows your open source project to use it. Here's the new licensing
structure I've seen:

- Commercial - $449 (same as today)
- Personal - $200 (will include one year maintenance)
- Open Source Project - Free
- 21-Day Trial - Free

And, of course, discounts for upgrades, etc., on the paid licenses.

This is huge. I've been wanting to add tests to
[CR_Documentor](http://cr-documentor.googlecode.com), but it's almost
impossible to do that because of the tight coupling
[DXCore](http://www.devexpress.com/Downloads/Visual_Studio_Add-in/DXCore/)
plugins have with the DXCore engine. For example, I'd love to be able to
create a fake language element and unit test the syntax generator... but
I don't want to have to write wrapper interfaces and services for
everything in DXCore that I interact with. Now I can!

Big side benefit - the folks who are unfamiliar with Isolator can see
how open source projects use it and see the benefits. Sweet!
