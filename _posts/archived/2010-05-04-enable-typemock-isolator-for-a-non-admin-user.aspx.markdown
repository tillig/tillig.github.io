---
layout: post
title: "Enable Typemock Isolator for a Non-Admin User"
date: 2010-05-04 -0800
comments: true
disqus_identifier: 1636
tags: [Software / Downloads,net]
---
Generally speaking, it's good practice to [develop as a
non-administrative
user](http://msdn.microsoft.com/en-us/library/aa289173.aspx) so you can
make sure your applications will run for non-admin users and so you
won't do any damage to your environment as you develop. Unfortunately,
some things end up forcing you to develop as an admin because they
require rights that most non-administrative users don't have.

[**Typemock Isolator**](http://www.typemock.com)**no longer has to be
one of those things that forces you to run as an administrator.**

The Isolator install guide has [a "Security"
section](http://www.typemock.com/Docs/UserGuide/?topic=Documentation/Security.html)
that outlines the various registry keys and files that Isolator needs
read/write access to. If you give your non-admin user the rights to
these keys and files, that non-admin user can start, stop, and link
Typemock Isolator with other profilers.

In a recent round of troubleshooting, I ended up writing a program to
modify the ACL on the requisite keys and files as found on the target
machine. The result is EnableTypemockForNonAdmin - a command-line
program that automates this permissions setup process.

**This program will make permissions changes to files and your
registry.** Read the enclosed readme file and make sure you fully
understand what's going to happen before you run it.

Usage is simple. Open a command prompt as an administrator and run the
program, passing in the name of the non-admin user you want to have
access to Typemock Isolator.

`EnableTypemockForNonAdmin.exe YOURDOMAIN\yourusername`

Standard disclaimers apply - I'm not responsible for any damage done by
the program; YMMV; use at your own risk; etc.

> **UPDATE 5/4/2010**: Typemock Isolator 6.0.3 (not yet released at the
> time of this writing) may fix these issues if you are using Typemock
> Isolator with TestDriven.NET to make this program unnecessary. [Jamie
> Cansdale from TestDriven.NET has commented
> below](/archive/2010/05/04/enable-typemock-isolator-for-a-non-admin-user.aspx#2171)
> and left a link to a registry file you can install to make things work
> without changing permissions. I will leave this program available as
> it is still helpful for earlier versions of Typemock Isolator and/or
> TD.NET, and may still be required for command-line builds. (We'll have
> to see once Isolator 6.0.3 comes out.)
>
> **UPDATE 5/5/2010:** I verified that with Typemock Isolator 6.0.3 and
> [NCover](http://www.ncover.com) 3.4.3 the registry additions provided
> by Jamie Cansdale will allow you to run as a non-admin user (both
> using the Typemock Config Tool and TestDriven.NET), though I can't
> speak to earlier versions of Isolator or linking with profilers other
> than NCover. These keys are also custom additions to your registry, so
> it's a little "non-standard." YMMV. I think the permissions change is
> probably the route I'll continue to go until the profiler companies
> and/or Typemock start shipping these tweaks as supported items out of
> the box.
>
> UPDATE 1/20/2011: Typemock Isolator 6.0.6 now requests read/write
> permissions on the registry key where the license info is kept right
> when the config tool starts up, regardless of whether you're going to
> modify the value. I updated the EnableTypemockForNonAdmin tool to
> version 1.0.1.0 and added that registry key to the list of keys to
> give your non-admin user permissions to.
**Download now - free!**

[[EnableTypemockForNonAdmin - 1.0.1.0
(zip)](https://github.com/tillig/EnableTypemockForNonAdmin/releases/download/v1.0.1/EnableTypemockForNonAdmin-1.0.1.0.zip)]

[[EnableTypemockForNonAdmin Source - 1.0.1.0
(zip)](https://github.com/tillig/EnableTypemockForNonAdmin/archive/v1.0.1.zip)]

