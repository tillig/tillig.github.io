---
layout: post
title: "How to Flush the TeamCity Build Agent NuGet Package Cache"
date: 2016-11-25 -0800
comments: true
tags: [teamcity,dotnet,build]
description: "Tired of logging into each TeamCity build agent to flush the NuGet cache? Here's the answer."
---
I've run across more than my fair share of times, particularly early on in a project, where I need to flush the NuGet package cache for my TeamCity build agents. This has usually involved connecting to each agent in Remote Desktop and doing some manual commands or delete operations.

No more!

**Instead of manually flushing the NuGet package cache, create a build configuration that does it for you.**

Create a build configuration that isn't attached to any source. The point of this build is to execute a script _as the build user_ so the appropriate package cache gets cleared.

In the build configuration, add a single "Command Line" build step. Set the working directory to `%teamcity.tool.NuGet.CommandLine.DEFAULT%\tools` - this is where TeamCity has its default NuGet command line installation. For the custom script, put this:

```batch
echo ##teamcity[buildNumber '%build.counter% (%teamcity.agent.name%)']
nuget.exe locals -clear all
```

The first line sets the build number so you can see which agent ran it easily from the top-level dashboard. The build number will look like `#24 (my-agent-name)` The second line runs the actual NuGet package cache clearing command to ensure all the various cache locations get purged.

Now all you need to do is queue a build and target the agent you want to flush - it runs in a second or two and you're done. No more need to connect and do it all manually.
