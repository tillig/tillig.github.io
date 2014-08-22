---
layout: post
title: "CR_Documentor 1.7.3.1207 Released"
date: 2005-12-07 -0800
comments: true
disqus_identifier: 929
tags: [Release Notices]
---
The new version is out and is primarily a bug fix release - hopefully
some alleviation of problems for the VS 2005 users.
 
Fixed bug that would cause VS 2005 to throw an exception on shutdown if
the CR\_Documentor window had been displayed during the session.

Fixed bug that would display a security warning in the CR\_Documentor
window for VS 2005 users. CR\_Documentor now executes the preview in the
"Local Intranet" security zone.

 
 [Go get
it!](/archive/2004/11/15/cr_documentor---the-documentor-plug-in-for-dxcore.aspx)
 
 Big thanks to Max and the rest of the
[DevExpress](http://www.devexpress.com) support team for being so
responsive and pointing me in the direction for the
exception-on-shutdown bug as well as for testing it out for me to make
sure it was fixed. Also thanks to Scott Grosch and Chuck McGavern for
reporting the bugs and helping test - if folks don't tell me something's
wrong, I can't fix it!
