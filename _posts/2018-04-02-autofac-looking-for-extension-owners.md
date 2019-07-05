---
layout: post
title: "Autofac: Looking for Extension Project Owners"
date: 2018-04-02 -0800
comments: true
tags: [autofac,net]
description: "Autofac is looking for owners to take on some of the extension and integration projects. Is that you?"
---
# The State of Autofac

[Autofac](https://autofac.org/) is a pretty popular inversion of control container for .NET. [Core Autofac is approaching 10 million NuGet downloads.](https://www.nuget.org/packages/Autofac) There are over 20 extension packages that are part of [the GitHub Autofac organization](https://github.com/autofac) supporting everything from .NET Core to MVC/Web API to Service Fabric.

The thing is... the whole project is effectively run by **just two people** who are not actually full-time developers on Autofac. It's just me and [Alex Meyer-Gleaves](https://alexmg.com/) doing the best we can to:

- Answer questions on StackOverflow, Gitter, the mailing list, GitHub issues lists, and other areas people ask for help.
- Address new and existing issues in core Autofac and all the extension libraries.
- Make ongoing improvements and enhancements including adding new extension libraries as demand comes up.

All of that happens in the "spare time" between full-time jobs, family obligations, and trying to maintain an otherwise decent work/life balance.

We get a few pull requests, but IoC/DI integration is tricky business. Small changes can introduce pretty big penalties when it comes to app performance. To that end, we probably don't get quite as many PRs as you might think, and when we do there's a lot of analysis that has to go into many of them to ensure we're not inadvertently breaking something.

# We Need Help!

There's a lot to maintain and we're spread thin. **We're looking for people willing to step up and own some of the Autofac extensions and integrations.** If we can focus on core Autofac and core extensions we'll make better headway on things like [fixing up the decorator syntax](https://github.com/autofac/Autofac/issues/880) or addressing some of the longer-running issues that aren't five-minute fixes.

If you become an owner on one of the extensions, you'll be responsible for:

- **Bug fixes and enhancements**: Issues submitted to the extension library's repository need to be addressed. Determine if the issue is a bug or not, determine if the enhancement request fits with the library or not, etc.
- **API design**: Lots of people rely on Autofac and its extensions, you can't change the signature of methods or introduce breaking changes without a lot of forethought.
- **Requirements determination**: Part of the job of an owner is to decide whether a library _should_ support a particular function. You'll need to make sure fixes and enhancements fit within the bounds of being willing/able to back it with long term support. Is a fix or enhancement worth addressing?
- **Support**: Answering questions by actively monitoring `autofac` tagged questions on StackOverflow, in Gitter, and on the mailing list.
- **Documentation**: Changes to the extension or FAQs get documented so future folks can [refer to the docs](http://autofac.readthedocs.io/en/latest/).
- **Examples**: There's [an examples repo](https://github.com/autofac/Examples) that shows simple usage of most extensions.

You won't just be handed a big lump of code and left on your own, but you'll be considered a primary owner of the extension and you'll work with Alex and I to bring things forward. It's a commitment. We're looking for _owners_.

**If you're interested, [take a look at the list of extension libraries](https://github.com/autofac)** and pick one you think you'd like to take on. Smaller libraries that might be good candidates are [Autofac.Extras.Moq](https://github.com/autofac/Autofac.Extras.Moq), [Autofac.Extras.FakeItEasy](https://github.com/autofac/Autofac.Extras.FakeItEasy), [Autofac.Mef](https://github.com/autofac/Autofac.Mef), and [Autofac.Extras.MvvmCross](https://github.com/autofac/Autofac.Extras.MvvmCross). Feel free to look at others, these are just examples.

**Let us know by filing an issue on the repo or tweeting `@AutofacIoC`.** It'll help if you let us know a little about yourself, any open source work you may be involved in, that sort of thing. It's not really a job interview, but we are a team so knowing if you'll be a team fit is valuable.

# Not Interested in Owning?

That's fine, it's a lot to take on. **We'd love your PRs** that solve existing issues with a mind toward non-breaking changes. Especially in some of the lesser-used libraries, there's definitely some TLC needed.
