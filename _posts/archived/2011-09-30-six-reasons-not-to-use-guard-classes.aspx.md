---
layout: post
title: "Six Reasons Not to Use Guard Classes"
date: 2011-09-30 -0800
comments: true
disqus_identifier: 1738
tags: [dotnet,csharp]
---
"Guard" classes - those little "convenience wrappers" around common
argument checking and exception throwing. You know what I'm talking
about, things like...

    public static class Guard
    {
      public static void AgainstNull(object value, string parameterName)
      {
        if(value == null)
        {
          throw new ArgumentNullException(parameterName);
        }
      }
    }

Then, rather than the if/throw block in your method, you have something
like...

    public void MyMethod(string theParameter)
    {
      Guard.AgainstNull(theParameter, "theParameter");
      // Do the rest of the work...
    }

It seems like a good idea, right? Reduce the three lines of if/throw
checking to a tiny, fluent-looking one-liner. There are some common
reasons people seem to like them:

- Makes the code tighter/more readable.
- If you want to add common logging, you can do it in one place.

Both are totally legit. **But there are a lot more reasons not to like
them, and here are mine:**

1. **Guard classes defeat static analysis like FxCop.** I like FxCop. I
    treat it like it's another set of unit tests that help me to make
    sure my code behaves consistently. [I don't use all the
    rules](/archive/2008/10/30/fxcop-rule-recommendations.aspx), but
    most of them are valuable. One of those valuable rules can analyze
    whether you validated an argument for null prior to sending it to
    another method. If you wrap that check in a Guard class, FxCop isn't
    going to see it - it sees the Guard class validating the argument,
    but not the caller. FxCop can also validate that the name of the
    parameter in the exception being thrown matches exactly the name of
    the real parameter on the method - a lifesaver if you're doing some
    refactoring that renames parameters and you forget to fix that. You
    either have to turn these FxCop rules off or write custom rules that
    understand your Guard class.
2. **Guard classes become giant validation dumping grounds.** How many
    things can you imagine you need to Guard against? Null values, sure.
    Maybe strings that are null or empty. Collections that are null or
    empty. How about ranges? Things like "if this date is in the
    future?" What else? There are actually a lot of things you can
    possibly guard against. Unfortunately, unless you're in a very small
    team, that means the Guard class quickly becomes hundreds of lines
    of code doing dozens of different validations that aren't actually
    all that common, and there's no real way to "draw the line" and say
    "this should be in, but this shouldn't."
3. **Guard classes mess up the call stack.** The place where the
    exception gets thrown is now no longer actually the method that
    should be doing the validation - it's one level deeper (possibly
    more if you call Guard methods from other Guard methods).
4. **Guard classes become a single point of failure.** Someone messes
    up or tweaks the logic in one Guard check, that affects literally
    every method through the whole application. It also means you'd
    better check performance well in there because it's totally central.
5. **Guard classes tend to get used in the wrong places.** Say you have
    a check that validates for null, as seen in the example above.
    That's great for validating arguments to a method... but what about
    if you read in a configuration value and you want to check it for
    null. Same Guard method? No! The configuration value isn't an
    argument, so you shouldn't throw an ArgumentNullException.
    Unfortunately, it's very tempting to go shorthand everywhere and end
    up throwing the wrong exceptions just because it's convenient.
6. **Guard classes fool your unit test coverage.** If you ship the
    validation of arguments or values off to a Guard class, then
    suddenly your unit test coverage is 100% whether or not you test the
    failure scenario of an invalid argument - it passed through the
    Guard class, so that line got covered. Done! Unless you're doing
    strict TDD where you wrote the negative checks up front along with
    the positive checks, there's going to be a pretty good chance you'll
    forget to add all the negative test cases... and there's no way to
    tell if you did or not.

**I'm not convinced that saving one (or three, pending on your counting)
lines of code for an argument check is really worth all the downsides.**

- If you want the code tighter/one line, maybe you should check into
    [Code Contracts](http://msdn.microsoft.com/en-us/devlabs/dd491992).
- If you want logging to be done in a more common fashion, consider
    [Enterprise Library Exception Handling
    Block](http://msdn.microsoft.com/en-us/library/ff664698%28v=PandP.50%29.aspx)
    to log it at a global level or use something like
    [PostSharp](http://www.sharpcrafters.com/aop.net) to add the logging
    through AOP.
