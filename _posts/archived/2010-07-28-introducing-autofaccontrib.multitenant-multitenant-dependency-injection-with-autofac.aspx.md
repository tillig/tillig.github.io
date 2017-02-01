---
layout: post
title: "Introducing AutofacContrib.Multitenant - Multitenant Dependency Injection with Autofac"
date: 2010-07-28 -0800
comments: true
disqus_identifier: 1655
tags: [autofac,net]
---
It's taken some time and a couple of
[long](http://groups.google.com/group/autofac/browse_thread/thread/c21616ef0a029ddb)
Google Groups
[threads](http://groups.google.com/group/autofac/browse_thread/thread/65430a14f895096c),
but with a kick in the right direction from [Nick
Blumhardt](http://nblumhardt.com/), I've got multitenant dependency
injection working with [Autofac](http://autofac.googlecode.com) and
available as a contributed library.

The basic usage pattern is:

-   **Determine a strategy by which tenants are identified.** That is,
    which tenant is making a given request? This might come from an
    environment variable, a request parameter, a role on the user's
    principal, or wherever.
-   **Build up your application container with the default dependency
    set.** For tenants that don't override anything, they'll use these
    defaults.
-   **Create a multitenant-aware container based on the application
    defaults.** This is where the magic of AutofacContrib.Multitenant
    comes into play.
-   **Configure tenant-specific overrides with the multitenant-aware
    container.** Tenants can override things, add new dependencies, or
    whatever they need to do.
-   **Resolve everything out of the multitenant-aware container.** All
    of the resolutions will automatically use your tenant identification
    strategy so you'll always get a tenant-specific result.

In practice, it looks like something this:

    // First, create your application-level defaults using a standard // ContainerBuilder, just as you are used to. var builder = new ContainerBuilder(); builder.RegisterType<Consumer>().As<IDependencyConsumer>().InstancePerDependency(); builder.RegisterType<BaseDependency>().As<IDependency>().SingleInstance(); var appContainer = builder.Build();  // Once you've built the application-level default container, you // need to create a tenant identification strategy. var tenantIdentifier = new MyTenantIdentificationStrategy();  // Now create the multitenant container using the application // container and the tenant identification strategy. var mtc = new MultitenantContainer(tenantIdentifier, appContainer);  // Configure the overrides for each tenant by passing in the tenant ID // and a lambda that takes a ContainerBuilder. mtc.ConfigureTenant('1', b => b.RegisterType<Tenant1Dependency>().As<IDependency>().InstancePerDependency()); mtc.ConfigureTenant('2', b => b.RegisterType<Tenant2Dependency>().As<IDependency>().SingleInstance());  // Now you can use the multitenant container to resolve instances. // Resolutions will be tenant-specific. var dependency = mtc.Resolve<IDependency>();

The usage is very similar to the existing Autofac usage you know and
love.

The multitenancy support works for standard non-web/service apps (e.g.,
console apps or Windows services), ASP.NET web forms and MVC apps, and
WCF service apps.

[**There's a ton of documentation about how to use the multitenancy that
includes sample code
snippets.**](http://code.google.com/p/autofac/wiki/MultitenantIntegration)**There
are also some**[**sample console, WCF, and ASP.NET MVC applications in
the source
tree**](http://code.google.com/p/autofac/source/browse/#svn/trunk/contrib/Example)**so
you can see it in action.**

It's not currently out there as a binary, so you'll have to do [a source
checkout](http://code.google.com/p/autofac/source/checkout) and compile
it manually, but I'm sure it'll show up soon. It was released as part of
AutofacContrib 2.5.1 and [is available for
download.](http://code.google.com/p/autofac/downloads/list)

**We're looking for early adopters to give us feedback on it.** If you
try it out, [please let us know what you think in the Autofac Google
Group](http://groups.google.com/group/autofac). What did you like? What
were the pain points? Did you find a scenario that didn't work? How was
the documentation? The more feedback we get, the better we can make it!
Thanks!

