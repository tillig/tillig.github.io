---
layout: post
title: "VerificationException During Coverage? Check Your Security Attributes"
date: 2010-06-04 -0800
comments: true
disqus_identifier: 1647
tags: [net]
---
Ran into this yesterday and took a little bit to figure out:

**I can run unit tests through NUnit or TestDriven.NET just fine... but
if I run those same tests
through**[**NCover**](http://www.ncover.com)**, I get a
System.Security.VerificationException - "Operation could destabilize the
runtime."**

I searched around and found that the exception comes up basically when
the JIT can't verify type safety of an assembly or when it tries to run
something in medium trust that should be running in full trust. I also
found [another person who ran into something
similar](http://www.thebooleanfrog.com/post/MSTest-Code-Coverage-and-VerifyException.aspx).

Turns out **I had marked my assembly with
AllowPartiallyTrustedCallersAttribute** (for various reasons I won't get
into) and that was causing problems when NCover tried to instrument it.
Removing the attribute fixed the issue and I could get coverage running.

Long term that's probably not the best solution and I need to learn more
about the new .NET 4 security model to figure out what really needs to
happen, but if you're seeing a VerificationException when you run tests
under coverage but you don't see that exception when you run without
coverage... **check your security attributes**.

