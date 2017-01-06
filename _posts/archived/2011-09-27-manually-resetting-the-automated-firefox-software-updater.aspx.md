---
layout: post
title: "Manually Resetting the Automated Firefox Software Updater"
date: 2011-09-27 -0800
comments: true
disqus_identifier: 1736
tags: [web,gists,windows]
---
I run in Windows as a non-admin user. Whenever I need to install
something and Windows prompts for credentials, I have a whole separate
user account that runs admin tasks.

This appears to be a problem for the automated Firefox software update
process. What I run into goes something like this:

1.  Open Firefox and get notified there's a software update.
2.  Click the button to close Firefox and apply the update.
3.  Firefox closes and prompts me for admin credentials, which I
    provide.
4.  The update installs, Firefox restarts, and then notifies me there is
    a software update.

What seems to be happening is that Firefox downloads the update for my
non-admin user account, then when I provide admin credentials it
re-downloads the update under that admin user account. After the update
is done, Firefox still sees a pending update for my non-admin user
account and wants me to apply it.

**This happens with every update to the Firefox browser.** Add-ons seem
to update just fine, but the browser just can't handle it.

Of course, if I try to apply the update with my non-admin user account,
Firefox closes and re-opens without applying anything. Then it sees the
pending update and wants to fake-apply it again.

**The solution is to manually reset the automated Firefox software
updater** by removing all of the pending updates from the download
cache.

Per [this Mozillazine
article](http://kb.mozillazine.org/Software_update), to do this:

1.  **Close Firefox.
    **
2.  **Open the temporary application data folder for Firefox**. In
    Windows Vista and above, this is:
    `C:\Users\your-username-here\AppData\Local\Mozilla\Firefox\Mozilla Firefox`

3.  Inside that folder, you'll see a folder called "updates" and two
    files "active-update.xml" and "updates.xml" - **delete the "updates"
    folder and the two XML files**.

Aaaand... DONE. Next time you open Firefox it will do its automated
check for updates and apply as necessary.

**UPDATE:** Here's a batch file that does it on Windows 7 and Windows
2008.

    @echo off
    del "%localappdata%\Mozilla\Firefox\Mozilla Firefox\active-update.xml"
    del "%localappdata%\Mozilla\Firefox\Mozilla Firefox\updates.xml"
    rmdir /s /q "%localappdata%\Mozilla\Firefox\Mozilla Firefox\updates"

