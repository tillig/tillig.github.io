---
layout: post
title: "Automating NuGet Dependency Version Updates with MSBuild"
date: 2013-01-15 -0800
comments: true
disqus_identifier: 1800
tags: [dotnet,gists,build,xml]
---
Although [I wasn't a big fan of NuGet](/archive/2011/10/27/nuget-doesnt-help-me.aspx) when it started getting big, I have to admit it's grown on me. I think part of that has to do with the large amount of improvement we've seen since back then. Regardless, I'm in a position with [Autofac](https://autofac.googlecode.com) and other projects where I'm not only *consuming* NuGet packages, I'm also *producing* them.

One of the biggest pains I have when maintaining the .nuspec files for my packages is that you can update a dependency for your project (via NuGet) but the corresponding version value isn't updated in the .nuspec. (This is, of course, assuming you're doing manual maintenance and not re-generating everything each time. In a single-package solution, I can see regenerating would be fine, but when you've got multiple like in Autofac, you don't want to regenerate.)

**What I want is for the .nuspec file `<dependency>` entries to match the installed package versions that I'm actually building against.**

So... I automated that with MSBuild. Here's how:

First, put placeholders into your .nuspec file(s) using a special format, like this:

```xml
<dependencies>
  <dependency id="Autofac" version="$version_Autofac$" />
  <dependency id="Castle.Core" version="$version_Castle.Core$" />
</dependencies>
```

Each dependency gets a `$version_NuGetPackageName$` format placeholder. The "NuGetPackageName" part matches the name of the dependency (and, coincidentally, the first part of the folder name under "packages" where the dependency gets installed in your solution).

Next, in your build script, include a custom task that looks like this. It will look in the "packages" folder and parse the various folder names into these placeholders so you can do some search-and-replace action.

```xml
<UsingTask TaskName="GetNuGetDependencyVersions" TaskFactory="CodeTaskFactory" AssemblyFile="$(MSBuildToolsPath)\Microsoft.Build.Tasks.v4.0.dll">
  <ParameterGroup>
    <PackageInstallDirectory Required="true" />
    <Dependencies ParameterType="Microsoft.Build.Framework.ITaskItem[]" Output="true" />
  </ParameterGroup>
  <Task>
    <Using Namespace="System" />
    <Using Namespace="System.Collections.Generic" />
    <Using Namespace="System.IO" />
    <Using Namespace="System.Text.RegularExpressions" />
    <Using Namespace="Microsoft.Build.Framework" />
    <Using Namespace="Microsoft.Build.Utilities" />
    <Code Type="Fragment" Language="cs">
      <![CDATA[
        // Match package folders like Castle.Core.3.0.0.4001
        // Groups[1] = "Castle.Core"
        // Groups[2] = "3.0.0.4001"
        var re = new Regex(@"^(.+?)\.(([0-9]+)[A-Za-z0-9\.\-]*)$");

        try
        {
          // Create item metadata based on the list of packages found
          // in the PackageInstallDirectory. Item identities will be
          // the name of the package ("Castle.Core") and they'll have
          // a "Version" metadata item with the package version.
          var returnItems = new List<ITaskItem>();
          foreach(var directory in Directory.EnumerateDirectories(PackageInstallDirectory))
          {
            var directoryName = Path.GetFileName(directory);
            var match = re.Match(directoryName);
            if(!match.Success)
            {
              continue;
            }
            var name = match.Groups[1].Value;
            var version = match.Groups[2].Value;
            var metadata = new Dictionary<string, string>();
            metadata["Version"] = version;
            var item = new TaskItem(name, metadata);
            returnItems.Add(item);
          }
          Dependencies = returnItems.ToArray();
          return true;
        }
        catch(Exception ex)
        {
          Log.LogErrorFromException(ex);
          return false;
        }
      ]]>
    </Code>
  </Task>
</UsingTask>
```

If you're industrious, you could package that build task into an assembly so it's not inline in your script, but... I didn't. Plus this lets you see the source.

Now you can use that build task along with the MSBuild Community Tasks "FileUpdate" task to do some smart search and replace. Here are a couple of MSBuild snippets showing how:

```xml
<!-- At the top/project level... -->
<!-- You need MSBuild Community Tasks for the FileUpdate task. -->
<Import Project="tasks\MSBuild.Community.Tasks.targets" />
<PropertyGroup>
  <!-- This is where NuGet installed the packages for your solution. -->
  <PackageInstallDirectory>$(MSBuildProjectDirectory)\packages</PackageInstallDirectory>
</PropertyGroup>

<!-- Inside a build target... -->
<ItemGroup>
  <!--
      This should include all of the .nuspec files you want to update. These should
      probably be COPIES in a staging folder rather than the originals so you don't
      modify the actual source code.
  -->
  <NuspecFiles Include="path\to\*.nuspec" />
</ItemGroup>
<!--
    Parse out the installed versions from the list of installed
    packages using the custom task.
-->
<GetNuGetDependencyVersions PackageInstallDirectory="$(PackageInstallDirectory)">
  <Output TaskParameter="Dependencies" ItemName="LocatedDependencies" />
</GetNuGetDependencyVersions>
<!-- Use the MSBuild Community Tasks "FileUpdate" to do the search/replace. -->
<FileUpdate
  Files="@(NuspecFiles)"
  Regex="\$version_%(LocatedDependencies.Identity)\$"
  ReplacementText="%(LocatedDependencies.Version)" />
```

Generally what you'll want to do from a process perspective, then, is:

1. Build and test your project as usual.
2. Create a temporary folder to stage your NuGet packages. Copy the .nuspec file in along with the built assemblies, etc. [in the appropriate folder structure](http://docs.nuget.org/docs/creating-packages/creating-and-publishing-a-package).
3. Run the file update process outlined above to update the staged .nuspec files.
4. Run `nuget pack`on the staged packages to build the final output.

This will ensure the final built NuGet packages all have dependencies set to be the same version you're building and testing against.
