---
layout: post
title: "Adventures in Monolith Repositories"
date: 2017-05-22 -0800
comments: true
tags: [build,process]
description: "I've discovered so many cautionary tales about source code repository and build maintenance in recent work that I can't avoid sharing."
---

**Pre-emptive disclaimer**: This set of anecdotes doesn't refer to a _specific product_ or a _specific repository_. Some things come from past life experience, some come from open source projects, some come from other places I've encountered. As they say in the movies, "The story, all names, characters, and incidents portrayed in this production are fictitious. No identification with actual persons (living or deceased), places, buildings, and products is intended or should be inferred."

Some of what I do involves continuous integration and continuous delivery, build tooling, that sort of thing. A particular pain inflicted on me is when I run into a _monolith repository_ - a huge, multi-project, multi-solution repo with tons of different things that are all _intended to work together_ so they all live in one source code repository.

[Autofac](https://autofac.org) was in one of these monoliths until a few years ago in our [move to GitHub](https://github.com/autofac/Autofac). There were good reasons for it to be that way, but in the end we split it up due to some of the challenges.

**Here are a few of the challenges I've seen in working with monolith repos.**

## Slow Builds

Once a repository gets to a certain size the time it takes to build becomes unbearably long. I've seen estimates of about 10 - 15 minutes being a reasonable build time including tests. I think that's about right. Much longer and folks stop building everything.

Don't get me wrong, it's OK to let the build server do its job and offload the task of running huge builds to detect things that are broken. What's _not_ OK is when your developers _can't_ build the whole thing - either because the build run takes several hours or because various tooling changes and build optimizations (see below) have made it so only build agents have the right configuration to enable a build to get out the door.

## "Views" on the Source

If it takes too long to build, or the source is so big it's hard to work in, folks end up working in logical "views" over the source. For the most part this is a reasonable thing to consider, but this has an unforeseen effect on how you build, which leads to some of the challenges I'll explain below: incorrect build optimizations, inconsistent tools, non-modular modules, and so on.

This becomes more challenging when people want their own custom views. For example, a person who might be working on a specific application also wants to be able to refactor things in dependencies of that application. Creating that custom "view" can give the impression that it's OK to just change things within that view and that it won't have any impact on anything outside.

## Incorrect Build Optimizations

Once you have slow builds going on, folks are going to want to speed the build up, especially for their "view" (if you went that direction).

One way you might try optimizing is to run all the tests in a separate build - build one time to compile, provide feedback on whether it even compiled or not, and then run tests with additional feedback on pass/fail. The problem here is that it's pretty easy to get something compiling that totally won't work at runtime. How long do those tests take? Who caused them to fail? If you have too many compilation builds queuing up for tests to run, you'll end up batching them which means finger pointing. "I'm sure it wasn't me, so someone else can fix it."

Another way you might try optimizing is to use package management systems to handle dependencies. Each "view" can build independently and in any order, so you can have separate builds if you want, one for each "view" or logical component. That's actually a pretty decent idea as long as you do that consistently and with a lot of discipline... and as long as you acknowledge that building everything in the entire repository won't necessarily ensure that the latest versions of everything work together. With package management, the build output of this part of the build won't necessarily be the build input to some other part.

## Stale and Inconsistent Tools

Once the build gets too large or complicated, it can be an easy pattern to fall into to just tweak one or two code files, check them in, and let the build server do all the work to verify things.

However, if developers never actually run the build, the developers may start using newer tools than the build agent uses, causing the actual build tooling to become stale.

Alternatively, different developers or teams working in different areas of the monolith may want to update the tooling used to build their "view" of the monolith repo. As long as you don't want to build everything together, that's fine. Chances are, though, the decision of the team on their component now puts additional requirements on build agents and makes it so all devs can't build the whole set of components.

A great example of this is MSBuild and Visual Studio: Say you start your project when Visual Studio 2010 is out. As time goes on, developers update their machines to Visual Studio 2012, 2013, and beyond. Parts of the monolith that don't change much remain back on 2010 while people move on. Eventually no developer has VS 2010 installed and could never actually build the solution. In the meantime, the build agent requires _all of those Visual Studio versions_ be installed because there wasn't a concerted effort to unify on a version.

Another MSBuild / Visual Studio example: Again, say you start your project with Visual Studio 2010. New features and functions get added but in an effort to not change tooling for everyone, people start manually tweaking files used by the tooling - solution and project files. Now you have a situation where if you actually open the solution in VS 2010 you get an error saying there are project types in the solution that aren't supported... but if you open the solution in a newer version of Visual Studio you get a notice that the solution is on old tooling and must be upgraded to work.

## Bad Versioning Strategies

Generally a build of a codebase corresponds to a single version of something. In the case where the code has multiple logical _applications_ or _components_, the build might correspond to a single _release_ of those things.

In a more microservice scenario, you likely wouldn't have each microservice building and deploying as part of a monolith repository. Instead you might have a "build" that continuously runs integration tests over the deployed microservices to ensure they're still working together as expected.

Anyway, since the build number (or build version, or whatever) can really only track one version number at a time, you have three choices, none of which are awesome:

1. **Version everything together.** That means if you change one line in one component and the build kicks off, the version on every component in the entire repo changes. If you only ever deploy the entire monolith at the same time and it all builds together (e.g., not through a package management mechanism or using "views" on the repo), that can work.
2. **Implement an alternative independent versioning mechanism.** In this case you'd have to figure out a custom way to indicate the version of each component in the system that can "version independently." That version will not be tied to the build server version/number. You may build the same version of a component multiple times if the overall build gets kicked off and the component version hasn't been incremented. This gets more complex if you want to see in which build a particular component version originated.
3. **Never change the version.** This really only works if it's a small project and everything is entirely, like, "software as a service" or something where you always only ever have the latest version deployed and you never have to report on it.

We tried ideas one and two in Autofac before splitting the repos in GitHub. I've seen idea three in other projects.

## Circular Builds

If you build as a monolith, it's really easy to accidentally create a circular build dependency.

Say you have some custom build tasks or scripts that help you with your build, like custom MSBuild tasks. That's fine as long as the custom tasks are entirely independent of the code they're building. However, say you have a custom build task that has a dependency on one of the assemblies being built... and that assembly being built requires the use of the build tasks to succeed.

Bad times. You need to unravel that.

Package management decoupling can also make it a piece of cake in the monolith to create a circular build dependency. Component A takes package B as part of its dependencies. Component A builds, publishes package A. Now component B builds... and takes package A as a dependency. This can be a really hard thing to detect, especially if package A and package B don't themselves properly declare package dependencies.

## Non-Modular Modules

Once the build gets broken up into logical components, applications, microservices, or modules, it's far too easy to "just add a dependency" on some other piece of the source code repository and ignore the application and process isolation required to ensure that module _actually stays modular_. A lot of times you'll see inconsistent application of dependencies - some come from a package management system, some come from the local repository's build output from some other component.

## Ever-Changing Framework

If the shared libraries or shared dependencies you use are in the same repo as your consuming components, it takes a lot of discipline to not _start_ new functionality by instantly putting new items right in the common code. Your new application or component is going to need to validate phone numbers, why wouldn't you add a whole shareable framework component for phone number validation? Hey, just throw that in the lowest level dependency so it's readily available anywhere at any time!

Of course, that means from that point on anyone using your shared library will assume the new functionality is there and removing it will be a breaking change... so... uh... maybe that's not the best idea.

## It Failed, but Really Succeeded

The build server may say the build failed, but if you build "a view" of the monolith in isolation, that same piece may actually succeed. Which one is right? Is it a problem with the overall ordering of how the repository builds the logical components? Is the build server actually the system of record anymore?

## It Succeeded, but Really Failed

After a certain level of complexity gets introduced, it gets pretty easy to start ignoring warnings that get generated or inadvertently cause errors to get ignored.

For example, say your build uses MSBuild in some areas and PowerShell in others. MSBuild calls a PowerShell script which then ends up calling MSBuild. Errors reported in that innermost MSBuild execution may not actually cause the overall build to fail... which means the build will show as successful even though it's not.

## Illig's Law of Monolithic Repositories

**The amount of discipline _required_ to maintain a build is directly proportional to the size of the source code repository. The amount of discipline _actually used_ is inversely proportional.**

Most of the monolith repository problems you see could be avoided with enough developer due diligence and discipline. However, the larger a repository gets, the less personal responsibility folks start to feel for keeping the build performing and running clean. It's too easy to complain about the size and complexity, passing general housekeeping off as technical debt to be addressed later. Eventually people become complacent ("That's just how it is, we can't fix it.") and nothing ever does get fixed.

It's the opposite of "too big to fail": It's "too big to fix."
