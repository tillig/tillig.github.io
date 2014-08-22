---
layout: post
title: "Easier Subtext 1.9.5b Database Maintenance"
date: 2008-12-05 -0800
comments: true
disqus_identifier: 1472
tags: [Subtext]
---
A few months back I was working on my blog and [did some database
maintenance](/archive/2008/08/18/slimming-down-your-subtext-database.aspx)
to help slim down the size of things with respect to referral logs based
on [some logic posted by Phil
Haack](http://haacked.com/archive/2006/02/06/databasemaintenanceofyourblog.aspx).
Just a couple of days ago, I wanted to see how things were looking in
there and noticed the database was starting to get a little big again.

The problem with doing database maintenance, at least for me, is that I
don't have a dedicated SQL instance and I don't have administrative
rights, so I can't, for example, run a database backup to truncate the
transaction logs, and if I mess things up I'm at the mercy of the
operator on duty to eventually get to my help desk request and restore
me. I also have to have them open up their firewall on a per-IP-address
basis so I can connect with SQL Management Studio, and then I'm still
sort of stuck because I can only connect from home - the firewall at
work blocks that port, so I can't fix anything on the fly during the
day. Normally this isn't a big issue, and the folks at my host are
really good and pretty responsive, but it does limit my abilities.

What this all boils down to is that I need an administrative interface
to do this sort of maintenance that's *part of the application*. So
that's what I wrote.

Download the zip file, then drop the enclosed ASPX page in your Subtext
"Admin" folder. It's an administration page so you do have to be logged
in as an admin to use it. It doesn't add any navigation links to the
admin site, so you do need to manually enter the URL to the page to get
to it, but once you do, this page allows you to:

-   **Clear the error log.** Yes, you can do this from the error log
    page, too, but it's nice to have all of this in a central location.
-   **See how many referrals you have in your database vs. how many of
    those are from search engines.** The page lists out what qualifies
    as a search engine or spam referral so you'll know what this means.
    It's basically just a list of expressions that the page tries to
    match the URL against - nothing fancy.
-   **Remove search engine referrals from the referral log.** Qualifying
    spam referrals are also removed.
-   **Reindex the referrals table and shrink the database.** Do that
    after you clear out the garbage referrals.
-   **See some size statistics on your database.**
-   **See the SQL script that the page will execute** (in the event
    you'd rather run it yourself or are just curious).

And, of course, since all the code is right in the ASPX markup, you can
adjust it as you see fit.

**I have only tested this against Subtext 1.9.5b**, since that's the
version I'm running on. ([I can't upgrade to Subtext 2.0 yet due to the
medium trust
problems.](/archive/2008/08/16/failed-to-upgrade-to-subtext-2.0.aspx))
And, of course, **standard disclaimers apply**: Use at your own risk,
YMMV, I'm not responsible for if this truncates every table in your
database and kicks your mom, etc.

[[**Download
SubtextDatabaseMaintenance195.zip**](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!45427&authkey=!AKusTJz7oa2xhu0&ithint=file%2czip)]

