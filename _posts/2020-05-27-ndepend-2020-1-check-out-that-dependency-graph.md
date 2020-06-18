---
layout: post
title: "NDepend v2020.1 - Check Out That Dependency Graph!"
date: 2020-05-27 -0800
comments: true
tags: [ndepend,net,vs]
description: "I'm a long time fan of NDepend, but this new version has an insane update to the dependency graph and it's a total game changer. Check it out!"
---

I love NDepend and I've been using it for a long time. It's a great way to get a big-picture view of your application code whilst still being able to drill in for good details. However, I have to say, the latest version - v2020.1 - has _the coolest_ dependency graph functionality. It's a total overhaul of the feature and I think this is going to be my new go-to view in reports.

First, it's worth [checking out the video](https://youtu.be/23fBxM2v22k) that walks you through how to use it. The help videos are great and super valuable.

<iframe width="560" height="315" src="https://www.youtube.com/embed/23fBxM2v22k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I watched this and had to try it out. I went and grabbed the [Orchard Core codebase](https://github.com/OrchardCMS/Orchardcore) which is one solution with 156 projects in it, at the time of this writing.

I got the new version of NDepend and installed the VS extension. It's interesting to note there's still a VS 2010 version of the extension available. Are you still using VS 2010? Please upgrade. Please. Also stop using IE.

![Install NDepend extension for VS]({{ site.url }}/images/20200527_ndependext.png)

I loaded up the Orchard Core solution, fired up a new NDepend project for it, and ran the analysis. (If you don't know how to do this, [there is _so much help_ on it, just waiting for you.](https://www.ndepend.com/docs/videos)).

After that, I dived right into the new dependency graph. And... wow. Orchard Core is big. Here's the initial eye chart you get, but _don't be overwhelmed_ - it's a high-level view, right, like looking at a map of the world. I didn't even bother letting you click to zoom in because it's just too much.

![The Orchard Core map of the world, in dependency graph form]({{ site.url }}/images/20200527_orchardworld.png)

I decided to start by looking at things the main `OrchardCore.Cms.Web` application references, to get a more specific picture of what the app is doing. I went to Solution Explorer and dragged the `OrchardCore.Cms.Web` project right into the Dependency Graph. This highlighted the project on the graph so I could zoom in.

![OrchardCore.Cms.Web dependency graph]({{ site.url }}/images/20200527_ocwdependencies.png)

Looking at that, I noticed the red double-ended arrows under `OrchardCore.DisplayManagement.Liquid`. Hmmm. Let's zoom in and check that out.

![OrchardCore.DisplayManagement.Liquid dependency graph]({{ site.url }}/images/20200527_odmldependencies.png)

Hmmm. There are three codependencies there, but let's just pick one to figure out. Seems the `OrchardCore.DisplayManagement.Liquid` namespace uses stuff from `OrchardCore.DisplayManagement.Liquid.Tags`, but the `Liquid.Tags` namespace also uses stuff from the parent `Liquid` namespace. What exactly is that?

Easy enough to find out. Double-click on that double-arrow or right-click and select "Build a Graph made of Code Elements involved in this dependency."

![Dive into the OrchardCore.DisplayManagement.Liquid codependency graph]({{ site.url }}/images/20200527_buildelementgraph.png)

Whoa! Another really tall graph. You can see OrchardCore.DisplayManagement.Liquid.LiquidViewTemplate calls a _bunch_ of stuff in the `OrchardCore.DisplayManagement.Liquid.Tags` namespace... but... what's that little arrow at the bottom being called by `OrchardCore.DisplayManagement.Liquid.Tags.HelperStatement.WriteToAsync`?

![OrchardCore.DisplayManagement.Liquid codependency graph]({{ site.url }}/images/20200527_elementgraph.png)

That looks like the culprit. Let's just zoom in.

![OrchardCore.DisplayManagement.Liquid.ViewBufferTextWriterContent is the culprit!]({{ site.url }}/images/20200527_theculprit.png)

Aha! There is _one class_ being referenced from the `Liquid.Tags` namespace back to the `Liquid` namespace - `OrchardCore.DisplayManagement.Liquid.ViewBufferTextWriterContent`. That's something that may need some refactoring.

All done here? Click the "application map" button to get back to the top level world map view.

![The application map button]({{ site.url }}/images/20200527_appmap.png)

That's a really simple example showing how easy it is to start at the world view of things and explore your code. There's so much more to see, too. You can...

- Change the clustering and grouping display to get as high or low level as you want - maybe in simpler apps you don't want to group as much but in more complex apps you want to be more specific about the grouping.
- Show or hide third-party code - by default it's hidden, but have you ever wondered how many dependencies you have on something like log4net?
- Run a code query [using CQL](https://www.ndepend.com/docs/cqlinq-syntax), put your cursor over a result, and see the corresponding item(s) highlighted in the dependency graph.

Truly, [check out the video](https://youtu.be/23fBxM2v22k), it's six minutes of your time well spent.

I'm going to go start loading up some source from some other projects (things I maybe can't provide screen shots of?) and see if there are some easy refactorings I can find to improve them.
