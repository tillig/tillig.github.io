---
layout: post
title: "Manually Uninstalling a Windows Home Server Add-In"
date: 2009-11-02 -0800
comments: true
disqus_identifier: 1582
tags: [Media,GeekSpeak]
---
I just had a bit of a scare with a misbehaving Windows Home Server
add-in where the upgrade process went frightfully wrong. As such, I
ended up with:

-   The .msi for the add-in in the \\\\server\\Software\\Add-Ins folder.
-   The list of add-ins saying the add-in was installed.
-   No add-in actually installed.

Thank goodness there's [a great article over on HomeServerLand that
tells you how to manually uninstall an
add-in](http://www.homeserverland.com/wiki/w/whs/whs-add-in-manual-uninstall-instructions.aspx).
I followed that process and the crisis was averted.

