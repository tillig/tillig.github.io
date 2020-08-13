---
layout: post
title: "Is Removing Boilerplate a Good Thing?"
date: 2020-08-13 -0800
comments: true
tags: [csharp,javascript]
description: "As programming languages, frameworks, and features evolve, I sometimes wonder if the removal of all boilerplate as a specific goal is actually interesting or valuable."
---

I saw a Twitter thread the other day that got me thinking:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">After 8 years with <a href="https://twitter.com/hashtag/golang?src=hash&amp;ref_src=twsrc%5Etfw">#golang</a>, I don&#39;t understand how I enjoyed programming before. I no longer have no tolerance for excessive boilerplate, verbosity, slow builds, overabstracted APIs, lack of first-class concurrency, bulky performance tools, ...</p>&mdash; Jaana Dogan (@rakyll) <a href="https://twitter.com/rakyll/status/1293629285974982656?ref_src=twsrc%5Etfw">August 12, 2020</a></blockquote>

One of the responses hit home for me:

<blockquote class="twitter-tweet" data-conversation="none"><p lang="en" dir="ltr">My problem with <a href="https://twitter.com/hashtag/golang?src=hash&amp;ref_src=twsrc%5Etfw">#golang</a> is that I love it, I got stuff done fast, didn’t need to use it for a few weeks and forgot everything. I have this learning curve spin up very time I use it. I don’t have that spin up time with C#.</p>&mdash; Herb Stahl (@JustAHerb) <a href="https://twitter.com/JustAHerb/status/1293661645269430272?ref_src=twsrc%5Etfw">August 12, 2020</a></blockquote>

> _Warning_: I'm going off on a bit of a tear here, and I color a little outside the lines of the argument. I'm having a tough time trying to convey a lot of frustration I've had recently with Go and Spring Boot / Java, and reading about folks loving the removal of boilerplate _as a feature_ is touching on a pain point.

My daily work is C# and TypeScript. However, I sometimes also work in Terraform and the related SDKs, which are all in Go. So... I do have to use Go. Sometimes, but not often. When I do, I, too, find that I need to relearn nearly from the ground up. I also work, very occasionally, with Java, mostly apps based on Spring. Same thing there - I see the stuff, I sorta figure out what I need to, but if I come back to it a month later, I have no idea what's going on.

I'm trying to figure out why that is. Like, if I have to get into a Python program and figure something out or add to it, I don't have that feeling of being instantly just "lost." I totally feel that with Go.

I think this part hints at it: "I ... have no tolerance for excessive boilerplate." I'm curious what, exactly, that means. I can guess, having messed around with Go - the convention-over-configuration for project structure, for example.

This is a lot of what I see [Spring Boot](https://docs.spring.io/spring-boot/docs/current/reference/html/index.html) in Java trying to address. Removing boilerplate. Convention over configuration. Auto-wireup. Just make it happen - code less, get more done.

But... if you're removing boilerplate, you have to supplement that with easy to locate, comprehensive documentation that explains how to get things done.

The command `go test` runs your unit tests. Cool. What are the parameters you can pass to that? Go search on `go test parameters`. I'll wait. You know what the first several results are? The `test` _package_. Doesn't tell you anything. OK, cool, here's a hint - just run `go` and you can start tracing down the help stack. Eventually you'll get to `go help testflags`. Hmmm. Seems like a lot of references to `GOMAXPROCS` in there. What does that mean? Back to searching...

Here's another one - I wanted to turn up the log level on a Spring Boot app that was in a Docker container. This seems like it should be easy. There is no reasonable set of search terms that will get you to the point where you just see a clear explanation that setting `-Dlogging.level.root=TRACE` or setting `LOGGING_LEVEL_ROOT` in the environment is the thing you want. I'll save you the trouble, it's not there. It's just layers upon layers of abstractions in an effort to remove boilerplate, but you have to know what's being abstracted in order to understand how to work adequately with the abstraction.

This seems to be a sort of conflicting goal in the tweet - the person doesn't have a "tolerance for excessive boilerplate" but also doesn't want "overabstracted APIs." By definition, I think, removing the boilerplate necessarily implies there's some abstraction bridging that gap.

Looking at the whole [C# 9 feature of "top-level programs"](https://devblogs.microsoft.com/dotnet/welcome-to-c-9-0/#top-level-programs) - that is, a program that doesn't require a `Main()` method. Seems like removing nice boilerplate, right? Except, read that bit about `args` - "`args` is available as a 'magic' parameter.'"

_Magic._

I'm not sure writing a class and a method declaration as an explicit entry point for my program was really the stumbling block for getting things done. And what's the debugging story? When you have to figure out where the "magic parameter" comes from... how do you do that?

I think that's the crux of my whole issue here. I'm not a fan of just throwing away keystrokes (though you'd be hard pressed to realize that from this rant), but there's gotta be a balance between "fewer keystrokes," "ease of use," and "maintainability." If I need to spend a year learning everything that sits under Spring Boot so I can understand how to change the log levels in an app, that's not maintainable. It might save keystrokes, it might be easy to use 'if you know,' but... if you don't?

I wonder if this contributes to the polarization of people working with languages. It becomes harder and harder to be that polyglot programmer because the stack you have to know for each individual language just grows. Eventually it's not worth trying to span all the languages because you aren't getting anything done. So you get the C# fans, or the Go fans, or the Python fans, or the JavaScript fans, and they all love their individual languages and ecosystem, but only because they spend all day every day in there. They know the right search terms to plug in, they know the stack and why the boilerplate was removed.When they switch to something else (as it is with me), it's a "somebody moved my cheese" situation and the tolerance for pain is far lower than the desire to just get back to being productive.
