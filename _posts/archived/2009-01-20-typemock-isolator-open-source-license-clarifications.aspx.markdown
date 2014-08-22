---
layout: post
title: "Typemock Isolator Open Source License Clarifications"
date: 2009-01-20 -0800
comments: true
disqus_identifier: 1487
tags: [.NET]
---
I'm working on an overhaul of the internal web server for
[CR\_Documentor](http://cr-documentor.googlecode.com) and in doing that
I'm making sure to have some good unit testing in there. Unfortunately,
pretty much everything around the
[HttpListener](http://msdn.microsoft.com/en-us/library/system.net.httplistener.aspx)
class is sealed so it makes testing difficult. [Typemock
Isolator](http://www.typemock.com) to the rescue!

To that end, I had to get a license for Isolator to use with my open
source project. Typemock has a model for this, and the licenses are free
for the asking, but there's not a lot of information on their site (yet)
about exactly how this works. They have [a decent blog entry on
it](http://blog.typemock.com/2008/10/isolator-open-source-license.html),
and I've found out a little more about them, so I'll just bullet point
it all here.

-   You can get a license for Typemock Isolator to use on open source
    projects [from their request
    page](http://www.typemock.com/free_open_source_license_form.php).
-   The license is **free**.
-   The license is **per-developer**. Each developer working on the open
    source project needs to request one.
-   The license has a **10-year lifespan** on it so you're not in danger
    of having it expire on you in the middle of your project.
-   If you have your project running in continuous integration, **you
    can use one of the developer's licenses for the build server**- you
    don't have to get a separate license for the server.
-   If you work on more than one open source project that needs Typemock
    Isolator, **you only need one open source license** - you don't need
    a separate license for every project.
-   If you already have a commercial (paid) license, **you can use your
    commercial license on the open source project**. You don't need to
    request a separate license.
-   **Everyone on a project needs to use the same version of Typemock
    Isolator.** You can't mix-and-match versions.

This is fantastic. For CR\_Documentor, it means I can test not only the
new server stuff, but also start adding tests for the code that
interacts with the DXCore parser, since you can't really create those
structures in unit tests, either.

