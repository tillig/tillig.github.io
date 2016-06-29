---
layout: post
title: ".NET Core 1.0 is Released, but Where is Autofac?"
date: 2016-06-29 -0800
comments: true
tags: [aspnet,autofac]
description: "Why is it taking so long to get an official Autofac build out for .NET Core RTM? What's the status?"
---
As we all saw, [ASP.NET Core and .NET Core went RTM this past Monday](https://blogs.msdn.microsoft.com/dotnet/2016/06/27/announcing-net-core-1-0/). Congratulations to those teams - it's been a long time coming and it's some pretty amazing stuff.

Every time an RC (or, now, RTM) comes out, questions start flooding in [on Autofac](https://github.com/autofac/Autofac), sometimes literally within minutes of the go-live, asking when Autofac will be coming out with an update. While [we have an issue you can track](https://github.com/autofac/Autofac/issues/594) if you want to watch the progress, I figured I'd give a status update on where we are and where we're going with respect to RTM. I'll also explain why we are where we are.

#Current Status

**We have an RC build of core Autofac out on NuGet that is compatible with .NET Core RTM.** That includes a version of `Autofac.Extensions.DependencyInjection`, the Autofac implementation against `Microsoft.Extensions.DependencyInjection`. We'll be calling this version 4.0.0. We are working hard to get a "stable" version released, but we've hit a few snags at the last minute, which I'll go into shortly.

**About half of the non-portable projects have been updated to be compatible with Autofac 4.0.0.** For the most part this was just an update to the NuGet packages, but with Autofac 4.0.0 we also changed to stop using the old code access security model (remember `[AllowPartiallyTrustedCallers]` ?) and some of these projects needed to be updated accordingly.

**We are working hard to get the other half of the integration projects updated.** Portable projects are being converted to use the new `project.json` structure and target `netstandard` framework monikers. Non-portable projects are sticking with `.csproj` but are being verified for compatibility with Autofac 4.0.0, getting updated as needed.

#Why It's Taking So Long

Oh, where do I begin.

Let me preface this by saying it's going to sound like a rant. And in some ways it is. I do love what the .NET Core and ASP.NET Core teams have out there now, but it's been a bumpy ride to get here and many of the bumps are what caused the delay.

First, let's set the scene: **There are really only two of us actively working on Autofac** and the various officially supported integration libraries - it's me and [Alex Meyer-Gleaves](http://alexmg.com/). **There are 23 integration projects we support alongside core Autofac.** There's a repository of examples as well as [documentation](http://autofac.readthedocs.io/en/latest/). And, of course, there are questions that come in on StackOverflow, issues that come in that need responses, and requests on the discussion forum. We support this _on the side_ since we both have our own full-time jobs and families.

**I'm not complaining, truly.** I raise all that because it's not immediately evident. When you think about what makes Autofac tick (or AutoMapper, or Xunit, or any of your other favorite OSS projects that aren't specifically backed/owned by a company like Microsoft or a consultant making money from support), it's a very small number of people with quite a lot of work to get done in pretty much no time. Core Autofac is important, but it's the tip of a very large iceberg.

**We are sooooo lucky to have community help where we get it.** We have some amazing folks who chime in on Autofac questions on StackOverflow. We've gotten some pretty awesome pull requests to add some new features lately. Where we get help, it's super. But, admittedly, IoC containers and how they work internally are tricky beasts. There aren't a lot of simple `up-for-grabs` sort of fixes that we have in the core product. It definitely reduces the number of things that we can get help with from folks who want to drop in and get something done quickly. (The integration projects are much easier to help with than core Autofac.)

**Now, keep that in the back of your mind.** We'll tie into that shortly.

You know how the tooling for .NET Core changed like 1,000 times? You know how there was pretty much no documentation for most of that? And there were all sorts of weird things like the only examples available being from the .NET teams and they were using internal tools that folks didn't have great access to. **Every new beta or RC release was a nightmare.** Mention that and you get comments like, "That's life in the big city," which is surely one way to look at it but is definitely dismissive of the pain involved.

Every release, we'd need to reverse-engineer the way the .NET teams had changed their builds, figure out how the tools were working, figure out how to address the breaking changes, and so on. Sometimes (rarely, but it happened) someone would have their project ported over first and we could look at how they did it. We definitely weren't the only folks to feel that, I know.

NuGet lagging behind was painful because just updating core Autofac didn't necessarily mean we could update the integration libraries. Especially with the target framework moniker shake-up, you'd find that without the tooling in place to support the whole chain, you could fix upgrade one library but not be able to take the upgrade in a downstream dependency because the tooling would consider it incompatible.

Anyway, **with just the two of us (and the community as possible) and the tooling/library change challenges there was a lot of wheel-spinning.** There were _weeks_ where all we did was try to figure out the right magic combination of things in `project.json` to get things compiling. Did it work? I dunno, we can't test because we don't have a unit test framework compatible with this version of .NET Core. Can't take it in a downstream integration library to test things, either, due to tooling challenges.

Lots of time spent just keeping up.

**Finally, we've been bitten by the "conforming container" introduced for ASP.NET Core.** Microsoft.Extensions.DependencyInjection is an abstraction around DI that was introduced to support ASP.NET Core. It's a "conforming container" because it means anything that backs the `IServiceProvider` interface they use needs to support certain features and react in the same way. In some cases that's fine. For the most part, simple stuff like `GetService<T>()` is pretty easy to implement regardless of the backing container.

The stuff you can't do in a conforming container is use the container-specific features. For example, Autofac lets you pass parameters during a `Resolve<T>()` call. You can't do that without actually referencing the Autofac lifetime scope - the `IServiceProvider` interface serves as a "lowest common denominator" for containers.

All along the way, we've been testing the junk out of Autofac to make sure it works correctly with Microsoft.Extensions.DependencyInjection. It's been just fine so far. However, at the last minute ([20 days ago now](https://github.com/autofac/Autofac/issues/755#issuecomment-224830555)) we got word that not only did we need to implement the service provider interface as specified, but we _also_ need to return `IEnumerable<T>` collections _in the order that the components were registered_.

We don't currently do that. Given `IEnumerable<T>` has no specification around ordering and all previous framework features (controller action filters, etc.) requiring ordering used an `Order` property or something like that, it's never been an issue. Interfaces using `IEnumerable<T>` generally don't assume order (or, at least, _shouldn't_) This is a new requirement for the conforming container and it's amazingly non-trivial to implement.

It's hard to implement because Autofac tracks registrations in a more complex way than just adding them to a list. If you add a standard registration, it does get added to a list. But if you add `.PreserveExistingDefaults()` because you want to register something and keep the existing default service in place if one's already registered - that goes in _at the end of the list_ instead of at the head. We also support very dynamic "registration sources" - a way to add registrations to the container on the fly without making explicit registrations. That's how we handle things like `Lazy<T>` automatically working.

(That's sort of a nutshell version. It gets more complex as you think about child/nested lifetime scopes.)

**Point being, this isn't as simple as just returning the list of stuff that got registered.** We have to update Autofac to start _keeping track_ of registration order yet still allow the existing functionality to behave correctly. And what do you do with dynamic registration sources? Where do those show up in the list?

The answers are not so straightforward.

**We are currently working hard on solving that ordering problem.** Actually, right now, _Alex_ is working hard on that while I try and get the rest of the 23 integration projects converted, update the documentation, answer StackOverflow/issue/forum questions, and so on. Thank goodness for that guy because I couldn't do this by myself.

**If you would like to follow along on the path to a stable release, check out these issues:**

- [Fixing the IEnumerable<T> problem](https://github.com/autofac/Autofac/issues/755)
- [Overall tracking for .NET Core conversion](https://github.com/autofac/Autofac/issues/594)

While it may not be obvious, **adding lots of duplicate issues asking for status or "me too" comments on issues in the repo doesn't help**. In some cases it's frustrating (it's a "no pressure, but hurry up" vote) and may slow things down as we spend what little time we have responding to the dupes and the questions rather than actually getting things done. I love the enthusiasm and interest, but please help us out by not adding duplicates. GitHub recently added "reactions" to issues (that little smiley face at the top-right of an issue comment) - jump in with a thumbs-up or smile or something; or subscribe to an issue if you're interested in following along (there's a subscribe button along the right up near the top of the issue, under the tags).

#Thanks (So Far)

**Finally, I have some thanks to hand out.** Like I said, we couldn't get this done without support from the community. I know I'm probably leaving someone out, and if so, I'm sorry - please know I didn't intentionally do it.

- **The ASP.NET Core team** - These guys took the time to talk directly to Alex and I about how things were progressing and answered several questions.
- **Oren Novotny** - When the .NET target framework moniker problem was getting us down, he helped clear things up.
- **Cyril Durand and Viktor Nemes** - These guys are rockstars on StackOverflow when it comes to Autofac questions.
- **Caio Proiete, Taylor Southwick, Kieren Johnstone, Geert Van Laethem, Cosmin Lazar, Shea Strickland, Roger Kratz** - Pull requests of any size are awesome. These folks submitted to the core Autofac project within the last year. This is where I'm sure I missed someone because it was a manually pulled list and didn't include the integration libraries. If you helped us out, know I'm thanking you right now.