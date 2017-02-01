---
layout: post
title: "Microsoft Patterns & Practices Summit 2007 - Day 1"
date: 2007-11-06 -0800
comments: true
disqus_identifier: 1290
tags: [GeekSpeak]
---
**The topic of Day 1: Architecture.**

**Keynote - [Anders
Hejlsberg](http://www.microsoft.com/presspass/exec/techfellow/Hejlsberg/default.mspx)**

Anders showed a great demo of LINQ.  Not having had time myself to do
much with LINQ, it was nice to see several of the features working and
learn a little more about how LINQ works from the inside as well as
seeing some of the C# 3.0 features.

The idea behind LINQ is that we've pretty much run the gamut of
possibilities in imperative programming - declarative programming still
has a lot of new ground to cover.  Rather than spending time
imperatively writing out not only what data you want but how you want to
get it, LINQ lets you declaratively write what data you want and let the
framework take care of the work.  Easier to write, easier to maintain.

The biggest source of conflict I have with LINQ is that age-old argument
of whether you write SQL in your code and query the database tables
directly or whether you use stored procedures.  I'm a stored procedure
guy. (Which, peripherally, explains why I'm not a big fan of the Active
Record pattern - I don't want my database schema extended into my code. 
A class per table?  What happens when my schema changes? No, no, no.)

Luckily, Microsoft officially abstains from this battle.  You can use
LINQ that generates SQL or you can use stored procedures.  Everyone's
happy.  I'm looking forward to this.

**A Software Patterns Study: Where Do You Stand? - [Dragos
Manolescu](http://micro-workflow.com/)**

This was more of an interactive presentation where Manolescu brought to
our attention (via polling the audience) that while we all claim to use
software patterns, most of us don't really know where the resources are
to read up on new pattern developments and contribute to the community. 
Publicity is a problem for the patterns community and that needs to be
fixed.

**Architecture of the Microsoft ESB Guidance - Marty Masznicky**

I'm not sure if it was intended to be this way, but this was less a
presentation on enterprise service bus guidance than it was a sales
pitch for BizTalk server.  We learned a lot of how BizTalk handled
things like exceptions and logging... and that's about it.

**Pragmatic Architecture - [Ted Neward](http://blogs.tedneward.com/)**

Neward's talk was sort of a reality check for folks who claim to be
architects.  He started out by talking about the [Joel On Software
"Hammer Factory" example - "Why I Hate
Frameworks."](http://discuss.joelonsoftware.com/default.asp?joel.3.219431.12) 
The danger: following patterns for the sake of following patterns. 
Doing things in a purist fashion for the sake of idealism.  While it's
important to have a good system architecture, you can't ignore the end
goal - working software.

Architects need to understand project goals and constraints and reassess
these when change happens.  Architects need to evaluate new tools,
technologies and processes to determine their usefulness to a given
project.  Don't just implement something because it's new and cool or
because it's "best practice" - do what makes sense.

**Architecting a Scalable Platform - Chris Brown**

This was a discussion of things to think about when you're working on a
scalable platform.  Things like using content distribution networks and
unified logging were touched on.

The biggest point here was the notion of building in fault tolerance. 
One example is the "gold box" on the Amazon.com web site.  The "gold
box" is actually an independent service that has a certain amount of
time to respond.  If it doesn't respond, the page will render without
rendering the "gold box" feature - it gracefully degrades.  Scalable
systems need to consider how to handle fault tolerance and appropriately
degrade (or report to the user) when things go wrong.

**Grid Security - [Jason Hogg](http://blogs.msdn.com/thehoggblog/)**

The discussion here was on [SecPAL - the Microsoft Research "Security
Policy Assertion
Language."](http://research.microsoft.com/projects/secpal/)  It's
basically a query language that allows you to easily write queries to
determine if a user is authorized to do something.  Using a common
language and infrastructure, you can fairly easily implement things like
delegation in a system.  There are even visualizers and things to help
you determine how authorization decisions were made - very cool.

I won't lie - some of this got a little above my head.  There's a lot
here and I can see some great applications for it in our online banking
application, but the concrete notion of exactly how I'd go about
implementing it and what it means is something I'm going to have to
noodle on for a while and maybe do a couple of test projects.

**Moving Beyond Industrial Software - [Harry
Pierson](http://www.devhawk.net/)**

Pierson's idea is that we need to stop thinking about software in a
"factory" sense - cranking out applications - and start thinking about
software in a different sense.  Put the user in control.  Stop trying to
directly address ever-changing business needs and enable business people
to address their own needs.  Think outside the box.

The canonical example offered here was SharePoint - it's not really an
application so much as an infrastructure.  Users create their own spaces
for their own needs in SharePoint and it's not something that needs
interaction from IT or the application developers.  It puts the users in
control.

This is another one I'm going to have to think about.  This sounds like
it applies more to IT development than it does with "off-the-shelf"
style product development.  How we, as product developers, think outside
the box and how we can change for the better is something to consider.

