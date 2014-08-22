---
layout: post
title: "Typemock Isolator Troubleshooting Guide"
date: 2011-08-22 -0800
comments: true
disqus_identifier: 1732
tags: [.NET]
---
[Typemock
Isolator](http://www.plimus.com/jsp/redirect.jsp?contractId=1655929&referrer=tillig)
is a cool and very powerful mocking framework. However, "[with great
power comes great
responsibility](http://en.wikipedia.org/wiki/Uncle_Ben#.22With_great_power_comes_great_responsibility.22),"
and it's easy to get into situations where there are errors appearing
that are hard to troubleshoot. For example, you may end up with a test
that passes if run by itself but when run as part of a fixture (or a
full set of test fixtures) it fails inexplicably. This guide can help
you look for "red flags" that, in my experience, can cause these
hard-to-figure-out issues.

**Almost every time you encounter one of these inexplicable errors it's
because someone corrupted the environment in a test.** This is akin to
having unit tests that run against a real database (these are really
"integration tests," not "unit tests") and one test runs, fails, and
doesn't put the data back in the original state, which then causes other
tests to fail. Since Isolator works on the Profiler API, a few more
things are "global" than you might realize. Normally this doesn't cause
problems, but most problems, in my experience, boil down to one of three
things:

-   **Too much is being mocked - things that don't actually need to be
    mocked.**
-   **Mocks are being set up and not properly cleaned up.**
-   **A static or application-wide variable is being set in a test or
    test fixture and isn't being put back to its original value.**

These tips generally have to do with finding and fixing these issues.

 

**ALWAYS CLEAN UP YOUR MOCKS**

**Prior to Typemock Isolator version 4.0**, mocks needed to be manually
cleaned up:

    MockManager.ClearAll();

Some fixtures would have that in each individual test; some kept it in a
central teardown method. **For older fixtures that have not been updated
for new syntax, make sure mocks get cleared after each test runs.**

**After Typemock Isolator version 4.0**, you could decorate tests or
test fixtures with attributes. For the older record/replay API, you
would use:

    [VerifyMocks]
    public class MyTestFixture

For the newer Arrange-Act-Assert (AAA) API, you would use:

    [Isolated]
    public class MyTestFixture

**Ensure any test/fixture using Typemock Isolator is cleaning things
up**. Failing to clean things up can sometimes cause
hard-to-troubleshoot issues.

 

**DON'T OVER-CLEAN YOUR MOCKS**

While it technically shouldn't matter if you clean up or verify mocks
multiple times during the run of a test, occasionally you run into
inexplicable trouble. I can't give you a reason why this sometimes
causes failure, just that it does, so if you see it, you'll want to fix
it.

For example, if you see something like this:

    [VerifyMocks]
    [ClearMocks]
    public class MyTestFixture
    {
      [TearDown]
      public void TearDown()
      {
        MockManager.ClearAll();
      }
    }

**...this is a problem.** In this example, mocks will actually be
cleaned up *three times* after each test:

1.  The TearDown method manually calls MockManager.ClearAll().
2.  The [VerifyMocks] attribute verifies the mock calls and clears the
    mocks after each test.
3.  The [ClearMocks] attribute clears the mocks after each test.

If you see redundant cleaning like this, it needs to be fixed.

**The best way to solve this problem** is to:

1.  Add the [VerifyMocks] attribute to the test fixture. Let it do the
    verify and clean steps for you.
2.  Remove all MockManager.ClearAll() calls from the entire fixture.
3.  Remove all MockManager.Verify() calls from the entire fixture.

Note this example is for the older record/replay mocking API. You can
get into less over-cleaning trouble by using the newer AAA API, where
there's only one [Isolated] attribute to put on your test fixture.

 

**DON'T OVER-MOCK**

It is especially tempting, especially in the old record/replay API, to
use something akin to the MockManager.MockAll() method to just mock
everything you think might be needed even if you're not sure. **Let's
call this "kitchen sink mocking"** because you're mocking everything
*including the kitchen sink*.

**Don't mock anything that you aren't going to actually use.**

The problem with over-mocking is twofold:

-   You lose the focus between what you're isolating and what you're
    testing. Many times use of "MockAll" results in you testing your
    mocks rather than the code you're isolating, particularly if you're
    not being careful.
-   "MockAll" has historically been a notorious problem for cleanup to
    deal with, especially if there are a lot of things getting mocked
    with "MockAll." (This was addressed in newer versions of Isolator.)

Look at your code and see if you're mocking "globally" - using
constructs like "MockAll" should be a red-flag. **This isn't to say you
shouldn't use them, just that you should triple-check to make sure you
absolutely have to.** And, if you do, triple-check the cleanup on that
fixture to make sure they don't leak into other fixtures.

**In the AAA syntax, you should look for calls to
Isolate.Swap.AllInstances()**... though historically the AAA syntax has
been less afflicted with the over-mocking problems that the
record/replay syntax has.

 

**DON'T MIX MOCKING STYLES**

**Prior to Typemock Isolator version 5.0, all mocking was done using a
record/replay** style of syntax. This used classes named things like
RecorderManager and MockManager. A sample record/replay mock looks like
this:

    using(RecordExpectations recorder = RecorderManager.StartRecording())
    {
      int dummy = someObject.PropertyToMock;
      recorder.Return(expectedValue);
    }
    Mock mock = MockManager.Mock(typeof(SomeOtherObject));
    mock.ExpectAndReturn("SomeMethod", returnValue);

When you clean up after record/replay mocks, you usually use the
[VerifyMocks] attribute on your test fixture. (See above for more info
on mock cleanup.)

**After 5.0, a new Arrange-Act-Assert (AAA) syntax was added**. Mocks in
AAA almost always start with Isolate, like:

    var mock = Isolate.Fake.Instance();
    Isolate.WhenCalled(() => mock.SomeMethod()).WillReturn(expectedValue);

When you clean up after AAA mocks, you usually use the [Isolated]
attribute on your test fixture. (See above for more info on mock
cleanup.)

**NEVER mix mock types in the same test. EVER.** This is a recipe for
disaster and is not supported by Typemock, even if it might "work" when
you run the test.

**To keep things easy, you probably should not mix mock types in the
same test fixture**, though it is technically possible and supported.

**If you see a fixture with BOTH [VerifyMocks] and [Isolated] attributes
at the top, it is wrong.** That's mixing mocks. You can't have both
attributes run on the same fixture. Again, you can *technically* have
them on *different tests*, just not at the *fixture level*.

**PROBLEM: Two different mock cleanup attributes on the same fixture**

> Here's an example showing the issue:
>
>     // BAD CODE: Two mock cleanup attributes.
>     [VerifyMocks]
>     [Isolated]
>     public class MyFixture
>     {
>       public void AaaMockTest()
>       {
>         // Test code that uses Isolate.* mocking.
>       }
>       public void RecordReplayMockTest()
>       {
>         // Test code that uses RecorderManager/MockManager mocking.
>       }
>     }
>
> **SOLUTION: Move the mock attributes to the test level.** If you HAVE
> to mix mock types in a fixture, you'll need to mark each test that
> uses the mocks with the appropriate cleanup attribute. Note if you
> move the attribute to the test level, you need to remove it from the
> top-level fixture.
>
>     // BETTER CODE: Different mock cleanup attributes on the associated tests.
>     public class MyFixture
>     {
>       [Isolated]
>       public void AaaMockTest()
>       {
>         // Test code that uses Isolate.* mocking.
>       }
>       [VerifyMocks]
>       public void RecordReplayMockTest()
>       {
>         // Test code that uses RecorderManager/MockManager mocking.
>       }
>     }

**PROBLEM: Two different mock types in the same test**

> Here's an example showing the issue:
>
>     // BAD CODE: Two mock types in the same test.
>     public class MyFixture
>     {
>       [VerifyMocks]
>       [Isolated]
>       public void MixedMockTest()
>       {
>         var mock1 = Isolate.Fake.Instance();
>         var mock2 = RecorderManager.CreateMockedObject();
>       }
>     }
>
> **SOLUTION: Refactor the test to use only one type of mocks.** You
> have no easy choice in this scenario. You have to rewrite the test so
> only one mock type is being used. All things being equal, try to use
> the new AAA syntax over the older record/replay syntax. That said, if
> the entire rest of the fixture is in the old syntax, don't introduce a
> new AAA syntax in just because. It's better to have all the tests in
> the fixture using the same syntax so you don't run into the
> multiple-attribute issue.

 

**BE CAREFUL OF STATICS AND ENVIRONMENT VARIABLES**

Not necessarily a Typemock-specific issue, but something that is
commonly seen and causes issues is when tests set static values or
environment variables during a test and don't reset them.

For example, an ASP.NET MVC test may make use of the
System.Web.Mvc.DependencyResolver. In those tests, there is a desire to
set the current IDependencyResolver to a test value. The problem is, it
is easy to overlook ''putting back the original value'' on both success
and failure conditions. Not putting back the default value can corrupt
later tests.

The same can be said for other environmental settings. Look for things
like...

-   Setting the current thread principal.
-   Setting the current thread culture.
-   Modifying environment variables.
-   Modifying registry keys.
-   Writing actual physical files.
-   Storing things in a static cache (like HttpRuntime.Cache).
-   Reading values that get cached in static variables (for example, in
    configuration-related classes where the config gets read,
    deserialized, and cached in a static).

 

**DON'T AUTO-DEPLOY IF TYPEMOCK IS ALREADY INSTALLED**

It is possible to auto-deploy and auto-register Typemock Isolator from a
build script. This is an OK practice on a build server that doesn't have
Typemock installed, but it causes issues on machines that may already
have it installed. Auto-deploy/auto-register running if Typemock is
already installed will corrupt the existing Typemock installation and
will generally create a corrupt new installation. The only way to repair
this is to run the Typemock installer and run a repair. (You may also
have to repair NCover or any other profiler/coverage tool you have
installed.)

One way to solve this is to add a condition to your auto-deploy task in
your build script. For example, in a developer environment there may be
a setting such that the build configuration is always "Debug" and on the
build server it's always "Release." You could set up an MSBuild task
like this to only auto-deploy/register Typemock when it's a Release
environment:

    <TypeMockRegister
        Company="YourCompany"
        License="1111-2222-3333-4444-5555"
        AutoDeploy="true"
        Condition="'$(BuildConfiguration)'!='Debug'"/>

 

**USE THE TYPEMOCK TRACER UTILITY**

When you install Typemock Isolator, it installs [a Tracer
utility](http://docs.typemock.com/Isolator/##typemock.chm/Documentation/Tracer.html)
that lets you watch as tests run to see what Isolator is setting up
behind the scenes and which expectations have been fulfilled. This is a
great tool to use when things are failing when they should pass, or
passing when they should fail. There is some [good online documentation
on how to use
it](http://docs.typemock.com/Isolator/##typemock.chm/Documentation/Tracer.html)
so I won't repeat all that here, but something not in the docs:

**You have to run the Tracer utility and the unit tests as Administrator
for it to work.**

This may change in a future release, but as of this writing, that's the
case. If you don't run Tracer and the unit tests both as Administrator,
the Tracer doesn't display anything and there's no explanation why.

