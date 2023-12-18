---
layout: post
title: "Solvent - Power Toys for Visual Studio .NET"
date: 2004-06-25 -0800
comments: true
disqus_identifier: 597
tags: [downloads,vs]
---
Solvent is a set of simple but effective tools for Visual Studio .NET
2003 packaged as an add-in. Why call it Solvent? All the tools work in
the Solution Explorer.

 Bad science puns aside, here's a list of what Solvent provides:

- **Recursive Expand/Contract**: Ever notice when you click the +/-
    icon next to a folder (or double click on a Solution/Project file),
    it collapses that particular node in the Solution Explorer... but
    not any of the sub-nodes? If you have a really large project with a
    deep hierarchy, wouldn't it be nice to be able to recursively close
    all of the items beneath a current node so when you expand it again
    it doesn't re-expand everything below it? Now you can.
- **Open All SubItems**: Easily open all of the subitems within a
    containing object (folder or project).
- **Open Containing Folder In Windows Explorer**: Open the folder
    containing a document or project in Windows Explorer (if you select
    a folder, it opens that folder, not it's containing folder).
- **Command Prompt Here**: Open a command prompt at an object's
    containing folder (if you select a folder, it opens the command
    prompt to that folder).

 Solvent adds itself to the Tools menu and to the context menu for items
in the Solution Explorer.

 Tools Menu:
 ![Solvent Tools
Menu]({{ site.url }}/images/20040625solventtoolsmenu.gif)

 Context Menu (On a Project):
 ![Solvent [Project] Context
Menu]({{ site.url }}/images/20040625solventcontextmenu.gif)

 It's free, so come and get it!

- **[Download Solvent 1.1.1 (Setup -
MSI)](https://github.com/tillig/solvent/releases/download/v1.1.1/SolventSetup_1.1.1.msi)**
- **[Download Solvent 1.1.1 (Source -
ZIP)](https://github.com/tillig/solvent/archive/v1.1.1.zip)**

 **Installation Note: Be sure to shut down Visual Studio BEFORE you
install!** If you don't, you may see the UI elements of the add-in
disappear. If you install the add-in and find that the UI has
disappeared (and this goes for ANY add-in), go to Start -\> Run and
enter:
 `devenv /setup`
 That will reset your menus and force add-ins to rebuild. You may lose
any customizations you make to the standard menu bars, though (like
adding/removing buttons on bars). I'll add a check for VS.NET on install
for the next release.

 **NOTE:** Gaston Milano has [a similar product for VS 2005 called
CoolCommands](http://weblogs.asp.net/gmilano/archive/2006/05/10/446010.aspx).
As Solvent does not support VS 2005, you may be interested in checking
that out.

 **Version History:**

- 1.0.0: First public release.
- 1.1.1: Updated "Command Prompt Here" to use "cd /d [path]" rather than
just "cd [path]" to allow for opening command prompt to drives other
than the one VS.NET is installed on. Also released source for download.
