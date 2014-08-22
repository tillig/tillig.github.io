---
layout: post
title: "Setting Up a BlackBerry for Personal Use"
date: 2008-06-05 -0800
comments: true
disqus_identifier: 1395
tags: [GeekSpeak]
---
The major use case for BlackBerry seems to be integrating with a
corporate environment... which is great if either your company will
freely let you attach to their BlackBerry Enterprise Server or, better
still, will just provide you with a BlackBerry directly. But what about
the rest of us - individuals who want a PDA to keep themselves
organized?

![BlackBerry Curve
8330](https://hyqi8g.dm2303.livefilestore.com/y2p8gwWJ3iuINSIb-D4aDVhS159RPa8XzxM_TDdR77rcVY0VCu0QL8NkcU-BVudmv5vCbOrEgi4sb4ZDNZyqLY6bBVHiqrhq_G3AB0fXCZFG3s/20080605bb8330_curve.jpg?psid=1)I
recently got tired of carting around a cell phone and a Pocket PC, and I
was hoping to get a better client for email, maybe a better camera, and
GPS ability, so I jumped on the BlackBerry bandwagon with a [BlackBerry
Curve](http://www.blackberrycurve.com) 8330.

I chose this one for a few reasons:

-   Of the selections available at [Verizon
    Wireless](http://www.verizonwireless.com) at the time, this one
    seemed to have the most features I was looking for - GPS, all-around
    messaging, decent camera with a flash, ability to synchronize with
    Outlook.
-   My Pocket PC was a [Windows
    Mobile](http://www.microsoft.com/windowsmobile/default.mspx) device
    and while I tried to find another Windows Mobile device, I wasn't
    too into the way it handled messaging.
-   I wanted to try something a little different than I was used to -
    break out of my little Windows Mobile world.
-   The BlackBerry plan was \$15/month cheaper than the corresponding
    Windows Mobile or Palm device plan. Go figure.

So far I like it, but there are some things I wish someone told me while
I was setting it up... so I'm going to tell you. Again, remember I've
never had a BlackBerry before, so all you BlackBerry users are probably
like, "Duh!" but it's not obvious to the folks who haven't done it. And
remember - **this is how it works for me on a personal BlackBerry**.
I've never had one that integrates with a BES, but I can't imagine it's
too different.

**SMS and MMS text messages are treated as different entities.** This
doesn't really happen on a regular cell phone - you want to send a
message, you don't really have to choose "which type of message." You
insert a picture, you type some text, magic happens, the person gets the
message. On BlackBerry, you have to consciously choose which type of
message you want to send someone - there are actually different options
for "MMS (phone number here)" and "SMS (phone number here)." They all go
to the same inbox, you just have to be conscious when sending. I thought
this was sort of odd, but you get used to it.

**Native email integration with BlackBerry commingles text messages with
your email.** Basically, everything incoming is treated like a
"message." It's a reasonable way to think about things, but you
sometimes have to be consciously aware of the type of message so you
respond in the right way. It can get a little confusing.

**The email integration setup service may make changes to your email
account.** I noticed when I told it to set up integration with my GMail
account that it automatically enabled both POP and IMAP on my account
without even asking me or telling me after the fact. I don't know what
it does to other services, but be warned - you may see it make some
changes in the name of helping you and it won't actually tell you what
it did, just that "setup was successful."

**BlackBerry syncs up with Outlook (or Notes, etc.)  through a
"BlackBerry Desktop Manager" program.** Windows Mobile has
[ActiveSync](http://www.microsoft.com/WINDOWSMOBILE/ACTIVESYNC/DEFAULT.MSPX),
BlackBerry has [BlackBerry Desktop
Manager](http://na.blackberry.com/eng/services/desktop/). The key
differences:

-   *ActiveSync runs as a service, BDM doesn't. *ActiveSync will just
    start up and go - you need to have a BlackBerry Desktop Manager icon
    in your Windows Startup group to get it to go when you log in.
-   *ActiveSync sits nicely in your system tray, BDM takes up space in
    the task bar.*Sort of annoying if you have it running all day. I'll
    tell you how to fix this below.
-   *ActiveSync detects changes in Outlook and syncs your device
    real-time when it's connected, BDM requires you to manually initiate
    the sync.* I'm still getting used to this.
-   *ActiveSync syncs up way faster than BDM.* Not sure why this is, but
    an ActiveSync cycle would take about 5 - 10 seconds on my Pocket PC;
    a full sync cycle in BDM is more like 20 seconds.

**Based on what I've learned, here are some recommendations to make
things smooth:**

-   **Get the unlimited data plan for your phone.** I shouldn't even
    have to say this, but once you start playing with BlackBerry, you're
    going to get pounded on data charges if you don't just pony up the
    extra \$10/month or whatever for unlimited data. Plus, this way you
    can let your email and such constantly check and alert you when
    there are new messages. Isn't that the point?
-   **Talk to your carrier about GPS options.** It turns out that
    Verizon locks the GPS down on these things so it only works with
    their proprietary
    [VZNavigator](http://www.verizonwireless.com/b2c/splash/turnbyturn.jsp)
    app (which is an additional \$10/month). It's not a bad app, but I
    don't have any other options - even mobile Google Maps can't detect
    it because the signal's blocked. If you're going to use the GPS,
    find out if there are any restrictions.
-   **Separate your email and SMS/MMS text messages.** This will create
    two separate "inbox" icons - one for your emails, one for SMS/MMS
    text messages. It's a nice way to help you make that mental
    distinction, and if you're just using GMail (see below), you can
    hide the email inbox so it's not bugging you on your home screen. Go
    to the "Messages" application, hit the BlackBerry key and select
    "Options," then "General Options." Set the "SMS and Email Inboxes"
    option to "Separate" and save your changes.
-   **If you use GMail, [get the mobile GMail
    application](http://www.google.com/m/products) and skip native
    integration.** GMail has a nice message threading model,
    searchability, and other features that you will sorely miss when
    every incoming GMail item looks like a flat text message with no
    context. The mobile GMail application looks like a miniature version
    of GMail and keeps all of that intact, plus it integrates nicely
    with the BlackBerry notification mechanism so you can still get
    alerted when new emails come in. (In the Profiles application, go to
    Advanced, then select the profile you want to change the
    notification for. Edit the profile and you'll see a "GMail - New
    Mail" option you can configure.)
-   **Manually configure synchronization settings.** When you set up
    BlackBerry Desktop Manager to sync with Outlook or whatever, the
    default settings are a bit cumbersome to work with. In BDM, select
    the "Synchronize" option and a dialog will pop up. On the
    "Configuration" tab, click "Configure synch..." (If you aren't
    allowed to click the button, connect your BlackBerry to the
    computer.) You should see a list of things you're synchronizing
    (Calendar, Contacts, etc.). Now...
    -   **If you're synchronizing your calendar**, select "Calendar" and
        click the "Setup..." button. This will walk you through setting
        up your calendar. If you've already set it up, the dialog will
        be populated with the values you previously selected and you can
        just click the "Next" button until you get to the "Options"
        dialog (otherwise, set up your calendar with appropriate values
        until you get to "Options"). **For the "Calendar date range,"
        select "Transfer only future items."** Odd things seem to happen
        if you transfer items in the past, particularly if they have
        Outlook reminders attached to them... Outlook updates the
        device, the device thinks there are changes and updates Outlook,
        and the cycle never ends. Also, you may need to experiement
        with **the "Remove alarm for past items" box**. Even though
        you're only transferring future items, after sync I've had
        Outlook constantly pop up reminders for things that happened
        within the last 24 hours until I checked this box. I've also had
        all of the reminders for recurring meetings (past and
        future) cleared out after a sync because the sync thought it was
        being helpful.
    -   **Click the "Advanced..." button** and another dialog will pop
        up with a tab corresponding to every item you're syncing. **On
        each tab, uncheck the "Confirm record deletions" and "Confirm
        changes and additions" boxes.** Having these checked means that
        any time there's even a single change on your device or in
        Outlook, it's going to pop up a box to make you manually verify
        any changes taking place. This is good for debugging, but a pain
        if you just want it to sync.

-   **Organize your applications with folders.** There are some of the
    applications, like the "Options" stuff, that you'll want to access
    occasionally (so you don't want to hide them) but you also don't
    want them cluttering up your home screen. Create folders for these
    and move the rarely-used apps into the folders. For example, I have
    a "Settings" folder that has all of the setup applications in it.
-   **Hide BlackBerry Desktop Manager in the system tray.**You don't
    want it taking up task bar space, right? [Go download and
    install TrayIt!](http://www.teamcti.com/trayit/trayit.htm) - it's an
    application that can take any other app and hide it in the system
    tray when it's minimized. Set TrayIt! up so it always starts
    minimized and runs at system startup (I think these are the default
    options). While BDM is running and the main window is showing,
    right-click the "minimize" button on the BDM window and you should
    see an option "Place in System Tray" - select that. Now when you
    minimize BDM, it'll go to the system tray instead of staying in the
    task bar. Finally, go to your startup group and find the BDM
    shortcut. Right-click the shortcut and select "Properties." On the
    "Shortcut" tab in the Properties dialog, for the "Run" option select
    "Minimized." This will start BDM up and automatically minimize it.
    This, in conjunction with TrayIt!, will make the BlackBerry Desktop
    Manager feel like it's working "in the background" instead of taking
    up space on the desktop.
-   **If you want a password manager, find a third-party app.** The
    "Password Keeper" app that comes on the BlackBerry is really limited
    and doesn't let you sync up with your desktop... so it won't
    interact with any of the other password management apps you probably
    already have running. Find one that you like that will sync with a
    desktop (or at least import/export from other programs) and get it.
    **I haven't found one I like yet, so I can't make a
    recommendation.** I tried
    [SplashID](http://splashdata.com/splashid/blackberry/index.htm) and
    was less than impressed, but a lot of people like it. [CrackBerry
    has some reviews and options if you are
    interested.](http://crackberry.com/password-manager-solutions-blackberry/)

BlackBerries are great for both corporate and personal use. If you're
looking into it and were on the fence, it's a pretty good experience all
around. Hopefully this will help you set things up in a reasonable way
if you do take the plunge.

