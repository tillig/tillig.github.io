---
layout: post
title: "2734B: Updating Your Database Development Skills to Microsoft SQL Server 2005, Part 2"
date: 2005-11-23 -0800
comments: true
disqus_identifier: 921
tags: [sql]
---
I'm going to combine days two and three into one big entry because I
don't think I'll get a chance to do a full day-three review at the end
of today.

 Yesterday was day two and we looked at SQL Server 2005 service broker
stuff, its native HTTP support, and Notification Services.

 The service broker facilities they've added are pretty cool. The
ability to set up messages and queues and such inside the server is
neat, and it folds nicely into the native HTTP support to allow for
exposure of these things via web service. Cool. SQLXML has rolled into
SQL Server, which we all anticipated and love.

 Notification Services, though... OK, I'm just going to be brutally
honest:

 SQL Server 2005 Notification Services sucks big fat donkey dong.

 Seriously.

 Notification Services is the biggest hunk of claptrap Rube Goldberg
mechanics I've been introduced to in a long time. It's not debuggable,
it's super-hard to set up, and for what it offers I'm not sure it's
worth the effort.

 We had a lab to set up some rudimentary Notification Services. The lab
involved us creating a lot of hand-cranked XML configuration, running
some setup to get the services up and running, then testing it out.

 Problem 1: The XML contains SQL that turns into stored procedures. Why
is that bad? When they make the stored procedures, there's nothing to
tell you whether you have a typo in the SQL. I mistyped a database
object name and it never had a problem with it. In fact, I found that
error in the Event Viewer - not even in the SQL error log - and only
when it actually tried to execute the procedure. NO!

 Problem 2: There's insufficient logging. After I corrected my error, I
tried to use the service again and something else went wrong. What
happened? I have no idea. It just swallows the errors and moves on like
there's no issue. No errors, no warnings, no log. How am I supposed to
debug that?

 The whole thing where the XML that you have to hand-generate (and
there's a LOT) has a lot of magic words in it that you just have to sort
of "know" about (like you have to just "know" that when you type "Foo"
in one element that it becomes a stored proc with a name like
"ServiceFooSomeProcNameHere" - yeah, that's intuitive. It really does
work like Rube Goldberg machines - this bit of XML kicks this block of
code out that rolls down the hill and knocks this table row down and
flips over and tosses a message over to that service... Come on, guys.
It's like someone took a weekend, architected the thing, and clamped it
on the side of SQL Server 2005 so they could have a selling point or
something.

 Today we'll be learning about managed code in SQL Server 2005, which
looks great; working with client apps (ADO.NET), which won't be news for
me; and SQL management objects, which also looks great.

 Oh, and before I forget, tomorrow is Thanksgiving, so Happy
Thanksgiving to all!
