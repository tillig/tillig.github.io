---
layout: post
title: "Microsoft Patterns & Practices Team Uses Typemock Isolator"
date: 2008-09-03 -0800
comments: true
disqus_identifier: 1441
tags: [net]
---
[The Typemock Insider blog
mentions](http://blog.typemock.com/2008/09/unit-testing-sharepoint-using-isolator.html)
that Patterns & Practices has adopted [Typemock
Isolator](http://www.typemock.com) as their mocking framework, at least
for testing SharePoint applications. [Blaine
Wastell](http://blogs.msdn.com/blaine/archive/2008/08/28/patterns-practices-sharepoint-drop-is-available-on-codeplex.aspx#8904234)
and [Francis
Cheung](http://blogs.msdn.com/francischeung/archive/2008/08/22/unit-testing-sharepoint-2007-applications.aspx)
say they're using it because it allows them to mock sealed and internal
types, which SharePoint is full of.

I think this is cool and definitely says something: Even if you're
writing brand new code, which can be entirely designed for testability
(if that's what you want), at some point you're going to have to
interface with something you didn't write (SharePoint, .NET Framework)
and you're still going to want to test that interface code, which is
where Isolator comes in. I'm so glad [they've got an open source license
now](http://www.typemock.com/free_open_source_license_form.php)!

