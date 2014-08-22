---
layout: post
title: "TypeMock Isolator - Now With Debugging Goodness"
date: 2008-02-06 -0800
comments: true
disqus_identifier: 1344
tags: [.NET,Visual Studio]
---
I'm playing with the latest release of TypeMock (now "TypeMock
Isolator," as it sounds like they have a suite of products planned
beyond their mocking product) and I think my favorite feature is the
better debugging support. Sure, you can mock fields now (admittedly, a
little scary sounding, but with legitimate applications nonetheless) and
they've cranked up the performance on it, but how many times have you
fired up [TestDriven.NET](http://www.testdriven.net/) and started your
test in the debugger only to get odd behavior because you tried to
step into a mocked method?

Now, when you try that, you actually see the method outlined in the
debugger so you get a visual cue about what you're doing:

![TypeMock outlines mocked methods in the
debugger.](https://hyqi8g.dm2304.livefilestore.com/y2pvaIK9TlZeGFYZBKPsx0tRnaH6Atnhowx4vWdoeMMNcPwkcaIBjVPPxoE5mMWhwEpI_xxY4dEf74p39v3BGyl3CWMo2nTEjVMZaXUl5d-hzg/20080206typemockdebuggerhighlight.png?psid=1)

Oh, and you know how you ran into trouble popping open the watch window,
or QuickWatch, and evaluating a mocked call multiple times, causing mock
verification problems? No more! The debugger works without hitches. Love
it, love it, love it.

This is all in the new TypeMock Isolator 4.2.1 beta. If you get a
chance, [check it out](http://www.typemock.com/Downloads.php). Good
stuff coming from those TypeMock folks.

