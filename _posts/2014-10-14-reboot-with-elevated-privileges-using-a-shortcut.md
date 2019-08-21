---
layout: post
title: "Reboot with Elevated Privileges Using a Shortcut"
date: 2014-10-14 -0800
comments: true
tags: [windows]
---
I develop using an account that is *not* an administrator because I want to make sure the stuff I'm working on will work without extra privileges. I have a separate local machine administrator account I can use when I need to install something or change settings.

To make my experience a little easier, I add my user account to a few items in Local Security Policy to allow me to do things like restart the machine, debug things, and use the performance monitoring tools.

In setting up a new Windows 2012 dev machine, I found that **the domain Group Policy had the "Shut down the machine" policy locked down so there was no way to allow my developer account to shut down or restart.** Painful.

To work around this, **I created a shortcut on my Start menu that prompts me for the local machine administrator password and restarts using elevated credentials.**

Here's how:

Create a small batch file in your Documents folder or some other accessible location. I called mine `restart-elevated.bat`. Inside it, use the `runas` and `shutdown` commands to prompt for credentials and restart the machine:

    runas /user:YOURMACHINE\administrator "shutdown -r -f -d up:0:0 -t 5"

[The `shutdown` command](http://technet.microsoft.com/en-us/library/bb491003.aspx) I've specified there will...

- Restart the computer.
- Force running applications to close.
- Alert the currently logged-in user and wait five seconds before doing the restart.
- Set the shutdown reason code as "user code, planned shutdown, major reason 'other,' minor reason 'other.'"

Now that you have the batch file, throw it on your Start menu. Open up `C:\Users\yourusername\AppData\Roaming\Microsoft\Windows\Start Menu` and make a shortcut to the batch file. It's easy if you just right-drag the script in there and select "Create shortcut."

Give the shortcut a nice name. I called mine "Restart Computer (Elevated)" so it's easy to know what's going to happen.

I also changed the icon so it's not the default batch file icon:

- Right-click the shortcut and select "Properties."
- On the "Shortcut" tab, select "Change Icon..."
- Browse to `%SystemRoot%\System32\imageres.dll` and select an icon. I selected the multi-colored shield icon that indicates an administrative action.

![Change the icon to something neat]({{ site.url }}/images/20141014_changeicon.png)

Finally, hit the Start button and go to the list of applications installed. Right-click on the new shortcut and select "Pin to Start."

![Restart shortcut pinned to Start menu]({{ site.url }}/images/20141014_restartpinned.png)

**That's it** - now when you need to restart as a non-admin, click that and enter the password for the local administrator account.