---
layout: post
title: "Fun with Windows Aero Flip 3D"
date: 2010-04-16 -0800
comments: true
disqus_identifier: 1631
tags: [GeekSpeak]
---
This whole thing started out because I was trying to get [Logitech
SetPoint](http://www.logitech.com/en-us/support_downloads/downloads/mice/devices/5845?section=downloads&bit=&osid=14)
to use the built-in [Windows Aero Flip
3D](http://www.microsoft.com/windows/windows-vista/features/flip-3d.aspx)
task switcher rather than the built-in one (I like the Aero one better).
SetPoint doesn't have an option to use the built-in one, so I thought I
might be able to use the "keystroke assignment" function. (I didn't
figure out how to get SetPoint working, but I learned a lot of other
things.)

![Windows Aero Flip 3D task
switcher]({{ site.url }}/images/20100416flip3d5.png)

The first thing I discovered was that while Winkey + Tab brings up Flip
3D, [**Winkey + CTRL + Tab will bring it up and let it sit
there**](http://msmvps.com/blogs/vistadigitalmedia/archive/2006/10/12/How-To-Activate-Flip-3D-Task-Switching-In-Vista.aspx)
so you don't have to hold the keys down anymore. That's what I wanted to
do with the task switcher.

I tried to assign Winkey + CTRL + Tab to the mouse button for task
switching... but it turns out you can't assign Windows key combos to mouse
buttons through SetPoint. Fine.

A little more searching and I found that **you can also bring up Flip 3D
in a persistent fashion by running the following**:

`C:\Windows\System32\rundll32.exe DwmApi #105`

That got me wondering if I could have the mouse button execute an
arbitrary program.

You can't. You can only assign a keystroke.

So can you have a global shortcut key that doesn't involve the Windows
key? [Turns out you can](http://support.microsoft.com/kb/134552). **You
can create a program shortcut on your desktop (or in your Start Menu
hierarchy), assign it a shortcut key, and that becomes a global
shortcut.**

First, create a folder in your Start Menu. I created mine at
`C:\Users\tillig\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Tools`.
(That's on Windows Server 2008/Windows 7 – you'll need to adjust that
for your Windows version appropriately.)

Set your shortcut to execute that rundll32.exe command line I gave you
earlier.

Give your shortcut a nice name like "Aero Flip3D Task Switcher."

![Name your
shortcut]({{ site.url }}/images/20100416flip3d2.png)

So now you should have a shortcut like this:

![Shortcut in the Start
Menu]({{ site.url }}/images/20100416flip3d3.png)

Now right-click that shortcut, select "Properties," and on the Shortcut
tab, click in the "Shortcut key" field and then press your shortcut key
combination. Your shortcut key will show up in that box. Click OK to
save the changes.

![Enter your shortcut key in the shortcut
properties]({{ site.url }}/images/20100416flip3d4.png)

Now you should be able to use that new shortcut key combination to run
the shortcut regardless of where you are. Nice!

Note that **this order appears to be pretty important**. I had to make
sure the shortcut was in the Start Menu hierarchy *before* setting up
the shortcut key or it wouldn't work. The first time I tried it, I set
the shortcut and shortcut key up in some other folder not on the desktop
or in the Start Menu... and it didn't work. If your shortcut key isn't
working, make sure you put the shortcut into the Start Menu and *then*
set up the shortcut key.

Unfortunately, as it turns out, I still couldn't use this to hook
Logitech SetPoint up the way I wanted. I'm not sure why, but it just
wouldn't issue the key right, or maybe it wasn't being issued the same
way it does with the keyboard so Windows wasn't handling the key.

Regardless, I learned a lot about some long-time Windows features and it
looks like it could be useful in other situations. Hopefully it helps
you, too.

