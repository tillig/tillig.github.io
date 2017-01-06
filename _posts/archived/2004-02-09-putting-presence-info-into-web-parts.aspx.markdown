---
layout: post
title: "Putting Presence Info Into Web Parts"
date: 2004-02-09 -0800
comments: true
disqus_identifier: 498
tags: [gists,Web Development]
---
I threw together a quick tip that I posted to MSD2D about [how to
integrate user presence information into web
parts](http://msd2d.com/newsletter_tip.aspx?section=Sharepoint&id=1e3f112b-bea8-4dae-b5ac-7fea3d06182c).
I saw a couple of the stock Microsoft parts doing this and thought it
would be good to use for some of our web parts since we also take
advantage of the [Live Communications
Server](http://office.microsoft.com/home/office.aspx?assetid=FX010908711033&CTT=6&Origin=ES790020011033)
internally. One good application of this: I wrote a web part that
displays a list of the current WSS site administrators (so users know
who to contact to get more than just reader permissions) and threw their
presence info in there so if someone wanted to request permissions or
ask a question, it was right there for them.

 I'm thinking I should put together a series of articles talking about
how to build that "list site admins" web part. It's actually not as easy
as you might think, since you have to run the part as an administrator
rather than as the currently logged in user, and then it gets trickier
still if you try to use the same web part on a WSS site that resides
underneath a SharePoint Portal Server "My Site" (because of the way
administrators are set up there).
