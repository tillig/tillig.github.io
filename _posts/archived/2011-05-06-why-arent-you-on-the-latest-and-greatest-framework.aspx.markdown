---
layout: post
title: "Why Aren't You on the Latest and Greatest Framework?"
date: 2011-05-06 -0800
comments: true
disqus_identifier: 1713
tags: [.NET,GeekSpeak]
---
I was watching some Twitter stream by and caught a bit of a discussion
asking about why people haven't moved to
[xUnit.net](http://xunit.codeplex.com/) yet for unit testing. It
[started
here](https://twitter.com/#!/lazycoder/status/66542258714968064)...

![](https://hyqi8g.blu.livefilestore.com/y2p5KnTvFM2ci0pObp0d1NLmPAilxXoV4s2pdKmdIkUCR9nrgnJKnwKN5Lcp66ROwCg-0z5UUDBBobMAnP1UJhoseQnEx4fPkMhjoWBM42Xkaw/20110506tweet.png?psid=1)

Legitimate, good question. xUnit is a nice unit test framework.

The thing is, I see a lot of these things fly past - Why haven't you
updated to ASP.NET MVC3? Why haven't you switched your project to .NET
4.0 from .NET 3.5? How come you're not installing every third-party
dependency in your project through NuGet now? What? You're still on
jQuery 1.5.2? But 1.6 is out! You're still using Rhino Mocks? But Moq is
totally the way to go now! Why aren't you on the latest and greatest
framework?

There's no denying that there are some pretty compelling reasons to do
technology upgrades. Easier and cheaper feature implementation is
usually a pretty key driver. But I think some of the folks that push for
staying on the latest and greatest sometimes forget some of the hidden
costs of staying on that cutting edge. (Not that I'm saying
[@lazycoder](http://twitter.com/lazycoder), above, is one of these;
that's just a tweet that got me thinking.)

**Upgrade costs.** Using the xUnit.net example above, I have to question
what the upgrade cost would be to convert 4000+ unit tests in NUnit to
xUnit.net. Is it worth it? Probably not. So then you might say, "Oh,
then only use the latest and greatest in new projects rather than
existing projects." I'm not sure where you work, but in companies with
long-established product lines, my experience tells me that there's not
as much opportunity for new project work as there is in "adding features
to existing projects." So when you add features do you do it with the
existing toolset or do you try to introduce a new tool/dependency at
that time?

**Too many ways to do the same thing.** Continuing that thought - if you
add a new dependency into the mix when you add a new feature in an
existing product, you invariably introduce a new way to do the same
thing. That is, say you switch from Moq to Typemock Isolator or
something. You'll be writing mocks in some tests one way and in some
tests another. How do people know which way to go? You might laugh at
that question, but if you're on a large distributed team of varying
skill levels, you can't really have people "making it up as they go"
because, while it may be "intuitive" to some, there are others who will
"guess wrong." To minimize the guesswork, you need to have some
[minimal] development standards. Ever try to add an "if/then/else" to
development standards? How'd that work out for you? (I'm not saying code
should be rubber-stamped out or that you need guidelines for everything
you do... just that diverse styles and skill levels become a larger
issue the larger/more distributed your team gets and you can run into
maintainability issues pretty quickly if people don't at least have some
sort of basic standard and common approach to things.)

**Training costs.** It's really easy to say "people just need to raise
their personal bars" when throwing a new version of a framework or tool
into the mix, but the truth is, some folks adapt faster than others. If
your team is reasonably small, you can probably get away with this a
little easier than if, say, you have a 40+ team of engineers of all
skill levels jamming on the same code base. There are going to be some
road bumps unless you do a little training, which isn't free, even if
you do it in-house during lunchtime seminars or whatever. Not everyone
out there is reading tech blogs daily, working on personal projects, and
trying to "sharpen the saw" at every opportunity. I think this fact is
pretty easily forgotten by people who have the luxury of staying up to
date.

**Other dependencies.** In some cases, you have two dependencies in your
product that also rely on each other. For example, if you want to
integrate NUnit into TeamCity build reporting, the TeamCity build agent
needs to have a compatible NUnit test runner (or you need to do some
manual hackery for less than perfect integration). You may have every
opportunity to update your code to the latest NUnit, but that other
dependency requires you to stay back a version or two. That also may
limit your choices of tools - if I have to take a component that only
works if I use log4net for logging (arbitrary example), then I'm sort of
stuck with log4net even if I want to use Enterprise Library logging.

**Corporate policy.** In large enough organizations you inevitably get
some sort of review board that approves (or rejects) dependencies based
on various policies/analyses - security, legal, or what-have-you. That,
too, can limit your options.

**Customer acceptance.** Depending on your customer base, some customers
don't actually want to be on the latest and greatest. They want "tried
and true." The government and financial institutions come to mind here.
Maybe you can't upgrade to .NET 4.0 until SP1 comes out for it or
something. Point being, your customers may not allow you to upgrade even
if you want to.

**I love working on the latest stuff. It keeps me interested. It keeps
me learning. I encourage you to do the same.** But I understand if your
project is still stuck in .NET 2.0 in Visual Studio 2005 because
sometimes there are really good reasons you can't upgrade. Keep looking
for opportunities to move forward. You'll get there.

