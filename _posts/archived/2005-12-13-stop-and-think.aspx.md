---
layout: post
title: "Stop And Think"
date: 2005-12-13 -0800
comments: true
disqus_identifier: 933
tags: [General Ramblings]
---
In general daily life, I find that I run across two kinds of people:
those who think before they act, and those that act before they think.
The folks who think before they act (henceforth "thinkers") seem to be
easier to deal with than the folks who act first ("actors"). I
appreciate the thinkers. I have a problem with the actors.

 The actors never seem to realize that you can't always necessarily fix
bad action with more action. Quantity doesn't make up for quality.

 Let's apply this to development. Say you're writing some business logic
with an API that will be consumed by other developers. Even if it's
simple logic, stop and think: If you were the consumer of the API, what
would you like out of it? Is it robust enough to support all the cases
it's going to need to? (Did you ask your potential consumers to verify
that?) What about doc? Consistency of naming and usage across methods
and classes? Don't make it so that some methods return true on success
and others return false...

 Or how about defect fixing: The actor will start coding before figuring
out all the ramifications of what they're doing, then realize that the
fix they just made actually breaks three more things. The thinker will
follow the related code paths through and apply a more correct fix.

 Sounds common sense, right? You'd be surprised.

 Got a question on how something in a standard framework (.NET, Java,
etc.) works? Stop and think! Dropping your laptop on a coworker's desk
and interrupting them with a question or five isn't always the best way
to go. You could try searching Google - chances are you'll find what
you're looking for. Are there docs you could look at? It might take a
little more time, but maybe you'll learn something along the way... and
the stuff you learn will probably help you out in the future (and save
your coworkers some time).

 Now, I'm not saying that people shouldn't help other people. I'm all
for everyone carrying their own weight toward a common goal, and if
sometimes folks need a little help, that's fine. What I'm saying is...
help shouldn't always be the first resort. Try to figure it out. Stop
and think for a second. Still can't get it? Stop and think just a little
longer - this is the part most folks miss. Your first failure does not
necessarily equal "blocked." If you still can't get it after puzzling on
it for a while and you've exhausted the standard methods of helping
yourself (doc, search, etc.), then ask for help. Folks will be much
happier to help you if you have already researched the topic yourself
and legitimately came up dead-ended.

 Building something with weak requirements? Stop and think! If you don't
know what you're building, you can't build it. Even in an Agile
environment you have to have some sort of direction before coding. Too
many times people code before planning. I'm sure you've seen it -
spaghetti code that makes absolutely no sense, grown in upon itself
without hope of ever being untangled. Stop! Think!

 Got a small feature that needs to be added? Don't just tack code on the
side. Refactor your code if you have to. Test it! Especially in the case
of an API, you can't just throw some code in there without testing it -
frequent releases of your API to fix bugs that appeared because you
didn't test your new feature not only causes churn in consuming products
but also makes people lose confidence in the API.

 Yeah, that was more of a rant than anything else, but I'm really tired
of actors. At the store, at the sandwich shop, in the tech world... come
on, people. Stop and think. I promise I won't dock you for taking a
couple extra seconds to get it right the first time.
