---
layout: post
title: "Design By Jamming"
date: 2006-08-01 -0800
comments: true
disqus_identifier: 1046
tags: [GeekSpeak]
---
How many times have you seen this:
 
 A new software project starts, and a lot of design is done up front so
the actual code and organization of the project is fairly clean. As time
goes on and requirements change, the project mostly stays clean. Then
someone will be working all on their own and think, "Hey, I've got this
job I'm trying to do that doesn't really fit the way the current design
and architecture is, so I'll just jam this little helper/object/whatever
right over... here... yeah. There we go."
 
 A little time goes by and someone else gets a similar requirement,
can't find the little helper/object/whatever that the other developer
put in (because it isn't where you'd expect it to be), so re-invents it
and jams it somewhere else.
 
 After not too long, you step back from the project and it's not so
clean anymore and no one can figure out why.
 
 [Jeff Atwood wrote about this a little while
ago.](http://www.codinghorror.com/blog/archives/000593.html) The concept
of "working clean" in code. I think there are three problems to overcome
when trying to maintain a clean project.
 
 First, education. I'm finding that not too many people in software
development actually have a formal computer science education. Not that
that's a requirement to be a developer by any means, but even if you're
not writing compilers for a living, understanding why you might not just
put every single method or property you might ever need in the base
class of your object model is handy. That sort of education - or maybe
it's *intuition*? - is sorely lacking in a lot of developers.
 
 Second, communication. People don't communicate what they're doing, or
they assume everyone knows what they're doing already. A task called
"Create Data Provider" doesn't necessarily imply to the team that you're
going to be modifying the UI classes so folks aren't going to expect
things to change there. If people were to do a little bit of design up
front and say "here's all the stuff that has to change," it'd be easier
for the rest of the team to add input and correct design decisions prior
to a lot of work being done. (Admission: this is probably more of an
issue on a smaller team with a less formal process.)
 
 Third, work ethic. I find that many times people just don't care. "Oh,
yeah, I guess I did sort of hack that in there without any thought to
how it fits in the big picture. We'll fix it later." But you know you'll
never get to it later - there's no time! They know at the time they're
doing it that it's the wrong choice, but they just don't seem to care.
I'm not really sure how to address that.
 
 We need to quit designing by jamming, folks. Stop jamming code in
there. Take a second, breathe a little, and step back - look at what
you're actually doing and do it the right way.
 
 (I know I'm going to get a lot of folks with the "in the real world..."
sort of thoughts. If your company/process allows you to provide your own
task estimates, you need to factor the design into your task. Don't say
it's going to take you three hours when it's a six hour project. On the
other hand, if you don't get to provide your own estimates... well,
maybe you've got other issues to deal with.)
