---
layout: post
title: "Potential Typemock Gotcha: Allow Static Construction to Happen Before Mocking Static Methods"
date: 2012-02-10 -0800
comments: true
disqus_identifier: 1768
tags: [net,GeekSpeak]
---
I love [Typemock
Isolator](http://www.plimus.com/jsp/redirect.jsp?contractId=1655929&referrer=tillig).
I do. The power it gives me to deal with legacy code interaction testing
is phenomenal.

However, every once in a while, I'll get an odd failure that doesn't
make sense. Today's error message looks like this:

    SetUp method failed. SetUp : TypeMock.ArrangeActAssert.NestedCallException : 
    *** WhenCalled does not support using a property call as an argument.
    -   To fix this pass null instead of LoggerWrapperImpl.Logger

    ***
    * Example - this would work:
    -   MyObj argument = Something.Other().GetStuff();
    -   Isolate.WhenCalled(() => ObjUnderTest.MethodUnderTest(argument))...;
    ***
    * Example - this would not work:
    -   Isolate.WhenCalled(() => ObjUnderTest.MethodUnderTest(Something.Other().GetStuff()))...;
    at cv.a()
    at hg.a()
    at dj.a(Boolean A_0)
    at do.b(Boolean A_0)
    at iz.b(Boolean A_0)
    at iz.a(Object A_0, Boolean A_1, Func`1 A_2, Action A_3, Action A_4, Action A_5)
    at iz.b(Object A_0)
    ...

We weren't doing anything odd in the test that failed, and we have other
tests that do very similar stuff. What gives?

Doing a little poking around in the TeamCity build logs, I found that
the failing test...

-   Was the first one to run in the given test assembly, and
-   The test fixture setup had a call to mock a static method on a
    static class.

Which means **static construction wasn't happening on the static class**
and was causing some weird problems.

**I fixed the issue by adding a real call to a static method on the
class** – just enough to get static construction to run first. Then
everything worked perfectly.

Why did it pass on my dev box and not on the build box? **Tests were
getting run in a different order.** Static construction was happening on
the class in a different test.

Like I said, I love
[Typemock](http://www.plimus.com/jsp/redirect.jsp?contractId=1655929&referrer=tillig),
but sometimes... sometimes there are some gotchas.

