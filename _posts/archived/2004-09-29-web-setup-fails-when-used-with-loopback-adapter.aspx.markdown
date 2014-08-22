---
layout: post
title: "Web Setup Fails When Used With Loopback Adapter"
date: 2004-09-29 -0800
comments: true
disqus_identifier: 667
tags: [.NET,Visual Studio]
---
[I sent this to Scott
Hanselman](http://www.hanselman.com/blog/PermaLink.aspx?guid=c45d4e3c-4883-4686-bf95-793b1863ff8c)
like three months ago and didn't mention it here, but I ran into this
again today (with the same set of users that originally had the problem
- surprise, surprise) so I figured it was worthy of repetition.
 
 If you have the Microsoft Loopback Adapter running on a machine where
you try to execute a web setup project generated from Visual Studio .NET
(an MSI file), you'll get the following error:
 
 **The specified path
'http://MACHINENAME/http://MACHINENAME/InstallFolder' is unavailable.
The Internet Information Server might not be running or the path exists
and is redirected to another machine. Please check the status of this
virtual directory in the Internet Services Manager.**
 
 The problem, as you can see from the message above, is the Loopback
Adapter doing its job - looping back on itself. That messes up the
installation path, though, and the MSI pukes.
 
 To fix the issue, disable the Loopback Adapter, run the installer, then
when the install is finished you can re-enable the Loopback Adapter.
