---
layout: post
title: "Monad Rocks"
date: 2006-03-22 -0800
comments: true
disqus_identifier: 970
tags: [powershell]
---
I haven't had a lot of time to look into some of the latest MS tech what
with the project I've been mired in for a while, and yesterday
[Hanselman](http://www.hanselman.com/blog/) turned me on to [Monad, the
new Microsoft command
shell](http://www.microsoft.com/technet/scriptcenter/hubs/msh.mspx).
(Yeah, I'm a little late for this boat, but it's still in beta, so I'm
not that late.) He was showing me some of the ways he's thinking about
automating tasks around work and I gotta say... even the simplest demo
is awesome and makes you think in a different way entirely about the
usefulness of the command line. Everything is an object? No more parsing
text output? It doesn't get much better than that.

 I decided to try it out this morning when I was talking to Stu and he
wanted to figure out the most recently modified file in a directory
tree. Monad to the rescue, right? One command line:

`get-childitem -Recurse -Exclude CVS | sort-object -Property LastWriteTime -Descending | select-object -First 5 | get-property -Property LastWriteTime,FullName | format-table -Property LastWriteTime,FullName -Autosize`

 That will:

-   Recurse through the filesystem from the current location down
-   Sort all the files found by last write time
-   Get the first five in that list (the most recent five modified
    files)
-   Get the last write time and full name properties, and
-   Format the property list into a nice table



 It ends up looking like this (click to enlarge):

 [![Monad in action - sorting most recent modified files (click to
enlarge)]({{ site.url }}/images/20060327monad_lg.gif)

 I don't know about you, but I think that's *hot*. One line, loads of
functionality. I mean, who needs batch scripting now? I can't wait to
get some time to really delve into this thing.
