---
layout: post
title: "PowerShell as Your Visual Studio Command Prompt"
date: 2015-09-22 -0800
comments: true
tags: [powershell,vs,dotnet]
---
I love PowerShell, but I do a lot with the Visual Studio developer prompt and that's still good old `cmd`.

Luckily, you can make your PowerShell prompt _also_ a Visual Studio prompt.

First, **go get the PowerShell Community Extensions**. If you're a PowerShell user you should probably have these already. You can either [get them from the CodePlex site directly](https://pscx.codeplex.com/releases) or [install via Chocolatey](https://chocolatey.org/packages/pscx).

Now, in your PowerShell profile (stored at `%UserProfile%\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`) **add the following**:

```powershell
Import-Module Pscx

# Add Visual Studio 2015 settings to PowerShell
Import-VisualStudioVars 140 x86

# If you'd rather use VS 2013, comment out the
# above line and use this one instead:
# Import-VisualStudioVars 2013 x86
```

Next time you open a PowerShell prompt, it'll automatically load up the Visual Studio variables to _also_ make it a Visual Studio prompt.

Take this to the next level by [getting a "PowerShell Prompt Here" context menu extension](http://app.paraesthesia.com/CommandPromptHere/) and you're set!
