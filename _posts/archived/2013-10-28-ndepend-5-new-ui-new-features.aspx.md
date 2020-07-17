---
layout: post
title: "NDepend 5 - New UI, New Features"
date: 2013-10-28 -0800
comments: true
disqus_identifier: 1828
tags: [net,ndepend]
---
I've been using [NDepend](http://www.ndepend.com) for a while – [since
version 2.7](/archive/2008/03/28/ndepend-analyze-your-code.aspx) – and
each release is always noticeably better than the last. [Version 4 last
year brought with it some of the best stuff with
CQLinq](/archive/2012/08/10/ndepend-4-cqlinq-ndepend-api-and-beyond.aspx)
and seemed to focus a lot on enhancing the internals and technical
usefulness. The latest version, version 5, focuses on the UI and the
general user experience.

[The NDepend site actually has a great
overview](http://www.ndepend.com/NDependV5.aspx) of the new features,
and [Patrick Smacchia has a sort of case study explaining the UI
enhancements](http://codebetter.com/patricksmacchia/2013/09/18/rich-ui-enhancement-a-case-study/),
so I suggest you check those out.

The UI enhancements are immediately apparent when you fire up the
application.

[![NDepend 5 startup
screen]({{ site.url }}/images/20131028_loadscreen_sm.png)](http://sdrv.ms/1aC6H0V)

Everything is a lot cleaner and more modern feeling. You don't realize
how much of an impact that has on it until you're actually using it.

Things are generally much easier to find and figuring out "what to do
next" after running analysis isn't nearly as challenging as it used to
be. **My complaint from version 4 about the UI being a bit confusing is
pretty much gone.** The updated menus combined with the dashboard screen
(see below) have pretty well solved that issue.

**The two coolest improvements that immediately caught my eye were the
new dashboard and the update to the HTML report format.**

On running the analysis, you are now presented with a dashboard screen
that has several metrics and trend graphs. Particularly from a long-term
reporting standpoint, these trend graphs are fantastic. You can track
how the application is changing over time and very easily communicate
that in a visual format. (My screen shot below doesn't show trends
because I only ran it once but you see where they'd go and so on.)

[![The new NDepend dashboard screen with trend
graphs]({{ site.url }}/images/20131028_dashboard_sm.png)](http://sdrv.ms/1dERNdd)

You can customize that dashboard to your heart's content – every graph
has a little set of editing buttons that let you customize and the
definitions for those are all stored along with the project.

The HTML report is now also much cleaner. It offers the same great level
of detail, but the presentation is such that it's not all on One
Gigantic Page.

[![HTML report from
NDepend]({{ site.url }}/images/20131028_report1_sm.png)](http://sdrv.ms/18vKxIG)

The navigation menu on the side slides out when you mouseover and that's
how you get to the detailed info.

![NDepend report
menu]({{ site.url }}/images/20131028_report2.png)

One really cool internal enhancement is that you can define what
`JustMyCode` means so your queries over `JustMyCode` are more precise.
You do this by prefixing your query with `notmycode` like:

    notmycode
    from a in Application.Assemblies where
    !a.NameLike("Foo")
    select new { a, a.NbILInstructions }

That way when you query over `JustMyCode` you get a more specific set of
results:

    // This will behave based on your definition of JustMyCode
    warnif count > 0 from t in JustMyCode.Types where
    t.NbLinesOfCode > 500
    orderby t.NbLinesOfCode descending
    select new { t, t.NbLinesOfCode }

*Really slick.*

I mentioned to Patrick that **it would be nice to be able to define
"named code sets" in a similar fashion** and reuse those in other
queries. In my case, I have a fairly large application, but some of the
application assemblies that I want analyzed shouldn't be counted against
the application in coverage analysis. There's no way to exclude full
assemblies from coverage reporting easily because there are several
queries that define the metrics – you'd have to copy/paste the "where"
clauses across all of them and keep them in sync. Instead, it'd be cool
if you could do something similar to the `JustMyCode` thing where you
could define a named set of code (e.g., the set of assemblies on which I
want coverage analysis) and then reuse that named set in coverage
queries – update the definition once, all the coverage queries get
updated.

**My number one issue with NDepend still persists to version 5** – you
still can't use environment variables in framework folder paths. [Just
as in version
4](/archive/2012/08/10/ndepend-4-cqlinq-ndepend-api-and-beyond.aspx),
this is sort of a showstopper when it comes to running NDepend in server
farms as part of your build process where the Windows folder and Program
Files folder are potentially not on the same drive on every server.

Regardless, **NDepend 5 is definitely worth the upgrade**. It's clean
and modern, much easier to use, the reports are easier to navigate, and
it remains one of the more valuable tools in my toolbox. [Head over to
NDepend](http://www.ndepend.com) and check it out. The base of [overview
videos and documentation](http://www.ndepend.com/GettingStarted.aspx)
has been constantly growing so you can actually see it in action doing
pretty much anything.

*Full disclosure: I got a free personal license
from [Patrick](http://codebetter.com/patricksmacchia/) at NDepend.
However, we have also purchased several licenses at work and make use of
it to great benefit.*

