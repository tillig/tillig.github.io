---
layout: post
title: "Why is Source Control Such a Barrier?"
date: 2014-01-23 -0800
comments: true
disqus_identifier: 1832
tags: [process,github]
---
Yesterday we [moved Autofac over to GitHub](https://github.com/autofac/Autofac).

I'm cool with that. There's a lot of momentum behind Git and GitHub in the source control community and I understand that. [Nick Blumhardt's post on the Autofac forum](https://groups.google.com/d/msg/autofac/GbX3nzqwXyM/xCek1qJ10OMJ) and the [linked Eric Raymond post in the Emacs developer list](http://lists.gnu.org/archive/html/emacs-devel/2014-01/msg00005.html) hit close to home for me – **I wish Mercurial had "won," but Git's fine, too. I don't feel super strongly about it.**\*

In moving, we got a lot of really nice and supportive tweets and posts and it's been a nice welcoming party. That's cool.

Then there have been some puzzling ones, though, and **here's where I switch out of my "Autofac project coordinator person" hat and into my "I'm just a dev" hat**:

[![Thank you for switching! Its been fun to get int eh codebase and look around. :) OSS FTW!]({{ site.url }}/images/20140123_tweet1.png)](https://twitter.com/drusellers/status/426345894225518592)

[![I sometimes get excited by new OSS projects by my heart sinks when I see they're not on github and I lose interest]({{ site.url }}/images/20140123_tweet2.png)](https://twitter.com/adamralph/status/425735212945780738)

Again, I'm not picking on these folks personally, because **I respect them and their skills**. I've seen a few of these and I know (hope?) they won't take it personally that I grabbed theirs out of the bunch. What I want to address is more my puzzlement around the sentiment I see here:

**Why is source control, or a particular source control system, such a barrier?**

In a world where [the polyglot programmer](http://www.hanselminutes.com/277/polyglot-programming-and-net-lessons-learned-with-ivan-towlson-from-mindscape) is becoming more the norm than the exception; where it's pretty common that a single developer can work in more than one environment, on more than one OS, and/or in more than one language... I have a difficult time understanding why version control systems don't also fit into that bucket.

I get that folks might have a personal preference. I'm a [Sublime Text](http://www.sublimetext.com/) guy, not Notepad++. I'm a [CodeRush](https://www.devexpress.com/products/coderush/) guy, not ReSharper. That's not to say I *can't* use those other tools, just that I have *a preference* and I'm more productive when using my preference.

When I see something like "It's been fun to get in the codebase and look around," though, and the [implied] reason that was *somehow possible now when it wasn't before* is because of a switch from Mercurial/Google Code to Git/GitHub?

**That doesn't make sense to me.**

When I see a project that sparks my interest and makes me think I could make use of it, I don't really care what version control system they use.\*\* There's a bit of a "[when in Rome](http://en.wiktionary.org/wiki/when_in_Rome,_do_as_the_Romans_do)" for me there. I mean, honestly, once I pull the NuGet package (or gem, or whatever) down and start using it, and I go to their site to learn more... I don't really lose interest if they're hosting their source in some source control system or with a host I don't prefer. I don't know of an open source site that doesn't let you browse the source through a web interface anymore, so even if I wanted to dig into the code a little, it's not like I have to install any new tools. The "issues" systems on most open source hosting sites are roughly the same, too, so there's no trouble if I want to file a defect or enhancement request.

Sure, there are some things about GitHub that make certain aspects of open source easier, but it's primarily around contribution. I concede that pull requests are nice – I've made a few, and I've taken a few.\*\*\* That said, there are some well established conventions around [things like patch files](http://www.hanselman.com/blog/ExampleHowToContributeAPatchToAnOpenSourceProjectLikeDasBlog.aspx) (remember those, kids?) that have worked for a long time.

**Having a different mechanism of contribution has also never really stopped me. Have you let it stop you? Why?**

I guess I look at these other systems more as an opportunity to learn than as a barrier. Just like I have to learn about your coding conventions in your project, your project's style, the *right* way to fix the issue I found (or add the enhancement) before I can contribute, the version control may be one of those things, too. It's not really that big of a deal, especially considering there's really only Mercurial, Git, and Subversion out there in the open source world and you've covered the 99% case.

Don't get me wrong. I think removing friction is great. [Making easy jobs easy and hard jobs possible](http://www.perl.org/) is awesome. GitHub has been great at that, and I applaud them for it. I just don't think folks should let source control be a barrier. Add the skills to your portfolio. Sharpen the saw. **Have a preference, but don't let it shackle you.**

---

\* *All that said, I can't remember a time when I had more trouble with trivial crap like line endings with any source control system other than Git. And until fairly recently, setting up a decent, working Git environment in Windows (where I spend most of my time) wasn't as straightforward as all that. Obviously my experiences may differ from yours.*

\*\* *Except TFS version control. Anything beyond even the simplest operations is a ridiculous pain. "Workspaces?" Really? Still? It's VSS with "big boy" pants.*

\*\*\* *And, as we all know, pull requests aren't Git, they're GitHub (or the host) because they're workflow items, not source control specific. [BitBucket has pull requests for Mercurial](https://confluence.atlassian.com/display/BITBUCKET/Fork+a+Repo,+Compare+Code,+and+Create+a+Pull+Request).*
