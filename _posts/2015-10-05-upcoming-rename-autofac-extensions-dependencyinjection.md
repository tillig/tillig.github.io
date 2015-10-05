---
layout: post
title: "Upcoming Rename: Autofac.Framework.DependencyInjection to Autofac.Extensions.DependencyInjection"
date: 2015-10-05 -0800
comments: true
tags: [autofac,net]
---
[As part of DNX RC1, the `Microsoft.Framework.*` packages are getting renamed to `Microsoft.Extensions.*`.](https://github.com/aspnet/Announcements/issues/77)

The `Autofac.Framework.DependencyInjection` package was named to follow along with the pattern established by those libraries: `Microsoft.Framework.DependencyInjection` -> `Autofac.Framework.DependencyInjection`.

**With the RC1 rename of the Microsoft packages, we'll be updating the name of the Autofac package to maintain consistency: `Autofac.Extensions.DependencyInjection`. This will happen for Autofac as part of beta 8.**

We'll be doing the rename as part of the beta 8 drop since beta 8 [appears to have been pushed out by a week](https://twitter.com/DamianEdwards/status/650885772866772992) and we'd like to get a jump on things. For beta 8 we'll still refer to the old Microsoft dependency names to maintain compatibility but you'll have a new Autofac dependency. Then when RC1 hits, you won't have to change the Autofac dependency because it'll already be in line.

[You can track the rename on Autofac issue #685.](https://github.com/autofac/Autofac/issues/685)