---
layout: post
title: "Isolator v7 is Out, and It's Awesome"
date: 2012-03-13 -0800
comments: true
disqus_identifier: 1773
tags: [net]
---
[Typemock has released Isolator
v7](http://www.plimus.com/jsp/redirect.jsp?contractId=1655929&referrer=tillig),
and this is pretty much the release you've been waiting for.

Let's ignore the **visual test coverage**, the **test autocompletion**,
or even the **automated test runner** that runs your tests in the
background so you instantly know when you write something that breaks a
test. That stuff all rocks and you'll love it.

**This is the version that lets you run tests against different versions
of Isolator without having to uninstall/reinstall different versions.**
A long-running issue, you've previously always had to build your tests
and run your tests against the exact same version of Isolator. Not a
huge deal if it was a product you could check in alongside your code...
but you have to install it and you can only have one version installed
at a time. No longer! They've finally fixed my \#1 complaint and *I am
stoked*.

Oh, and they added **mocking for the filesystem (System.IO.File) and
environment (System.Environment)**. *Nice*.

[Go check it
out.](http://www.plimus.com/jsp/redirect.jsp?contractId=1655929&referrer=tillig)

