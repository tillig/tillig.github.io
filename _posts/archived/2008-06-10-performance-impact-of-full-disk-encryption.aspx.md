---
layout: post
title: "Performance Impact of Full Disk Encryption"
date: 2008-06-10 -0800
comments: true
disqus_identifier: 1397
tags: [GeekSpeak]
---
I'm running this laptop at work that has full disk encryption and a
real-time virus scanner on it and it feels like it's *dog slow all the
time*. It's not a CPU or memory issue, either - it's that my disk is
constantly churning and I'm I/O bound.

I knew that the the encryption had an impact, but I never realized how
much until [I found these
benchmarks](http://www.xml-dev.com/blog/index.php?action=viewtopic&id=250).
Looks like I'm about doubling the amount of time it takes for disk I/O,
not counting the real-time virus scanner overhead.

I'm all about security and all, but man, what I wouldn't give to just
have a separate data partition encrypted and *leave the system partition
unencrypted*.
