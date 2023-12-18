---
layout: post
title: "Finding Duplicates in RESX Using XSLT"
date: 2006-04-06 -0800
comments: true
disqus_identifier: 982
tags: [gists,xml]
---
[Hanselman](http://www.computerzen.com) pointed out to me yesterday that
[Dan Suceava posted a VS
add-in](http://blogs.axosoft.com/dans/archive/2006/04/03/2266.aspx) that
finds duplicate RESX items by ID and prints out the duplicate names in a
report.

Now, I'm all over VS add-ins and adding cool functionality to the
development environment, but this feels a lot like overkill to me. I
admit I didn't go download the thing because, as neat as it sounds, it
occurs to me that you could just jam a 10 minute XSLT together and find
out the answer that way. (And who knows - the add-in may be doing just
that.)

So, for those interested, here's a quick-and-dirty XSLT that will go
through a RESX file and print out a list of duplicate resources by ID
along with a count of how many were found:

```xml
<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/root">
    <xsl:for-each select="data">
      <xsl:variable name="dataName" select="@name" />
      <xsl:variable name="currPosition" select="position()" />
      <xsl:variable name="numDups" select="count(/root/data[@name = $dataName])" />
      <xsl:variable name="numBefore" select="count(/root/data[@name = $dataName and position() &lt; $currPosition]/@name)" />
      <xsl:if test="$numDups &gt; 1 and $numBefore = 0"><xsl:value-of select="$dataName" /> (<xsl:value-of select="$numDups" />)&#0013;</xsl:if>
    </xsl:for-each>
  </xsl:template>
</xsl:stylesheet>
```

 A sample report might look like this:

```text
    ResourceID1 (3)
    ResourceID4 (2)
    ResourceID7 (4)
```

 Used in conjunction with a command-line tool like
[nxslt](http://www.xmllab.net/Products/nxslt/tabid/62/Default.aspx),
you're set - specify your RESX file as the input XML, and the above as
the style sheet. Done!
