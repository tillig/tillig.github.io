---
layout: post
title: "People Who Write Software For People Who Write Software"
date: 2005-03-14 -0800
comments: true
disqus_identifier: 762
tags: [personal]
---
As much as some folks might disagree, there is a difference between just
developing software and developing software that will be used by other
software developers to create new and interesting products. This
includes the people who write business tier and data access tier
functionality in an n-tier architecture.

 I get in arguments about this kind of thing with folks. They believe
I'm expecting perfection, which is something impossible to provide.
That's incorrect; I expect *excellence*. Understanding the difference
between excellence and perfection is important, just as it is important
to understand what it is to write code and what it is to write code for
people who will use it to write code.

 What's the difference? While I could (and generally do) argue that
there shouldn't be any difference, here's what I've found:

 People who write software do error checking. People who write software
for people who right software will not only provide meaningful error
messages as a result of that error checking but will also add trace and
debug statements so someone using it can figure out where precisely the
error is happening and how to fix it.

 People who write software have documentation. People who write software
for people who write software provide API documentation, task-based
documentation (HOWTO), examples, remarks, and helpful tips. An
undocumented API is almost as useful as a nonexistant API.

 People who write software only look at taxonomy and naming in relation
to the application. People who write software for people who write
software use clear, concise naming for identifiers and filenames that
makes sense to people outside the scope of the application and makes use
of the API intuitive; and they organize code in structures (namespaces,
files, etc.) that make sense beyond just an individual application.

 People who write software focus on what needs to be done *now*. People
who write software for people who write software also focus on what will
be done *in the future*. (Which is another way of saying: People who
write software *extend code*. People who write software for people for
people who write software make *extensible code*.)

 In short:

 People who write software make code that *works*. People who write
software for people who write software make code that is *usable*.
