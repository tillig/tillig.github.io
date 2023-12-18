---
layout: post
title: "Pragmatism Is Not An Excuse To Avoid Work"
date: 2007-07-25 -0800
comments: true
disqus_identifier: 1241
tags: [GeekSpeak]
---
When you're working on a software project, there are times you're faced
with decisions:  Do I implement this functionality or not?  Do I add
this feature or not?  How far do I take the feature I'm working on?

Since you're trying to ship product, sometimes you have to take
shortcuts in the name of pragmatism.  What will get me to a shipping
state faster?  Decisions get made on the [YAGNI (You Ain't Gonna Need
It) principle](http://en.wikipedia.org/wiki/You_Ain't_Gonna_Need_It):
If the functionality doesn't get me to the goal, I won't implement it.
In an agile environment, this can sometimes mean "If this doesn't get us
to the goal of the end-of-sprint-demo, add it to the backlog."

This is generally not a bad thing.  After all, you want to be
successful, and success is meeting your goals and shipping.  That said,
you have to use this as a general guideline, not a hard and fast rule.
You have to adapt your view of what pragmatism means in light of current
circumstances.

For example:  While it isn't something that can be demonstrated at the
end of a sprint to a business user, setting up your source code
repository structure and other infrastructure items (build server, etc.)
is not generally something you can put off until later just because it's
not demonstrable.

Another example:  If a change to the codebase has half the team in a
non-functioning state, it's probably not OK to push forward on
development until the whole team is productive again, even if it's only
a week until your demo and even if it means you might not make the goal.

In some cases, you may have to adjust your sprint goals.  That's what it
means to be agile - to be able to adjust and accommodate change, not use
the principles as a crutch.  If you're demonstrating the UI of the
application and you don't have a solid deployment mechanism, that's
probably OK.  On the other hand, if it's only building on your local
development machine and the rest of the team can't get it to work,
that's a little less OK.

Don't use pragmatism as an excuse to avoid work.  Let common sense
prevail.
