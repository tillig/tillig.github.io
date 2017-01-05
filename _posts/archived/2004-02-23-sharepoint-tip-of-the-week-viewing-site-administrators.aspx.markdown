---
layout: post
title: "SharePoint Tip Of The Week - Viewing Site Administrators"
date: 2004-02-23 -0800
comments: true
disqus_identifier: 519
tags: [Code Snippets,Web Development]
---
My [*Viewing SharePoint Site
Administrators*](http://msd2d.com/Content/Tip_viewitem.aspx?section=Sharepoint&id=1c555ddc-518a-4025-9d14-3c37afb4cfb6)
web part/tutorial is MSD2D Tip Of The Week (at least, via the email
newsletter they send out), but the email newsletter had my name and
article title but the body to last week's tip. If you want to see it,
[check it out on the
site](http://msd2d.com/Content/Tip_viewitem.aspx?section=Sharepoint&id=1c555ddc-518a-4025-9d14-3c37afb4cfb6).
It walks through the creation of a web part that you can put on a
SharePoint site (WSS or SPS) and see the list of administrators for that
site (a handy thing if you have a lot of sites and people want to know
who to contact for help).
 
 I will be following this up with an additional tutorial at some point
because there are some security foibles you have to work around in
SharePoint that the web part doesn't address. For example, *My Sites*
are each individual site collections, each with a different root-level
administrator - by default, there are no common administrators on WSS
sites you create under *My Site*, and the web part I wrote about uses
the site administration group to get access to the list of users and
determine Administrators for the site.
 
 What I ended up having to do to get around it was create a "helper web
service" that I could call from the part such that I could run the web
service as the ASP.NET process user (thus having full access to all
sites, including stuff under *My Sites*), which, in turn, uses the web
services exposed by WSS to retrieve the data. It's the "long way
around," but since you have to be an Administrator in order to get any
user information, I don't see any other way to do it. You have to
emulate an Administrator, and that's the only way to do it on a large
scale, and for multiple servers/sites (which is what we have to do).
