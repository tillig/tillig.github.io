---
layout: post
title: "Format Configuration Files on Build"
date: 2012-06-22 -0800
comments: true
disqus_identifier: 1783
tags: [.NET,Code Snippets]
---
We have a large group of devs all working on a single web application.
As part of that, we have different folks all working in different
branches, making changes to configuration files.

Visual Studio does a nice job of letting you keep code formatted via
plugins like
[CodeRush](http://www.devexpress.com/Products/Visual_Studio_Add-in/Coding_Assistance/)
and
[PowerCommands](http://visualstudiogallery.msdn.microsoft.com/e5f41ad9-4edc-4912-bca3-91147db95b99)
(“format on save”). Config files? Not so much.

As you can imagine, this creates no end of churn in merge conflicts as
things switch from tabs to spaces and back, NuGet mucks around with
dependency redirects, and entries get added and removed.

To address some of this, **I decided to add some automatic config file
formatting to our build** so when you run the build, things
automatically get cleaned up. Here’s how you can do this, too.

First, **you’ll need a copy of**[**HTML
Tidy**](http://tidy.sourceforge.net/). HTML Tidy actually does work on
config file XML as well as HTML as long as you specify that it’s not
processing HTML. [I grabbed this Windows
executable](http://www.paehl.com/open_source/?HTML_Tidy_for_Windows)
since the main installer site seems to be gone.

Next, **get the**[**MSBuild Community
Tasks**](https://github.com/loresoft/msbuildtasks)**in your build**.
There’s a nice `FileUpdate` task that will help during formatting and
you’ll need it.

Finally, **add the MSBuild script to your build.** I have mine set up as
a separate target that gets called just before compiling things.

    <Target Name="FormatConfig">
      <ItemGroup>
        <ConfigFiles
          Include="$(MSBuildProjectDirectory)\**\*.config"
          Exclude="$(MSBuildProjectDirectory)\**\packages.config;$(MSBuildProjectDirectory)\**\NuGet.config;$(MSBuildProjectDirectory)\**\repositories.config" />
      </ItemGroup>
      <Exec
        Command="tidy.exe --input-xml yes --output-xml yes --preserve-entities yes --indent yes --indent-spaces 4 --input-encoding utf8 --indent-attributes yes --wrap 0 &quot;%(ConfigFiles.FullPath)&quot; > &quot;%(ConfigFiles.FullPath).formatted&quot;"
        WorkingDirectory="path\to\tidy\folder" />
      <FileUpdate
        Files="%(ConfigFiles.FullPath).formatted"
        Regex="&lt;add\s+(key|name)=&quot;([<sup>&quot;]*)&quot;\s+value=&quot;([</sup>&quot;]*)&quot;\s+/&gt;"
        ReplacementText="&lt;add $1=&quot;$2&quot; value=&quot;$3&quot; /&gt;" />
      <Copy
        DestinationFiles="%(ConfigFiles.FullPath)"
        SourceFiles="%(ConfigFiles.FullPath).formatted" />
      <Delete Files="%(ConfigFiles.FullPath).formatted" />
    </Target>

This block of script…

-   **Locates all of the config files to format**. I’m formatting every
    config file except the ones associated with NuGet because I don’t
    manually tweak those. If you have other config files to format,
    include those in the ConfigFiles item.
-   **Executes tidy.exe against the config files**. The options here
    indicate that I’m processing XML, I want it nicely indented with
    four spaces, and I want attributes nicely wrapped and indented. [You
    can modify the settings
    yourself](http://tidy.sourceforge.net/docs/quickref.html) if this
    isn’t to your taste. Formatted file output gets created as a new
    file with the original filename suffixed by “formatted”, like
    “Web.config.formatted” so if anything goes wrong, it didn’t make
    changes to the actual item.
-   **FileUpdate cleans up simple name/value pairs.** The downside to
    wrapping attributes is that simple name/value pairs get broken
    across lines. This makes things like appSettings harder to read, not
    easier. This little regex action running after tidy puts them back
    on one line.
-   **Replaces the original files with the nicely formatted versions.**
    Simple copy/overwrite and delete of the temp file.

All in all, it’s pretty simple to get working and the end result is
nice. Now as long as you can maintain a consistent element order in your
config files, you’ll not get a merge conflict due to file formatting.

