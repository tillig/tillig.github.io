---
layout: post
title: "SublimeMSBuild - MSBuild Package for Sublime Text 2"
date: 2012-07-12 -0800
comments: true
disqus_identifier: 1784
tags: [dotnet,downloads,build,sublime]
---
[Sublime Text 2](http://www.sublimetext.com/) is the first text editor that's actually gotten me *excited about text editors(!)* for quite some time. It's fast, clean, super extensible... I bought my license when it was still in beta and I've never looked back.

One of the things it was missing was support for MSBuild scripting - syntax highlighting, build execution, and so on. I do a lot of MSBuild work, I wanted to try my hand at [Sublime Text 2 extensions](http://docs.sublimetext.info/en/latest/index.html), plus I wanted to try out [GitHub](https://github.com), so I took the opportunity to roll all of those things into One Giant Project:

[**SublimeMSBuild - a Sublime Text 2 package that adds support for MSBuild.**](https://github.com/tillig/SublimeMSBuild)

Here's a list of the features it includes:

- **MSBuild file extension handling**:
  - .proj
  - .targets
  - .msbuild
  - .csproj
  - .vbproj

- **Build system**: Execute the currently loaded MSBuild script and capture the results in the output pane.
- **Syntax highlighting**:
  - MSBuild keywords and flow-control elements
  - Standard MSBuild tasks
  - C#/VB special project item elements
  - Well-known item metadata
  - Reserved properties
  - Variables
  - Conditional operators
  - Framework support functions
  - Comment blocks

- **Snippets**:
  - New MSBuild Script
  - Comment blocks [trigger = `c` + tab]
  - Self-closing/simple tags [trigger = `>` + tab]
  - Content/end-tag tags [trigger = `<` + tab]

- **Autocompletion**:
  - Standard/default tasks (e.g., `CallTarget`, `CombinePath`, `MakeDir`)
  - Project file entities (e.g., `Target`, `Choose`, `Import`)
  - Common item definitions (e.g., `Compile`, `Reference`, `EmbeddedResource`)
  - Well-known item metadata references (e.g., `%(Item.FullPath)`)
  - Reserved properties (e.g., `$(MSBuildProjectDirectory)`)
  - [MSBuild Community Tasks](https://github.com/loresoft/msbuildtasks) (if the `MSBuild.Community.Tasks.Targets` file is imported)
  - C#/VB special project item elements (e.g., `Reference`, `Compile`)
  - Supported framework method calls (e.g., `$([System.DateTime]::Now)`)

**Installation is simple. There are two options:**

**Use Package Control**. [Package Control is a free package manager](http://wbond.net/sublime_packages/package_control) for Sublime Text 2. You can select the **MSBuild** package right from the list of available packages.

**Manual installation**:

- [Download the MSBuild.sublime-package from the GitHub site](https://github.com/tillig/SublimeMSBuild/downloads).
- [Drop the package file into the "Installed Packages" folder in Sublime Text 2](http://sublimetext.info/docs/en/extensibility/packages.html#installation-of-packages).

Plus, if you want to muck around with it, add features, or even just see how it works, you can hack on it yourself. [There are some pointers in the readme](https://github.com/tillig/SublimeMSBuild#sublimemsbuild).

I'm personally pretty pleased with how it turned out, particularly the autocomplete/IntelliSense support for the various MSBuild tasks. [Try it out, I hope you like it as much as I do](http://https://github.com/tillig/SublimeMSBuild/downloads).

As far as what I learned along the way... [The extensibility model on Sublime Text](http://docs.sublimetext.info/en/latest/index.html) is pretty awesome and easy to work with. I'm not really a Python guy, but I was able to figure it out pretty easily. And [GitHub for Windows](http://windows.github.com/) is a total gateway drug, so props to [Phil Haack](http://haacked.com/) and crew for delivering that bad boy.

If you don't have Sublime Text 2, [what are you waiting for](http://www.sublimetext.com/)?

**Once you have it,**[**download and install the MSBuild.sublime-package**](https://github.com/tillig/SublimeMSBuild/downloads)**.**
