---
layout: post
title: "Why NAnt Is Better Than MSBuild"
date: 2008-01-08 -0800
comments: true
disqus_identifier: 1334
tags: [net,vs]
---
I've been writing a lot of build scripts and custom build tasks in both
[NAnt](http://nant.sourceforge.net/) and
[MSBuild](http://msdn2.microsoft.com/en-us/library/wea2sca5(VS.80).aspx)
lately and, based on this experience, I've decided I like NAnt a lot
more than MSBuild. Here's why:

-   **NAnt lets you run tasks before any targets run; MSBuild doesn't.**
    I commonly have some "setup" actions that need to happen before
    anything else in a build script happens. Stuff like registering
    NCover or starting up TypeMock. It's stuff that needs to happen
    once, before any other target runs. In NAnt, I can put all of that
    stuff at the top of the build script, outside any target, and it'll
    all get run. In MSBuild, every task has to be inside a target, so I
    have to make sure that every single target in my build script
    depends on my "setup" target.
-   **NAnt custom tasks can interact with build properties; MSBuild
    custom tasks can't.**Some of the custom task stuff I want to do is
    to make things easy for people by letting them set up properties in
    the environment and having things "just work." For example, a task
    to generate an AssemblyInfo.cs file with assembly version
    information already populated based on CruiseControl settings might
    look for the CCNetLabel property in the environment and set things
    up automatically based on that.
     
     In a NAnt custom task, I have access to the full set of properties
    inherently. MSBuild custom tasks are entirely isolated so I need to
    manually pass that in as a parameter from my script.
     
     One parameter isn't so bad - but what if you want to perform logic
    in your task based on five or six parameters? 10?
-   **NAnt properties are manipulated in a consistent fashion; MSBuild
    properties are handled differently in different contexts.** In NAnt,
    I can create or change a property just by calling the \<property\>
    task. In MSBuild, it's different if I'm outside of a target
    (\<PropertyGroup\>) or inside a target (\<CreateProperty\>). This
    inconsistency makes for a difficult learning curve.
-   **NAnt wildcards, when dealing with the filesystem, match both files
    and folders; MSBuild wildcards only match files.** This is a heck of
    a problem when you want to create a dynamic item list in MSBuild of
    folders you want to clean up. You can't just delete "\*\*/bin" - you
    have to manually locate *every single one*.
-   **NAnt allows you to load an entire assembly's worth of tasks at
    once; MSBuild requires each task to be separately loaded.** In NAnt,
    I do \<loadtasks\> on an assembly and I've got all of the tasks in
    the assembly at my disposal. In MSBuild, I have to do a
    \<UsingTask\> for every single task I'm using.
-   **NAnt includes task assemblies in the executing AppDomain; MSBuild
    doesn't.** This is a problem if you have one custom task assembly
    that references another custom task assembly. Say you have custom
    task MyDerivedTask that is a derived/modified version of
    SomeBaseTask. They're in separate assemblies. Maybe SomeBaseTask is
    in a third-party assembly I don't want to (or can't) redistribute.
     
     In NAnt, I can \<loadtasks\> on both custom task assemblies and
    everything is okay. When I call MyDerivedTask, the assembly
    containing SomeBaseTask is found and everything is good.
     
     In MSBuild, even if I do a \<UsingTask\> on SomeBaseTask to include
    it, I can't \<UsingTask\> the MyDerivedTask *unless my custom task
    assembly is in the same folder as the assembly containing
    SomeBaseTask*. If I do, the \<UsingTask\> on MyDerivedTask will
    throw an exception saying it can't find the assembly containing
    SomeBaseTask.

I mean, I get the whole "side-effect free" concept behind "isolating"
the MSBuild tasks and everything, but it seems like NAnt is so vastly
more flexible without it. Is there something I'm missing? Some
development philosophy they had when coming up with MSBuild that will
put all this into perspective and make me see why MSBuild is so much
better? Or am I right? Does NAnt really whip MSBuild's behind in almost
every area?

