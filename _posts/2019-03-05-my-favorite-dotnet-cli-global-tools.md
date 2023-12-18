---
layout: post
title: "My Favorite dotnet CLI Global Tools"
date: 2019-03-05 -0800
comments: true
tags: [dotnet,build,gists]
description: "My [current as-of-this-writing] list of favorite dotnet CLI global tools along with an installer script."
---

I've been enjoying the addition of dotnet CLI global tools and figured I'd blog the ones I use. I'll also include a PowerShell script that is used to install them (or, if they're installed, update them).

The list is current as of this writing, but you can visit the gist (below) to see the set of tools I'm using at any given time.

- [**dotnet-depends**](https://github.com/mholo65/depends): Shows the dependency tree for a .NET project.
- [**dotnet-outdated**](https://github.com/jerriep/dotnet-outdated): Shows outdated packages referenced by a .NET project.
- [**dotnet-format**](https://github.com/dotnet/format): Formats code based on EditorConfig settings.
- [**dotnet-script**](https://github.com/filipw/dotnet-script): Run C# script (.csx) files.
- [**dotnet-symbol**](https://github.com/dotnet/symstore): Download symbols from the command prompt. [I'm still trying this one out to see if I use it much or like it.]
- [**dotnetsdkhelpers**](https://github.com/jonstodle/DotNetSdkHelpers): A global tool version of [the original SDK installer helpers](https://github.com/faniereynders/dotnet-sdk-helpers) that addresses the need for external tools and fixes a couple of bugs with the original.
- [**gti**](https://github.com/shaun-h/gti): Install plugins from a .gti file/manifest. [I'm still trying this one out to see if I like it. If it's good, I can replace my PowerShell script with a manifest.]
- [**microsoft.web.librarymanager.cli**](https://github.com/aspnet/LibraryManager/wiki/Using-LibMan-CLI): dotnet CLI access to the libman dependency manager for JS.

[Here's the gist with the PowerShell script](https://gist.github.com/tillig/029d5294a4a50ce0ab0fd1e08322b5d0) that I use to install these:

<script src="https://gist.github.com/tillig/029d5294a4a50ce0ab0fd1e08322b5d0.js"></script>
