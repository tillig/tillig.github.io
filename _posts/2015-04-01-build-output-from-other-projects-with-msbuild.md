---
layout: post
title: "Get Build Output From Other Projects With MSBuild"
date: 2015-04-01 -0800
comments: true
tags: [build]
---

In making a package similar to the [NuGet.Server package](https://docs.nuget.org/create/hosting-your-own-nuget-feeds), I had a need to, from one project in the solution, **get the list of build output assemblies from other projects in the same solution.**

That is, in a solution like:

- MySolution.sln
    - Server.csproj
    - Project1.csproj
    - Project2.csproj

...from the `Server.csproj` I wanted to get the build output assembly paths for the `Project1.csproj` and `Project2.csproj` projects.

The *technically correct* solution is sort of complicated and [Sayed Ibrahim Hashimi has documented it on his blog](http://sedodream.com/2007/11/21/MSBuildHowToGetAllGeneratedOutputs.aspx). The problem with the technically correct solution is that it requires you to invoke a build on the target projects.

That build step was causing no end of trouble. Projects were re-running `AfterBuild` actions, code was getting regenerated at inopportune times, cats and dogs living together - *mass hysteria*.

I came up with a different way to get the build outputs that is *less technically correct* but gets the job done and doesn't require you to invoke a build on the target projects.

My solution involves **loading the projects in an evaluation context using a custom inline MSBuild task**. Below is a snippet showing the task in action. Note that the snippet is in the context of [a `.targets` file that would be added to your `.csproj` by a NuGet package](https://docs.nuget.org/Create/Creating-and-Publishing-a-Package#import-msbuild-targets-and-props-files-into-project), so you'll see environment variables used that will only be present in a full build setting:

``` xml
<Project DefaultTargets="EnumerateOutput" xmlns="http://schemas.microsoft.com/developer/msbuild/2003" >
  <ItemGroup>
    <!-- Include all projects in the solution EXCEPT this one -->
    <ProjectToScan Include="$(SolutionDir)/**/*.csproj" Exclude="$(SolutionDir)/**/$(ProjectName).csproj" />
  </ItemGroup>
  <Target Name="EnumerateOutput" AfterTargets="Build">
    <!-- Call the custom task to get the output -->
    <GetBuildOutput ProjectFile="%(ProjectToScan.FullPath)">
      <Output ItemName="ProjectToScanOutput" TaskParameter="BuildOutput"/>
    </GetBuildOutput>

    <Message Text="%(ProjectToScanOutput.Identity)" />
  </Target>

  <UsingTask TaskName="GetBuildOutput" TaskFactory="CodeTaskFactory" AssemblyFile="$(MSBuildToolsPath)\Microsoft.Build.Tasks.v12.0.dll" >
    <ParameterGroup>
      <ProjectFile ParameterType="System.String" Required="true"/>
      <BuildOutput ParameterType="Microsoft.Build.Framework.ITaskItem[]" Output="true"/>
    </ParameterGroup>
    <Task>
      <Reference Include="System.Xml"/>
      <Reference Include="Microsoft.Build"/>
      <Using Namespace="Microsoft.Build.Evaluation"/>
      <Using Namespace="Microsoft.Build.Utilities"/>
      <Code Type="Fragment" Language="cs">
      <![CDATA[
        // The dollar-properties here get expanded to be the
        // actual values that are present during build.
        var properties = new Dictionary<string, string>
        {
          { "Configuration", "$(Configuration)" },
          { "Platform", "$(Platform)" }
        };

        // Load the project into a separate project collection so
        // we don't get a redundant-project-load error.
        var collection = new ProjectCollection(properties);
        var project = collection.LoadProject(ProjectFile);

        // Dollar sign can't easily be escaped here so we use the char code.
        var expanded = project.ExpandString(((char)36) + @"(MSBuildProjectDirectory)\" + ((char)36) + "(OutputPath)" + ((char)36) + "(AssemblyName).dll");
        BuildOutput = new TaskItem[] { new TaskItem(expanded) };
      ]]>
      </Code>
    </Task>
  </UsingTask>
</Project>
```

How it works:

1. Create a dictionary of properties you want to flow from the current build environment into the target project. In this case, the `Configuration` and `Platform` properties are what affects the build output location, so I pass those. The `$(Configuration)` and `$(Platform)` in the code snippet will actually be expanded on the fly to be the real values from the current build environment.
1. Create a tiny MSBuild project collection (similar to the way MSBuild does so for a solution). Pass the set of properties into the collection so they can be used by your project. You need this collection so the project doesn't get loaded in the context of the solution. You get an error saying the project is already loaded if you don't do this.
1. Load the project into your collection. When you do, properties will be evaluated using the global environment - that dictionary provided.
1. Use the `ExpandString` method on the project to expand `$(MSBuildProjectDirectory)\$(OutputPath)$(AssemblyName).dll` into whatever it will be in context of the project with the given environment. This will end up being the absolute path to the assembly being generated for the given configuration and platform. Note the use of `(char)36` there - I spent some time trying to figure out how to escape `$` but never could, so rather than fight it... there you go.
1. Return the information from the expansion to the caller.

That step with `ExpandString` is where the *less technically correct* bit comes into play. For example, if the project generates an `.exe` file rather than a `.dll` - I don't account for that. I could enhance it to accommodate for that, but... well, this covers the majority case for me.

I considered returning a property rather than an item, but I have a need to grab a bunch of build output items and batch/loop over them, so items worked better in that respect.

There's also probably a real way of escaping `$` that just didn't pop up in my searches. Leave a comment if you know; I'd be happy to update.