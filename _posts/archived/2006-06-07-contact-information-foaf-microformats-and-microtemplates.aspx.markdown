---
layout: post
title: "Contact Information, FOAF, Microformats, and Microtemplates"
date: 2006-06-07 -0800
comments: true
disqus_identifier: 1014
tags: [GeekSpeak]
---
I didn't realize what a can of worms I was really opening with the
[ContactCard popup contact information
script](/archive/2006/06/06/contactcard-dhtml-contact-information.aspx)
I put out yesterday. And it's not about the functionality of the script
as much as where the script gets its data from.

 In wanting to Get Things Done and get the script out there, the contact
information that the script uses when it displays its information is
actually stored in a JavaScript recordset that gets specified by the
person setting it up on the web site. A good first step, to be sure, but
we all hate maintaining contact information in multiple places - what if
the script could read from external data sources?

 In the last, like, *day*, I've become so much more vastly aware of
these peripheral web development efforts that seem to be going on almost
under the radar (and gathering some severe momentum).

 First I learned about [FOAF - Friend of a
Friend](http://www.foaf-project.org/) - a way to specify contact
information and relationships in [a common XML
format](http://xmlns.com/foaf/0.1/) based on RDF. This sounded like a
keen thing, especially in relation to the ContactCard script: wouldn't
it be cool to just say "user 'tillig' has his information stored over at
such-and-such URL" and have the script automatically get that
information for you so you don't have to maintain it?

 That didn't seem like too much of a stretch, but FOAF seems to still be
pretty young and changing, and it'd be some interesting work to do in
creating a JavaScript FOAF document parser.

 While thinking about that, I contacted [Phil
Haack](http://haacked.com), who cooked up [a script that displays XFN
(XHTML Friends Network)
information](http://haacked.com/archive/2006/04/05/MakingMicroformatsMoreVisibleAnnouncingTheXFNHighlighterScript.aspx).
I thought he might have some input on how to best get this data or some
ideas on other ways to retrieve centrally maintained contact
information.

 That's when I really started getting into the notion of microformats
and microtemplates.

 Microformats seem to be, basically, the bastardization of existing HTML
elements and attributes to describe information.
[hCard](http://microformats.org/wiki/hcard), a microformat for contact
information that mimics the functionality of
[vCard](http://www.ietf.org/rfc/rfc2426.txt), uses CSS classes to define
elements for each bit of contact info being provided. (I do something
sort of similar with the ContactCard script - I look for elements with a
specific CSS class and those are the ones that get updated with the
popup contact card behavior.) This is on a whole new level, though. For
example, here's a simple hCard with my name:
 `<div class="vcard"><span class="fn">Travis Illig</span></div>`

 The XHTML Friends Network microformat is another one, using the "rel"
attribute on links to specify the relation of someone else to you. (I'm
not super convinced of the usefulness of this right now; it's neat, but
I'm having a rough time coming up for a really great use case.)

 So I could use hCard as a data source, too. And write the parser for
that, if there isn't one already out there. The problem I see is that
you can specify multiple hCards on a single HTML page... so how would I
know which one to use?

 From microformats, we move into
[microtemplates](http://microtemplates.org/). Microtemplates are sort of
like microformats in that they, too, change the meaning of existing HTML
(CSS class in particular) to suit their needs. This time, though, it's
much closer to the idea of [ASP.NET templates in data
binding](http://msdn.microsoft.com/msdnmag/issues/02/01/cutting/) - you
specify a set of empty HTML elements with specific CSS classes, then you
use a microtemplate engine to take a set of data and bind it to the HTML
element template. You can see a more concrete example of this [at
microtemplates.org.](http://microtemplates.org/about/)

 I usually feel like I'm pretty up on web technology, but I gotta say, I
feel blindsided. Like I just woke up and suddenly all this change just
happened and I don't know where I was. Interesting stuff, and I'm
somehow just oblivious.

 And I have mixed feelings about it. Was XML not good enough? Was it too
specific? HTML always seemed to me to be predisposed to distributing
non-structured data - is changing it to try to distribute structured
data a good idea, or is it more like a square peg/round hole situation?

 Regardless, I guess it's time to jump on board. Here we go!
