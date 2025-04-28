---
layout: post
title: "Minor Differences in JSON Serializers in .NET/C#"
date: 2025-04-28 -0800
comments: true
tags: [csharp,dotnet]
description: "There are a couple of JSON serializer differences between Newtonsoft and System.Text.Json that I always forget."
---
The move from Newtonsoft to System.Text.Json for JSON serialization in .NET is not a new thing, but there are two subtle differences that I always forget or get wrong so I figured I'd write them down so I can Google my own answer later.

This is based on **.NET 8 and 9**. If you come in looking at this later, they may have updated.

## Dictionaries

There are Roslyn analyzers that want you to set dictionary-based properties to be `get`-only.

```csharp
public class Model
{
  public IDictionary<string, string> WhatAnalyzersWant { get; } = new Dictionary<string, string>()
}
```

- Newtonsoft **supports this** and will add the items to the existing dictionary.
- System.Text.Json **does not support this** and the dictionary will remain empty after serialization.

For greatest compatibility between the two frameworks, leave dictionary properties get/set and suppress the analyzer message.

## Enums

I work on a lot of services where we specify camelCase style naming, including on the `enum` members.

To set System.Text.Json up for camelCase enums, it looks like this:

```csharp
var settings = new JsonSerializerOptions
{
  Converters =
  {
    new JsonStringEnumConverter(JsonNamingPolicy.CamelCase, true),
  },
};
```

For Newtonsoft, it looks like this:

```csharp
var settings = new JsonSerializerSettings
{
  Converters =
  {
    new StringEnumConverter(new CamelCaseNamingStrategy()),
  },
};
```

In addition, Newtonsoft supports using `System.Runtime.Serialization.EnumMemberAttribute` to specify an exact value, which will _override_ the camelCase naming. System.Text.Json does _not_ support this attribute.

```csharp
public enum Policy
{
  // Only Newtonsoft uses this attribute.
  [EnumMember(Value = "ALWAYS")]
  AlwaysHappens,

  NeverHappens
}
```

In the above example...

- Newtonsoft will render `ALWAYS` and `neverHappens`.
- System.Text.Json will render `alwaysHappens` and `neverHappens`.

Further, both frameworks allow you to mark an `enum` with a specific converter, which can also dictate the casing/strategy.

For greatest compatibility between the two frameworks, use the appropriate serializer settings to handle casing on your `enum` and don't mark things up with any attributes related to serialization.
