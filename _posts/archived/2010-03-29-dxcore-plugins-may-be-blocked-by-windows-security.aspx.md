---
layout: post
title: "DXCore Plugins May Be Blocked By Windows Security"
date: 2010-03-29 -0800
comments: true
disqus_identifier: 1626
tags: [vs,net]
---
**If you're using third-party plugins with DXCore (CodeRush/Refactor)
from**[**DevExpress**](http://www.devexpress.com)**and you're moving to
Windows 7 or Windows Server 2008, this will affect you.**

I had an issue filed recently on
[CR_Documentor](http://cr-documentor.googlecode.com) where a user was
correctly deploying the plugin but DXCore wouldn't load it (and, thus,
the user couldn't see the CR_Documentor tool window link or anything).

Looking in the DevExpress message log, the exception message seen was
like this:

`Exception occurred while attempting to load assembly at "C:\Users\USERNAME\Documents\DevExpress\IDE Tools\Community\PlugIns\CR_Documentor.dll". (System.IO.FileLoadException)`

Following inner exceptions down the stack, we finally saw the true
reason the plugin wasn't loading:

`System.NotSupportedException: An attempt was made to load an assembly from a network location which would have caused the assembly to be sandboxed in previous versions of the .NET Framework. This release of the .NET Framework does not enable CAS policy by default, so this load may be dangerous. If this load is not intended to sandbox the assembly, please enable the loadFromRemoteSources switch. See http://go.microsoft.com/fwlink/?LinkId=155569 for more information.`

[I filed an
issue](http://www.devexpress.com/Support/Center/p/B145400.aspx) with
DevExpress (who, by the way, has a great support team) and we found one
solution by modifying [the \<loadFromRemoteSources\> element in
devenv.exe.config](http://msdn.microsoft.com/en-us/library/dd409252%28VS.100%29.aspx)
(as mentioned in the exception message), but changing your config just
for one plugin doesn't make sense, and that's when the real solution hit
me.

**You need to unblock DXCore plugins.** Windows knows you got them from
a remote location (e.g., Google Code) and limits their permissions. Sort
of like how you have to unblock .CHM files so you can read them.

These instructions should work in any version of Windows from WinXP SP3
and up.

1.  Close all instances of Visual Studio.
2.  Right-click the plugin assembly and select "Properties."
3.  On the "General" tab, click the "Unblock" button.
4.  Click "OK" to apply the changes and close the properties window.

Everything should work correctly now.

![Click the "Unblock" button to enable the
plugin.](http://cr-documentor.googlecode.com/svn/site/screenshots/windows_unblock_button.png "Click the "Unblock" button to enable the plugin.")

