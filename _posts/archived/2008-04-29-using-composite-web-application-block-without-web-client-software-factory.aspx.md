---
layout: post
title: "Using Composite Web Application Block Without Web Client Software Factory"
date: 2008-04-29 -0800
comments: true
disqus_identifier: 1384
tags: [aspnet,net]
---
The [Web Client Software Factory](http://www.codeplex.com/websf) is a
great software factory from Microsoft Patterns & Practices that enables
you to pretty easily make well-constructed enterprise ASP.NET
applications that can be extended by downstream developers. The factory
contains a lot of stuff - recipes, templates, and a lot of help to
automate some common tasks - but the key item you'll find in there is
the [Composite Web Application
Block](http://www.codeplex.com/websf/Wiki/View.aspx?title=Composite%20Web%20Clients&referringTitle=Home).

The CWAB allows you to make modular web applications that come together
at runtime to make a nice, seamless experience. It makes it easy to
partition work to various teams but maintain a consistent experience
across the application. It also enforces some nice Model-View-Presenter
separation of concerns when using web forms. Well worth the effort to
use.

The thing is, you may not always want the entire Web Client Software
Factory package when using Composite Web Application Block. There are
two primary reasons you wouldn't want the Web Client Software Factory in
its entirety, both of which have to do with the associated guidance
packages:

-   **You don't want the stock guidance packages.** That is, the recipes
    and templates and other automation items don't do what you want them
    to or are otherwise just something you don't want. Maybe it'd cost
    more to modify the guidance package to do what you want than it
    would be to just manually do the work. Maybe you don't want the
    dependencies that the guidance packages assume you want. Whatever
    the case may be, you don't want the guidance packages.
-   **You don't want to deal with the developer environment cost.**
    Having guidance packages that everyone has to use also means you
    have one more thing to install on every developer machine. When
    upgrades come around, it's not just dropping an assembly in a folder
    to take the upgrade. There's a cost associated with this, and you
    may not want to incur it.

Either way, you may not want the whole thing. What do you get by not
taking it all?

-   **Slightly ore complex setup.**It's a little more effort to manually
    get a CWAB project going if you don't use the guidance packages. Not
    much worse, but this is a legitimate downside.
-   **Manual control over everything.** File placement, assembly
    breakdown, naming, etc. You could customize the guidance packages to
    do things your way, but it's not a 20-minute undertaking to do so.
    If you're not going to be adding pages or projects every single day,
    it's probably cheaper to just do it manually.
-   **Fewer implied dependencies.** The guidance packages assume you
    want the Patterns and Practices logging, security, and exception
    handling application blocks, so there's a lot of extra stuff that
    goes into the templates and such to support that. It can be a pain
    to rip all of this out if you don't want it. **The only extra
    dependencies you have when you're using CWAB solo are CWAB proper
    and ObjectBuilder.**
-   **Easier upgrades.**When a new version of CWAB comes out, it's an
    assembly update, not something that has to be installed on every dev
    box.
-   **Easier ability to implement standard forms authentication.**Out of
    the box, CWAB uses the security application block for locking down
    page access. If you just want standard location-based authorization
    it's easier to do it without the security application block in your
    way.

Here are some general steps to show you how to get CWAB working in your
project without all of the guidance packages. It will help if you're
familiar with using CWAB within WCSF before you try this out. (I have a
sample later in this article that you can look at for a more concrete
representation. I followed this general process in creating that
sample.)

1.  Create a web application project.
2.  Add references to the Microsoft.Practices.CompositeWeb.dll and
    Microsoft.Practices.ObjectBuilder.dll.
3.  Add modules (class libraries). In most CWAB projects, there's a sort
    of default "Shell" module that corresponds to the main content of
    your site and registers most core services. Add at least this
    module. For each module you add:
    1.  Add a reference to Microsoft.Practices.CompositeWeb.dll and
        Microsoft.Practices.ObjectBuilder.dll.
    2.  Add a reference from the web application to the module.
    3.  Add a module initializer class to the module. (A class deriving
        from ModuleInitializer.)

4.  Add a Global.asax that derives from
    Microsoft.Practices.CompositeWeb.WebApplication.
5.  For the Default.aspx page (which comes for free with your web
    application project)...
    1.  Break the page up into Model-View-Presenter format with the
        presenter and view interface in your "Shell" module.
    2.  Update the page namespace to match the namespace the presenter
        and view interface are in.
    3.  Update the page to implement the view interface.
    4.  Update the page to derive from
        Microsoft.Practices.CompositeWeb.Web.UI.Page.
    5.  Add a Presenter property to the page with a [CreateNew]
        ObjectBuilder attribute on it.
    6.  Add the page to the "Shell" module initializer's site map
        registration.

6.  Rinse and repeat for additional pages - put the presenter and view
    interface in the proper "business module" and implement the
    interface on the page.

There are a lot of things you can do to make this way, way easier.

-   **Create abstract generic "View" and "MasterPage" base classes.**
    There's a lot of common "template" sort of stuff (like the
    "Presenter" property on every single web page) that can be removed
    by creating some abstract generic classes and deriving from those
    instead.
-   **Create abstract module initializer classes for business modules
    and foundational modules.** Every business/foundational module
    initializer is almost identical. You can make it easier to create
    initializers if you have some base classes that have abstract
    methods you're forced to implement.

To get standard location-based authorization working with the site map,
you'll also need to create a custom SiteMapProvider to use in place of
the one that comes with Composite Web Application Block. The reason
you'll need that is because the out-of-the-box version trims by security
application block settings. To bypass that and use standard
location-based auth, you'll need a custom provider.

It sounds like a lot, but keep in mind it's one-time work and once
you've got it set up, it's not all that bad. To get you started, I've
got a sample project you can download and see it in action. You'll need
to get the [Web Client Software Factory](http://www.codeplex.com/websf)
because you'll need the assemblies that come with it (I didn't include
them in my sample project). Drop them into a specific folder in the
sample project and you should be good to go.

Of interest in my sample:

-   The "Framework" module has some example abstract base classes for
    views and initializers.
-   The "Navigation" module has a service that helps you locate existing
    nodes in the site map and contribute to them - something the CWAB
    doesn't come with out of the box.
-   I called my "Shell" module "Core" to make sure there was no reliance
    on the assembly name "Shell."
-   The "Core" module has a location-based authorization SiteMapProvider
    example.
-   The sample master pages and style sheets are the ones that come with
    the WCSF default site template.

**The sample is exactly that - a sample. It's not really tested (it
works in the context of the sample, though) and I don't offer you any
guarantees that this will work for you and be totally bullet-proof. Your
mileage may vary, no warranty expressed or implied, etc.**

[**[Download Sample
Project]({{ site.url }}/downloads/CwabSolo.zip) (48K)**]
