---
layout: post
title: "How to Reset OneDrive on Mac"
date: 2025-08-06 -0800
comments: true
tags: [mac]
description: "I was dumb and broke OneDrive. This is what saved me."
---

I really hate that OneDrive for Business names your OneDrive folder like `OneDrive - Name of Your Business` with a bunch of spaces and things in there. It jacks up command line stuff because `~/OneDrive - Name of Your Business` doesn't always evaluate `~` as your home drive and it cascades from there.

Instead of doing the _smart thing_ and just creating a symbolic link to something nicer (`ln -s './OneDrive - Name of Your Business' ./OneDrive`) I thought I'd try to get it to sync to a different location. I really jacked it up. Uninstall/reinstall, several reboots, no luck. I had trouble formulating the right search or AI prompt to explain what I was trying to fix. I _finally_ got the below out of a series of queries and prompts through Google Gemini, so I'm blogging it in case I need it again.

1. **Quit OneDrive**: Select the cloud icon in the menu bar, then click Settings > Quit OneDrive.
2. **Locate OneDrive**: Find the app in your Applications folder.
3. **Show Package Contents**: Right-click on OneDrive and select "Show Package Contents".
4. **Navigate to Resources**: Go to Contents > Resources.
5. **Run the Reset Script**: Double-click `ResetOneDriveAppStandalone.command`. A terminal window will pop up and clean a lot of things.
6. **Restart and Setup**: Start OneDrive and complete the setup process.
