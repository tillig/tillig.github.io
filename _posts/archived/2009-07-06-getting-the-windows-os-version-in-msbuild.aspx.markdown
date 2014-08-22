---
layout: post
title: "Getting the Windows OS Version in MSBuild"
date: 2009-07-06 -0800
comments: true
disqus_identifier: 1546
tags: [Code Snippets,.NET]
---
I saw [a tweet come
across](http://twitter.com/chadmyers/status/2502153625) asking how to
get the OS version in MSBuild. MSBuild will automatically import any
environment variables... but it appears the OS version isn't an
environment variable, so it doesn't have any OS version info you can get
out of the box.

You can, however, do a registry key lookup. Here's a quick MSBuild
snippet showing how to get the Windows version out of the registry. If
you want more version-related information, there's a lot in the registry
at **HKEY\_LOCAL\_MACHINE\\SOFTWARE\\Microsoft\\Windows
NT\\CurrentVersion**.

    <?xml version="1.0" encoding="utf-8"?>
    <Project DefaultTargets="DisplayVersion" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
      <PropertyGroup>
        <OsVersion>$(registry:HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion@CurrentVersion).$(registry:HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion@CurrentBuildNumber)</OsVersion>
      </PropertyGroup>
      <Target Name="DisplayVersion">
        <Message Text="Version: $(OsVersion)" />
      </Target>
    </Project>

Granted, it would be kind of nice to have this out of the box, but at
least you don't have to write a whole custom task for it.

