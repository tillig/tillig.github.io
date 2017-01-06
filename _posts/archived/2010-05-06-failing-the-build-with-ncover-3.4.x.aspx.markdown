---
layout: post
title: "Failing the Build with NCover 3.4.x"
date: 2010-05-06 -0800
comments: true
disqus_identifier: 1639
tags: [net,gists,build]
---
I've spent the last week working on getting NCover 3.4.2 (and, later, 3.4.3) working in my environment. I was previously using the older free NCover with the original NCoverExplorer reporting tasks, but in moving up to .NET 4, it was also time to move up to a newer NCover.

One of the shortcomings I've found with NCover is that **it's really hard to get a simple set of summary coverage numbers from inside the build script**. It's pretty well geared around dumping out reports and summaries in XML or HTML, but even then, the XML summaries don't have all the numbers in an easily consumable format.

Further, the new division between the "Classic" licenses (ostensibly for the everyday dev) and the "Complete" licenses (for your build server) give us the fact that **only the "Complete" license supports failing the build based on coverage**. I'm not sure why, that’s just how it is. Oh, and the "Complete" license costs over twice what the "Classic" license costs, so it’s a little cost-prohibitive to buy all your devs a "Complete" license just so they can fail a local build.

Unfortunately, that doesn't really work for me. I'm going to run unit tests on my local machine before I check my code into the repo so I don't break the build. I kind of also want to know if I'm going to break the build because I went under the minimum coverage requirements.

**Fortunately, you can do this, it's just a little tricky.** You'll have to stick with me while we jump through a few hoops together.

**I'm working with the following tools**:

-   .NET 4.0
-   MSBuild (with the .NET 4.0 tools version)
-   NCover 3.4.3 Classic

**The basic algorithm**:

1.  Run your tests with the `<NCover>` MSBuild task and get your coverage numbers.
2.  Run the `<NCoverReporting>` MSBuild task to create a "SymbolModule"summary report.
3.  Use XSLT inside the `<NCoverReporting>` task to transform the output of the "SymbolModule" report into something you can more easily use with actual coverage percentages in it.
4.  Use the `<XmlPeek>` task to get the minimum coverage requirements out of the MSBuild script.
5.  Use the `<WriteLinesToFile>` task to create a temporary XML file that contains the minimum coverage requirements and the actual coverage information.
6.  Use the `<XslTransformation>` task to transform that temporary XML file into something that has simple pass/fail data in it.
7.  Use the `<XmlPeek>` task to look in that simplified report and determine if there are any failures.
8.  Use the `<Error>` task to fail the build if there are any coverage failures.

**If this seems like a lot of hoops to jump through, you're right.** It's a huge pain. Longer term, you could probably encapsulate steps 4 – 8 in a single custom MSBuild task, but for the purposes of explaining what's going on (and trying to use things that come out of the box with MSBuild and NCover), I haven't done that.

> **You may get lost here.** Like I said, it's a huge number of steps.
> At the end I put all the steps together in an MSBuild snippet so it
> might make more sense when you get there. I'll walk you through the
> steps, and then I'll show you the summary. **Follow all the way
> through to the end.** If you get bored and start skipping steps or
> skimming, you'll miss something.

On with the show.

**Run your tests with the `<NCover>` MSBuild task and get your coverage numbers.**

Your build script will have some properties set up and you'll use the `<NCover>` task to run NUnit or whatever. I won’t get into the details on this one because this is the easy part.

```xml
<PropertyGroup>
  <NCoverPath>$(ProgramW6432)\NCover\</NCoverPath>
  <TestCommandLineExe>$(ProgramW6432)\NUnit\NUnit-Console.exe</TestCommandLineExe>
  <RawCoverageFile>$(MSBuildProjectDirectory)\Coverage.Unit.xml</RawCoverageFile>
</PropertyGroup>
<UsingTask TaskName="NCover.MSBuildTasks.NCover" AssemblyFile="$(NCoverPath)Build Task Plugins\NCover.MSBuildTasks.dll"/>
<Target Name="Test">
  <!-- Define all of your unit test command line, the assemblies to profile, etc., then...-->
  <NCover
    ContinueOnError="false"
    ToolPath="$(NCoverPath)"
    TestRunnerExe="$(TestCommandLineExe)"
    TestRunnerArgs="$(TestCommandLineArgs)"
    IncludeAssemblies="@(AssembliesToProfile)"
    LogFile="Coverage.Unit.log"
    CoverageFile="$(RawCoverageFile)"
    ExcludeAttributes="CoverageExcludeAttribute;System.CodeDom.Compiler.GeneratedCodeAttribute"
    IncludeAutoGenCode="false"
    RegisterProfiler="false"/>
</Target>
```

