---
layout: post
title: "Custom NAnt Tasks Calling Other Tasks"
date: 2006-05-05 -0800
comments: true
disqus_identifier: 994
tags: [gists,csharp,build]
---
We use [NAnt](http://nant.sourceforge.net/) to automate our build
process, and right now I'm working on refactoring the build that my
group uses for continuous integration. One of the things I noticed is
that when our product builds, the main build file "includes" a few other
build files and executes targets from them. One of the build files that
gets included only ever has one target called, and it does a bunch of
internal work to get a lot of things done. It looks a lot like this:

![Build script
flow]({{ site.url }}/images/20060505nantflow.gif)

Notice how there's only one entry point in the external build file and
the tasks inside call other tasks, some of which are common, almost like
NAnt "functions" that pass parameters by setting properties. Not only
that, but part of the build output for the product is to include this
build script so other products can include it and use it in the same
way. I don't know about you, but this says "custom NAnt task" to me.

In converting this to a custom NAnt task, I found that part of what the
script was doing was calling other custom NAnt tasks. Not wanting to
replicate all of the functionality of these other custom NAnt tasks, I
figured I'd write my custom task to call the other tasks
programmatically.

Interestingly enough, this isn't as straightforward as you might think,
and NAnt documentation on this is, well, *light*. You can't just create
the task object and call it, you actually have to give the created task
some context about the environment it's working in. You do this by
calling the `CopyTo` method on the task object. By and large, the way it
looks is this:

```csharp
using System;

using NAnt.Core;
using NAnt.Core.Attributes;
using NAnt.Core.Tasks;

namespace MyCustomNAntTasks {
  [TaskName("customtask")]
  public class MyCustomTask : Task {
    protected override void ExecuteTask() {
      this.Log(Level.Info, "Starting custom task...");

      // Create and execute a <tstamp /> task
      this.Log(Level.Verbose, "Executing a tstamp task...");
      TStampTask tstamp = new TStampTask();
      this.CopyTo(tstamp);
      tstamp.Execute();

      // Create and execute a <sysinfo /> task
      this.Log(Level.Verbose, "Executing a sysinfo task...");
      SysInfoTask sysinfo = new SysInfoTask();
      this.CopyTo(sysinfo);
      sysinfo.Execute();

      this.Log(Level.Verbose, "Executing custom work...");
      // TODO: Insert your custom task's work here

      this.Log(Level.Info, "Custom task complete.");
    }
  }
}
```

That seems to work well for most tasks. Some tasks require more
initialization than just `CopyTo`, like the setting of properties or
what-have-you, so you'll need to set that stuff up for things to work
since you don't get the validation benefits that you get when NAnt
parses the build script and tells you when you're missing required
values.

 One task I haven't gotten to work like this is the `<csc />` task - for
some reason, I haven't figured out how to properly add references to the
task to get it to work. Instead of calling `<csc />`, I ended up writing
a quick method using the
[Microsoft.CSharp.CSharpCodeProvider](http://msdn2.microsoft.com/en-US/library/microsoft.csharp.csharpcodeprovider.aspx)
to compile things directly.

**Minor update**: I actually ended up having to use an `<exec />` task
to build the code rather than the
[Microsoft.CSharp.CSharpCodeProvider](http://msdn2.microsoft.com/en-US/library/microsoft.csharp.csharpcodeprovider.aspx)
because I didn't see a way with the code provider to specify a target
framework, whereas you can call the framework-specific `csc.exe` based
on NAnt project settings and the correct framework will be used.
