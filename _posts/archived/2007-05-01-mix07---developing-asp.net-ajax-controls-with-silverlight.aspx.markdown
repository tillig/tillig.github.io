---
layout: post
title: "MIX07 - Developing ASP.NET AJAX Controls with Silverlight"
date: 2007-05-01 -0800
comments: true
disqus_identifier: 1195
tags: [conferences,aspnet,net,javascript]
---
This session discussed how you can use ASP.NET AJAX controls and take
advantage of Silverlight at the same time - creating a server control
using the ASP.NET AJAX server control framework that uses Silverlight
for its presentation.

 There are several advantages to doing things like this - you can do
this to slowly migrate a site to using Silverlight (one control at a
time); you can separate the presentation of the control into code and
XAML, giving more control to site designers; and it gives you new
abilities using cross-platform vector graphics.

 The meat of this presentation was code, so there's not a lot of
bullet-point style items to recount, but there were two controls shown
using this technique. The first was a slideshow control that used
Silverlight to show a nice transition when switching pictures in the
slideshow; the second was a dynamic graph of stock prices that refreshed
periodically.

 The pattern for doing this is similar to that of creating other ASP.NET
AJAX controls. To that end, both demos were done by deriving from the
`Xaml` control that has a lot of base functionality and implements the
proper AJAX script interface and saves you time when starting your own
XAML based controls. The Xaml control is a part of ASP.NET Futures (so
it's not the base package yet but should be soon).

 Basically there are three parts - write your XAML to handle the UI, set
the `XamlUrl` property on the Xaml control so it knows how to display,
and write the client script to work against the XAML tree. Obviously
that's pretty simplified, but it seems to me that the hard part really
is working out the proper JavaScript to manipulate the XAML and
intercept the events. ASP.NET AJAX seems to have a lot of helpers and
convenience methods to make this easier, but if you're not writing this
in Orcas I can see where it'll be a little slow to ramp up on.

 I like the approach of writing controls using Silverlight. The ability
to slowly migrate a site or individual functionality over to use
Silverlight one control at a time is appealing. I can envision several
charting or graphing applications I could use this sort of thing in.
