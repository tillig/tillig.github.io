---
layout: post
title: "Sick of FizzBuzz"
date: 2007-02-28 -0800
comments: true
disqus_identifier: 1155
tags: [personal]
---
Technically [Reginald
Braithwaite](http://weblog.raganwald.com/2007/01/dont-overthink-fizzbuzz.html)
started it, but [freaking Atwood blogged
it](http://www.codinghorror.com/blog/archives/000781.html) and now
almost every blog in my RSS reader is talking about it, so I'm going to
throw in my two cents in and then I'll shut up.

 **The controversy: Lots of people who claim to be programmers actually
can't program.**

 What kills me is that this surprises anyone. It's sort of like blogging
that "lots of people who see the sky claim it is blue." There are a lot
of incompetent people, folks, but no one will admit they're the
incompentent one. Did you ever notice that everyone else on the road is
a bad driver except you?

 The point Atwood was making is that it's kind of sad that people who
come out of school with these great qualifications or have these amazing
resumes or whatever can't actually do what they claim. If you give them
a simple problem to solve, they can't do it. (That's the "FizzBuzz"
thing: Write a program that prints the numbers from 1 to 100. But for
multiples of three print "Fizz" instead of the number and for the
multiples of five print "Buzz". For numbers which are multiples of both
three and five print "FizzBuzz.")

 [Hanselman has a pretty good
response](http://www.hanselman.com/blog/YouCantTeachHeightMeasuringProgrammerCompetenceViaFizzBuzz.aspx)
- that some features are inherent in the person ("When you're putting
together a basketball team, you have to remember that you can't teach
height."). I sort of buy that and sort of don't. There have been
successful shorter basketball players. From personal experience, I know
that I got shafted out of having a career in 3D animation and modeling
because art houses believe you can teach an artist computer science but
you can't teach a computer scientist art (even though I had a portfolio,
I also had a CS degree and not an art degree, so no one would touch me;
times may have changed since then).

 [Phil Haack brings up an interesting
corollary](http://haacked.com/archive/2007/02/27/Why_Cant_Programmers._Read.aspx)
- that it's fascinating how many people solved Atwood's puzzle in the
comments (utterly missing the point) and got it wrong because they
didn't read the requirements thoroughly. That's just as bad as not being
able to program.

 But the best response I've seen, and the one I agree with most, is [a
tiny blurb from Mike Gunderloy on today's Daily
Grind](http://www.larkware.com/dg7/TheDailyGrind1088.aspx):

> ...about 90% of the "essential .NET knowledge" and "write this code at
> an interview" questions I've seen (not specifically on Scott's weblog,
> but around in general) are beyond me, despite a successful programming
> career that spans a couple of decades now. There are other skills
> besides tucking stuff away in your head. Dogged determination, a few
> basic techniques, brute force, and good skills at looking things up
> can go a long way in this industry - not that those are the most
> common skills in this industry (or any other) either.


 **So there are really *two issues* here: What can you *do* and what do
you *know*?**

 From a "what can you do" standpoint, I think programming at the
interview is a must. If I'm interviewing someone for an ASP.NET job, I
like to see that the person can create a page that takes some
information in and echoes it back. It doesn't have to be anything
special, just something to indicate you know your way around. (Bonus
points if you can do it without the visual designer.) I try not to have
people "code on a whiteboard" because, frankly, I'm an Intellisense
addict myself and rely on that and the compiler to tell me when I've
accidentally used the "Count" property instead of the "Length" property
or what-have-you. If you can pseudocode it, I'm good.

 The "what do you know" question is more tricky. I find that the facts
in your head are generally the things that are relevant to projects
you're working on at the time and some remnants from past projects. For
example, I'm not a COM guy. I got my CS degree on Solaris and my first
couple of jobs were in LAMP land, so, no, I really can't tell you about
the ins and outs of why COM needs this or the limitations of COM's foo.
I've never needed to know, and frankly, if it came down to it, I'd go
look it up, *so there's really no point in having it memorized*.

 I can't tell you how many times I've been neck deep in some complex
situation in ASP.NET and thought, "Hey, this would be a great interview
question!" No, it wouldn't. It wouldn't be good because it's only really
pertinent to the odd edge case situation I'm in, and it doubly wouldn't
be good because I've been working with that exact thing for the last 80
working hours. If I were to ask myself that same question in a year,
would I remember the answer? Probably not.

 This reminds me of the best teacher I had in college, the guy who
taught the computer algorithms class. Lots of kids didn't like him
because of his teaching style. At the beginning of the class, he'd give
a brief intro of what you'd be seeing. Then he'd put up a slide that
described an algorithm - sorting, searching, whatever - and you'd copy
the slide down. He'd ask for questions when everyone was done, and swap
slides. Rinse and repeat. Tests were entirely over the slides and the
book, and the test was open-book, open-notes.

 Right now you're asking what the point was, aren't you?

 The point is this: **There is no time in your programming career where
you'll be working without access to reference material.** You need to be
familiar with the concepts and aware of what's going on, but there's no
point in memorizing things you'll be able to easily look up when you
need them.

 *Pragmatic.*

 That's probably the most brilliant thing any professor ever presented
to me in my *entire college career*. (That, along with my vector
calculus professor admitting that we'd only really need to know vector
calculus "out of curiosity" - that most of us would never use it
again.)

 So in my mind, the answer to questions like "What is the maximum amount
of memory any single process on Windows can address?" is "Google." It's
trivia. When something like that becomes relevant to what I'm working
on, I'll go look it up and that's the point at which it will be fresh in
my head. Somehow I don't feel like not having that information
at-the-ready makes me less of a good developer.

 What I'm more interested in, as far as "what you know," are conceptual
things. Do you understand the various concepts of object orientation?
Can you compare and contrast strong typing vs. weak typing? Can you talk
to me about garbage collection and why it's important (or not
important)? Which languages have you worked with and what were some
benefits and drawbacks of each? When you get to applying for a specific
position (e.g., an ASP.NET developer), can you answer some simple things
like what the events are in the page lifecycle? Difference between a
handler and a module? Things that you'll be using every day. I might not
ask you to *code* a handler or a module, but you should at least know
*what they are*.

 Of course, if you can't at least *pseudocode* an answer to the FizzBuzz
problem or, given a decent IDE, actually write an application that does
it, don't bother applying.
