---
layout: post
title: "Re-imaged Machine"
date: 2006-12-11 -0800
comments: true
disqus_identifier: 1112
tags: [personal]
---
Perhaps once every six to twelve months I end up flattening my work
computer and getting the IT folks to drop a fresh, clean image on it. I
install, uninstall, re-install, and generally mess around with the
thing, so after a time it really starts running slow and unreliably.

 This time, my problem ended up being that I installed Notepad++ (which
I'm not linking to so no one falls into the same hole I did). Turns out
if you use the menus in Notepad++ to associated document types with it,
it deletes the old document type and creates one central type in the
registry that it associates with the document extension. So if you
associate XML, LOG, CONFIG, and TXT with Notepad++, they all become
"Notepad ++ Documents" and if you change one to do something, all of
them change.

 This is particularly troublesome in the case of "BAT" - batch scripts.
I associated "BAT" with Notepad++ and it removed the ability to execute
batch scripts because "BAT" became a "Notepad++ Document." I futzed
around with the registry and trying to recover from backup, but it was
no use. Time to re-image.

 I got the machine re-imaged on Friday at around 2:00p. I was up until
1:45a Saturday re-installing everything that wasn't included in the
image. After final tally, there were over 45 applications, utilities,
and other tools I installed. And that didn't count doing things like
checking out the source to all the stuff I have to build.

 But, hey, it's running totally fast now. Hehehehe...
