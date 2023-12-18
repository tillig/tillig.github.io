---
layout: post
title: "Atlassian Sourcetree 3.x Hang Workaround"
date: 2019-05-10 -0800
comments: true
tags: [git]
description: "Unable to update Atlassian Sourcetree to the latest because it hangs? Here's how to fix that."
---
Are you stuck unable to update your version of [Atlassian Sourcetree for Windows](https://www.sourcetreeapp.com/) because when you update and restart, Sourcetree hangs?

I was stuck on 3.0.17. Every time I updated (to 3.1.2), Sourcetree would restart and then... hang. Unresponsive. Unable to see if there were any new updates, unable to do anything but kill the app.

It turns out the [reason for this is that Sourcetree didn't handle monitor scaling very well](https://jira.atlassian.com/browse/SRCTREEWIN-11421). Say you have a 4K monitor set to scale to 150% - that's when you'd see the hang.

There are two workarounds for this:

The first option is to stop monitor scaling and switch back to 100%. Not the greatest, I know, but that'll get you through temporarily... and it only needs to be temporary. (I'll get there.)

The other option is to [do a tweak to the Sourcetree configuration file](https://jira.atlassian.com/browse/SRCTREEWIN-11421?focusedCommentId=1955977&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-1955977). First, make sure Sourcetree is closed. Now go to `%LocalAppData%\SourceTree\app-version` like `C:\Users\tillig\AppData\Local\SourceTree\app-3.1.2`. Open the file `SourceTree.exe.config`. Find this line:

```xml
<AppContextSwitchOverrides value="Switch.System.Windows.DoNotScaleForDpiChanges=false"/>
```

Update it to look like this:

```xml
<AppContextSwitchOverrides value="Switch.System.Windows.DoNotScaleForDpiChanges=false;Switch.System.Windows.Controls.Grid.StarDefinitionsCanExceedAvailableSpace=true"/>
```

When you start Sourcetree, it should be responsive.

**This is the default setting in 3.1.3.** If you can get yourself upgraded to 3.1.3, you won't have to do any workarounds anymore. So if you temporarily set your monitor to 100%, take the upgrades in SourceTree up to 3.1.3 or later, then you can switch your monitor back. (Or, of course, you can tweak the configuration on your hanging version of Sourcetree until you get to 3.1.3 or later.)

I had to upgrade from 3.0.17 to 3.1.2 and then to 3.1.3. For some reason I couldn't just go straight from 3.0.17 to 3.1.3. YMMV.
