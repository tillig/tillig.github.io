---
layout: post
title: "Still Torn On Blog Migration"
date: 2005-04-28 -0800
comments: true
disqus_identifier: 805
tags: [blog]
---
I'm still torn on whether I should convert from pMachine to dasBlog as
my blog software.

There's some odd stuff with caching going on behind the scenes in
dasBlog because it's a filesystem-based package. pMachine doesn't do
that. Stuff like creating a second copy of all of the metadata attached
to all of the comments on the entire site. If it's stored with the
comment, and it's only used as a cache, why is it a physical file to
begin with? Does it ever get rebuilt? Having a separate cache that is,
in effect, a disparate data source from the actual data is asking for
integrity problems.


The templates really bug me. The more I think about it, the more they
bug me. I appreciate that the idea is to allow for folks that "just know
HTML" to code up a template and run with it. As such, they use sort of a
string-macro-substitution scheme where a huge set of undocumented "magic
words" can be used to insert a bunch of stuff in an undocumented format
into your page using undocumented CSS classes that you don't get to
choose. It's an ASP.NET app - what happens if I want to add, say, a
textbox to it? Or a treeview? Or any other ASP.NET server control that I
could dream up? Right now, I've got to do some fancy
tap-dancing-and-jazz-hands to put the server control into a user control
and... uh, no. Seriously.


If the templates were made for a user who "just knows HTML" to use, how
come the setup and upgrade procedures take an ASP.NET guru to figure
out?


I shouldn't have to modify the administrative interface to get it to do
things I want. Nor should I have to manually log in to the server,
download a config file, edit it, then re-upload it due to lack of an
administrative interface. Ever. If you add the feature and it requires
config, you add the admin interface.


If everyone using dasBlog is using some external application (i.e.,
BlogJet) to post entries, it occurs to me that this means not one, but
two things: First, that BlogJet is cool and convenient to use. Second,
that there is a dire shortcoming in the built-in interface to create new
entries that needs to be addressed. If it's so inconvenient to use, what
is it that makes it inconvenient? Address that.


While we're on the topic of the built-in new entry interface, the usage
of text editing components must be questioned. I know the dasBlog guys
weren't responsible for FreeTextBox or the way it munges up HTML. That's
fine. But here's the deal: clean HTML isn't important to some folks, but
it really is to others, particularly when trying to apply complex CSS.
Seriously. As far as I'm concerned anymore, it's XHTML compliant or
bust. (No, my current blog does not adhere to XHTML standards; that's
part of why I want to update. To get a nice, clean template that does.)
Even if that means I enter a new entry in a plain old textbox manually
(which is what I currently do anyway).


I might want the ability to upload images into one folder and other
content, like downloadable software, into another folder. I, further,
might even want a file browser so I can see (without having to FTP) what
I've got up there and delete or rename files as I see fit. Hook me up,
guys. It's not rocket science.


If it doesn't *just work* without tweaking, don't put it in. If it's not
going to be documented so people can take advantage of it, don't put it
in. If you have to know how to create a nuclear accelerator out of duct
tape and toothpicks in order to use it, don't put it in. (This sort of
goes back to the trouble with the administrative interface - complete
configuration of the site can't really be achieved through the admin
interface right now, so you have to know where/how certain things work -
undocumented - in order to get things configured just so.


Where was the common sense when writing some of this stuff. If you have
a class called `DayEntry` and that class has a static method like
`OccursBefore(DayEntry entry, DateTime dt)`, then it occurs to me that,
since you have to have a DayEntry instance *anyway*, the method should
be an instance method, not a static one. Am I wrong? (There's a lot of
that kind of stuff in there.)


 I know what's going to happen here. I'm going to convert over to
dasBlog and get pissed off that there are weird things in there. I'm
going to rewrite the thing and have to run a fully custom implementation
just so I can get things done. I guess I should just accept it now.
Unless you dasBlog folks want to go on a major cleaning spree? Stop
adding new features and make the existing product solid. Not just solid,
but ***solid***.
