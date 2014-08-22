---
layout: post
title: "If SQL Server Install Always Requires Reboot, Check the Registry"
date: 2009-07-10 -0800
comments: true
disqus_identifier: 1548
tags: [GeekSpeak]
---
More a reminder note for myself than anything... I always - *always* -
run into this problem when I'm trying to uninstall SQL Server. The
installer runs some checks on a screen saying "Setup Support Checks" and
always fails the check labeled "Restart Computer."

I always end up Googling for the answer and it's always the same (and it
always works):

Go to the
**HKEY\_LOCAL\_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Session
Manager\\PendingFileRenameOperations** key in the registry and clear it
out.

Once that's done, run the installer again and the check will pass. Done
and done.

