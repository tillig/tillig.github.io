---
layout: post
title: "Microsoft Patterns & Practices Summit 2007 - Day 3"
date: 2007-11-07 -0800
comments: true
disqus_identifier: 1293
tags: [GeekSpeak]
---
**The topic of Day 3: Development.**

**Keynote - [John Lam](http://www.iunknown.com/)**

Lam's keynote was primarily a demo of IronRuby and an explanation of how
they arrived at where they're at with the project as well as where
they're going.  It was very interesting to see a Ruby app on Mono
running Windows Forms... but I realized as I watched this that I don't
think I'm nearly as interested in the whole Dynamic Language Runtime
thing as everyone else out there is.  I mean, it's cool and all, and
maybe I'm just burned out on it, but when people say "DLR" I don't
instantly think "Yes!"

**The Right Tools for the Right Job - [Rocky
Lhotka](http://www.lhotka.net/)**

This was less a presentation on tools (as it sounds like it might be)
and more a presentation on application architecture urging you to use
the right tools - and patterns - for the solution you're creating.  In
most cases, this boiled down to the fact that you need to have the
discipline to keep your application layers (presentation, business,
data) separate so you can appropriately accommodate technology changes.

**Model-Based Design - David Trowbridge, [Suhail
Dutta](http://blogs.msdn.com/suhail/default.aspx)**

This talk was specifically geared around the modeling tools built into
Visual Studio Rosario.  Three modeling tools were shown:

-   Logical class diagram - An enhanced version of the exisitng class
    diagram functionality.  Generate class stubs based on the diagram
    and update the diagram based on code changes.
-   Sequence diagram - An extension from the logical class diagram. 
    Show how classes interact in a standard sequence diagram.  As you
    add method calls to the sequence diagram, it updates the class
    diagram, which allows you to generate code.  What I didn't see here
    was whether the actual sequencing in the diagram generates any code.
-   Dependency analysis - They called this "Progression."  Pleading
    ignorance, I don't recall why.  Anyway, this frankly looked like a
    watered-down version of [NDepend](http://www.ndepend.com/).

**Dependency Injection Frameworks - [Scott
Densmore](http://www.agileprogrammer.com/scottden/), [Peter
Provost](http://www.peterprovost.org)**

A discussion on the principles of dependency injection more than
specific framework usage, which was just fine.  I won't go over the
whole thing because there's plenty out there on dependency injection. 
The two things I liked were the list of different types of dependency
injection and the potential drawbacks.

Types of dependency injection they mentioned (who knew there were so
many?):

-   Service locator (not really dependency injection, more late-binding
    to services)
-   Interface injection
-   Setter injection
-   Constructor injection
-   Method call injection
-   Getter injection

...and drawbacks of dependency injection.  (I liked this because
proponents of dependency injection rarely mention these things as
drawbacks, instead calling it "good design," which is debatable.)

-   Lots of little objects - you generally have to break things down
    into very, very small pieces.  Rather than two-1000 line objects,
    you might have 20-100 line objects.
-   Runtime wire-up can be complicated and difficult to visualize -
    figuring out which objects were populated by what context and how
    the dependency came to be can be hard to wrap your head around,
    especially in systems of any size.  Couple that with the "lots of
    little objects" drawback and you might realize you have a defect...
    but which of the bajillion little objects is it in?
-   Interface explosion - everything gets an interface because
    everything's gotta be pluggable.

They recommended that if you write reusable libraries with these
techniques, you should wrap the public facing stuff with a facade to
mask this confusion from the library consumers.

**Designing for Workflow - [Ted Neward](http://blogs.tedneward.com/)**

A two-part talk on things to keep in mind when designing for workflow
(specifically, Windows Workflow Foundation).  The first part started out
by basically saying that there's not enough info out there to be able to
identify best practices for workflow development.  That said, keep in
mind the goals:

-   Capture long-running processes.  (Be able to "pause" and "resume" a
    long-running process.)
-   Provide "knowledge workers" with the ability to edit a process.
-   Provide a component market.  (Developers create activities -
    components - that knowledge workers can use to compose workflows.)
-   Keep workflows decoupled from the environment.  (What if you started
    a process on a Blackberry and resumed it when you got to work and
    logged into the web application?)
-   Embrace flexibility in workflow hosting.  (You might host the
    workflow in your web app, in a Windows forms app, etc.)

The second half of the talk was open discussion.  The key that came out
here was that, when working with workflow and looking for patterns,
don't neglect work that's already been done.  Check out the [Workflow
Patterns](http://www.workflowpatterns.com) site for some documented
workflow patterns.

**Panel: The Future of Design Patterns - [Dragos
Manolescu](http://micro-workflow.com/), [Wojtek
Kozaczynski](http://blogs.msdn.com/wojtek/), [Ade
Miller](http://ademiller.spaces.live.com/), [Jason
Hogg](http://blogs.msdn.com/thehoggblog/)**

An open forum to debate whether future investment in pattern education
for the masses should occur in tools (creating tools that more easily
allow you to introduce patterns into your code) or in materials (web
sites and books that educate you about patterns).

No real resolution was reached, but there were definitely some strong
feelings on both sides.  Some felt that simply giving people tools would
make it too easy for junior folks who don't understand the patterns to
shoot themselves in the foot by misusing the tools and making bad code
even worse.  Others felt that there's already enough material out there
and investing in even more would be a waste.  And, of course, there are
the middle-ground folks who say we need both.

But if you can only have *one* of those things, which would you take?

**EntLib Devolved - [Scott
Densmore](http://www.agileprogrammer.com/scottden/)**

An exploratory discussion on why the Enterprise Library is the way it is
and ideas on how it might be made easier to use.  Wouldn't it be nice to
be able to say `EnterpriseLibrary.Get<Database>("Sales");` or something
as simple as that?  What's stopping us?

The answer: Nothing.

They're working on it.

**An Evening With Microsoft Research - [Jim
Larus](http://research.microsoft.com/~larus/)**

A peek at some of the stuff Microsoft Research has been working on. 
You'd be surprised (or maybe not) at the breadth of topics they look at.

I think my favorite one was the [analysis they did on a developer's day
including all of the interruptions and task
switching](http://research.microsoft.com/hip/papers/Ko2007InformationNeeds.pdf)
that goes on - things you might not even notice - and how that impacts
not only that developer but others around them.  [They call it "Human
Interactions in Programming."](http://research.microsoft.com/hip/) 
Looking at a graphical representation of a 90 minute period that shows
interruptions for several developers was fascinating.  They even
analyzed what the most frequent question types were that people
interrupted to ask ("Why is my code behaving like this?" sorts of
things) and how satisfied they were with the answers they got back.

Neat stuff.

