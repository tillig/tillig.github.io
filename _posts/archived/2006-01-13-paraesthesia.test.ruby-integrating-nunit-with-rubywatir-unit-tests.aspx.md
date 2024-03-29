---
layout: post
title: "Paraesthesia.Test.Ruby - Integrating NUnit with Ruby/Watir Unit Tests"
date: 2006-01-13 -0800
comments: true
disqus_identifier: 943
tags: [downloads,testing,dotnet,aspnet,build]
---
Testing ASP.NET web applications can be a painful process. Wouldn't it
be nice to have a unit testing framework that covered both the API and
the web UI testing in an integrated fashion?

 I put up a CodeProject article discussing how to integrate the NUnit
test framework for API unit testing with the Ruby/Watir test framework
for web UI testing so you can run all of your tests from one spot and
see all the results aggregated. (Note: the test execution mechanism
doesn't actually involve NUnit proper, so it can be applied to other
similar testing frameworks like the VS 2005 test suite - just use the VS
2005 test method/fixture attributes rather than the NUnit ones; no
change to the Ruby/Watir test executor needed!)

 ![NUnit and Ruby tests living side by
side](https://cloud.githubusercontent.com/assets/1156571/21693187/d1ace466-d334-11e6-841e-3771bb6709b2.gif)

**[View the CodeProject
Article](https://www.codeproject.com/Articles/12696/Integrated-ASP-NET-Web-Application-Testing-with-NU)**

**[Download Paraesthesia.Test.Ruby 1.1.3.0
Installer](https://github.com/tillig/RubyTestExecutor/releases/download/v1.1.3/Paraesthesia.Test.Ruby_1.1.3.0_install.zip)**

**[Download Paraesthesia.Test.Ruby 1.1.3.0
Source](https://github.com/tillig/RubyTestExecutor/archive/v1.1.3.zip)**

 **Version History:**
 **1.1.3.0**: First version with release of CodeProject article.
