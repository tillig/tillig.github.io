---
layout: post
title: "Portable Class Library Answers"
date: 2013-03-29 -0800
comments: true
disqus_identifier: 1815
tags: [net]
---
Since we switched [Autofac](https://autofac.googlecode.com) to be a
[Portable Class
Library](http://msdn.microsoft.com/en-us/library/gg597391.aspx), it's
been nice not having to maintain different builds for different
platforms. It's also nice to not have preprocessor directives littered
through the code. Props to Microsoft for making it part of VS2012.

The problem is… not very many people are familiar with Portable Class
Libraries and what they do. Probably once a week (give or take) we'll
get a defect filed on Autofac that it's targeting the wrong version of
.NET or something along those lines.

To that end, I figured I'd blog the answers to some of the common
questions we see. I also tried to summarize it [on the
FAQ](https://code.google.com/p/autofac/wiki/FrequentlyAskedQuestions),
but a couple of spots with the info never hurt.

-   **Why are old versions of .NET referenced?**
    If you pop open Autofac in Reflector, dotPeek, or your favorite
    decompiler, you'll see that it looks like it references .NET
    2.0.5.0.
    ![Autofac targeting System
    2.0.5.0]({{ site.url }}/images/20130329_retargetable.png)

    *This is not a problem*. The important part is the
    "Retargetable=Yes" at the end of the reference. What that means is
    Autofac will use the version of the assembly in the hosting process.
    If it's .NET 4.5, that's what it'll use. If it's Windows Phone,
    it'll use that. You can [read more about what "Retargetable" means
    here](http://www.shujaat.net/2012/11/portable-retargetable-assemblies.html).

-   **Why do I get an exception where a 2.0.5.0 assembly fails to
    load?**
    If it's retargetable, why is it blowing up in .NET 4.0? I get an
    exception that looks like this:

        Test 'MyNamespace.MyFixture.MyTest' failed: System.IO.FileLoadException : Could not load file or assembly 'System.Core, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e, Retargetable=Yes' or one of its dependencies. The given assembly name or codebase was invalid. (Exception from HRESULT: 0x80131047)
            at Autofac.Builder.RegistrationData..ctor(Service defaultService)
            at Autofac.Builder.RegistrationBuilder`3..ctor(Service defaultService, TActivatorData activatorData, TRegistrationStyle style)
            at Autofac.RegistrationExtensions.RegisterInstance[T](ContainerBuilder builder, T instance)
            MyProject\MyFixture.cs(49,0): at MyNamespace.MyFixture.MyTest()


    You're getting an exception because you haven't got the latest .NET
    updates. [I have a blog article here that walks into that in more
    detail](/archive/2013/01/21/using-portable-class-libraries-update-net-framework.aspx).

-   **Why is FxCop failing with CA0060 assembly binding errors?**
    If you're building your project on Windows 8 or Windows Server 2012,
    chances are you haven't seen this error. However, on Windows 7 or
    Windows Server 2008R2, you might have seen FxCop fail with warning
    CA0060 because it can't find the 2.0.5.0 assemblies that Autofac
    appears to bind to. FxCop doesn't really "get" the whole
    "Retargetable" thing right now.

    First, make sure it's the 2.0.5.0 assemblies FxCop is complaining
    about. If it's something else, [you may need to change the way you
    invoke FxCop so it ignores
    version](/archive/2011/04/20/how-to-pass-parameters-to-fxcop-from-visual-studio-or.aspx)
    or something like that.

    Assuming it really is the 2.0.5.0 assemblies, the best you can do is
    ignore them. It doesn't affect your analysis results since you're
    not analyzing Autofac anyway. [This blog article shows you one way
    to ignore the error in your
    build](http://geekswithblogs.net/blachniet/archive/2011/07/12/avoiding-fxcop-warning-ca0060.aspx).
    I, personally, ended up writing a little custom FxCop build task
    that handles both the FxCop version ignore thing and the CA0060
    error. Either way, ignoring it is the easiest way to go. Actually
    installing various SDKs doesn't seem to help. (I tried.)
-   **How come secannotate.exe isn't working for me?**
    Congratulations, you're one of the seven people out there who
    actually use secannotate. :)

    You need to pass the /d switch to secannotate and point to the
    Portable Class Library reference assemblies. [This StackOverflow
    question](http://stackoverflow.com/questions/12360534/how-can-i-successfully-run-secannotate-exe-on-a-library-that-depends-on-a-portab)
    shows an example of the errors you might see in secannotate and the
    solution.

Portable Class Libraries really do make targeting multiple platforms
easy, but if you're new to them, hopefully this helps you understand why
you're seeing some of the things you're seeing.

