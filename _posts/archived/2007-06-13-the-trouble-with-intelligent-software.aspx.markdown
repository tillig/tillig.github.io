---
layout: post
title: "The Trouble With Intelligent Software"
date: 2007-06-13 -0800
comments: true
disqus_identifier: 1213
tags: [GeekSpeak]
---
I'm working with a print program - Microsoft Publisher - on a little
project at home and without going into a bunch of crap you don't care
about, let it suffice to say I'm trying to get it to print full-bleed on
my HP Deskjet 5940. It's just not happening.
 
 The printer is fully capable of printing full-bleed on 8.5 x 11 paper.
I've seen it work. But right now, I'm frustrated because no matter what
I do, no matter what I try, there's always this half-inch border along
the bottom of the page I'm trying to print.
 
 I know what you're going to say - that you need that half inch because
the printer has to have something to hang onto at the end as it prints
the last bit on the page and pushes it out. I thought so, too, and since
the stuff I'm printing is mostly at the bottom, I used the printer
driver option to automatically rotate the thing I'm trying to print 180
degrees. Put the bottom at the top and there's no border, right? Or at
least the border's reduced to that little quarter-inch bit that's always
at the top?
 
 Nope. Still getting the half inch, *as though it was still printing the
bottom of the page at the bottom*.
 
 After fussing with this for a half hour or so, using up probably 20
sheets of paper and more ink than it would have taken to print the whole
project eight times over, I finally realized what it was:
 
 Microsoft Publisher is trying to help.
 
 Rather than letting the printer take care of the fact it can't print
that last half inch, Publisher is actually determining the capabilities
of my printer and sending the print job to the printer *minus that half
inch*, anticipating the border the printer will require.
 
 And there's the problem with software trying to be too smart. I'm not a
big Publisher wiz by any means, but in no dialog I've seen has there
been an option for "Stop trying to help me by optimizing the printer
output and nuking the half inch I really wish was there." It's designed
for folks who need the default options, making intelligent guesses at
what needs to happen.
 
 This is why I shy away from software that exposes only exposes the big
"DO IT" button. Sometimes the big "DO IT" button is exactly what I need.
Maybe even 70% of the time. The rest of the time, I need the options. If
there's something you're going to automatically assume for me -
*especially with respect to printing when you're a printing program* - I
need to be able to override it. Ah, the trouble with intelligent
software.
