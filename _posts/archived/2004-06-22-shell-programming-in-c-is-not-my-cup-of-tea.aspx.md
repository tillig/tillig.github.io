---
layout: post
title: "Shell Programming In C# Is Not My Cup Of Tea"
date: 2004-06-22 -0800
comments: true
disqus_identifier: 592
tags: [net]
---
When it comes to programming, I will admit I am a spoiled, whiny baby. I
hate low-level crap. I am *not* a C++ programmer. Sure, it may be
powerful and flexible and yadda yadda yadda, but having to deal with all
of the little things in there is such a pain. I like higher level
languages that abstract that away. I'm a big fan of C\#, Perl,
Smalltalk, and whatnot. (You may or may not like any or all of those.
Too bad. They're my personal preferences... even if I haven't written in
Smalltalk for years.)

 I'm working on this project where I want to put the Windows "Send To"
menu inside the Solution Explorer of Visual Studio .NET. I'm finding
that in order to do that, you have to do some pretty low-level shit. As
such, I started browsing around in the Shell Programming section of
[MSDN](http://msdn.microsoft.com).

 Combining the knowledge I was gleaning from that and some code snippets
and things I found online, I started compiling a library of imported
shell programming related objects into a big library - shell programming
gone C#, right?

 The problem I'm having is that I can't get it to quite work right. The
marshaling of parameters is befuddling me because there doesn't seem to
be a consistent translation from C# managed types to C++ unmanaged
types (of course, this is probably my lack of education speaking). Where
I can get some methods to work correctly, others don't seem to want to
cooperate.

 I decided to set about converting the various sample code snippets
found on the MSDN shell programming site to my C# library, figuring
that'd be a good way to test - code that supposedly works, just
translated to the new language. No problem, right?

 Huge problem.

 I've been fighting this thing for quite some time now and I just can't
seem to get it to work. Now, here's where you're going to smack me: It's
making me think I should just learn the C++ way and do it in C++.

 And you say, "You don't already *know* how to do it in C++?" To which I
respond, "Well... no." Okay, I admit, that's probably pretty
fundamental, but if I can read how it's done in C++, and I can see how
that works in the documentation, I don't see how copying and pasting
example code into a sample project is going to make it any easier to
convert the stuff.

 Which leaves me thinking I should just leave the conversion of shell
stuff to the folks who do shell programming. I'll DllImport my way to
freedom and leisure where necessary, and/or maybe just write the thing
in managed C++ that I'll call from my VS add-in. I've seen the [managed
Send To example](http://www.thecodeproject.com/csharp/sendto.asp) out
there; maybe I'll start with that. Regardless, I can only beat my head
against something for so long before I decide it's not worth the effort
and leave it to the professionals. My bag is web apps, not COM interop
and low-level shell programming.
