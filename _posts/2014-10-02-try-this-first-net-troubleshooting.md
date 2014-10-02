---
layout: post
title: "Try This First: Basic Developer Steps for .NET Troubleshooting"
date: 2014-10-02 -0800
comments: true
tags: [testing,vs]
---
I get a lot of questions from people both at work and online asking for help in troubleshooting issues during development. **I'm more than happy to help folks out** because I feel successful if I help others to be successful.

That said, there's a limited amount of time in the day, and, you know, I have to get stuff done, too. Plus, I'd much rather [teach a person to fish than just hand them the fish repeatedly](http://www.phrases.org.uk/meanings/give-a-man-a-fish.html) and I don't want to be the roadblock stopping folks from getting things done, so I figured it'd be good to write up the basic steps *I* go through when troubleshooting stuff as a .NET developer in the hope it will help others.

Plus - if you ever do ask for help, this is the sort of stuff I'd ask you for, sort of along the lines of calling tech support and them asking you to reboot your computer first. *Is it plugged in?* That's this sort of thing.

Soooo... *assuming you're developing an app, not trying to do some crazy debug-in-production scenario...*

#Change Your Thinking and Recognize Patterns
This is more of a "preparation for debugging" thing. It is very easy to get intimidated when working with unfamiliar technology or on something with which you're not familiar. It's also easy to think there's no way the error you're seeing is something you can handle or that it's so unique there's no way to figure it out.

- **Don't get overwhelmed.** Stop and take a breath. You will figure it out.
- **Don't raise the red flag.** Along with not getting overwhelmed... unless you're five minutes from having to ship and your laptop just lit on fire, consider *not sending out the all-hands 'I NEED HELP ASAP' email* with screen shots and angry red arrows wondering what this issue means.
- **Realize you are not a special snowflake.** That sounds mean, but think about it - even if you're working on the newest, coolest thing ever built, you're building that with components that other people have used. Other folks may not have received *literally exactly the same error in literally exactly the same circumstances* but there's a pretty high probability you're not the first to run into the issue you're seeing.
- **Don't blame the compiler.** Sure, software is buggy, and as we use NuGet to pull in third-party dependencies it means there are a lot of bits out of your control that you didn't write... and sure, they might be the cause of the issue. [But most likely it's your stuff, so look there first.](http://blog.codinghorror.com/the-first-rule-of-programming-its-always-your-fault/)
- **Use your experience.** You may not have seen this exact error in this exact spot, but have you seen it elsewhere? Have you seen other errors in code similar to the code with the error? Do you recognize any patterns (or anti-patterns) in the code that might clue you in?

#Read the Exception Message
This is an extension of RTFM - *RTFEM*. I recognize that there are times when exception messages are somewhat unclear, but in most cases *it actually does tell you what happened with enough detail to start fixing the issue*.

And **don't forget to look at the stack trace**. That can be just as helpful as the message itself.

#Look at the Inner Exception
Exceptions don't always just stop with a message and a stack trace. Sometimes one error happens, which then causes a sort of "secondary" error that can seem misleading. Why did you get that weird exception? You're not calling anything in there! **Look for an inner exception** - particularly if you're unclear on the main exception you're seeing, the inner exception may help you make sense of it.

And **don't forget to follow the inner exception chain** - each inner exception can have its own inner exception. Look at the whole chain and their inner messages/stack traces. This can really help you pinpoint where the problem is.

#Boogle the Message
You know, "Bing/Google" == "Boogle" right? Seriously, though, put the exception message(s) into your favorite search engine of choice and see what comes up.

- Remove application-specific values - stuff like variable names or literal string values. You're probably more interested in places that *type* of exception happened rather than literally the *exact same exception*.
- Add "hint words" - like if it happened in an MVC application, throw "MVC" in the query. It can help narrow down the scope of the search.
- Don't give up after the first search - just because the first hit isn't exactly the answer doesn't mean the answer isn't out there. Modify the query to see if you can get some different results.

#Ask a Rubber Duck
[Rubber duck debugging](http://en.wikipedia.org/wiki/Rubber_duck_debugging) is a pretty well-known strategy where you pretend to ask a rubber duck your question and, as you are forced to slow down and ask the duck... you end up answering your own question.

Seriously, though, step back from the keyboard for a second and think about the error you're seeing. Run back through your mind and think about the error and what might be causing it. It's easy to get mental blinders on; take 'em off!

#Break in a Debugger
Put a breakpoint on the line of code throwing the exception. Use the various debugging windows in Visual Studio to look at the values of the variables in the vicinity. Especially if you're getting something like a `NullReferenceException` you can pretty quickly figure out what's null and what might be causing trouble.

#Step Into Third-Party Code
Many popular NuGet packages put symbol/source packages up on [SymbolSource.org](http://www.symbolsource.org). If you [configure Visual Studio to use these packages](http://www.symbolsource.org/Public/Home/VisualStudio) you can step into the source for these. You can also step into Microsoft .NET framework source (the SymbolSource setup enables both scenarios).

*Do this!*

If you don't know what's going on, try stepping into the code. Figure out why the error is happening, then follow it back to figure out the root cause.

#Use a Decompiler
If you can't step into the third-party source, try looking at the third-party stuff in a decompiler like [Reflector](http://www.red-gate.com/products/dotnet-development/reflector/), [JustDecompile](http://www.telerik.com/products/decompiler.aspx), [dotPeek](http://www.jetbrains.com/decompiler/), or [ILSpy](http://ilspy.net/).

You can use the stack trace to narrow down where the issue might be going on and try tracing back the root cause. You might not get an exact line, but it'll narrow it down for you a lot.

#Create a Reproduction
Usually crazy hard-to-debug stuff happens in a large, complex system and figuring out why that's happening can feel overwhelming. Try creating a reproduction in a smaller, standalone project. Doing this is a lot like the rubber duck debugging, but it tells you a little more in the way of concrete information.

- As you work through creating the reproduction, the number of moving pieces becomes easier to visualize.
- If you can easily reproduce the issue in a smaller environment, you can troubleshoot with many fewer moving pieces and that's easier than doing it in the complex environment. Then you can take that info to the larger system.
- If you can't easily reproduce the issue then at least you know where the problem *isn't*. That can sometimes be just as helpful as knowing where the issue *is*.

#Next Steps
**Once you've gotten this far, you probably have a lot of really great information with which you can ask a very *clear*, very *smart* question.** You've probably also learned *a ton* along the way that you can take with you on your next troubleshooting expedition, making you *that much better* at what you do. When you do ask your question (e.g., on [StackOverflow](http://stackoverflow.com)) be sure to include all the information you've gathered so people can dive right into answering your question.

**Good luck troubleshooting!**
