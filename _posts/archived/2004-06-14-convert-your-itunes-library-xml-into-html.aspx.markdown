---
layout: post
title: "Convert Your iTunes Library XML into HTML"
date: 2004-06-14 -0800
comments: true
disqus_identifier: 587
tags: [downloads,media,music]
---
I've seen a few ways to do this out there, usually involving a Perl
script of some nature, but why go to the hassle? When iTunes exports the
XML, just transform it using an XSL style sheet to convert to HTML. This
might not be as easy for the lay user, but it is certainly better than
manually scripting it.

 First, download
[itunes2html.xsl](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!45399&authkey=!AF9UiQVmyJO_DrY&ithint=file%2cxsl)
and put it in the same folder as the exported library XML file.

 That's it. If you open the document in a browser that knows XML (like
IE6), the XML will automatically be displayed after being transformed to
HTML. Copy and paste the results into Excel, if you want. Works pretty
well. Note that to actually get HTML source out of the thing, you'll
have to use a command line transform utility like
[MSXSL](http://www.amazon.com/exec/obidos/ASIN/http://www.microsoft.com/downloads/details.aspx?FamilyId=2FB55371-C94E-4373-B0E9-DB4816552E41&displaylang=en/mhsvortex).
