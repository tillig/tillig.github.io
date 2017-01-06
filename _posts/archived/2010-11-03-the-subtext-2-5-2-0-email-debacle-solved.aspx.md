---
layout: post
title: "The Subtext 2.5.2.0 Email Debacle - Solved"
date: 2010-11-03 -0800
comments: true
disqus_identifier: 1678
tags: [subtext,blog]
---
As mentioned [in an earlier
article](/archive/2010/11/03/upgraded-to-subtext-2-5-2-0.aspx), I
updated to the latest Subtext and was having email problems. I have the
problem solved now so I do get notified when comments and contact form
submissions come in.

For those more technical and interested in what happened...

...it was a lot of things conspiring against me.

1.  **The Subtext contact form specifically doesn't send you email if
    you're logged into your own blog.** It checks to see if you're
    logged in and, if so, just skips the whole send procedure but still
    says "Email sent!" making for a difficult debugging experience.
2.  **The whole way Subtext sends email has been changed.** There's an
    email service that uses email providers that do a do-si-do and an
    alaman left and somehow email gets pooped out the other end. I have
    a feeling that something in there changed without me knowing it, but
    since I can't attach a debugger to it, there's no real way to tell
    what.
3.  **My host seems to require authentication for SMTP now.** I don't
    know how I was getting emails through before, but it worked in
    Subtext 2.1.0.5 and after switching to Subtext 2.5.2.0, I was forced
    to set new SMTP parameters to handle the authentication. This also
    ran me into the fact that emails from Subtext, by default, come FROM
    the user sending the comment form. The new authenticated SMTP server
    at my host doesn't like that. Trying to figure out the magic
    combination of parameters through trial and error was especially
    trying because...
4.  **The logging around failed email sending in Subtext is lacking.**
    It may be that there's just nothing coming back as an exception or
    something down the stack is getting swallowed and not logged, but
    there was no indication anywhere about a failed email send.

Anyway, if you upgrade and run into the "email isn't being sent" issue,
first make sure you're logged out. Log out of both the HostAdmin and the
blog proper. If it's still not working, THEN look at your config
settings.

