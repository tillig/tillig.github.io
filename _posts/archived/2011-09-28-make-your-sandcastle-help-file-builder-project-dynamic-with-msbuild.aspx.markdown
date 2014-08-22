---
layout: post
title: "Make Your Sandcastle Help File Builder Project Dynamic with MSBuild"
date: 2011-09-28 -0800
comments: true
disqus_identifier: 1737
tags: [.NET,GeekSpeak]
---
When building a [Sandcastle Help File
Builder](http://shfb.codeplex.com/) (SHFB) project in the GUI, you
manually specify the list of assemblies you want to document. However,
if you want to make the execution of it a little more flexible, you can
do a bit of MSBuild magic to dynamically build up the list of
documentation sources for the project prior to execution.

The reason this works is that SHFB has changed its command-line
execution to run through MSBuild using build tasks rather than a
standalone executable. (Though with the executable, you could go through
some steps to fashion a response file, you can skip the temporary file
creation now.)

**First, create your SHFB project in the GUI.** Set up all the various
settings including a few assemblies and make sure it builds the
documentation properly.

**Next, run the SHFB build from the command line.** SHFB projects are
MSBuild projects now, so you can run them through MSBuild at a Visual
Studio command prompt:

`MSBuild Documentation.shfbproj`

This establishes that everything is working properly from the command
line. You'll need that because when you make the project dynamic, you'll
have to run it from the command line.

**Create a new MSBuild project file** that you will use to dynamically
build the list of documentation sources (assemblies/XML files) and add a
target in it that will run the SHFB project.

If you are using SHFB 1.9.3.0 from .NET 4.0, you can use the MSBuild
task directly, like this:

    <?xml version="1.0" encoding="utf-8"?>
    <Project DefaultTargets="Build" xmlns="http://schemas.microsoft.com/developer/msbuild/2003" ToolsVersion="4.0">
      <Target Name="Build">
        <MSBuild ToolsVersion="4.0" Projects="Documentation.shfbproj" />
      </Target>
    </Project>

On the other hand, if you're using SHFB 1.9.1.0 from .NET 4.0, you'll
need to use the Exec task to run a .NET 3.5 MSBuild process manually,
like this:

    <?xml version="1.0" encoding="utf-8"?>
    <Project DefaultTargets="Build" xmlns="http://schemas.microsoft.com/developer/msbuild/2003" ToolsVersion="4.0">
      <Target Name="Build">
        <!--
          You have to use MSBuild 3.5 with SHFB or you get a warning
          telling you that any parameters you pass will be ignored.
        -->
        <Exec
          Command="&quot;$(windir)\Microsoft.NET\Framework\v3.5\MSBuild.exe&quot; Documentation.shfbproj"
          WorkingDirectory="$(MSBuildProjectDirectory)" />
      </Target>
    </Project>

**Execute your new MSBuild project** and make sure the documentation
still builds.

**Open up the SHFB project in a text editor and find the
`DocumentationSources` XML node.** This is the bit that we're going to
make dynamic. The node in question looks like this:

    <DocumentationSources>
      <DocumentationSource sourceFile="..\build_output\bin\Assembly1.dll" />
      <DocumentationSource sourceFile="..\build_output\bin\Assembly1.xml" />
      <DocumentationSource sourceFile="..\build_output\bin\Assembly2.dll" />
      <DocumentationSource sourceFile="..\build_output\bin\Assembly2.xml" />
    </DocumentationSources>

The tricky part here is that **`DocumentationSources` is a *property*,
not an *item***, so when you make this value dynamic you actually need
to build an XML string, not a list of files like you would for other
tasks.

**Remove the `DocumentationSources` node from the SHFB project file**
(or comment it out). We'll be building that dynamically and passing it
in as a parameter.

**In your new MSBuild project file, use an `ItemGroup` to locate all of
the .dll and .xml files** that should be included in your documentation.
These are the files you will have seen in the list of
`DocumentationSources`:

    <ItemGroup>
      <DocTarget Include="..\build_output\bin\*.dll;..\build_output\bin\*.xml;" />
    </ItemGroup>

**Use the `CreateProperty` task to build the XML string** that contains
each `DocumentationSource` node:

    <CreateProperty Value="@(DocTarget -> '&lt;DocumentationSource sourceFile=%27%(FullPath)%27 /&gt;', '')">
      <Output TaskParameter="Value" PropertyName="DocumentationSources" />
    </CreateProperty>

Finally, **pass the list of DocumentationSources to the SHFB project
when you run it**.

If you're using the MSBuild task:

    <MSBuild
      ToolsVersion="4.0"
      Projects="Documentation.shfbproj"
      Properties="DocumentationSources=$(DocumentationSources)" />

If you're using the Exec task:

    <Exec
      Command="&quot;$(windir)\Microsoft.NET\Framework\v3.5\MSBuild.exe&quot; Documentation.shfbproj /p:DocumentationSources=&quot;$(DocumentationSources)&quot;"
      WorkingDirectory="$(MSBuildProjectDirectory)" />

A complete MSBuild script that uses SHFB 1.9.3.0 and the MSBuild task
looks like this:

    <?xml version="1.0" encoding="utf-8"?>
    <Project DefaultTargets="Build" xmlns="http://schemas.microsoft.com/developer/msbuild/2003" ToolsVersion="4.0">
      <Target Name="Build">
        <ItemGroup>
          <DocTarget Include="..\build_output\bin\*.dll;..\build_output\bin\*.xml;" />
        </ItemGroup>
        <CreateProperty Value="@(DocTarget -> '&lt;DocumentationSource sourceFile=%27%(FullPath)%27 /&gt;', '')">
          <Output TaskParameter="Value" PropertyName="DocumentationSources" />
        </CreateProperty>
        <MSBuild
          ToolsVersion="4.0"
          Projects="Documentation.shfbproj"
          Properties="DocumentationSources=$(DocumentationSources)" />
      </Target>
    </Project>

**Done! A dynamic Sandcastle Help File Builder project that you'll never
have to update** as you add or change the assemblies you want
documented.

