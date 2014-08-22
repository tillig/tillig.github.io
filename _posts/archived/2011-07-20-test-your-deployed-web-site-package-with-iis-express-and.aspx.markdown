---
layout: post
title: "Test Your Deployed Web Site Package with IIS Express and Visual Studio"
date: 2011-07-20 -0800
comments: true
disqus_identifier: 1726
tags: [.NET,Visual Studio,Web Development]
---
With [the ability to transform your web.config file when deploying your
web site](http://msdn.microsoft.com/en-us/library/dd465318.aspx) came,
at least for me, a question: **How do I test my web site's behavior
without deploying a whole copy of my web site?**

I figured out a reasonable, if slightly kludgy, solution and I figured
I'd share. The general idea is to have a project in Visual Studio
that...

-   Acts as the point of entry for debugging the packaged version of the
    web site.
-   Automatically updates IIS Express configuration to point to the
    packaged web site.

What it allows you to do is hit F5 and IIS Express will start up pointed
to the packaged version of the web site rather than the one in your
source tree. It'll have the transformed web.config (and any other
build-time changes) so you'll be debugging what would normally be
deployed.

First, **create an empty class library project in your solution**. You
won't actually put code in here; it's a marker that you can use as the
Debug startup project. I called mine **DebugPlaceholder**.

Next, **add a Project Reference** in your debug placeholder project to
all of the web sites you want to have set up automatically in IIS
Express.

Now it's time to manually edit the debug placeholder project a bit.
**Open the debug placeholder .csproj in a text editor.**

Scroll down until you find the list of project references. **Inside each
ProjectReference node**...

-   Add a node called **IISExpressUrl**. Inside that node put the URL
    that IIS Express will host the site on.
-   Add a node called **IISExpressBindings**. This is another way of
    writing the URL, but in IIS binding format.

