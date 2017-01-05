---
layout: post
title: "Microsoft Patterns & Practices Summit 2007 - Day 4"
date: 2007-11-09 -0800
comments: true
disqus_identifier: 1295
tags: [GeekSpeak]
---
**The topic of Day 4: Software Factories.**

**Keynote - [Scott Hanselman](http://www.computerzen.com)**

Hanselman's keynote was a demonstration of the upcoming web MVC
framework that [Phil Haack](http://www.haacked.com) et. al. are working
on.

Much of this can already be seen via [the videos posted over on his
site](http://www.hanselman.com/blog/ScottGuMVCPresentationAndScottHaScreencastFromALTNETConference.aspx)
- we saw a pretty basic CRUD interface for working with customers and
products against the Northwind database.  I'm interested academically in
this, but the demos always sort of go for "super simple."  How many
people actually only do basic CRUD?  Where's my input validation?
Where's my localization?  I need some more meat in my demos before I'm
sold.

**Domain-Specific Development with VS DSL Tools - [Gareth
Jones](http://blogs.msdn.com/garethj/)**

At this point in the conference we really started hitting what, I
believe, David Trowbridge referred to as "meta-moments."  Jones showed
us how the Visual Studio DSL tools allow you to model your own
doman-specific language and generate a Visual Studio designer and
toolbox set that allow you to get developers modeling and generating
code right from your DSL.

The problem we had was that nothing ever ended up being concrete.  I
recall hearing things like, "Okay, say we have a class that refers to
our model.  We'll call that 'ModelClass.'  It has an attribute.  We'll
call it 'Attribute.'"  That sort of thing.  It would have hit home a bit
more had it been a little more concrete.  Model me an ordering system or
something.  This didn't actually make much sense to me until a later
talk in the day about the web service software factory.

**Patterns of Software Factories - [Wojtek
Kozaczynski](http://blogs.msdn.com/wojtek/)**

This was a discussion of how the current set of software factories work
and the design patterns you can see used in each one.  It was
interesting to see it all from an academic standpoint and see all of the
patterns work together (as well as how you might make a huge enterprise
application using all of the software factories together) but I'm not
sure how much of this I'm going to be able to take back with me and use
immediately.  Definitely one of those presentations I'll keep around and
when I'm trying to solve a problem I know appears in one of the software
factories, I'll check back to see how they solved it.

**Introducing the Aikido Project - [Andres
Aguiar](http://weblogs.asp.net/aaguiar/default.aspx)**

A thinly-disguised Infragistics sales presentation on the
[Aikido](http://www.infragistics.com/aikido) AJAX web control framework
built on top of ASP.NET AJAX.  Looks like it might make some of the
ASP.NET AJAX stuff easier to work with, but come on - another framework?

That said, I may have just been grumpy and unreceptive - we got "boxed
lunches" so we could watch the presentation during lunch and, fast as I
tried to get up to the lunch line, all that was left when I got there
was a choice between turkey and tuna, neither of which I'll eat.  The
ham and the roast beef disappeared, as if by magic.  I ended up eating
chips and a cookie for lunch and getting a headache later on.  Note to
conference organizers: Catered boxed lunches are always a bullshit
cop-out.  If you're going to do that, at least give folks enough time to
go out and get something else if they don't like what you've
pre-packaged.

**Sevice Factory: Modeling Edition - Bob Brumfield, [Ade
Miller](http://ademiller.spaces.live.com/)**

As mentioned earlier, this is where the Visual Studio DSL Tools started
becoming concrete for me.  This presentation showed a designer for
modeling services and generating service code (including the
request/response and domain objects) that was actually the output of the
Visual Studio DSL Tools.  Aha!  Now I get it!

This looked like a pretty compelling way to get services jumpstarted. 
While it doesn't have the full functionality of schema, you can use
schema to augment it so the flexibility exists, albeit not all in the
designer.  Definitely something I can take back and use.

**Web Client Software Factory - Chris Tavares, [Blaine
Wastell](http://blogs.msdn.com/blaine/), [Michael
Puleio](http://blogs.msdn.com/mpuleio/)**

This one I was really into because it was very obviously directly
relevant to what I do.  It was a great walkthrough of the Web Client
Software Factory - what's there now, what's on the way.  Showing some of
the stuff they have - role-based UI, Composite Web Application Block,
easier stories for management/deployment of apps - was really
interesting because it's not something you can just "pick up and use" -
it takes time to get these things hooked up, so seeing it working and
the possibilities available was nice so you can justify that time.

Some of the things coming up in the future include:

-   Suggestion pattern (autocomplete).
-   Live form pattern ( validate data as the user enters it into the
    form).
-   User controls that can be used cross-module via dependency
    injection.
-   More focus on formalizing the MVP pattern.
-   Page composability - build a single page view out of multiple
    components.

There was also a valuable compare/contrast of the MVC and MVP patterns.

MVP vs MVC

 

MVP

MVC

Pro

-   Integrates well with WebForms (able to use existing
    controls/services for WebForms)
-   Enables testability

-   Highly decoupled
-   Testable out of the box
-   More maintainable, extensible
-   Fewer moving parts
-   Part of Microsoft platform (soon)

Con

-   Extra classes and code (view/model interfaces, forwarding functions
    in views)
-   Steep learning curve

-   Most of the controls and services you're used to now won't work. 
    (They're still working on the control story)

Combine that with the fact that MVP and MVC fit at different
architectural levels - MVP picks the view for you, MVC lets you pick the
view - and it boils down to just picking the one that works best for
you.

Another interesting item: they use
[WatiN](http://watin.sourceforge.net/) to do their UI automation tests. 
Not necessarily that being an endorsement, but it surely says
*something*.

**Team Factories - David Trowbridge**

This was an investigation on how teams can use software factories to
work together and more easily come together and work on a
well-architected system.

An interesting situation, but it occurred to me how very high the level
of discipline in your team would have to be to get this working.  I have
a feeling it might fail in most environments because, when it comes down
to it, a feature needs to be created and someone is going to feel time
pressure and just hack the thing together to get it to work.  That sort
of seat-of-the-pants development, *which I do not endorse but
acknowledge exists*, sort of throws a wrench in the works here.

**Build Your Own Software Factory - [Wojtek
Kozaczynski](http://blogs.msdn.com/wojtek/), Bob Brumfield, [Ade
Miller](http://ademiller.spaces.live.com/)**

This was a discussion of what it would take for you to create your own
software factory - tools, recipes, etc. - based on the experience of
building the Web Service Software Factory.

At a high level, you should expect creating a software factory to take
two to three times longer than it would take to create a one-off
product.  You can expect return on your investment somewhere around the
third to fifth instance of factory usage.

If you're going to do this, they recommend starting with the Web Service
Software Factory and customizing/changing from there.  Building the Web
Service Software Factory took about three and a half months over an
eight month period and if you start from the Web Service Software
Factory, you can save yourself \~60% of the effort, which goes into
software factory platform: model extensions, validation, code generation
framework, etc.

Recommendations if you do decide go to this route:

-   Have a VS extensibility expert on the team.
-   Have an installation expert (WiX) available to the team early on.
-   Work with domain experts up front to minimize model changes. 
    Changing the model is expensive.
-   Provide drops to your user community early and often.
-   Reuse as much of the Web Service Software Factory as you can.


