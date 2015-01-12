---
layout: post
title: "COMPLUS_Version and the .NET Framework Runtime"
date: 2009-10-29 -0800
comments: true
disqus_identifier: 1579
tags: [net]
---
I just spent a couple of days debugging a weird problem. We have a
fairly large product that has several Visual Studio solutions in it, all
of which target .NET 3.5. No, that's not the problem. The problem was
that we were able to build each solution separately in the correct
dependency order just fine, but when the whole thing ran together in an
automated fashion, the build would fail.

The failure message indicated that an extension method was not being
recognized. Something like:

`'Foo' does not contain a definition for 'Bar'`

Again, it would build on its own, but not in the larger environment.
What gives?

I figured the problem had to be the targeted .NET environment - that the
project was targeting .NET 2.0 when run in the larger build but .NET 3.5
when run alone. And I was right, but not how I thought.

As it turns out, a custom build task run in an earlier build was setting
an environment variable called **COMPLUS\_Version** to v2.0.50727, which
forced everything after that to run in .NET 2.0.

I had no idea such an environment variable existed. Doing [a quick
Google search](http://www.google.com/search?q=complus_version) on it,
the only documentation on it has to do with [build and test
environments](http://community.sharpdevelop.net/blogs/mattward/archive/2006/12/14/TestingWithDotnet11InSharpDevelop21.aspx)
forcing things to run in different .NET versions, like if you're
building something for .NET 1.1 and want to see how it runs in .NET 2.0.
I searched MSDN and other sites, but I can't actually find any
"official" documentation on this. It's just one of those things you
figure out.

Valid settings for **COMPLUS\_Version** seem to be the same as the names
of the folders you see when you go to the
`%WINDIR%\Microsoft.NET\Framework` directory, like:

-   v1.1.4322
-   v2.0.50727
-   v3.5

...and so on.

Setting the value will force future processes in that space to use the
specified .NET runtime, like:

`set COMPLUS_Version = v3.5`

That would force everything to run in .NET 3.5.

And we tried that - doing a set to .NET 3.5 to force everything to that
runtime, but we then ran into another issue: We were using [the
vsdbcmd.exe
program](http://msdn.microsoft.com/en-us/library/dd193283.aspx) to do
some database work during a build (that's another story) and if you
force it to run in .NET 3.5 you get the error:

`To run this application, you must first install one of the following versions of the .NET Framework:      v3.5       Contact your application publisher for instructions about obtaining the appropriate version of the .NET Framework`

That made no sense to me since I obviously have .NET 3.5 installed.

The answer was to get rid of **COMPLUS\_Version** entirely. After the
custom build task ran, set the variable, and completed its work, we used
the [MSBuildCommunityTasks](http://msbuildtasks.tigris.org/) "script"
task to unset the environment variable:

    <PropertyGroup>
      <SetCode>
    <![CDATA[
      public static void ScriptMain() {
        System.Environment.SetEnvironmentVariable("COMPLUS_Version", null);
      }
    ]]>
      </SetCode>
    </PropertyGroup>
    <Script Language="C#" Code="$(SetCode)" Imports="System" />

Doing that removes the variable from the process space and later
executables can allow the CLR to choose which environment to target
automatically.

