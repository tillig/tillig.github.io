---
layout: post
title: "Help Wanted! Autofac (Still) Looking for Owners"
date: 2019-07-05 -0800
comments: true
tags: [autofac,dotnet]
description: "Are you an Autofac user who would like to help out on a larger scale? Wishing someone would address those long-running issues out there? Autofac is looking for owners!"
---
[Back in April 2018 I posted a request for help to own some of the Autofac extension packages.](/archive/2018/04/02/autofac-looking-for-extension-owners)

As I mentioned then, Autofac has effectively two owners: me and [Alex Meyer-Gleaves](https://alexmg.com/). We maintain core Autofac along with the 20+ extension packages that integrate with different application types (ASP.NET Core, WCF, web forms, and more) as well as feature support packages (configuration, multitenancy). We put out the call for owners to help lighten the ever-growing load.

**Since then, we've received a small handful of pull requests (thanks to the folks who submitted!) and, unfortunately, no takers to help out on ownership.**

When it comes to pull requests, we generally get one of two flavors:

- Very small fixes - between one and five lines, something that corrects a small error condition or fixes a documentation error.
- Incredibly large changes - adjusting the way memory gets allocated, changing the way the container gets built, that sort of thing.

In the case of the small changes, these aren't hard to review or accept, but in the majority case they're also not addressing any of the issues that users have filed.

In the case of the large changes, it's more challenging:

- These are very hard to review. They're both time intensive and they generally include some breaking API changes we need to consider.
- The person submitting the change isn't going to come back and own it if it something goes wrong. It's a "drive-by submission." Maybe it introduces a memory leak in an application because it inadvertently holds onto references it shouldn't. Maybe it adds a few milliseconds on every resolve operation and now under load things are failing. The original submitter isn't going to fix that.

Finally, there are a lot of things that seem small but are still time sinks. A good recent example is [the change in the hosting model for the .NET Core conforming container](https://github.com/autofac/Autofac.Extensions.DependencyInjection/issues/36). Good changes for .NET Core, but for Autofac we have to update docs, come up with examples, adjust how some things get handled, answer StackOverflow questions on it, and so on. What seems like a small change can become a non-trivial time sink.

**Unfortunately, we've reached a point where a combination of life events, work pressure, and general OSS maintainer burnout has set in and we can't keep up. We need someone (or several someones) who can come on board and help OWN Autofac.** Someone who can review the PRs coming in, understands the challenges with breaking API changes, can help out with support, documentation... [all the things I mentioned in our original request for help.](/archive/2018/04/02/autofac-looking-for-extension-owners)

It's not just extension packages anymore. We need help on all of Autofac - extensions, core Autofac, the whole shmear.

**I can't promise a deep mentoring experience.** I apologize in advance for that. The current owners will still be involved and doing everything we can. We'll be collaborating with anyone new and working to get new team members on-boarded. However, this is likely not a good fit for someone new to C#, .NET, or dependency injection.

**Hello... Is it you we're looking for?** [Take a second to check out the original post outlining what it means to be an owner.](/archive/2018/04/02/autofac-looking-for-extension-owners) If you think that's you, [tweet us at `@AutofacIoC`](https://twitter.com/autofacioc) or [say hello in the Autofac Google Group](https://groups.google.com/forum/#!forum/autofac).
