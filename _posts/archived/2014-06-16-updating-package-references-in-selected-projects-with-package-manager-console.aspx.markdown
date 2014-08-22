---
layout: post
title: "Updating Package References in Selected Projects With Package Manager Console"
date: 2014-06-16 -0800
comments: true
disqus_identifier: 1843
tags: [.NET,Visual Studio]
---
In [the Autofac project](http://autofac.org) we’ve maintain all of the
various packages and integrations in one assembly. In order to make sure
each package builds against the right version of Autofac, all references
are redirected through NuGet.

A challenge we face is when we are testing a new release of Autofac, we
want to update specific integration projects with the latest version of
Autofac so we can do testing, eventually upgrading everything as needed.
Running through the GUI to do something like that is a time consumer.

Instead, I use a little script in the Package Manager Console to filter
out the list of projects I want to update and then run the update
command on those filtered projects. It looks like this:

    Get-Project -All | Where-Object { $_.Name -ne "Autofac" -and $_.Name -ne "Autofac.Tests" } | ForEach-Object { Update-Package -Id "Autofac" -ProjectName $_.Name -Version "3.5.0-CI-114" -IncludePrerelease -Source "Autofac MyGet" }

In that little script...

-   `Get-Project -All` gets the entire list of projects in the current
    loaded solution.
-   The `Where-Object` is where you filter out the stuff you don’t want
    upgraded. I don’t want to run the Autofac upgrade on Autofac itself,
    but I could also add other projects.
-   The `ForEach-Object` runs the package update for each selected
    project.
    -   The `-Version` parameter is the build from [our MyGet
        feed](https://www.myget.org/F/autofac) that I want to try out.
    -   The `-Source` parameter is the NuGet source name I've added for
        our MyGet feed.

You might see a couple of errors go by if you don’t filter out the
update for a project that doesn’t have a reference to the thing you’re
updating (e.g., if you try to update Autofac in a project that doesn’t
have an Autofac reference) but that’s OK.

[James Chambers has a great roundup of some additional helpful NuGet
PowerShell script
samples.](http://jameschambers.com/2011/06/powershell-script-examples-for-nuget-packages/)
Definitely something to keep handy.

