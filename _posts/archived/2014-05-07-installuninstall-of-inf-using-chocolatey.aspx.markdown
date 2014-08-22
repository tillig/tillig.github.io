---
layout: post
title: "Install/Uninstall of INF Using Chocolatey"
date: 2014-05-07 -0800
comments: true
disqus_identifier: 1841
tags: [.NET,Code Snippets]
---
I’m messing around with [Boxstarter](http://boxstarter.org/) and
[Chocolatey](http://chocolatey.org/) and one of the things I wanted to
do was install [the various “Command Prompt Here” context menu
extensions](/images/App/CommandPromptHere/) I use all the time. These
extensions are .inf files and, unfortunately, there isn’t really any
documentation on how to create a Chocolatey package that installs an
.inf.

So here’s how you do it:

**First, package the .inf file in the tools folder of your package
alongside the `chocolateyInstall.ps1` script.**.inf files are pretty
small anyway and you want the file to be around for uninstall, so it’s
best to just include it.

**Next, set your `chocolateyInstall.ps1` to run
`InfDefaultInstall.exe`.** That’s an easier way to install .inf files
than the `rundll32.exe` way and it’ll work with Vista and later. So… no
XP support. *Aw, shucks.*

Here’s a sample chocolateyInstall.ps1:

    $packageName = 'YourPackageNameHere'
    $validExitCodes = @(0)

    try {
      $scriptPath = split-path -parent $MyInvocation.MyCommand.Definition
      $target = Join-Path $scriptPath "YourInfFileNameHere.inf"
      $infdefaultinstall = Join-Path (Join-Path $Env:SystemRoot "System32") "InfDefaultInstall.exe"
      Start-ChocolateyProcessAsAdmin "$target" "$infdefaultinstall" -validExitCodes $validExitCodes
      Write-ChocolateySuccess "$packageName"
    } catch {
      Write-ChocolateyFailure "$packageName" "$($_.Exception.Message)"
      throw
    }

**To support uninstall, add a `chocolateyUninstall.ps1` script.** This
will have to use `rundll32.exe` to uninstall, but it's not too bad.

    $packageName = 'YourPackageNameHere'
    $validExitCodes = @(0)

    try {
      $scriptPath = split-path -parent $MyInvocation.MyCommand.Definition
      $target = Join-Path $scriptPath "YourInfFileNameHere.inf"
      Start-ChocolateyProcessAsAdmin "SETUPAPI.DLL,InstallHinfSection DefaultUninstall 132 $target" "rundll32.exe" -validExitCodes $validExitCodes
      Write-ChocolateySuccess "$packageName"
    } catch {
      Write-ChocolateyFailure "$packageName" "$($_.Exception.Message)"
      throw
    }

**That's it!** Run the packaging and you’re set to go. This will support
both installation and uninstallation of the .inf file.

Note: At one point I was having some trouble getting this to run on a
Windows Server 2012 VM using the one-click Boxstarter execution
mechanism. I found this while testing an install script that installs
something like 40 things. After rolling back the VM to a base snapshot
(before running the script) I’m no longer able to see the failure I saw
before, so I’m guessing it was something else in the script causing the
problem. This INF install mechanism appears to work just fine.

