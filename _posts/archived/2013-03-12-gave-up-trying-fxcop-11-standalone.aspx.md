---
layout: post
title: "Gave Up Trying FxCop 11 Standalone"
date: 2013-03-12 -0800
comments: true
disqus_identifier: 1814
tags: [dotnet,vs]
---
In FxCop 10 you could run code analysis without installing Visual Studio
by either [grabbing just the FxCop stuff out of Visual
Studio](/archive/2010/03/29/updating-your-continuous-integration-build-to-run-fxcop-from-vs2010.aspx)
or installing the Windows SDK.

**Not so, with FxCop 11. There's no longer a standalone installer - it's
been removed from the Windows SDK.**

I tried grabbing the FxCop out of Visual Studio 2012 and it fails with
the exception:
`System.IO.FileNotFoundException: Could not load file or assembly 'Microsoft.VisualStudio.CodeAnalysis.Interop.dll' or one of its dependencies. The specified module could not be found.`

Using [Dependency Walker](http://www.dependencywalker.com/) on
`Microsoft.VisualStudio.CodeAnalysis.Interop.dll`, you can see a ton of
missing assembly references:

-   `msvcp110.dll`
-   msvcr110.dll
-   `ieshims.dll`
-   mf.dll
-   mfplat.dll
-   mfreadwrite.dll
-   `wlanapi.dll`

The `msvc*.dll `assemblies are part of [the Visual C++
redistributable](http://www.microsoft.com/en-us/download/details.aspx?id=30679),
so I tried installing that and it did fix those issues. The ieshims.dll
is part of Internet Explorer, so adding
`C:\Program Files\Internet Explorer `to the path fixed that. The
`mf*.dll `files, though... that's media related. Like, "Media Player"
style. I've seen places that you can get that with WPF bits.

I made sure my build server had all the latest patches after dealing
with the Visual C++ and IE stuff, and... then I got more failures. Stuff
about "api-win-core-somethingorother.dll" and some WinRT(?!) stuff.

*ARGH.*

FxCop was added to the Visual Studio Express family, **but**[**the blog
article on
it**](http://blogs.msdn.com/b/codeanalysis/archive/2012/03/08/what-s-new-in-code-analysis-for-visual-studio-11.aspx)**doesn't
tell you which Visual Studio Express has it**. Turns out the Visual
Studio Express for Web *does not* include it.

**Visual Studio Express for Windows Desktop has FxCop in it**, so that's
what you have to install to get FxCop up and running. I presume the
Express for Windows 8 version also has it, *but I don't know and I
didn't check*. I'm kind of surprised the web one doesn't come with
FxCop.

So... there you go. **You have to install Visual Studio on your build
server if you want FxCop**. (Or you have to chase down all the
chained-in dependencies and drag them along with your local version, in
which case, *good luck with that*.)

Note that, even with VS Express installed, I still failed with an error
when running from the command line:
`Failed to add rule assembly: c:\program files (x86)\microsoft visual studio 11.0\team tools\static analysis tools\fxcop\Rules\DataflowRules.dll`.
Looking in the folder, sure enough, it's missing. I don't see anything
referencing that assembly, but it's there in a VS Premium installation,
so... what gives?

**In fact, there's a lot missing from the Express version of FxCop that
is there in Premium.** Like... *the whole Phoenix analysis engine is
totally missing*. What gives? Honestly, I ended up not only having to
install VS Express, but also copy over the missing stuff into
`C:\Program Files (x86)\Microsoft Visual Studio 11.0\Team Tools\Static Analysis Tools\FxCop `so
I could get apples-to-apples builds on my build server and dev machines.
(Alternatively, I guess you could install VS Premium on the build server
since, *hell, you're already installing Visual Studio, so you lost that
battle*.)

**In the end, I had to install Visual Studio 2012 Premium on the build
server** in order to get things working. Yeah, you read that right. I
mean, if you already have *two different Express SKUs installed and
still didn't get the entirety of FxCop*, it's time to stop messing
about.

**I can't say this leaves me happy.** I'm baffled as to why this doesn't
"just work." FxCop is a standalone thing. It doesn't make sense that you
couldn't just install it as part of the Windows SDK or a .NET SDK or
something. Kind of makes me wonder if it's an indirect sales ploy to get
you to convert to TFS or something.
