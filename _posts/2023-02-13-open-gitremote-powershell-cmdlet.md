---
layout: post
title: "Open-GitRemote: PowerShell Cmdlet to Open Git Web View"
date: 2023-02-13 -0800
comments: true
tags: [git,github,powershell]
description: "Sometimes, when at a command prompt, I want to open the web view of a repo I have cloned. This cmdlet tries to calculate that location and open it in the system browser."
---

The [GitLens plugin for VS Code](https://github.com/gitkraken/vscode-gitlens) is pretty awesome, and I find I use the "Open Repository on Remote" function to open the web view in the system browser is something I use a lot.

![Open Repository on Remote - GitLens]({{ site.url }}/images/20230213_open_on_remote.png)

I also find that I do a lot of my work at the command line ([in PowerShell!](https://github.com/PowerShell/PowerShell)) and I was missing a command that would do the same thing from there.

Luckily, [the code that does the work in the GitLens plugin is MIT License](https://github.com/gitkraken/vscode-gitlens/blob/d1a204aa1f/LICENSE) so I dug in and **converted the general logic into a PowerShell command**.

```pwsh
# Open the current clone's `origin` in web view.
Open-GitRemote

# Specify the location of the clone.
Open-GitRemote ~/dev/my-clone

# Pick a different remote.
Open-GitRemote -Remote upstream
```

If you're interested, I've [added the cmdlet to my PowerShell profile repository](https://github.com/tillig/PowershellProfile/blob/master/Modules/Illig/Development/Open-GitRemote.ps1) which is [also under MIT License](https://github.com/tillig/PowershellProfile/blob/master/LICENSE), so go get it!

> Note: At the time of this writing I only have Windows and MacOS support - I didn't get the Linux support in, but I think `xdg-open` is probably the way to go there. I just can't test it. [PRs welcome!](https://github.com/tillig/PowerShellProfile/pulls)
