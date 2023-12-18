---
layout: post
title: "Visual Studio .NET Hangs/Locks Up When Pinning Toolbox"
date: 2005-09-09 -0800
comments: true
disqus_identifier: 885
tags: [vs]
---
For, well, quite a long time, I've noticed that Visual Studio .NET 2003
locks up hard when I try to pin/unpin the toolbox window. I chalked it
up to some odd interaction between add-ins I was running.

 [Stu](http://www.stuartthompson.net) sent me over [this
article](http://groups.google.com/group/microsoft.public.vsnet.ide/browse_thread/thread/18ddc078df86bd9/53b4f84dd78c03e8?tvc=2&hl=en#53b4f84dd78c03e8),
though, and it turns out this is a known issue from .NET Framework 1.1
SP1.

 According to the article, it's not the toolbox locking up, it's the
*Server Explorer* (even if it's not showing). The solution? Dock the
Server Explorer on a different side of the Visual Studio window than the
toolbox.

 I did it and I can now pin/unpin the toolbox with no issues whatsoever.
YMMV.
