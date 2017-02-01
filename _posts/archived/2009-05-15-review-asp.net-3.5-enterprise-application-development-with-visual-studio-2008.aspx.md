---
layout: post
title: "Review: ASP.NET 3.5 Enterprise Application Development with Visual Studio 2008"
date: 2009-05-15 -0800
comments: true
disqus_identifier: 1524
tags: [books,net]
---
I just got finished reading through [*ASP.NET 3.5 Enterprise Application
Development with Visual Studio
2008*](http://www.amazon.com/gp/product/0470396865?ie=UTF8&tag=mhsvortex&linkCode=as2&camp=1789&creative=9325&creativeASIN=0470396865)
by Vince Varallo, and I came out fairly underwhelmed. I read through
this book thinking, with a title like that, it would take me through
creating an enterprise-class application, complete with all of the
things one would think are a part of such an app. As it turns out, **I
think the title should be something more like "Introduction to N-Tier
Development in ASP.NET."**

Each chapter is set up in the same format, and it's a decent format -
outline the problem, explain the design, implement the solution. The
chapters are:

1.  A Framework for Enterprise Applications
2.  The Data Access Layer
3.  Designing the Business Logic Layer
4.  The User Interface Layer
5.  Exception Handling
6.  Role-Based Security
7.  The Workflow Engine
8.  Notifications
9.  Reporting
10. The Query Builder Control
11. The Dashboard
12. Auditing
13. Code Generator

**If you go in never having built a multi-tier app** where you separate
your data access from your business logic and your UI, **this is a good
intro to that**. The explanation of the separation and showing how to
keep those things separated is a good education for the ASP.NET
developer who has only ever just thrown a DataSource on a page and let
the controls do the work.

**If you have any experience with multi-tier apps, though, the goodness,
unfortunately, is not to be found.** Even if you have a light amount of
experience, I probably wouldn't recommend this book since it could do
more damage than help. There are several reasons for this.

**First, there are little things** through the code that are just bad
practice.

-   **The naming conventions for everything in this book are absolutely
    horrible.** "ENTBaseBO" is the name of the base class that all
    enterprise business objects derive from. The names only get worse
    and more unintelligible and distracting from there. When cruising
    through the method bodies presented you sometimes wonder if he's
    using Hungarian notation in C# and then you realize that it's just
    bad naming.
-   **Almost every exception that gets thrown in the code is the generic
    System.Exception type.** Even if a more specific exception type
    would be more appropriate, it's always a general Exception.
-   **Rather than overriding the ToString() method on business objects,
    a new "GetDisplayText()" method gets added** in one of the myriad
    base classes which gets used throughout the book when displaying the
    object in UI. (Not a showstopper, but it's Just One More Thing that
    didn't make sense.)
-   The data access layer **uses the Microsoft Patterns and Practices
    Data Access Application Block**, which is good... but the book
    **urges you to use an old version** of it "because it's simple to
    use and easy to understand" - even though the new one has many
    improvements over the old.

**Larger things start creeping up** on you once you get past the smaller
stuff.

-   **There's no localization and no mention of it.** Every string seen
    in any UI is hardcoded somewhere in the system (not necessarily just
    in the UI) rather than being stored in resource files. Even if you
    only plan on supporting one language, it's still good practice to
    separate your strings from your code.
-   **There are no tests anywhere and no mention of them.** We're
    building an enterprise application and we're not going to test it?
    Really?
-   **Rather than use standard functions built into ASP.NET**like the
    SiteMapProvider and navigation controls that can bind to it, **a lot
    of effort goes into writing your own** site map management system
    and custom controls to bind to that proprietary system. Role-based
    security that doesn't hook into the RoleProvider.
-   Chapter 7, on "the workflow engine," is almost **100 pages showing
    you how to write a proprietary state machine workflow system.** I
    actually had to flip back and look at the cover to make sure we were
    in .NET 3.5, then I got really curious as to why this wasn't a 10
    page chapter showing how easy that sort of thing is to implement
    using Windows Workflow Foundation, which comes for free with the
    .NET framework.
-   **Why is the "code generator" chapter about creating a Visual Studio
    wizard** but has no mention of T4 or any third-party code generator?
    With all the code generation options out there, would I really want
    to roll my own using StringBuilders?

Other stuff just sits in the background and bugs at you more
subconsciously. The code snippets in places are inconsistently formatted
and hard to read. You start wondering why there's a little bit of logic
in stored procedures and a little bit of logic in the data access layer
and a little bit of logic in the business layer and whether there might
have been a way to break that up in a way that would be more
maintainable. No mention at all of design patterns. No mention of MVP or
MVC.

Long story already too long, if you've never written an n-tier
application, if you're used to just creating a single web application
project that just has pages in it that were created in the Visual Studio
designer and that's it... this book will give you some ideas about how
to change the way you look at your application's structure and separate
the logic out of the codebehind of your pages into different layers.
**If you have written any sort of n-tier application before, this is
most likely not for you.**

[**Postscript**: While writing up this review, it reminded me of [the
recent Jim Holmes blog
post](http://frazzleddad.blogspot.com/2009/04/challenge-to-ms-evangelists-real.html)
challenging MS Evangelists to present real examples with tests rather
than just highlights. This book felt like one of those presentations -
show you the rough idea and general concepts, but not the full "real
world" view with good patterns and practices.]

**UPDATE 3/15/2010**: I got several questions about what book(s) I do
recommend for learning enterprise app development so [I posted a short
list of
recommendations](/archive/2010/03/15/enterprise-application-development-books.aspx).

