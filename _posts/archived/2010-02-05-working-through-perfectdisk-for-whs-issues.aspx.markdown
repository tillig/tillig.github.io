---
layout: post
title: "Working Through PerfectDisk for WHS Issues"
date: 2010-02-05 -0800
comments: true
disqus_identifier: 1612
tags: [media,windows]
---
Back in June 2009 I picked up a copy of PerfectDisk for Windows Home
Server as a solution for defragmenting the system. At the time I hadn't
expanded things too far storage-wise, but since then [I've increased my
storage capacity to nearly
8TB](/archive/2010/01/07/windows-home-server-storage-upgraded.aspx).

Between June and December 2009, I noticed I would get reasonably
frequent (roughly weekly) health warnings on my system drive. Running a
"repair" on the drive would return things to normal. I prepared myself
for it to fail, researching how to recover, replace the system disk,
etc. In the meantime, I decided to stop running PerfectDisk on it since
the system drive never really got any more fragmented than it already
was. Why strain a failing drive, right?

Stopping PerfectDisk on my system drive stopped the health warnings from
showing up. It's been several months (maybe four) since I stopped
running PD on that drive and I've not seen a single health warning.
Failing drive... or PerfectDisk? Before you answer, let me finish the
story.

Toward the latter half of the year, a couple of months into my
PerfectDisk usage, I noticed that things would lock up on the system
occasionally such that you couldn't access the Windows Home Server
console, you couldn't connect to the Remote Desktop, and you couldn't
access any file shares. You had to power down hard and reboot to get
things responding again. Looking in the event logs, I saw what looked
like hardware issues:

> Source: disk
> Error: The device, \\Device\\Harddisk5, is not ready for access yet.
>
> Source: mv61xx
> Error: The device, \\Device\\Scsi\\mv61xx1, did not respond within the
> timeout period.

Sounds hardware-ish to me, and that worries me. It always seemed to
happen when I was running a scheduled task that backed up some data to
another computer on my network (so there was a lot of disk I/O) and the
PerfectDisk full defrag was running at the same time. On a hunch, on
December 27, 2009, I stopped PerfectDisk from running on my system by
disabling all of the jobs.

Windows Home Server started running without a single disk or mv61xx
error. As part of [my recent storage upgrade
issue](/archive/2010/01/07/windows-home-server-storage-upgraded.aspx)
(where I got an incompatible drive) I ended up running extended
diagnostics (both "chkdsk /x /r" and Western Digital disk diagnostics)
on all of the drives in the system with no errors detected. Again, no
errors - all the way through to yesterday, over a month later.

Yesterday I re-enabled PerfectDisk and set it to run a full defrag.
Around 30 minutes into the full defrag, I decided to sync my iPod and
all of my music is on the Windows Home Server.

***Lockup.***

Looking in the error log - same errors as before from "disk" and
"mv61xx."

Since I was able to run a bunch of diagnostics on the disks with no
issues, I have a rough time thinking it's a hardware problem. I might
buy that there's a driver issue and PerfectDisk brings it out by doing
so much disk I/O so fast or something, but I don't have any evidence to
back it up. I did notice that when I see these errors, they seem to be
related to the disks [in my eSATA port
multiplier](/archive/2009/02/04/increase-your-windows-home-server-capacity-with-esata.aspx),
so maybe something is going on there. Again, I can cruise along for
months with no issues, streaming videos, streaming music, sharing files,
etc., until I run PerfectDisk, so I have a rough time thinking there's
no connection at all.

I'm currently working through this with PerfectDisk support, but so far
they are calling "hardware issue" claiming they "use the
Microsoft-provided defrag APIs." I'm curious if the defrag APIs don't
quite work the same for Windows Home Server and/or if they don't work
nicely with my eSATA setup.

I'll update this post if I find out anything new. Until then, I've got
PerfectDisk disabled and I'm thinking, worst-case-scenario, I'm out the
\$40 I paid for the license.

**UPDATE 6/16/2010**: It appears that the WD Green drives I was using
were not performing well. [Removing them from the system allowed
PerfectDisk to function
properly](/archive/2010/06/16/beware-the-wd-green-drives.aspx).

