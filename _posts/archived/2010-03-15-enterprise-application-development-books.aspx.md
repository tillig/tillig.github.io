---
layout: post
title: "Enterprise Application Development Books"
date: 2010-03-15 -0800
comments: true
disqus_identifier: 1624
tags: [dotnet,process]
---
Around the middle of last year [I reviewed *ASP.NET 3.5 Enterprise
Application Development with Visual Studio
2008*](/archive/2009/05/15/review-asp.net-3.5-enterprise-application-development-with-visual-studio-2008.aspx).
In a nutshell, I thought it was a good entry level book to multi-tier
app development, but I didn't think it really showed what "enterprise"
dev should be.

Since then, I've gotten a lot of questions asking what book I would
recommend to learn enterprise application development. Unfortunately,
**I didn't really have an answer at the time... and I still don't.**

The problem is that, for a dev who's never done anything much larger
than a fairly simple web site or some console/WinForms apps, after
reading this book it looks like "all you need to do" to get into
enterprise dev is start separating things into tiers, and that's not
really accurate.

Really, you need to consider different technologies; different
architectures; how the system you're building needs to interact with
other systems (if at all); who's going to maintain it when you're done;
how the system should be extended; and so on. It's more than just
throwing a three-tier web app out there.

Because there's so much to it, **you really can't just pick "a book" and
call it good.** You sort of need to pick several books, but even then,
it's not enough.

**Think of it in terms of those "Learn to Program in 24 Hours"
books.**Say you read one of those and work through the exercises and do
everything it says you should do. When you're done, are you a
programmer? No, not really. You might be able to put a simple program
together, or even a complex one, but you'll be missing a lot of the
things that you'd get with experience - knowing which algorithms to use
in certain situations, understanding the benefits and drawbacks to the
tech you're working with, and so on.

Same thing here: **Can a book, or even several books, teach you
enterprise development? I'd say no.** You'll never be able to just read
a few books and throw "enterprise development" on your résumé. Can books
give you a few building blocks that you can use, along with experience,
to do enterprise development? Sure.

Given the constraint that you'll be looking at .NET-based technology
(since the original commentary was on a .NET-based book), here are a few
suggestions. It's by no means all-inclusive; the second I publish this
it'll be out of date (if it isn't already); and while this is a
.NET-centric list, you really need to look beyond just .NET so you can
choose the right solution.

