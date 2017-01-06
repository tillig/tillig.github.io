---
layout: post
title: "Luck Never Lasts"
date: 2003-08-01 -0800
comments: true
disqus_identifier: 310
tags: [personal]
---
The day started off so well, then about halfway through took the biggest
nosedive in the world.

 I'm working on building up a new corporate web server at work to
replace the existing site and server with. It's a Windows 2003 box that
it took me like three days just to build and secure (it was *locked
down*, man) and get so it could be remotely administered from our
corporate network yet not be a threat if it was compromised. It was
solid.

 Well, we put some security patches on it that came out recently and the
web server portion of the machine started denying everyone access to the
site. I mean, not even ask you for username and password - just straight
up denying you access.

 After fucking around with it for like two hours, I come to find out
that it's a sort of "intelligence" that's been built into the system.

 **For the technical:**
 The machine was a domain controller (on its own domain) with a one-way
trust between our corporate domain and itself. The machine *also* ran
IIS for the web site stuff. It turns out the security patches we did (or
something related, though I couldn't say what) made it so that *only
Administrators were allowed to log on locally to the box*. Even if the
Domain Controller Security Policy said otherwise. Even if everything
else - all other policies and settings - said otherwise. It just
wouldn't let anyone in. That includes the IUSR\_MACHINENAME anonymous
user account. Which means you can't run an anonymously accessed web site
on a domain controller - even if you want to - unless the anonymous user
account is a local administrator. Fucking brilliance.

 **For the non-technical:**
 Microsoft decided to make things more "secure" by not allowing you to
"accidentally" do certain things. Even if you specifically want to do
those things.

 *Thank you very much, Microsoft.*

 So now I have to build up a whole new domain controller machine *and* a
whole new web server, reconfigure and re-secure both machines, reinstall
the web site (thankfully written in ASP.NET so it's easy to deploy), and
hopefully be back at square one by the end of next week.

 Bah. How irritating is that?!
