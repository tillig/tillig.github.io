---
layout: post
title: "Programming Projects Piling Up"
date: 2004-08-26 -0800
comments: true
disqus_identifier: 647
tags: [personal,dotnet]
---
So I'm coming up with a list of all of the various programming projects
I want to do and I'm finding that there's really just no shortage. So
far, the top three are:

1. **Add 'Send To' to Solvent**: I want to add the Windows Explorer
    'Send To' menu to my add-in,
    [Solvent](/archive/2004/06/25/solvent-power-toys-for-visual-studio-.net.aspx).
    I have the part that builds the UI for the context menus done, I
    just need to get a decent class library to read items from the Send
    To folder and send them in. I found [something that almost does what
    I need](http://www.thecodeproject.com/csharp/sendto.asp), but I need
    something a little lower-level (not wrapped in Windows Forms code)
    and that compiles warning-free (that DLL needs to be [converted to
    mixed
    mode](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/vcmex/html/vcconconvertingmanagedextensionsforcprojectsfrompureintermediatelanguagetomixedmode.asp)).
2. **Remove Solution From VSS**: It turns out there's [a very manual
    process](http://www.knowdotnet.com/articles/removefromsourcesafe.html)
    if you want to remove solutions and projects from Visual SourceSafe.
    You have to delete certain files, you have to remove certain
    references to the source control from the solution and project
    files... ugh. I need a program that, given a solution file, removes
    it and all contained projects from VSS (not actually deleting them
    from the VSS database, just removing references to VSS from the
    local copy).
3. **POP3 Proxy via Web Service**: To get around annoying firewall
    constraints, I need a two-part solution: first, a web service that
    can take incoming POP commands and proxy them to a real POP server,
    then return the results; second, a client that acts like a POP
    server, receives requests from a POP-based mail program, and ferries
    those requests to the web service. That would allow you to use a
    POP-based mail program to get your email from, say, work, where they
    don't allow POP through the firewall but have no restrictions on web
    access.

 I've been working on that Solvent issue for a while now. I've learned
(and, in many cases, re-learned) way too much about C++ while doing it,
and I'm getting fed up with the way shell stuff is handled in Windows.
One would think that with .NET they'd have introduced some sort of
"Microsoft.Windows.Shell" namespace with some methods you can access
from managed code that does all the low-level crap I'm having to learn.

 I'll get it done, it'll just take a little longer. I tried doing the
[pInvoke route](http://www.pinvoke.net/), but I got to a point where I
was trying to marshal pointers to pointers and things fell apart (I know
enough to be dangerous but not enough to fix it). Then I started doing a
mixed-mode DLL (hard for a relative newbie in C++) when I was informed
there's [this thing called "It Just Works" (or
"IJW")](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/vcmxspec/html/vcmg_PlatformInvocationServices.asp)
that should allow me to call the unmanaged shell functions from managed
code without any of that. So that's my next attempt - see if I can
figure out how to get it done via IJW. If *that* doesn't work, I think
I'll learn how to write a COM object and just suffer the COM interop
overhead (which, thinking about the work the COM object will have to
provide, should be reasonably minimal).

 Unless someone out there wants to write it for me? I have an interface
description... :)
