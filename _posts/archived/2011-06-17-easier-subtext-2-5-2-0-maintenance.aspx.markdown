---
layout: post
title: "Easier Subtext 2.5.2.0 Maintenance"
date: 2011-06-17 -0800
comments: true
disqus_identifier: 1721
tags: [Subtext,Software / Downloads]
---
About a year and a half ago [I updated my Subtext database maintenance
page](/archive/2009/12/10/easier-subtext-2.1.0.5-maintenance.aspx) from
[the original I had
posted](/archive/2008/12/05/easier-subtext-1.9.5b-database-maintenance.aspx)
about three years ago. While the database hasn't changed much between
Subtext 2.1.0.5 and 2.5.2.0 (the 2.1.0.5 maintenance page does still
work), I updated the page to provide a little more info and do the
cleanup in a more automated fashion.

As a refresher, this page lets you...

-   Clear the error log.
-   See how many referrals you have in your database.
-   Remove search engine and spam referrals from the database.
-   Reindex the referrals table.
-   Shrink the database.
-   See additional stats like table and overall database size.

This new version adds some [super rudimentary] AJAX goodness so you can
click the button to remove the junk referrals and it will iterate over
the set in blocks of 1000 until they're cleaned up - so the database
connection doesn't time out.

(The whole reason I have this page is that I don't really have SQL
Server Management Studio access; I have to maintain my stuff entirely
over the web.)

Anyway, drop the two enclosed pages into your /aspx/Admin folder and
you'll be able to access them after logging into the Admin console by
visiting http://yourblog/admin/DatabaseMaintenance.aspx. It won't add
any navigation links to the site into the page, so you'll have to
manually enter the URL to get there.

**UPDATE 2/20/2012** Based on [some logic from Tim
Heuer](http://timheuer.com/blog/archive/2012/02/20/reducing-unnecessary-referral-logging-in-subtext.aspx)
I added the ability to enable or disable referrals to the bottom of the
maintenance page. Click the appropriate button and the referral stored
proc will be modified to track referrals (or not).

[[**Download
SubtextDatabaseMaintenance2520.zip**](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!45334&authkey=!AHeM-M-ebaeaoYI&ithint=file%2czip)]

I'm hoping that Subtext enables the ability to either stop tracking
referrals altogether or enables some sort of spam filter on referrals so
these never make it into the logs to begin with.**I shrank my database
from 245MB to 23MB just by running this maintenance.**

