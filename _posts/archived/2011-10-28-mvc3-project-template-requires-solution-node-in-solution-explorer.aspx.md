---
layout: post
title: "MVC3 Project Template Requires Solution Node in Solution Explorer"
date: 2011-10-28 -0800
comments: true
disqus_identifier: 1746
tags: [net,aspnet,vs]
---
I've got Visual Studio 2010, MVC3, and the latest tools update. I'm all
patched up. But I'm seeing something weird.

I start out and I have a solution with a single C# class library in it.

![Solution with one class
library.](https://hyqi8g.bl3302.livefilestore.com/y2pdMlKHkOXmstx39SC2mevUw06qaic_Rs_0MDFH3MEQVzwY_cj9VeJgCKEpoa9mxDxKzF0sugGnDkOg13LsVQ1mTkJICDVu9OtaP0D15plCRw/20111028screen1.png?psid=1)

I decide to add an MVC3 site to it, so I do File -\> Add New Project. I
select an MVC3 project.

![Add new ASP.NET MVC3 Web
Application](https://hyqi8g.bl3302.livefilestore.com/y2pPWzqgBxUDMs66c5JTb2ZzVylDh7cx4ssXRUNaZAul6isRB7aWKNb5daiKV-xL49xjyO8Hjtz2km9oXvvHKfoOKUe9ZG4LKdMaY6QRFb1-vc/20111028screen2.png?psid=1)

I click OK, and I select an Empty web application.

![Selecting an empty MVC3
project.](https://hyqi8g.bl3301.livefilestore.com/y2p4-P06DRfMxjQgBW8x9qvnGJYsXgysPMidRRcG-Cws3X8aODsQeE8msIosbIMU0rPZMGJTrLWCGpHxYfEixQEPl_0cl4PxxicOzSOtOgAlbk/20111028screen3.png?psid=1)

When I click OK on this screen, I get an error "Cannot add the item
because the item to add it to is not a solution folder or the solution."

![Error: Cannot add the item because the item to add it to is not a
solution folder or the
solution.](https://hyqi8g.bl3302.livefilestore.com/y2pBrQ2QHjXf9LG6Xur-laYeIe1-mPr5UOnDhrk8xaLW42Q7z0ryKaxKVHU3CSv06BYtiH9y7VfyspgAT-9n4l_9MpYYnpGaFEpoMdJXuJ7iPM/20111028screen4.png?psid=1)

I click OK to dismiss the error and I see there's a *folder* in the
filesystem named the same as the project name I selected (like it
started to put the project in there) but *the folder is empty*.

To work around this, you have to:

1.  **Add a second project** to your solution so that the solution
    itself shows up in Solution Explorer.
2.  **Select the Solution node in Solution Explorer** by clicking it
    once. It can't be one of the projects. It has to be the solution.
3.  **Now do File -\> Add New Project** and go through the steps to add
    the Empty ASP.NET MVC3 web application and it will work.

I'm not sure what's going on where the project template is somehow keyed
to the solution, but there you go.

