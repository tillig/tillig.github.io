---
layout: post
title: "Mocking Debate Heats Up"
date: 2006-10-05 -0800
comments: true
disqus_identifier: 1084
tags: [dotnet,testing,process]
---
I posted last week a short discussion about [whether mock objects are
too powerful](/archive/2006/09/28/are-mock-objects-too-powerful.aspx)
for most developers. The question originates based on the impression
that people may use mock objects in an incorrect way and effectively
invalidate the unit tests they write. For example, using mock objects
you might actually set up a test and mock out a system state that will
never actually be reached. Not so great.

 In the end I came to the conclusion that it's more of an education
thing - as long as the person using the tool has a full understanding of
what they're doing, mocks are a great thing.

 I used a couple of mock frameworks and [then came across
TypeMock](/archive/2006/09/28/mocking-with-typemock.aspx), a mock
framework for .NET that has significantly more power and features than
other .NET mock frameworks out there. I instantly fell in love with it
because it not only made mocking so easy with its natural syntax and
trace utility (among other things), but it has the ability to mock
things that many other frameworks don't - calls to private methods,
constructors, static method calls, etc.

 [![Wanna Be Startin'
Somethin']({{ site.url }}/images/20061005wbss.jpg)](http://en.wikipedia.org/wiki/Wanna_Be_Startin'_Somethin')That's
where the debate really heats up. There are effectively two schools of
thought - "design for testability" and "test what's designed."

 In the "design for testability" school, a lot of effort goes into
designing very loosely coupled systems where any individual component
can be substituted out for any other individual component at test time.
The systems here are generally very "pluggable" because in order to test
it out, you need to be able to swap test/mock objects in during the unit
tests. Test driven development traditionally yields a system that was
designed for testability since unit tests have to cover whatever's
coded.

 In the "test what's designed" school comes at it from the other
direction. There's a notion of what the system needs to do and the
software gets written to do that, but unit tests are generally written
after the fact (yes, shame, shame, shame). "Pluggability" is
specifically crafted into the places it needs to be rather than
anywhere. Test driven development hasn't generally worked for systems
like this.

 In some cases it's a religious argument, and in some cases it's not.
[Miki Watts picked up my
post](http://orb-software.com/cs/blogs/green_dragons_lair/archive/2006/10/01/361.aspx)
and you can tell there's a definite trend toward "design for
testability" there. He argues that [my mocking
example](/archive/2006/09/28/mocking-with-typemock.aspx) isn't valid -
that proper design might have dictated I pass around an interface to the
factory and mock the factory's interface rather than mocking the static
call to the factory to get the desired behavior in testing.

 [Eli Lopian (CTO of TypeMock) picked up my post as well as Miki's
post](http://www.elilopian.com/2006/10/04/more-posts-on-the-typemocktestability-issue/)
and argues that the lower coupling of the code (passing around the
interface to the factory - an interface that didn't previously need to
exist and that consuming classes really shouldn't know/care about)
lowers the cohesion of the code.

 I won't lie - I'm a "test what's designed" person. The thing that I
always come back to, that the "design for testability" folks can't seem
to account for, is when API is a deliverable. The code needs to look a
certain way to folks consuming it because the customer is a developer.
Sure, it's a niche, but it's a valid requirement. If I design for
testability, my API gets fat. Really fat. I have interfaces that only
ever get one implementation in the production setting. I have public
methods exposed that should/will never be called by consumers wanting to
use the product.

 My experience has shown that it's also a pain to be a consumer of
products architected like that. Let's use a recent experience with
[CruiseControl.NET](http://ccnet.thoughtworks.com/), the continuous
integration build server. That thing is architected to the nines -
everything has an interface, everything is super-pluggable, it's all
dependency-injection and factories... amazing architecture in this
thing.

 Ever try to write a plugin for CruiseControl that does something
non-trivial? It's the very definition of pain. The API clutter (combined
with, granted, the less-than-stellar body of documentation) makes it
almost impossible to figure out which interfaces to implement, how they
should be implemented, and what's available to you at any given point in
execution. It's a pain to write for and a pain to debug. The
architecture gets in the way of the API.

[![Catch-22]({{ site.url }}/images/20061005catch22.jpg)](http://www.amazon.com/exec/obidos/ASIN/0684833395/mhsvortex)Yeah,
you could make the "internals" of the product designed for testability
and throw a facade on it for consumers of the API. You still have to
test that facade, though, so you get into a catch-22 situation.

 Enter "testing what's designed." You have a defined API that is nice
and clean for consumers. You know what needs to go in and you know what
needs to come out. But you can't have 150 extra interfaces that only
ever have a single implementation solely for testing. You can't abstract
away every call to any class outside the one you're working on.

 The problem with "testing what's designed" was that you couldn't do it
in a test-driven fashion. The two notions were sort of counter to each
other. With a framework like TypeMock, it's not - I can keep that API
clean *and* move to a test-driven methodology.

 Here's another example that is maybe a better one than last time. Let's
say you have a class that reads settings from the application
configuration file (`app.config` or `web.config`, as the case may be).
You use `System.Configuration.ConfigurationSettings.AppSettings`, right?
Let's even abstract that away: You have a class that "uses settings" and
you have an interface that "provides settings." The only implementation
of that interface is a pass-through to
`ConfigurationSettings.AppSettings`. Either way, at some point the
rubber has to meet the road and you're going to have to test some code
that talks to `ConfigurationSettings.AppSettings` - either it's the
class that needs the settings or it's the implementation of the
interface that passes through the settings.

 How do you test various settings coming back from
`ConfigurationSettings.AppSettings`? Say the setting needs to be parsed
into a `System.Int32` and if there's a problem or the setting isn't
there, a default value gets returned. You'll want to test the various
scenarios, right? Well, in that case, you can overwrite the `app.config`
file for each test, which isn't always necessarily the best way to go
because putting the original `app.config` file back is going to be error
prone... or you can set up an intricate system where you spawn a new
application that uses your class and has the specified test
configuration file (waaaaay too much work)... *or you can mock the call
to `ConfigurationSettings.AppSettings`.* In this case, I'm going to mock
that bad boy.

 Let's say you disagree with that - either you don't think you need to
test the interface implementation or you should go down the intricate
temporary application route: More power to you. Seriously. I don't think
"not testing" is an option, but I also have a deadline and writing a
bajillion lines of code to test a one-shot interface implementation is a
time consumer.

 On the other hand, let's say you agree - that mocking the call to
`ConfigurationSettings.AppSettings` is legit. That sort of negates the
need for the one-off interface, then, doesn't it? From a "you ain't
gonna need it" standpoint, you've then got an interface and one
implementation of the interface that really are unnecessary in light of
the fact you could just call `ConfigurationSettings.AppSettings`
directly.

 But if it's okay to mock the call to
`ConfigurationSettings.AppSettings`, why isn't it okay to mock a call to
a factory (or settings provider, or whatever) that I create?

 Hence [my original example of mocking the call to the
factory](/archive/2006/09/28/mocking-with-typemock.aspx) - if there's no
need for all the extra interfaces and loose coupling solely to abstract
things away for testing (or you don't have the option because you can't
clutter your API), then mocking the call to the factory is perfectly
legitimate. I'm not testing the output of the factory, I'm testing how a
particular method that uses the factory will react to different outputs.
Sounds like the perfect place for mocking to me.

 Miki also calls me out on testing abstract classes: *Speaking of
abstract classes, I don't think they should be tested as a seperate part
in a unit test... abstract by definition means that something else will
inherit from it and possibly add to the default behaviour, but that
class on its own will never exist as an instance, so I'm not sure where
mocking comes into the picture.*

 Let's use the .NET framework as an example. Take the class
`System.Web.UI.WebControls.ListControl` - it's an abstract class. It
doesn't stand on its own - other classes inherit from it - but there is
some specific default behavior that exists and many times *isn't
overridden*. From the above statement, I get the impression that Miki
believes every class that derives from
`System.Web.UI.WebControls.ListControl` has its own obligation to test
the inherited behavior of `System.Web.UI.WebControls.ListControl`. I
feel like this would create a lot of redundant test code and instead opt
to have separate tests for my abstract classes to test the default
behavior. That releases the derived classes from having to test that
unless they do specifically override or add to the default behavior and
it allows you to isolate the testing for the abstract class away from
any given derived object. But since you can't create an abstract class
directly, you end up having to create a dummy class that derives from
the abstract class and then test against that dummy class... *or you
could mock it and test the behavior against the mock.* Again, the easier
of the two routes seems to me to be to mock it.

 Maybe Miki is right - maybe I don't get the idea of unit testing or the
benefits that come from them. That said, using success as a metric,
somehow I feel like I'm getting by.
