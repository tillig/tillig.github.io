---
layout: post
title: "The Self-Signed Certificate Disappearing Act"
date: 2016-08-08 -0800
comments: true
tags: [dotnet,aspnet]
description: "When testing with SSL/TLS on a local site, your self-signed certificates can lose trust. Where'd they go?"
---
It's good to develop and deploy your .NET web apps using SSL/TLS to ensure you're doing things correctly and securely.

If you're using full IIS for development and testing, it's easy enough [to create a self-signed certificate right from the console](https://technet.microsoft.com/en-us/library/cc753127(v=ws.10).aspx). But you have to be an administrator to use IIS in development, and it's not cool to dev as an admin, so that's not usually an option. At least, it's not for me.

IIS Express comes with a self-signed SSL certificate you can use for development and Visual Studio even prompts you to trust that certificate when you first fire up a project using it. (Which is much nicer than [the hoops you used to have to jump through to trust it.](https://blogs.msdn.microsoft.com/robert_mcmurray/2013/11/15/how-to-trust-the-iis-express-self-signed-certificate/))

That still doesn't fix things if you're using a different host, though, like Kestrel for .NET Core projects; or if you're trying to share the development SSL certificate across your team rather than using the per-machine self-signed cert.

[There are instructions on MSDN for creating a temporary self-signed certificate.](https://msdn.microsoft.com/en-us/library/ms733813(v=vs.110).aspx)

The instructions work well enough, but something my team and I ran into: **After a period of time, the certificate you created will no longer be trusted.** We weren't able to reproduce it on demand, just... periodically (between one day and two weeks) the certificate you place in the "Trusted Root Certification Authorities" store as part of the instructions just disappears.

**It literally disappears. Your self-signed CA cert will get removed from the list of trusted third party CAs without a trace.**

You can try capturing changes to the CA list with [Procmon](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx) or set up security auditing on the registry keys that track the CA list and you won't get anything. I tried for months. I worked through it with Microsoft Premier Support and they couldn't find anything, either.

It's easy enough to put it back, but it will eventually get removed again.

## What is Going On?

**The reason for this is the [Automatic Third-Party CA Updates](https://technet.microsoft.com/en-us/library/cc734054(v=ws.10).aspx) process that runs as a part of of Windows.** This process goes to Windows Update periodically to get an updated list of trusted third-party certificate authorities and if it finds any certificates not present in the list they get deleted.

Obviously your self-signed dev cert won't be in the list, so, _poof_. Gone. It was unclear to me as well as the MS support folks why we couldn't catch this process modifying the certificate store via audits or anything else.

There are basically two options to fix this (assuming you don't want to ignore the issue and just put the self-signed CA cert back every time it gets removed):

## Option 1: Stop Using Self-Signed Certificates

Instead of using a self-signed development cert, try something from an actual, trusted third-party CA. You can get a free certificate from [LetsEncrypt](https://letsencrypt.org/), for example. Note LetsEncrypt certificates [currently only last 90 days](https://letsencrypt.org/2015/11/09/why-90-days.html) but you'll get 90 _uninterrupted days_ where your certificate won't magically lose trust.

Alternatively, if you have an internal CA that's already trusted, use that. Explaining how to set up an internal CA is a bit beyond the scope of this post and it's not a single-step five-minute process, but if you don't want a third-party certificate, this is also an option.

## Option 2: Turn Off Automatic Third-Party CA Updates

If you're on an Active Directory domain you can do this through group policy, but in the local machine policy you can see this under Computer Configuration / Administrative Templates / System / Internet Communication Management / Internet Communication Settings - You'd set "Turn off Automatic Root Certificate Update" to "Enabled."

**I'm not recommending you do this.** You accept some risk if you stop automatically updating your third-party CA list. However, if you're really stuck and looking for a fix, this is how you turn it off.

![Turning off automatic third-party CA updates]({{ site.url }}/images/20160808_disablecertupdate.png)
