---
layout: post
title: "Scripting NuPkg Reference Changes for Testing"
date: 2014-04-01 -0800
comments: true
disqus_identifier: 1840
tags: [net]
---
I was testing out some changes to versioning in
[Autofac](https://github.com/autofac/Autofac). We have [a MyGet
feed](https://www.myget.org/gallery/autofac), but all of the internal
dependencies of the various NuGet packages when they're built point to
the CI versions, so it's sort of hard to stage a test of what things
will look like when they're released – you have to rename each .nupkg
file to remove the "-CI-XYZ" build number, open each .nupkg file, change
the internal .nuspec file to remove the "-CI-XYZ" build number info,
then re-zip everything up. In testing, I had to do this a few times, so
I scripted it.

I put everything in a folder structure like this:

-   \~/TestFeed
    -   backup – contains all of the original .nupkg files (renamed
        without the "-CI-XYZ")
    -   msbuildcommunitytasks – contains the [MSBuild Community
        Tasks](https://github.com/loresoft/msbuildtasks) set

Then I wrote up a quick MSBuild script for doing all the
extract/update/rezip stuff. I could have used any other scripting
language, but, eh, the batching and file scanning in MSBuild made a few
things easy.

`msbuild fixrefs.proj /t:Undo` puts the original packages (from the
backup folder) into the test feed folder.

`msbuild fixrefs.proj` Does the zip/fix/re-zip.

One of the challenges I ran into was that the zip task in MSBuild
Community Tasks seemed to always want to add an extra level of folders
into the .nupkg – I couldn't get the original contents to live right at
the root of the package. Rather than fight it, I used 7-Zip to do the
re-zipping. I probably could have gotten away from the MSBuild Community
Tasks entirely had I some form of `sed` on my machine because I needed
that `FileUpdate` task. But... Windows. And, you know, path of least
resistance. I think this was a five-minute thing. Took longer to write
this blog entry than it did to script this.

Here's "fixrefs.proj":

    <?xml version="1.0" encoding="utf-8"?>
    <Project DefaultTargets="All" xmlns="http://schemas.microsoft.com/developer/msbuild/2003" ToolsVersion="4.0">
      <PropertyGroup>
        <MSBuildCommunityTasksPath>.</MSBuildCommunityTasksPath>
        <SevenZip>C:\Program Files\7-Zip\7z.exe</SevenZip>
      </PropertyGroup>
      <Import Project="$(MSBuildProjectDirectory)\msbuildcommunitytasks\MSBuild.Community.Tasks.Targets"/>
      <ItemGroup>
        <Package Include="*.nupkg"/>
      </ItemGroup>
      <Target Name="All">
        <MakeDir Directories="%(Package.Filename)" />
        <Unzip ZipFileName="%(Package.FullPath)" TargetDirectory="%(Package.Filename)" />
        <ItemGroup>
          <NuSpec Include="**/*.nuspec" />
        </ItemGroup>
        <FileUpdate Files="@(NuSpec)" Regex="(.)\-CI\-\d+" ReplacementText="$1" WarnOnNoUpdate="true" />
        <Delete Files="@(Package)" />
        <CallTarget Targets="ZipNewPackage" />
        <RemoveDir Directories="%(Package.Filename)" />
      </Target>
      <Target Name="Undo">
        <Delete Files="@(Package)" />
        <ItemGroup>
          <Original Include="backup/*.nupkg" />
        </ItemGroup>
        <Copy SourceFiles="@(Original)" DestinationFolder="$(MSBuildProjectDirectory)" />
      </Target>
      <Target Name="ZipNewPackage" Inputs="@(Package)" Outputs="%(Identity).Dummy">
        <Exec
          Command="&quot;$(SevenZip)&quot; a -tzip &quot;$(MSBuildProjectDirectory)\%(Package.Filename)%(Package.Extension)&quot;"
          WorkingDirectory="$(MSBuildProjectDirectory)\%(Package.Filename)" />
      </Target>
    </Project>

