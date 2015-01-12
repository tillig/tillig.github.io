---
layout: post
title: "Resolve Multiple Dependency Versions in Sandcastle Help File Builder"
date: 2008-02-12 -0800
comments: true
disqus_identifier: 1349
tags: [Software / Downloads,net]
---
Anymore, if you want to generate documentation, you're using
[Sandcastle](http://blogs.msdn.com/sandcastle/default.aspx) along with,
most likely, some community-generated wrapper for it so you're not
manually executing the bajillion steps Sandcastle requires to get things
done. (Wow, that didn't sound bitter *at all*.) I use [Sandcastle Help
File Builder](http://www.codeplex.com/SHFB) for several projects and
like it a lot.

When Sandcastle generates its reflection information (so it can properly
resolve links in your docs), you need to tell it where it can find
third-party dependencies so it can generate the information it needs.
All of this has to happen on the command line (no, there's not currently
a config file option for this), which means when your project gets to be
of a significant enough size, you start running into [command line
length limitations](http://support.microsoft.com/kb/830473). Sandcastle
Help File Builder addresses this by copying all of your dependencies
locally into a temporary folder and passing a single dependency location
(that folder) to Sandcastle.

That works great... until you run into an issue where you inadvertently
rely on multiple versions of a single dependency.

For example - say you have a custom NAnt task project with
a compile-time dependency on
[log4net](http://logging.apache.org/log4net/) 1.2.1.40796 and
[NAnt](http://nant.sourceforge.net/) 0.85.2344.0. NAnt 0.85.2344.0 has a
reference to log4net 1.2.9.0. What that means is, unfortunately, that
Sandcastle needs access to both versions of the log4net.dll. What it
further means is that when Sandcastle Help File Builder tries to copy
both versions locally to help you with the dependency thing, [there can
be only one](http://www.imdb.com/title/tt0091203/) and Sandcastle dies a
miserable death telling you that it can't find the reference.

How do you resolve that?

Luckily, Sandcastle Help File Builder has a plugin model that allows you
to swap in your own behavior for various stages of execution, and that's
what I've done.

Since Sandcastle needs the assembly metadata and it doesn't matter what
the physical filename is, **I've replaced the existing dependency copy
routine so that it still copies all of your specified dependencies but
it copies them with GUID filenames** - so you can have more than one
version of a dependency without having a filename clash. Sandcastle
resolves the dependencies correctly (it literally just iterates through
all of the copied dependencies and caches the metadata) and docs get
generated. Peace on Earth is restored.

![The plugin copies your dependencies with GUID
filenames.](https://hyqi8g.dm2301.livefilestore.com/y2pid4YbR3g0zMKSyrEVhBsxixJnt1ubjw85uKG7qalwKy8bdJ_WyuQrE0geGa0jH609kFJhj_AD7h185KxKleSCLp4kqKyCvMTSWXw-2xtXaw/20080212shfbguidplugin.png?psid=1)

To use it, just drop it in the PlugIns folder in your Sandcastle Help
File Builder installation location. More on using plugins with
Sandcastle Help File Builder is included in the SHFB documentation.
(Basically, put it in the folder and SHFB will pick it up
automatically.)

Grab the compiled version, the source (with unit tests), or both. Free,
as usual.

[**[Download Paraesthesia.SandcastleHelpFileBuilder.Plugin 1.0.0.0
Compiled](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!45033&authkey=!AGc4PLOktrQ0qt0&ithint=file%2c.zip)**]
 [**[Download Paraesthesia.SandcastleHelpFileBuilder.Plugin 1.0.0.0
Source](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!45032&authkey=!AKXWxpuD0QUVgzM&ithint=file%2c.zip)**]

**Version History**:
 1.0.0.0: First release.

