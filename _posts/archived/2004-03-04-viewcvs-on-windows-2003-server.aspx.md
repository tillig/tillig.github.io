---
layout: post
title: "ViewCVS on Windows 2003 Server"
date: 2004-03-04 -0800
comments: true
disqus_identifier: 526
tags: [GeekSpeak]
---
I spent at least half a day trying to get
[ViewCVS](http://viewcvs.sourceforge.net/) set up on a Windows 2003
server running [CVSNT](http://www.cvsnt.org/) so I could browse my code
repositories. What a pain! When browsing folders in my repositories, I
kept seeing errors like "There are X files, but none match the current
selection criteria."
 
 I searched all over and saw that other people had similar problems, but
the most anyone would ever say was "it's either an
[RCS](http://www.cs.purdue.edu/homes/trinkle/RCS/) problem or a
permissions issue." Uh huh.
 
 So I contacted our CVS guy (one of our CVS guys) to see how they had
set it up in the product department. The guy I talked to didn't set it
up, but he pointed me to this [ViewCVS Setup on Windows with CVSNT 2.0.x
and IIS or Apache](http://web.telia.com/~u86216121/ViewCvsSetup.html)
program.
 
 Oh. Hell. Yes.
 
 It even gets enscript and CVSGraph installed correctly. So painless, so
easy. Just like it should be. Anyone using CVSNT who wants to put up
ViewCVS should check this out.
