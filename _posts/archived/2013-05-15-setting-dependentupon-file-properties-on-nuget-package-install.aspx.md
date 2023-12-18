---
layout: post
title: "Setting DependentUpon File Properties on NuGet Package Install"
date: 2013-05-15 -0800
comments: true
disqus_identifier: 1818
tags: [dotnet,vs]
---
In working on some NuGet packages, one thing I wanted to do was set up
some configuration files in preparation for
[SlowCheetah](http://nuget.org/packages/SlowCheetah/) integration.
Instead of seeing a folder structure like this in the project...

-   \~/Config
    -   MyConfig.config
    -   MyConfig.Debug.config
    -   MyConfig.Release.config

I wanted to see the file dependencies set up like you usually get with
Web.config:

-   \~/Config
    -   MyConfig.config
        -   MyConfig.Debug.config
        -   MyConfig.Release.config

That's not really a straightforward thing to do, as it turns out.

Luckily, [NuGet provides your package the ability to have a PowerShell
script run at install
time](http://docs.nuget.org/docs/creating-packages/creating-and-publishing-a-package),
and part of what it passes you is a reference to [the EnvDTE
project](http://msdn.microsoft.com/en-us/library/51h9a6ew(v=vs.110).aspx)
into which the package is being installed.

EnvDTE is the way you automate Visual Studio for things like custom
tools and add-ins. [I've messed around with EnvDTE
before](/archive/2004/06/25/solvent-power-toys-for-visual-studio-.net.aspx)
(though lately [I prefer using CodeRush for my automation
tasks](http://www.devexpress.com/Products/Visual_Studio_Add-in/Coding_Assistance/))
so this wasn't too hard to get back into. Here's the script for
Install.ps1:

    param($installPath, $toolsPath, $package, $project)
    # Sets the configuration files to have dependent transforms (.Debug/.Release).
    # Selections of items in the project are done with Where-Object rather than direct
    # access into the ProjectItems collection because if the object is moved or doesn't
    # exist then Where-Object will give us a null response rather than the error that
    # DTE will give us.

    $configFolder = $project.ProjectItems | Where-Object { $_.Properties.Item("Filename").Value -eq "Config" -and  $_.ProjectItems.Count -gt 0 }
    if($configFolder -eq $null)
    {
      # Upgrade scenario - user has moved/removed the Config folder
      # or has moved/removed the configuration files out of the folder.
      return
    }

    $baseConfig = $configFolder.ProjectItems | Where-Object { $_.Properties.Item("Filename").Value -eq "MyConfig.config" -and $_.ProjectItems.Count -eq 0 }
    if($baseConfig -eq $null)
    {
      # Upgrade scenario - user has moved/removed the MyConfig.config file
      # or it already has the dependent items set.
      return
    }

    # Config file exists, so update the properties.
    $baseConfig.Properties.Item("SubType").Value = "Designer"

    $debugConfig = $configFolder.ProjectItems | Where-Object { $_.Properties.Item("Filename").Value -eq "MyConfig.Debug.config" }
    if($debugConfig -eq $null)
    {
      # Upgrade scenario - user has moved/removed the MyConfig.Debug.config file
      # or it's already set as a dependent item. (Dependent items show up as children
      # of the file on which they depend, not as a child of the folder.)
      return
    }

    # Handle the update for MyConfig.Debug.config - set it as BuildAction = None
    # and move it to be a dependency of MyConfig.config.
    $debugConfig.Properties.Item("ItemType").Value = "None"
    $baseConfig.ProjectItems.AddFromFile($debugConfig.Properties.Item("FullPath").Value)

    $releaseConfig = $configFolder.ProjectItems | Where-Object { $_.Properties.Item("Filename").Value -eq "MyConfig.Release.config" }
    if($releaseConfig -eq $null)
    {
      # Upgrade scenario - user has moved/removed the MyConfig.Release.config file
      # or it's already set as a dependent item. (Dependent items show up as children
      # of the file on which they depend, not as a child of the folder.)
      return
    }

    # Handle the update for MyConfig.Release.config - set it as BuildAction = None
    # and move it to be a dependency of MyConfig.config.
    $releaseConfig.Properties.Item("ItemType").Value = "None"
    $baseConfig.ProjectItems.AddFromFile($releaseConfig.Properties.Item("FullPath").Value)

What this does is switch this .csproj snippet...

    <ItemGroup>
      <Content Include="MyConfig.config" />
      <Content Include="MyConfig.Debug.config" />
      <Content Include="MyConfig.Release.config" />
    <ItemGroup>

Into this:

    <ItemGroup>
      <Content Include="MyConfig.config">
        <SubType>Designer</SubType>
      </Content>
      <None Include="MyConfig.Debug.config">
        <DependentUpon>MyConfig.config</DependentUpon>
      </None>
      <None Include="MyConfig.Release.config">
        <DependentUpon>MyConfig.config</DependentUpon>
      </None>
    <ItemGroup>

What I've not yet figured out is how to get a new custom element
`<TransformOnBuild>true</TransformOnBuild>` to show up on the
MyConfig.config element. [From this article on
MSDN](http://msdn.microsoft.com/en-us/library/vstudio/bb491814.aspx), it
appears there's a much more involved bit of work to do and I'm not sure
that I have access to all the requisite DTE objects from inside the
script.
