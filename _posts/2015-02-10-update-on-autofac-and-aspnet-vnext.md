---
layout: post
title: "Update on Autofac and ASP.NET vNext"
date: 2015-02-10 -0800
comments: true
tags: [autofac,aspnet]
---
We've been silent for a while, but we want you to know **we've been working diligently on trying to get a release of Autofac that works with ASP.NET 5.0/vNext.**

When it's released, **the ASP.NET vNext compatible version will be Autofac 4.0.**

Here's a status update on what's been going on:

- **Split repositories for Autofac packages.** We had been maintaining all of the Autofac packages - [Autofac.Configuration](http://www.nuget.org/packages/Autofac.Configuration), [Autofac.Wcf](http://www.nuget.org/packages/Autofac.Wcf), and so on - in a single repository. This made it easier to work with but also caused trouble with independent package versioning and codeline release tagging. We've split everything into separate repositories now to address these issues. [You can see the repositories by looking at the Autofac organization in GitHub.](https://github.com/autofac)
- **Switched to Gitflow.** Previously we were just working in master and it was pretty easy. Occasionally we'd branch for larger things, but not always. We've switched to using [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) so you'll see the 4.0 work going on in [a "develop" branch in the repo](https://github.com/autofac/Autofac/tree/develop).
- **Switched the build.** We're trying to get the build working using only the new stuff (`.kproj`/`project.json`). This is proving to be a bit challenging, which I'll discuss more below.
- **Switched the tests to xUnit.** In order to see if we broke something we need to run the tests, and the only runner in town for vNext is [xUnit](http://xunit.github.io/), so... we switched, at least for core Autofac.
- **Working on code conversion.** Most of the differences we've seen in the API has to do with the way you access things through reflection. Of course, IoC containers do a lot of that, so there's a lot of code to update and test. The new build system handles things like resources (`.resx`) slightly differently, too, so we're working on making sure everything comes across and tests out.
- **Moved continuous integration to AppVeyor.** You'll see build badges on all of the README files in the respective repos. [The MyGet CI NuGet feed](https://www.myget.org/F/autofac/) is still live and where we publish the CI builds, but the build proper is on [AppVeyor](http://www.appveyor.com/). I may have to write a separate blog entry on why we switched, but basically - we had more control at AppVeyor and things are easier to manage. (We are still working on getting a CI build for the vNext stuff going on there.)

Obviously at a minimum we'd like to get core Autofac out sooner rather than later. Ideally we could also get a few other items like Autofac.Configuration out, too, so folks can see things in a more "real world" scenario.

**Once we can get a reliable Autofac core ported over, we can get the ASP.NET integration piece done.** That work is going on simultaneously, but it's hard to get integration done when the core bits are still moving.

**There have, of course, been some challenges.** Microsoft's working hard on getting things going, but things still aren't quite baked. Most of it comes down to "stuff that will eventually be there but isn't quite done yet."

- **Portable Class Library support isn't there.** We switched Autofac to PCL to avoid having a ton of `#if ASPNETCORE50` sorts of code in the codebase. We had that early on with things like Silverlight and PCL made this really nice. Unfortunately, the old-style `.csproj` projects don't have PCL support for ASP.NET vNext yet ([though it's supposed to be coming](https://twitter.com/davkean/status/535654608031719424)) and we're not able to specify PCL target profiles in `project.json`. (While `net45` works, it doesn't seem that `.NETPortable,Version=v4.6,Profile=Profile259` does, or anything like it.) That means we're back to a couple of `#if` items and still trying to figure out how to get the other platforms supported.
- **Configuration isn't quite baked.** Given there's no `web.config` or `ConfigurationElement` support in ASP.NET, configuration is handled differently - through [Microsoft.Framework.ConfigurationModel](https://github.com/aspnet/Configuration). Unfortunately, they don't currently support the notion of arrays/collections, so for Autofac.Configuration if you wanted to register a list of modules... _you can't with this setup_. [There's an issue for it filed but it doesn't appear to have any progress.](https://github.com/aspnet/Configuration/issues/115) Sort of a showstopper and may mean we need to roll our own custom serialization for configuration.
- **The build structure has a steep learning curve.** [I blogged about this before so I won't recap it](/archive/2015/01/12/aspnet-vnext-build-braindump/), but suffice to say, there's not much doc and there's a lot to figure out in there.
- **No strong naming.** One of the things they changed about the new platform is [the removal of strong naming for assemblies](http://davidfowl.com/asp-net-vnext/). Personally, I'm fine with that - it's always been a headache - but there's a lot of code access security stuff in Autofac that we'd put into place to make sure it'd work in partial trust; we had `[InternalsVisibleTo]` attributes in places... and that all has to change. You can't have a strong-named assembly depend on a not-strong-named assembly, and as they move away from strong naming, it basically means everything has to either maintain two builds (strong named and not strong named) or we stop strong naming. I think we're leaning toward not strong naming - for the same reason we tried getting away from the `#if` statements. One codeline, one release, easy to manage.

None of this is insurmountable, but it is a lot like dominos - if we can get the foundation stuff up to date, things will just start falling into place. It's just slow to make progress when the stuff you're trying to build on isn't quite there.