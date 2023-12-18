---
layout: post
title: "SNInfo - Strong-Naming Info for .NET Assemblies"
date: 2005-02-07 -0800
comments: true
disqus_identifier: 742
tags: [downloads,dotnet]
---
I've been working on tracking down different assemblies' strong naming
information this morning and I've decided that `sn -T [assemblyname]` is
a big pain in the rear, so I threw together an app I'm sure is out there
plentifully already yet I couldn't be bothered to search for. If it's
out there, great. If it's not, here you go.

 This utility is a simple Windows forms app that allows you to drag a
.NET assembly onto it and view the strong name information about it.
You can copy/paste any of the information directly, plus I even threw in
a little thing that will generate a sample binding redirect you can put
in your app.config file.

 ![SNInfo Main
Form]({{ site.url }}/images/sninfo.gif)

 I wouldn't want them to just put this in the properties on the assembly
or anything.

[**Download SNInfo
1.1.0.0725**](https://github.com/tillig/sninfo/archive/v1.1.0.zip)

[**Download SNInfo 1.1.0.0725
source**](https://github.com/tillig/sninfo/releases/download/v1.1.0/SNInfo_1.1.0.0725.zip)

 **Version History:**

- **1.1.0.0725:**
  - Converted to .NET 2.0.
  - Added binding redirect generation (for easy copy/paste of
        binding redirect configuration).

- **1.0.2.1101:**
  - Added main menu bar (thanks to James McShane for pushing this
        one over to me).

- **1.0.1.0:**
  - First release.
