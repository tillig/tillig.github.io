---
layout: post
title: "Quick Start for Mocking with Typemock Isolator"
date: 2008-04-16 -0800
comments: true
disqus_identifier: 1375
tags: [.NET]
---
Introduction
============

This quick start gets you up to speed on the basic functionality of
[Typemock Isolator](http://www.typemock.com). As you go through it,
note:

-   While some basic unit testing will be reviewed, this is not a quick
    start for NUnit or unit testing in general, so proper test design
    and specifics on NUnit usage will not be addressed.
-   The quick start shows usage of the Enterprise features of [Typemock
    Isolator](http://www.typemock.com). While all of this is possible in
    the community edition, the alternate mechanisms for accomplishing
    things won't be discussed.

At the very end are some take-away points and additional resources. Work
through the quick start, do the exercises, and at the end check out the
take-away points so you'll have something to move forward with.

You can get the source for the finished solution here (minus the answers
to the exercises - that's for the reader), but it's recommended you
create your solution and walk through the work and not just get the
finished deal: [[Download Source -
TypeMockQuickStart.zip](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!45420&authkey=!AMWhc3sQy_xwI8o&ithint=file%2czip)]

Required Tools
==============

You'll need to have the following to work through the quick start:

-   [Visual Studio
    2008](http://msdn2.microsoft.com/en-us/vstudio/default.aspx)
-   [NUnit](http://www.nunit.org)
-   [Typemock Isolator](http://www.typemock.com)
-   [TestDriven.NET](http://www.testdriven.net)

[Visual Studio
2008](http://msdn2.microsoft.com/en-us/vstudio/default.aspx), [Typemock
Isolator](http://www.typemock.com), and
[TestDriven.NET](http://www.testdriven.net) get installed on your local
developer machine. [NUnit](http://www.nunit.org) should be in an
accessible location but doesn't necessarily have to be installed. Get
the latest available versions.

Create Test Solution
====================

You'll need a place where you can run through these exercises, so...

1.  In Visual Studio, select "File -\> New Project..."
2.  In the "New Project" dialog...
    1.  In the tree view on the left, under "Visual C\#" select
        "Windows."
    2.  In the "Templates" section on the right, select "Class Library."
    3.  Give your libary a name like "TypeMockQuickStart."

3.  In the Solution Explorer, in your new class library...
    1.  Delete "Class1.cs" - we'll add more appropriately named classes
        later.
    2.  Add references to NUnit and Typemock Isolator.
        1.  Right-click the "References" folder and select "Add
            Reference..."
        2.  In the .NET tab, select "Typemock Isolator for .NET 2.0" and
            click OK.
        3.  Right-click the "References" folder and select "Add
            Reference..."
        4.  Reference NUnit. If you've installed NUnit, select the NUnit
            Framework assembly from the .NET tab; if you're accessing
            NUnit from a known location, go to the Browse tab and find
            "nunit.framework.dll" and add a reference to that.

Patterns
========

This section discusses basic patterns you'll need to understand while
working with unit testing and mocking.

Unit Tests: Setup, Execute, Assert
----------------------------------

The basic pattern for a unit test is "Setup, Execute, Assert":

-   **Setup**: Set up the test environment and the code that you're
    testing. This usually involves initializing some variables,
    instantiating your class, or setting up some configuration files
    that the code being tested needs.
-   **Execute**: Execute the code being tested.
-   **Assert**: Check to make sure that what you just executed had the
    desired behavior.

To examine this pattern, set up a simple class that can be tested and
perform some unit tests on it.

1.  Add a class called `Calculator`. Make it public.
2.  In the `Calculator` class, add a method with this signature that
    adds two doubles (a + b): `public double Add(double a, double b)`
3.  Fill in the body for the `Calculator.Add` method.
4.  In the `Calculator` class, add a method with this signature that
    divides two doubles (a / b):
    `public double Divide(double a, double b)`
5.  Fill in the body for the `Calculator.Divide` method. If "b" is zero,
    throw a `DivideByZeroException`.

Now you have a simple class to test, let's add a test fixture for it.

1.  Add a class called `CalculatorFixture`. Make it public.
2.  Add an NUnit `[TestFixture]` attribute to `CalculatorFixture`. This
    is how you tell NUnit and TestDriven.NET that this class contains
    unit tests.

You now have a class to test and a fixture to contain your tests. Add a
test for the `Calculator.Add` method.

1.  In your test fixture class, add a `public void` method that takes no
    parameters called "AddTwoPositiveNumbers":
    `public void AddTwoPositiveNumbers()`
2.  Add an NUnit `[Test]` attribute to the `AddTwoPositiveNumbers`
    method. This is how you tell NUnit and TestDriven.NET that this is a
    test to run.
3.  Follow the "Setup, Execute, Assert" pattern to create your test.
    1.  Setup: Create an instance of the Calculator class.
    2.  Execute: Call the Add method on the instance with two positive
        numbers of your choosing.
    3.  Assert: Verify that it returned the expected result.

Your test fixture will look something like this:

    [TestFixture]
    public class CalculatorFixture
    {
      [Test]
      public void AddTwoPositiveNumbers()
      {
        // Setup
        Calculator calc = new Calculator();

        // Execute
        double result = calc.Add(3, 7);

        // Assert
        Assert.AreEqual(10, result);
      }
    }

### Exercise

Add more tests.

-   Test the `Add` method:
    -   Test adding of two negative numbers.
    -   Test adding a number to zero.

-   Test the `Divide` method:
    -   Test dividing one positive number by another.
    -   Test dividing by zero (don't catch the exception - use the NUnit
        `[ExpectedException]` attribute on your test method).

Notice how the pattern is basically the same? You do some
initialization, run some code, and assert that the result is what you
expected. You see a slight deviation from that pattern when testing for
expected exceptions, but it's still basically doing an assertion, just
expressed differently.

Mocking: Record, Playback, Verify
---------------------------------

The basic pattern for mocking an object is "Record, Playback, Verify":

-   **Record**: Tell the mocking framework what you're about to do on
    the mock object.
-   **Playback**: As you're executing the test, the mocking framework
    "repeats" what you recorded.
-   **Verify**: Check to make sure that all the mocks you set up were
    called correctly.

This parallels the unit test "Setup, Execute, Assert" pattern. Part of
your setup is to record your mocks; part of execution is playing back
your mocks; part of assertion is verifying your mocks.

Add a new method to the `Calcuator` class that has additional
complexity. We'll use mocking to test this method:

    public double AddThenMultiply(double a, double b, double c)
    {
      double addResult = this.Add(a, b);
      double multiplyResult = addResult * c;
      return multiplyResult;
    }

Notice in this method that we're calling the `Add` method (which we've
already tested) and performing some additional custom logic that we need
to test. This sort of thing is perfect for mocking. We don't want to
re-test the `Add` method; we want to isolate the logic in the new method
and just test that. Let's add a new fixture with tests that use Typemock
Isolator to isolate the new logic.

1.  Add a class called `CalculatorMockingFixture`. Make it public.
2.  Add an NUnit `[TestFixture]` attribute to
    `CalculatorMockingFixture`.
3.  Add a Typemock Isolator `[VerifyMocks]` attribute to
    `CalculatorMockingFixture`. This tells Typemock Isolator to
    automatically do the mock verification part of the test for you when
    the test is complete. It saves you from having to manually verify in
    every test.

The empty fixture should look like this:

    [TestFixture]
    [VerifyMocks]
    public class CalculatorMockingFixture
    {
    }

Now we're ready to add a test. In the `CalculatorMockingFixture` add a
test method called `MultiplyPositiveAddResult`. Here is the method body:

    [Test]
    public void MultiplyPositiveAddResult()
    {
      Calculator calc = new Calculator();
      using (RecordExpectations recorder = RecorderManager.StartRecording())
      {
        double dummy = calc.Add(0, 0);
        recorder.Return((double)15);
      }
      double result = calc.AddThenMultiply(5, 10, 20);
      Assert.AreEqual(300, result);
    }

There's a lot happening here, so let's look over it:

1.  The `Calculator` object we're going to test gets instantiated.
2.  A `using` block is created where a new `RecordExpectations` object
    is created. This is a very common block you will see in Typemock
    Isolator usage that says, "Everything in this block is fake! Record
    it and get ready to play it back." Inside that block...
    1.  We're calling the `Add` method on the `Calculator`. Notice that
        we're passing 0 for both parameters. The reason for this is that
        the `Add` method really isn't getting called, so it doesn't
        matter what we pass. The important part of this is that we're
        telling the recorder, "I'm going to call the `Add` method." We
        don't even really care what we name the variable where we store
        the result because we'll never use it - hence, we'll just call
        it "dummy."
    2.  We tell the recorder the value we want `Add` to return - in this
        case, we want it to return 15. We don't care what gets passed
        in, the first time `Add` gets called, we want 15 to come back.

3.  The `using` block closes, meaning we're done recording for now. Time
    for playback.
4.  We call the `AddThenMultiply` method and get the result.
5.  We assert that we got the correct result.

What did mocking get us? Try this: change this line:

`double result = calc.AddThenMultiply(5, 10, 20);`

To this:

`double result = calc.AddThenMultiply(500, 1000, 20);`

Now run the test again. Notice how it still passes? Why is that? That's
mocking in action. If you follow the call stack, you know that the first
thing the `AddThenMultiply` method does is call the `Add` method.
Typemock Isolator sees that call to `Add` and doesn't actually let `Add`
execute - instead, it returns the value we told it to return. In this
case, we'll get 15 back.

### Exercise

Do some experimentation...

-   What happens if you call `Add` a second time in your test? Try
    adding a call to `calc.Add` after the `AddThenMultiply` call.
-   Why does that happen?
-   Can you set it up so the recorder returns 15 for the first call to
    `Add` but 25 for the second call?

Practical Application
=====================

Once you've gotten your first mock down and get the patterns, the next
question is, "How can I actually use this in my job? I'm not writing
`Calculator` classes all day." The benefit of mocking is to isolate the
code that you're testing - that includes isolating it from the behavior
of the .NET framework and other third-party dependencies. In this
section you'll walk through an example of isolating your code from .NET
proper and look at some additional mocking verification that can be done
to ensure your code is calling the framework correctly.

Add a Class That Uses Configuration
-----------------------------------

To experiment with isolation from .NET, we'll add a new class. This
class will make use of the .NET configuration system to read a value
from configuration and perform an action based on that.

1.  Add a reference to the `System.Configuration` assembly.
2.  Add a class called `ConfigReader`. Make it public.
3.  Add a `public` method called `AppendValueToSetting` that takes in a
    `string` and returns a `string`:
    `public string AppendValueToSetting(string valueToAppend)`
4.  Fill in the `AppendValueToSetting` method:
    1.  Read the `AppSettings` key "configReader" and store the result.
    2.  Append the contents of the `valueToAppend` parameter to the end
        of the value from configuration.
    3.  Return the concatenation results.

It should look like this:

    public class ConfigReader
    {
      public string AppendValueToSetting(string valueToAppend)
      {
        string setting = ConfigurationManager.AppSettings["configReader"];
        string result = setting + valueToAppend;
        return result;
      }
    }

Test Cases
----------

Consider what you need to test about this method:

-   What happens if the setting isn't found?
-   What happens if the setting is empty?
-   What happesn if the setting is found?

Now consider: It reads from the `App.config` file - how do you change
that between tests? Is that even a good idea?

Again - mocking to the rescue.

Isolate Yourself From the Framework
-----------------------------------

1.  Add a test fixture for testing this class. Call the fixture
    `ConfigReaderFixture` and include both the `[TestFixture]` attribute
    and `[VerifyMocks]` attribute.
2.  Add a unit test to the fixture. Call it `SettingFound` - we'll test
    what happens when the setting is correctly read from configuration.
3.  In the test...
    1.  Create an instance of `ConfigReader`.
    2.  Create a recorder block. Inside the recorder block...
        1.  Read the `ConfigurationManager.AppSettings["configReader"]`
            key.
        2.  Tell the recorder to return the value "readFromAppSettings".

    3.  Call the `AppendValueToSetting` method and pass in
        "PassedInFromTest".
    4.  Assert that the value you get back is
        "readFromAppSettingsPassedInFromTest" - the result of
        concatenating the two strings.

The test will look like this:

    [Test]
    public void SettingFound()
    {
      ConfigReader reader = new ConfigReader();
      using (RecordExpectations recorder = RecorderManager.StartRecording())
      {
        string dummySetting = ConfigurationManager.AppSettings["configReader"];
        recorder.Return("readFromAppSettings");
      }
      string result = reader.AppendValueToSetting("PassedInFromTest");
      Assert.AreEqual("readFromAppSettingsPassedInFromTest", result);
    }

Notice how you didn't actually have to put anything in `App.config` -
you don't really want to re-test the functionality of the .NET
framework, you just want to test that your code is correct.

### Exercise

Take this to the next step...

-   Add a test where the app settings value is null to simulate what
    happens when it's not found.
-   Add a test where the app settings value is empty string to simulate
    when the key is there but has an empty configured value.

Verifying Mock Behavior
-----------------------

Try this: Go to your `ConfigReader` class and modify this line:

`string setting = ConfigurationManager.AppSettings["configReader"];`

To be this:

`string setting = ConfigurationManager.AppSettings["theWrongKey"];`

Now run your tests - they all still pass. Why?

As mentioned earlier, Typemock Isolator will, by default, just notice
which methods and properties you're using, not what the values of
parameters are. Sometimes you'll want to make sure that not only does
the third-party dependency return an expected/recorded result but also
that your code is passing in the proper parameter values. In this case,
you want to not only make sure that you're getting an expected value
from the configuration system but also that your code is asking for the
value you think it's asking for. You'll want the recorder to "check
arguments."

Leave the wrong config key in your `ConfigReader` class - we'll catch
that it's wrong inside the unit tests.

In the `SettingFound` test, in your recorder block immediately after the
call to `ConfigurationManager.AppSettings`, tell the recorder to check
arguments:

    [Test]
    public void SettingFound()
    {
      ConfigReader reader = new ConfigReader();
      using (RecordExpectations recorder = RecorderManager.StartRecording())
      {
        string dummySetting = ConfigurationManager.AppSettings["configReader"];
        recorder.CheckArguments();
        recorder.Return("readFromAppSettings");
      }
      string result = reader.AppendValueToSetting("PassedInFromTest");
      Assert.AreEqual("readFromAppSettingsPassedInFromTest", result);
    }

That tells the recorder that you want to ensure the arguments in the
mocked statement are correct. In this case, the argument is the string
"configReader" that gets passed to `ConfigurationManager.AppSettings`.
Now run the tests: The `SettingFound` test fails with an exception like
this:

    TestCase 'TypeMockQuickStart.ConfigReaderFixture.SettingFound'
    failed: Typemock Isolator.VerifyException :
    Typemock Isolator Verification: Call to System.Collections.Specialized.NameValueCollection.get_Item() Parameter: 1
     expected: <"configReader">
      but was: <"theWrongKey">

Typemock Isolator caught that the wrong parameter was passed - the one
in the test ("configReader") was expected, but your production code used
the wrong value ("theWrongKey"). Fix the `ConfigReader` class back to
the correct settings key and your test will pass again.

Mocking Instances
=================

Once you get past the simplest of cases, you start needing to mock
specific instances of classes and sometimes you need to mock methods on
instances that get created inside non-test code. Typemock Isolator can
do both of these things.

Mocking a Current Instance
--------------------------

This exercise will show you how to create an instance of an object where
the constructor of the object is mocked and you control the entire life
of that object.

Add a new class to your project. This class will use the `Calculator`
class you added earlier. First, add a couple of constructor overloads to
your `Calculator` class:

    public class Calculator
    {
      private bool _allowAdd;
      public Calculator() : this(true) { }
      public Calculator(bool allowAdd)
      {
        this._allowAdd = allowAdd;
      }
      // Add, Divide, and AddThenMultiply methods omitted for clarity.
    }

Now update the `Calculator.Add` method so if the `_allowAdd` member
variable is `false`, the `Add` method won't run:

    public double Add(double a, double b)
    {
      if (!this._allowAdd)
      {
        throw new InvalidOperationException("Add operation is not allowed.");
      }
      return a + b;
    }

Running your tests, they should all still pass. Notice the default value
for allowing the `Add` operation is `true` and it's set in the default
constructor. Now in your `CalculatorMockingFixture` test fixture, add a
new test:

    [Test]
    public void SkipConstructor()
    {
      Calculator calc;
      using (RecordExpectations recorder = RecorderManager.StartRecording())
      {
        calc = new Calculator();
      }
      calc = new Calculator();
      double result = calc.Add(2, 2);
      Assert.AreEqual(4, result);
    }

This test runs the constructor for the object inside the recorder block
- that means the constructor itself will be mocked. In this case, think
about what that means - the default value for an uninitialized Boolean
is `false`, so the `_allowAdd` value, which normally gets initialized to
`true` in the default constructor, will remain `false` and won't let the
`Add` operation run.

Run the test and the test will fail:

    TestCase 'TypeMockQuickStart.CalculatorMockingFixture.SkipConstructor'
    failed: System.InvalidOperationException : Add operation is not allowed.

You can fix the test so it passes by adding an `[ExpectedException]`
attribute to the test and expecting an `InvalidOperationException`.

Usually constructor logic is more complex than this - it might read from
configuration, try to initialize a file in the filesystem, or do some
other actions that you may want to control. In cases like these, you may
need to mock the constructor for the object.

### Exercise

Add a test where you mock the constructor logic but also test the
`AddThenMultiply` method. What does that look like? How does it differ
from the original test you ran with `AddThenMultiply`?

Mocking a Future Instance
-------------------------

This exercise will show you how to set up expectations on an object that
gets created in code you don't control.

Add a new class called `BackwardsCalculator` to your project. The
constructor of the `BackwardsCalculator` class will create an instance
of `Calculator` and hang onto it. A method `ReverseAdd` will perform an
add operation using the `Calculator` and reverse the string value of
that. The `BackwardsCalculator` class looks like this:

    public class BackwardsCalculator
    {
      private Calculator _calculator;
      public BackwardsCalculator()
      {
        this._calculator = new Calculator();
      }
      public string ReverseAdd(double a, double b)
      {
        string forward = this._calculator.Add(a, b).ToString();
        string reversed = new string(forward.ToCharArray().Reverse().ToArray());
        return reversed;
      }
    }

If you feed in 10 and 25 to the `ReverseAdd` method, you'll get "53"
returned: 10 + 25 is 35, reverse 35 is 53.

Notice how the `BackwardsCalculator` constructor is creating a
`Calculator` but you don't get a chance to insert a mock yourself.
That's okay - you can still use mocks to mock out the call to
`Calculator.Add` so you're isolating your code.

1.  Add a test fixture for testing this class. Call the fixture
    `BackwardsCalculatorFixture` and include both the `[TestFixture]`
    attribute and `[VerifyMocks]` attribute.
2.  Add a unit test to the fixture. Call it `ReverseAddPositive` - we'll
    test two positive inputs.
3.  In the test...
    1.  Create a recorder block. Inside the recorder block...
        1.  Create an instance of the `Calculator` class.
        2.  Call the `Add` operation and pass in two known values.
        3.  Check the arguments on the `Add` operation to make sure
            you're getting called with the expected parameters.
        4.  Return the known good result.

    2.  Create an instance of `BackwardsCalculator`.
    3.  Call the `ReverseAdd` method and pass in the parameters you
        decided on in the record block.
    4.  Assert that the value you get back the reversed sum of the two
        numbers.

The test will look something like this:

    [Test]
    public void ReverseAddPositive()
    {
      using (RecordExpectations recorder = RecorderManager.StartRecording())
      {
        Calculator dummyCalc = new Calculator();
        dummyCalc.Add(10, 20);
        recorder.CheckArguments();
        recorder.Return((double)30);
      }
      BackwardsCalculator bCalc = new BackwardsCalculator();
      string result = bCalc.ReverseAdd(10, 20);
      Assert.AreEqual("03", result);
    }

By adding the constructor call to the mock recorder block, we're saying,
"Mock the next instance of this object that gets created and set these
expectations on that object." When we instantiate the
`BackwardsCalculator` after the recorder block, the mocking framework
goes into playback mode and mocks the creation of the `Calculator` in
the `BackwardsCalculator` constructor.

### Exercise

-   If `Add` was doing more than just adding, this would be perfect for
    isolating our code. Add is a simple method, though. Look at the
    `CallOriginal` method on the recorder and see if you can get a test
    to pass where you're checking arguments but actually calling a live
    version of the `Calculator.Add` method.
-   The `ReverseAdd` method is using LINQ to reverse the string. Try
    mocking the LINQ `Reverse` or `ToArray` statements.
-   Look at the `WhenArgumentsMatch` method on the recorder. It lets you
    conditionally mock a statement based on the arguments that get
    passed into a method. Can you set up the mock so it only runs when
    the arguments match what is getting passed in?

Advanced Mocking
================

Mocking lets you isolate yourself from a lot of common situations,
including:

-   **Class factories** - Instantiate a class based on a configured
    value. Isolate yourself from configuration when testing the factory
    or isolate yourself from the factory when testing code that uses the
    factory.
-   **Third-party dependencies** - Components from external vendors.
    Isolate yourself from the behavior of the dependency so you're not
    testing the component, you're testing your code.
-   **.NET framework** - Built-in framework classes. Isolate yourself
    from the internal workings of the framework and test just how you're
    using it.
-   **Legacy API** - Code you have to interact with on legacy systems.
    Isolate your interaction code from the legacy system so you're not
    testing the system.

There are other cases where you might need to use Typemock Isolator,
too, like adding tests for an API that was already written and can't
change. You can mock lots of things that can make testing tricky...

-   Fields.
-   Static methods/properties.
-   Private methods/properties.
-   Sealed classes.

Take-Away
=========

If you forget everything else, remember these rules of thumb:

-   **Record, Playback, Verify.**
-   **If it's in a mock recorder block, it's not actually running** -
    it's recording to be played back later, like a tape recorder.
-   **Only mock what you need.** You can get into some crazy situations
    by mocking too much, and you might end up in a spot where you're
    just testing your mocks and no actual code.
-   **Just because you can mock it doesn't mean you should.** For
    example, Typemock Isolator can mock fields, but you should really
    stop and look at what you're mocking before you get too deep.
    Knowing too much about the internal implementation of a class will
    make your tests very brittle if anything has to change.
-   **You still need to design your application with good principles.**
    Typemock Isolator enables you to test poorly designed code, but
    that's not a green light to stop proper software design.

Additional Resources
====================

The [Typemock Learn](http://www.typemock.com/Learn.html) page has a
great set of resources, including:

-   API documentation
-   Examples
-   Multimedia
-   Cheat sheets
-   FAQ

The [Cheat Sheets](http://www.typemock.com/Docs/CheatSheets.html) are
particularly helpful - one-page references you can print off and use
while you're working.

If you use [Snippet
Compiler](http://www.sliver.com/dotnet/SnippetCompiler/), you can
experiment with Typemock Isolator using [a special template for Snippet
Compiler.](/archive/2008/02/21/template-for-quick-typemock-testing.aspx)

