---
layout: post
title: "Microsoft Patterns & Practices Summit 2007 - Day 2"
date: 2007-11-06 -0800
comments: true
disqus_identifier: 1292
tags: [GeekSpeak]
---
**The topic of Day 2: Agile.**

**Keynote - [Steve McConnell](http://stevemcconnell.com/)**

McConnell gave one of his usual interesting and insightful presentations
on Agile development practices.  I think the thing I liked the best was
that he talked about how you don't have to stick to every single Agile
ideal to the letter to call yourself Agile - in practice, doing what
works for your team and your company is what's important.

A couple of interesting quotes:

"We see XP fail more often than it succeeds."

"We see Scrum succeed more often than it fails."

Practices he's seen succeed in Agile environments:

-   Short release cycles.
-   Highly interactive release planning.
-   Timebox development.
-   Empowered, small, cross-functional teams.
-   Involvement of active management.
-   Coding standards.
-   Frequent integration and test.
-   Automated regression tests.

On the other hand, things like daily stand-ups should be evaluated -
make sure you're not meeting just for the sake of meeting.  And don't
oversimplify your design - YAGNI is a good principle, but don't use it
as an excuse for a design that is too inflexible to accommodate for
change.

**Agile is More Than Monkey-See Monkey Do - [Peter
Provost](http://www.peterprovost.org/)**

Provost started this talk with an altogether-too-close-to-home story
called "An Agile Tragedy" about a team that attempted to adopt Agile
practices only to sacrifice certain key tenets and have a project fail
miserably and wind up with a very unhappy team.

Basically, just following Agile practices doesn't make you Agile.  You
have to actually subscribe to the principles, not just go through the
motions.

**Empirical Evidence of Agile Methods - [Grigori
Melnik](http://blogs.msdn.com/agile/)**

This talk was a discussion about the metrics we have that support the
value of Agile development practices.  What it brought to light is that
we don't actually *have* a lot of metrics - Agile is largely
measurement-free and most experiments that have been done are too
trivial to count or have inherent design flaws.

**What's New in Rosario's Process Templates - [Alan
Ridlehoover](http://blogs.msdn.com/aridle/)**

"Rosario" is the version of Visual Studio that comes after Visual Studio
2008 (Orcas).  It's built on the VS 2008 technology and adds features.

This talk focused on the Team System features they're adding to Rosario
to support a more integrated Agile development process.  Specifically,
they showed some of the templates they're adding that allow you to
manage your backlog and work items.  It looked, to me, a lot like
[VersionOne](http://www.versionone.com) meets Visual Studio.

Other features that stuck out to me:

-   Continuous integration support - They're building in a continuous
    integration server that's supposedly better than CruiseControl. 
    I'll have to see that to believe it.
-   Drop management - Once you've built something in your continuous
    integration server, where does it go? How long do you maintain it?
    That's what this does.
-   Test impact analysis - If you change a line of code, this will tell
    you which tests need to be run to validate the change you made.

**Lessons Learned in Unit Testing - [Jim
Newkirk](http://blogs.msdn.com/jamesnewkirk/)**

Some very interesting discussion about things learned in the creation of
NUnit and other experiences in unit testing.

-   Lesson 1: Just do it.  You have to write your tests and they have to
    be first-class citizens.
-   Lesson 2: Write tests using the 3A pattern.  Arrange, Act, Assert. 
    Each test should have code that does those things in that order.
-   Lesson 3: Keep your tests close.  Close to the original code, that
    is.  Consider putting them in the same assembly as the code they
    test and ship the tests.  One possibilty to still maintain the
    ability to not ship tests includes using multi-module assemblies -
    put your production code in one module and your tests in another. 
    When you're debugging/testing, compile both modules into the
    assembly; when you release, only include the product module. 
    Unfortunately, Visual Studio doesn't support creating this sort of
    assembly.
-   Lesson 4: Use alternatives to ExpectedException.  The
    ExpectedException attribute, part of NUnit, breaks the 3A principle
    because it puts the "Assert" - the ExpectedException attribute - at
    the top.
-   Lesson 5: Small fixtures.  Keeping test fixtures small helps
    readability and maintainability.  One idea is to create one main
    test fixture class and each method's tests go in a nested
    class/fixture.  (Of course, this does introduce nested classes,
    which isn't supported by all test runners...)
-   Lesson 6: Don't use SetUp or TearDown.  The problem is that they
    become a dumping ground for every test's setup/teardown even though
    they apply to every test.  Forcing each test to do its own setup and
    teardown makes each test isolated and more readable... but it will
    introduce duplicate initialization code.
-   Lesson 7: Improve testability with inversion of control.  This was
    sort of a nod to "design-for-testability" with interfaces that allow
    you to swap in test implementations of objects at test time. 
    (Dependency injection centralizes the management of this.)  The
    benefits are better test isolation and decoupled class
    implementaiton.  The drawbacks are that it decreases encapsulation
    and risks "interface explosion" (a high proliferation of interfaces
    - every object ends up with a corresponding interface, even if it's
    just for testing).  Plus, in many cases a dependency injection
    framework is overkill.

Very interesting stuff, even though I disagree with some of the lesons
(no SetUp/TearDown, inversion of control/design for testability).

**Agile Security - [David
LeBlanc](http://blogs.msdn.com/david_leblanc/default.aspx)**

This was a talk about how secure coding practices like threat modeling
can work into an Agile project.  There were some good general ideas, but
the main point was that you need to work it into your own process -
there's no one way to get it in there.

Ideas include:

-   Appoint a security owner, ideally someone who's interested in it. 
    That person will be responsible for ensuring the team meets security
    goals.
-   Agile threat modeling is sometimes just as good as a heavyweight
    process.  Sketch data flow diagrams on the whiteboard and make sure
    threat mitigations get added to the backlog.
-   Use code scanning tools daily or weekly.  Also use peer code
    review - this can not only catch functional defects but security
    defects, too.
-   Build security tests at the same time you build your other tests.

**"Yet Another Agile Talk On Agility" - [Peter
Provost](http://www.peterprovost.org)**

This was an interactive session where we actually used an Agile process
to, as a group, ask questions about Agile, add them to a backlog, rank
the priority of each question, and get the questions answered.

An interesting exercise and lively discussion about a wide variety of
Agile development topics.

**"Open Source in the Enterprise" - Discussion Panel hosted by
[CodePlex](http://www.codeplex.com)**

[Ted Neward](http://blogs.tedneward.com/), [Jim
Newkirk](http://blogs.msdn.com/jamesnewkirk/), [Rocky
Lhotka](http://www.lhotka.net/), and [Sara
Ford](http://blogs.msdn.com/SaraFord/) sat in on a discussion panel to
talk about different topics related to open source - getting management
buy-off to allow use of open source projects in development,
contributing to open source projects, mitigating risk when using open
source projects, etc.

After a while, it became more audience-participation-oriented and
speakers started swapping out.  For a time, I was even up there with Jim
Newkirk, Sara Ford, [Stuart
Celarier](http://cs.ferncrk.com/blogs/stuart/), and Rory Plaire.  I have
to say, it was pretty sweet sitting up there with that crowd.  Maybe I
need to seek me out some speaking gigs.

