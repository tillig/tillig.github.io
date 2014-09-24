---
layout: post
title: "Night Shift"
date: 2003-01-08 -0800
comments: true
disqus_identifier: 190
tags: [personal,books,sharepoint]
---
I never really realized how much of a night person I am until I came
back to work this week.

 During my vacation, I pretty much started inverting my schedule,
staying up really late (well, 1:00a or thereabouts, which is late for me
nowadays) and sleeping in. It was a very easy thing to do, staying up
until then and getting up around 8 or 9 the next morning. But going back
to the "wake up at 6:15a, in bed by 10:30p" routine is another matter
entirely. I'm *so beat* on that schedule. I feel like it's way too early
when I wake up, and then I'm not tired when it's time to sleep at night.
I need to reset my body clock or something.

 I'm reading this book [*Inside Delta
Force*](http://www.amazon.com/exec/obidos/ASIN/0385336039/mhsvortex) by
Eric L. Haney. It's actually a really cool document of how they formed
the counterterrorist unit of the US Army. The interesting thing about
books like this is that I know I don't have the physical or mental
abilities it would take to do this stuff (but I like to sometimes
imagine that I do) and reading about these guys in these dangerous
situations, risking their lives for the civilian population and whatnot
really makes me admire them for their efforts. Reading it, you almost
feel like you're there, right alongside the guy as he goes through the
selection and training process and finally goes through various
missions. Very interesting stuff.

 I've spent all day at work today rebuilding servers. It's tedious, time
consuming crapwork and I'm really quite sick of it. The only redeeming
factor is that it does give me a little reading time during the install
process. Why am I rebuilding these machines? Glad you asked...

 I am in charge of implementing this product called [SharePoint Portal
Server](http://www.microsoft.com/sharepoint/portalserver.asp) at work.
I've talked about it before here. It's sort of like a document
management server that allows folks to collaborate on things and
disseminate information in a convenient format. It's a pretty nifty
thing the way they tie a web front-end to the document management
back-end to make it all one convenient package.

 In my workings with it, though, it seems that everything we want to do
with it is something "out of the ordinary" or not outside the normal
scope of what they intended it to do. At least, that's what I'm guessing
because I seem to find all sorts of problems and holes in it all the
time - almost on a weekly basis. I have more product and developer
support calls open right now than I can shake a stick at.

 One of the calls I've talked about is the [IE6 SP1
issue](/archive/2002/10/04/a-long-december.aspx) - if you install IE6
SP1 on a SharePoint Portal Server, it breaks the server. I finally got
an answer from Microsoft - the latest service pack for SharePoint Portal
Server, not yet released, mind you, is supposed to fix it. To
demonstrate, they sent me the production version of the service pack so
that I could try it. It's not even available yet, but I've got it so I
can fix my stuff. Good deal, right?

 **SharePoint Portal Server SP2 breaks SharePoint Portal Server, even
worse than IE6 SP1 does.**

 I mean, if you put IE6 SP1 on your Portal Server box, you could work
around the problem while MS worked out a fix. If you put SPS SP2 on
there, it breaks so much stuff, you're really screwed. You can't connect
to it with development tools anymore, stuff stops showing up in the web
view of things... it's just really messed up. I've sent my findings to
the "Critical Problem Resolution Team" and we'll see what they say.

 Portal Server Geeks: Before you ask, NO, I can't send you the service
pack, and NO, I don't know where you can find it. Our agreement with MS
specifically prohibits me from providing you the software, and it's not
available on their web site yet. Trust me, that's a good thing.

 Anyway, my day is going slower than slow and I think I'll probably be
doing this for a long time tomorrow, too. They should really allow
drinking on the job or something here. :)
