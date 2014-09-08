---
layout: post
title: "Log Parser Query for NUnit Timings"
date: 2014-09-08 -0800
comments: true
tags: [testing]
---
I've noticed that some of our unit tests are running a little long and I'm trying to figure out which ones are taking the longest. While [TeamCity](http://www.jetbrains.com/teamcity/) has some nice NUnit timing info, it's a pain to build the whole thing on the build server when I can just try things out locally.

If you have NUnit writing XML output in your command line build (using the `/xml:` switch) then you can use [Log Parser](http://www.microsoft.com/en-us/download/confirmation.aspx?id=24659) to query the XML file and write a little CSV report with the timings in it:

`LogParser.exe "SELECT name, time FROM Results.xml#//test-case ORDER BY time DESC" -i:xml -FMode:Tree -o:csv`