- *[Design Patterns: Elements of Reusable Object-Oriented
    Software](http://www.amazon.com/dp/0201633612?tag=mhsvortex)*:
    Understanding design patterns will help you recognize different ways
    to implement various functionality as well as giving you a common
    language with which you can communicate your design. (You may have
    heard this book referred to as the "Gang of Four" book.) Should you
    apply every single design pattern in your code? No - it's not a
    checklist. Will it help you do things in a standard way and maybe
    open your eyes to some different ways to solve the problem? Sure.
- [*Design Patterns in
    C#*](http://www.amazon.com/dp/0321126971?tag=mhsvortex): Less
    comprehensive (and easier to read) than the "Gang of Four" book, but
    provides concrete examples of common patterns in C# and helps to
    solidify some of the concepts.
- [*Framework Design Guidelines: Conventions, Idioms, and Patterns for
    Reusable .NET
    Libraries*](http://www.amazon.com/dp/0321545613?tag=mhsvortex): This
    book will help you understand various patterns (and anti-patterns)
    that you should use in your code. It also addresses some issues like
    naming conventions that will help your source code be more
    discoverable to other developers who may come in to help or maintain
    the code.
    ([FxCop](http://msdn.microsoft.com/en-us/library/bb429476%28VS.80%29.aspx)
    analyzes your code for some of these rules. You'll want to run FxCop
    on your enterprise app code. However, you may not want to run
    literally every single rule. [I have some
    recommendations](/archive/2008/10/30/fxcop-rule-recommendations.aspx)
    on which rules to run based on my experience.)
- [*SOA: Principles of Service
    Design*](http://www.amazon.com/dp/0132344823?tag=mhsvortex): If
    you're not familiar with service-oriented architecture, this will
    help you become familiar. Remember, though, that SOA is *just one
    option* for separating logic into components. The *ASP.NET 3.5
    Enterprise Application Development* book doesn't even mention
    services, and that's a big oversight.
- *[Professional ASP.NET 4 in C# and
    VB](http://www.amazon.com/dp/0470502207?tag=mhsvortex)*: If your UI
    will be a web app, you owe it to yourself to get this book. It
    covers the ASP.NET pipeline and the common providers you'll need to
    know about. While it primarily focuses on web forms, it does touch
    on ASP.NET MVC. Note that there is a lot to ASP.NET. It's not just
    throwing a few controls on a page or whatever. This book is a
    behemoth at around 1400 pages with fairly small text. Be ready.
- [*Professional ASP.NET MVC
    2.0*](http://www.amazon.com/dp/0470643188?tag=mhsvortex): A smaller
    book that focuses on the MVC portion of ASP.NET. This complements
    the more general ASP.NET book listed above. (At the time of this
    writing, the MVC 2.0 book is a pre-order; if you're looking for
    something right now, get [the MVC 1.0
    book](http://www.amazon.com/dp/0470384611?tag=mhsvortex).)
- [*Writing Secure
    Code*](http://www.amazon.com/dp/0735617228?tag=mhsvortex): If you're
    creating an enterprise app, it probably means you're going to have a
    user base larger than one trusted user. You'll want to make sure
    what you're doing has security built-in from the ground up. Security
    is not an afterthought.
- [*Code
    Complete*](http://www.amazon.com/dp/0735619670?tag=mhsvortex): If
    you're a developer of moderate experience then a lot of what you'll
    find in here will feel like review. If you're not, this book will
    help you understand some general good programming practices. In
    enterprise development, you'll want to be aware of this stuff. It's
    not just "jamming some code together."
- [*Code Leader: Using People, Tools, and Processes to Build
    Successful
    Software*](http://www.amazon.com/dp/0470259248?tag=mhsvortex): Part
    of development of enterprise apps is the *process* - not just the
    coding, but how it gets built, how it gets tested, how it's
    organized, etc. It's meta-information about the app, not just the
    app. This book is a good intro to some of this process information.
    This one is sort of like gaining some "free experience" - it took a
    lot of us years to arrive at the conclusions you're just handed
    here.
- [*The Art of Unit Testing: With Examples in
    .NET*](http://www.amazon.com/dp/1933988274?tag=mhsvortex): If you're
    doing an enterprise app, you'd best be testing it. "It works" isn't
    good enough at this level. While unit testing isn't the only kind of
    testing you should be doing, it is fundamental. This book will help
    you understand how unit testing works and how to make a good unit
    test.
- Other technology-specific books: You'll end up with a lot of books
    that tell you how to work specific tech in .NET. Depending on your
    solution, you may or may not need these; or you may need more than
    this.
  - [*Essential Windows Communication
        Foundation*](http://www.amazon.com/dp/0321440064?tag=mhsvortex):
        If you're going to be writing services, you'll want a WCF book.
        I happen to like this one since it specifically addresses some
        of the issues of getting ASP.NET to integrate nicely with WCF.
  - [*Pro WF: Windows Workflow Foundation in .NET
        4.0*](http://www.amazon.com/dp/1430227214?tag=mhsvortex): If
        you've got some workflow needs (say you're creating something in
        your system that needs approvals), you'll probably want to use
        WF rather than writing your own workflow solution. (At the time
        of this writing, the .NET 4 version of the book is a pre-order;
        I have [the .NET 3.5 version of the
        book](http://www.amazon.com/dp/1430209755?tag=mhsvortex).)

Like I said, **it's nowhere near a comprehensive list.** For example,
you'll notice I didn't include a database design book - not because
there aren't any good ones, just that I don't have a specific
recommendation. I also didn't include a book for every single .NET-based
tech; that list could go on forever. Windows Presentation Foundation,
Silverlight, Azure cloud services... there's a lot. I also didn't get
into every technology-agnostic programmer topic that would help -
regular expressions, source code branching strategies, refactoring
patterns, algorithms and data structures, etc. Again, that could go on
forever.

However, **all of this stuff is stuff you need to know, or at least be
highly aware of**, if you're doing any sort of "true" enterprise
development. It's not just multi-tier development.

**What do you think?** Do you have a recommended set of books for
enterprise application development? Do you think you can learn
enterprise app from a single book? Several books? Or is it just
something you need to learn with experience? Leave a comment and help
out the people who are trying to learn.
