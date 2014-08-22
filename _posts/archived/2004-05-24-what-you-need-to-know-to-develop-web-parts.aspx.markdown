---
layout: post
title: "What You Need To Know To Develop Web Parts"
date: 2004-05-24 -0800
comments: true
disqus_identifier: 571
tags: [Web Development]
---
I did some consulting a while back with a company who wanted to port
their product into SharePoint Portal Server 2003 and they wanted to know
how to develop web parts. The problem was, they didn't quite have the
technical background I assumed they did, so we spent a lot of time
covering prerequisite knowledge and not too much time actually looking
at web parts. That started me thinking that there are probably people
out there who want to make web parts (either on Windows SharePoint
Services or SharePoint Portal Server 2003) and they don't really know
where to start.
 
 Below is my recommended path to web parts - from "not knowing how to
program" all the way to "Hello World, web part style." Once you've got
web parts down, making them fancy and ultra-functional is up to you.
 
 **Learn HTML.** While it's important to note that HTML (HyperText
Markup Language) is *not* a programming language (it's a "markup
language" - it describes how things *look* not how they *function*),
knowing HTML is a key factor in developing web parts. Plus, because it's
reasonably easy to learn and you can see the results of your progress
immediately (check it out in a browser while you're writing), you should
definitely [learn HTML
first](http://www.w3schools.com/html/default.asp).
 
 While learning HTML, keep in mind that eventually you're not really
going to get a whole lot of trial-and-error testing to see how your web
part looks (it's a very, very slow process if you go that route), so
even if you learn HTML using a WYSIWYG (what you see is what you get)
editor like FrontPage or DreamWeaver, make sure you can write HTML by
hand in something like Notepad. Having HTML down cold is a key to
success. Web parts (like any standard web page or piece of a web page)
display themselves in HTML.
 
 **Learn CSS.** CSS, or [Cascading Style
Sheets](http://www.w3schools.com/css/default.asp), go hand in hand with
HTML. CSS is a way to define the look of HTML more precisely. There are
lots of other benefits to CSS, but you'll learn about those as you learn
how to use it. Regardless, web parts use CSS to maintain a standard
format in their look and feel so knowing how to use CSS will ensure your
web part looks consistent with the rest of the web parts on your page.
 
 **Learn general programming concepts.** This is a little hard to
describe, but this point is why they have computer *science* classes.
What I mean here is you should learn things like data structures (what
the different ways computers can store and manipulate data are), control
structures (how you tell the computer what the next instruction is that
you want it to run), and so forth. Usually when you learn about these
things you also get taught a programming language, but I will work under
the assumption that you might learn this stuff without actually learning
a language. There are several books out there on these subjects, but I'd
recommend possibly taking the first-year classes in a Computer Science
degree program at your local university rather than just reading about
it. Having some hands-on interaction always makes concepts like this a
little easier to understand. You'll need to know this stuff so you can
program your web part and also so you know how your web part might store
custom properties. You will use this in any programming project you do.
 
 **Learn batch scripting.** [Writing a batch
script](http://www.ericphelps.com/batch/) is probably the simplest
introduction to programming there is. While it doesn't directly pertain
to web part creation, it does give you insight into the programming
world in a simple, easy to learn way. It requires no compiler or special
environment to write or debug, and there are few keywords to remember.
Note that if you learned a different programming language while learning
general programming concepts, above, you can skip this step. This is
just to get your feet wet.
 
 **Learn JavaScript.**
[JavaScript](http://www.w3schools.com/js/default.asp) is a good
introduction to a more structured programming language (at least, more
structured than batch scripting). Plus, you can use this directly with
your HTML and CSS skills to make some cool web pages with some great
functionality. Not only that, but you will be able to use your
JavaScript skills once you start writing web parts to port that
functionality in. Web parts are not written in JavaScript; JavaScript
can help you accomplish some fancy things on the client (browser) end,
though.
 
 **Learn VBScript.** [VBScript is a stepping
stone](http://www.w3schools.com/vbscript/default.asp) to the next
technology you'll learn, Active Server Pages (below). While you can
write ASP in JavaScript, you'll find most of the examples out there are
in VBScript and it just makes it easier to learn ASP if you know
VBScript. You'll also be able to use this (and your JavaScript) in place
of batch scripting, so if you wanted to write some handy utilities for
yourself to automate some tasks, you now have the skills.
 
 **Learn ASP.** ASP, or [Active Server
Pages](http://www.w3schools.com/asp/asp_examples.asp), is the technology
by which you insert script (like VBScript) into an HTML page. That
script executes on the web server and renders HTML to the browser. This
is a powerful thing - it allows you to take input in from the user,
process it, and then return results. This is the grandfather technology
to web parts, so you'll need to understand how this works to really
understand why your web parts do what they do.
 
 **Learn C\#.** The Microsoft .NET framework can be programmed in any
number of languages, but [I recommend
C\#](http://msdn.microsoft.com/vcsharp/). Web parts are all compiled
.NET components, and you'll need to know the language to write them in.
It doesn't matter right now if you're learning just simple console
applications or Windows applications or whatever, just learn how C\#
works.
 
 It's at this point that I recommend you spend the money to get a copy
of [Visual Studio](http://msdn.microsoft.com/vstudio/), the programming
envirionment of choice when working with anything .NET. There are [free
alternatives](http://www.icsharpcode.com/OpenSource/SD/Default.aspx) out
there, but I'd still recommend getting actual Visual Studio.
 
 **Learn Windows SharePoint Services and/or SharePoint Portal Server.**
Now it's time to take a short detour and actually install WSS or SPS
2003. If you haven't already, get this fired up and learn it inside and
how. Learn how to configure it, how to add and remove web parts from Web
Part Pages, how lists work... everything. Know the product, because when
it comes time to write for the product, it'll make your life that much
easier.
 
 Also, take some time to see how the product(s) work. You'll see that
they're using HTML, CSS, and JavaScript to make things happen on the
browser end. With your newly learned skills, check this out and see if
you can determine what makes different things happen.
 
 Note - if you've used SharePoint Team Services or SharePoint Portal
Server 2001, don't assume you know all you need to here. It's a better
assumption that you don't know anything about the product, since WSS/SPS
are so very different than their previous incarnations. Even if you've
used these prior products, take this time to get intimately familiar
with the new versions. You'll thank me.
 
 **Learn ASP.NET.** ASP.NET, the .NET version of Active Server Pages, is
the backbone of Windows SharePoint Services and SharePoint Portal Server
2003. Web Part Pages are all ASP.NET pages, so knowing how ASP.NET web
forms and controls work is an absolute must. Write a small web site that
takes some data in, handles some button click events, does something
with some data, and spits it back out. Look at what you wrote compared
to what ASP.NET generates for you. You'll see some extra stuff in there
that you didn't put there. If you installed and checked out WSS or SPS
2003, some of it will look familiar - the standard ASP.NET stuff in your
pages will look a lot like the standard ASP.NET stuff in WSS/SPS. It's
all starting to come together, isn't it?
 
 This is also the step where you really need to learn how to use the
Visual Studio debugger. Up until now, you've probably been writing out
text lines to the screen to debug your problems, right? Sure you have -
everyone does. Now you need to learn how to do it with a real debugger.
Learn how to debug ASP.NET web pages on your local development
workstation, then learn how to debug ASP.NET web pages on a remote
machine. It's a similar process, but you'll want to know both because
chances are you won't be developing right on a WSS or SPS server -
you'll write your code, compile it, deploy it to a test server, and then
need to remote debug it.
 
 **Really, learn ASP.NET.** I can't stress this enough. You need need
need need to learn ASP.NET to get web parts running successfully. Learn
it inside and out. All the fancy stuff. Don't rely on the WYSIWYG
designer - learn to write it in code view. When you get to web parts,
there's no designer ability, so you can't assume that will be there.
Learn what you can about Session state, Viewstate, caching, and so on.
*You will use everything you learn in ASP.NET while you develop web
parts.* Be very, very comfortable with ASP.NET - web parts are just
specialized ASP.NET.
 
 **Learn ASP.NET web server (custom) controls.** "Custom controls," "web
custom controls," or "web server controls" - all of these are the same.
This is different than user controls. In ASP.NET, user controls are sort
of like miniature ASP.NET web forms that can be embedded into other web
forms. That's not what I'm talking about here. You know when you're
working in ASP.NET and you can drag a "text box" or a "button" onto your
form? Those are server controls. Those are what I'm talking about, and
those are what you need to learn to write. It's a little more
complicated than writing your standard web form, but this is *crucial* -
**web parts ARE ASP.NET server controls**. This is pretty much what
you've been building up to this whole time. Learn to write server
controls and you're there.
 
 **Download the SPS/WSS SDK documentation.** The [SDK
documentation](http://www.microsoft.com/downloads/details.aspx?FamilyID=1C64AF62-C2E9-4CA3-A2A0-7D4319980011&displaylang=en)
contains code samples and notes on how to write web parts. If you've
learned all of the stuff in this list up until now, this should make
total sense to you.
 
 **Write your first web part.** Using the code samples in the SDK, write
your very first web part. It doesn't have to be anything fancy, and you
can even copy and paste the example code they've given you. Just get it
running in WSS or SPS. Now, step through it in the debugger to see how
it works. Once you get it, the world is yours. Read through the SDK and
you'll learn how to save custom properties, how to interact between web
parts... now you're ready to really cut loose.
 
 
 That's it! It seems like a long list, but you have to figure there's a
reason that developers get paid to write programs - if you could learn
it all in a day, everyone would be doing it. That said, if you take the
time to figure out how the technology works, then progress through the
steps, you, too, could soon be writing your very own web parts.
