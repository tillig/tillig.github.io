---
layout: post
title: "Where's iTunes SQL Support?"
date: 2005-11-23 -0800
comments: true
disqus_identifier: 922
tags: [media,music,sql]
---
I'm working on setting up various [Smart
Playlists](http://www.apple.com/itunes/playlists/) in
[iTunes](http://www.apple.com/itunes/) and every time I'm working with
them I totally run into all these shortcomings with the way they work.
Like, what if I want all of the pop songs by Depeche Mode and Erasure
that show up between 1980 and 1990? You have your choice of AND or OR,
right? So it's "Genre is Pop" and "Year is in the range 1980 to 1990"
and... what? "Artist is Depeche Mode" and "Artist is Erasure" won't
work. I need an OR.

 Why can't I just do this:
`SELECT * FROM Library WHERE Year BETWEEN 1980 AND 1990 AND Genre = 'Pop' AND Artist IN ('Erasure', 'Depeche Mode')`

 No reason, that's why. Come on, guys, get with the program.
