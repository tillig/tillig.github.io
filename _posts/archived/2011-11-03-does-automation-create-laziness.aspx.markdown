---
layout: post
title: "Does Automation Create Laziness?"
date: 2011-11-03 -0800
comments: true
disqus_identifier: 1749
tags: [GeekSpeak]
---
I'm working on this theory that the more automation you wrap around a
development environment - testing, static analysis, etc. - the lazier
the developers in that environment get due to increased reliance on the
automation.

That's not necessarily a bad thing, but I'm not so sure it's good,
either.

Let's say you have a .NET project and you've got it totally wired up
with automation.

-   You have a continuous integration server running the build on every
    check-in.
-   You're running unit tests and failing the build if the test coverage
    levels fall below a certain limit.
-   [FxCop](http://blogs.msdn.com/b/codeanalysis/archive/2010/07/26/fxcop-10-0-is-available.aspx)
    runs with [almost all the rules turned
    on](/archive/2008/10/30/fxcop-rule-recommendations.aspx) to check
    for consistent behavior.
-   [StyleCop](http://stylecop.codeplex.com/) runs with almost all the
    rules turned on to ensure the code is consistently formatted.
-   [NDepend](http://www.ndepend.com/) runs to check your dependencies
    and ensure other custom project-specific standards are met.

You even run your code through code reviews to ensure you get a second
(or third, or fourth) set of eyes on everything. (No, that's not
automated.)

The point is, you've got all of these checks and balances in place so,
ideally, the automation will catch a lot of the stuff before it even
makes it to code review.

Somehow, though, you still see things creeping through. Things that
should have been caught somewhere along the way. Things that don't make
sense.

Maybe it's a bad naming convention that's started that encourages the
breaking of the [Single Responsibility
Principle](http://www.butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod)...
like
[HtmlHelper](http://msdn.microsoft.com/en-us/library/system.web.mvc.htmlhelper.aspx).
(If you have to name your class with "Helper" or "Utility," I'll also
put good money down that you don't really know what it's supposed to do
and that you've totally broken SRP. **But even if you disagree with my
example, stick with me.**)

So you add some automation around that to try and head off that bad
naming convention. The build will break or give a warning or something
if the bad convention is used. You educate the team on why the rules
were updated and folks agree to amend behavior. Fixed, right?

Nope. **There's always a way to game the system.** Now there's a new
convention where instead of "Helper" or "Utility" it's "Service" but the
point is the same - it's a dumping ground for random, only loosely
related functionality. But now everyone thinks it's OK, it's not a
problem. Why is that?

**The automation didn't catch it, so it must not be a problem.**

The automation only catches the exact rule being broken, but can't
enforce the principle. If a person doesn't catch it - *you, the
developer* - that doesn't mean it isn't an issue.

Another example: You have your test coverage requirement cranked up to
95%. That's pretty high. It's not 100% because in some cases that's not
even possible, but 95% gives you some wiggle room to leave things
uncovered but have full coverage on those things you are able to cover.

The thing is, once you have a significant codebase, that 5% can
potentially be pretty big. It might be several [small but important]
classes.

How come there aren't any unit tests for this code? "Well, the build
didn't fail, so isn't it OK?" No, it's not OK to not test your code just
because you found a loophole in the automated rules. I mean, the cops
may not have caught you for robbing the bank, but does it mean you
didn't break the law?

**The automation didn't catch it, so it must not be a problem.**

The thing is, there's not even always a way to catch this in code
review. The naming convention thing can be caught... if the reviewer is
familiar with the team's past history and why the convention is in
place. The coverage is actually harder to catch, especially if there is
a lot to review all at once. You have to have a lot of discipline to
mentally follow through the various execution paths and see how the
tests exercise it. You also have to trust that the developer submitting
the code for review did their due diligence and actually wrote the
tests.

Missing it in code review can sometimes even mean worse things. Now, not
only did the automation let it slide, but a fellow developer also missed
it. Must mean you never have to fix it if someone else runs across it
and does catch it, right? Why do you have this 3000 line method? "It
made it through code review."

Sometimes this means you update the automation to try to catch these
things. Cool, now you can't have a 3000 line method. *But that 2999 line
method is just fine because the automation didn't catch it.*

**That's why I'm starting to think automation makes you lazy.** You can
rely on the automation to catch so much, you stop trying to preemptively
catch it yourself. You stop using your own heuristics to detect issues
with your code and you fall back on the automation. And that's sort of
the point of automation - to help you catch things you'd otherwise
miss... but it doesn't entirely remove your responsibility for *being
the developer*.

**Be a professional developer.** Use the automation, but also use your
brain. Work *with* the automation. Understand that the automation around
your build is a tool there to help you, not robotic police trying to
*enforce the law*. Collaborate with your team and ask questions if you
don't know. Be amenable to refactoring - or rewriting - if something
gets discovered after the fact.

**Don't let the automation make you lazy.**

