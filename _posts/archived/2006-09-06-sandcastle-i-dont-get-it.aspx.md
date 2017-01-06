---
layout: post
title: "Sandcastle: I Don't Get It"
date: 2006-09-06 -0800
comments: true
disqus_identifier: 1068
tags: [GeekSpeak]
---
I've finally taken some time and looked at
[Sandcastle](http://www.sandcastledocs.com), the new Microsoft
alternative to API documentation rendering. Now that I've used it, I've
decided that either Microsoft is jumping the gun on releasing this thing
as any nature of "Community Technology Preview" or Microsoft just
generally hates people who need to compile documentation.

 "But why," you might ask, "would you say something like that?"

 You, the asker of such a question, have obviously not used Microsoft
help compilers.

 First Microsoft gave us HTML Help Workshop. If you haven't used HTML
Help Workshop, save yourself the trouble. It sucks. It's the epitome of
late 90's UI design that basically gives you no indication of what to do
or how to do it. RTFM, you loser. You are not smart enough to start up
HTML Help Workshop and go.

 But HTML Help Workshop is what we've got and that's about where it
stayed. It comes with the HTML Help Compiler, which basically crunches
all of your HTML help documents into one file that can be distributed -
a CHM file. The HTML Help Compiler is actually the important part of the
workshop package and is generally the only piece that any normal human
can take advantage of.

 The problem then becomes figuring out what all the pieces are to get
the compiler to run. You've got your project file, your index file, your
table of contents file, your HTML files that actually contain the body
of your help... it's clunky.

 Enter products like [RoboHelp](http://www.adobe.com/products/robohelp/)
that make the process simpler for the standard documentation person.
Docs get written, the clunkiness of the process gets abstracted away,
and out the back end comes the CHM. Magic! The world forgets about HTML
Help Workshop and uses products that work.

 Fast forward a bit and along comes along .NET, with its fancy inline
XML documentation comments. A stroke of genius, really - you can write
your API doc along with the code it corresponds to and automatically
create an XML document with that API documentation that can be
transformed however you like.

 For a very short period of time (relatively speaking), we were back to
clunky, but before you know it, lickety-split, we have
[NDoc](http://ndoc.sourceforge.net) rescuing us. Not only that, but NDoc
extends on the basic set of XML tags (sort of the way Netscape and IE
"extended" HTML and ended up helping to shape the standard) to encompass
common elements that get documented.

 Anyone who is anyone uses NDoc. Seriously. We all use it, we all love
it, it's the de facto standard for generated API documentation. The
really cool thing is that not only is it simple to use by itself, but
it's integrated into NAnt, so it can be automated in the build. It's The
Way and The Light.

 So we're in the Age of Not Clunky and chugging along great...

 ...until Microsoft trots up and chucks this... thing... out there
called "Sandcastle" that they apparently use to render their own
internal documentation. The community seems to want to latch onto this
thing, but the truth of the matter is: it sucks. And you know why? We're
back to clunky. It's just as difficult to use as HTML Help Workshop.
Microsoft hasn't made a single step forward on the path to easy help
generation, they just keep throwing half-baked tools at it.

 For the record, I'm using the August 2006 CTP of Sandcastle as the
basis for my statements. I've got some test classes that I have for
[CR\_Documentor](/archive/2004/11/15/cr_documentor-the-documentor-plug-in-for-dxcore.aspx)
that I use to see if CR\_Documentor renders the preview the way NDoc
does. Today I got the Sandcastle docs building for my test classes so I
could get started on the Sandcastle renderer in CR\_Documentor.

 Holy crap.

 I mean, seriously.

 First, it takes 12 steps to render a CHM out of Sandcastle, each step
involving running a different command-line tool to transform this XML
into that XML or compile this HTML into that CHM or whatever. In fact,
the last line is a call to the HTML Help Compiler previously mentioned,
so don't forget to have that installed.

 Okay, so that's not horrible, and it can be automated, but one would
think that the automation scripts would be part of the CTP.
Unfortunately, not so much. The community has rallied and there are now
upwards of ten different GUIs and scripts and tools to automate this
thing, most of which will become obsolete when (if) we get something
decent out of the Sandcastle team.

 Let's ignore the bajillion step process for a moment, though. Let's
instead look at the documentation they provided to help us get going
and... what? What's that you say? No documentation provided?

 *That's awesome.*

 Okay, so bajillion-step-process and
distinct-lack-of-any-sort-of-formal-documentation aside, what's really
eating me here is the lack of out-of-the-box support for tags we NDoc
users all sort of consider standard. For example, the
`<see langword="null" />` sorts of things that are strewn throughout
documentation but are blatantly missing from Sandcastle.

 I found [a forum on this very
issue](http://forums.microsoft.com/MSDN/ShowPost.aspx?PostID=669198&SiteID=1)
and the recommendation from the Sandcastle team thus far is to modify
the "main\_sandcastle.xsl" file to add custom support for the tags.

 Commonly used tags as a "custom extension" is a patently unacceptable
solution. It's sort of like someone saying, "Yeah, we just came out with
this new VCR, but only tapes from Maxell will play in it. In some cases
you'll luck out, but in most cases you will probably have to do some
extra work to fix the VCR so it'll play the rest of your tapes."

 I've posted to the forum that I think they should support more
out-of-the-box tags rather than sticking to the small subset that appear
in the MSDN documentation. We'll see what comes of it. Right now I can't
even get all of the standard tags to render right. For example, good
luck getting a `<list />` to render (which is one of the tags they
actually list in the MSDN documentation as supported). I sure haven't
succeeded. Sort of puts a damper on the CR\_Documentor emulation since I
have no idea where they're actually going to end up.

 I guess I'm just irritated that such a big stir has been made over this
thing and it's not all that great. I can write a set of utilities to do
something and make it super cumbersome and not support common stuff,
too, but somehow I don't think I'm going to get the level of community
adoption we're seeing here. It's like they released an alpha level
product and they maybe should have waited until it was at least beta
before issuing a preview.

 Maybe they should have a comprehensive list of what's done and what
they plan to do and let us all see that so we can go, "Oh, hey, they
might not support such-and-such now, but they will soon" or, "They think
this feature's done, but it sure doesn't work for me." As it stands...
it's just frustration.

 I really do wish them well on it, but I think for now, I'll be sticking
with NDoc.
