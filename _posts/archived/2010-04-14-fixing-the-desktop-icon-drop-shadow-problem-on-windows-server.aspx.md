---
layout: post
title: "Fixing the Desktop Icon Drop Shadow Problem on Windows Server 2008"
date: 2010-04-14 -0800
comments: true
disqus_identifier: 1630
tags: [gists,windows]
---
**I develop on a daily basis on a Windows Server 2008 R2 machine.** I do
that because that's my target deployment environment and it's really
helpful to be able to actually run the full product and debug right
there on my "workstation." As such, I have the full "desktop experience"
enabled - Aero, themes, the whole bit.

**One problem I noticed was that the drop shadows under the icons on the desktop... they just don't stick around.** I set my visual effects settings to "best appearance" and everything looks correct, but if I log out and back in, the setting remains checked but there's no drop shadow. That doesn't sound like a big deal except... well, I have a theme on the desktop that changes background images periodically and the icons get impossible to read without that shadow.

![Visual Effects in Windows Server 2008]({{ site.url }}/images/20100414visualeffects.png)

**The only way I've found to get the drop shadows back is to go all the way into the control panel**, select "Adjust for best performance,"click "Apply," and then select "Adjust for best appearance" and click "Apply" again. Basically, reapply the settings.

I've tried just modifying the registry values corresponding to these settings, but those values don't get applied when they change. You actually have to inform the desktop engine somehow to "refresh." I couldn't figure out how to do that... so I went about it a different way.

**Using**[**AutoIt v3**](http://www.autoitscript.com)**, I wrote a little script** that automates this for you: it actually opens up the dialog and does the whole re-application of the settings. In the event you're in the same boat as me (both of you still reading), here's the script:

```text
#RequireAdmin
ShellExecute("sysdm.cpl")
WinWaitActive("System Properties")
ControlCommand("System Properties", "", 12320, "TabRight", "")
ControlCommand("System Properties", "", 12320, "TabRight", "")
Send("!s")
WinWaitActive("Performance Options")
Send("!p!a")
WinWaitActive("Performance Options")
Send("!b{ENTER}")
WinActivate("System Properties")
ControlClick("System Properties", "", 1)
```

Running that will prompt you for admin credentials if you're not already an admin (because changing system settings requires admin privileges) and clicks all the right buttons to switch you to "best performance" and back to "best appearance."
