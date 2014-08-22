---
layout: post
title: "SharpReader2RSSBandit.xslt - Moving SharpReader Settings Into RSS Bandit"
date: 2004-11-17 -0800
comments: true
disqus_identifier: 696
tags: [Software / Downloads,Release Notices]
---
I use an RSS aggregator almost daily. I started off with [RSS
Reader](http://www.rssreader.com/), then decided to move to
[SharpReader](http://www.sharpreader.com) because it had a little more
of what I was looking for feature-wise.
 
 I've used SharpReader for quite a while, but while it's configurable in
some ways that other readers aren't, I found the control you have over
feeds in [RSS Bandit](http://www.rssbandit.org/) is pretty cool,
particularly with the ability to apply your own XSLT to the feed, not to
mention there's actually a [product
roadmap](http://sourceforge.net/forum/forum.php?forum_id=397557) and
some pretty decent support.
 
 So today I downloaded RSS Bandit and started messing with it, liked it,
and decided to move my settings over to it.
 
 Hoo, boy.
 
 SharpReader exports in OPML format. RSS Bandit exports in some other
format. Time to write a conversion...
 
 ...and here it is. An XSLT document that, when run against the exported
SharpReader settings, renders an XML document that you can import into
RSS Bandit.
 
[SharpReader2RSSBandit.xslt](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!45407&authkey=!AM6uLNOE7wo_UWc&ithint=file%2cxslt)
