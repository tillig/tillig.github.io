---
layout: post
title: "Reduce Build Overhead with Better Code Organization"
date: 2010-01-19 -0800
comments: true
disqus_identifier: 1608
tags: [dotnet,vs]
---
In a really large system the build can take a long time. A really long
time. Long enough to make continuous integration sort of meaningless.
You may not be able to do a whole lot about it, but something to look at
is your project's code organization. The compiler and linker have some
startup overhead you may be able to get rid of by reducing the number of
solutions/projects you have.

For example, I threw together a set of three test codebases. Each has
100 (empty) classes, but they're organized in different ways. I then
built them a few times and compared the average times.

| Project Format | Time to Rebuild (Clean/Build)| Working Copy Size Post-Build
| --- | --- | --- |
| 100 separate solutions, 1 project per solution, 1 class per project | 42s | 4.29MB |
| 1 solution with 100 projects, 1 class per project | 42s | 3.52MB |
| 1 solution with 1 project, 100 classes in the project | 1s | 256KB |

I noticed two interesting things here:

1. From a time perspective, you don't get much if you have 100
    solutions or 100 projects - the real gain (and it's significant) is
    if you put everything into the same project/assembly.
2. The working copy size post-build (the amount of disk space taken by
    the source and build output) is orders of magnitude smaller if you
    put everything into the same project/assembly.

This isn't to say everyone should start shipping mammoth assemblies.
Just be careful how you organize things. Choose your assembly boundaries
carefully. You may gain yourself some time in the build - and some space
on your disk.
