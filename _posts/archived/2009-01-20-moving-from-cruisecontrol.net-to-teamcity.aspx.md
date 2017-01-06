---
layout: post
title: "Moving From CruiseControl.NET to TeamCity"
date: 2009-01-20 -0800
comments: true
disqus_identifier: 1489
tags: [gists,net,build,teamcity]
---
I admit to loving me some good ol'
[CruiseControl.NET](http://confluence.public.thoughtworks.org/display/CCNET/Welcome+to+CruiseControl.NET)
for continuous integration but there's just something to be desired from
the UI and ease-of-use/ease-of-administration standpoint. [CI
Factory](http://cifactory.org/joomla/) brings it a step closer to what
I'm looking for, but after doing some evaluation, we ended up trying out
[TeamCity](http://www.jetbrains.com/teamcity/).

***It's awesome.***

It's easy to set up, easy to administer, flexible, customizable...
really, the experience thus far has been pretty great. At work we're
testing it out with the free Professional edition, but if it works out
on this project, we'll be getting the full Enterprise edition. I know
that if I set up a continuous integration server for
[CR\_Documentor](http://cr-documentor.googlecode.com) it'll definitely
be TeamCity.

That said, there are some differences in how you have to do things in
TeamCity than if you're working in CruiseControl.NET. Here's what I've
found so far. (Note - I'm using MSBuild in my code snippets. If you're
using NAnt or something else, you get to translate.)

**`$(CCNetLabel)` becomes `$(BUILD_NUMBER)`**. In CruiseControl.NET you
access the current build number (e.g., "1.5.10.1234") with the variable
`$(CCNetLabel)`. In TeamCity, it's `$(BUILD_NUMBER)`. Something we've
done to make this easier is creating a variable `$(BuildLabel)`` that we
copy the appropriate value into at the beginning of the script. Doing
that allows you to separate your build script from the build server
proprietary variables.

**Builds are generally done with agents.** In CruiseControl.NET, if you
want to run a private build you drop to the command line and build it
yourself. In TeamCity, you can ship your changes off to the server to
run a personal build. There is a variable provided
`$(BUILD_IS_PERSONAL)` that will equal "true" if the build is running
for an individual rather than as part of the "official" process. You'll
want to update your build script to accommodate both personal builds via
agent and via command line.

This sample shows some MSBuild logic that sets a `$(BuildLabel)` property
based on whether a build is personal or not. It also sets a
`$(CCNetLabel)` property for backwards compatibility with scripts that
might be using that.

```xml
<Project
  InitialTargets="__EnvironmentSetup"
  xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <Target Name="__EnvironmentSetup">
    <CreateProperty Condition="'$(BUILD_NUMBER)' == ''" Value="true">
      <Output TaskParameter="Value" PropertyName="BUILD_IS_PERSONAL"/>
    </CreateProperty>
    <CreateProperty Condition="'$(BUILD_IS_PERSONAL)' == 'true'" Value="0.0.0.0">
      <Output TaskParameter="Value" PropertyName="BuildLabel"/>
    </CreateProperty>
    <CreateProperty Condition="'$(BUILD_IS_PERSONAL)' != 'true'" Value="$(BUILD_NUMBER)">
      <Output TaskParameter="Value" PropertyName="BuildLabel"/>
    </CreateProperty>
    <CreateProperty Value="$(BuildLabel)">
      <Output TaskParameter="Value" PropertyName="CCNetLabel"/>
    </CreateProperty>
  </Target>
</Project>
```

**Use the TeamCity test runner for better integration.** While you can
still use a straight call to, say, NUnit-Console.exe, you get very rich
interaction and reporting in the TeamCity UI if you use the TeamCity
version of the runner for your tests. You'll want your script to "sniff"
and see if it's running on a developer box or in a TeamCity environment
and use the appropriate runner.

This sample shows some MSBuild logic that builds an appropriate test
runner command line for running NUnit 2.4.8 tests based on the
environment. It assumes you have a list of test assemblies in a
`@(TestAsemblies)` collection.

```xml
<PropertyGroup Condition="'$(BuildLabel)'!='0.0.0.0'">
  <TestCommandLineExe>$(teamcity_dotnet_nunitlauncher)</TestCommandLineExe>
  <TestCommandLineArgs>v2.0 x86 NUnit-2.4.8 @(TestAssemblies->'%(FullPath)', ' ')</TestCommandLineArgs>
</PropertyGroup>
<PropertyGroup Condition="'$(BuildLabel)'=='0.0.0.0'">
  <TestCommandLineExe>path\to\NUnit-Console.exe</TestCommandLineExe>
  <TestCommandLineArgs>@(TestAssemblies->'%(FullPath)', ' ') /xml:TestResults.xml</TestCommandLineArgs>
</PropertyGroup>
```

**There are two ways to integrate FxCop into the build.** The first is
to use [the built-in FxCop build
runner](http://www.jetbrains.net/confluence/display/TCD4/FxCop). This
will run just FxCop though, and as a separate step. If you're OK with
not running FxCop as part of your CI build, that's the easiest way to
go. If you want to run the FxCop command line, though, and get the
report into the UI, [you need to use a "service
message"](http://www.jetbrains.net/confluence/display/TCD4/FxCop_#FxCop_-UsingServiceMessages)
- a message to Console.Out in a special format - to tell TeamCity where
to get the report.

This sample shows what a service message to get FxCop command line
output into TeamCity might look like.

```xml
<Message
  Text="##teamcity[importData id='FxCop' file='fxcop-report.xml']"
  Condition="'$(BuildLabel)'!='0.0.0.0'" />
```

**NCover support is manual.** The stock TeamCity code coverage support
is for [EMMA](http://emma.sourceforge.net/). If you want NCover
reporting to show up in the UI, there's a little work to do. [This blog
entry](http://weblogs.asp.net/lkempe/archive/2008/03/30/integration-of-ncover-into-team-city-for-tech-head-brothers.aspx)
shows a great in-depth how-to, but the simple version boils down to:

1.  Set up your HTML coverage report (e.g., the output from
    NCoverExplorer) to be published as a build artifact (along with your
    binary/compiled output).
2.  Update your TeamCity main-config.xml file to [include the
    report](http://www.jetbrains.net/confluence/display/TCD3/Including+Third-Party+Reports+in+the+Build+Results).
    You'll most likely want to comment out the other code coverage
    related report tabs since you probably won't be using them.

For example, if you publish the report as "CoverageReport.html" then
your main-config.xml file might have a line in it like:

```xml
<report-tab title="Code Coverage" basePath="" startPage="CoverageReport.html" />
```

You will probably also want to see a trend report of code coverage over
time. To do that, you need to have your build script publish the data to
TeamCity (again using "service messages") and you need to add the custom
graph to the build dashboard.

The MSBuild logic to publish the code coverage overall percentage to
TeamCity looks like this. Note that in this example, it's assumed that
the output from NCoverExplorer has been written to "CoverageReport.xml"
- adjust your paths as needed.

```xml
<XmlRead XPath="//coverageReport/project/@coverage" XmlFileName="CoverageReport.xml" Condition="Exists('CoverageReport.xml')">
  <Output TaskParameter="Value" PropertyName="CoveragePercent"/>
</XmlRead>
<Message Text="##teamcity[buildStatisticValue key='coveragePercent' value='$(CoveragePercent)']" Condition="'$(BuildLabel)'!='0.0.0.0'" />
```

In your main-config.xml file, you then need to add the custom graph so
it shows up in the build statistics page:

```xml
<graph title="Code Coverage">
  <valueType key="coveragePercent" title="% Coverage" />
</graph>
```

The important bit there is that the value of "key" in the "service
message" matches the value of "key" in the graph description.

**Users set up their own notifications.** In CruiseControl.NET, the
build configuration specifies who gets alerted and to which build
events. I hate that. I get all sorts of notifications I want because I
happen to be on a mailing alias that was added administratively to the
notification list. I can't get out of it. In TeamCity, I get to
configure my personal preferences for my notifications. This can be
weird for some users who wonder why they're not getting notified anymore
- they need to do the work themselves to subscribe.

**Users need to tie their TeamCity accounts to version control system
accounts.** There's a lot of functionality in TeamCity that allows you
to deal with "changes you made." The way TeamCity figures this out is by
each user providing a mapping of their TeamCity account to their
username on the various version control systems they use. The "my
changes" features won't work for people that don't set this up. (There
is no analogous behavior in CruiseControl.NET.)

**Builds aren't done from working copies.** In CruiseControl.NET when
the build server checks out the source, the build is actually run from a
live Subversion working copy. In TeamCity, the code still gets checked
out from Subversion, but none of the Subversion admin directories (.svn)
are there - it's not a working copy, it's an exported checkout. This is
important if your build script tries to do anything with the version
control system like inspect the location from which the current working
copy was checked out. You can mitigate this in TeamCity by providing a
custom environment variable (e.g., `$(BUILD_VCS_ROOT)`) that contains
this information. It won't be dynamic, but it's the best you can do.

**You can't serialize builds.** In CruiseControl.NET there's [a notion
of a "build
queue"](http://confluence.public.thoughtworks.org/display/CCNET/Queue+Configuration)
such that if one build is running, it can "lock" a semaphore and other
builds that require that semaphore won't run until it's free. That sort
of thing is helpful if your build script dynamically registers
third-party assemblies in the GAC for the duration of the build, for
example. There is no such serialization mechanism in TeamCity.

**You can get notified of build events via Google Talk.** Technically
the "Jabber" protocol, but Google Talk nonetheless. You'll need to get
your build server a Google account, but once you do, people can add that
service account to their friends list and configure Google Talk
notifications. [They tell you how to do this in the TeamCity
docs](http://www.jetbrains.net/confluence/display/TCD4/Setting+up+Google+Mail+and+Google+Talk+as+Notification+Servers)
but they don't tell you what to do if port 5222 (the Jabber port) is
blocked off at your firewall - switch to port 80. Here's what works for
me:

-   Server: talk.google.com
-   Port: 80
-   Server user: our-service-account@gmail.com

All in all, TeamCity is the advance in the build server that I was
hoping would come along for CC.NET. It's well worth the time to check
out.

