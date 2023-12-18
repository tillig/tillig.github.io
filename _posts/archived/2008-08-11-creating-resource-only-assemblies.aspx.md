---
layout: post
title: "Creating Resource-Only Assemblies"
date: 2008-08-11 -0800
comments: true
disqus_identifier: 1428
tags: [gists,dotnet,build]
---
Working on some localization stuff, I've come across the need for
resource assemblies to be created from [.resx
files](http://msdn.microsoft.com/en-us/library/ekyft91f.aspx) in a
post-build step - I have the .resx files, but I don't want them at all
to be attached to my application. I just want them built into a tiny
hierarchy of resource-only assemblies so I can get a
[ResourceManager](http://msdn.microsoft.com/en-us/library/system.resources.resourcemanager.aspx)
on them and have string lookup behave as expected.

I also find that sometimes I need to recompile .resx without recompiling
the whole app and I forget the command-lines to do all that.

The overall process:

1.  Convert your .resx files to .resources files using `resgen.exe`.
2.  Link your .resources files into assembly format using `al.exe`.

Again, what I'm showing here assumes that the assemblies you're
compiling are *resource-only* - which is to say, there is no code to
compile and you're not linking resources into existing assemblies.

For a culture-neutral (default) resource-only assembly, you'll use:

```cmd
resgen.exe "Path\To\Culture\Neutral\Strings.resx" "Path\To\Output\Folder\Strings.resources"
al.exe /embed:"Path\To\Output\Folder\Strings.resources" /out:"Path\To\Bin\Strings.dll"
```

The first command line generates the .resources file from .resx and puts
it in an output folder. It doesn't really matter where the output folder
is; it's a temporary place to store the .resources file before it gets
compiled into an assembly. The second line links the .resource file into
assembly format and puts it in your application's "bin" folder, where
you can start to consume it.

For a culture-specific resource-only assembly, you add culture-specific
parameters and output locations into the mix:

```cmd
resgen.exe "Path\To\Culture\Specific\Strings.es.resx" "Path\To\Output\Folder\Strings.es.resources"
al.exe /c:es /embed:"Path\To\Output\Folder\Strings.es.resources" /out:"Path\To\Bin\es\Strings.resources.dll"
```

In the above example, we're compiling general Spanish resources, as
noted by the "es" in there. If we wanted Spanish specific to Mexico,
we'd use "es-MX" as the culture. The key differences to note:

-   In the .resx and .resources files, we specify the culture before the
    extension. While this isn't mandatory, it is standard convention and
    helps you keep your source .resx and output .resources files
    organized.
-   In the `al.exe` command line, we add the `/c:` parameter to specify
    what culture we're linking for and we put the output assembly in a
    folder under "bin" that is named after the culture we're linking
    for. We also add "resources" just before the .dll extension so the
    ResourceManager knows it's a resource assembly. (You don't do that
    for culture-neutral resources, so you didn't see that before.)

This is pretty easy to do in a Visual Studio project post-build step,
too:

```cmd
"$(VS80COMNTOOLS)..\..\SDK\v2.0\Bin\resgen.exe" "$(ProjectDir)\Strings.resx" "$(TargetDir)Strings.resources"
"$(WINDIR)\Microsoft.NET\Framework\v2.0.50727\al.exe" /embed:"$(TargetDir)Strings.resources" /out:"$(TargetDir)Strings.dll"
"$(VS80COMNTOOLS)..\..\SDK\v2.0\Bin\resgen.exe" "$(ProjectDir)\Strings.es.resx" "$(TargetDir)Strings.es.resources"
"$(WINDIR)\Microsoft.NET\Framework\v2.0.50727\al.exe" /c:es /embed:"$(TargetDir)Strings.es.resources" /out:"$(TargetDir)es\Strings.resources.dll"
```

Note we had to specify some paths to `resgen.exe` and `al.exe` because
the post-build step isn't run as part of a Visual Studio 2008 command
prompt environment.

Obviously, change your paths and parameters as needed, but the above
compiles and links a neutral and a generic Spanish "Strings" assembly in
a post-build step.
