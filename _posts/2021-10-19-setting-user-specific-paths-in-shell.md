---
layout: post
title: "Setting User-Specific Paths in a Shell"
date: 2021-10-19 -0800
comments: true
tags: [linux,mac,windows]
description: "It shouldn't be as hard as it is to set user-specific paths at a global level, but it is. Here are some notes I have on what I've found."
---
I used to think setting up your `PATH` for your shell - whichever shell you like - was easy. But then I got into a situation where I started using _more than one shell_ on a regular basis (both PowerShell and Bash) and things started to break down quickly.

Specifically, I have some tools that are installed in my _home directory_. For example, [.NET global tools](https://docs.microsoft.com/en-us/dotnet/core/tools/global-tools) get installed at `~/.dotnet/tools` and I want that in my path. I would like this to happen for _any shell I use_, and I have multiple user accounts on my machine for testing scenarios so I'd like it to ideally be a global setting, not something I have to configure for every user.

**This is really hard.**

I'll gather some of my notes here on various tools and strategies I use to set paths. It's (naturally) different based on OS and shell.

**This probably won't be 100% complete, but if you have an update, I'd totally [take a PR on this blog entry](https://github.com/tillig/tillig.github.io/pulls).**

## Shell Tips

Each shell has its own mechanism for setting up profile-specific values. In most cases this is the place you'll end up setting user-specific paths - paths that require a reference to the user's home directory. **On Mac and Linux, the big takeaway is to use `/etc/profile`.** Most shells appear to interact with that file on some level.

### PowerShell

[PowerShell has a series of profiles](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.1) that range from system level (all users, all hosts) through user/host specific (current user, current  host). The one I use the most is "current user, current host" because [I store my profile in a Git repo](https://github.com/tillig/PowerShellProfile) and pull it into the correct spot on my local machine. I don't currently modify the path from my PowerShell profile.

- On Windows, PowerShell will use the system/user path setup on launch and then you can modify it from your profile.
- On Mac and Linux, PowerShell appears to evaluate the `/etc/profile` and `~/.profile`, then subsequently use its own profiles for the path. On Mac this includes evaluation of the `path_helper` output. (See the Mac section below for more on `path_helper`.) I say "appears to evaluate" because I can't find any documentation on it, yet that's the behavior I'm seeing. I gather this is likely due to something like a login shell (say `zsh`) executing _first_ and then having _that_ launch `pwsh`, which inherits the variables. I'd [love a PR on this entry if you have more info.](https://github.com/tillig/tillig.github.io/pulls)

If you want to use PowerShell _as a login shell_, on Mac and Linux you can provide the `-Login` switch (as the first switch when running `pwsh`!) and it will execute `sh` to include `/etc/profile` and `~/.profile` execution before launching the PowerShell process. See `Get-Help pwsh` for more info on that.

### Bash

Bash has [a lot of profiles and rules about when each one gets read](https://www.baeldung.com/linux/bashrc-vs-bash-profile-vs-profile). Honestly, it's pretty complex and seems to have a lot to do with backwards compatibility with `sh` along with need for more flexibility and override support.

`/etc/profile` seems to be the way to globally set user-specific paths. After `/etc/profile`, things start getting complex, like if you have a `.bash_profile` then your `.profile` will get ignored.

### zsh

zsh is the default login shell on Mac. It has profiles at:

- `/etc/zshrc` and `~/.zshrc`
- `/etc/zshenv` and `~/.zshenv`
- `/etc/zprofile` and `~/.zprofile`

It _may_ instead use `/etc/profile` and `~/.profile` if it's invoked in a compatibility mode. In this case, it won't execute the zsh profile files and will use the `sh` files instead. [See the manpage under "Compatibility" for details](https://linux.die.net/man/1/zshall) or [this nice Stack Overflow answer](https://stackoverflow.com/a/10583324/8116).

I've set user-specific paths in `/etc/profile` and `/etc/zprofile`, which seems to cover all the bases depending on how the command gets invoked.

## Operating System Tips

### Windows

Windows sets all paths in the System => Advanced System Settings => Environment Variables control panel. You can set system or user level environment variables there.

The Windows path separator is `;`, which is different than Mac and Linux. If you're building a path with string concatenation, be sure to use the right separator.

### Mac and Linux

I've lumped these together because, with respect to shells and setting paths, things are largely the same. The only significant difference is that Mac has [a tool called `path_helper`](https://www.unix.com/man-page/osx/8/path_helper) that is used to generate paths from a file at `/etc/paths` and files inside the folder `/etc/paths.d`. Linux doesn't have `path_helper`.

The file format for `/etc/paths` and files in `/etc/paths.d` is plain text where each line contains a single path, like:

```text
/usr/local/bin
/usr/bin
/bin
/usr/sbin
/sbin
```

Unfortunately, **`path_helper` doesn't respect the use of variables** - it will escape any `$` it finds. This is a good place to put global paths, but not great for user-specific paths.

In `/etc/profile` there is a call to `path_helper` to evaluate the set of paths across these files and set the path. I've found that just after that call is a good place to put "global" user-specific paths.

```sh
if [ -x /usr/libexec/path_helper ]; then
  eval `/usr/libexec/path_helper -s`
fi

PATH="$PATH:$HOME/go/bin:$HOME/.dotnet/tools:$HOME/.krew/bin"
```

Regardless of whether you're on Mac or Linux, `/etc/profile` seems to be the most common place to put these settings. Make sure to use `$HOME` instead of `~` to indicate the home directory. The `~` won't get expanded and can cause issues down the road.

If you want to use `zsh`, you'll want the `PATH` set block in _both_ `/etc/profile` and `/etc/zprofile` so it handles any invocation.

The Mac and Linux path separator is `:`, which is different than Windows. If you're building a path with string concatenation, be sure to use the right separator.
