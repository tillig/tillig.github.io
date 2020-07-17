---
layout: post
title: "Choosing an Exception Type When Unit Testing Error Handling"
date: 2012-01-27 -0800
comments: true
disqus_identifier: 1763
tags: [net,gists,testing]
---
When I'm testing exception handling code, I have tests for exceptions I
know I need to handle and tests for exceptions I'm not expecting.

For example, say I have a component that calls a WCF service. If there's
a communication issue, I want to mask that and return some
stub/placeholder data. If there's some other issue, I want to just let
the exception bubble up and be handled by a global error handler.
Something like this:

```csharp
public DataObject GetData(SomeParameter p)
{
  if(p == null)
  {
    throw new ArgumentNullException("p");
  }
  DataObject data = null;
  try
  {
    data = this.SomeService.GetRealData(p);
  }
  catch(CommunicationException)
  {
    data = new StubData();
  }
  return data;
}
```

Not a complex scenario. I'll probably end up with a test component where
I can set an exception to be thrown, or use [Typemock
Isolator](http://www.plimus.com/jsp/redirect.jsp?contractId=1655929&referrer=tillig)
to mock a response in the test, like:

```csharp
Isolate
  .WhenCalled(() => component.SomeService.GetRealData(null))
  .WillThrow(new CommunicationException());
```

Then you could do your test, like:

```csharp
[Test]
public void HandlesCommmunicationException()
{
  var component = CreateTheComponent();
  Isolate
    .WhenCalled(() => component.SomeService.GetRealData(null))
    .WillThrow(new CommunicationException());
  var p = new SomeParameter();
  var data = component.GetData(p);
  Assert.IsInstanceOf<StubData>(data);
}
```

That works well for testing the known exception type. What about the
unknown type? You'll have a test like this:

```csharp
[Test]
public void OtherExceptionsBubbleUp()
{
  var component = CreateTheComponent();
  Isolate
    .WhenCalled(() => component.SomeService.GetRealData(null))
    .WillThrow(new SOME_EXCEPTION_TYPE_HERE());
  var p = new SomeParameter();
  Assert.Throws<SOME_EXCEPTION_TYPE_HERE>(() =>component.GetData(p));
}
```

**Pick an exception type that you'd never expect to get during normal
execution.**

Which is to say, if I wanted to see what happens when my component
throws something other than a `CommunicationException`, I'm not going to
pick something I might see for real.

**I WOULD NOT pick...**

-   `ArgumentNullException `
-   `ArgumentException `
-   `NotSupportedException `
-   `InvalidOperationException `

...or any other sort of "commonly used" exceptions that you might see
arise from argument validation or something else.

**Why not?**

Let's use `ArgumentNullException `as an example. Say you add some more
validation to the `GetData `method so that it inspects values in the
`SomeParameter p` coming in. If there's a specific null value found, you
throw an `ArgumentNullException`. You add tests for that and life is
swell.

Except... you didn't remember to modify the test for your exceptions
bubbling up. And, hey, look, it still passes! **But it passes for the
wrong reason.** It's never actually getting to the service call where
you think you're testing.

**Instead, I WOULD pick...**

-   `DivideByZeroException`
-   `InvalidTimeZoneException`

...or some other exception that you'd never expect to see in the context
of what you're doing. Obviously **you'll have to adjust based on what
you're doing** – if you're doing division in your method, you may
actually get a `DivideByZeroException`, so you wouldn't use that.

**By choosing the right exception, regardless of the refactoring of the
class, your test will still pass... *and it will pass for the reason you
think*.**

