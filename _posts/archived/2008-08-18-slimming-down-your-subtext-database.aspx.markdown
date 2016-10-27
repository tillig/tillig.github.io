---
layout: post
title: "Slimming Down Your Subtext Database"
date: 2008-08-18 -0800
comments: true
disqus_identifier: 1431
tags: [subtext,blog,net,sql]
---
While I was [attempting my
upgrade](/archive/2008/08/16/failed-to-upgrade-to-subtext-2.0.aspx), I
figured I'd also look and see where my database space was going since
I've had to have a size increase a couple of times now and I'm not
generating tens-of-megabytes worth of content. The culprits: the
`subtext_URLs` and `subtext_Referrals` tables. Which is to say, my list of
referral sites and the links to the associated blog entries. The URLs
table was in the 40MB range, which is pretty out of hand.

I did a quick search to see if this was common and found [this entry on
Phil Haack's
site](http://haacked.com/archive/2006/02/06/databasemaintenanceofyourblog.aspx)
from a couple of years back, talking about how to clear the cruft out of
these tables. Ran those SQL commands and I'm back into the 5MB size for
the URLs table.

Anyway, this serves as a little reminder to give your database a little
love and attention. Hopefully we'll offer more in the way of an admin
interface for these sorts of things in Subtext 3.

