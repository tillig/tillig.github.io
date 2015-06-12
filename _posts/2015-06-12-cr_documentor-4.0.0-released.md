---
layout: post
title: "CR_Documentor 4.0.0 Released"
date: 2015-06-12 -0800
comments: true
tags: [vs,coderush]
---
**[CR_Documentor](https://github.com/tillig/CR_Documentor) version 4.0.0 has been [released to the Visual Studio Gallery](https://visualstudiogallery.msdn.microsoft.com/668a65b5-2468-4afa-b78d-8c369850e2b2) and adds support for Visual Studio 2015.**

[Head over to the gallery to get your copy](https://visualstudiogallery.msdn.microsoft.com/668a65b5-2468-4afa-b78d-8c369850e2b2) or get it through "Extensions and Updates" in the Visual Studio "Tools" menu.

**Note:** In VS 2015 RC you may notice that after installing the add-in the _only add-in that shows up_ for CodeRush is CR\_Documentor. I'm not sure why this is, but it seems to be fixed by clearing out the files in your loader cache at `%appdata%\CodeRush for VS .NET\1.1\Settings.xml\Loader` and `%appdata%\CodeRush for VS .NET\1.1\Settings.xml\_Scheme_FrictionFree\Loader`. **It is safe to delete these files because they will be re-created on the next restart of VS.** This will get all the CodeRush features to show up again.

[I filed an issue with DevExpress about this. If you are having this problem, please add a comment to that issue so they know it's not just me.](https://www.devexpress.com/support/center/Question/Details/T254485)