In this example, when you run the Test target in your MSBuild script, NUnit will run and be profiled by NCover. You'll get a data file out the back called "Coverage.Unit.xml" - remember where the coverage file output is, you'll need it. **I recommend setting an MSBuild variable with the location of your coverage file output so you can use it later.**

**Run the `<NCoverReporting>` MSBuild task to create a "SymbolModule"summary report.**

At some time after you run the `<NCover>` task, you're going to need to generate some nature of consumable report from the output. To do that, you'll run the `<NCoverReporting>` task. For our purposes, we specifically want to create a "SymbolModule" report since we will be failing coverage based on overall assembly statistics.

You need to define the set of reports that will be run as a property in a `<PropertyGroup>` and pass that info to the `<NCoverReporting>` task. It will look something like this:

```xml
<PropertyGroup>
  <NCoverPath>$(ProgramW6432)\NCover\</NCoverPath>
  <RawCoverageFile>$(MSBuildProjectDirectory)\Coverage.Unit.xml</RawCoverageFile>
  <SimplifiedReportXsltPath>$(MSBuildProjectDirectory)\SimplifiedCoverageStatistics.xsl</SimplifiedReportXsltPath>
  <SimplifiedCoverageReportPath>$(MSBuildProjectDirectory)\CoverageReport.Simplified.xml</SimplifiedCoverageReportPath>
  <SimplifiedCoverageReportOutputs>
    <Report>
      <ReportType>SymbolModule</ReportType>
      <Format>Html</Format>
      <OutputPath>$(SimplifiedCoverageReportPath)</OutputPath>
    </Report>
  </SimplifiedCoverageReportOutputs>
  <MinimumCoverage>
    <Threshold>
      <CoverageMetric>SymbolCoverage</CoverageMetric>
      <Type>Assembly</Type>
      <Value>95.0</Value>
      <Pattern>YourAssembly</Pattern>
    </Threshold>
    <Threshold>
      <CoverageMetric>SymbolCoverage</CoverageMetric>
      <Type>Assembly</Type>
      <Value>95.0</Value>
      <Pattern>YourOtherAssembly</Pattern>
    </Threshold>
  </MinimumCoverage>
</PropertyGroup>
<UsingTask
  TaskName="NCover.MSBuildTasks.NCoverReporting"
  AssemblyFile="$(NCoverPath)Build Task Plugins\NCover.MSBuildTasks.dll"/>
<Target Name="CoverageReport">
  <NCoverReporting
    ContinueOnError="false"
    ToolPath="$(NCoverPath)"
    CoverageDataPaths="$(RawCoverageFile)"
    OutputPath="$(MSBuildProjectDirectory)"
    OutputReport="$(SimplifiedCoverageReportOutputs)"
    MinimumCoverage="$(MinimumCoverage)"
    XsltOverridePath="$(SimplifiedReportXsltPath)"
    />
</Target>
```

Now, there are a few interesting things to notice here.

