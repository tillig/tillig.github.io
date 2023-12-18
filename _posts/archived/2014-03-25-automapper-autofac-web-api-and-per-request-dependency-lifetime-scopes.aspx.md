---
layout: post
title: "AutoMapper, Autofac, Web API, and Per-Request Dependency Lifetime Scopes"
date: 2014-03-25 -0800
comments: true
disqus_identifier: 1837
tags: [dotnet,aspnet,autofac]
---
I'm working on a new [Web API project](http://www.asp.net/web-api) where
I want to use [AutoMapper](http://automapper.org/) for some type
conversion. As part of that, I have a custom AutoMapper type converter
that takes in some constructor parameters so the converter can read
configuration values. I'm using [Autofac](http://autofac.org/) for
dependency injection (naturally).

Historically, I've been able to hook AutoMapper into dependency
injection [using the `ConstructServicesUsing`
method](https://github.com/AutoMapper/AutoMapper/wiki/Containers) and
some sort of global dependency resolver, like:

```csharp
Mapper.Initialize(cfg =>
{
  cfg.ConstructServicesUsing(t => DependencyResolver.Current.GetService(t));
  cfg.CreateMap();
});
```

That works great in MVC or in other applications where there's a global
static like that. In those cases, the "request lifetime scope" either
doesn't exist or it's managed by the implementation of
`IDependencyResolver` the way it is in the Autofac integration for MVC.

**Retrieving the per-request lifetime scope is much more challenging in
Web API because the request lifetime scope is managed by the inbound
`HttpRequestMessage`.** Each inbound message gets a lifetime scope
associated, so there's no "global static" from which you can get the
request lifetime. You can get the global dependency resolver, but
resolving from that won't be per-request; it'll be at the application
level.

**It's also a challenging situation because AutoMapper really leans you
toward using the static `Mapper` object** to do your mapping and you
can't really change the value of `ConstructServicesUsing` on the static
because, well, you know, threading.

So... what to do?

**The big step is to change your mindset around the static `Mapper`
object.** Instead of using `Mapper` to map things, take an
`IMappingEngine` as a dependency in your class doing mapping. Yes,
that's one more dependency you'd normally not have to take, but there's
not really a better way given the way the `IMappingEngine` has to
resolve dependencies is actually different per-request.

This frees us up to now think about how to register and resolve a
per-request version of `IMappingEngine`.

**Before I show you how to do this, standard disclaimers apply**: Works
on my machine; I've not performance tested it; It might not work for
you; etc.

Oooookay.

**First, we need to understand how the `IMappingEngine` we build will
come together.**

1. The implementation of `AutoMapper.IMappingEngine` we'll be using is
    `AutoMapper.MappingEngine` (the only implementation available).
2. `MappingEngine` takes in an `IConfigurationProvider` as a
    constructor parameter.
3. `IConfigurationProvider` has a property `ServiceCtor` that is the
    factory we need to manipulate to resolve things out of a per-request
    lifetime scope.
4. The main `AutoMapper.Mapper` has a `Configuration` property of type
    `IConfiguration`... but the backing store for it is really an
    `AutoMapper.ConfigurationStore`, which is also an
    `IConfigurationProvider`. (This is where the somewhat delicate
    internal part of things comes in. If something breaks in the future,
    chances are this will be it.)

Since we need an `IConfigurationProvider`, let's make one.

We want to leverage the main configuration/initialization that the
static `Mapper` class provides because there's a little internal work
there that we don't want to copy/paste. The only thing we really want to
change is that `ServiceCtor` property, but that's not a settable
property, so **let's write a quick wrapper around an
`IConfigurationProvider` that lets us override it with our own method.**

```csharp
public class ConfigurationProviderProxy : IConfigurationProvider
{
  private IComponentContext _context;
  private IConfigurationProvider _provider;

  // Take in a configuration provider we're going to wrap
  // and an Autofac context from which we can resolve things.
  public ConfigurationProviderProxy(IConfigurationProvider provider, IComponentContext context)
  {
    this._provider = provider;
    this._context = context;
  }

  // This is the important bit - we use the passed-in
  // Autofac context to resolve dependencies.
  public Func<Type, object> ServiceCtor
  {
    get
    {
      return this._context.Resolve;
    }
  }

  //
  // EVERYTHING ELSE IN THE CLASS IS JUST WRAPPER/PROXY
  // CODE TO PASS THROUGH TO THE BASE PROVIDER.
  //
  public bool MapNullSourceCollectionsAsNull { get { return this._provider.MapNullSourceCollectionsAsNull; } }

  public bool MapNullSourceValuesAsNull { get { return this._provider.MapNullSourceValuesAsNull; } }

  public event EventHandler<TypeMapCreatedEventArgs> TypeMapCreated
  {
    add { this._provider.TypeMapCreated += value; }
    remove { this._provider.TypeMapCreated -= value; }
  }

  public void AssertConfigurationIsValid()
  {
    this._provider.AssertConfigurationIsValid();
  }

  public void AssertConfigurationIsValid(TypeMap typeMap)
  {
    this._provider.AssertConfigurationIsValid(typeMap);
  }

  public void AssertConfigurationIsValid(string profileName)
  {
    this._provider.AssertConfigurationIsValid(profileName);
  }

  public TypeMap CreateTypeMap(Type sourceType, Type destinationType)
  {
    return this._provider.CreateTypeMap(sourceType, destinationType);
  }

  public TypeMap FindTypeMapFor(ResolutionResult resolutionResult, Type destinationType)
  {
    return this._provider.FindTypeMapFor(resolutionResult, destinationType);
  }

  public TypeMap FindTypeMapFor(Type sourceType, Type destinationType)
  {
    return this._provider.FindTypeMapFor(sourceType, destinationType);
  }

  public TypeMap FindTypeMapFor(object source, object destination, Type sourceType, Type destinationType)
  {
    return this._provider.FindTypeMapFor(source, destination, sourceType, destinationType);
  }

  public TypeMap[] GetAllTypeMaps()
  {
    return this._provider.GetAllTypeMaps();
  }

  public IObjectMapper[] GetMappers()
  {
    return this._provider.GetMappers();
  }

  public IFormatterConfiguration GetProfileConfiguration(string profileName)
  {
    return this._provider.GetProfileConfiguration(profileName);
  }
}
```

That was long, but there's not much logic to it. You could probably do
some magic to make this smaller with Castle.DynamicProxy but I'm keeping
it simple here.

**Now we need to register `IMappingEngine` with Autofac** so that it:

- Creates a per-request engine that
- Uses a per-request lifetime scope to resolve dependencies and
- Leverages the root AutoMapper configuration for everything else.

That's actually pretty easy:

```csharp
// Register your mappings here, but don't set any
// ConstructServicesUsing settings.
Mapper.Initialize(cfg =>
{
  cfg.AddProfile<SomeProfile>();
  cfg.AddProfile<OtherProfile>();
});

// Start your Autofac container.
var builder = new ContainerBuilder();

// Register your custom type converters and other dependencies.
builder.RegisterType<DemoConverter>().InstancePerApiRequest();
builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

// Register the mapping engine to use the base configuration but
// a per-request lifetime scope for dependencies.
builder.Register(c =>
{
  var context = c.Resolve<IComponentContext>();
  var config = new ConfigurationProviderProxy(Mapper.Configuration as IConfigurationProvider, context);
  return new MappingEngine(config);
}).As<IMappingEngine>()
.InstancePerApiRequest();

// Build the container.
var container = builder.Build();
```

**Now all you have to do is take an `IMappingEngine` as a
dependency**and use that rather than `AutoMapper.Mapper` for mapping.

```csharp
public class MyController : ApiController
{
  private IMappingEngine _mapper;

  public MyController(IMappingEngine mapper)
  {
    this._mapper = mapper;
  }

  [Route("api/myaction")]
  public SomeValue GetSomeValue()
  {
    // Do some work and use the IMappingEngine for maps.
    return this._mapper.Map<SomeValue>(otherValue);
  }
}
```

**Following that pattern, any mapping dependencies will be resolved out
of the per-request lifetime scope rather than the application root
container** and you won't have to use any static references or fight
with request contexts. When the API controller is resolved (out of the
request scope) the dependent `IMappingEngine` will be as well, as will
all of the chained-in dependencies for mapping.

While I've not tested it, **this technique should also work in an MVC
app** to allow you to get away from the static
`DependencyResolver.Current` reference. `InstancePerApiRequest` and
`InstancePerHttpRequest` do effectively the same thing internally in
Autofac, so the registrations are cross-compatible.
