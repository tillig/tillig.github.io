---
layout: post
title: "Microsoft Patterns & Practices Summit 2007 - Day 5"
date: 2007-11-09 -0800
comments: true
disqus_identifier: 1300
tags: [GeekSpeak]
---
<!--markdownlint-disable MD036 -->
**The topic of Day 5: Applications.**

**Keynote - [Scott Hanselman](http://www.computerzen.com)**

Yes, you're reading that right - Hanselman keynoted two days in a row.
This time the presentation tended toward the humorous and sort of tied
things in with a message to the community that was basically the end of
Bill and Ted's Excellent Adventure:  "Be excellent to each other... and
party on, dudes!"  You know, in so many words.

There was a snap-on demo of some more MVC, but generally that was it.  I
like Scott - he's a friend - and I thought the presentation was
hilarious, but I had a little difficulty tying it in to "patterns and
practices" or to the theme of the day - "Applications."  That said, if
he posts the video of the presentation to his blog, watch it.  It's a
crack-up.

**Future of Patterns and Practices - Rick Maguire**

Maguire discussed the challenges that the patterns and practices team
faces and talked about where things are headed.  Challenges they see are
things like technology changes (so many changes so quickly), increasing
complexity of software, and compliance with standards and regulatory
issues.

What the future boils down to: They've focused previously on tools.
They're switching focus to developer centers and documentation - helping
people find which tools will help them get the job done.

**Evolving Client Architecture - [Billy
Hollis](http://www.dotnetmasters.com/)**

Hollis discussed some of the recent changes in client technology -
specifically around WPF and Silverlight.  He gives the impression that
WPF is the Way and the Light.  I think it's interesting stuff, but
somehow I don't think it's the End All Be All.  At least, not yet.

The basic idea, though, was that it's a good thing if you're looking at
XAML.  It's got a good programming model and will allow you to get some
of the reuse that you weren't previously able to achieve before.  (But
it'll be better when Silverlight 1.1 is done.)

**Introduction to the Microsoft Client Continuum - [Kathy
Kam](http://blogs.msdn.com/kathykam)**

This was almost a continuation of the talk Hollis gave, talking about
the variety of clients you can target with .NET technologies.  The
discussion here was more on the variation between having wide reach with
your app - standard HTML via ASP.NET - and having a rich experience -
using WPF in a native app.

The interesting thing here was an illustration of how you can reuse
components across some of these.  For example, say you have a straight
HTML app.  Not rich, but very client-accessible.  In a basic Silverlight
app, you can take the same HTML app you had and add richer interactivity
in select portions of the app (like replacing an image with a XAML
content block).  In your native app, you can take the XAML that you used
in the Silverlight/HTML app and use it in your WPF app.  Very cool.

The technologies she reviewed, on the scale of "reach" to "rich":

- ASP.NET 2.0
- ASP.NET 3.5
- Silverlight 1.0
- Silverlight 1.1
- WPF 3.0
- WPF 3.5

**Fresh Cracked CAB - [Ward
Bell](http://www.neverindoubtnet.blogspot.com)**

This was one of the talks that I think I can take back and immediately
start using some of the ideas from.  Bell showed how he uses the
[Composite UI Application
Block](http://msdn2.microsoft.com/en-us/library/aa480450.aspx) to better
architect applications.  (There's a Composite Web Application Block as
part of the Web Client Software Factory... but I don't know how
applicable this was.  Still, this was an interesting thing.)

There was some explanation about how the CAB works, which was good, but
it got really good when he started talking about some of the patterns
used.  Of particular interest was a slight addition he made to the MVP
pattern - MicroViewControllers (yeah, it's "MVC," but not in the sense
we normally think about "MVC").

Think about this - how many times do you basically have what amounts to
generated code where you...

- Data bind model information to controls?
- Set error provider information?
- Set control visibility/editability?
- Format data in the view?
- Localize control text?

All that just fattens up the interfaces and makes code cumbersome.  The
idea of the MicroViewController is that it's a facade over all of these
things - a single object shared between the view and the presenter to
handle all of that.

Think code like:
`cvc.AddDescriptor(ageTextBox, properties.Age).WithLabel(ageLabel).WithEditability(Editability.ReadOnly);`

Very cool stuff.

**Wrap-Up - [Billy Hollis](http://www.dotnetmasters.com/)**

A fantastic and entertaining rant from Hollis about how, frankly,
there's just too much out there to learn.  You'll never know everything
you need to know, especially with the changes coming at us fast and
furious.  And it's not just technology - it's even IDE features.  Which
just goes to show we can't solve this problem with more features - that
just adds to the complexity.

And we have no one to blame but ourselves.

The question now is - how do we fix it?  Maybe some ideas here...

*The Simplicity Manifesto v1.0* (per Billy Hollis):

- Stop adding features.
- Make help helpful.
- Fix the bugs.
- CRUD for free.
- Hide the plumbing.
- Get better names.
