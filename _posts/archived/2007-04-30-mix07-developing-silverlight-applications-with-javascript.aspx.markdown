---
layout: post
title: "MIX07 - Developing Silverlight Applications with JavaScript"
date: 2007-04-30 -0800
comments: true
disqus_identifier: 1190
tags: [conferences,aspnet,net,javascript]
---
I just emerged from a standing-room-only demonstration of how to work
with [Silverlight](http://www.silverlight.net) and JavaScript. It seems
that the managed code way of working with Silverlight is a 1.1 thing
that's coming soon (before Summer 07? I'd have to see the slides again);
if you want to write a Silverlight application today, you'll be using
JavaScript.

 It looks like working in Silverlight with XAML with JavaScript is a lot
like working with the HTML DOM in JavaScript. You get elements, you
manipulate properties, you respond to events... and it's just as hard to
debug as your standard client-side JavaScript app. The demos were
interesting, showing how you do different things like start animations,
intercept mouse events... but they were far from bug-free. I guess
that's just one of the pain points for early adoption.

 Beyond that pain point, though, it looks pretty good. No harder than
doing stuff you're probably already doing, but with a much richer end
result.

 Two of the key things shown were the Downloader and the CreateFromXAML
call.

 The Downloader is a component that allows you to synchronously or
asynchronously download content. It will also report on the status of
the progress as it goes, so you can have an actual progress bar. This
looks useful if you've got some large content like a lot of video where
you want to download some to cache before starting the video playing.
The Downloader supports ZIP, too, so if you have some compressed content
to download, you're set to go.

 The CreateFromXAML method is sort of like an "eval" call - it takes
some XAML that you've built up in code and parses it into native XAML
nodes that can be inserted into your application. This is handy for
building XAML content programmatically - say, adding rows to a table.

 I like what I've seen so far from Silverlight, but I've yet to get some
hands-on. I think my next stop is the lab area where you can get some
first-hand experience with it by going through some walkthroughs and
such.
