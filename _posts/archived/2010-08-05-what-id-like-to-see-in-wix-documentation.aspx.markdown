---
layout: post
title: "What I'd Like to See in WiX Documentation"
date: 2010-08-05 -0800
comments: true
disqus_identifier: 1659
tags: [.NET]
---
I've been ~~working~~ struggling with WiX for the last few days and I
feel like it's mostly for two reasons:

1.  **WiX assumes you know MSI.** That is, Windows Installer XML is a
    thin veneer over Microsoft Installer technology, not an abstraction
    layer for it. I think this is a faulty assumption. While I
    understand WiX isn't meant to teach you MSI, if I'm building a new
    installer and I want to try WiX out, I'm probably not thinking, "Oh,
    I should go read the entire MSDN library about MSI first." I'm
    actually thinking, "I'm building a new installer, I'm building it in
    WiX, and I should be able to read the WiX documentation or find WiX
    examples that show me how to do that."
2.  **WiX documentation is thin.** I think this is the result of the
    faulty assumption in item \#1. There is very little linking from the
    WiX documentation back to the corresponding MSI docs on MSDN so
    you'd never know that the construct on this WiX page corresponds to
    this MSI concept. Examples are few and far between. [The *one
    tutorial* out there](http://www.tramontana.co.hu/wix/) assumes
    you're building everything by hand and doesn't really cover the
    Visual Studio integration that I'm sure people have picked up by
    now.

I'm guessing there are three schools of thought going on when it comes
to contributing to WiX documentation:

-   I already know how this works so everyone else must already know as
    well.
-   The "smart user" can go "check out the source and figure it out" so
    that's good enough.
-   I've just struggled for the last week trying to get this to work and
    now that it does I'm too exhausted and frustrated to contribute
    anything back.

I know I fall into that last school: I've been screwing around with it
for so long that, now that it works, I really just want to jump ship and
be done with WiX until the next time I have to add something to the
installer. Couple that with the fact that, really, while the installer
works, I don't know that what I did was "right," just that "it works."
It feels very "duct tape and baling wire" so I'm not confident that any
contributions I might make to the docs would be the way people *should*
be doing things, just the way *I got them working*.

**Maybe "it works" is the same as "the right way" in installer land?**
Hmmm. I'll have to think about that. But I digress.

All that leads me up to **a list of things I'd love to see in WiX
documentation**.

-   **A disclaimer on the front page saying "you need to know MSI."**
    Buried [a couple of pages
    down](http://wix.sourceforge.net/manual-wix3/overview.htm) they
    mention that "in order to fully utilize the features in WiX, you
    must be familiar with the Windows Installer concepts." I don't think
    that's quite accurate. On the front page of the site, and on the
    front page of the docs, there needs to be some big, bold, red,
    flashing sign that says, "If you don't know MSI, STOP HERE." OK,
    maybe not exactly that, but something up front to set my
    expectations that I need to know a little something about MSI before
    I can understand WiX. Either that, or all of the WiX docs need to be
    updated to stop making that assumption. (I like that better, but I
    know it's not realistic.)
-   **A complete table of contents or index of all help topics.** If you
    go to [the main documentation
    page](http://wix.sourceforge.net/manual-wix3/main.htm), you'll see a
    fairly short table of contents. Say I want to add a dialog to my
    installer that gathers some information from the user. Which topic
    is that under? "How To Guides?" Nope. "Fundamental Tools and
    Concepts?" Nope. I don't actually know. Any documentation I was able
    to find about user interface stuff was through the search box. And
    since there's very little cross-linking from concept to concept, I
    don't actually know if what I found was what I should have been
    finding. (Interestingly enough, it appears there's sort of a one-way
    warp going on with the table of contents. For example, [this page
    "Customizing Built-in WixUI Dialog
    Sets"](http://wix.sourceforge.net/manual-wix3/WixUI_customizations.htm)
    shows, at the top, that it falls under a "Modifying the Installation
    User Interface" topic, which is under "Creating Installation
    Packages." If you look at [the "Creating an Installer Package"
    page](http://wix.sourceforge.net/manual-wix3/authoring_getting_started.htm),
    there is no link at all to the "Modifying the Installation User
    Interface" topic. That whole tree is orphaned.)
-   **Screen shots of all of the standard dialogs.** There is [a page
    that describes the "standard dialog
    set"](http://wix.sourceforge.net/manual-wix3/WixUI_dialogs.htm) that
    comes with WiX and there are textual descriptions of each of the
    dialogs... but there is no picture of them, so if you're
    troubleshooting your installer, you need to sort of... guess...
    which dialog you're looking at. Screen shots would really help to
    visually identify the dialogs.
-   **Flow charts of the standard UI.** Once you figure out how to get a
    UI into your installer, you'll probably want to modify it. Maybe
    you'll want to add a new dialog into the flow. Except... what's the
    flow? Where do I insert my dialog? I have to know the ID of the
    dialogs between which I want to insert my custom dialog but there's
    no way to find that out. At least, none that I could figure. It was
    trial and error for me.
-   **Tips on troubleshooting and debugging.** If I get [error
    2819](http://msdn.microsoft.com/en-us/library/aa372835.aspx) in my
    installer, what the hell is that supposed to mean? I know WiX is
    just a veneer over MSI and I don't expect them to reproduce the MSI
    documentation, but a little "here's how to troubleshoot issues in
    your installer" doc would be helpful. Can I add tracing somehow? Can
    I attach a debugger? What facilities are available to me? Even if
    there are none, a doc saying "you're screwed" and a link to the
    error codes on MSDN would be helpful. Maybe some common solutions to
    common problems... if there are common problems.
-   **More cross-linking with relevant MSI documentation.** The WiX
    documentation reads like it's standalone, but it's really not. For
    every document on there, there's at least one corresponding page of
    MSDN documentation about MSI that would be helpful. Unfortunately,
    the only place you really see links to MSI docs are off [the
    "fundamental concepts"
    page](http://wix.sourceforge.net/manual-wix3/msi_useful_links.htm),
    and even then, there are only three links... and one is just to "the
    Windows Installer 4.5 SDK." Not so helpful.
-   **More advanced how-to guides.** Most of the guides on the site -
    and on the web in general - are "basic guides." You know, "here's
    how to install that EXE you built that has no dependencies, no
    configuration settings, and doesn't need anything set in the
    registry or put into the GAC." I'm not sure about the major WiX use
    case, but I don't think an application that simple *even needs* an
    installer, let alone *something written in WiX*. I'm guessing that
    folks who have decided to go the WiX route are interested in the
    more intermediate and advanced scenarios. "I need to install a web
    site that has a database connection string that needs to be set at
    install time." "I have a Windows service to install and it needs to
    ask for service credentials during install and maybe whether it
    should run on startup or manually." Good luck with that.
-   **Rich examples, particularly around UI customization.** One of the
    things I needed to do in my installer was add a custom dialog to get
    some data from the user about web site parameters (port number, app
    pool info). I want to reuse that dialog (sort of like the "Browse
    for Files" dialog) in different installers and may have to use it
    multiple times in one installer, sort of like calling a function - a
    "parameterized" dialog, if you will. This is easy to do in Windows
    forms apps. Figuring out how to create the dialog, wire it into the
    flow, send up the right button events, putting that together with
    "indirect properties," and so on... *it was a nightmare*. I found a
    few reasonable examples of how to set up non-UI related items, but
    almost nothing except two-or-three line snippets when it came to UI.
    Even in the UI examples, they didn't make sense. For example, when
    you look at an installer, the user gets asked for custom parameters
    *after* they choose a Typical/Custom/Complete install... but all of
    the examples insert dialogs *before* that choice. Admittedly, it's
    easier to do that, but it's not what you should be doing. *Where are
    the examples that show it the right way?* This goes hand-in-hand
    with the more advanced "how-to" guides idea, above.
-   **More information about web application deployment.** WiX appears
    to be great about deploying, say, a console application, but if you
    follow [the simple setup
    example](http://wix.sourceforge.net/manual-wix3/authoring_first_votive_project.htm)
    they provide but use a web application instead of a Windows forms
    application, you'll find the installer deploys your .dll into the
    root of the web app, not in the "bin" folder where it should be. How
    do you fix that? [I posted my
    solution](/archive/2010/07/30/how-to-consume-msdeploy-staged-web-site-output-in-a.aspx),
    but there is literally nothing about differences in deploying web
    apps from other app types. The closest it gets is [documentation
    about "Iis
    Schema,"](http://wix.sourceforge.net/manual-wix3/iis_xsd_index.htm)
    which is the extension that allows you to create IIS applications.
    Usage? *Bah!* Examples? *No way, man.* Just schema. Go Google for
    samples or blog posts if you want more. (Oh, and there's no way I
    can tell that you can create an IIS7 application pool with .NET 4
    and an integrated pipeline. Guessing that hasn't made it in yet.)

I think WiX is a pretty powerful thing. I think it could help out a lot
of people if it was more easily grasped - there's a hell of a learning
curve on it. I think they could get there if there was some time spent
augmenting the docs.

(Dear Wrox: There's totally a book opportunity here. There is only [one
book I could find on
WiX](http://www.amazon.com/dp/1590592972?tag=mhsvortex), it's from 2004,
and several of the reviews claim it as "incomplete" or "not deep
enough." I'd totally buy a more recent, more complete book.)

