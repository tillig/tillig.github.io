---
layout: post
title: "CR_Documentor - Maybe .NET 2.0/VS 2005 Only"
date: 2007-06-19 -0800
comments: true
disqus_identifier: 1217
tags: [dotnet,vs]
---
I've been really struggling with the motivation to get CR_Documentor
updated for Sandcastle support.  The problem is threefold:

1.  .NET 1.1 XSLT performance is pretty slow (slow enough that it's
    noticeable when the preview refreshes) so the code actually manually
    recurses through an XML document object and generates HTML on the
    fly.  Every time either rendering engine changes the way they do
    things (or fixes a defect), I have to manually implement that
    transformation in code using XmlNode and XmlDocument objects.  I
    can't just take the changes to the XSLT that the products include.
2.  Since I'm working at pre-compilation time, generating the method
    signature in a nice formatted way is a huge pain, and it's different
    for each rendering engine.  Doing this involves manually running
    around the parsed code tree in DXCore and converting the parsed
    nodes into nicely formatted, human readable HTML.
3.  CR_Documentor was originally a one-trick pony, so the rendering
    mechanism isn't really... "pluggable."  I started refactoring to get
    there, but because the generation of the HTML is so specific to each
    renderer and there's so much to it... frankly, I've gotten
    overwhelmed.

As I've said before, I can't open source the thing and get help because
there are legal ramifications around it involving Lutz working at
Microsoft now and the code originally being his.  I'd love to get some
help on it, but it's not really a possibility.

Anyway, I started down the path of getting Sandcastle support in there
and it's become pretty beastly.  What I'd like to do is actually make
use of XSLT so I can vastly simplify the rendering for each preview
type.  It would also allow me to more easily directly take the XSLT from
the various products (NDoc, Sandcastle) and use them with very minor, if
any, modifications.  Making it easier to take advantage of that would
also make it easier for me to add new preview styles (Sandcastle, for
example, has multiple templates available).

.NET 2.0 has vastly better XSLT performance than .NET 1.1 - enough that
I think it'd be feasible to transform using XSLT rather than manual
document manipulation.  However, if I convert to .NET 2.0, I have a few
problems:

1.  I'll only be able to support Visual Studio 2005 and later.  (I'm
    pretty sure DXCore won't let me run .NET 2.0 plugins from inside VS
    2003, though admittedly I haven't tried it.)
2.  I will probably have to remove features like the ability to
    highlight "unsupported tags" or set a "supported tag set" for
    troubleshooting your documentation.  I'll still be able to notify
    you of errors (like if your doc doesn't parse out right) but the
    supported tag set thing was only really workable because I had
    programmatic control over the rendering at that level.

Does anyone care?  Any big voices to continue supporting VS 2003?  If
not, I'm going to scrap the garbage I've been trying to do to get this
done and start working on getting it to transform using XSLT.
