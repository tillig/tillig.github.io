---
layout: post
title: "Template for Quick TypeMock Testing"
date: 2008-02-21 -0800
comments: true
disqus_identifier: 1353
tags: [Software / Downloads,net]
---
I use [Snippet Compiler](http://www.sliver.com/dotnet/SnippetCompiler/)
quite a bit for quick one-off testing to see if something will work.
Something I've been doing a lot lately is doing little quick checks to
see how you'd do certain things with [TypeMock
Isolator](http://www.typemock.com). Snippet Compiler basically starts
you out with a very thin framework for a console application and when
you hit the "Start" button, it builds and runs the app. (You could do
the same thing in Visual Studio, but Snippet Compiler is very
lightweight and is totally built for this sort of experimentation.)

To make my TypeMock experimentation easier, I created a template for a
basic console app that will launch a separate process with TypeMock
enabled and run the NUnit console test runner. The template starts you
out with an empty class and an empty test fixture, ready to populate
with tests. When you run the app, the NUnit console runner will execute
any test fixtures you put in the current assembly.

![Snippet Compiler showing the TypeMock
template.](https://jushww.dm1.livefilestore.com/y2p2QlwHr4FWlMonwn9p35hkDLHYErJvwM5BEXfqkAEOcZUFjZxMMt3R6rLIdkEwBiuhOg_t_lt4HzZZXwfrnGOb_O-JoYe_3RrF4KbGAAmz-s/TypeMockSnippetTemplate.gif?psid=1)

Instructions on how to set up Snippet Compiler with this template are
included. Basically, drop the template into your Snippet Compiler
templates folder and add references to NUnit and TypeMock.

[**[Download
TypeMockSnippetTemplate.zip](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!45030&authkey=!AH_lO5v3eI8Ee94&ithint=file%2c.zip)**]

