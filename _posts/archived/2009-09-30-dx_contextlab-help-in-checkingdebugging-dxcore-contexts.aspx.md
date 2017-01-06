---
layout: post
title: "DX_ContextLab - Help in Checking/Debugging DXCore Contexts"
date: 2009-09-30 -0800
comments: true
disqus_identifier: 1569
tags: [downloads,vs,coderush]
---
This is sort of a niche thing, so if you don't know what I'm talking
about, don't worry. However, [people who write DXCore
plugins](http://code.google.com/p/dxcorecommunityplugins/)
(CodeRush/Refactor) sometimes need to do some action based on what
context the user is currently in. For example, you may need to enable a
function or hide a button or something if the user is in a designer
screen. The problem is, it's hard to debug that sort of thing - there's
nothing that says "here's the context(s) you're currently in" so when
you're writing your plugin you can do the right thing.

That's what I made - a plugin that [optionally] polls for the list of
contexts the user is currently in so you can debug the plugin you're
writing.

![DX\_ContextLab
Window](http://dxcorecommunityplugins.googlecode.com/svn/trunk/DX_ContextLab/screenshots/lab-window.png "DX_ContextLab Window")

If you want it (or any of the other awesome FREE community plugins),
head over to [the DXCore Community Plugins
site](http://code.google.com/p/dxcorecommunityplugins/).

