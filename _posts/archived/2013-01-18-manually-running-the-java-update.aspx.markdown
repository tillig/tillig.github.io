---
layout: post
title: "Manually Running the Java Update"
date: 2013-01-18 -0800
comments: true
disqus_identifier: 1802
tags: [GeekSpeak]
---
I swear every time I change the Java settings to stop auto-updating it
still pops up that stupid "A Java Update is Available" toast in the
corner and I want to punch it repeatedly. Killing the scheduled task
from startup works until you actually do install the next update, at
which point you forget it and it puts itself back.

I run as a non-admin user. The Java auto-update thing hates that. It
tells me there's an update, then I say, "OK, do it then." It asks me for
admin credentials, I enter them, and I instantly get a failure message.
Again, I want to punch it repeatedly.

The only way I can get this thing to go away is to manually run the
update (or download the entire package and manually install the update).
For my own reference, here's how I do it:

1.  Log in as the administrative user.
2.  Run "C:\\Program Files (x86)\\Common Files\\Java\\Java
    Update\\jucheck.exe" with elevated privileges.
3.  Follow the prompts to get the update and make sure to uncheck all
    the freeware crap they want to install alongside it.


