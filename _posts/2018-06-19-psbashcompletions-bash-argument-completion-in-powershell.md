---
layout: post
title: "PSBashCompletions: Bash Argument Completion in PowerShell"
date: 2018-06-19 -0800
comments: true
tags: [powershell,windows]
description: "Inspired by the dotnet command completion and frustrated that so many more were available for bash, I set out to solve that problem."
---

Two things crossed my path in a relatively short period of time that got me thinking:

1. I read [Scott Hanselman's article on `dotnet` CLI completion for PowerShell](https://www.hanselman.com/blog/CommandLineTabCompletionForNETCoreCLIInPowerShellOrBash.aspx) and I liked it a lot. I didn't know you could have custom completions.
2. I have been working a lot with Kubernetes and `kubectl` in PowerShell and wanted completion for that... but you can only get it for bash, not PowerShell.

_Challenge accepted._

A lot of Google-fu and some trial-and-error later, and I have a bridge that takes a PowerShell command line, passes it to bash, manually runs the completion function in bash, and hands the set of completions back to PowerShell.

**Introducing: PSBashCompletions - a PowerShell module to enable bash completions to surface in PowerShell.**

I published it as a module on the PowerShell Gallery so you can install it nice and easy:

```powershell
Install-Module -Name PSBashCompletions -Scope CurrentUser
```

(I always install to my own profile because I don't run as admin.)

You can also go [grab it right from GitHub if you want.](https://github.com/tillig/ps-bash-completions)

To use it:

1. **Make sure `bash.exe` is in your path.** If it's not, the module will fall back to the location of Git for Windows (assuming `git.exe` can be found) and try to use the packaged `bash.exe` there. Failing that... you're stuck. You need bash.
2. **Locate your bash completion script.** Sometimes you can export this from the command (like `kubectl`); other times you can download it from the project (like [`git` when using Git for Windows](https://github.com/git-for-windows/git/blob/a8c25e7a41a79e2c2469f914383c922d1134a5ae/contrib/completion/git-completion.bash)).
3. **Register the completer using `Register-BashArgumentCompleter`.** Tell the completer which command you want to complete (`kubectl`) and where the completion script is (`C:\completions\kubectl_completions.sh`).

A registration looks like:

```powershell
Register-BashArgumentCompleter kubectl C:\completions\kubectl_completions.sh
```

After that, in PowerShell you should be able to use the command and hit tab at the end of the line to get completions.

`kubectl c<TAB>`

That will compete all the commands starting with 'c' for `kubectl`.

I tried to test it a bunch, but I can't guarantee it'll work for every completion or every workstation.

[I put troubleshooting instructions in the source readme](https://github.com/tillig/ps-bash-completions/blob/master/README.md) so if it's not working there are ways to figure it out. Using the `-Verbose` option when calling `Register-BashArgumentCompleter` is the first step to seeing what's up. If completers in PowerShell encounter any errors, the messages get swallowed. The `-Verbose` option will tell you the basic bash command line the completer is going to try using so you can run it and see what happens.

I do have some demo/example completions I've exported (for `git` and `kubectl`) so you can try it out [by grabbing those](https://github.com/tillig/ps-bash-completions/tree/master/Demo) if you want.

Find something wrong? [I'd love a PR to fix it.](https://github.com/tillig/ps-bash-completions/pulls)
