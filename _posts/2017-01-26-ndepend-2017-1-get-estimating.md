---
layout: post
title: "NDepend 2017.1: Get Estimating!"
date: 2017-01-26 -0800
comments: true
tags: [ndepend,dotnet]
description: "NDepend 2017.1 has been released and today I'm looking at my favorite new feature - technical debt estimation!"
---

It's a new year, and with that [comes a new version of NDepend - 2017.1](http://www.ndepend.com/ndepend-v2017). I've [looked at NDepend before]({{ site.url }}/tag/#ndepend) and am a big fan. This time they've added a feature that I'm particularly excited about: [**Technical Debt Estimation**](http://www.ndepend.com/ndepend-v2017#Debt)

One of the challenges I've seen when trying to communicate to non-technical folks about things I find in NDepend is cost. "How much is it going to cost to fix issue X?" Estimation is a tough thing. Now NDepend can help you with that.

First, in your project you need to **configure your Issue and Debt settings.** This is where you set things like...

- How many work hours are in a day / work days in a year?
- What's the average cost of a person-hour (and in which currency)?
- What are the various thresholds that define issue severity levels?

There are quite a lot of configuration options. **Luckily, [NDepend provides a lot of good doc on what the settings mean](http://www.ndepend.com/docs/technical-debt)** so you can configure them based on your project/company. And if you have a lot of projects that use the same settings, you can share the settings with a central `.ndsettings` file.

[![Issue and Debt settings (click to enlarge)]({{ site.url }}/images/20170126_debtsettings_sm.gif)]({{ site.url }}/images/20170126_debtsettings.gif)

For my example, I'm just using the default settings.

Once you have that set up and you run analysis, your dashboard will show you your debt "rating" based on [the SQALE method](http://www.sqale.org/) and estimate the amount of effort to improve the code to the next rating.

![Debt displayed on the dashboard]({{ site.url }}/images/20170126_dashboard.gif)

The little "Explore Debt" button there will open up a query window that shows, for example, how much it would cost to fix each of the various queries you've applied to the code.

![Debt associated with queries]({{ site.url }}/images/20170126_debtperrule.gif)

In this case, you can see that this project has some pretty extensive debt related to the UI talking directly to the data access layer - 47 days' worth if I wanted to fix it all! However, I might be able to fix up some static field naming conventions in a couple of days and save myself a day's worth of interest accumulating each year - head it off before it gets too big.

I can also look at a prioritized list of types to fix - places I might get the biggest bang for my buck.

![Prioritized type list]({{ site.url }}/images/20170126_typepriority.gif)

**How much is it going to cost in terms of _money_, not just _time_?**

Simple enough, just update your Issue and Debt settings to show both time _and_ money...

![Change value format]({{ site.url }}/images/20170126_timemoney.gif)

...and the report automatically updates to reflect that:

![Prioritized type list with time and money displayed]({{ site.url }}/images/20170126_moneyreport.gif)

Obviously it may take some tweaking of the settings to reflect the situation in your environment, but this is a huge help when it comes to communicating cost/benefit when looking to update code that is _working_ but is worth _cleaning up_.

And, of course, you shouldn't let anyone instantly just take it as gospel. It's a _tool_. It will help you get started and make it easier to communicate, but you really shouldn't substitute a generated estimate for something provided by the _people actually doing the work_.

[**Go grab yourself a copy of NDepend 2017 and get estimating!**](http://www.ndepend.com/purchase)

_Full disclosure: I got a free personal license from [Patrick](https://blog.ndepend.com/author/psmacchia/) at NDepend. However, we have also purchased several licenses at work and make use of it to great benefit._
