---
layout: post
title: "BEX Event on Install? Check Data Execution Prevention Settings"
date: 2014-10-14 -0800
comments: true
tags: [windows]
---
I was setting up a new dev machine the other day and whilst attempting to install [TestDriven](http://www.testdriven.net) I got a popup complaining about a BEX event.

Looking in the event log, I saw this:

    Faulting application name: TestDriven.NET-3.8.2860_Enterprise_Beta.exe, version: 0.0.0.0, time stamp: 0x53e4d386
    Faulting module name: TestDriven.NET-3.8.2860_Enterprise_Beta.exe, version: 0.0.0.0, time stamp: 0x53e4d386
    Exception code: 0xc0000005
    Fault offset: 0x003f78ae
    Faulting process id: 0xe84
    Faulting application start time: 0x01cfe410a15884fe
    Faulting application path: E:\Installers\TestDriven.NET-3.8.2860_Enterprise_Beta.exe
    Faulting module path: E:\Installers\TestDriven.NET-3.8.2860_Enterprise_Beta.exe
    Report Id: df1b87dd-5003-11e4-80cd-3417ebb288e7

Nothing about a BEX error, but... odd.

Doing a little searching yielded [this forum post](http://answers.microsoft.com/en-us/windows/forum/windows_other-windows_programs/problem-event-name-bex-error-message/cf5baf73-0877-4070-abfb-a2c3a17a9e10) which led me to **disable the [Data Execution Prevention](http://technet.microsoft.com/en-us/library/cc738483(WS.10).aspx) settings for the installer**.

- Open Control Panel.
- Go to the "System and Security" section.
- Open the "System" option.
- Open "Advanced System Settings."
- On the "Advanced" tab, click the "Settings..." button under "Performance."
- On the "Data Execution Prevention" tab you can either turn DEP off entirely or specifically exclude the installer using the whitelist box provided. (DEP is there to help protect you so it's probably better to just exclude the installer unless you're having other issues.)