A sample modified ProjectReference node looks like this:

    <ProjectReference Include="..\MyWebApplication\MyWebApplication.csproj">
      <Project>{8F2D1C2C-E12D-4880-B731-66F5051A6EF1}</Project>
      <Name>ChannelWebApplication</Name>
      <IISExpressUrl>http://localhost:22446</IISExpressUrl>
      <IISExpressBindings>http/*:22446:localhost</IISExpressBindings>
    </ProjectReference>

Again, the URL and Bindings listed up there need to match (note the port
in each matches) and they need to be unique for each project. (IIS
Express can't host multiple sites at the same listening destination.)
The path to the project, the project GUID, and the project Name will, of
course, be your own values that were put there when you added the
project reference.

**IMPORTANT: The endpoint you list in the project references can't be
the same as the one you have set up in the Web settings of your web
application.** The problem is that you can't stop VS from launching IIS
Express (or the Visual Studio dev server, or whatever) when you start
debugging, so if you have your web application, say, configured to
listen to port 22446 and you have your debug placeholder set to
configure the deployed project to 22446, then you'll get a failure. I'm
not sure this is really a limitation since you probably shouldn't have
anything in your web app that's glued to the specific port anyway.

What you just did was add some metadata to each project reference that
you can use later. We'll use it in the AfterBuild target.

Scroll down to almost the bottom of the debug placeholder .csproj and
**uncomment the AfterBuild target**.

**Inside the AfterBuild target, put these three lines**:

    <MSBuild Projects="%(ProjectReference.FullPath)" Targets="Package" Properties="Configuration=$(Configuration);Platform=$(Platform)" />
    <Exec Command="&quot;$(MSBuildProgramFiles32)\IIS Express\appcmd.exe&quot; delete site %(ProjectReference.IISExpressUrl)" ContinueOnError="true" />
    <Exec Command="&quot;$(MSBuildProgramFiles32)\IIS Express\appcmd.exe&quot; add site /name:&quot;%(ProjectReference.Name)&quot; /bindings:%(ProjectReference.IISExpressBindings) /physicalPath:&quot;%(ProjectReference.RootDir)%(ProjectReference.Directory)obj\$(Configuration)\Package\PackageTmp&quot;" />

What those do:

-   Run the "Package" target on the web application projects that you've
    referenced.
-   Deletes and then re-adds the IIS Express configuration that points
    to the referenced projects. (That way if you've got multiple copies
    of the source checked out, you'll be sure to always be pointed to
    the one you're working on.)

The key thing you'll note is in that last line - **we're referring IIS
Express to the obj folder** for each web project where the packaging
target stages files.

The last thing you need to do is choose one of the project references as
the site you want to start up when debugging. That's a limitation of
this solution - you only get to choose one site to start. You'll have to
start and/or attach to the others manually. (On the other hand, if your
solution only has one web site then it's no big deal.)

Scroll up to the top of the debug placeholder .csproj file and add the
following three properties to the very top PropertyGroup (the one
without a Condition on it):

    <StartAction>Program</StartAction>
    <StartProgram>$(MSBuildProgramFiles32)\IIS Express\iisexpress.exe</StartProgram>
    <StartArguments>/site:MyWebApplication</StartArguments>

This makes it so you're checking in the information about what to start
up when you debug rather than storing it in an external .csproj.user
file. You want to do this so it's easy for everyone using the source to
debug. Note that last property, StartArguments, contains the name of one
of your project references. **See how the Name property on the project
reference matches the name of the site starting up?**

**Now just set the debug placeholder as your startup project and fire it
up.** The solution will build, your web application will run through a
package process, and IIS Express will start up pointed to the deployed
version of the app. Visual Studio will attach to it, and then it's up to
you to start up your browser and do your testing.

Below is an example DebugPlaceholder.csproj with the edits highlighted
so you can see what a finished project looks like. **Standard disclaimer
applies: No warranty, no support, you're on your own. Works on My
Machine!** Have fun!

    <?xml version="1.0" encoding="utf-8"?>
    <Project ToolsVersion="4.0" DefaultTargets="Build" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
      <PropertyGroup>
        <Configuration Condition=" '$(Configuration)' == '' ">Debug</Configuration>
        <Platform Condition=" '$(Platform)' == '' ">AnyCPU</Platform>
        <ProductVersion>8.0.30703</ProductVersion>
        <SchemaVersion>2.0</SchemaVersion>
        <ProjectGuid>{594FFDF6-6911-47DA-AE93-29CBCE757C19}</ProjectGuid>
        <OutputType>Library</OutputType>
        <AppDesignerFolder>Properties</AppDesignerFolder>
        <RootNamespace>DebugPlaceholder</RootNamespace>
        <AssemblyName>DebugPlaceholder</AssemblyName>
        <TargetFrameworkVersion>v4.0</TargetFrameworkVersion>
        <FileAlignment>512</FileAlignment>
        <StartAction>Program</StartAction>
        <StartProgram>$(MSBuildProgramFiles32)\IIS Express\iisexpress.exe</StartProgram>
        <StartArguments>/site:MyWebApplication</StartArguments>
      </PropertyGroup>
      <PropertyGroup Condition=" '$(Configuration)|$(Platform)' == 'Debug|AnyCPU' ">
        <DebugSymbols>true</DebugSymbols>
        <DebugType>full</DebugType>
        <Optimize>false</Optimize>
        <OutputPath>bin\Debug\</OutputPath>
        <DefineConstants>DEBUG;TRACE</DefineConstants>
        <ErrorReport>prompt</ErrorReport>
        <WarningLevel>4</WarningLevel>
      </PropertyGroup>
      <PropertyGroup Condition=" '$(Configuration)|$(Platform)' == 'Release|AnyCPU' ">
        <DebugType>pdbonly</DebugType>
        <Optimize>true</Optimize>
        <OutputPath>bin\Release\</OutputPath>
        <DefineConstants>TRACE</DefineConstants>
        <ErrorReport>prompt</ErrorReport>
        <WarningLevel>4</WarningLevel>
      </PropertyGroup>
      <ItemGroup>
        <Reference Include="System" />
        <Reference Include="System.Core" />
        <Reference Include="System.Xml.Linq" />
        <Reference Include="System.Data.DataSetExtensions" />
        <Reference Include="Microsoft.CSharp" />
        <Reference Include="System.Data" />
        <Reference Include="System.Xml" />
      </ItemGroup>
      <ItemGroup>
        <Compile Include="Properties\AssemblyInfo.cs" />
      </ItemGroup>
      <ItemGroup>
        <ProjectReference Include="..\MyWebApplication\MyWebApplication.csproj">
          <Project>{8F2D1C2C-E12D-4880-B731-66F5051A6EF1}</Project>
          <Name>MyWebApplication</Name>
          <IISExpressUrl>http://localhost:22446</IISExpressUrl>
          <IISExpressBindings>http/*:22446:localhost</IISExpressBindings>
        </ProjectReference>
      </ItemGroup>
      <Import Project="$(MSBuildToolsPath)\Microsoft.CSharp.targets" />
      <!-- To modify your build process, add your task inside one of the targets below and uncomment it. 
           Other similar extension points exist, see Microsoft.Common.targets.
      <Target Name="BeforeBuild">
      </Target>  -->
      <Target Name="AfterBuild">
        <MSBuild Projects="%(ProjectReference.FullPath)" Targets="Package" Properties="Configuration=$(Configuration);Platform=$(Platform)" />
        <Exec Command="&quot;$(MSBuildProgramFiles32)\IIS Express\appcmd.exe&quot; delete site %(ProjectReference.IISExpressUrl)" ContinueOnError="true" />
        <Exec Command="&quot;$(MSBuildProgramFiles32)\IIS Express\appcmd.exe&quot; add site /name:&quot;%(ProjectReference.Name)&quot; /bindings:%(ProjectReference.IISExpressBindings) /physicalPath:&quot;%(ProjectReference.RootDir)%(ProjectReference.Directory)obj\$(Configuration)\Package\PackageTmp&quot;" />
      </Target>
    </Project>

