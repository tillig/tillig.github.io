---
layout: post
title: "TypeMock, NUnit and NCover Together in MSBuild"
date: 2008-02-07 -0800
comments: true
disqus_identifier: 1345
tags: [Code Snippets,.NET]
---
Getting [TypeMock](http://www.typemock.com),
[NUnit](http://www.nunit.org/), and [NCover](http://ncover.org/) to work
together in your build script can sometimes be a tricky thing. Getting
any one of those things to work individually is easy enough, getting two
going is a little tougher, but getting all three together requires a bit
of finesse. Add to that the fact that you may run different versions of
different products (different NUnit versions, for example) for different
source code bases and it gets downright complicated.

The way my product code works, when I check out the codeline I want to
work on it comes with all of the dependencies - every third party
assembly, every build tool. That includes TypeMock, NUnit, and NCover.
That way the build server doesn't have to have anything installed when
it runs a build - it can auto-deploy TypeMock, register NCover, do its
thing, and undo all of that when it's done. (Yes, there are some
drawbacks to that - parallel builds are limited when registered versions
of profilers change, for example - but we've dealt with that sort of
thing in other ways.)

On developer workstations, we have TypeMock installed so we can make use
of the tracer and other helpful utilities, but on the build server, we
auto-deploy TypeMock.

Since TypeMock is a profiler, if you use it in your unit tests, you
can't just run NUnit in the build and have it work - you have to start
TypeMock, then run NUnit, then shut TypeMock back down. If you're using
NCover, you have to make sure NCover is registered and linked with
TypeMock.

TypeMock comes with some custom build tasks to help you get this
working. You will also want to get [NCoverExplorer and
NCoverExplorer.Extras](http://www.kiwidude.com/dotnet/DownloadPage.html)
to get this working well. NCoverExplorer will aggregate coverage logs
for you and NCoverExplorer.Extras comes with NCover and NCoverExplorer
MSBuild tasks.

The general flow of what needs to happen is this:

1.  Register TypeMock with the system (if it's not a developer
    workstation - our devs have it installed).
2.  Register NCover with the system.
3.  Start TypeMock and link it with NCover.
4.  Run NCover and pass it the command line parameters to run your NUnit
    tests. Tell it which assemblies to profile.
5.  Stop TypeMock.
6.  Unregister NCover with the system.
7.  Use NCoverExplorer to aggregate the coverage reports into a single
    report.
8.  On error, stop TypeMock and unregister NCover.

Here's the example:

    <?xml version="1.0" encoding="utf-8" ?>
    <Project xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
      <!-- Register the tasks necessary for running tests and coverage. -->
      <Import Project="Relative\Path\To\TypeMock.NET\TypeMock.MSBuild.Tasks"/>
      <UsingTask
        TaskName="NCover"
        AssemblyFile="Relative\Path\To\NCoverExplorer.Extras\NCoverExplorer.MSBuildTasks.dll"/>
      <UsingTask
        TaskName="NCoverExplorer"
        AssemblyFile="Relative\Path\To\NCoverExplorer.Extras\NCoverExplorer.MSBuildTasks.dll"/>

      <PropertyGroup>
        <!-- Property indicating we're building on a dev machine - build server will set this to false. -->
        <DeveloperBuild>true</DeveloperBuild>
        <!-- Property indicating where build logs will go. -->
        <BuildLogDirectory>Relative\Path\To\Logs</BuildLogDirectory>
      </PropertyGroup>

      <Target Name="test">
        <!-- Register TypeMock only if it's the build server - it'll already be on a developer box. -->
        <TypeMockRegister
          Company="YOUR COMPANY"
          License="YOUR LICENSE"
          AutoDeploy="true"
          Condition="'$(DeveloperBuild)'!='true'"/>

        <!-- Register NCover so it's available for TypeMock. -->
        <Exec Command="regsvr32 /s &quot;Relative\Path\To\NCover\CoverLib.dll&quot;"/>

        <!-- Start TypeMock and link it with NCover. -->
        <TypeMockStart Link="NCover"/>

        <!-- Enumerate the test assemblies you'll be executing with NUnit. -->
        <CreateItem Include="Your\Build\Ouptut\*.Test.dll">
          <Output TaskParameter="Include" ItemName="UnitTestAssemblies"/>
        </CreateItem>

        <!-- Create the folder where unit test and coverage logs will go. -->
        <MakeDir Directories="$(BuildLogDirectory)"/>

        <!-- Run NUnit through NCover so profiling happens. -->
        <!-- Note the use of "batching" so this is equivalent to a "foreach" loop in MSBuild. -->
        <NCover
          ToolPath="Relative\Path\To\NCover\"
          CommandLineExe="Relative\Path\To\NUnit\nunit-console.exe"
          CommandLineArgs="&quot;%(UnitTestAssemblies.FullPath)&quot; /xml=&quot;$(BuildLogDirectory)\%(UnitTestAssemblies.Filename)-results.xml&quot;"
          AssemblyList="MyAssembliesToProfile"
          LogFile="$(BuildLogDirectory)\%(UnitTestAssemblies.Filename)-ncover.log"
          RegisterProfiler="false"
          CoverageFile="$(BuildLogDirectory)\%(UnitTestAssemblies.Filename)-coverage.xml"/>

        <!-- Stop TypeMock and unregister NCover. -->
        <CallTarget Targets="test-finally"/>

        <!-- Get all of the coverage logs and aggregate them with NCoverExplorer. -->
        <CreateItem Include="$(BuildLogDirectory)\*-coverage.xml">
          <Output TaskParameter="Include" ItemName="CoverageReports"/>
        </CreateItem>
        <NCoverExplorer
          ToolPath="Relative\Path\To\NCoverExplorer\"
          ProjectName="YourProjectNameHere"
          ReportType="4"
          Sort="CoveragePercentageAscending"
          Filter="None"
          OutputDir="$(BuildLogDirectory)"
          XmlReportName="CoverageReport.xml"
          HtmlReportName="CoverageReport.html"
          ShowExcluded="True"
          SatisfactoryCoverage="75"
          FailMinimum="True"
          CoverageFiles="@(CoverageReports)"/>

        <!-- In case one of the tests fails, make sure to stop TypeMock and unregister NCover. -->
        <OnError ExecuteTargets="test-finally"/>
      </Target>

      <!-- Stopping TypeMock and unregistering NCover is a separate target because it has to happen -->
      <!-- regardless of success or failure of the unit tests. Like the "finally" in a "try/finally" block. -->
      <Target Name="test-finally">
        <TypeMockStop/>
        <Exec Command="regsvr32 /u /s &quot;Relative\Path\To\NCover\CoverLib.dll&quot;" ContinueOnError="true"/>
      </Target>
    </Project>

In the example, notice how the steps for stopping TypeMock and
unregistering NCover have been placed in a separate target called
"test-finally" since it's used a lot like a try/finally block. That's
the sort of thing we're trying to emulate. You'll also notice that we're
using [MSBuild
"batching"](http://msdn2.microsoft.com/en-us/library/ms171473.aspx) to
run each test assembly through NCover and generate an individual
coverage log.

Additional notes:

-   Obviously you're going to need to change the paths and other
    placeholder parameters to fit your build.
-   If you've got TypeMock installed on dev machines *and* on the build
    box, you can skip the TypeMockRegister task and just start/stop
    TypeMock.
-   If you've got NCover installed on dev machines and on the build box,
    you don't need to execute "regsvr32" to register/unregister NCover.
    As long as NCover is registered before you start TypeMock, you're
    OK.


