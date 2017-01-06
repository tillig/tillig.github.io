---
layout: post
title: "The Old Enum Switcharoo"
date: 2007-10-18 -0800
comments: true
disqus_identifier: 1279
tags: [gists,net]
---
Some friends of mine at work, Vish and Peter, found this one.  It's
tasty.

We work on a web application that has a lot of external dependencies. 
Generally speaking, we have pretty decent luck upgrading these external
dependencies when the interfaces don't change - swap in the new assembly
for the old one, do any binding redirects or what-have-you, and you're
off.  Unfortunately, one particular upgrade wasn't working too well and
we had a heck of a time figuring out why.

The problem was in a particular switch statement that was based on an
enumeration value.  We get the value from the external dependency then
pass it through the switch statement so we know how to behave based on
the value.  The problem we were seeing was that we could watch the
logging through the system, see that all the way through the service
layer everything was fine, then suddenly when it hit our application,
our app was receiving the wrong value.  There wasn't any serialization
problem, there wasn't any caching issues, it was just somehow getting
the wrong value.

The answer lies in what I'm going to call "The Old Enum Switcharoo."

Turns out that **if a third party dependency changes the order of an
enumeration, that's an interface-breaking change**.  Even if they don't
add or remove any values - just re-order the same values inside it
(which is exactly what happened to us) - things fall apart.

I put together a reproduction so you can see what's going on.  It's a
small console application that has an external dependency with three
enumeration values.  Instructions for how to build/run your own repro
are included in the source file; I've also included two folders with
pre-built binaries so you can just run it and witness, if that's all
you're up for.  Here's what it looks like:

![The Old Enum Switcharoo - in
action!](https://hyqi8g.dm2303.livefilestore.com/y2pJn-twVTVnP_CyXoURyYOjlrFGpZj5bHqN9dyc8kq9jKuo8yUrBF3y8ysdd9Dl3P8GPSiMEMmWwgOv7Ub_cAGcjD8wabD-yF76eUfFqD49fk/20071018switcharoo.png?psid=1)

Go ahead and grab the reproduction code here:

[Reproduction Code for The Old Enum Switcharoo [EnumSwitcharoo.zip -
15KB]](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!45007&authkey=!AN3lpKsX-NI_Vsc&ithint=file%2c.zip)

The solution to the problem is to either get the external dependency to
put their enumeration back (which is a possibility for us, since we
control it) or recompile your application against the new version of the
dependency.

