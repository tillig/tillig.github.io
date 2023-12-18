---
layout: post
title: "Select Current Item in Visual Studio Solution Explorer"
date: 2009-08-12 -0800
comments: true
disqus_identifier: 1556
tags: [vs]
---
UPDATE: BAH! I was sort of wrong about this. Turns out, as noted in
comments, that if you use the solution I outline, then when you hit the
key combo, it re-enables the "Track Active Item in Solution Explorer"
option that you want disabled. So if you do this, you need to hit the
key TWICE - once to select the current item, once to turn the setting
back off. If I find a better solution to the problem I'll update this
post.

When I'm working in Visual Studio, I generally turn off the option to
automatically track the current item in the Solution Explorer. I don't
like the Solution Explorer hopping about as I switch from file to file.
Sometimes I do like to find whatever I'm working on, though, and that
can be painful if you do it manually.

Fortunately, Visual Studio has a command you can bind to a keystroke to
do exactly that: **View.TrackActivityinSolutionExplorer**

It's not bound to a key by default, but you can go to Tools -\> Options
and bind it yourself. I've got mine bound to Ctrl+Shift+Alt+T. ('T' for
'Track' but you might want something more memorable for you.)

![View.TrackActivityinSolutionExplorer key
binding]({{ site.url }}/images/20090812trackactivityinsolutone.png)
