---
layout: post
title: "Trip To Devscovery: Day 1"
date: 2005-08-30 -0800
comments: true
disqus_identifier: 879
tags: [personal,dotnet]
---
Got to the keynote this morning slightly early to get through
registration and whatnot. They gave us binders with printouts of the
slides, which is cool, and CDs with the sample code on them. They gave
us 64 MB USB thumb drives, too, which made me think a few things: First,
why only 64MB? I can go to Fry's and get a half gig USB drive for
pennies - what am I going to do with 64MB? Second, why hand me a CD with
the source code on it and a thumb drive on the side - why not put the
source code on the thumb drive so I don't have all this extra crap to
cart around?

 Common sense aside, I guess I can't really complain so much. Maybe.

 The keynote was pretty decent, but it ran like 20 minutes over, which,
of course, threw off the scheduling for the whole rest of the day. That
was pretty irksome because later on in the day there were lectures where
we didn't get to hear everything due to the time issue and we missed
stuff I'd have liked to have heard.

 The first lecture I went to was on garbage collection in .NET. Most of
the stuff in there I had heard, but they went through an interesting bit
talking about how garbage collection is handled differently in debug
builds vs. in release builds. Apparently references to objects are held
longer in debug builds in the event a debugger needs to attach to the
assembly. That means garbage collection can't release memory for all the
objects it needs to until the end of their scope, even if they're not
used anymore. That has the possibility of eating your lunch, methinks.
Release builds don't have that problem since the optimizations for
garbage collection are in place.

 The second lecture was on what's new in ASP.NET 2.0. The majority of it
was spent on DataSource and GridView/DetailsView stuff which,
unfortunately, I had already seen. Toward the end they started getting
into the Wizard control, some of the user profile stuff, dynamic
navigation, and the things I was interested in... but because of the
messed up time issue, we didn't get to see all of that before we had to
go to the third lecture.

 The third (and final) lecture of the day was on making dynamically
extensible applications in .NET. I learned quite a bit there about how
servers host applications (sort of like how IIS hosts .NET apps) and
there was a lot of low-level discussion on creating AppDomains and
instantiating objects from one AppDomain into another. Interesting
academic discussion, but I'm still having difficulty figuring out how I
might be able to apply some of that in my current work. After the
AppDomain discussion we got more into the sort of app extensibility I'm
used to - plugins through Reflection. Again we ran into a bit of a time
crunch and didn't get to hear about as much of that as I'd have liked.
Interesting stuff, though.

 So far I'm a little disappointed. The planning seems to have gone a bit
awry, which is unfortunate, but more than that, I haven't really gotten
jazzed about anything in particular that I've heard so far. I'm also
having a difficult time determining what the intended audience is for
some of these lectures - some of the material is pretty
beginner/intermediate stuff and some of it is really low-level advanced
stuff. It'd be nice to know ahead of time which lectures were addressing
which crowds so I could determine my attendance accordingly.

 If/when we get feedback sheets to fill out, I'm going to put that.

 After the lectures I went and bought a cheap plastic cup at Rite-Aid
because I don't trust the cups they have available in my odd kitchenette
here at the hotel. (They don't have disposable plastic cups like every
other hotel I've ever been to.) Also got some bottled water for the
drinkin'. Had dinner at Qdoba, and now I'm a-bloggin'. Stu and I will
probably watch some movies and play some PS2 before retiring for the
evening, ready for a new day.
