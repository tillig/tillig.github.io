---
layout: post
title: "MSBuild Build Variants in Sublime Text 2"
date: 2012-11-26 -0800
comments: true
disqus_identifier: 1795
tags: [net,gists]
---
Sublime Text 2 has a nice feature where you can hit "Ctrl+B" or select
"Tools -\> Build" from the menus and, based on the current file type, a
build system will be automatically selected and executed against that
file.

I recently released an update to [my MSBuild package for Sublime Text
2](https://github.com/tillig/SublimeMSBuild) that includes some "build
variants" for MSBuild that specifically set Debug or Release
configuration during the build. Basically:

`msbuild yourscript.proj /p:Configuration=Debug`
or
`msbuild yourscript.proj /p:Configuration=Release`

I didn't know [this was
possible](http://docs.sublimetext.info/en/latest/reference/build_systems.html)
until recently or I'd have put it in from the get-go. Note **it assumes
either that your project is a standard .csproj or .vbproj, or that
you're using the standard "Configuration" variable** name to denote
build configuration. It also doesn't do anything with platform, so
whatever your project defaults to, that's what it'll build.

As it turns out, it's not clear how you access build variants from
inside Sublime Text and it's not obvious - it doesn't show up on the
menu.

**To access Sublime Text 2 build variants:**

-   Open the Command Palette (either "Ctrl+Shift+P" or "Tools -\>
    Command Palette…").
-   In the window, type "Build:" to filter the list of commands. Note
    the colon ":" on the end there - it filters the list down to just
    the build commands.
-   Select the build type you'd like. For my MSBuild package, you'll
    see:
    -   "Build: Build" - default, no configuration specified
    -   "Build: Debug Configuration" - specifies "Configuration=Debug"
    -   "Build: Release Configuration" - specifies
        "Configuration=Release"

Build variants are not specific to my package - other packages may also
provide build variants with other names.

Related to this,**some folks have asked why I haven't supplied a "build
and run" option** the way some other packages have. The short answer is:
I can't. Here's why:

MSBuild is sort of a scripting language. You can write an MSBuild script
that just copies a bunch of files around or zips some things up. You can
have an MSBuild script that just generates some reports. Or maybe your
MSBuild script kicks off several other MSBuild scripts, each of which
build something.

Even if you narrow the scope to .csproj or .vbproj files (which, yes,
are in MSBuild format), you can build a lot of different things - an
.exe, sure, but what if it's a web site project? Or a WCF service? Or an
Azure project? What does "build and run" do then?

The reason Visual Studio is able to handle this is that it **narrows the
scope of its handling** (only actual project files can have "startup
actions" - you can't have that for a .proj or .targets file); and **it
"knows" about different project types** and how to start them up.

When you have a web site project, it "knows" that in your project
properties you should be able to specify which URL you want to view when
it starts up the browser… and it knows to start up IIS Express (or the
VS dev server) to host the site. Further, when you have a solution
(multiple projects that all build together - like an MSBuild script that
triggers several other MSBuild scripts) you can specify which project(s)
should be started up and which actions should be taken at that time.
That's why you see all those .suo and .user files out there alongside
your solutions/projects. **It's a system external to the build system**
that maintains all that information.

You can "make Visual Studio 'know' about new project types" by
installing VS add-ins and components. For example, when you install the
Azure SDK, it tells Visual Studio about Azure project types and how to
handle the startup action.

**Unfortunately, all of that's a bit beyond the scope of what I can
provide in Sublime Text.**

If you would like a "build and run" experience, **I would recommend
writing a small "wrapper script"** that triggers your real script and
build that instead.

For example, say you have a project "MyProject.csproj" that builds
"MyProject.exe." A wrapper might look like this:

    <?xml version="1.0" encoding="utf-8"?>
    <Project DefaultTargets="BuildAndRun" xmlns="http://schemas.microsoft.com/developer/msbuild/2003" ToolsVersion="4.0">
      <PropertyGroup>
        <Configuration Condition="'$(Configuration)'==''">Debug</Configuration>
      </PropertyGroup>
      <Target Name="BuildAndRun">
        <MSBuild Projects="MyProject.csproj" Properties="Configuration=$(Configuration)" />
        <Exec Command="MyProject.exe" WorkingDirectory="$(MSBuildProjectDirectory)/bin/$(Configuration)" />
      </Target>
    </Project>

In this way, the wrapper script knows what the "run" action is and you
can still use the Debug/Release configuration build variants. Obviously
if you have a web site or something other than a simple .exe, your "run"
action is going to be more involved. I'll leave that as an exercise for
the reader.

