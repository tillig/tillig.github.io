---
layout: post
title: "How to Switch Your Active DXCore Version"
date: 2010-03-02 -0800
comments: true
disqus_identifier: 1620
tags: [vs]
---
You may have noticed that every time you install the DevExpress
DXCore/CodeRush/Refactor! products they go into a different install
folder. For example, I have two versions installed right now:

-   `C:\Program Files\DevExpress 2009.3`
-   `C:\Program Files\DevExpress 2010.1`

The thing is, you can only have one version running at a given time, so
it bothered me that there was a new install location every release. I
felt like it was left to me to clean up a mess... but it turns out
that's not the case!

**This "new install location for every release" is intentional because
you can have multiple versions of DXCore/CodeRush/Refactor! installed
and you can switch between them using a tool they provide.**

Here's how you do it:

1.  Close all the running instances of Visual Studio.
2.  Go into the `IDETools\System\DXCore\BIN` folder in the most recent
    install location. For me, that means
    `C:\Program Files\DevExpress 2010.1\IDETools\System\DXCore\BIN`.
    (Technically you could go to the folder for any of the installs, but
    I choose to go to the most recent just in case there's been a patch
    or addition to the tool.)
3.  In that folder, run the `DXCoreVersion.exe` program.
4.  The version selected in the dropdown box will be the latest version
    installed, not necessarily the active version. That's important and
    could be misleading.
5.  Select the DXCore version you'd like to be active and click "Run."
    In this example, I have version 9.3 active so I'll select to switch
    to version 10.1. 
    ![](https://hyqi8g.bl3302.livefilestore.com/y2px7E2DAS6jbd_LM_kD3GHnDqSLY8Av5PK9gYHYary5gtMF1PAtozm4fvMmfaSDP926bIhNYGAYCJqQPRMtd4CzpuhviA0vlmFYAQIdF4Dpa0/20100302dxcoreversionselect.png?psid=1)
6.  **A lot of stuff will happen** - the version of DXCore currently set
    up will be unregistered and the version you selected will be
    registered. Note that while the log will talk about "uninstall" and
    "install," it's not actually adding or removing the installation
    from your system, it's just hooking things up.
7.  **Wait for the popup to tell you it's done.** It takes a couple of
    seconds and the Close button isn't disabled, so it might look like
    it's done, but it's not. Once it's done, you can click OK to dismiss
    the popup and close the version switcher. 
    ![](https://hyqi8g.bl3302.livefilestore.com/y2pkmUDxvcEX8IdahzeJx6GxT_YVrcojqCtqlU-91GLTrWtHCEvub9HXS7HN1Klnz-MreeOM-i8W99gr9DD7O-JqvMCwSOH_j8W_ni7ToNoPlY/20100302dxcoreversioncomplete.png?psid=1)

You can use this process to switch from any version to any version [that
you have installed]. If you make sure to keep your community plugins in
the default location (under your Documents folder, not under the install
location) then your community plugins will transition along for free.

