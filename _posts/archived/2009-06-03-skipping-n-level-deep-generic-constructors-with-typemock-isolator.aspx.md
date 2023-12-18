---
layout: post
title: "Skipping N-Level Deep Generic Constructors with Typemock Isolator"
date: 2009-06-03 -0800
comments: true
disqus_identifier: 1535
tags: [net]
---
[Typemock Isolator 5.3.1 was released
today](http://blog.typemock.com/2009/06/typemock-isolator-531-is-out.html),
and with it the ability to mock base class constructors using a syntax
like this:

    Isolate.Fake.Instance<Derived>(Members.CallOriginal, ConstructorWillBe.Called, BaseConstructorWillBe.Ignored);

That's pretty cool. But something I uncovered in working through a
complex test scenario (and getting a little help from good old Typemock
Support) is that you can mock a constructor N-levels deep using a
slightly different syntax. The caveat is that it only works on types
that have generic type parameters.

Let's say you have a three-level-deep class hierarchy like this:

    public class Level1<T>
    {
      public Level1()
      {
        throw new NotSupportedException();
      }
    }

    public class Level2<T> : Level1<T>
    {
      public bool Level2WasCalled { get; set; }
      public Level2()
      {
        this.Level2WasCalled = true;
      }
    }

    public class Level3<T> : Level2<T>
    {
      public bool Level3WasCalled { get; set; }
      public Level3()
      {
        this.Level3WasCalled = true;
      }
    }

You want to instantiate a Level3\<T\> object, and you want to run the
Level2\<T\> constructor, but the Level1\<T\> constructor throws an
exception so you want to stop running the real constructors there. It's
a little more complex setup, but you can do this:

    [Test]
    [Isolated]
    public void SkipLevel1Constructor()
    {
      var fakeBase = Isolate.Fake.Instance<Level1<string>>();
      Isolate.Swap.AllInstances<Level1<string>>().With(fakeBase);
      var fake = Isolate.Fake.Instance<Level3<string>>(Members.CallOriginal);
      Assert.IsTrue(fake.Level2WasCalled);
      Assert.IsTrue(fake.Level3WasCalled);
    }

This test will pass. Now, granted, if you're doing something more fancy,
the Isolate.Swap.AllInstances call may have some unintended side effects
since it'll also intercept new instances of Level2\<T\> and so forth,
but if you're doing something reasonably simple where the
Isolate.Swap.AllInstances is OK, here's one way to skip an n-level deep
constructor.

**UPDATE**: It appears you can **use Isolate.Swap.NextInstance *instead
of* Isolate.Swap.AllInstances**, and that's actually recommended so you
have fewer potential side effects. No need to mock all instances if you
don't have to.

All of this, of course, gets the "Works On My Box" seal of approval, and
the standard "if it totally hoses you or doesn't work for you,
sooooooorrrryyyyy" style disclaimer. Also, while I found this during
sorting an issue out with Typemock Support, I can't say they "officially
support" doing what I'm telling you about here. It just happens to work.
Whether it's functioning as designed or whether we're inadvertently
exploiting something in the product that will be patched up later is yet
to be seen.
