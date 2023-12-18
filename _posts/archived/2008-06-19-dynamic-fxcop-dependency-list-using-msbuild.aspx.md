---
layout: post
title: "Dynamic FxCop Dependency List Using MSBuild"
date: 2008-06-19 -0800
comments: true
disqus_identifier: 1401
tags: [gists,dotnet,build]
---
When you're integrating
[FxCop](http://msdn.microsoft.com/en-us/library/bb429476.aspx) into your
build using
[MSBuild](http://msdn.microsoft.com/en-us/library/0k6kkbsd.aspx), you
have three basic options.

1. Build a static project file that contains all of the FxCop settings
    for your solution and run the command line client against that.
2. Skip the project file entirely and run the command-line client
    alone, specifying all of the options on the command line.
3. Build a partial project file that contains things that don't change
    regularly (like the list of rules you want to run) and tell the
    FxCop command line client to use that as well as some dynamic
    properties you specify on the command line.

Usually you end up with option 3 - a partial project file and dynamic
properties on the command line. The problem is that [command lines have
a maximum length
limitation](http://blogs.msdn.com/oldnewthing/archive/2003/12/10/56028.aspx)
and once you get into Very Large Projects, there may be dozens of
folders that FxCop needs to search for assembly dependencies as well as
several places you need to point FxCop to so it can find the assemblies
you want to analyze. Those are things you normally specify on the
command line... but in that Very Large Project scenario, you hit the
command line length limit pretty quick.

(You might think using [a custom task to run the FxCop
process](http://msbuildtasks.tigris.org/) might fix it, but only if it
doesn't pipe the output to the command line and try to run it.)

The solution? Dynamically generate an FxCop project file with the list
of your dependency folders in it. Then you don't have to worry about any
of that showing up on the command line.

- Create an empty FxCop project. Set up the rules you want to run, etc., but don't put any target assemblies in there. Save that project and exit FxCop.
- Open the FxCop project in your favorite text editor and find the `/FxCopProject/Targets` node. It will be empty.
- Open that `Targets` node and add a block so it looks like this:

```xml
<Targets>
  <AssemblyReferenceDirectories>
  <!-- @DIRECTORIES@ -->
  </AssemblyReferenceDirectories>
</Targets>
```

- Save the FxCop project. We're going to use that comment to do a replacement in the file and poke in the list of dependency folders.
- Open your MSBuild script and import the [MSBuild Community Tasks](http://msbuildtasks.tigris.org/). You'll need these for the `FileUpdate` task.
- Just before you run FxCop, add a section to your build script that creates an item list of all of your potential dependencies. For my build, all of my third-party dependencies are in one directory tree. After that, create a copy of your FxCop project and use the FileUpdate task to poke in the list of directories. (I'll show the code below.)
- Run FxCop using the new temporary copy of the FxCop project file that has your dynamic list of assembly reference locations. Done - no more need to worry about command line length limits, and if you keep all of your dependencies in one folder tree, you can add or remove them without having to update your FxCop project file and things will still work.

Here's that snippet of MSBuild code to dynamically enumerate the files
and poke them into the FxCop project:

```xml
<!--
     Create a temporary copy of the FxCop project.
  -->
<Copy
  SourceFiles="Build\FxCop Project.FxCop"
  DestinationFolder="$(TempDirectory)"/>

<!--
     Create an item with all of the dependencies in it. Creating multiple
     items with the same name will actually append everything into one big
     item. Here we have two folder trees with dependencies and we're
     ignoring the Subversion files.
  -->
<CreateItem
  Include="$(DependencyFolder1)\**"
  Exclude="$(DependencyFolder1)\**\_svn\**">
  <Output TaskParameter="Include" ItemName="Dependencies"/>
</CreateItem>
<CreateItem
  Include="$(DependencyFolder2)\**"
  Exclude="$(DependencyFolder2)\**\_svn\**">
  <Output TaskParameter="Include" ItemName="Dependencies"/>
</CreateItem>

<!--
     Update the temporary copy of the FxCop project with the dynamic list
     of dependencies. Using MSBuild batching, we won't get duplicates. The
     replacement expression shows we're only interested in the directories
     for the dependencies, not the dependencies themselves.
  -->
<FileUpdate
  Files="$(TempDirectory)\FxCop Project.FxCop"
  Regex="&lt;!-- @DIRECTORIES@ --&gt;"
  ReplacementText="&lt;!-- @DIRECTORIES@ --&gt;&lt;Directory&gt;%(Dependencies.RootDir)%(Dependencies.Directory)&lt;/Directory&gt;"/>

<!--
     Now we can run FxCop against the temporary copy of the FxCop project
     and not worry about specifying dependency folders.
  -->
```

You can apply this pattern to any list of files or folders you need to
dynamically poke into files like FxCop or NDepend project files. Even if
you're not worried about the command line length limit, by dynamically
generating these things you make your build more robust and require less
manipulation as your project changes. Good luck!
