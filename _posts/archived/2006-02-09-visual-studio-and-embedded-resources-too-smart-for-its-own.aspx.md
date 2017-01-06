---
layout: post
title: "Visual Studio and Embedded Resources: Too Smart For It's Own Good?"
date: 2006-02-09 -0800
comments: true
disqus_identifier: 951
tags: [vs]
---
I'm working on some funky embedded resource stuff where I'm embedding
all nature of files into an assembly so I can extract and use them on
the fly later. In doing that, I've come across an interesting behavior
in Visual Studio.
 
 Say I embed two .resx files. One will be called "Strings.resx" and one
will be called "Strings.en.resx" - the former is the default set of
resources, the latter is the English-specific resources. I set the Build
Action on these to "Embedded Resource" to tell Visual Studio to embed
them. That looks like this:
 
 ![Solution Explorer and Properties Window with an embedded resource in
Visual
Studio](https://hyqi8g.dm2304.livefilestore.com/y2pmI0z3gHdLhr5rng_jFBqNezu7s-gGdqPlTs9Lbw4T_rVnID-She7CwmUg113S0plWqcPZVtshFmGfQ_OBSaHYwJYpbZWDT7tFjhAGONLTCk/20060209vsembed01.gif?psid=1)
 
 I build my solution and behind the scenes Visual Studio realizes the
.resx file is actually resources, does a little resgen action on it for
me, and links the generated resources into my assembly. In the build
output, I'll see that I have my primary assembly and a subfolder called
"en" that contains an assembly with the English-specific resources I
embedded. This is all as expected.
 
 Now rename those files because you don't want the
behind-the-scenes-resgen thing to happen. In fact, let's call them .js
files, just to change things up. Leave them embedded, though.
 
 ![Solution Explorer and Properties Window with an embedded resource in
Visual
Studio](https://hyqi8g.dm2301.livefilestore.com/y2pZUWqClmA1gEbOWeHXtZ_UDrv1Wmw0tv8WA7r9Ke1VhREBeZI9YIup4G2ru33THm0lt_Aqg2spe-gaVXwAGUWjdbiqxQ-Hr4yzdg6TmDFdSI/20060209vsembed02.gif?psid=1)
 
 I expect that when I build my solution, my final assembly will have two
files embedded - Strings.en.js and Strings.js. You know what happens?
 
 You still get two assemblies. The primary assembly has Strings.js
embedded in it, and the satellite assembly in the "en" subfolder of your
build output has the Strings.en.js file embedded in it, renamed to
Strings.js. *Not at all* what I was expecting.
 
 I suppose you might have thought you could infer that, maybe, from the
[.NET Framework Developer's Guide on Creating Satellite
Assemblies](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpguide/html/cpconCreatingSatelliteAssemblies.asp),
but they only talk about the creation of .resources files and how that
all gets linked into satellites. No one mentioned anything about a
pseudo intelligence splitting things up for me.
 
 I'm not sure I like it. For the project I'm working on, it's really
throwing a wrench in the works, I'll tell you that.
