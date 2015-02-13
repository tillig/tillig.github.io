---
layout: post
title: "Advanced Object Serialization in Web API"
date: 2015-02-13 -0800
comments: true
tags: [aspnet,rest,json]
---
Here's the situation:

You have a custom object type that you want to use in your Web API application. You want full support for it just like a .NET primitive:

- It should be usable as a route value like `api/operation/{customobject}`.
- You should be able to GET the object and it should serialize the same as it does in the route.
- You should be able to POST an object as the value for a property on another object and that should work.
- It should show up correctly in `ApiExplorer` generated documentation like [Swashbuckle/Swagger](http://www.nuget.org/packages/Swashbuckle.Core/).

**This isn't as easy as you might think.**

## The Demo Object

Here's a simple demo object that I'll use to walk you through the process. It has some custom serialization/deserialization logic.

``` csharp
public class MyCustomObject
{
  public int First { get; set; }

  public int Second { get; set; }

  public string Encode()
  {
    return String.Format(
        CultureInfo.InvariantCulture,
        "{0}|{1}",
        this.First,
        this.Second);
  }

  public static MyCustomObject Decode(string encoded)
  {
    var parts = encoded.Split('|');
    return new MyCustomObject
    {
      First = int.Parse(parts[0]),
      Second = int.Parse(parts[1])
    };
  }
}
```

We want the object to serialize as a pipe-delimited string rather than a full object representation:

```csharp
var obj = new MyCustomObject
{
  First = 12,
  Second = 345
}

// This will be "12|345"
var encoded = obj.Encode();

// This will decode back into the original object
var decoded = MyCustomObject.Decode(encoded);
```

Here we go.

## Outbound Route Value: IConvertible

Say you want to generate a link to a route that takes your custom object as a parameter. Your API controller might do something like this:

```csharp
// For a route like this:
// [Route("api/value/{value}", Name = "route-name")]
// you generate a link like this:
var url = this.Url.Link("route-name", new { value = myCustomObject });
```

By default, you'll get a link that looks like this, which isn't what you want:
`http://server/api/value/MyNamespace.MyCustomObject`

**We can fix that.** `UrlHelper` uses, in this order:
- `IConvertible.ToString()`
- `IFormattable.ToString()`
- `object.ToString()`

So, if you implement one of these things, you can control how the object appears in the URL. **I like `IConvertible`** because `IFormattable` runs into other things like `String.Format` calls, where you might not want the object serialized the same.

**Let's add `IConvertible` to the object.** You really only need to handle the `ToString` method; everything else, just bail with `InvalidCastException`. You also have to deal with the `GetTypeCode` implementation and a simple `ToType` implementation.

```csharp
using System;
using System.Globalization;

namespace SerializationDemo
{
  public class MyCustomObject : IConvertible
  {
    public int First { get; set; }

    public int Second { get; set; }

    public static MyCustomObject Decode(string encoded)
    {
      var parts = encoded.Split('|');
      return new MyCustomObject
      {
        First = int.Parse(parts[0]),
        Second = int.Parse(parts[1])
      };
    }

    public string Encode()
    {
      return String.Format(
        CultureInfo.InvariantCulture,
        "{0}|{1}",
        this.First,
        this.Second);
    }

    public TypeCode GetTypeCode()
    {
      return TypeCode.Object;
    }

    public override string ToString()
    {
      return this.ToString(CultureInfo.CurrentCulture);
    }

    public string ToString(IFormatProvider provider)
    {
      return String.Format(provider, "<{0}, {1}>", this.First, this.Second);
    }

    string IConvertible.ToString(IFormatProvider provider)
    {
      return this.Encode();
    }

    public object ToType(Type conversionType, IFormatProvider provider)
    {
      return Convert.ChangeType(this, conversionType, provider);
    }

    /* ToBoolean, ToByte, ToChar, ToDateTime,
       ToDecimal, ToDouble, ToInt16, ToInt32,
       ToInt64, ToSByte, ToSingle, ToUInt16,
       ToUInt32, ToUInt64
       all throw InvalidCastException */
  }
}
```

There are a couple of interesting things to note here:

- **I explicitly implemented `IConvertible.ToString`.** I did that so the value you'll get in a `String.Format` call or a standard `ToString` call will be _different_ than the encoded value. To get the encoded value, you have to explicitly cast the object to `IConvertible`. This allows you to differentiate where the encoded value shows up.
- **`ToType` pipes to `Convert.ChangeType`.** `Convert.ChangeType` uses `IConvertible` where possible, so you kinda get this for free. Another reason `IConvertible` is better here than `IFormattable`.

## Inbound Route Value, Action Parameter, and ApiExplorer: TypeConverter

When `ApiExplorer` is generating documentation, it needs to know whether the action parameter can be converted into a string (so it can go in the URL). It does this by getting the `TypeConverter` for the object and querying `CanConvertFrom(typeof(string))`. If the answer is `false`, `ApiExplorer` assumes the parameter has to be in the body of a request - which wrecks any generated documentation because _that thing should be in the route_.

**To satisfy `ApiExplorer`, you need to implement a `TypeConverter`.**

When your custom object is used as a route value coming in or otherwise as an action parameter, you also need to be able to model bind the encoded value to your custom object.

**There is a built-in `TypeConverterModelBinder` that uses `TypeConverter`** so implementing the `TypeConverter` will address model binding as well.

Here's a simple `TypeConverter` for the custom object:

```csharp
using System;
using System.ComponentModel;
using System.Globalization;

namespace SerializationDemo
{
  public class MyCustomObjectTypeConverter : TypeConverter
  {
    public override bool CanConvertFrom(
        ITypeDescriptorContext context,
        Type sourceType)
    {
      return sourceType == typeof(string) ||
             base.CanConvertFrom(context, sourceType);
    }

    public override bool CanConvertTo(
        ITypeDescriptorContext context,
        Type destinationType)
    {
      return destinationType == typeof(string) ||
             base.CanConvertTo(context, destinationType);
    }

    public override object ConvertFrom(
        ITypeDescriptorContext context,
        CultureInfo culture,
        object value)
    {
      var encoded = value as String;
      if (encoded != null)
      {
        return MyCustomObject.Decode(encoded);
      }

      return base.ConvertFrom(context, culture, value);
    }

    public override object ConvertTo(
        ITypeDescriptorContext context,
        CultureInfo culture,
        object value,
        Type destinationType)
    {
      var cast = value as MyCustomObject;
      if (destinationType == typeof(string) && cast != null)
      {
        return cast.Encode();
      }

      return base.ConvertTo(context, culture, value, destinationType);
    }
  }
}
```

And, of course, add the `[TypeConverter]` attribute to the custom object.

```csharp
[TypeConverter(typeof(MyCustomObjectTypeConverter))]
public class MyCustomObject : IConvertible
{
  //...
}
```

## Setting Swagger/Swashbuckle Doc
Despite all of this, generated Swagger/Swashbuckle documentation will still show an expanded representation of your object, which is inconsistent with how a user will actually work with it from a client perspective.

**At application startup need to register a type mapping with the Swashbuckle `SwaggerSpecConfig.Customize` method to map your custom type to a string.**

```csharp
SwaggerSpecConfig.Customize(c =>
{
  c.MapType<MyCustomObject>(() =>
      new DataType { Type = "string", Format = null });
});
```

## Even More Control: JsonConverter

`Newtonsoft.Json` should handle converting your type automatically based on the `IConvertible` and `TypeConverter` implementations.

However, if you're doing something _extra fancy_ like implementing a custom _generic_ object, you may need to implement a `JsonConverter` for your object.

[There is some great doc on the `Newtonsoft.Json` site so I won't go through that here.](http://www.newtonsoft.com/json)

## Using Your Custom Object

With the `IConvertible` and `TypeConverter` implementations, you should be able to work with your object like any other primitive and have it properly appear in route URLs, model bind, and so on.

```csharp
// You can define a controller action that automatically
// binds the string to the custom object. You can also
// generate URLs that will have the encoded value in them.
[Route("api/increment/{value}", Name = "increment-values")]
public MyCustomObject IncrementValues(MyCustomObject value)
{
  // Create a URL like this...
  var url = this.Url.Link("increment-values", new { value = value });

  // Or work with an automatic model-bound object coming in...
  return new MyCustomObject
  {
    First = value.First + 1,
    Second = value.Second + 1
  }
}
```

## Bonus: Using Thread Principal During Serialization

If, for whatever reason, your custom object needs the user's principal on the thread during serialization, you're in for a surprise: **While the authenticated principal is on the thread during your `ApiController` run, [`HttpServer` restores the original (unauthenticated) principal before response serialization happens](https://aspnetwebstack.codeplex.com/workitem/246).**

It's recommended you use `HttpRequestMessage.GetRequestContext().Principal` instead of `Thread.CurrentPrincipal` but that's kind of hard by the time you get to type conversion and so forth and there's no real way to pass that around.

**The way you can work around this is by implementing a custom `JsonMediaTypeFormatter`.**

The `JsonMediaTypeFormatter` has a method `GetPerRequestFormatterInstance` that is called when serialization occurs. It does get the current request message, so you can pull the principal out then and stick it on the thread long enough for serialization to happen.

Here's a simple implementation:

```csharp
public class PrincipalAwareJsonMediaTypeFormatter : JsonMediaTypeFormatter
{
  // This is the default constructor to use when registering the formatter.
  public PrincipalAwareJsonMediaTypeFormatter()
  {
  }

  // This is the constructor to use per-request.
  public PrincipalAwareJsonMediaTypeFormatter(
    JsonMediaTypeFormatter formatter,
    IPrincipal user)
    : base(formatter)
  {
    this.User = user;
  }

  // For per-request instances, this is the authenticated principal.
  public IPrincipal User { get; private set; }

  // Here's where you create the per-user/request formatter.
  public override MediaTypeFormatter GetPerRequestFormatterInstance(
    Type type,
    HttpRequestMessage request,
    MediaTypeHeaderValue mediaType)
  {
    var requestContext = request.GetRequestContext();
    var user = requestContext == null ? null : requestContext.Principal;
    return new PrincipalAwareJsonMediaTypeFormatter(this, user);
  }

  // When you deserialize an object, throw the principal
  // on the thread first and restore the original when done.
  public override object ReadFromStream(
    Type type,
    Stream readStream,
    Encoding effectiveEncoding,
    IFormatterLogger formatterLogger)
  {
    var originalPrincipal = Thread.CurrentPrincipal;
    try
    {
      if (this.User != null)
      {
        Thread.CurrentPrincipal = this.User;
      }

      return base.ReadFromStream(type, readStream, effectiveEncoding, formatterLogger);
    }
    finally
    {
      Thread.CurrentPrincipal = originalPrincipal;
    }
  }

  // When you serialize an object, throw the principal
  // on the thread first and restore the original when done.
  public override void WriteToStream(
    Type type,
    object value,
    Stream writeStream,
    Encoding effectiveEncoding)
  {
    var originalPrincipal = Thread.CurrentPrincipal;
    try
    {
      if (this.User != null)
      {
        Thread.CurrentPrincipal = this.User;
      }

      base.WriteToStream(type, value, writeStream, effectiveEncoding);
    }
    finally
    {
      Thread.CurrentPrincipal = originalPrincipal;
    }
  }
}
```

## Conclusion

I have to admit, I'm a little disappointed in the different ways the same things get handled here. Why do some things allow `IConvertible` but others require `TypeConverter`? It'd be nice if it was consistent.

In any case, once you know how it works, it's not too hard to implement. [Knowing is half the battle](https://www.youtube.com/watch?v=pele5vptVgc), right?

Hopefully this helps you in your custom object creation journey!