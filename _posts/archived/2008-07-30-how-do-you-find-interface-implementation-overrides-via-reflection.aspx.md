---
layout: post
title: "How Do You Find Interface Implementation Overrides Via Reflection?"
date: 2008-07-30 -0800
comments: true
disqus_identifier: 1425
tags: [gists,net]
---
I'm working on some custom
[FxCop](http://msdn.microsoft.com/en-us/library/bb429476.aspx) rules and
one that I want to do is to catch people who try to call Dispose() on
objects deriving from
[`System.ServiceModel.ClientBase<T>`](http://msdn.microsoft.com/en-us/library/ms576141.aspx)
because [they didn't implement IDisposable in a safe
manner](http://geekswithblogs.net/DavidBarrett/archive/2007/11/22/117058.aspx).

So you have `ClientBase<T>` which looks, in a very abbreviated fashion,
like this:

```csharp
public abstract class ClientBase<TChannel> : ICommunicationObject,
          IDisposable where TChannel : class
{
  // Other stuff... and then
  void System.IDisposable.Dispose()
  {
    this.Close();
  }
}
```

Later, I might have a class that derives from that. Maybe a special type
of client, and I might implement my own safe IDisposable version:

```csharp
public class CustomClient : ClientBase<IMyService>,
          IDisposable where TChannel : class
{
  // Other stuff... and then
  void System.IDisposable.Dispose()
  {
    try
    {
      this.Close();
    }
    catch
    {
      this.Abort();
    }
  }
}
```

Try not to get hung up on the hokey implementation there, just stick
with me - you have a sort of "overridden" Dispose() call. The thing is,
if I put my CustomClient in a using statement, it's the "overridden"
Dispose() that executes, not the one in `ClientBase<T>`.

I want my FxCop rule to catch people who put something deriving from
`ClientBase<T>` in a using block, but if you've got an override like in
the CustomClient class there, I want it to let it go.

How do you detect that?

I've been all over the System.Reflection namespace and I can't find
anything. If you do
[Type.GetInterfaces()](http://msdn.microsoft.com/en-us/library/system.type.getinterfaces.aspx)
or
[Type.GetInterface()](http://msdn.microsoft.com/en-us/library/system.type.getinterface.aspx)
it shows that you implemented IDisposable either way because it gets all
of the interfaces you implement all the way through the inheritance
chain.
[Type.GetInterfaceMap()](http://msdn.microsoft.com/en-us/library/system.type.getinterfacemap.aspx)
only returns the base implementation - the one from `ClientBase<T>` - in
all cases. It ignores the derived class's "override." The only thing I
can figure out that seems to work, but feels really bad, is this:

```csharp
public static bool OverridesDispose(Type runtimeType)
{
  // For brevity, we're assuming the incoming Type isn't null and
  // implements IDisposable. I've omitted those checks here.
  MethodInfo info = runtimeType.GetMethod(
    "Dispose",
    BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic,
    null,
    new Type[] { },
    null);
  if (info == null)
  {
    info = runtimeType.GetMethod(
      "System.IDisposable.Dispose",
      BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic,
      null,
      new Type[] { },
      null);
  }
  if (info == null)
  {
    return false;
  }

  Type declaringType = info.DeclaringType;
  if (
    declaringType.IsGenericType &&
    declaringType.GetGenericTypeDefinition() == typeof(ClientBase<>)
  )
  {
    return false;
  }
  return true;
}
```

See what I'm doing? I basically query for an implicit interface
implementation, then if that's not found, I get the explicit interface
implementation. If neither are found, I figure there's no override. If
one is found, then I ask what the declaring type of the method is, and
if it's the `ClientBase<T>` type, it's not overridden, otherwise it is.

But the code smell! Ugh!

Am I missing some easier way to do it?

