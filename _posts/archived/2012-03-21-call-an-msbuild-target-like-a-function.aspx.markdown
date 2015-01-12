---
layout: post
title: "Call an MSBuild Target Like a Function"
date: 2012-03-21 -0800
comments: true
disqus_identifier: 1776
tags: [net,Code Snippets]
---
I'm working on building a bunch of projects that all follow a specific
convention for naming, NuGet packaging, and so on. As part of that, I
want to run the build for each component – from clean to package – all
at once rather than clean everything, then build everything, then
package everything. (For the sake of the article, let's ignore whether
that's a good idea or not and just stick with me.)

MSBuild has batching, which sort of works like "for-each," but in
examples you see you can really only "batch" on
[tasks](http://msdn.microsoft.com/en-us/library/ms171473%28v=vs.80%29.aspx).
Targets (groups of tasks) allow you to specify inputs and outputs, but
the "outputs" list is assumed to be files, so if it finds the outputs
are up to date, it won't run that input.

Anyway, [I found this article that explains how to sort of abuse the
inputs and outputs on
targets](http://www.differentpla.net/content/2010/08/msbuild-target-batching-each-simplified)
so you can effectively do for-each over a target.

First, create an item list with your inputs and metadata. It doesn't
have to be files. For your inputs, pass the list of parameters. For the
outputs, put a dummy value that always evaluates to empty/null – that
way it's never seen as up to date and will always run.

Here's a sample script:

    <?xml version="1.0" encoding="utf-8"?>
    <Project DefaultTargets="Start"
      xmlns="http://schemas.microsoft.com/developer/msbuild/2003"
      ToolsVersion="4.0">
      <ItemGroup>
        <SomeValues Include="First">
          <Meta>true</Meta>
        </SomeValues>
        <SomeValues Include="Second">
          <Meta>false</Meta>
        </SomeValues>
      </ItemGroup>
      <Target Name="Start">
        <CallTarget Targets="Parameterized" />
      </Target>
      <Target Name="Parameterized" Inputs="@(SomeValues)" Outputs="%(Identity).Dummy">
        <Message Text="Item = %(SomeValues.Identity)" />
        <Message Text="Meta = %(SomeValues.Meta)" />
        <Message Text="---" />
      </Target>
    </Project>

The output, as you'll see, is that the "Parameterized" target gets
called once for each item in the group.

![](https://hyqi8g.bl3301.livefilestore.com/y2pU0r4P8yd9fuh38J0e9Y4ispnewNq7YnnE7d0WGIE8scQfgUK5gKLaPX7z1BiH2UA2H4iH27o9eSOTIW8k9JQYe0hC-_E68fYQ-mRn3SQhv8/20120321batching.png?psid=1)

