---
layout: post
title: "Robust File Finding in Your App with MSBuild"
date: 2009-05-22 -0800
comments: true
disqus_identifier: 1531
tags: [Code Snippets,.NET]
---
I'm working on an application where we wanted to be able to provide some
config or command line parameters that would specify a particular set of
files for processing. What might be considered the "standard" set of
.NET framework libraries comes with
[System.IO.Directory.GetFiles()](http://msdn.microsoft.com/en-us/library/system.io.directory.getfiles.aspx),
but the wildcard support is pretty weak. I don't want to find "\*.dll"
recursively, I want support like "recursively search folders under this
tree for \*.dll but exclude Foo.dll" or something.

So I started thinking - what has that sort of include/exclude support
and robust wildcard matching?

**MSBuild**.

When you use the
[CreateItem](http://msdn.microsoft.com/en-us/library/s2y3e43x.aspx)
task, you can specify all nature of wildcards, like this:

    <CreateItem
     Include="**/bin/**/*.dll"
     Exclude="**/Foo.dll">
       <Output
        TaskParameter="Include"
        ItemName="MyItemName" />
    </CreateItem>

The \*\* will be expanded to mean "any number of folders" and the
filename wildcards will work to properly include/exclude files. Way, way
better than GetFiles(). But how do you harness that power for your own
use *outside of a build system*?

Actually, it turns out to be super easy. Basically:

1.  Add references to the Microsoft.Build.Framework,
    Microsoft.Build.Tasks, and Microsoft.Build.Utilities assemblies.
    They should be in the GAC.
2.  Instantiate a Microsoft.Build.Tasks.CreateItem task object.
3.  Add items to the Include/Exclude list.
4.  Execute the task and ensure the operation was successful.
5.  Read the results out of the "Include" property on the task object.
    Read the metadata off of the items using the "GetMetadata" method.
    The metadata items available are [the MSBuild Well-Known Item
    Metadata
    values](http://msdn.microsoft.com/en-us/library/ms164313.aspx).

Here's a code snippet showing a simple example:

    // Instantiate the task
    CreateItem task = new CreateItem();

    // Add paths/wildcards to include
    task.Include = new ITaskItem[]
    {
      new TaskItem(@"C:\path\**\*.txt")
    };

    // Add paths/wildcards to exclude
    task.Exclude = new ITaskItem[]
    {
      new TaskItem(@"C:\path\bin\**\*.*"),
      new TaskItem(@"**\_svn\**\*.*"),
    };

    // Execute the task, check for success
    bool success = task.Execute();
    Console.WriteLine("Success: {0}", success);
    if(!success)
    {
      return;
    }

    // Get the list of matching items from "Include"
    // and use the "GetMetadata" property to find out the path.
    foreach(ITaskItem include in task.Include)
    {
      Console.WriteLine("* {0}", include.GetMetadata("FullPath"));
    }

Awesome! Now I don't have to write that file finding code myself!

