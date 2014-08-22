---
layout: post
title: "How To Figure Out SharePoint Portal Server 2003 Full-text Query Syntax"
date: 2004-06-18 -0800
comments: true
disqus_identifier: 590
tags: [Web Development]
---
It has come to my attention that at this time there are no real
documents out there (at all - even internal to Microsoft) that discuss
the ins and outs of querying SPS 2003 via the search web service and
fulltext search queries. Nobody seems to have the magic answer as to how
to formulate the query - what you can SELECT, what goes in the WHERE
clause, etc.
 
 I don't have the answer, but I know how you can get a jumpstart on
figuring out how it works.
 
 On the SharePoint Portal Server 2003 "advanced search" page (the one
that allows you to search over document metadata), do a search. Once you
get the results you want, do a "View Source." Scroll down near the
bottom (or search for "SELECT" - match the upper case letters, too) and
check this out: **They embed the entire SQL full-text query right in the
page.**
 
 Apparently that's how the MS guys figure out how the thing works; if it
works for them, it should work for you, too. Good luck!
