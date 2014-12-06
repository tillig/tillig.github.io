---
layout: post
title: "Failing to Flash a Verizon Samsung Galaxy S3 or: A Lot of Stuff I Learned About Android"
date: 2014-12-06 -0800
comments: true
tags: [android]
---
My phone is a Samsung Galaxy S3 on Verizon.

If you already know about running custom ROMs and customizing your Android phone, you're probably laughing right now. Not knowing any better, I took all the standard over-the-air ("OTA") updates all the way through current Android 4.4.2, figuring when the time came I could follow whatever the latest rooting process is and update to something like [Cyanogenmod](http://www.cyanogenmod.org/). Oh, how wrong I was.

The problem mostly was in the things I didn't understand, or *thought* I understood, with the whole process of putting a custom ROM on the phone. There is so much information out there, but there isn't a guide that both tells you *how* to do the upgrade and *what it is you're actually doing*, that is, *why* each step is required.

**I learned so much in failing to flash my phone.** I failed miserably, getting the phone into a state where it would *mostly* boot up, but would sometimes fail with some security warning ("soft-bricking" the phone; fully "bricked" would imply I couldn't do anything with it at all).

So given all that, I figured rather than write a guide to *how* to put a custom ROM on your phone, I'd just write up all the stuff I learned so maybe folks trying this themselves will understand more about what's going on.

**Disclaimers, disclaimers**: I'm a Windows guy, though I have some limited Linux experience. Things that might be obvious to Linux folks may not be obvious to me. I also may not have the 100% right description at a technical level for things, but this outlines how I understand it. *My blog is on GitHub - if you want to correct something, feel free to submit a pull request.*

#Background/Terminology

**An "OS image" that you want to install on your phone is a ROM.** I knew this going in, but just to level-set, you should know the terminology. A ROM generally contains a full default setup for a version of Android, and there are a lot of them. The ones you get from your carrier are "stock" or "OTA" ROMs. Other places, like Cyanogenmod, build different configurations of Android and let you install their version.

**ROMs generally include software to run your phone's modem.** At least, the "stock" ROMs do. This software tells the phone how to connect to the carrier network, how to connect to wireless, etc. I don't actually know if custom ROMs also include modem software, but I'm guessing not since these seem to be carrier-specific.

**You need "root" access on your phone to do any low-level administrative actions.** You'll hear this referred to as "rooting" the phone. ("root" is the name of the superuser account in Linux, like "administrator" in Windows.) Carriers lock their stock ROMs down so software can't do malicious things... and so you can't uninstall the crapware they put on your phone. The current favorite I've seen is [Towelroot](https://towelroot.com/).

With every update to the stock ROM, carriers try to "plug the holes" that allow you to get root access. Sometimes they also remove root access you might already have.

You need this root access so you can install a custom "recovery mode" on your phone. (I'll get to what "recovery" is in a minute.)

**When you turn on your phone or reboot, a "bootloader" is responsible for starting up the Android OS.** This is a common thing in computer operating systems. Maybe you've seen computers that "dual boot" two different operating systems; or maybe you've used a special menu to go into "safe mode" during startup. The bootloader is what allows that to happen.

In Android, the bootloader lets you do basically one of three things:

- Boot into the Android OS installed.
- Boot into "recovery mode," which allows you to do some maintenance functions.
- Boot into "download mode," which allows you to connect your phone to your computer to do special software installations.

You don't ever actually "see" the bootloader. It's just software behind the scenes making decisions about what to do when the power button gets pushed.

**Recovery mode on your phone provides access to maintenance functions.** If you really get into a bind, you may want to reset your phone to factory defaults. Or you may need to clear some cached data the system has that's causing incorrect behavior. The "recovery mode" menu on the phone allows you to do these things. This is possible because it's all happening before the Android OS starts up.

What's interesting is that people have created "custom recovery modes" that you can install on the phone that give the phone different/better options here. This is the gateway for changing the ROM on your phone or making backups of your current ROM.

**Download mode on your phone lets you connect the phone to a computer to do custom software installations.** The complement to recovery mode is download mode. This allows you to connect the phone to a computer with a USB cable and push a ROM from the computer over to the phone.

**Odin is software for Samsung devices that uses download mode to flash a ROM onto a device.** When you go into download mode on the phone, something has to be running on your computer to push the software to the phone. For Samsung devices, this software is called "Odin." I can't really find an "official" download for Odin, which is sort of scary and kind of sucks. (You can apparently also use software called [Heimdall](http://glassechidna.com.au/heimdall/), but I didn't try that.)

#The Process (And Where I Failed)

Now that you know the terminology, understanding what's going on when you're putting a custom ROM on the phone should make a bit more sense. It should also help you figure out better what's gone wrong (should something go wrong) so you know where to look to fix it.

**First you need to root the phone.** You'll need the administrative access so you can install some software that will work at a superuser level to update the recovery mode on your phone.

Rooting the phone for me was pretty easy. [Towelroot](https://towelroot.com/) did the trick with one button click.

**Next you need to install a custom recovery mode.** A very popular one is [ClockworkMod ROM Manager](https://www.clockworkmod.com/rommanager). You can get this from the Google Play store or from their site. *It is sad how lacking the documentation is.* There's nothing on their web site but download links; and other "how to use" guides are buried in forums.

If you do use ClockworkMod ROM Manager, though, there's a button inside the app that lets you flash the ClockworkMod Recovery Mode. Doing this will update the recovery mode menu and start letting you use options that ClockworkMod provides, like installing a custom ROM image or backing up your current ROM.

**THIS IS WHERE THINGS WENT WRONG FOR ME.** Remember how you get into the recovery mode by going through the bootloader? Verizon has *very annoyingly* locked down the bootloader on the Galaxy S3 on more recent stock ROM images such that it detects if you've got a custom recovery mode installed. If you do, you get a nasty warning message telling you that some unrecognized software is installed and you have to go to Verizon to fix it.

Basically, by installing ClockworkMod Recovery, I had soft-bricked my phone. Everything looked like it was going to work... but it didn't.

This is apparently a fairly recent thing with later OTA updates from Verizon. Had I not taken the updates, I could have done this process. But... I took the updates, figuring someone would have figured out a way around it by the time I was interested in going the custom ROM route, and I was wrong.

**If the custom recovery works for your phone** then switching to a custom ROM would be a matter of using the custom recovery menu to select a ROM and just "switch" to it. The recovery software would take care of things for you. ROMs are all over for the download, like right off the [Cyanogenmod](http://www.cyanogenmod.org/) site. Throw the ROM on your SD card, boot into recovery, choose the ROM, and hang tight. You're set.

**If the custom recovery doesn't work for your phone** then you're in my world and it's time to figure out what to do.

**The way to un-soft-brick my phone was to manually restore the stock ROM.** Again, there are really no official download links for this stuff, so it was a matter of searching and using (what appeared to be) reputable places to get the software.

- Install the Odin software on your computer.
- Boot the phone into "download mode" so it's ready to get the software.
- Connect the phone to the computer.
- Tell the phone to start downloading.
- In Odin, select the stock ROM in "AP" or "Phone" mode. (You can't downgrade - I tried that. The best I could do was reinstall the same thing I had before.)
- Hit the Odin "Start" button and be scared for about 10 minutes while it goes about its work and reboots.

After re-flashing the stock ROM, I was able to reboot without any security warnings. Of course, I had to reinstall all of my apps, re-customize my home screens, and all that...

**...But I was back to normal.** *Almost.*

**My current problem is that I'm having trouble connecting to my wireless network.** It sees the network, it says it's getting an IP address, but it gets hung on this part "determining the quality of your internet connection." This is a new problem that I didn't have before.

It seems to be a fairly common problem with no great solution. Some people fix it by rebooting their wireless router (didn't fix it for me). Some people fix it by telling the phone to "forget" the network and then manually reconnecting to it (didn't fix it for me).

My current attempt at solving it involves re-flashing the modem software on the phone. Remember how I mentioned that the stock ROM comes with modem software in it? You can also get the modem software separately and use Odin to flash *just the modem* on the phone. Some folks say this solves it. I did the Odin part just this morning and while I'm connected to wireless now, the real trouble is after a phone restart. I'll keep watch on it.

**Hopefully this helps you in your Android modding travels.** I learned a lot, but knowing how the pieces work together would have helped me panic a lot less when things went south and would have helped me know what to look for when fixing things.