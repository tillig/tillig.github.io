---
layout: post
title: "Challenges of Multi-Tenant, Enterprise ASP.NET Applications"
date: 2009-04-21 -0800
comments: true
disqus_identifier: 1516
tags: [aspnet,dotnet]
---
I've been doing ASP.NET for a while, mostly at my current employer where
we make large-scale online banking web sites. During that, what I've
noticed more and more as new features come out for ASP.NET is that
there's a heavy focus on rapid application development - drag, drop, and
ship - and less around the idea of creating a commercial application
using ASP.NET. There are a few products like [Community
Server](http://communityserver.com/) and
[DotNetNuke](http://www.dotnetnuke.com) out there, but not many (or not
as many as there could be) and I'd wager a lot of it has to do with lack
of framework support for that sort of app.

To put what I'm talking about in context, let me first describe at a
high level the kind of application I'm working on. Customers might want
to have us host the application for them or they might want to host it
themselves, so it needs to be something fairly easy to deploy. In a
hosted environment, the customers want to be able to change their
settings easily, so there's a sort of "configuration user interface"
that has to be put in place. Changes might include not only application
settings, but text that appears on the various pages, so localization
comes into play. It needs to be easily upgraded, deployed, and managed,
so you don't want a full copy of the application out there for every
customer; you want a single copy with different IIS apps pointing at
it... but that means the application has to support multi-tenancy (you
can't just stick all your config in web.config because there's only one,
right?). In a custom deployment, the application will be taken by a
team, put into the customer's environment, and programmatically
customized, which means it needs to have a lot of extensibility points.

So, with that context, here are the big challenges.

## Multi-Tenancy

Everything in the .NET framework assumes there's only one tenant running
on the application. When you ask for a configuration value, the value
comes from The One Configuration Source and that's that. There's no
qualifier in there anywhere to say "I want this configuration value for
this specific tenant." You have to write that. If you want a default
value for all tenants on the app and the ability for individual tenants
to override the value, you have to write that. Same thing with
localization - you can't say "I want this string for this tenant."
There's one big bucket of resources and that's it.

The lack of multi-tenancy support is pervasive and means a lot of work
for the development group that wants to have a multi-tenant app. That's
unfortunate, particularly in light of the "Software as a Service" push
that was going on just a couple of years back. What ever came of that?

## Localization

Where do resources get stored? In compiled assemblies, right? What if I
need some text on a page changed at runtime but for security reasons I
don't want to be recompiling assemblies and deploying them on the fly?
(Multi-tenancy really hurts here since you can't have a different set of
resource assemblies per tenant.) There's no out-of-the-box alternative
to storing localized resources. You want to store things in SQL Server?
You get to write that. Want the out-of-the-box stuff (like the ASP.NET
localization expressions) to work with it? You get to write the
factories and providers for that, too.

## Theming

The whole ASP.NET theming thing is broken. Not "broken" in that it
doesn't work, but "broken" in that there are actually two different ways
to theme things - skins and master pages. And they sort of work
together, but when you define a single "style" for your pages, you have
to manually track that "Style X means Skin Y and Master Page Z." That's
crap.

Don't forget each tenant wants their own theme, too.

## Configuration

There are a lot of things that you might want to configure in an app.
Unfortunately, the place that stuff gets stored by default is in an
application configuration file. In the filesystem. You want to give
someone an interface to configure things, you either have to create a
configuration service that stores things in a database and make your
interface (and your app) talk to that proprietary service OR you have to
allow your interface to somehow update web.config on the fly. In some
cases, you can't escape web.config - for example, if someone
enables/disables a feature that means you need to register/unregister an
HttpModule, you can't do that because you can only register modules
through web.config.

Oh, and throw in that multi-tenancy thing, too.

## Extensibility

ASP.NET apps basically aren't extendable at the page level. You can't
"derive and override" markup. If you want to interject your own logic,
you have roughly three choices:

1. Put code blocks inside the markup.
2. Override the page class and change the markup to inherit from your
    custom page.
3. Try to anticipate what people might want to extend and allow plugins
    through inversion of control, Microsoft Extensibility Framework, or
    some similar approach.

None of those are terribly great. Options one and two have you changing
the ASPX markup, which makes it impossible to track what has been
customized on that application instance (and is difficult to manage on a
per-tenant basis) and option three quickly leads to YAGNI as you try to
make everything infinitely extensible.

This actually has a direct impact on...

## Deployment and Upgradeability

So, you put together your web app installer, run the MSI, and it puts a
bunch of markup and config in the filesystem and some assemblies in the
"bin" folder. Six months later, an implementation team has customized
this thing using the "extensibility points" you've provided above, and
they need to upgrade the base application.

Which markup files did they change? What config settings did they change
in web.config? It becomes a tedious task of manually merging markup and
config. (This is something that users of Subtext and other blogging
engines are familiar with, too.)

Could you track checksums on the markup files and compare whether
they've changed or not? You could... but you'd have to track every
checksum for every file for every version ever released because someone
might skip upgrading from 1.1 to 1.2 and go directly from 1.1 to 1.3.

Could you compile the pages? Sure, but that not only affects your
extensibility (see above) but still requires those markup placeholder
pages.

Pages aren't the only things out there in the filesystem, though. Don't
forget your skins, master pages, and other markup files. In some cases,
you can't even move the locations.

Things in the filesystem that aren't binary end up being problematic
from a deployment and upgrade standpoint. You can address some of this
with [a custom VirtualPathProvider that serves things from embedded
resources](/archive/2007/07/13/embeddedresourcepathprovider-binary-only-asp.net-2.0.aspx),
but there are still some things you can't hide behind a VPP -
web.config, for example, and skins.

**Why Isn't This Stuff Addressed?**

There are a lot of challenges with making large scale, multi-tenant
applications. The above items aren't an exhaustive list, but they're
some of the more obvious issues. Why hasn't this been addressed in the
framework? Is the majority case really the IT guy dragging a couple of
grids and a DataSource onto a page and publishing the app right from
Visual Studio? Or is it a case of self-fulfilling prophecy, where the
features aren't there so people don't make these apps... and because
people aren't making these apps, the features aren't considered
important so they aren't there?
