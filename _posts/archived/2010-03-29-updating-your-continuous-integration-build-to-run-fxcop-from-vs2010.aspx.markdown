---
layout: post
title: "Updating Your Continuous Integration Build to run FxCop from VS2010"
date: 2010-03-29 -0800
comments: true
disqus_identifier: 1627
tags: [.NET,Visual Studio]
---
In VS2010 Microsoft really hasn't accounted for integrating FxCop into
your continuous integration/scripted build in any way other than
building through Visual Studio (unless you're running Team Foundation
Server, which I'm not). If you want your CI server to run FxCop, you
have to have VS installed, which is pretty lame.

In addition, the format of the project files changed slightly, the list
of assemblies containing rules has changed, and the way you specify
which rules to run and which not to run is different (there's a new
concept of a "ruleset").

*And, of course, none of this is documented.*

So here's what I want:

-   I want to run FxCop in continuous integration.
-   I don't want to have to install Visual Studio on the build server.
-   I want to be able to run analysis as a big batch job at the end
    rather than one project/solution at a time during the build process.
    (That way I can also potentially run it asynchronously with other
    analysis.)

It took a bit, but I think I've figured it out.

**Get a copy of FxCop from an installed Visual Studio.** You'll find it
under your VS2010 install folder in a place like this:
`C:\Program Files\Microsoft Visual Studio 10.0\Team Tools\Static Analysis Tools\FxCop`

Take that whole folder and put it on your build server somewhere, or
check it in alongside your source code as a dependency/tool. (I don't
know if that somehow violates licensing or not, but you won't be
distributing it, you just want to run it. YMMV. I'm no lawyer.)

**Create a RuleSet.** This is the new way of saying which rules to run.
It used to be part of the FxCop project file, but they changed it up a
bit. To get a RuleSet:

1.  Create a new throwaway project in Visual Studio.
2.  Right-click on the project and select "Properties."
3.  On the left side of the properties window, select "Code Analysis."
4.  You should see a "Rule Set" area with a dropdown box marked "Run
    this rule set." Select one of the pre-defined rule sets to start
    with and click "Open."
5.  Make changes to the rule set. Deselect rules you want run, etc.
6.  Select File -\> Save As... and save the modified rule set somewhere
    you can get it later.

**Put the RuleSet along with your build scripts.** The build script
(when you run FxCop) will need to find that RuleSet, so put it along
with your other build scripts and artifacts.

**Add the location of the FxCop rules to the RuleSet.** Open the RuleSet
file in a text editor. Under the "RuleSet" root element, add a new
"RuleHintPaths" element. Inside "RuleHintPaths," add a "Path" element
with text that has the path to the FxCop "Rules" folder - it needs to be
able to find all of the rules assemblies that will be running. If you
have custom rules, you'll need to add more "Path" elements.

Your RuleSet will look something like this:

    <?xml version="1.0" encoding="utf-8"?>
    <RuleSet Name="My Rules"
             Description="Rules that should be run on my assemblies."
             ToolsVersion="10.0">
      <RuleHintPaths>
        <Path>..\toolset\thirdparty\fxcop-vsts\Rules\</Path>
      </RuleHintPaths>
      <IncludeAll Action="Error" />
      <Rules AnalyzerId="Microsoft.Analyzers.ManagedCodeAnalysis" RuleNamespace="Microsoft.Rules.Managed">
        <Rule Id="CA1006" Action="None" />
        <Rule Id="CA1014" Action="None" />
        <Rule Id="CA1016" Action="None" />
        <Rule Id="CA1020" Action="None" />
        <Rule Id="CA1054" Action="None" />
        <Rule Id="CA1055" Action="None" />
        <Rule Id="CA1056" Action="None" />
        <Rule Id="CA1303" Action="None" />
        <Rule Id="CA2210" Action="None" />
        <Rule Id="CA2243" Action="None" />
      </Rules>
    </RuleSet>

**Update your FxCop project file.** If you were using an FxCop project
file before, for example, [if you were generating a dynamic dependency
list](/archive/2008/06/19/dynamic-fxcop-dependency-list-using-msbuild.aspx),
you have to do some updates. I'll enumerate them first, then I'll show
you my FxCop project file.

-   Change your `PlatformAssembliesLocation` to point to the .NET 4.0
    install location.
-   Remove the `TargetFrameworkVersion` node. (There's no explicit .NET
    4 target it seems, so omitting it will automatically target .NET 4.)
-   Update the `Rules/RuleFiles` element to contain a list of all of the
    assemblies with rules in them, and make sure `AllRulesEnabled` on
    each is set to "True." You'll disable rules using your RuleSet.

Here's what my FxCop project file looks like. I am [dynamically
generating the list of dependency
locations](/archive/2008/06/19/dynamic-fxcop-dependency-list-using-msbuild.aspx)
as well as the list of assemblies to analyze, which is why you see some
weird looking `<!-- @DIRECTORIES@ -->` comments in there. Check out [my
blog
entry](/archive/2008/06/19/dynamic-fxcop-dependency-list-using-msbuild.aspx)
for more on that. In your project, you'll probably have a real list of
directories/assemblies to analyze there.

    <?xml version="1.0" encoding="utf-8"?>
    <FxCopProject Version="10.0" Name="FxCop Project">
     <ProjectOptions>
      <Stylesheet Apply="False">FxCopReport.xsl</Stylesheet>
      <PlatformAssembliesLocation>c:\WINDOWS\Microsoft.NET\Framework\v4.0.30128</PlatformAssembliesLocation>
      <SharedProject>True</SharedProject>
      <SaveMessages>
       <Project Status="Active, Excluded" NewOnly="False" />
       <Report Status="Active" NewOnly="False" />
      </SaveMessages>
      <ProjectFile Compress="True" DefaultTargetCheck="True" DefaultRuleCheck="True" SaveByRuleGroup="" Deterministic="True" />
      <EnableMultithreadedAnalysis>True</EnableMultithreadedAnalysis>
      <EnableMultithreadedLoad>True</EnableMultithreadedLoad>
      <SourceLookup>True</SourceLookup>
      <AnalysisExceptionsThreshold>10</AnalysisExceptionsThreshold>
      <RuleExceptionsThreshold>1</RuleExceptionsThreshold>
      <Spelling Locale="en-US" />
      <OverrideRuleVisibilities>False</OverrideRuleVisibilities>
      <SearchGlobalAssemblyCache>True</SearchGlobalAssemblyCache>
      <DeadlockDetectionTimeout>120</DeadlockDetectionTimeout>
      <IgnoreGeneratedCode>True</IgnoreGeneratedCode>
     </ProjectOptions>
     <Targets>
      <!-- @TARGETS@ -->
      <AssemblyReferenceDirectories>
       <!-- @DIRECTORIES@ -->
      </AssemblyReferenceDirectories>
     </Targets>
     <Rules>
      <RuleFiles>
       <RuleFile Name="$(FxCopDir)\Rules\DataflowRules.dll" Enabled="True" AllRulesEnabled="True" />
       <RuleFile Name="$(FxCopDir)\Rules\DesignRules.dll" Enabled="True" AllRulesEnabled="True" />
       <RuleFile Name="$(FxCopDir)\Rules\GlobalizationRules.dll" Enabled="True" AllRulesEnabled="True" />
       <RuleFile Name="$(FxCopDir)\Rules\InteroperabilityRules.dll" Enabled="True" AllRulesEnabled="True" />
       <RuleFile Name="$(FxCopDir)\Rules\MaintainabilityRules.dll" Enabled="True" AllRulesEnabled="True" />
       <RuleFile Name="$(FxCopDir)\Rules\MobilityRules.dll" Enabled="True" AllRulesEnabled="True" />
       <RuleFile Name="$(FxCopDir)\Rules\NamingRules.dll" Enabled="True" AllRulesEnabled="True" />
       <RuleFile Name="$(FxCopDir)\Rules\PerformanceRules.dll" Enabled="True" AllRulesEnabled="True" />
       <RuleFile Name="$(FxCopDir)\Rules\PortabilityRules.dll" Enabled="True" AllRulesEnabled="True" />
       <RuleFile Name="$(FxCopDir)\Rules\ReliabilityRules.dll" Enabled="True" AllRulesEnabled="True" />
       <RuleFile Name="$(FxCopDir)\Rules\SecurityRules.dll" Enabled="True" AllRulesEnabled="True" />
       <RuleFile Name="$(FxCopDir)\Rules\SecurityTransparencyRules.dll" Enabled="True" AllRulesEnabled="True" />
       <RuleFile Name="$(FxCopDir)\Rules\UsageRules.dll" Enabled="True" AllRulesEnabled="True" />
      </RuleFiles>
      <Groups />
      <Settings />
     </Rules>
    </FxCopProject>

**Update your FxCop command line.** The last thing you have to do is
modify the `<Exec>` task you have in your MSBuild script so it points to
your project and your RuleSet. Just add the `/ruleset` parameter to
point to run your rules, like `/ruleset:=YourRuleset.ruleset`

My FxCop command line looks something like this (anonymized/simplified
for illustration purposes):

    <PropertyGroup>
      <FxCopProject>Path\To\Project.FxCop</FxCopProject>
      <FxCopOutput>Path\To\Output\FxCopReport.xml</FxCopOutput>
      <FxCopXsl>$(FxCopDir)\Xml\FxCopReport.xsl</FxCopXsl>
      <FxCopDictionary>Path\To\CodeAnalysisDictionary.xml</FxCopDictionary>
      <FxCopRuleset>Path\To\YourCustom.ruleset</FxCopRuleset>
    </PropertyGroup>
    <Exec ContinueOnError="true" Command="$(FxCopDir)\FxCopCmd.exe /dictionary:&quot;$(FxCopDictionary)&quot; /ruleset:=&quot;$(FxCopRuleset)&quot; /o:&quot;$(FxCopOutput)&quot; /p:&quot;$(FxCopProject)&quot; /fo"/>

Once you have that, you should be able to run FxCop from the command
line in your build without having to install Visual Studio.

Now to go through and fix all the new errors it found...

