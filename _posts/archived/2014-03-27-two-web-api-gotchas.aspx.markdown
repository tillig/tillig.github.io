---
layout: post
title: "Two Web API Gotchas"
date: 2014-03-27 -0800
comments: true
disqus_identifier: 1839
tags: [net,Web Development]
---
I just spent a day fighting these so I figured I’d share. You may or may
not run into them. They do get pretty low-level, like, “not the common
use case.”

**PROBLEM 1: Why Isn’t My Data Serializing as XML?**

I had set up my media formatters so the XML formatter would kick in and
provide some clean looking XML when I provided a querystring parameter,
like `http://server/api/something?format=xml`. I did it like this:

    var fmt = configuration.Formatters.XmlFormatter;
    fmt.MediaTypeMappings.Add(new QueryStringMapping("format", "xml", "text/xml"));
    fmt.UseXmlSerializer = true;
    fmt.WriterSettings.Indent = true;

It seemed to work on super simple stuff, but then it seemed to
arbitrarily just stop - I'd get XML for some things, but others would
always come back in JSON no matter what.

**The problem was the `fmt.UseXmlSerializer = true;` line.** I picked
the XmlSerializer option because it can create prettier XML without all
the extra namespaces and cruft of the standard DataContractSerializer

**UPDATE: I just figured out it's NOT `IEnumerable<T>` that's the
problem - it's an object way deep down in my hierarchy that doesn't have
a parameterless constructor.**

When I started returning `IEnumerable<T>` values, that's when it stopped
working. I thought it was because of the `IEnumerable<T>`, but it turned
out that I was enumerating an object that had a property with an object
that had another property that didn't have a default constructor. Yeah,
deep in the sticks. No logging or exception handling to explain that
one. I had to find it by stepping into the bowels of the
`XmlMediaTypeFormatter`.

**PROBLEM 2: Why Aren't My Format Configurations Being Used?**

Somewhat related to the first issue - I had the XML serializer set up
for that query string mapping, and I had JSON set up to use camelCase
and nice indentation, too. But for some weird reason, none of those
settings were getting used at all when I made my requests.

Debugging into it, I could see that on some requests the configuration
associated with the inbound request message was all reset to defaults.
What?

This was because of some custom route registration stuff.

When you use attribute routes…

1.  The attribute routing mechanism gets the controller selector from
    the HttpConfiguration object.
2.  The controller selector gets the controller type resolver from the
    HttpConfiguration object to which it holds a reference.
3.  The controller type resolver locates all the controller types for
    the controller selector.
4.  The controller selector builds up a cached list of controller
    name-to-descriptor mappings. Each descriptor gets passed a reference
    to the HttpConfiguration object.
5.  The attribute routing mechanism gets the action selector from the
    HttpConfiguration object.
6.  The action selector uses type descriptors from the controller type
    selector and creates a cached set of action descriptors. Each action
    descriptor gets passed a reference to the HttpConfiguration object
    and get a reference back to the parent controller descriptor.
7.  The actions from the action selector get looked at for attribute
    route definitions and routes are built from the action descriptor.
    Each route has a reference to the descriptor so it knows what to
    execute.
8.  Execution of an action corresponding to one of these specific routes
    will use the exact descriptor to which it was tied.

*Basically*. There’s a little extra complexity in there I
[yada-yada’d](http://en.wikipedia.org/wiki/The_Yada_Yada) away. **The
big takeaway here is that you can see all the bajillion places
references to the HttpConfiguration are getting stored.** There’s some
black magic here.

I was trying to do my own sort of scanning for attribute routes (like on
plugin assemblies that aren’t referenced by the project), but I didn’t
want to corrupt the main HttpConfiguration object so I created little
temporary ones that I used during the scanning process just to help
coordinate things.

*Yeah, you can’t do that.*

**Those temporary mostly-default configurations were getting used during
my scanned routes rather than the configuration I had set with OWIN to
use.**

Once I figured all that out, I was able to work around it, but it took
most of the day to figure it out. It’d be nice if things like the action
descriptor would automatically chain up to the parent controller
descriptor (if it’s present) to get configuration rather than holding
its own reference. And so on, all the way up the stack, such that routes
get their configuration from the route table, which is owned by the root
configuration object. Set it and forget it.

