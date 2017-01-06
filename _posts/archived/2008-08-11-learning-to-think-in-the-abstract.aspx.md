---
layout: post
title: "Learning to Think in the Abstract"
date: 2008-08-11 -0800
comments: true
disqus_identifier: 1427
tags: [GeekSpeak]
---
Something I've noticed as I work with developers of varying skill levels
is that one of the key differentiating factors between the junior folks
and the senior folks is the ability to think in the abstract - that is,
patterns and concepts, not concrete implementations.

How many times have you been one of the people in this conversation?

> **Senior Developer**: OK, so the task at hand is to create a Doorman
> that works in a hotel or apartment building. We know he's going to
> hail taxi cabs, handle the door for people, make small talk, and do a
> few other things. Today we're just looking at the door handling part.
>
> **Junior Developer**: What kind of door is it?
>
> **SD**: It really doesn't matter, and we won't really know until the
> Doorman gets placed somewhere, so we need to be flexible. What we
> probably should do is have an interface like "IOpenDoor" with an
> "OpenDoor" method. Then we can provide any number of implementations
> to that to handle different door types. (This is the [strategy
> pattern](http://en.wikipedia.org/wiki/Strategy_pattern).) The question
> on the table is, "Does the doorman need to do anything else with the
> door besides open it?"
>
> **JD**: What if the door is heavy?
>
> **SD**: It doesn't matter - that's an implementation detail. What
> we're looking at here is the pattern. Like, we know the Doorman needs
> to open the door, but does he need to close it, too? Should it be
> "IDoorController" with "Open" and "Close" methods? Or do we consider
> all doors to be self-closing?
>
> **JD**: If the door is glass and the Doorman kicks it closed, he might
> break the door.
>
> **SD**: Um... OK... right... but really we need to look at the pattern
> here. Is it the right way to go? Are we missing something around the
> Doorman's interaction with the door that we should know about?
>
> **Another Senior Developer**: The door might be open due to some other
> action, but the Doorman might be requested to hold the door, so we
> might need a "HoldOpen" method on that interface.
>
> **SD**: Good point. That's a door state we didn't consider.
>
> **JD**: What if the door has a knob instead of a handle?
>
> **SD**: [Step into my
> office.](http://www.youtube.com/watch?v=EzxJy-7ggx0)

Now, I'm not saying that all junior developers are unable to think in
the abstract, and I'm definitely not saying that all senior developers
(or at least people with a "senior" title) can. What I'm saying is that
**the ability to think in the abstract is key to being able to step
beyond simple *coding* and into the world of *development*.**

