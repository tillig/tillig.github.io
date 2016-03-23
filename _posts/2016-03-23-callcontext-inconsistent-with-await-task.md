---
layout: post
title: "CallContext Behaves Inconsistently When Used With Awaited Tasks"
date: 2016-03-23 -0800
comments: true
tags: [net]
description: "Getting and setting CallContext data doesn't behave in a consistent manner when used with async/await and Task methods. This article shows an example of the gotcha."
---
I've been working a bit with Serilog and ASP.NET Core lately. In both cases, there are constructs that use CallContext to store data across an asynchronous flow. For Serilog, it's the [`LogContext` class](https://github.com/serilog/serilog/blob/5699bde2ec27587e0e6cce6bda9bc3827cb926bc/src%2FSerilog%2FContext%2FLogContext.cs#L209-L232); for ASP.NET Core it's the [`HttpContextAccessor`](https://github.com/aspnet/HttpAbstractions/blob/9f499d7962a6488115cacfd06d93dde09614a05d/src/Microsoft.AspNetCore.Http/HttpContextAccessor.cs#L19-L30).

Running tests, I've noticed some inconsistent behavior depending on how I set up the test fakes. For example, when testing some middleware that modifies the Serilog `LogContext`, I might set it up like this:

```csharp
var mw = new SomeMiddleware(ctx => Task.FromResult(0));
```

Note the next `RequestDelegate` I set up is just a `Task.FromResult` call because I don't really care what's going on in there - the point is to see if the `LogContext` is changed after the middleware executes.

Unfortunately, what I've found is that the static `Task` methods, like `Task.FromResult` and `Task.Delay`, don't behave consistently with respect to using `CallContext` to store data across async calls.

To illustrate the point, I've put together a small set of unit tests here:

```csharp
public class CallContextTest
{
  [Fact]
  public void SimpleCallWithoutAsync()
  {
    var value = new object();
    SetCallContextData(value);
    Assert.Same(value, GetCallContextData());
  }

  [Fact]
  public async void AsyncMethodCallsTaskMethod()
  {
    var value = new object();
    await NoOpTaskMethod(value);
    Assert.Same(value, GetCallContextData());
  }

  [Fact]
  public async void AsyncMethodCallsAsyncFromResultMethod()
  {
    var value = new object();
    await NoOpAsyncMethodFromResult(value);

    // THIS FAILS - the call context data
    // will come back as null.
    Assert.Same(value, GetCallContextData());
  }

  private static object GetCallContextData()
  {
    return CallContext.LogicalGetData("testdata");
  }

  private static void SetCallContextData(object value)
  {
    CallContext.LogicalSetData("testdata", value);
  }

  /*
   * Note the difference between these two methods:
   * One _awaits_ the Task.FromResult, one returns it directly.
   * This could also be Task.Delay.
   */

  private async Task NoOpAsyncMethodFromResult(object value)
  {
    // Using this one will cause the CallContext
    // data to be lost.
    SetCallContextData(value);
    await Task.FromResult(0);
  }

  private Task NoOpTaskMethod(object value)
  {
    SetCallContextData(value);
    return Task.FromResult(0);
  }
}
```

As you can see, changing from `return Task.FromResult(0)` in a non `async`/`await` method to `await Task.FromResult(0)` in `async`/`await` suddenly breaks things. No amount of configuration I could find fixes it.

StackOverflow [has related questions](http://stackoverflow.com/questions/31408515/callcontext-logicalgetdata-gets-restored-even-where-there-is-no-asynchrony-why) and there are [forum posts](https://social.msdn.microsoft.com/Forums/en-US/ea21ca57-5340-439c-8ee9-f0185b5787a1/callcontext-what-are-the-recommendations-for-using-this-going-forwards?forum=async) on similar topics, but this is the first time this has really bitten me.

I gather this is why [`AsyncLocal<T>`](https://msdn.microsoft.com/en-us/library/dn906268(v=vs.110).aspx) exists, which means maybe I should look into that a bit deeper.