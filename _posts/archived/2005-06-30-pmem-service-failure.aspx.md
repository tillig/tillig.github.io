---
layout: post
title: "PMEM Service Failure"
date: 2005-06-30 -0800
comments: true
disqus_identifier: 850
tags: [windows]
---
It seems that every computer I work on has this issue, and I always
forget how to fix it and have to go searching again... so as much for me
as for you:

 At boot time, I get an error in my System event log:

 *The PMEM service failed to start due to the following error:
 The system cannot find the file specified.*

 The [answer I found over at
Annoyances.org](http://www.annoyances.org/exec/forum/win2000/r1069687493)
works:

1. Run `regedit`
2. Browse to
    `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\PMEM\` and
    find the `ImagePath` key
3. The value will be something like
    `\??\\C:\WINDOWS\system32\drivers\PMEMNT.SYS` - change it to a valid
    version of that path: `C:\WINDOWS\system32\drivers\PMEMNT.SYS`
4. Do `net start pmem` at a command prompt to get the service running.

 If you don't have `PMEMNT.SYS` on your machine, you can just disable
the service instead:

1. Run `regedit`
2. Browse to
    `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\PMEM\` and
    find the `Start` key
3. Change the value to `4` to disable the service.
4. Next time you restart your computer, the service won't start up so
    it won't check for the `PMEMNT.SYS` file.
