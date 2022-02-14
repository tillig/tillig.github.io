---
layout: post
title: "AutoMapper, Nullable DateTime, and Selecting the Right Constructor"
date: 2022-02-14 -0800
comments: true
tags: [csharp]
description: "I learned a pretty hard lesson while trying to map nullable DateTimeOffset to nullable DateTime and thought I'd share what I found."
---
I was doing some AutoMapper-ing the other day, converting my data object...

```c#
public class Source
{
  public Source();
  public string Description { get; set; }
  public DateTimeOffset? ExpireDateTime { get; set; }
  public string Value { get; set; }
}
```

...into an object needed for a system we're integrating with.

```c#
public class Destination
{
  public Destination();
  public Destination(string value, DateTime? expiration = null);
  public Destination(string value, string description, DateTime? expiration = null);
  public string Description { get; set; }
  public DateTime? Expiration { get; set; }
  public string Value { get; set; }
}
```

It appeared to me that the most difficult thing here was going to be mapping `ExpireDateTime` to `Expiration`. Unfortunately, this was more like [a three-hour tour](https://en.wikipedia.org/wiki/Gilligan%27s_Island).

I started out creating the mapping like this (in a mapping `Profile`):

```c#
// This is not the answer.
this.CreateMap<Source, Destination>()
    .ForMember(dest => dest.Expiration, opt.MapFrom(src => src.ExpireDateTime));
```

This didn't work because there's no mapping from `DateTimeOffset?` to `DateTime?`. I next made a mistake that I think I make every time I run into this and have to relearn it, which is that I created that mapping, too.

```c#
// Still not right.
this.CreateMap<Source, Destination>()
    .ForMember(dest => dest.Expiration, opt.MapFrom(src => src.ExpireDateTime));
this.CreateMap<DateTimeOffset?, DateTime?>()
    .ConvertUsing(input => input.HasValue ? input.Value.DateTime : null);
```

It took a few tests to realize that **AutoMapper handles nullable for you**, so I was able to simplify a bit.

```c#
// Getting closer - don't map nullable, map the base type.
this.CreateMap<Source, Destination>()
    .ForMember(dest => dest.Expiration, opt.MapFrom(src => src.ExpireDateTime));
this.CreateMap<DateTimeOffset, DateTime>()
    .ConvertUsing(input => input.DateTime);
```

However, it seemed that no matter what I did, the `Destination.Expiration` was _always null_. For the life of me, I couldn't figure it out.

Then I had one of those "eureka" moments when I was thinking about [how Autofac handles constructors](https://autofac.readthedocs.io/en/latest/register/registration.html#specifying-a-constructor): It chooses the constructor with the most parameters that it can fulfill from the set of registered services.

I looked again at that `Destination` object and realized there were _three constructors_, two of which default the `Expiration` value to null. [AutoMapper also handles constructors](https://docs.automapper.org/en/latest/Queryable-Extensions.html#custom-destination-type-constructors) in a way similar to Autofac. From the docs about `ConstructUsing`:

> AutoMapper will automatically match up destination constructor parameters to source members based on matching names, so only use this method if AutoMapper can’t match up the destination constructor properly, or if you need extra customization during construction.

**That's it! The answer is to pick the zero-parameter constructor** so the mapping isn't skipped.

```c#
// This is the answer!
this.CreateMap<Source, Destination>()
    .ForMember(dest => dest.Expiration, opt.MapFrom(src => src.ExpireDateTime))
    .ConstructUsing((input, context) => new Destination());
this.CreateMap<DateTimeOffset, DateTime>()
    .ConvertUsing(input => input.DateTime);
```

Hopefully that will save you some time if you run into it. Also, hopefully it will save _me_ some time next time I'm stumped because I can search and find my own blog... which happens more often than you might think.
