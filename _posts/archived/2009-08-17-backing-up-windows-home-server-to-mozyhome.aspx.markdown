---
layout: post
title: "Backing Up Windows Home Server to MozyHome"
date: 2009-08-17 -0800
comments: true
disqus_identifier: 1558
tags: [media,windows]
---
**UPDATE 7/8/2011: MozyHome has changed their pricing so [I'm using
CrashPlan to back up my Home Server
now](/archive/2011/07/08/backing-up-windows-home-server-to-crashplan.aspx).**

I've been looking for a good online backup solution for Windows Home
Server for a while. I've been using
[KeepVault](http://www.keepvault.com) for almost a year now and it works
acceptably - there have been some kinks in the plugin (don't let your
backup history log get too big and then try to view it or you'll lock
the console), but overall it's decent. The problem I have is the cost.

I have about 200GB of data to back up. That's the important stuff - all
my photos, my music collection, and my documents. I don't need to back
up my 5TB of DVD images because it'd take longer to restore over the
network than it would to just rip the original source material.

When I originally signed up for KeepVault, I got in for $100/year with
unlimited storage. That's perfectly in line with my expectations. I
previously had MozyHome to back up all of my computers and that has
unlimited storage as well, and that ran $60/year per computer. With the
Windows Home Server doing the computer backup, I needed to switch to
backing up the Windows Home Server. (Assuming the important documents
are all kept on the Windows Home Server and not on the computers, that's
safe - I haven't yet found a system that will back up your computer
backups online.)

KeepVault is, unfortunately, raising its prices. As such, I figured it
was time to do a price comparison. Not counting any "startup costs"
(some of them have a one-time fee to license software)...

| Service | Price for 1 year of 200GB Backup | Support for WHS? |
| --- | --- | --- |
| [Carbonite](http://www.carbonite.com) | $55 | Terminal Service installation. |
| [MozyHome](http://mozy.com/home) | $55 | No.\*\* |
| [KeepVault](http://www.keepvault.com) | $188 | Plugin for WHS Console. |
| [backupanytime.com](http://www.backupanytime.com) | $300 | No.\* |
| [Jungle Disk/Amazon S3](http://www.jungledisk.com/homeserver/index.aspx) | $360 + data transfer and request costs | Plugin for WHS Console. |
| [iDrive](http://www.idrive.com/) | $499.50\*\*\* | Terminal Service installation. |
| [MozyPro](http://www.mozy.com) | $1200 | Terminal Service installation. |
| [IBackup](http://www.ibackup.com) | $1999.50 | No.\* |

\* backupanytime.com and IBackup support Windows Server 2003 (which WHS
is based on) so you might be able to hack around and get it to work. I
couldn't find anyone who'd blogged success with that.

\*\* MozyHome specifically does not support Windows Server 2003, nor
does it support WHS. You have to use MozyPro for server-class OS backup.
Yeah, that's dumb, and I've told them so. I'm not a business so I don't
understand why I'd be charged business prices just because I happen to
store my data centrally.

\*\*\* iDrive jumps from 150GB personal plan ($49.50/yr) to a 500GB
business plan ($499.50). Since I have 200GB to back up, I listed the
500GB plan cost.

So. **From a *cost* perspective, Carbonite and MozyHome are the clear
winners.** That's where my secondary requirement comes in:

**I don't want to hack *anything* on my Windows Home Server.**

I want my WHS to be fully supported, as much as possible. I want the
"appliance-like" experience it offers. I don't want to be tweaking
registry keys or modifying stuff because it inevitably starts off a
chain reaction of having to maintain it forever. For Carbonite and
MozyHome, that means I wouldn't be trying to install them on the WHS
directly. The question then comes down to:

Is it worth an extra $133/year to get the KeepVault support for WHS or
can I figure out a better way to get a client backup program to do the
work for less?

**I went with the client backup and chose MozyHome.** Why not Carbonite?
I've had experience with MozyHome and it works really well. Honestly, it
came down to brand affinity. You could have chosen Carbonite and tried
the Terminal Service installation (though it's unsupported, which is why
I didn't go that route), or you could use Carbonite in the manner I'm
using MozyHome.

Now that we've picked a service, how do we hook it up? Actually, it's
pretty simple.

**First, some startup costs.** Get yourself...

-  **An external USB drive big enough to hold the data you want to back up.** It doesn't have to be the same size as your full Home Server storage; it just has to be enough to hold the important stuff you want to have backed up. You may not need everything on your Windows Home Server backed up, and in some cases you're probably using the file doubling offered by WHS, so you need to do some calculations on space. For example, you probably don't need to back up your recorded TV episodes. **I picked up**[**a 1TB USB drive for $93 from NewEgg**](http://www.newegg.com/Product/Product.aspx?Item=N82E16822101121).
- **A copy of [Allway Sync](http://www.allwaysync.com/) for $20**. You're going to use that to get your WHS data onto the external drive.

**Now set up the backup:**

1.  Install [Allway Sync](http://www.allwaysync.com/) onto a Windows
    client computer that's generally always on. This will be the
    computer that backs up your WHS data.
2.  Plug the external drive into that computer.
3.  Set up Allway Sync to do a one-way sync from your WHS shared folders
    (the important ones) to the external drive. Make sure you propagate
    deletions so if you delete something from the WHS it'll delete from
    your external drive, and set deleted files to be deleted permanently
    so your recycle bin doesn't fill up. (These options are in the
    Advanced job properties dialog.)
4.  For each of the Allway Sync jobs you set up (one per shared folder),
    set them to automatically synchronize on a scheduled basis. This
    will add an entry to the Windows Task Scheduler.
    1.  Run the sync nightly (or more often, if you like).
    2.  Make sure to select the "Wake up computer to perform this task"
        option so the sync will wake your computer up if it happens to
        have gone to sleep.

5.  Run the sync the first time and verify the results. Look at what got
    copied onto the external drive and make sure it's getting everything
    you want.
6.  Sign up for a [MozyHome](http://mozy.com/home) account. I got the
    yearly renewal in case some better backup solution pops up for
    Windows Home Server between now and then.
7.  Download and install the Mozy software on the computer with the
    external drive.
8.  Set up Mozy to back up the entire external drive. In the advanced
    configuration, go to the "File System" tab and select the external
    drive. (If you want to back other stuff up, that's fine, just make
    sure you've got the external drive selected.)

**That's it.** What you've got:

-   Nightly (or more frequent) backups to the external drive allow you
    on-site access to things you might have accidentally deleted in the
    last period.
-   Continuous online backup to Mozy ensures you have historical
    versions of files and things that have been removed from the nightly
    backup. It also ensures that in the event of catastrophe, you have
    things stored elsewhere.

I have this set up and running now and it works like a champ. No
maintenance required - the sync job runs, the Mozy software backs it up - appliance-style, just like I want. From a cost perspective, it's a
no-brainer: $113 startup (drive and sync program), $55/year for backup
space - beats the next best thing, KeepVault, by $20 the first year
(including startup costs) and $133 each subsequent year. It's
potentially a little convoluted, but for the price and the results, I
can't complain.

