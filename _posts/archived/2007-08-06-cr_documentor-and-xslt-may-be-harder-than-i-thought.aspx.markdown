---
layout: post
title: "CR_Documentor and XSLT May Be Harder Than I Thought"
date: 2007-08-06 -0800
comments: true
disqus_identifier: 1249
tags: [GeekSpeak,.NET,Visual Studio]
---
I started working on converting
[CR\_Documentor](http://paraesthesia.com/archive/2004/11/15/cr_documentor---the-documentor-plug-in-for-dxcore.aspx)
over to use XSLT for its documentation transformations this morning and
soon realized that it may not be that easy.  The goal was to be able to
just take the XSLT from the various documentation generation engines
(NDoc, Sandcastle) and as fixes or changes happened, "plug in" the new
XSLT and have the preview ready to go.

Not so much.

I tried a simple test using the NDoc XSLT and it turns out that I have a
few stumbling blocks.

-   **The input XML is complex.**  The format NDoc expects the XML to be
    in prior to executing the transformation is pretty complex.  That's
    not really a problem in a post-build timeframe where you're not
    looking for real-time changes, but just creating the correct XML
    hierarchy is a pretty big task, let alone then getting it through
    the transform engine.
-   **Everything is relational.**  There are a lot of things in the NDoc
    XSLT that assume, for example, that you've got everything you need
    to document all in one file, so there are relational things going
    on.  For example, when you generate the documentation for a method,
    any cross-reference links you have are also generated... which runs
    through connecting actual URLs to HTML files and setting up links
    and everything.  To avoid setting up bad links, the XML that's
    generated gets heavily pre-processed.  Again, not something that can
    readily happen real-time.
-   **Much is assumed to be in the filesystem.**  Temporary files, the
    XSLT, images, script... there's a lot that the XSLT assumes is in
    specific spots in the filesystem, which means that I couldn't use
    the stylesheets as-is anyway; I'd have to heavily massage it to get
    it where I want it to be.

Unfortunately, a lot of this sort of means using XSLT directly is a
non-starter.  Even if I could get past the fact that I'd be doing almost
as much work creating the input XML as I'm doing right now to generate
the whole preview, the requirement for all the relational things and the
fact there's so much in the filesystem anyway means I'm probably better
off just hard-coding the transformation the way I've been doing, as lame
as that is.

I won't lie; it doesn't increase my desire to work on the project.  I
like it, and I really wish I could just release it to the community
open-source style, but since I can't, I'm sort of stuck.  Motivationally
challenged, shall we say.

Well, I guess my next step is to look for opportunities to refactor it
and make the code at least a little easier to maintain and update. 
Maybe that will make it easier to implement new rendering views.

