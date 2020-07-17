---
layout: post
title: "How to Get a TFS 2012 Build Agent to Build With Visual Studio 2013 Tools"
date: 2014-02-05 -0800
comments: true
disqus_identifier: 1833
tags: [net]
---
Let me say up front, I'm no TFS guru. I'm sure there's something simple
I'm probably overlooking. I just feel like this was far more complicated
than it had to be so I can't get over the idea I'm missing a simple
switch flip here.

*Anyway.*

We have a bunch of TFS 2012 build agents. They all have VS 2012
installed and they build VS 2012 solutions really well. But we'd like to
start working in VS 2013, using VS 2013 tools, so I undertook the
adventure of figuring this out.

I thought just installing Visual Studio 2013 on the build agent would be
enough, but... *not so*.

I'm guessing most folks haven't run into trouble with this, or maybe
they have the option of upgrading to TFS 2013 and they bypass the issue
entirely. The first sign of trouble I ran into was our custom FxCop
rules: they were built against VS 2012 (FxCop 11.0) assemblies, so if
you run the build in VS 2012 it works great, but in VS 2013 there are
assembly binding problems when it loads up the custom rules. It went
downhill from there.

I'll skip to the end so you don't have to follow me on this journey.
Suffice to say, *it was a long day*.

**Here's what I had to do to get a TFS 2012 build agent running with a
full VS 2013 stack – no falling back to VS 2012 tools:**

On the **build agent**...

1.  Install Visual Studio 2013.
2.  Update the build agent configuration to have a tag "vs2013" – you
    need a tag so you can target your build configurations to agents
    that support the new requirements.

In your **project/solution**...

1.  Update all of your .csproj and MSBuild scripts to specify
    `ToolsVersion="12.0"` at the top in the `<Project>` element. In VS
    2012 this used to be `ToolsVersion="4.0"` so you might be able to
    search for that.
2.  Update any path references in your scripts, project files, custom
    FxCop ruleset definitions, etc., to point to the VS 2013 install
    location. That is, switch from
    `C:\Program Files (x86)\Microsoft Visual Studio 11.0\...` to
    `C:\Program Files (x86)\Microsoft Visual Studio 12.0\...`; or from
    `VS110COMNTOOLS` to `VS120COMNTOOLS`.
3.  If you're using NuGet and have package restore enabled, make sure
    you have the latest NuGet.targets file. You can get that by setting
    up a new project really quickly and just enabling package restore on
    that, then stealing the NuGet.targets. You may need to tweak the
    ToolsVersion at the top.
4.  Update your project's TFS build configuration so...
    -   It requires a build agent with the "vs2013" flag.
    -   In the "MSBuild Arguments" setting, pass
        `/p:VisualStudioVersion=12.0` so it knows to use the latest
        tools.

Once you've done all that, the build should run with all VS 2013 tools.
You can verify it by turning logging up to diagnostic levels, then
opening the final MSBuild log and searching for "11.0" – if you find
that there are any paths or anything set to the VS 2012 install
location, you'll know you missed a reference. You will still probably
see the `VS110COMNTOOLS` environment variable, but it won't be getting
used anywhere.

