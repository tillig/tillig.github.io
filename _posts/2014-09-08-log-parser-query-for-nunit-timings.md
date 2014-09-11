---
layout: post
title: "Log Parser Query for NUnit Timings"
date: 2014-09-08 -0800
comments: true
tags: [testing]
---
I've noticed that some of our unit tests are running a little long and I'm trying to figure out which ones are taking the longest. While [TeamCity](http://www.jetbrains.com/teamcity/) has some nice NUnit timing info, it's a pain to build the whole thing on the build server when I can just try things out locally.

If you have NUnit writing XML output in your command line build (using the `/xml:` switch) then you can use [Log Parser](http://www.microsoft.com/en-us/download/confirmation.aspx?id=24659) to query the XML file and write a little CSV report with the timings in it:

`LogParser.exe "SELECT name, time FROM Results.xml#//test-case ORDER BY time DESC" -i:xml -fMode:Tree -o:csv`

A little fancier: take all of the tests across several reports and write the output to a file rather than the console:

`LogParser.exe "SELECT name, time INTO timings.csv FROM *.xml#//test-case ORDER BY time DESC" -i:xml -fMode:Tree -o:csv`

And fancier still: Take all of the reports across multiple test runs and get the average times for the tests (by name) so you can see which tests over time run the longest:

`LogParser.exe "SELECT name, AVG(time) as averagetime INTO timings.csv FROM *.xml#//test-case GROUP BY name ORDER BY averagetime DESC" -i:xml -fMode:Tree -o:csv`
