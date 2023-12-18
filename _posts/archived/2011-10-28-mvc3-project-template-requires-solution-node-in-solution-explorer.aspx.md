---
layout: post
title: "MVC3 Project Template Requires Solution Node in Solution Explorer"
date: 2011-10-28 -0800
comments: true
disqus_identifier: 1746
tags: [dotnet,aspnet,vs]
---
I've got Visual Studio 2010, MVC3, and the latest tools update. I'm all
patched up. But I'm seeing something weird.

I start out and I have a solution with a single C# class library in it.

![Solution with one class
library.]({{ site.url }}/images/20111028screen1.png)

I decide to add an MVC3 site to it, so I do File -\> Add New Project. I
select an MVC3 project.

![Add new ASP.NET MVC3 Web
Application]({{ site.url }}/images/20111028screen2.png)

I click OK, and I select an Empty web application.

![Selecting an empty MVC3
project.]({{ site.url }}/images/20111028screen3.png)

When I click OK on this screen, I get an error "Cannot add the item
because the item to add it to is not a solution folder or the solution."

![Error: Cannot add the item because the item to add it to is not a
solution folder or the
solution.]({{ site.url }}/images/20111028screen4.png)

I click OK to dismiss the error and I see there's a *folder* in the
filesystem named the same as the project name I selected (like it
started to put the project in there) but *the folder is empty*.

To work around this, you have to:

1. **Add a second project** to your solution so that the solution
    itself shows up in Solution Explorer.
2. **Select the Solution node in Solution Explorer** by clicking it
    once. It can't be one of the projects. It has to be the solution.
3. **Now do File -\> Add New Project** and go through the steps to add
    the Empty ASP.NET MVC3 web application and it will work.

I'm not sure what's going on where the project template is somehow keyed
to the solution, but there you go.