-   **There's a variable called "SimplifiedReportXsltPath" that points to an XSLT file you don't have yet.** I'll give that to you in a minute.
-   **SimplifiedCoverageReportPath will eventually have the easy XML summary of the stuff** we're interested in. Keep that around.
-   **SimplifiedCoverageReportOutputs variable follows the format for defining a report to generate** [as outlined in the NCover documentation](http://docs.ncover.com/ref/3-0/ncover-reporting/msbuild/coverage-options#or). NCover Classic doesn't support many reports, but SymbolModule is one it does support.
-   **The SymbolModule report is defined as an Html format report** rather than Xml. This is important because when we define it as "Html" then the report will automatically run through our XSLT to transform. The result of the transformation doesn't actually have to be HTML.
-   **The MinimumCoverage variable is defined in the format used to fail the build if you're running under NCover Complete.** This format is [also defined in the documentation](http://docs.ncover.com/ref/3-0/ncover-reporting/msbuild/build-server#mc). The parameter as passed to the `<NCoverReporting>` task will be ignored if you run it under Classic but will actually act to fail the build if run under Complete. The point here is that we'll be using the same definition for minimum coverage that `<NCoverReporting>` uses.
-   **An XsltOverridePath is specified on the `<NCoverReporting>` task.** This lets us use our custom XSLT (which I'll give you in a minute) to create a nice summary report.

**Use XSLT inside the `<NCoverReporting>` task to transform the output of the "SymbolModule" report into something you can more easily use with actual coverage percentages in it.**

Basically, you need to create a little XSLT that will generate some summary numbers for you. The problem is, you will have to do some manual calculation to get those summary numbers.

> The math is simple but a little undiscoverable. For symbol coverage,
> you'll need to get the total number of sequence points available and
> the number visited, then calculate the percentage:
>
> `Coverage Percent = (Visited Sequence Points / (Unvisited Sequence Points + Visited Sequence Points)) * 100`
>
> Or, smaller:
>
> **`cp = (vsp / (usp + vsp)) * 100`**
>
> You can get the USP and VSP numbers for the entire coverage run or on
> a per-assembly basis by looking in the appropriate places in the
> SymbolModule report.

I won't show you the XML that comes out of `<NCoverReporting>` natively, but I will give you the XSLT that will calculate this for you:

```xml
<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <xsl:element name="symbolCoverage">
      <xsl:call-template name="display-symbol-coverage">
        <xsl:with-param name="key">__Summary</xsl:with-param>
        <xsl:with-param name="stats" select="//trendcoveragedata/stats" />
      </xsl:call-template>
      <xsl:for-each select="//trendcoveragedata/mod">
        <xsl:call-template name="display-symbol-coverage">
          <xsl:with-param name="key" select="assembly/text()" />
          <xsl:with-param name="stats" select="stats" />
        </xsl:call-template>
      </xsl:for-each>
    </xsl:element>
  </xsl:template>
  <xsl:template name="display-symbol-coverage">
    <xsl:param name="key" />
    <xsl:param name="stats" />
    <xsl:variable name="percentage" select="format-number(($stats/@vsp div ($stats/@usp + $stats/@vsp)) * 100, '0.00')" />
    <xsl:element name="coverage">
      <xsl:attribute name="module"><xsl:value-of select="$key" /></xsl:attribute>
      <xsl:attribute name="percentage">
        <xsl:choose>
          <xsl:when test="$percentage='NaN'">100</xsl:when>
          <xsl:otherwise><xsl:value-of select="$percentage" /></xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>
    </xsl:element>
  </xsl:template>
</xsl:stylesheet>
```

**Save that file as SimplifiedCoverageStatistics.xsl.** That's the SimplifiedReportXsltPath document we referred to earlier in MSBuild. When you look at the output of `<NCoverReporting>` after using this, the SymbolModule report you generated will look something like this:

```xml
<?xml version="1.0" encoding="utf-8"?>
<symbolCoverage>
  <coverage module="__Summary" percentage="95.36" />
  <coverage module="YourAssembly" percentage="91.34" />
  <coverage module="YourOtherAssembly" percentage="99.56" />
</symbolCoverage>
```

**If you're only reporting some statistics, you're pretty much done.** The special `__Summary` module is the overall coverage for the entire test run; each other module is an assembly that got profiled and its individual coverage. You could use the `<XmlPeek>` task from here and look in that file to dump out some numbers. For example, you can report out to TeamCity using a `<Message>` task and the `__Summary` number in that XML report.

However, if you want the build to fail based on coverage failure, you still have to compare those numbers to the expectations.

**Use the `<XmlPeek>` task to get the minimum coverage requirements out of the MSBuild script.**

You can't just use the `$(MinimumCoverage)` variable directly because there's no real way to get nested values from it. MSBuild sees that as an XML blob. (If it were an "Item" rather than a "Property" it'd be easier to manage, but NCover needs it as a "Property" so we've got work to do.) We'll use `<XmlPeek>` to get the values out in a usable format. That `<XmlPeek>` call looks like this:

```xml
<XmlPeek
  Namespaces="&lt;Namespace Prefix='msb' Uri='http://schemas.microsoft.com/developer/msbuild/2003'/&gt;"
  XmlContent="&lt;Root xmlns='http://schemas.microsoft.com/developer/msbuild/2003'&gt;$(MinimumCoverage)&lt;/Root&gt;"
  Query="/msb:Root/msb:Threshold[msb:Type='Assembly']">
  <Output TaskParameter="Result" ItemName="ModuleCoverageRequirements" />
</XmlPeek>
```

More crazy stuff going on here.

First we have to define the MSBuild namespace on the `<XmlPeek>` task so we can do an XPath statement on the `$(MinimumCoverage)` property - again, it's an XML blob.

Next, we're specifying some "XmlContent" on that `<XmlPeek>` task because we have the variable already and we don't need to re-read it from the file. However, it's sort of an XML fragment because there may be several `<Threshold>` elements defined in the variable so we wrap the variable with a `<Root>` element so it's a proper XML document.

The "Query" parameter uses some XPath to find all of the `<Threshold>` elements defined in `$(MinimumCoverage)` that are assembly-level thresholds. We can't really do anything with, say, cyclomatic-complexity thresholds (at least, not in this article) so we're only getting the values we can do something about.

Finally, we're sticking the `<Threshold>` nodes we found into a `@(ModuleCoverageRequirements)`` array variable. Each item in that array will be one `<Threshold>` node (as an XML string).

**Use the `<WriteLinesToFile>` task to create a temporary XML file that contains the minimum coverage requirements and the actual coverage information.**

We have the report at `$(SimplifiedCoverageReportPath)` that `<NCoverReporting>` generated containing the actual coverage percentages. We also have `@(ModuleCoverageRequirements)` with the associated required coverage percentages. Let's create a single, larger XML document that has both of these sets of data in it. We can do that with an `<XmlPeek>` to get the nodes out of the simplified coverage report and then a `<WriteLinesToFile>` task:

```xml
<PropertyGroup>
  <BuildCheckCoverageReportPath>$(MSBuildProjectDirectory)\CoverageReport.BuildCheck.xml</BuildCheckCoverageReportPath>
</PropertyGroup>
<!-- Get the actuals out of the transformed summary report. -->
<XmlPeek
  XmlInputPath="$(SimplifiedCoverageReportPath)"
  Query="/symbolCoverage/coverage">
  <Output
    TaskParameter="Result"
    ItemName="ModuleCoverageActuals"/>
</XmlPeek>
<!-- Merge the requirements and actuals into a single document. -->
<WriteLinesToFile
  File="$(BuildCheckCoverageReportPath).tmp"
  Lines="&lt;BuildCheck&gt;&lt;Requirements&gt;;@(ModuleCoverageRequirements);&lt;/Requirements&gt;&lt;Actuals&gt;;@(ModuleCoverageActuals);&lt;/Actuals&gt;&lt;/BuildCheck&gt;"
  Overwrite="true" />
```

As you can see, we're generating "yet another" XML document. It's temporary, so don't worry, but we do generate another document.

We're using `<XmlPeek>` to get all of the `<coverage>` elements out of the simplified report we generated earlier. (Look up a little bit in the article to see a sample of what that report looks like.)

Finally, we use `<WriteLinesToFile>` to wrap some XML around the requirements and the actuals and generate a larger report. Notice we stuck a ".tmp" extension onto the actual file path in the "File"attribute on `<WriteLinesToFile>` - that's important.

This temporary report will look something like this:

```xml
<BuildCheck>
  <Requirements>
    <Threshold xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
      <CoverageMetric>SymbolCoverage</CoverageMetric>
      <Type>Assembly</Type>
      <Value>95.0</Value>
      <Pattern>YourAssembly</Pattern>
    </Threshold>
    <Threshold xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
      <CoverageMetric>SymbolCoverage</CoverageMetric>
      <Type>Assembly</Type>
      <Value>95.0</Value>
      <Pattern>YourOtherAssembly</Pattern>
    </Threshold>
  </Requirements>
  <Actuals>
    <coverage module="__Summary" percentage="95.36" />
    <coverage module="YourAssembly" percentage="91.34" />
    <coverage module="YourOtherAssembly" percentage="99.56" />
  </Actuals>
</BuildCheck>
```

**Use the `<XslTransformation>` task to transform that temporary XML file into something that has simple pass/fail data in it.**

We need to take that temporary report and make it a little more easily consumable. We'll use another XSLT to transform it.

First,**save this XSLT as "BuildCheckCoverageStatistics.xsl"**:

```xml
<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msb="http://schemas.microsoft.com/developer/msbuild/2003">
  <xsl:template match="/">
    <xsl:element name="symbolCoverage">
      <xsl:for-each select="/BuildCheck/Requirements/msb:Threshold[msb:Type='Assembly']">
        <xsl:variable name="module"><xsl:value-of select="msb:Pattern/text()" /></xsl:variable>
        <xsl:variable name="expected"><xsl:value-of select="msb:Value/text()" /></xsl:variable>
        <xsl:variable name="actual"><xsl:value-of select="/BuildCheck/Actuals/coverage[@module=$module]/@percentage" /></xsl:variable>
        <xsl:if test="$actual != ''">
          <xsl:element name="coverage">
            <xsl:attribute name="module"><xsl:value-of select="$module" /></xsl:attribute>
            <xsl:attribute name="expected"><xsl:value-of select="$expected" /></xsl:attribute>
            <xsl:attribute name="actual"><xsl:value-of select="$actual" /></xsl:attribute>
            <xsl:attribute name="pass">
              <xsl:choose>
                <xsl:when test="$actual >= $expected">true</xsl:when>
                <xsl:otherwise>false</xsl:otherwise>
              </xsl:choose>
            </xsl:attribute>
          </xsl:element>
        </xsl:if>
      </xsl:for-each>
    </xsl:element>
  </xsl:template>
</xsl:stylesheet>
```

What that XSLT does is look at the requirements and the actuals in the XML file and if it finds some actuals that match a defined requirement, it outputs a node with the name of the assembly, the expected and actual coverage percentages, and a simple pass/fail indicator.

The reason it doesn't just include all of the requirements is that NCover Classic doesn't allow you to merge the results from different test runs into a single data set. As such, we may need to run this transformation a few times over different data sets and we don't want to fail the build just because there's a requirement defined for an assembly that wasn't tested in the given test run.

Now **transform the temporary XML file using `<XslTransformation>`** like this:

```xml
<PropertyGroup>
  <BuildCheckReportXsltPath>$(MSBuildProjectDirectory)\BuildCheckCoverageStatistics.xsl</BuildCheckReportXsltPath>
</PropertyGroup>
<XslTransformation
  OutputPaths="$(BuildCheckCoverageReportPath)"
  XmlInputPaths="$(BuildCheckCoverageReportPath).tmp"
  XslInputPath="$(BuildCheckReportXsltPath)" />
```

As an input, we're taking that ".tmp" file we generated with `<WriteLinesToFile>` earlier. The "OutputPaths" attribute is the `$(BuildCheckCoverageReportPath)` that we defined earlier. The "XslInputPath" is the XSLT above.

The resulting report will be a nice, simple document like this:

```xml
<?xml version="1.0" encoding="utf-8"?>
<symbolCoverage>
  <coverage module="YourAssembly" expected="95.0" actual="91.34" pass="false" />
  <coverage module="YourOtherAssembly" expected="95.0" actual="99.56" pass="true" />
</symbolCoverage>
```

The top-level `__Summary` data is gone (because we're only dealing with assembly-level requirements) and you can see easily what the expected and actual coverage percentages are. Even easier, there's a "pass" attribute that tells you whether there was success.

Notice in my sample report that one of the assemblies passed and the other failed because it didn't meet minimum coverage. We want to fail the build when that happens.

**After the transformation, you should do a little cleanup.** We have some little temporary files and, really, we only want one simplified report - the one we just generated. Use the `<Delete>` and `<Move>` tasks to do that cleanup:

```xml
<Delete Files="$(BuildCheckCoverageReportPath).tmp;$(SimplifiedCoverageReportPath)" />
<Move
  SourceFiles="$(BuildCheckCoverageReportPath)"
  DestinationFiles="$(SimplifiedCoverageReportPath)" />
```

The net result of that:

-   The .tmp file will be deleted.
-   The `$(SimplifiedCoverageReportPath)` will now be that final report with the pass/fail marker in it.

**Use the `<XmlPeek>` task to look in that simplified report and determine if there are any failures.**

With such a simple report, the `<XmlPeek>` call to see if there are any failing coverage items is fairly self explanatory:

```xml
<XmlPeek
  XmlInputPath="$(SimplifiedCoverageReportPath)"
  Query="/symbolCoverage/coverage[@pass!='true']">
  <Output TaskParameter="Result" ItemName="FailedCoverageItems"/>
</XmlPeek>
```

That gives us a new variable called `@(FailedCoverageItems)` where each item in the variable array has one node containing a failed coverage item.

**Use the `<Error>` task to fail the build if there are any coverage failures.**

Last step! Use `<Error>` with a "Condition" attribute to fail the build if there is anything found in `@(FailedCoverageItems)`:

```xml
<Error
  Text="Failed coverage: @(FailedCoverageItems)"
  Condition="'@(FailedCoverageItems)' != ''" />
```

That'll do it!

**If we put all of the MSBuild together, it'll look something like the following.**

> **NOTE: THIS IS NOT A COPY/PASTE READY SCRIPT. IT WILL NOT RUN BY
> ITSELF. IT IS A SAMPLE ONLY.**

```xml
<PropertyGroup>
  <NCoverPath>$(ProgramW6432)\NCover\</NCoverPath>
  <RawCoverageFile>$(MSBuildProjectDirectory)\Coverage.Unit.xml</RawCoverageFile>
  <SimplifiedReportXsltPath>$(MSBuildProjectDirectory)\SimplifiedCoverageStatistics.xsl</SimplifiedReportXsltPath>
  <BuildCheckReportXsltPath>$(MSBuildProjectDirectory)\BuildCheckCoverageStatistics.xsl</BuildCheckReportXsltPath>
  <BuildCheckCoverageReportPath>$(MSBuildProjectDirectory)\CoverageReport.BuildCheck.xml</BuildCheckCoverageReportPath>
  <SimplifiedCoverageReportPath>$(MSBuildProjectDirectory)\CoverageReport.Simplified.xml</SimplifiedCoverageReportPath>
  <SimplifiedCoverageReportOutputs>
    <Report>
      <ReportType>SymbolModule</ReportType>
      <Format>Html</Format>
      <OutputPath>$(SimplifiedCoverageReportPath)</OutputPath>
    </Report>
  </SimplifiedCoverageReportOutputs>
  <MinimumCoverage>
    <Threshold>
      <CoverageMetric>SymbolCoverage</CoverageMetric>
      <Type>Assembly</Type>
      <Value>95.0</Value>
      <Pattern>YourAssembly</Pattern>
    </Threshold>
    <Threshold>
      <CoverageMetric>SymbolCoverage</CoverageMetric>
      <Type>Assembly</Type>
      <Value>95.0</Value>
      <Pattern>YourOtherAssembly</Pattern>
    </Threshold>
  </MinimumCoverage>
</PropertyGroup>
<UsingTask TaskName="NCover.MSBuildTasks.NCoverReporting" AssemblyFile="$(NCoverPath)Build Task Plugins\NCover.MSBuildTasks.dll"/>
<Target Name="CoverageReport">
  <!-- This assumes you've run the NCover task, etc. and have a $(RawCoverageFile) to report on. -->
  <NCoverReporting
    ContinueOnError="false"
    ToolPath="$(NCoverPath)"
    CoverageDataPaths="$(RawCoverageFile)"
    OutputPath="$(MSBuildProjectDirectory)"
    OutputReport="$(SimplifiedCoverageReportOutputs)"
    MinimumCoverage="$(MinimumCoverage)"
    XsltOverridePath="$(SimplifiedReportXsltPath)"
    />
  <XmlPeek
    Namespaces="&lt;Namespace Prefix='msb' Uri='http://schemas.microsoft.com/developer/msbuild/2003'/&gt;"
    XmlContent="&lt;Root xmlns='http://schemas.microsoft.com/developer/msbuild/2003'&gt;$(MinimumCoverage)&lt;/Root&gt;"
    Query="/msb:Root/msb:Threshold[msb:Type='Assembly']">
    <Output TaskParameter="Result" ItemName="ModuleCoverageRequirements" />
  </XmlPeek>
  <XmlPeek XmlInputPath="$(SimplifiedCoverageReportPath)" Query="/symbolCoverage/coverage">
    <Output TaskParameter="Result" ItemName="ModuleCoverageActuals"/>
  </XmlPeek>
  <WriteLinesToFile
    File="$(BuildCheckCoverageReportPath).tmp"
    Lines="&lt;BuildCheck&gt;&lt;Requirements&gt;;@(ModuleCoverageRequirements);&lt;/Requirements&gt;&lt;Actuals&gt;;@(ModuleCoverageActuals);&lt;/Actuals&gt;&lt;/BuildCheck&gt;"
    Overwrite="true" />
  <XslTransformation
    OutputPaths="$(BuildCheckCoverageReportPath)"
    XmlInputPaths="$(BuildCheckCoverageReportPath).tmp"
    XslInputPath="$(BuildCheckReportXsltPath)" />
  <Delete Files="$(BuildCheckCoverageReportPath).tmp;$(SimplifiedCoverageReportPath)" />
  <Move
    SourceFiles="$(BuildCheckCoverageReportPath)"
    DestinationFiles="$(SimplifiedCoverageReportPath)" />
  <XmlPeek
    XmlInputPath="$(SimplifiedCoverageReportPath)"
    Query="/symbolCoverage/coverage[@pass!='true']">
    <Output TaskParameter="Result" ItemName="FailedCoverageItems"/>
  </XmlPeek>
  <Error
    Text="Failed coverage: @(FailedCoverageItems)"
    Condition="'@(FailedCoverageItems)' != ''" />
</Target>
```

**There are exercises left to the reader. THIS IS NOT A COPY/PASTE READY SCRIPT.**

There are some obvious areas where you'll need to make some choices. For example, you probably don't actually want to dump all of these reports out right in the same folder as the MSBuild script so you'll want to set various paths appropriately. You may want to put the `<NCoverReporting>` task call in a separate target than the crazy build-time-analysis bit to try and keep things manageable and clean. Filenames may need to change based on dynamic variables, like if you're running the reporting task after each solution in a multi-solution build, so you'll have to adjust for that. This should basically get you going.

**Remind me again... WTF? Why all these hoops?**

NCover Classic won't let you fail the build based on coverage. I have my thoughts on that and other shortcomings that I'll save for a different blog entry. Suffice it to say, without creating a custom build task to encompass all of this, or just abandoning hope for failing the build based on coverage, this is about all you can do. Oh, or you could buy every developer in your organization an NCover Complete license.

**HELP! Why doesn't XYZ work for me?**

Unfortunately, there are a lot of moving pieces here. If it's not working for you, **I don't really have the ability to offer you individual support** on it. If you find a problem, leave a comment on this blog entry and I'll look into it; if you grabbed all of these things and your copy isn't quite doing what you think it should be doing, I can't really do anything for you. From a troubleshooting perspective, I'd add the various build tasks one at a time and run the build after each addition. Look and see what the output is, what files are created, etc. Use `<Message>` and `<Error>` tasks to debug the script. Make sure you're 100% aware of what each call does and where every file is going. Make sure you specified all the properties for `<NCoverReporting>` correctly and you didn't leave a typo in the minimum coverage or report output properties (e.g., make sure the SymbolModule report is an "Html" not "Xml" report, etc.) There are a lot of steps, but they're simple steps, so you should be able to work through it.

Also, **drop NCover a line and let them know you'd be interested in seeing better direct support for something like this**. I've told them myself, but the more people interested in it, the more likely it will see light in the next product release.

