---
layout: post
title: "SharePoint Portal Server 2003 Search Web Service Tester"
date: 2004-06-18 -0800
comments: true
disqus_identifier: 589
tags: [downloads,net,sharepoint]
---
If you work with SharePoint Portal Server 2003, you've probably messed
around a bit with creating web parts or maybe automating some of the
routine administration tasks, but have you tried accessing the search
web service?

 There are articles out there telling how to [integrate the search web
service with the Office 2003 Research
Pane](http://weblogs.asp.net/soever/archive/2004/01/28/63576.aspx),
there's documentation on the [schemas for querying the search
service](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/rssdk/html/rsReferenceSchemas.asp),
but if you [look at the SDK
documentation](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/spptsdk/html/mSPSQueryServiceQuery.asp),
there's really no example for what the query itself should look like. I
mean, I can figure out [how SQL Server full-text queries
work](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/acdata/ac_8_qd_15_2ncj.asp),
but what's the source I'm querying? When you put everything together,
what are you really sending to the web service, and, more importantly,
what's coming back?

 To answer this, you could use something like
[SOAPscope](http://www.mindreef.com/) and start watching packets that
way, but you're still going to be putting things together in a sort of
trial-and-error fashion, hoping your packet is formed right, etc.

 Instead, I created a little app specifically for this: Give it the URL
of your server's search web service, enter your search terms (the
keywords for a "keyword" search; the SQL full-text query SELECT
statement for a "SQL Fulltext" search) and click "Execute Query" - the
program goes out to your search service, registers to search, gets the
list of available catalogs and search scopes, and executes your query.
You can see the form the query packet takes and the results you received
from that query. You also have the option of changing search settings to
different limits - start at a particular record number in the results,
retrieve a certain number of results, only retrieve certain types of
results, etc.

 ![SPS Search Test - Displaying the query
packet](https://hyqi8g.blu.livefilestore.com/y2pMtMPZR4fW2WHPXn1IFI13T2ghEus61N1nvEamcJBCTAmQG931joSA1n3GTIKRQxdfb561TEeg_ZrAUP_C7uD4alsaB1irI22o2ElRSzrqhQ/20040618spssearchtest_querypacket.gif?psid=1)

 **Note: While this is a very helpful tool to test out queries and see
if they work, I still don't have any real documentation about the form
of full-text queries for SPS.** I'm working on getting some information
from Microsoft on this, to find out which fields I can query for/against
and how to determine that for different servers, as well as figuring out
what different errors mean. When I have more, I'll update this entry.
(The only queries I've gotten to work are variations on
`SELECT "DAV:href" FROM Non_Portal_Content..SCOPE() WHERE size > 0`
so... I'll keep you posted. It doesn't seem to work like the SPS 2001
queries did, though.)

 **UPDATE: 6/18/04 11:00 AM** - It turns out they [embed the entire SQL
query that gets run on the Advanced Search page *right in the
source*](/archive/2004/06/18/how-to-figure-out-sharepoint-portal-server-2003-full-text-query.aspx).

 Also, I'll be updating the app as I learn more about the search
functionality so I can offer more flexibility in the querying.

[**Download SPSSearchTest 1.1.0
(MSI)**](https://github.com/tillig/SharePointSearchTest/releases/download/v1.1.0/SearchTestSetup_1.1.0.msi)

[**Download SPSSearchTest Source 1.1.0
(ZIP)**](https://github.com/tillig/SharePointSearchTest/archive/v1.1.0.zip)

 **Version History**
 1.1.0:
 - Added syntax highlighting for SQL queries using the
[ICSharpCode.TextEditor](http://www.icsharpcode.net/OpenSource/SD/)
control.
 - Moved view and query options into menus.
 - Now showing the Registration Request packet.
 1.0.1 - First public release.
 1.0.0 - Internal/unreleased version (still needed more functionality
for prime time).
