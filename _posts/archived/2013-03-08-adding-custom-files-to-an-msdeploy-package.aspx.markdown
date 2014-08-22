---
layout: post
title: "Adding Custom Files to an MSDeploy Package"
date: 2013-03-08 -0800
comments: true
disqus_identifier: 1813
tags: [.NET,Web Development]
---
As part of some of my web projects I have "plugin assemblies" that
aren't directly referenced by the project but are things I want included
in my deployment package. I tried following the instructions [on this
fairly popular blog
entry](http://sedodream.com/2010/05/01/WebDeploymentToolMSDeployBuildPackageIncludingExtraFilesOrExcludingSpecificFiles.aspx),
but it didn't seem to work - that blog entry tells you to modify a set
of files during a stage in the packaging pipeline
"`CopyAllFilesToSingleFolderForPackageDependsOn`" and that target never
actually fired for me. In fact, I threw an \<Error\> call in there just
to see if I could get the build to fail and… no luck.

It also seems that manually copying the files over into the deployment
staging/temporary folder stopped working - you can copy them over, but
they instantly get deleted just before packaging occurs.

Turns out a lot of the way the MSDeploy packaging stuff in
`Microsoft.WebApplication.targets` works changed in Visual Studio 2012
and… it's like no one out there noticed. Or maybe everyone solved the
problem and forgot to blog it. Or maybe I'm some special edge case.
Anyway, it took some serious reverse-walkthrough of the packaging
process to figure out what needs to happen. (Yeah, that was a day
wasted.)

Now, instead of "`CopyAllFilesToSingleFolderForPackageDependsOn`" for
the event to handle, use
"`PipelineCopyAllFilesToOneFolderForMsdeployDependsOn`" for including
your custom files. Once you do that, you don't have to copy the files
into the staging area or anything; the packaging process will do that
for you.

Something else that changed - the "`Package`" target in
`Microsoft.WebApplication.targets` seems to rely on the "`Build`" target
in some cases. I tried setting the property so "`Package`" wouldn't rely
on "`Build`" (`PipelineDependsOnBuild`) but it always ended up doing
some portion of "`Build`." The problem there is that "`Build`"(from
`Microsoft.Common.targets`) wants to run a target called
"`IntermediateClean`" that deletes a bunch of stuff out of your `bin`
folder - even assemblies that were built due to project references.
(This happens more during a command line build than during a VS build.
They're treated differently… which is pretty annoying.) What this means
is you have to "fool" the "`IntermediateClean`" during the packaging
process so it doesn't clean out your plugins. You do that by setting a
"magic" item called `FileWrites` to contain all the stuff you want to
keep.

Here's a snippet from my web project .csproj file showing how I just
include everything in the bin folder since I want all the copied-in
dependencies to be kept for the packaging:

    <PropertyGroup>
      <PipelineCopyAllFilesToOneFolderForMsdeployDependsOn>
        IncludePluginFilesForMsdeploy;
        $(PipelineCopyAllFilesToOneFolderForMsdeployDependsOn);
      </PipelineCopyAllFilesToOneFolderForMsdeployDependsOn>
    </PropertyGroup>
    <Target Name="IncludePluginFilesForMsdeploy">
      <ItemGroup>
        <FileWrites Include="$(MSBuildProjectDirectory)\bin\**\*" />
        <_CustomFiles Include="$(MSBuildProjectDirectory)\bin\**\*" />
        <FilesForPackagingFromProject Include="%(_CustomFiles.Identity)">
          <DestinationRelativePath>bin\%(RecursiveDir)%(Filename)%(Extension)</DestinationRelativePath>
        </FilesForPackagingFromProject>
      </ItemGroup>
    </Target>

That all has to go *after* the line that imports the
`Microsoft.WebApplication.targets` file.

