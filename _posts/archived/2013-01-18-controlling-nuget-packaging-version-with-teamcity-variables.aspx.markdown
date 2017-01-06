---
layout: post
title: "Controlling NuGet Packaging Version with TeamCity Variables"
date: 2013-01-18 -0800
comments: true
disqus_identifier: 1801
tags: [net,gists,build,teamcity]
---
We use [TeamCity](http://www.jetbrains.com/teamcity/) as our build
server and one of the cool things TeamCity has built in is the ability
to serve as a NuGet server. You build your product, run a
`nuget pack `task on it, and TeamCity will automatically add it to the
feed.

One of the somewhat odd things I’ve found with TeamCity’s NuGet server
is that it seems to require that you **let TeamCity run the actual
`nuget pack `on packages it should host**. That is, even if you wanted
to do that action in your build script, you can’t – simply putting the
package into your set of build artifacts doesn’t get it into the feed.
You actually have to use the “NuGet Pack” build step in your build. When
you do that, **the build step ignores any version information you put
inside your .nuspec files** because the “NuGet Pack” build step requires
you to specify the version right there.

That’s fine as long as the build number for the build (or some similar
existing variable) is also the version you want on your NuGet package.
But when you want to have tighter control over it, like calculating the
version as part of a build task, it becomes less clear how to get things
working. This should help you.

**First, you have to establish a NuGet package configuration variable.**
You need this so you can use it in the NuGet Pack build steps. In your
TeamCity build configuration, go to the “Build Parameters” tab and
define a “System Property” with your calculated NuGet package semantic
version. I called mine “CalculatedSemanticVersion” so it ends up showing
in the TeamCity UI as “system.CalculatedSemanticVersion” like this:

![system.CalculatedSemanticVersion = 0.0.0](https://hyqi8g.bl3301.livefilestore.com/y2pFeg7An8kClAI_VWKJNDJ4SYJzPdeeUmPufvsU38-zu8b72Rp5qP2YR_3DoSefJCoF5FIaPL_qjIQToo1aE2nLlbYZx_GXsGxLqxq6mFWiA8/20130118_systemproperty.png?psid=1)
Set it to some simple, default value. It won’t stay that value so it
doesn’t matter; it’s more for when you come back later and look at your
configuration – this way it’ll make a little more sense.

**Next, set up your NuGet Pack build steps.** Use this new
“system.CalculatedSemanticVersion” property as the NuGet package version
you’re building.

![On the NuGet Pack step use the new version variable.](https://hyqi8g.bl3302.livefilestore.com/y2pRui-FHnBIFxxD31O_5-C8SRIYlT8UYi6TG7UBSyy6xwL-wOmJdjGshYff0bTb7hVB39-bvJgGoshBOHT-ckdIozRWOLPIAy7D7jeDLkM-6w/20130118_nugetpackstep.png?psid=1)

**Finally, insert a build script step before all of your NuGet Pack
steps.** In that build script step, calculate the version you really
want for your packages and use a TeamCity message to update the variable
value. You do that by using a specially formatted message written to the
console, like this:

`##teamcity[setParameter name='system.CalculatedSemanticVersion' value='1.0.0-beta1']`

In MSBuild, you might have something that looks like this:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Project
  DefaultTargets="SetVersion"
  xmlns="http://schemas.microsoft.com/developer/msbuild/2003"
  ToolsVersion="4.0">
  <Target Name="SetVersion">
    <!--
      Calculate your semantic version however you like.
      This example uses a made-up build task, but you
      could do anything.
    -->
    <CalculateMySemanticVersion>
      <Output TaskParameter="Version" PropertyName="SemanticVersion" />
    </CalculateMySemanticVersion>
    <!-- The message task here is the important part. -->
    <Message Text="##teamcity[setParameter name='system.CalculatedSemanticVersion' value='$(SemanticVersion)']" />
  </Target>
</Project>
```

Now when your build configuration runs, the script will calculate your
NuGet package version and update the value of the property before the
NuGet Pack tasks run. The NuGet Pack tasks will build your packages
using the correct calculated version that you controlled through script.

