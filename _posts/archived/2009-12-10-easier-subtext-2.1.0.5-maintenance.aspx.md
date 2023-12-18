---
layout: post
title: "Easier Subtext 2.1.0.5 Maintenance"
date: 2009-12-10 -0800
comments: true
disqus_identifier: 1595
tags: [subtext,blog,aspnet,sql,downloads]
---
Last year about this time [I posted a database maintenance
page](/archive/2008/12/05/easier-subtext-1.9.5b-database-maintenance.aspx)
that I created for cleaning up Subtext database things. Since then I've
upgraded to Subtext 2.1.0.5 and, while the old page still works, my blog
has become more popular so the referral cleanup is more difficult. There
are so many records coming in that even with a long timeout set, there's
too much and the delete operation times out. That leaves a huge amount
of junk in the transaction log and is just problems.

I updated the page so you can select which referrers you want to delete
using a checkbox list and the number of referrals deleted at any given
time is 1000 so you don't have to worry about the timeout issue. Again,
this page will let you:

- **Clear the error log.** Yes, you can do this from the error log
    page, too, but it's nice to have all of this in a central location.
- **See how many referrals you have in your database vs. how many of
    those are from search engines.** The page lists out what qualifies
    as a search engine or spam referral so you'll know what this means.
    It's basically just a list of expressions that the page tries to
    match the URL against - nothing fancy. This new version only shows
    you the matches from the selected search engines, though.
- **Remove search engine referrals from the referral log.** Qualifying
    spam referrals are also removed.
- **Reindex the referrals table and shrink the database.** Do that
    after you clear out the garbage referrals.
- **See some size statistics on your database.**

Download the zip file, then drop the enclosed ASPX page in your Subtext
"Admin" folder. It's an administration page so you do have to be logged
in as an admin to use it. It doesn't add any navigation links to the
admin site, so you do need to manually enter the URL to the page to get
to it.

[[**Download
SubtextDatabaseMaintenance2105.zip**](https://gist.github.com/tillig/73b0d5c676189f9d70dce65ba44ca9d1/archive/833a2d830ea1f7884b39876df5313e2bab2bc1f7.zip)]
