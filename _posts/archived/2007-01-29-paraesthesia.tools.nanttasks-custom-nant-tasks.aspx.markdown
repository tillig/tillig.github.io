---
layout: post
title: "Paraesthesia.Tools.NAntTasks - Custom NAnt Tasks"
date: 2007-01-29 -0800
comments: true
disqus_identifier: 1139
tags: [downloads,vs,build,net]
---
I use NAnt to do my automated builds both at home and at work. As such,
I decided to start keeping a little library of custom NAnt tasks that
help me get things done. I'll add to this library of custom tasks as
things get fixed and new things get added.

 To use the tasks, add a standard `<loadtasks />` line to your NAnt
build script and reference the custom task assembly. After that, you can
use the tasks just like you would any other built-in NAnt task. It'll
look like this:

 `<loadtasks assembly="Paraesthesia.Tools.NAntTasks.dll" />`

 The available tasks include:

>
>  **alpharesx**: The `<alpharesx />` task is used to alphabetize
> resource files (\*.resx) by resource ID. This is helpful in an
> environment where automated tools are used to merge resource file
> contents (like the built-in merge facilities in many source control
> products). Since many diff products don't do XML data differencing,
> odd merging tends to happen, especially when several developers are
> working in the same .resx file. Keeping the resources in a fixed
> order, in this case alphabetical, reduces confusion for the diff tool
> and makes automated merging much simpler and more reliable. It also
> helps when hand-editing the .resx file to be able to find what you're
> looking for in an easier fashion.
>
>
>  **lintrelativepaths**: When you add a reference to an assembly from a
> project, a "HintPath" is added to point to the location of that
> assembly. If it's a standard .NET Framework assembly, that "HintPath"
> will point to the .NET Framework assembly deep inside the WINDOWS
> folder. That's not a problem... until you get multiple developers
> working on the same source but checking it out to different locations
> on their machines. The reason is that by default, references get added
> with *relative paths* - so you might see something like
> `..\..\WINDOWS\Microsoft.NET\Framework\v1.1.4322\System.dll`. However,
> if that's not the relative path to the .NET 1.1 System.dll from where
> I checked out the code, my build will fail. How do you solve it? I
> solve it by using absolute paths - rather than
> `..\..\WINDOWS\Microsoft.NET\Framework\v1.1.4322\System.dll`, I put
> `\WINDOWS\Microsoft.NET\Framework\v1.1.4322\System.dll`. (Not
> foolproof, but far more reliable.)
>
>  This task searches specified files using a regular expression and
> fails the build if you have relative paths to common locations like
> `WINDOWS`, `Inetpub`, or `Program Files`.
>
>
>  **nunitexec**: The `<nunitexec />` task is a replacement for the
> built-in `<nunit2 />` task. With NAnt and NUnit versions changing,
> there's all nature of trouble in getting the built-in task to work
> using assembly binding redirects and so forth. Generally people switch
> over to use the NUnit console application to avoid the issue, but the
> `<exec />` task doesn't allow the nice syntax of the built-in
> `<nunit2 />` task and changing working build scripts over is a pain.
>
>  `<nunitexec />` has identical syntax to the built-in `<nunit2 />`
> task, it just runs the console app. An option is included to allow you
> to specify the location of the NUnit console application. Refer to
> [the `<nunit2 />`
> documentation](http://nant.sourceforge.net/release/latest/help/tasks/nunit2.html)
> for a description of how to specify formatters and tests to run.
>
>
>  **propertydelete**: NAnt lets you create properties, change property
> values... but not delete them. That makes the `property::exists` test
> fairly limited. There are times when you might want to make a property
> *not exist* so you can better make use of simple tests like
> `property::exists`. That's what the `<propertydelete />` task does -
> it doesn't just unset the property, it deletes it so it no longer
> exists.

 Usage documentation is included in a CHM file in the binary
distribution (or as XML doc in the code). It includes syntax
descriptions and examples. You can get the source to the tasks as well.
If you find a bug, send me email or leave a comment and give me a way to
reproduce the issue.

 [Download Paraesthesia.Tools.NAntTasks
2.0.0.0](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!45411&authkey=!ALMe903OOYTQhoU&ithint=file%2czip)
 [Download Paraesthesia.Tools.NAntTasks 2.0.0.0
Source](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!45410&authkey=!AM6wM4J2TLcyATY&ithint=file%2czip)

 **Version History:**
 **1.0.0.0**: First release. Includes nunitexec task.
 **1.1.0.0**: Added alpharesx, lintrelativepaths, and propertydelete.
 **2.0.0.0**:
-   Updated to .NET 2.0.
-   Updated to NAnt 0.86 beta 1.
-   Fixed nunitexec task to no longer output the "framework" parameter.
-   Fixed nunitexec task to properly quote only the value of
    command-line parameters.
-   Fixed alpharesx to output .resx files in 2.0 schema format.


