---
layout: post
title: "Mixed Mode; And Service Pack 2"
date: 2004-08-27 -0800
comments: true
disqus_identifier: 649
tags: [dotnet,windows]
---
I worked a little while on [my Send To
project](/archive/2004/08/26/it-just-works-mixed-mode-pinvoke-or-com.aspx)
and got the framework for a mixed-mode DLL set up. I have some managed
classes (my public interface) in there and it compiles; now I need to
start putting in the unmanaged stuff.

 I also installed Windows XP SP2 on my home computer last night. I
happened to get a disc with it on there from MSDN (subscription through
work) so I took it home, threw it in the drive, started the install, and
walked away.

 A couple hours later I came back, rebooted, logged in, and have thus
far really only noticed a couple of minor changes. First, the Security
Center thing pops up to tell me that Windows Firewall is enabled,
Automatic Updates (to the OS) are enabled, and it can tell that I have
Panda antivirus software installed but it can't tell the version of the
updates. Fair enough. Second, the Windows Firewall is a lot more
configurable and I like it better than the old Internet Connection
Firewall. (It did, however, fail to properly migrate my ICF settings so
I had to reconfigure, which wasn't a big deal, just annoying.) Finally,
the pop-up blocker is in full effect in IE.

 That's it. That's all I really noticed.

 I think that's a good thing. I saw all of these "get ready for SP2!"
ads and all of these articles about the drastic changes to the security
on the system and whatnot, but when the end user finishes installing
this thing, they really won't notice much.

 Now, from a programmer's perspective, yeah, I have to be more conscious
now about the security on the system and whatever for operations my
program performs. But from the end user side... no big deal. Just more
secure. Perfect.
