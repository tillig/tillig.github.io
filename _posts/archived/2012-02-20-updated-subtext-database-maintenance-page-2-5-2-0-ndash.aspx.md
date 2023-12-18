---
layout: post
title: "Updated Subtext Database Maintenance Page 2.5.2.0 &ndash; Enable/Disable Referrals"
date: 2012-02-20 -0800
comments: true
disqus_identifier: 1771
tags: [subtext,blog,sql,downloads]
---
[Tim Heuer figured out the right stored
procedure](http://timheuer.com/blog/archive/2012/02/20/reducing-unnecessary-referral-logging-in-subtext.aspx)
to modify in Subtext 2.5.2.0 to disable tracking of referrals
altogether. I'm all for this since it means less need to monitor my
database and remove/shrink the referral table.

[I updated my Subtext Database Maintenance page so you can fix your DB
up with a single
click.](/archive/2011/06/17/easier-subtext-2-5-2-0-maintenance.aspx)
Enable/disable, push-button style. All yours, free, YMMV. Do note that
it does actually modify the stored proc, so if you've got your DB locked
down or you've customized stuff, this may not be something you want to
do. **You have been warned.**
