---
layout: post
title: "It Just Works, Mixed-Mode, pInvoke, or COM?"
date: 2004-08-26 -0800
comments: true
disqus_identifier: 648
tags: [net,windows]
---
I [mentioned
earlier](/archive/2004/08/26/programming-projects-piling-up.aspx) that
I'm trying to create a library to interface with the Windows "Send To"
menu.

 I'm not getting too far with it.

 Here's what I want:

 Two classes - SendToMenu and SendToMenuItem. They implement the
following public members, as noted:
-   SendToMenu
    -   GetSendToMenu: Takes in no parameters and returns an array of
        SendToMenuItem objects representing the items in the Send To
        menu.

-   SendToMenuItem
    -   DisplayName: A property that returns the display name of the
        Send To item
    -   Icon: A property that returns the icon for the Send To item
    -   ExecuteSendTo: If you pass in a file name, it mimics you
        "sending" the file to the item via the Explorer menu.



 It shouldn't be that hard. Right?

 It seems I have four choices of how to get this done, none of which are
easy.
-   It Just Works, or "IJW": Supposedly you can intermingle managed and
    unmanaged C++ and it's supposed to just work. I've messed around
    with this and it doesn't just work.
-   Mixed-Mode: You can create a C++ DLL that implements both managed
    and unmanaged code but you have to do some special finagling to get
    it to work. I haven't tried this yet, but I don't understand it all,
    either.
-   Platform Invocation, or pInvoke: This allows you to directly import
    and use unmanaged methods from DLLs right in your managed code.
    Talking to the Send To menu touches a lot of these things - more
    than you'd imagine - and getting them all to work nicely together in
    a managed world is nigh unto impossible. I have hundreds of lines of
    pInvoke code trying to get this to work. It's just not happening.
-   Component Object Model, or COM: This is the standard, unmanaged way
    of getting components out there. .NET knows how to deal with COM, so
    if I could get a COM object that does what I want, it could pretty
    easily hook up. Thing is, I don't know how to write COM, and would
    rather not take that time for something I'll only use this once.



 So there it sits. I have to decide whether I need to do a mixed-mode
DLL or COM. Or I need to find someone who knows how to do one of the
other two methods and get them to help out. Or maybe I just [farm it
out](http://www.rentacoder.com/RentACoder/default.asp). I'm tired of
fighting it, though.
