---
layout: post
title: "Migrating Perforce to Git in Windows"
date: 2016-10-27 -0800
comments: true
tags: [build,github,powershell,tfs]
description: "If you need to migrate a Perforce repository to Git from a Windows machine, this is how. At least, you know, 'works on my box.'"
---
Git has [a specific document on how to migrate Perforce to Git](https://git-scm.com/book/en/v2/Git-and-Other-Systems-Migrating-to-Git#Perforce). The instructions here are based on the content there as well as some other "gotchas" and articles I ran into.

I'm using the **git-p4 command rather than [Perforce Helix Git Fusion](https://www.perforce.com/perforce/doc.current/manuals/intro/index.html#basic_concepts.git.fusion).** Git Fusion is a whole separate proxy-style service you need to set up that allows you to use Git clients to interact with a Perforce source control system. This makes it easy to migrate to a real Git back end, but it also is far more complex to set up for a one-time migration operation.

Oh, and you'll probably notice _I'm not really a Perforce user_. I was tasked with migrating some Perforce stuff into Git recently and this is the process I pieced together. I may say some stuff that's like, "Well, duh!" to folks who use Perforce more often.

# Install Windows Tools

The tool installation and setup is based on [the instructions here](http://ericlathrop.com/2012/12/how-to-set-up-git-p4-in-windows/).

## Chocolatey Install

If you use chocolatey, install is pretty quick.

```powershell
choco install git
choco install python --version 2.7.11
choco install p4
```

## Manual Install

You can manually install the requisite tools by downloading them and installing them from their respective pages:

- [Git for Windows](https://git-scm.com/download/win)
- [Python 2.7.x](https://www.python.org/downloads/windows/)
- [Perforce Command Line](https://www.perforce.com/downloads/helix#clients)

# Enable git-p4

The git-p4 Python script is installed when you install Git for Windows but it isn't enabled by default. Run this command to add the p4 alias to git:

`git config --global alias.p4 !"python 'C:/Program Files (x86)/Git/mingw32/libexec/git-core/git-p4'"`

Once you have that enabled, you should be able to run git p4 and see results like this:

```text
PS C:\Users\yourusername> git p4
usage: C:/Program Files (x86)/Git/mingw32/libexec/git-core/git-p4 <command> [options]
valid commands: clone, rollback, debug, commit, rebase, branches, sync, submit
Try C:/Program Files (x86)/Git/mingw32/libexec/git-core/git-p4 <command> --help for command specific help.
PS C:\Users\yourusername>
```

# Set Perforce Environment Variables

The Perforce client needs environment variables so it knows which source control system to use, who you are, etc. **You must have an account on the Perforce system to do this migration.** Unlike Git, you can't just anonymously clone the repo. If you want to try this out, you can get a [free account on the public Perforce server](https://swarm.workshop.perforce.com/) and follow along cloning a public repo.

The example below shows use of the public Perforce depot.

```powershell
#Powershell
$env:P4PORT = 'public.perforce.com:1666'
$env:P4USER = 'yourusername'
$env:P4PASSWD = 'yourpassword'
```

```cmd
#cmd.exe
set P4PORT=public.perforce.com:1666
set P4USER=yourusername
set P4PASSWD=yourpassword
```

# Clone the Perforce Repo with git p4

Cloning the Perforce repo is pretty simple, but making sure the branches in Perforce correctly map to branches in Git is a bit harder. The typical clone looks like this:

`git p4 clone --detect-branches //guest/perforce_software/p4jenkins@all .`

This example clones the Jenkins/Perforce integration project into the current directory. The `@all` specifier means all of the changesets through history will be brought in rather than just the latest.

If there are more complex branching strategies at play, this page on the Git site explains [how to explicitly map folders to branches and so on](https://git-scm.com/book/en/v2/Git-and-Other-Systems-Git-as-a-Client#_git_p4_branches).

Once the repo is cloned, **Git sees the Perforce "repo" as a "remote" called "p4"** that it can use to push changes back. Any branches it sees are attached only with the "p4" remote that it has added. We'll fix that later.

# Add a Remote to the New Git Repo

The way Git knows where to push the cloned data is by setting up a remote. Create the destination Git repo on the server and then...

```powershell
git remote add origin https://github.com/yourusername/destinationrepo.git
git remote add p4 https://github.com/yourusername/destinationrepo.git
```

The first remote is added and is the usual/standard remote for a Git repo.

The second remote is added and called "p4" because the branches brought over are tied to a "p4" remote which is not actually defined in the repo by default. By adding this remote as a stand-in, you allow Git to bypass some logic that will fail when you try to move branches over when it sees "p4" doesn't exist.

# Bring Branches to the New Git Repo

As noted earlier, branches that the import creates are still associated with the "p4" remote. We need to bring those over to the new repo.

Here's a Powershell script to do that:

```powershell
(& git branch -r).Split([Environment]::Newline) |
%{ $_.Trim() } |
Where-Object { $_ -notlike "/master" -and $_ -like "p4/" } |
%{ (& git checkout --track "$_") }
```

This script...

1. Uses the Git command line to list all the remote branches in the cloned local repository.
2. Splits the output of the command line so Powershell can process each listed branch.
3. Trims off leading and trailing whitespace on each listed branch.
4. Finds all the branches that aren't "master" (because that's already available in the destination repo) and that start with "p4" (indicating the branch originated in Perforce).
5. Checks out each of the branches from Perforce and starts tracking them in your local repository.

By tracking each of the "p4" branches in your local repo, it allows you to push those branches to the new Git remote repo. If you don't do that, the branches won't make the migration.

# Push to the New Git Repo

Push the code, history, and branches all to the new repo.

`git push -u origin --all`

# Remove the Fake p4 Remote

You don't need the fake "p4" remote that the "git p4" command added since the branches are all moved over now. Remove it to avoid confusion.

`git remote rm p4`
