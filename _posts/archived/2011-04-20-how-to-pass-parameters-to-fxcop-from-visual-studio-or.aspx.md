---
layout: post
title: "How to Pass Parameters to FxCop from Visual Studio - OR - How to Fix the Dreaded CA0060 Warning"
date: 2011-04-20 -0800
comments: true
disqus_identifier: 1709
tags: [dotnet,vs]
---
If you've enabled FxCop to run on your projects in Visual Studio,
chances are you've seen the dreaded CA0060 warning:

> MSBUILD : warning : CA0060 : The indirectly-referenced assembly
> 'SomeAssembly, Version=1.2.3.4, Culture=neutral,
> PublicKeyToken=abcdef1234567890' could not be found. This assembly is
> not required for analysis, however, analysis results could be
> incomplete. This assembly was referenced by:
> C:\\Path\\To\\Some\\Dependency.dll.

[The MSDN docs on this
warning](http://msdn.microsoft.com/en-us/library/bb763128.aspx) say that
you should just add a reference to the indirectly referenced assembly so
FxCop can find it. The problem is, if you already have a reference to a
later version of the indirect dependency, you can't really reference
both versions.

I found [a forum
post](http://social.msdn.microsoft.com/Forums/en-US/vstscode/thread/c6780439-bc04-459e-80c3-d1712b2f5456/)
that explains that you can change the behavior of FxCop to allow
resolution of dependency assemblies to look at the strong name info but
ignore the version. You do that by adding the following to
`FxCopCmd.exe.config` in the
`C:\Program Files (x86)\Microsoft Visual Studio 10.0\Team Tools\Static Analysis Tools\FxCop`
folder:

`<add key="AssemblyReferenceResolveMode" value="StrongNameIgnoringVersion" />`

Of course, **if you do that, it affects every single solution on your
machine**. Plus, you have to tell every developer on your team to make
the same change, and... ugh. No.

A little Reflectoring shows that **you can actually specify a lot more
on the command line than running `FxCopCmd /?` says you can**. Here are
the ones I found that don't show up:

-   assemblycomparemode
-   dump
-   failonassert
-   outputculture
-   targetframeworkversion
-   trace
-   tracefile

**That `assemblycomparemode` one is what ties to the
`AssemblyResolveReferenceMode` value** from `FxCopCmd.exe.config`. In
fact, you can pass this value in on the command line if you were running
`FxCopCmd.exe` manually:

`FxCopCmd.exe /assemblycomparemode:StrongNameIgnoringVersion [and the rest of your parameters]`

Except, you're running from inside Visual Studio, so **you don't have
access to the command line... *or do you?***

Poking through the
`C:\Program Files (x86)\MSBuild\Microsoft\VisualStudio\v10.0\CodeAnalysis\Microsoft.CodeAnalysis.Targets`
file that gets installed with Visual Studio (and is what runs FxCop), it
turns out that if you **provide a property called
`$(CodeAnalysisAdditionalOptions)` with the list of additional command
line options you want for FxCop, they'll be passed in**. You just have
to do a little manual .csproj hacking to add the property.

    <?xml version="1.0" encoding="utf-8"?>
    <Project ToolsVersion="4.0" DefaultTargets="Build" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
      <PropertyGroup>
        <!-- This is the first PropertyGroup in your project. -->
        <Configuration Condition=" '$(Configuration)' == '' ">Debug</Configuration>
        <Platform Condition=" '$(Platform)' == '' ">AnyCPU</Platform>
        <!-- ...and all the other stuff, then before the group end: -->
        <CodeAnalysisAdditionalOptions>/assemblycomparemode:StrongNameIgnoringVersion</CodeAnalysisAdditionalOptions>
      </PropertyGroup>
      <!-- ...and then the rest of your project file. -->
    </Project>

Now when FxCop runs, that command line parameter list will be passed in
along with everything else and the CA0060 warning will go away. Plus,
the setting is transported along with the individual project, so it
doesn't affect your installed config files and you don't have to get any
developers to do anything to their machines. Done!
