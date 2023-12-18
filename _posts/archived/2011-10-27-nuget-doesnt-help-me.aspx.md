---
layout: post
title: "NuGet Doesn't Help Me"
date: 2011-10-27 -0800
comments: true
disqus_identifier: 1745
tags: [dotnet,vs]
---
There's been a lot of hoopla around [NuGet](http://nuget.codeplex.com/)
and the whole .NET package management "thing." There's a lot of praise
going around, and I think they've done a good job for what they're
doing.

That said, I have what I'm *sure* is going to be an unpopular opinion:

**NuGet doesn't help me.**

It seems to me the primary benefits of NuGet are:

-   Get third-party dependencies into new projects faster.
-   Help you more easily update packages in your project.

That's all well and good, but**I think I'm not the target audience for
this**, and I think I may not be alone.

**I don't create a bunch of new projects.** I work primarily in an
established environment. We add new functionality to existing stuff. We
refactor and fix and add features and clean up old code. We don't create
a bunch of new projects. When we do, there's more ceremony than one
person on the team deciding "File -\> New Project." How does that new
project affect our installers? How does it change our deployment model?
Was there any analysis done to see if there's already a project in the
system that overlaps what the intent of this new project is?

Since there aren't a lot of projects created, there's not a lot of need
to hurry up and get new third-party dependencies in them.

Even if there were a ton of new projects, **we have a central repository
of third-party dependencies.** That's necessary because we have a lot of
teams working on a lot of different projects and solutions that
integrate and if we don't keep ourselves unified on an agreed-upon
dependency version, we have DLL Hell and Massive Assembly Redirect
Configurations to maintain. Plus, there are legal issues with
redistribution of libraries and licensing. Before you can update a
dependency, did you check to see if the license changed? Did anyone do
the cost/benefit analysis of taking that new dependency? Did someone try
it in an isolated environment to see if it broke anything?

The point is, you can't just right-click and update a dependency. Maybe
a more accurate statement, then, is:

**NuGet solves problems I don't have.**

I have other problems, sure, but NuGet isn't helping me with those.

So when I see that really great projects
~~like~~[~~AutoMapper~~](http://automapper.org/) have stopped offering a
straight-up zip-file download and are making me jump through the hoops
of creating a temporary location, futzing with the NuGet command line to
"install a package" that I'll never use, then manually peel the
assemblies out of that and delete all the package junk...*I'm
disappointed*. I know it's free software, but that's not terribly
customer-friendly.

**CORRECTION:** There *are* zip files for AutoMapper, you just have to
dig for them. I have come across other projects that don't do zip
downloads, though, and that's sad.

**There is still something to be said for distribution in a standard
downloadable zip format.** I mean, whatever happened to xcopy
deployment? Does it always need to be more complex than that?

It also **doesn't help that the latest MVC templates all have NuGet
built in**. Now it's not File -\> New Project and go. It's File -\> New
Project, delete packages.config, delete the packages folder, and go. And
that's in an "empty project." *Yay for additional steps!*
