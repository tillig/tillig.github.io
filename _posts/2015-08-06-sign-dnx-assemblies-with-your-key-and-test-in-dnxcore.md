---
layout: post
title: "Sign DNX Assemblies with Your Own Key... and Test Under DNX Core"
date: 2015-08-06 -0800
comments: true
tags: [autofac,dotnet,testing]
---

[Autofac](https://github.com/autofac/Autofac) DNX support is under way and as part of that we're supporting both DNX and DNX Core platforms. [As of DNX beta 6, you can sign DNX assemblies using your own strong name key](http://blogs.msdn.com/b/webdev/archive/2015/07/27/announcing-availability-of-asp-net-5-beta-6.aspx).

To use your own key, you need to add it to the `compilationOptions` section of your `project.json` file:

``` json
{
  "compilationOptions": {
    "keyFile": "myApp.snk"
  }
}
```

Make sure not to specify `keyFile` and `strongName` at the same time - you can only have one or the other.

The challenge we ran into was with testing: We wanted to run our tests under both DNX and DNX Core to verify the adjustments we made to handle everything in a cross-platform fashion. Basically, we wanted this:

```batch
dnvm use 1.0.0-beta6 -r CLR
dnx test/Autofac.Test test
dnvm use 1.0.0-beta6 -r CoreCLR
dnx test/Autofac.Test test
```

Unfortunately, that yields an error:

```text
System.IO.FileLoadException : Could not load file or assembly 'Autofac, Version=4.0.0.0, Culture=neutral, PublicKeyToken=null' or one of its dependencies. General Exception (Exception from HRESULT: 0x80131500)
---- Microsoft.Framework.Runtime.Roslyn.RoslynCompilationException : warning DNX1001: Strong name generation is not supported on CoreCLR. Skipping strongname generation.
error CS7027: Error signing output with public key from file '../../Build/SharedKey.snk' -- Assembly signing not supported.
Stack Trace:
     at Autofac.Test.ContainerBuilderTests.SimpleReg()
  ----- Inner Stack Trace -----
     at Microsoft.Framework.Runtime.Roslyn.RoslynProjectReference.Load(IAssemblyLoadContext loadContext)
     at Microsoft.Framework.Runtime.Loader.ProjectAssemblyLoader.Load(AssemblyName assemblyName, IAssemblyLoadContext loadContext)
     at Microsoft.Framework.Runtime.Loader.ProjectAssemblyLoader.Load(AssemblyName assemblyName)
     at dnx.host.LoaderContainer.Load(AssemblyName assemblyName)
     at dnx.host.DefaultLoadContext.LoadAssembly(AssemblyName assemblyName)
     at Microsoft.Framework.Runtime.Loader.AssemblyLoaderCache.GetOrAdd(AssemblyName name, Func`2 factory)
     at Microsoft.Framework.Runtime.Loader.LoadContext.Load(AssemblyName assemblyName)
     at System.Runtime.Loader.AssemblyLoadContext.LoadFromAssemblyName(AssemblyName assemblyName)
     at System.Runtime.Loader.AssemblyLoadContext.Resolve(IntPtr gchManagedAssemblyLoadContext, AssemblyName assemblyName)
```

[I ended up filing an issue about it to get some help figuring it out.](https://github.com/aspnet/dnx/issues/2409)

**Under the covers, DNX rebuilds the assembly under test rather than using the already-built artifacts.** This was entirely unclear to me since you don't actually see any rebuild process happen. If you turn DNX tracing on (`set DNX_TRACE=1`) then you actually will see that Roslyn is recompiling.

**If you want to test the same build output under different runtimes, you need to publish your tests as though they are applications.** Which is to say, you need to use the `dnu publish` command on your unit test projects, like this:

```batch
dnu publish test\Your.Test --configuration Release --no-source --out C:\temp\Your.Test
```

When you run `dnu publish` you'll get all of the build output copied to the specified output directory and you'll get some small scripts corresponding to the commands in the `project.json`. For a unit test project, this means you'll see `test.cmd` in the output folder. To execute the unit tests, you run `test.cmd` rather than `dnx test\Your.Test test` on your tests.

The Autofac tests now run (basically) like this:

```batch
dnvm use 1.0.0-beta6 -r CLR
dnu publish test\Autofac.Test --configuration Release --no-source --out .\artifacts\tests
.\artifacts\tests\test.cmd
dnvm use 1.0.0-beta6 -r CoreCLR
.\artifacts\tests\test.cmd
```

**Publishing the unit tests bypasses the Roslyn recompile**, letting you sign the assembly with your own key but testing under Core CLR.

[**I published an example project on GitHub showing this in action.**](https://github.com/tillig/DnxStrongNameIssueRepro) In there you'll see two build scripts - one that breaks because it doesn't use `dnu publish` and one that works because it publishes the tests before executing.
