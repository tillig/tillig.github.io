---
layout: post
title: "Sheer Incompetence"
date: 2004-10-19 -0800
comments: true
disqus_identifier: 679
tags: [General Ramblings]
---
I was trying to keep this bottled in, but after today I'm realizing that
I'm attempting to internalize a frustration beyond my abilities to
control, so it's time to release it upon you.
 
 I am *sick and fucking tired* of the level of sheer incompetence in the
world.
 
 I went to the fabric store the other day to buy some stuff to work on
my Halloween costume. Just a spool of thread and some elastic. The
ridiculous incompetence when I reached the cash register was
dumbfounding - and I'm not even talking about the staff! It's the
*customers*! Do you really have to count - *twice* - all \$0.97 you got
back in change... while standing at the register and holding up the only
open checkstand? Making small talk while you're doing it doesn't make it
better, it makes *you stupid*. Get out of the way so the other 15 of us
standing in line can get through.
 
 That was the part I was going to bottle inside. I was going to let it
go. Then I got into a set of meetings today regarding the project I'm
working on. A mysterious and arbitrary requirement showed up that the
new product we're working on - a standalone API - should be somehow
"backwards compatible" with a *nearly unrelated product*. Not only that,
but the idea reared up that the taxonomy of classes in the API was nigh
unto irrelevant.
 
 I won't lie to you, folks. I'm *anal* about stuff like naming
conventions, standards, and taxonomy when coding, especially when it's
lower-level API stuff that other people will be using as the foundation
for their applications. I believe stuff should be elegant, well made,
and simple to pick up and use. Familiarity is key for the developer - if
it's named in a familiar and conventional fashion, it will be easier to
learn and use.
 
 So when it comes out that people think a class like
"TopLevelNamespace.MyReallyCoolClassThatDoesNeatStuff" is a better idea
than organizing the class hierarchy by namespace to group similar
classes, like "TopLevelNamespace.Stuff.Neat.ReallyCool.MyClass," I reach
a state of insurmountable cognitive dissonance. The idea that people
want "standards" but won't even take the time to name things properly
is... I don't even know what it is. It's not even comprehensible to me.
Like "[new math](http://www.straightdope.com/mailbag/mnewmath.html)."
 
 Anyway, we got into it for quite some time, and even after I ended up
basically coming out ahead (and maybe enforcing a little structure on
the chaos), I didn't feel good about any of it. *Having to even have
that debate*... it should never have happened. If people did things
right the first time rather than jamming stuff together over a couple of
days and calling it 'done,' we wouldn't have this going on. Instead, I
have to fight people to make robust, extensible, easily debuggable code.
Astounding. Do people not think ahead?
 
 Then you still have the idea of "backwards compatibility" with this
unrelated product. I ended up coming out on top there, too, but you have
to dumb down the argument in order to get it to sink in. "We're making a
square peg factory and you want it to output things that will fit in
round holes. Somehow that's not going to work." Then you get stuff like,
"Well, can't you make a square-peg-to-round-hole-adapter?" *No!* It's a
new thing! We're basing our whole framework on the idea that *holes and
pegs are square!*
 
 Argh! I've got [my angry
music](http://www.amazon.com/exec/obidos/ASIN/B00000JCB2/mhsvortex) on,
and I may just have to wear [my combat
boots](http://www.amazon.com/exec/obidos/ASIN/B0002ZYRA2/mhsvortex)
tomorrow.
