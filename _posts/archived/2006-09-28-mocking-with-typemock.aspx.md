---
layout: post
title: "Mocking with TypeMock"
date: 2006-09-28 -0800
comments: true
disqus_identifier: 1080
tags: [dotnet,testing]
---
[![TypeMock]({{ site.url }}/images/20060928typemocklogo.png)](http://www.typemock.com)I've
been a slow convert to the whole test-driven development movement. I'm
ashamed, but it's true. I've believed in TDD in principle, but when it
came down to it, designing specifically for testability always made my
code feel so bloated. I always ended up writing unit tests after the
fact, and many times would end up writing loads of helper objects and
dummy interface implementations to get things to work.

 No longer.

 We started looking at mock object frameworks for the latest project at
work. After checking out Rhino Mocks (admittedly a decent framework), we
stumbled upon [TypeMock](http://www.typemock.com/).

 Holy crap, this thing is *hot*. In technical terms, you might call it
*the bomb-diggity*.

 There are several things that make TypeMock the framework to go with.
The syntax of the "Natural Mocks" is nice and clean, making the majority
of the mocking easy to use. It'll mock static methods, constructors (and
static constructors), and non-public methods - stuff Rhino [currently]
won't let you do.

 "But," you might say, "mocking frameworks are hard to work with because
you can't really see what's going on 'behind the scenes.'"

 No longer! TypeMock has a trace utility where you can watch in
real-time as the mock framework sets up and fulfills expectations. If
you want to know what it's doing, check the window. Want to know
specifically what expectations are set up and which ones were left? It's
right there. No more fighting with stack traces and expectation
exceptions. It really doesn't get any easier than this.

 A co-worker showed me some code he had written using Rhino. Frankly, I
found it confusing and it wasn't his code making it that way. I tried
writing my own tests in it and had a heck of a time figuring it out. I
picked up TypeMock this morning and minutes later was *flying* through
it.

 Ever tried to test an abstract class? You know how you have to create a
dummy class that implements all the abstract stuff just so you can test
the functionality? Not anymore - you can get a mock of the abstract
class with no "placeholder" or "dummy" classes. Ever tried to test a
factory that returns values based on configuration files in the
filesystem? You know how you end up having to dump fake config to just
the right spots in the filesystem in order to test that factory? And you
know how much more trouble it is to test classes that make use of that
factory? Forget that. No more having to fight with all that. *It's a
piece of freakin' cake.*

 Let's use that factory example. Say I have a factory called
`CoolFactory` that has a method `CoolFactory.GetCoolObject()`. That
method looks up a value in configuration and returns an object of type
`CoolObject`. Now say you have a class called `WorkingClass` (pun?) that
uses the `CoolFactory` to do some work in the `WorkingClass.DoWork()`
method.

 You used to have two options: either over-architect `CoolFactory` and
have a load of various pluggable providers that the factory could use
and clutter the API with so you can sub in configuration at test time;
or set up configuration, dummy objects, etc., all to support a single
test.

 With TypeMock, you can mock that static `CoolFactory.GetCoolObject()`
method and skip all that. Here's what an NUnit test might look like:

    [Test]
    public void MyTest(){
      // Set up the object you want the factory to return here
      CoolObject factoryGenerated = new CoolObject();

      // Record the actions you want to play back
      // and tell the factory to return your object.
      using (RecordExpectations recorder = new RecordExpectations()){
        CoolFactory.GetCoolObject();
        recorder.Return(factoryGenerated);
      }

      // Call the method that uses the factory
      WorkingClass testObj = new WorkingClass();
      testObj.DoWork();

      // Make your test assertions here...

      // Verify the DoWork method called the factory
      MockManager.Verify();
    }

 That's it - when the `DoWork` method calls the factory, it'll return
the object you set up. No need to dump config to the filesystem,
over-architect the factory, or dummy up a lot of extra "helper"
classes.

 I haven't been this stoked about a technology for quite some time.

 Now, I'm using [the Enterprise
edition](http://www.typemock.com/Features.htm) (they offer a "community
edition" that doesn't have the "Natural Mocks" in it - don't bother with
that, you want the Natural Mocks). I'm not sure if I'd have been so
excited if I was stuck at the "community edition" level. But I'm not, so
I'll play ignorant and revel in what I've got.

 No more designing for testability! No more huge efforts to create dummy
objects to get various components working and tested!

 You know what? With a framework like TypeMock, I can 100% buy into
test-driven development. I can keep API as a deliverable and still get
full test coverage - I get my cake and I eat it, too.

 Check out [TypeMock](http://www.typemock.com). You'll be glad you did.
