---
layout: post
title: "Analyze .csproj Files With PowerShell"
date: 2018-05-07 -0800
comments: true
tags: [gists,net,powershell,xml]
description: "Got huge reams of .csproj (or other XML) files to analyze? PowerShell to the rescue."
---

I'm doing a lot of analysis work across a huge set of .csproj files to figure out some overall statistics. For example, what's the target framework version for all of the projects?

PowerShell to the rescue! All the .csproj files are XML, so we can get the whole set of target frameworks for a set of repositories cloned under a common top-level folder with a single command pipeline.

{% gist 193af9315eba0feca025d3f6ebc27aee %}

The output of that will look something like...

```
Count Name                      Group
----- ----                      -----
  698 v4.5                      {v4.5, v4.5, v4.5, v4.5...}
   42 v3.5                      {v3.5, v3.5, v3.5, v3.5...}
  160 v4.0                      {v4.0, v4.0, v4.0, v4.0...}
    6 v4.5.1                    {v4.5.1, v4.5.1, v4.5.1, v4.5.1...}
    3 v2.0                      {v2.0, v2.0, v2.0}
    2 v4.5.2                    {v4.5.2, v4.5.2}
    3 v4.0.1                    {v4.0.1, v4.0.1, v4.0.1}
```