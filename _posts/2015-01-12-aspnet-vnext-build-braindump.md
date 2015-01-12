---
layout: post
title: "An ASP.NET vNext Build and Repo Structure Braindump"
date: 2015-01-12 -0800
comments: true
tags: [aspnet,net,autofac,github]
---
[Alex](http://alexmg.com/) and I are working on switching [Autofac](http://autofac.org) over to ASP.NET vNext and as part of that we're trying to figure out what the proper structure is for a codeline, how a build should look, and so on.

**There is a surprisingly small amount of documentation on the infrastructure bits.** I get that things are moving quickly but the amazing lack of docs of any detail creates for a steep learning curve and a lot of frustration. I mean, you can [read about the schema for `project.json`](https://github.com/aspnet/Home/wiki/Project.json-file) but even that is out of date/incomplete so you end up diving into the code, trying to reverse-engineer how things come together.

Below is a sort of almost-stream-of-consciousness braindump of things I've found while working on sorting out build and repo structure for Autofac.

#No More MSBuild - Sake + KoreBuild

If you're compiling only on a Windows platform you can still use MSBuild, but if you look at [the ASP.NET vNext repos](https://github.com/aspnet), you'll see **there's no MSBuild to be found**.

This is presumably to support cross-platform compilation of the ASP.NET libraries and the K runtime bits. That's a good goal and it's worth pursuing - we're going that direction for at least core Autofac and a few of the other core libs that need to change (like Autofac.Configuration). Eventually I can see all of our stuff switching that way.

The way it generally works in this system is:

- A base `build.cmd` (for Windows) and `build.sh` (for Linux) use NuGet to download the `Sake` and `KoreBuild` packages.
- The scripts kick off the Sake build engine to run a `makefile.shade` which is platform-agnostic.
- The Sake build engine, which is written in cross-platform .NET, handles the build execution process.

##The Sake Build System
[`Sake` is a C#-based make/build system](https://github.com/sakeproject/sake) that appears to have been around for quite some time. _There is pretty much zero documentation on this_, which makes figuring it out fairly painful.

From what I gather, it is based on the [Spark view engine](https://github.com/SparkViewEngine/spark) and uses `.shade` view files as the build scripts. When you bring in the `Sake` package, you get several shared `.shade` files that get included to handle common build tasks like updating assembly version information or running commands.

It enables cross-platform builds because Spark, C#, and the overall execution process works both on Mono and Windows .NET.

One of the nice things it has built in, and a compelling reason to use it beyond the cross-platform support, is that **a convention-based standard build lifecycle** that runs clean/build/test/package targets in a standard order. You can easily hook into this pipeline to add functionality but you don't have to think about the order of things. It's pretty nice.

##The KoreBuild Package
[`KoreBuild` is a build system layered on top of `Sake`](https://github.com/aspnet/Universe) that is used to build K projects. As with Sake, _there is zero doc on this_.

If you're using the new K build system, though, and you're OK with adopting Sake, **there's a lot of value in the KoreBuild package**. KoreBuild layers in Sake support for automatic NuGet package restore, native compile support, and other K-specific goodness. [The `_k-standard-goals.shade` file is where you can see the primary set of things it adds.](https://github.com/aspnet/Universe/blob/dev/build/_k-standard-goals.shade)

##The Simplest Build Script
Assuming you have committed to the `Sake` and `KoreBuild` way of doing things, you can get away with an amazingly simple top-level build script that will run a standard clean/build/test/package lifecycle automatically for you.

```
var AUTHORS='Your Authors Here'

use-standard-lifecycle
k-standard-goals
```

At the time of this writing, the `AUTHORS` value must be present or some of the standard lifecycle bits will fail... but since the real authors for your package are specified in `project.json` files now, this really just is a placeholder that has to be there. It doesn't appear to matter what the value is.

#Embedded Resources Have Changed

There is currently no mention of how embedded resources are handled in [the documentation on `project.json`](https://github.com/aspnet/Home/wiki/Project.json-file) but if you look at [the schema](http://json.schemastore.org/project) you'll see that you can specify a `resources` element in `project.json` the same way you can specify `code`.

A project with embedded resources might look like this (minus the `frameworks` element and all the dependencies and such to make it easier to see):

```json
{
    "description": "Enables Autofac dependencies to be registered via configuration.",
    "authors": ["Autofac Contributors"],
    "version": "4.0.0-*",
    "compilationOptions": {
        "warningsAsErrors": true
    },
    "code": ["**\\*.cs"],
    "resources": "**\\*.resx"
    /* Other stuff... */
}
```

##Manifest Resource Path Changes
If you include `.resx` files as resources, they correctly get converted to `.resources` files without doing anything. However, if you have other resources, like an embedded XML file...

```json
{
    "code": ["**\\*.cs"],
    "resources": ["**\\*.resx", "Files\\*.xml"]
}
```

...then you get an odd generated path. Easiest to see with an example. Say you have this:

```
~/project/
  src/
    MyAssembly/
      Files/
        Embedded.xml
```

In old Visual Studio/MSBuild, the file would be embedded and the internal manifest resource stream path would be `MyAssembly.Files.Embedded.xml` - the folders would represent namespaces and path separators would basically become dots.

However, in the new world, you get a manifest resource path `Files/Embedded.xml` - literally **the relative path to the file being embedded**. If you have unit tests or other stuff where embedded files are being read, this will throw you for a loop.

##No .resx to .Designer.cs
A nice thing about the resource system in VS/MSBuild was the custom tool that would run to convert `.resx` files into strongly-typed resources in `.Designer.cs` files. **There's no automatic support for this anymore.**

However, if you give in to the `KoreBuild` way of things, they do package an analogous tool inside `KoreBuild` that you can run as part of your command-line build script. It won't pick up changes if you add resources to the file in VS, but it'll get you by.

**To get `.resx` building strongly-typed resources, add it into your build script like this:**

```
var AUTHORS='Your Authors Here'

use-standard-lifecycle
k-standard-goals

#generate-resx .resx description='Converts .resx files to .Designer.cs' target='initialize'
```

What that does is add a `generate-resx` build target to your build script that runs during the `initialize` phase of the standard lifecycle. The `generate-resx` target dependes on a target called `resx` which does the actual conversion to `.Designer.cs` files. The `resx` target comes from `KoreBuild` and is included when you include the `k-standard-goals` script, but it doesn't run by default, which is why you have to include it yourself.

**Gotcha**: The way it's currently written, your `.resx` files must be in the root of your project (it doesn't use the `resources` value from `project.json`). They will generate the `.Designer.cs` files into the `Properties` folder of your project. This isn't configurable.

#ASP.NET Repo Structure is Path of Least Resistance
If you give over to `Sake` and `KoreBuild`, it's probably good to also give over to the source repository structure used in the ASP.NET vNext repositories. Particularly in `KoreBuild` there are some hardcoded assumptions in certain tasks that you're using that repo structure.

The structure looks like this:

```
~/MyProject/
  src/
    MyProject.FirstAssembly/
      Properties/
        AssemblyInfo.cs
      MyProject.FirstAssembly.kproj
      project.json
    MyProject.SecondAssembly/
      Properties/
        AssemblyInfo.cs
      MyProject.SecondAssembly.kproj
      project.json
  test/
    MyProject.FirstAssembly.Test/
      Properties/
        AssemblyInfo.cs
      MyProject.FirstAssembly.Test.kproj
      project.json
    MyProject.SecondAssembly.Test/
      Properties/
        AssemblyInfo.cs
      MyProject.SecondAssembly.Test.kproj
      project.json
  build.cmd
  build.sh
  global.json
  makefile.shade
  MyProject.sln
```

The key important bits there are:
 - Project source is in the `src` folder.
 - Tests for the project are in the `test` folder.
 - There's a top-level solution file (if you're using Visual Studio).
 - The `global.json` points to the `src` file as the place for project source.
 - There are `build.cmd` and `build.sh` scripts to kick off the cross-platform builds.
 - The top-level `makefile.shade` handles build orchestration.
 - The folder names for the source and test projects are _the names of the assemblies they generate_.
 - Each assembly has...
   - `Properties` with `AssemblyInfo.cs` where the `AssemblyInfo.cs` doesn't include any versioning information, just other metadata.
   - A `.kproj` file (if you're using Visual Studio) that is named after the assembly being generated.
   - A `project.json` that spells out the authors, version, dependencies, and other metadata about the assembly being generated.

Again, a lot of assumptions seem to be built in that you're using that structure. You can save a lot of headaches by switching.

**I can see this may cause some long-path problems.** Particularly if you are checking out code into a deep file folder and have a long assembly name, you could have trouble. Think `C:\users\myusername\Documents\GitHub\project\src\MyProject.MyAssembly.SubNamespace1.SubNamespace2\MyProject.MyAssembly.SubNamespace1.SubNamespace2.kproj`. That's 152 characters right there. Add in those crazy WCF-generated `.datasource` files and things are going to start exploding.

#Assembly/Package Versioning in `project.json`
Part of what you put in `project.json` is your project/package version:

```json
{
    "authors": ["Autofac Contributors"],
    "version": "4.0.0-*",
    /* Other stuff... */
}
```

**There desn't appear to be a way to keep multiple assemblies in a solution consistently versioned.** That is, you can't put the version info in the `global.json` at the top level and I'm not sure where else you could store it. You could probably come up with a custom build task to handle centralized versioning, but it'd be nice if there was something built in for it.

#XML Doc Compilation Warnings
The old compiler `csc.exe` had a thing where it would automatically output compiler warnings for XML documentation errors (syntax or reference errors). The K compiler apparently doesn't do this by default so they added custom support for it in the `KoreBuild` package.

**To get XML documentation compilation warnings output in your build, add it into your build script like this:**

```
var AUTHORS='Your Authors Here'

use-standard-lifecycle
k-standard-goals

#xml-docs-test .clean .build-compile description='Check generated XML documentation files for errors' target='test'
  k-xml-docs-test
```

That adds a new `xml-docs-test` target that runs during the `test` part of the lifecycle (after `compile`). It requires the project to have been cleaned and built before running. When it runs, it calls the `k-xml-docs-test` target to manually write out XML doc compilation warnings.

#Runtime Update Gotchas
Most `build.cmd` or `build.sh` build scripts have a line like this:

```
CALL packages\KoreBuild\build\kvm upgrade -runtime CLR -x86
CALL packages\KoreBuild\build\kvm install default -runtime CoreCLR -x86
```

Basically:
- Get the latest K runtime from the feed.
- Set the latest K runtime as the 'default' one to use.

While I think this is fine early on, I can see a couple of gotchas with this approach.

- **Setting the 'default' modifies the user profile.** When you call `kvm install default` the intent is to set the aliast `default` to refer to the specified K runtime version (in the above example, that's the latest version). When you set this alias, it modifies a file attached to the user profile containing the list of aliases - it's a global change. What happens if you have a build server environment where lots of builds are running in parallel? **You're going to get the build processes changing aliases out from under each other.**
- **How does backward compatibility work?** At this early stage, I do want the latest runtime to be what I build against. Later, though, I'm guessing I want to pin a revision of the runtime in my build script and always build against that to ensure I'm compatible with applications stuck at that runtime version. I guess that's OK, but is there going to be a need for some sort of... "binding redirect" (?) for runtime versions? Do I need to specify some sort of "list of supported runtime versions?"

#Testing Means XUnit and aspnet50
At least at this early stage, XUnit seems to be the only game in town for unit testing. The `KoreBuild` stuff even has XUnit support built right in, so, again, path of least resistance is to switch if you're not already on it.

I did find a gotcha, though, where **if you want `k test` to work your assemblies must target `aspnet50`**.

Which is to say... in your unit test `project.json` you'll have a line to specify the test runner command:

```json
{
    "commands": {
        "test": "xunit.runner.kre"
    },
    "frameworks": {
        "aspnet50": { }
    }
}
```

Specifying that will allow you to drop to a command prompt inside the unit test assembly's folder and run `k test` to execute the unit tests.

In early work for Autofac.Configuration I was trying to get this to work with the Autofac.Configuration assembly only targeting `aspnetcore50` and the unit test assembly targeting `aspnetcore50`. When I ran `k test` I got a bunch of exceptions (which I didn't keep track of, sorry). After a lot of trial and error, **I found that if both my assembly under test (Autofac.Configuration) and my unit test assembly (Autofac.Configuration.Test) both targeted `aspnet50` then everything would run perfectly**.

#PCL Support is In Progress

It'd be nice if there was a portable class library profile that just handled everything rather than all of these different profiles + `aspnet50` + `aspnetcore50`. There's not. I gather from Twitter conversations that this may be in the works but I'm not holding my breath.

Also, **there's a gotcha with Xamarin tools**: If you're using a profile (like `Profile259`) that targets a common subset of a lot of runtimes including mobile platforms, then **the output of your project will change based on whether or not you have Xamarin tools installed**. For example, without Xamarin installed you might get `.nupkg` output for `portable-net45+win+wpa81+wp80`. However, _with_ Xamarin installed that same project will output for `portable-net45+win+wpa81+wp80+monotouch+monoandroid`.

#Configuration Changes
Obviously with the break from System.Web and some of the monolithic framework, you don't really have `web.config` as such anymore. Instead, [the configuration system has become `Microsoft.Framework.ConfigurationModel`](https://github.com/aspnet/Configuration).

It's a pretty nice and flexible abstraction layer that lets you specify configuration in XML, JSON, INI, or environment variable format. [You can see some examples here.](http://whereslou.com/2014/05/23/asp-net-vnext-moving-parts-iconfiguration/)

That said, it's a huge change and takes a lot to migrate.

- **No `appSettings`.** I'm fine with this because `appSettings` always ended up being a dumping ground, but it means everything you have originally tied to `appSettings` needs to change.
- **No `ConfigurationElement` objects.** I can't tell you how much I have written in the old `ConfigurationElement` mechanism. It had validation, strong type parsing, serialization, the whole bit. All of that will not work in this new system. You can imagine how this affects things like Autofac.Configuration.
- **List and collection support is nonexistent.** I've actually filed [a GitHub issue about this](https://github.com/aspnet/Configuration/issues/125). A lot of the configuration I have in both Autofac.Configuration and elsewhere is a list of elements that are parameterized. **The current XML and JSON parsers for config specifically disallow list/collection support.** Everything must be a unique key in a tree-like hierarchy. That sort of renders the new config system, at least for me, pretty much unusable except for the most trivial of things. Hopefully this changes.
- **Everything is file or in-memory.** There's no current support for pulling in XML or JSON configuration that comes from, say, a REST API call from a centralized repository. Even in unit testing, all the bits that actually run the configuration parsing on a stream of XML/JSON are internals rather than exposed - you _have_ to load config from a file or manually create it yourself in memory by adding key/value pairs. [There's a GitHub issue open for this, too.](https://github.com/aspnet/Configuration/issues/121)

As a workaround, I'm considering using custom object serialization and bypassing the new configuration system altogether. I like the flexibility of the new system but the limitations are pretty overwhelming right now.
