---
layout: post
title: "Book Review: Professional ASP.NET MVC 1.0"
date: 2009-09-22 -0800
comments: true
disqus_identifier: 1566
tags: [GeekSpeak,Web Development,.NET]
---
[*![](http://ecx.images-amazon.com/images/I/41vsFoLZq9L._SL160_.jpg)*](http://www.amazon.com/gp/product/0470384611?ie=UTF8&tag=mhsvortex&linkCode=as2&camp=1789&creative=390957&creativeASIN=0470384611 "Professional ASP.NET MVC 1.0")*[Professional
ASP.NET MVC
1.0](http://www.amazon.com/gp/product/0470384611?ie=UTF8&tag=mhsvortex&linkCode=as2&camp=1789&creative=390957&creativeASIN=0470384611)*
is definitely one of those books you should have on your shelf if you
work with ASP.NET MVC or are considering the move. It covers a good
range of topics at a nice level of detail, which is surprising
considering it's not one of those four-inch-wide mammoths you're
probably familiar with.

The topics covered are:

1.  NerdDinner - A walkthrough of making a fully-functioning MVC app
    from start to finish
2.  Model-View-Controller and ASP.NET
3.  ASP.NET \> ASP.NET MVC
4.  Routes and URLs
5.  Controllers
6.  Views
7.  AJAX
8.  Filters
9.  Securing Your Application
10. Test Driven Development with ASP.NET MVC
11. Testable Design Patterns
12. Best of Both Worlds - Web Forms and MVC Together

Nearly half of the book is the first chapter, which is a really nice
walkthrough of creating an MVC site from File -\> New Project all the
way to AJAX integration with maps. It covers more than just MVC
including database creation and a few design pattern intros. While it
stands alone (and is [available for free
online](http://tinyurl.com/aspnetmvc)), it whets your appetite to see a
little more detail on each aspect of the framework.

After the first chapter, the rest of the book is kind of like one of
those movies you see that's told through flashbacks - you've already
seen some high-level end-to-end stuff and now it's time to get the back
story.

Chapters 2 and 3 are primarily about comparing and contrasting ASP.NET
MVC with other things: other MVC frameworks (both .NET and non-.NET
based) and ASP.NET web forms. They explain why you might (or might not)
want to choose to use the ASP.NET MVC framework and talks a bit about
why the MVC pattern is good. While interesting, some of these chapters
came across a bit like a sales pitch, which got in the way of the
message.

Chapter 4 covered a good deal on routing including how it works, how to
extend it, and how it compares to URL rewriting. It helps when reading
about routing if you have at least an entry-level understanding of
regular expressions since they're used a lot in routing and that
experience is assumed. (If you don't, I recommend *[Mastering Regular
Expressions](http://www.amazon.com/gp/product/0596528124?ie=UTF8&tag=mhsvortex&linkCode=as2&camp=1789&creative=390957&creativeASIN=0596528124)*
- it's one of those mainstay books you should have on hand at all
times.)

Chapter 5 on controllers walks you through the simplest case of creating
a controller all the way through some fairly complex cases. The authors
also touch a bit more on the "model" part of "Model-View-Controller"
here with explanations of model binders (how you get data in and out of
your model) as well as input validation (which they acknowledge is
currently "a very simple, but limited" mechanism).

Chapter 6 discusses the role of the view in "Model-View-Controller" and
explains ways to work with views, how to change the engine that renders
the views, and when your controller should directly return data vs. use
a view. They talk a little about what views should NOT do, but there was
no discussion on what views SHOULD do. Folks new to MVC can find all
sorts of gray areas where something might be able to happen in the view
or the controller and in a somewhat opinionated framework it would have
been nice to see what the authors (and/or the product team) thought were
good candidates for logic that belongs in the view.

Chapter 7 talked about the pros and cons of using AJAX in an application
and how to recognize and handle AJAX requests to your controller. It
showed how to deal with a browser that has script disabled, which isn't
normally covered by these sorts of books and was nice to see. A lot of
the chapter was HTML and script, as you'd expect in a discussion of
AJAX, but isn't really what you paid your admission to see. Regardless,
it has a place in the book and was worth addressing.

Chapter 8, on filters, was a great explanation of what I think is one of
the more deep topics in ASP.NET MVC. This chapter is a great reference
on exactly how filters work and includes a great explanation of the
order of execution for filters. Plus, there's a whole subsection on
filter naming conventions, which made me happy since naming conventions
are usually entirely ignored in books like this.

Chapter 9 was more about the different types of attacks that someone can
use on your site than anything. It seems like it was meant to put some
level of fear into you, to scare you into wanting to secure your app.
It's a good discussion, but it felt a little misplaced and goes on for
quite a while. If you're not at all familiar with web site
vulnerabilities, you'll find this interesting; if you've been doing web
work for a while, this will be old hat. Of course, they do end up
explaining how to address some of these attacks and how MVC helps you,
which is the part you'll want to read.

One thing that they don't mention when discussing cross-site request
forgery is that the prevention MVC comes with makes the assumption that
the user is browsing with a trusted, secure browser. With browser
vulnerabilities constantly being discovered and patched, this isn't
always a safe assumption. Most CSRF prevention measures that come with
web frameworks make that assumption and it feels like a huge miss when
it's not mentioned in the middle of a security chapter.

Chapters 10 and 11 talk about how to test an ASP.NET MVC app and how to
use certain design patterns to make your app more testable. These are
chapters that are missing from almost every book out there and seeing
them included is like a breath of fresh air. Many of the patterns
discussed here are applicable outside ASP.NET MVC as well, making the
discussion doubly valuable.

The final chapter talks about all the ways you can work with both
ASP.NET web forms and MVC together. Whether you have an existing web
forms project you want to add MVC into or an MVC project you want to add
some web forms into, this chapter walks you through step-by-step with
screen shots and everything. It even talks about how to migrate an
ASP.NET web forms app into an MVC app. Good stuff.

Through it all, the tone of the book is nice and light, fairly informal.
It makes reading the book easy and keeps you interested. It would be
nice if more books were written like this. There are also interesting
asides from the product team, filling you in on their reasoning on why
certain features behave the way they do and why certain design choices
were made.

Also, any time a new design pattern is introduced or discussed, the
authors take the time to explain some of the background on the pattern
and why it's good. You don't see that in many books - usually the
pattern is just used with no explanation as to why.

I've seen a couple of other reviews that mention how it's not technical
enough or doesn't go into enough detail. I don't think the goal of this
book was to cover every edge case or offer solutions to every possible
problem. I also don't think it's meant to be a reference that covers
every method on every class available in the framework. It does a good
job introducing the concepts of MVC and taking you down to a good
intermediate level of development - more than "beginner" but less than
"guru" - and (surprise!) it's *readable*. I think that goes a long way.

This is a great book and I'd recommend it to anyone who has considered
using ASP.NET MVC or is even just interested in learning more.

