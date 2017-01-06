---
layout: post
title: "VS 2008 Now My Worst Install Experience EVAR"
date: 2007-11-20 -0800
comments: true
disqus_identifier: 1305
tags: [net,vs]
---
I just got done with installing Visual Studio 2008.  It now is the
installation experience that I will rank other installation experiences
against to see how badly they suck - on a scale of "Awesome" to "VS
2008."  It went something like this:

-   Download VS 2008 ISO from MSDN.
-   Start up Virtual CD Control Panel and mount the ISO as a drive.
-   Install VS 2008.
-   Get about halfway finished and get asked to reboot.  Click the "OK"
    button and reboot.  No option available to *not* reboot.
-   Log in and watch the setup alert me, after "loading setup files" for
    10 minutes or so, that setup has failed and I need to restart.
-   Figure out that there's no option to automatically mount an ISO at
    startup using the Virtual CD Control Panel and guess the issue is
    probably that the drive disappeared after my reboot.  Hard to say,
    though, with no specific error message.
-   Mount the ISO again figuring I'll give it another run.
-   Get about 75% finished and, again, get asked to reboot.  Again, no
    option not to reboot.  Click "OK" and reboot.
-   Watch very closely as I get logged in again and haul ass to get the
    Virtual CD Control Panel up and re-mount the ISO before the "loading
    setup files" gives me the failure message.  Get the drive mounted
    but still get the failure.
-   Decide to uninstall the bits that got installed, figuring something
    got corrupted.
-   15 minutes into "generating setup script" for the uninstall, get a
    notice that I need to close Outlook because it has Word open.  Close
    Outlook.  Watch in horror as the "generating setup script" bit
    *starts over from the beginning*.
-   Finish the uninstall and reboot for good measure.
-   Decide that the Virtual CD Control Panel is bad news for me and that
    it's time to burn the ISO to a DVD.
-   Realize after 20 minutes of futzing around that of the two computers
    in my office, one only has a CD-RW burner and the other has a DVD
    burner so old that the Windows Server 2003 OS doesn't actually
    recognize it as a DVD burner.  No drivers, discontinued support.  No
    one else in my general cube vicinity has a DVD burner either.  What
    the...?
-   Download an ISO extraction utility and extract the contents of the
    ISO to my drive and start the installation from there.
-   Shut down everything on the machine that could remotely be construed
    as productive for fear that the install will be mad at me and
    restart midstream.  Includes Outlook, IE, Word, Messenger, etc.
-   Finally get through the install of both VS 2008 and the associated
    documentation.  Takes somewhere between "forever" and "holy crap" to
    finish.
-   ...and now I'm installing all of my add-ins.

**Elapsed time from start to installing add-ins: 6 HOURS.**  Absolutely
ridiculous.  From what I hear, I'm not the only one eating it on this
one.  I don't remember the betas kicking my ass like this.  What
happened?

