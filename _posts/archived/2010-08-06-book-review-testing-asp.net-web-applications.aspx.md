---
layout: post
title: "Book Review: Testing ASP.NET Web Applications"
date: 2010-08-06 -0800
comments: true
disqus_identifier: 1660
tags: [dotnet,aspnet,testing,books]
---
[![Testing ASP.NET Web Applications by Jeff McWherter and Ben
Hall](http://ecx.images-amazon.com/images/I/51X2nhpR2-L._SL160_.jpg "Testing ASP.NET Web Applications by Jeff McWherter and Ben Hall")](http://www.amazon.com/gp/product/0470496649?ie=UTF8&tag=mhsvortex&linkCode=as2&camp=1789&creative=390957&creativeASIN=0470496649)I
got a copy of [*Testing ASP.NET Web
Applications*](http://www.amazon.com/gp/product/0470496649?ie=UTF8&tag=mhsvortex&linkCode=as2&camp=1789&creative=390957&creativeASIN=0470496649)
a while ago but it's taken me some time to get through it because I
wanted to dedicate the time and attention to it that it needed. There
really aren't many decent books that discuss testing all different
aspects of web applications (though there are several dedicated
specifically to security testing). The content in this book is something
I've been trying to find for a long time in a format aggregated all
together in one place and, **despite a few rough edges, I'll be
recommending it to my QA friends this year.**

I'll run down the content chapter by chapter so you can see what's
inside and decide for yourself.

## Chapter 1: Preliminary Concerns

The first chapter gives a nice, concise history of testing tools
starting from sUnit (Smalltalk unit testing) and bringing us through
today, so you can see where we've been. It also provides a really nice
terminology list. I may have to blow the terminology list up and attach
it to my wall so I can point to it and make sure in discussions that
everyone's on the same page, talking about the same thing. Finally,
there's a good test-related "mythbusters" section you can use to get
testing moving forward in your organization.

## Chapter 2: Design and Testability

This chapter starts off with a summary overview of what makes a good
unit test. I agreed with some points and disagreed with others, but the
qualities that "make a good unit test" are sort of a religious debate
that people can't agree on - for example, naming conventions. That said,
they revisit what makes a good unit test at the end with a checklist of
sorts that is really good. They talk about the design of your code and
how it affects testability, discussing the SOLID design principles, and
test smells (fragile tests, slow tests, etc.) you might encounter. They
do touch lightly on pair programming and test driven development in this
chapter (saving the details for the next chapter) but they don't discuss
it in a dogmatic way, which is a nice change from most articles you'll
read on the subject.

There is a section on refactoring in chapter 2 that felt somewhat out of
place, like they wanted to relate the refactoring examples to how easy
refactoring can be if you design your code well, but it really felt
bolted on and distracting.

## Chapter 3: Unit Testing and Test Driven Development

The chapter on unit testing and TDD should have been one of the best
chapters, but it wasn't as helpful as I'd hoped it would be. Since this
is an ASP.NET specific book, the aim of the chapter should have been to
explain how to get testing running in ASP.NET - web forms and MVC. Of
the 50 pages in the chapter, about two talk about web forms and the
model-view-presenter way of separating concerns and getting web forms
testable. The rest of the time is spent on ASP.NET MVC and setting up an
example application that gets used through the rest of the book. While I
agree with the authors that MVC is a far more testable framework, that
doesn't help the people who have legacy applications or who are
otherwise stuck on web forms. There is a tiny bit at the end that
basically says, "It's not worth much to try retrofitting unit tests to
web forms" (without saying those exact words). I feel like there was a
huge opportunity missed.

As for MVC, the authors suggest a different "default project structure"
than the one provided by ASP.NET MVC out of the box, and I only
partially agree with the proposal. The idea is sound, but it would be
nice to see things in a stock fashion since a new project structure
really only applies to Greenfield work.

The walkthrough of creating the demo application is very valuable and
shows the red/green/refactor process of test driven development well. If
you're unfamiliar with this process, it's good to see it. Of course,
they also introduce a lot of patterns and concepts very quickly with
little ceremony (e.g., the repository pattern, NHibernate usage, etc.)
and that's a lot to take in, so be patient.

## Chapter 4: Integration Testing

This chapter is a pretty short chapter and talks about the differences
between unit testing and integration testing, then runs through adding
some integration tests to the sample application so you can get a feel
for doing that.

## Chapter 5: Automated User Interface Testing

This chapter breaks down the different types of functional testing and
talks about the benefits, drawbacks, and challenges of automating the
UI. The discussion of challenges is really good, listing different ways
your UI automation tests can fail. It definitely gives you something to
think about as you head down this road.

They break down different tools and approaches to UI testing with a
primary focus on WatiN, Visual Studio Web Tests, and Selenium usage.
They then show how to apply these tools to automating the sample
application so you can see them in action. (There is also a section on
qUnit - unit testing for JavaScript - at the end of the chapter, but
it's really thin and feels like an afterthought.)

During the automation of the sample app, there is a little bit of
distraction as the authors get a little lost in the weeds introducing
test data generators with fluent interfaces right in the middle. For
automated UI testing you do need some test data to populate the system
with, but it's really confusing and distracting plopped right in the
middle of everything.

## Chapter 6: Acceptance Testing

The chapter on acceptance testing starts off with some good terminology,
but then dives into Scrum project management methodology. It feels like
they're taking you on a ride, but if you have a little faith, you'll see
how they bring you back around to testing. It's a worthwhile detour,
even if it feels a little abrupt.

They focus on FitNesse and Cucumber as the two acceptance testing
frameworks and show you how to get each running. I read the FitNesse
section twice and still didn't really get it. There were lots of wiki
screen shots and tiny code snippets, but nothing that was complete
enough. It took skipping forward to the example section and once I got
it, I started questioning if the work involved was really worth it. On
the other hand, Cucumber seemed reasonably straightforward (though it,
too, didn't come clear until seeing a real example rather than just
reading about it in hypothetical terms).

I'm not sure the acceptance testing chapter accomplished for me what it
set out to. After seeing all of the work and "glue code" required to get
the business users the ability to write tests, I wondered if it might be
time better spent getting them to write use case documents and having
the developers write WatiN tests to associate with those documents. (Of
course, in thinking that, maybe I missed the point.)

## Chapter 7: Manual Testing

This chapter talks about the things to look for in manual testing -
usability, documentation, error messages - as well as scenarios you
might look for - session timeouts, disconnected/down services, network
issues, etc. It provides a few tools that can help you in manual testing
and explains how to document manual test cases. It's not a long chapter,
but it's nice to formalize some of this stuff, or at least give teams a
place to start discussing. "Manual testing" isn't just "jump in and
start clicking buttons."

## Chapter 8: Performance Testing

**Of all the chapters in the book, this one was my favorite.** It starts
off by giving a high-level description of what performance testing is
and then it dives right in. There is some great guidance on establishing
baselines and expectations as well as capturing requirements. It gives
you a lot to think about and discuss with your customers around
performance and gives a good set of questions to ask about it.

They provide a great list of tools you can use to measure performance
and shows a sample run of each one. I was really happy with this bit
because it was like having someone evaluate all of these tools for you,
show you the outputs, and help you decide which one you like best.
Really helpful.

They outline the components of a performance test environment and
explain some of the relevant performance counters you should watch when
running tests and what they mean.

Finally, they correlate performance testing with capacity planning so
you can take the numbers you record and start figuring out what kind of
resources you'll need to address your site's target audience.

## Chapter 9: Accessibility Testing

Right after the chapter on performance testing, this was my next
favorite chapter. There's a nice "accessibility mythbusters" section to
disprove common misconceptions about accessibility and the web and a
good discussion about the benefits of making your site accessible.

One of the nice bits about this chapter is that they take the time to
discuss a few of the disabilities that people visiting your site might
have and then provide simulated screen shots showing what users with
these disabilities might be seeing. (Granted, the book is printed in
black and white so the screen shots showing "color blindness" are less
than effective, but the rest are good.)

They talk about several things you might see in web sites - images,
graphs, forms, lists - and how to make them accessible. They also talk
about other things to look for like acronym usage and CAPTCHA and how
those aren't accessible. While they touch briefly on audio/visual media,
not much help is offered beyond descriptions of what you could possibly
do (not how to do it). Same thing with JavaScript - they talk a bit
about what to do and what not to do, but don't really show any examples.

There is a great list of links to different web accessibility standards,
not just for the US but for countries around the world. There's also a
good list of tools you can use to help you test your site's
accessibility and they do a bit of a walkthrough using these tools to
test their sample web site.

## Chapter 10: Security Testing

This chapter starts out explaining some common security terminology and
then dives into selling you the benefits of security testing. It's
unfortunate that anyone should have to be convinced to test their app
for security, but if you have to get some time allocated from
management, this is a decent list of things you can discuss.

Just like in the accessibility testing chapter, there is a list of links
to related standards for security and compliance here as well as a list
of places to go (like [OWASP](http://www.owasp.org)) for some guidance.

The bulk of the chapter focuses on the OWASP Top 10 vulnerabilities and
walks you through an example of testing for each. This is the most
valuable part of the chapter and if you've ever heard of, say, "SQL
injection" but you're not sure what it looks like, this is really good.

There is a section about how to assess and report vulnerabilities in
your application which is really good for communicating risk and helping
manage that for your project.

Finally, there's a list of security-related testing tools... but there
isn't really a description of them or any example usage, just a list of
URL links. This felt like a bit of missed opportunity here, or maybe a
last-minute addition.

## General Thoughts

There were a ton of spelling and grammar mistakes through the book,
enough that it was a little distracting. I sort of wondered if the
editor was asleep at the wheel. It didn't make the book unreadable, but
it does feel like a bump in an otherwise reasonably smooth ride.

Also, while many of the topics were really good, there were things I
felt that belonged but were jammed in the wrong spots. For example, the
discussion about design patterns that gets stuck in the middle of the
TDD chapter may have felt better in the chapter before it about design.

Finally, there were lots of good tool lists, good links to related
sites... it'd have been nice to see those recapped in appendices at the
end so you don't have to hunt them down later in the middle of the book.

## In the End: Recommended

Despite some of the rough edges, I haven't seen a book before that
captures all of this information in one place. I know it's earned a
place on my shelf. If you're looking for a book on testing ASP.NET web
apps, this is one to consider.
