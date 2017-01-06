---
layout: post
title: "SQL Server Full Text Search Differs By Platform"
date: 2004-07-14 -0800
comments: true
disqus_identifier: 615
tags: [GeekSpeak]
---
Here's an interesting tidbit for you. We are currently trying to do some
work via the search web service in SharePoint Portal Server 2003. (You
may have seen my [test app that I wrote for checking out searches and
results via that web
service](/archive/2004/06/18/sharepoint-portal-server-2003-search-web-service-tester.aspx).)
 
 Seems there's an internal debate at Microsoft over which team should be
handling our support call - the SQL Server team or the SharePoint team.
See, we're having trouble getting metadata returned correctly when
executing full text searches. At first we thought it was an iFilter
problem or maybe something weird with our setup...
 
 Turns out SQL Server handles full text queries *differently based on
the platform it's installed on - Windows 2000 server vs. Windows 2003
server*. I didn't get any details on exactly what the differences are
(I'm only peripheral on the case; another developer here is actually
talking directly to the support folks), but that's the situation.
 
 One would think that it shouldn't matter what platform the product is
installed on, it should consistently handle queries the same. Maybe
different optimization or something, but the actual syntax possibly
being different? It boggles the mind.
