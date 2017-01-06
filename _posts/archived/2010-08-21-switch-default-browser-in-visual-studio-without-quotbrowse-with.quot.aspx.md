---
layout: post
title: "Switch Default Browser in Visual Studio without &quot;Browse With...&quot;"
date: 2010-08-21 -0800
comments: true
disqus_identifier: 1662
tags: [web,vs]
---
Visual Studio has [a nasty habit of forgetting your default browser
settings at seemingly arbitrary
times](https://connect.microsoft.com/VisualStudio/feedback/details/568469/vs2010-forgets-default-browser-settings).
Couple that with the fact that you can only really switch your default
browser in VS using this "Browse With..." context menu on a browsable
ASPX or HTML page (and the fact that in your MVC solutions you probably
don't have a directly browsable ASPX or HTML page) and this whole thing
is a nightmare.

[Enter Hanselman, who has posted a Powershell solution to the problem.
YAY!](http://www.hanselman.com/blog/HowToChangeTheDefaultBrowserInVisualStudioProgrammaticallyWithPowerShellAndPossiblyPokeYourselfInTheEye.aspx)

