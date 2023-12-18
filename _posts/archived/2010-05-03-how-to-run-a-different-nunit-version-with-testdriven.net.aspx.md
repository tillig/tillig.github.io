---
layout: post
title: "How to Run a Different NUnit Version with TestDriven.NET"
date: 2010-05-03 -0800
comments: true
disqus_identifier: 1634
tags: [net]
---
Here's the setup:

You have a project that uses NUnit 2.5.5. You don't actually have NUnit
installed - you have it checked in along with your project's source as a
third-party dependency. (You did it that way so you can have different
projects using different NUnit versions without having to
install/uninstall things.) You're using
[TestDriven.NET](http://www.testdriven.net) to run tests inside Visual
Studio but you noticed that it ships with NUnit 2.5.3 - an earlier
version of NUnit - and you want to use the version your project
references.

**How do you tell TestDriven.NET to use your project's version of
NUnit?**

**First, make sure your checked-in version of NUnit keeps the same
directory structure it's distributed with.** That means you have a
folder that contains the appropriate version of NUnit-Console.exe, etc.,
and a subfolder called "framework" that has the nunit.framework.dll in
it, like this:

    YourProject
    |
    +-lib
      |
      +-NUnit // Has NUnit-Console.exe in it
        |
        +- framework // Has nunit.framework.dll in it
        |
        +- lib
        |
        +- tests

**Ensure you're referencing nunit-framework.dll from the NUnit
"framework" folder.** There's an nunit.framework.dll in the NUnit
folder, probably, too, but don't reference that one - reference the one
in the "framework" folder.

**Open the TestDriven.NET install folder.** This will be something like
`C:\Program Files\TestDriven.NET 3`. On a 64-bit system it might be in
`C:\Program Files (x86)\TestDriven.NET 3` or the like.

**Go into the TestDriven NUnit folder for the version you're
referencing.** You should see a folder called "NUnit" in the
TestDriven.NET install folder. Open that. Inside there you'll see
different folders for each version of NUnit. Right now there's "2.2,"
"2.4," and "2.5." In this example, we're looking at using NUnit 2.5.5
instead of 2.5.3, so we'll open up the "2.5" folder. You should now be
in a folder like `C:\Program Files\TestDriven.NET 3\NUnit\2.5`.

**Copy the nunit.tdnet.dll file into your lib\\NUnit folder.** Look in
the TestDriven.NET NUnit version folder you should be in right now.
You'll see a file called "nunit.tdnet.dll." Copy that into your
checked-in lib\\NUnit folder - the same folder that has
NUnit-Console.exe in it. You will need to check this in along with your
NUnit dependency.

**Go into the TestDriven.NET "framework" folder.** Still in that
`C:\Program Files\TestDriven.NET 3\NUnit\2.5` folder - open the
"framework" folder under that. You should be in
`C:\Program Files\TestDriven.NET 3\NUnit\2.5\framework`.

**Copy the nunit.framework.dll.tdnet file into your
lib\\NUnit\\framework folder.** In that
`C:\Program Files\TestDriven.NET 3\NUnit\2.5\framework` folder you
should see a file called "nunit.framework.dll.tdnet". Copy that into
your lib\\NUnit\\framework folder - the same folder that has
nunit.framework.dll in it. You will need to check this in along with
your NUnit dependency.

**Run TestDriven.NET.** Now when you run your tests with TestDriven.NET
you should see it report that it's using the version of NUnit you have
checked in along with your project. That wasn't too hard, now, was it?

**What if I need to customize the locations?** What if you don't have
the whole NUnit/framework folder structure and such? The basic principle
here is that nunit.tdnet.dll needs to be in the same folder as
NUnit-Console.exe and nunit.framework.dll.tdnet needs to be in the same
folder as nunit.framework.dll. You may need to open the
nunit.framework.dll.tdnet file in a text editor (it's an XML file) and
modify the "AssemblyPath" node in there. I haven't actually tried this
myself, so YMMV, but it should work.
