---
layout: post
title: "Custom Web Part Property Restrictions"
date: 2003-12-11 -0800
comments: true
disqus_identifier: 420
tags: [Web Development]
---
After a nice call to Microsoft Developer Support, I learned the root of
some of my web part development troubles and thought I'd share the
[undocumented] wealth with the community.
 
 Web part properties can only be:
-   string
-   bool
-   int
-   float
-   enum
-   System.DateTime
-   System.Drawing.KnownColor

The reason for this is that they use their own custom XML Serializer,
not the standard one that .NET Framework ships with. (That's why I keep
getting errors when I try to save custom classes as properties. Even if
they're marked Serializable and have all the XML Serialization info
attached to them, you can't do it. This is all you get.)
 
 So I guess my way around that's going to have to be to XML Serialize my
custom class, then save that as a string in the web part. What a pain.
