---
layout: post
title: "Autofac Conditional Registration Support"
date: 2017-03-01 -0800
comments: true
tags: [autofac,dotnet]
description: "Autofac 4.4.0 has added the ability to execute registrations conditionally based on other registrations already made."
image: https://camo.githubusercontent.com/a734afb6cde01fc96f42f6041ce6227bd1613cc9/68747470733a2f2f6175746f6661632e6f72672f696d672f6361726f7573656c2d6c6f676f2e706e67
---

[Alex](https://alexmg.com/) and I have been working on deprecating the ability to update an Autofac container after it's already been built. There are lots of reasons for this, and if you're curious about that or have feedback on it, [we have a discussion issue set up](https://github.com/autofac/Autofac/issues/811). You can also see ways to work around the need to update the container [in that issue, so check it out](https://github.com/autofac/Autofac/issues/811).

However, one of the main reasons we've heard about why people want to update the container is to handle _conditional registrations_. For example, "I only want `ComponentB` registered in the container if `ComponentA` is not registered."

**To that end, in version 4.4.0 we've added `OnlyIf()` and `IfNotRegistered()` extensions to support conditional registration.**

`OnlyIf()` lets you provide a lambda that acts on an `IComponentRegistry`. You can check if something is or isn't registered and have some other registration execute _only if_ the predicate returns `true`.

`IfNotRegistered()` is a convenience method built on `OnlyIf()` that allows you to execute a registration _if some other service is not registered_.

[The documentation has been updated to explain how it works including examples](http://autofac.readthedocs.io/en/latest/register/registration.html#conditional-registration) but here's a taste:

```csharp
var builder = new ContainerBuilder();

// Only ServiceA will be registered.
// Note the IfNotRegistered takes the SERVICE TYPE to
// check for (the As<T>), NOT the COMPONENT TYPE
// (the RegisterType<T>).
builder.RegisterType<ServiceA>()
       .As<IService>();
builder.RegisterType<ServiceB>()
       .As<IService>()
       .IfNotRegistered(typeof(IService));

// HandlerA WILL be registered - it's running
// BEFORE HandlerB has a chance to be registered
// so the IfNotRegistered check won't find it.
//
// HandlerC will NOT be registered because it
// runs AFTER HandlerB. Note it can check for
// the type "HandlerB" because HandlerB registered
// AsSelf() not just As<IHandler>(). Again,
// IfNotRegistered can only check for "As"
// types.
builder.RegisterType<HandlerA>()
       .AsSelf()
       .As<IHandler>()
       .IfNotRegistered(typeof(HandlerB));
builder.RegisterType<HandlerB>()
       .AsSelf()
       .As<IHandler>();
builder.RegisterType<HandlerC>()
       .AsSelf()
       .As<IHandler>()
       .IfNotRegistered(typeof(HandlerB));

// Manager will be registered because both an IService
// and HandlerB are registered. The OnlyIf predicate
// can allow a lot more flexibility.
builder.RegisterType<Manager>()
       .As<IManager>()
       .OnlyIf(reg =>
         reg.IsRegistered(new TypedService(typeof(IService))) &&
         reg.IsRegistered(new TypedService(typeof(HandlerB))));

// This is when the conditionals actually run. Again,
// they run in the order the registrations were added
// to the ContainerBuilder.
var container = builder.Build();
```

If that's something you're into, head over to NuGet, [grab v4.4.0 of Autofac](https://www.nuget.org/packages/Autofac/4.4.0), and try it out. Find something not working? [Let us know!](https://github.com/autofac/Autofac/issues)
