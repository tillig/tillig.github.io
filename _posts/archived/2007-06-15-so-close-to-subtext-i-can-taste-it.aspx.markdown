---
layout: post
title: "So Close to Subtext I Can Taste It"
date: 2007-06-15 -0800
comments: true
disqus_identifier: 1214
tags: [GeekSpeak]
---
I've been working pretty hard on getting things ready to migrate this
pMachine piece of crap blog over to
[Subtext](http://www.subtextproject.com/):

-   I wrote a BlogML exporter for pMachine so I can get my entries out.
-   I've got an ID conversion mapping utility that runs through the
    BlogML and maps the old pMachine ID to the new Subtext friendly URL.
-   I've got a URL rewriting utility that takes the ID map and runs
    through the BlogML, finding any old links and updating them with the
    new URL in Subtext so cross-post links work.
-   I wrote a utility to get around a sort of crazy bug in Subtext
    comment import where newlines automatically get converted to
    line-break tags and line-break tags that already exist in the
    comment get encoded so they actually display.
-   I've got a converter that takes the ID mapping and converts it to a
    PHP array so I can use that array as part of a redirection mechanism
    that will take people hitting the old permalinks in pMachine format
    to the new Subtext location.
-   I've figured out how I'm going to handle the relocation of the
    images in posts and such so things should still work (pMachine has
    an interesting sort of macro substitution it uses for upload
    locations so it's not as straightforward as you might think).

All I really have left to do is a final test install/import of the data.
Assuming that goes well, I should be able to do a pretty quick swap and
import. I'm really looking forward to it. I already have some
interesting ideas of things I'd like to do.
