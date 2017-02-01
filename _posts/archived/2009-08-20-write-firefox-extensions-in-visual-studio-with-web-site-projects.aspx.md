---
layout: post
title: "Write Firefox Extensions in Visual Studio with Web Site Projects"
date: 2009-08-20 -0800
comments: true
disqus_identifier: 1559
tags: [vs,GeekSpeak]
---
Recently when I was working on [my first Firefox
extension](http://code.google.com/p/firefox-ntlmauth/), I struggled for
a while to figure out the best way to work with the code - the script,
CSS, etc. - involved with the extension.

I like using Visual Studio as my environment for the other projects I'm
on, so I thought I'd look around and see if other folks had figured out
how to use it while working with Firefox extensions. The closest I got
was [this article over on
DevSource](http://www.devsource.com/c/a/Using-VS/Creating-Your-Own-Firefox-Addin-with-Visual-Studio/)
which really talks more about creating the extension's folder structure
than it does about how you actually manage the project in Visual Studio.
With that, I figured it was up to me, and here's how I got it working.

**First, follow the Mozilla instructions** on [setting up a developer
profile for extension
building](https://developer.mozilla.org/en/Setting_up_extension_development_environment)
and [creating the base extension
structure](https://developer.mozilla.org/en/Building_an_Extension). It
might even be worth getting [the full Hello World
plugin](https://developer.mozilla.org/en/Building_an_Extension) running
so you know you've got something working to start.

Now **we're going to create a Visual Studio solution to manage the code
with**. We'll end up with a folder/file structure that looks something
like this:

[![](http://lh5.ggpht.com/_P1NCAbHEm2Q/So2kQdM-IKI/AAAAAAAABLk/uONZ9VMkAhA/s288/Extension%20Folder%20Structure.png)](http://picasaweb.google.com/lh/photo/6abCFiE__uY4dXlSmwbRrw?feat=embedwebsite)

You have a folder that houses your extension ("ExampleExtension") and
then you have the actual folder structure under that which has the
extension code ("extension"). Ostensibly, **you'll end up zipping
everything under "extension" into an .xpi file for distribution later**.

We need to create the solution you see in the folder right above the
extension code so fire up Visual Studio. Go to "File-\>New Project" and
under "Other Project Types" click "Visual Studio Solutions" and elect to
create a Blank Solution. Put the blank solution in the folder right
above the main extension code ("ExampleExtension" in the above folder
tree).

Save the solution file and close it. Visual Studio always does this
thing where it creates a folder for the solution but you don't want that
folder here - you've already got a structure you're working in. Go grab
the .sln file that was just created and put it in the folder right above
the extension code ("ExampleExtension"). You can then delete the folder
Visual Studio stuck it in as well as the .suo file.

**You should have the .sln file right above the "extension" folder with
your Firefox extension code**, just like the picture above. Now open the
solution in Visual Studio. **We're going to use the Web Site project
type to work with the extension code.** Extensions are mostly XML, CSS,
and script anyway, so it mostly makes sense, right?

In Visual Studio, go to "File -\> Add -\> New Web Site..." to open the
web site template dialog. **Select the "ASP.NET Web Site" project
template.** Under "Location," select "File System" and **point to the
folder that contains the extension code** ("extension"). It doesn't
really matter which language you select, since you're not going to be
really making a web site, so select what you want. (I selected Visual
C#.)

[![](http://lh6.ggpht.com/_P1NCAbHEm2Q/So2mkh7qpbI/AAAAAAAABLs/iFTkpi1RIso/s288/New%20Web%20Site%20for%20Extension.png)](http://picasaweb.google.com/lh/photo/p8X36XBjOe2vGQVK4RloLQ?feat=embedwebsite)

When you click "OK," it's going to find the extension folders and such
you already have. It will then ask you how you want to proceed. **Select
"Open the existing web site" and click OK.** This will add everything
for your extension into the "web site" without adding anything to it.
You should see it all in Solution Explorer. Here's a screen shot of my
extension in Solution Explorer with all the requisite files.

[![](http://lh3.ggpht.com/_P1NCAbHEm2Q/So2osEcJDLI/AAAAAAAABL4/7x6eir71GXE/s800/Solution%20Explorer%20for%20Firefox%20Extension.png)](http://picasaweb.google.com/lh/photo/KMTV-RPD3cFJ3IN8hlUOLA?feat=embedwebsite)

**That's it.** You should now be able to add, remove, and update files
for your extension from Visual Studio.

Now, I know I could install Eclipse and do things differently, or choose
some other environment, but I really wanted to see how VS would work.
Seems to work reasonably well, at least for what I'm doing.

**What about debugging?**

Well, you can't really do debugging of your extension from inside Visual
Studio, but you can execute your Firefox developer environment to see
your extension run. Right-click the Web Site project proper (the little
"globe" icon you see in Solution Explorer) and select "Browse With..."

In that dialog, click "Add" to add a new browser. In the "Program Name"
box, type the full command line that you need to run the developer
profile with (you have that from [when you set up your extension
developer
environment](https://developer.mozilla.org/en/Setting_up_extension_development_environment)).
In the "Friendly Name" box, put something like "Firefox Extension
Developer Environment." Then click OK.

[![](http://lh3.ggpht.com/_P1NCAbHEm2Q/So2q8V8cCsI/AAAAAAAABMA/8sMj_h8u3Dg/s800/Browse%20With%20Firefox%20Extension%20Developer%20Environment.png)](http://picasaweb.google.com/lh/photo/Yc3mP4vhyppVtMJCkOTxHw?feat=embedwebsite)

You will get warned with something that says "File name does not exist,
is invalid, or contains parameters that cannot be validated. Do you want
to change your entry?" Say NO. That warning will close and the "Firefox
Extension Development Environment" browser will appear in the list.

**From now on, you can select "Browse With,"** select your developer
environment, click the "Browse" button, and the developer version of
Firefox, with your extension installed, will pop up. (**You must**[**set
up the Firefox extension proxy file** when you set up your development
environment](https://developer.mozilla.org/en/Setting_up_extension_development_environment)
or it won't matter that you popped open the dev browser - your extension
won't be there.)

**How about building/packaging the extension?**

I haven't figured out a way to do it from inside Visual Studio (though
I'm sure you could through post-build tasks or modifying the .sln file
directly), however, with the use of [MSBuild Community
Tasks](http://msbuildtasks.tigris.org/) **I've got a very simple build
script that zips up the extension as an .xpi in a build\_output folder**
(peer to the extension code). Yours for the taking. YMMV, no support, no
warranty expressed nor implied, etc.

    <?xml version="1.0" encoding="utf-8"?>
    <Project DefaultTargets="All" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
      <PropertyGroup>
        <MSBuildCommunityTasksPath>$(MSBuildProjectDirectory)\lib\MSBuildCommunityTasks</MSBuildCommunityTasksPath>
        <BuildDirectory>$(MSBuildProjectDirectory)\build_output</BuildDirectory>
        <ExtensionDirectory>$(MSBuildProjectDirectory)\extension</ExtensionDirectory>
        <ExtensionName>ExampleExtension</ExtensionName>
      </PropertyGroup>
      <Import Project="$(MSBuildProjectDirectory)\lib\MSBuildCommunityTasks\MSBuild.Community.Tasks.Targets"/>
      <Target Name="All" DependsOnTargets="Clean;Compile">
      </Target>
      <Target Name="Clean">
        <RemoveDir Directories="$(BuildDirectory)" Condition="Exists('$(BuildDirectory)')"/>
      </Target>
      <Target Name="Compile">
        <ItemGroup>
          <ExtensionFiles
           Include="$(ExtensionDirectory)\**\*.*"
           Exclude="$(ExtensionDirectory)\**\_svn\**\*.*" />
        </ItemGroup>
        <MakeDir
         Directories="$(BuildDirectory)"
         Condition="!Exists('$(BuildDirectory)')"/>
        <Zip Files="@(ExtensionFiles)"
         WorkingDirectory="$(ExtensionDirectory)"
         ZipFileName="$(BuildDirectory)\$(ExtensionName).xpi" />
      </Target>
    </Project>

Yeah, that's a lot to just build a zip file, but it always cleans out
any existing build and repackages the thing, plus if you end up having
more to do (like adding other files or doing additional filtering), this
is a starting point.

Hopefully this will help some of you folks trying to break into Firefox
extension development!

