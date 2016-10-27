---
layout: post
title: "How to Upgrade PerfectDisk for Windows Home Server"
date: 2009-11-03 -0800
comments: true
disqus_identifier: 1584
tags: [media,windows]
---
UPDATE 11/4/2009: I got some feedback on this process from Raxco
(PerfectDisk) Support. They say:

> The update process is as follows:
>
> -   While connected to your WHS and notified than an update to PD is
>     available, choose Install
> -   When notified that the Console is open and prompted to Retry,
>     Ignore or Cancel, choose Ignore
> -   When update has finished and prompted to reboot your WHS, reboot
> -   Upon reboot of your WHS, PD should be updated.
>
> Note that if you run PD and click on Product Resources, PD shows that
> it has been updated to new build. If you look in the add-ins, it still
> says that old PD build is installed. This is due to the way that the
> add-in manager is looking to see what is installed/available - it is
> not looking in the "normal" locations to determine what is actually
> installed - it is using a different set of registry keys. Also note
> that if you have HP WHS, after updating to a new build of PD, the
> Network Critical tab displaying PD update as available even though it
> is already installed. This is something specific to HP WHS and we are
> currently waiting to hear from HP on what exactly they are
> checking/doing.

I'm not so sure I like that there are "expected problems" remaining
after this upgrade process. Doing it my way, you get the upgrade, the
version reads correctly, and there's no remaining WHS "Network Critical"
warning. For reference, the original entry I wrote and the process I
followed for upgrade is here...

* * * * *

I've got [PerfectDisk for Windows Home
Server](http://www.perfectdisk.com/products/home-perfectdisk10-windows-home-server/learn-more)
installed and I generally like it but the installation procedure is a
little weird.

**A fresh install** goes like this:

1.  Download the full installation package for PerfectDisk to your
    client computer.
2.  Install PerfectDisk on your client computer.
3.  As part of the installation, a folder will be created where the
    PerfectDisk add-in for Windows Home Server will be placed. The
    location is typically something like: C:\\Program
    Files\\Raxco\\PerfectDisk10Install\\PerfectDisk10\_Home\_Server\\PerfectDisk\_x86.msi
4.  Drop the PerfectDisk\_x86.msi file into the
    \\\\server\\software\\add-ins folder on your Windows Home Server.
5.  Open the Windows Home Server console, go to the "Settings" tab, and
    under "Add-Ins" select to install the PerfectDisk add-in.

The last few steps - dropping the installer in the "add-ins" folder,
opening the WHS console, and installing add-in - is pretty standard WHS
stuff. The weird bit is that you can't just get the WHS add-in as a
direct download - you *have to* install on a client computer.

Recently I found there was an upgrade to PerfectDisk and the upgrade
process isn't documented. This is what the process is from what I can
tell, after [some panicking and manually uninstalling
things](/archive/2009/11/02/manually-uninstalling-a-windows-home-server-add-in.aspx).

PerfectDisk has a feature to "check for updates" from within the Windows
Home Server console. **It's OK to use the "check for updates" feature to
see if there's an update, but *do not install the update from there*.**

First, trying that will fail because the Windows Home Server console is
open (Catch-22, eh?). Second, if you try to do the update from Windows
Home Server via Terminal Services, it doesn't quite do what you expect.
I think the engine gets updated, but the console add-in doesn't or
something. Stuff gets messed up. Just don't do it.

Instead, it appears that **this is the proper sequence of events for an
upgrade**:

1.  Go to the PerfectDisk site and [re-download the full [updated]
    installer for the client
    computer](http://www.perfectdisk.com/support/re-download-products).
2.  Install the new version on your client computer. This will update
    the installer files in the C:\\Program
    Files\\Raxco\\PerfectDisk10Install\\PerfectDisk10\_Home\_Server
    folder as well.
3.  Log into the WHS console and uninstall the PerfectDisk add-in.
    You'll need to restart the WHS console and possibly reboot the WHS
    after this.
4.  Copy the new add-in from the C:\\Program
    Files\\Raxco\\PerfectDisk10Install\\PerfectDisk10\_Home\_Server
    folder into the \\\\server\\software\\add-ins folder on your server.
    You may want to keep a backup copy of the old version of the add-in
    somewhere before you overwrite it with the new version. Don't put
    two copies of the add-in in the server's "add-ins" folder, though.
5.  Log into the WHS console and install the new version of the
    PerfectDisk add-in. It will tell you to restart the WHS console. Do
    that.
6.  On restarting the WHS console, go to the PerfectDisk add-in and
    re-enter your product key.

You'll notice that this is pretty close to what a fresh install looks
like. You'd be correct. The in-place upgrade for PerfectDisk doesn't
work for WHS.

This is all, unfortunately, documented nowhere on the PerfectDisk site.
I have submitted a ticket to their support people about this. In the
meantime, I figured out a bunch of things you shouldn't do to upgrade
the add-in.

**Things you should NOT do:**

-   **Do not try to install the PerfectDisk update on your WHS through
    the "Check for Updates" feature.** This ends you up with a
    mismatched add-in version and engine version and somehow corrupts
    the way the add-in is registered with the WHS console.
    -   Don't do it from the WHS console.
    -   Don't do it from a Terminal Service session to the WHS.

-   **Do not update your client computer's PerfectDisk install through
    the "Check for Updates" feature.** That will update your client
    computer just fine, but it won't update the installers so you won't
    get the updated WHS add-in.
-   **Do not uninstall PerfectDisk on your WHS through Add/Remove
    Programs.** I didn't do this, but it will end up corrupting the way
    the add-in is registered with the WHS console. Use the WHS console
    to remove PerfectDisk.


