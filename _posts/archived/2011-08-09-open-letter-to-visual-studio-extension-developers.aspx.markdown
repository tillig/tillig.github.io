---
layout: post
title: "Open Letter to Visual Studio Extension Developers"
date: 2011-08-09 -0800
comments: true
disqus_identifier: 1729
tags: [Visual Studio,GeekSpeak]
---
Dear Visual Studio Extension Developers:

(This includes folks who create products that have "value-add" features
that install into Visual Studio, extensions done through classic or new
mechanisms, and/or anyone who has something that otherwise "bolts on" to
VS to enhance the development experience.)

I have a lot of different products, add-ins, and extensions installed in
Visual Studio. Most of them behave reasonably, but I've had some recent
bad luck with a couple that have caused... *frustration*. This is to ask
you to help me.

**Help me enjoy your product.** Help me not be frustrated. Help me be
that guy who blogs about how double-plus-awesome you are. In order to do
that, I have some ideas for you:

-   **Don't require administrative privileges to run.** I don't develop
    as an administrator. You shouldn't either. Even if you do, for
    whatever reason, your QA process should test the extension as a
    non-admin. I don't want to get all energized to use the stuff just
    to fire up VS and get an inexplicable exception message that I have
    to trace back to your extension.
-   **Remember the state in which I left your extension.** If you have
    some sort of window or menu bar addition, make sure if I close the
    window, move it, dock it, or otherwise use the standard window/menu
    customization options that I won't totally lose that customization
    when I close VS and restart it later.
-   **Test your upgrade path.** If I install your extension, change some
    settings, and then later upgrade, I don't want to lose my settings.
    Also, if your product is offered as a standalone installer and
    through the VS Extension Gallery, make sure the two mechanisms
    understand each other so I don't manually install the latest version
    just to be prompted to "upgrade" by the VS Extension Gallery.
-   **Don't write files to my source tree.** In my ideal world, I don't
    want you writing anything to my source tree because in most cases
    are those files are going to be per-user settings (right?) which I
    don't want to accidentally check into my repository. I also don't
    want to have to chase everyone down that's using your extension and
    make sure they don't check them into their branches/clones/etc.
-   **If you absolutely must write files to the source tree, use a file
    extension I'm already ignoring.** Most source code control projects
    for .NET have \*.suo and \*.user ignored. Feel free to use those
    extensions so for your per-solution or per-project files so it's
    seamless.
-   **Don't add a top-level menu to Visual Studio.** You don't need to
    show up at the same level as File, Edit, View, etc. **I have no less
    than 19 of these top-level menus** right now, counting the stock
    items. If I size the VS window less than 1200 pixels wide, the menu
    starts wrapping. That's ridiculous, especially when some of these
    just open up settings menus. There's a "Tools" menu. Use it. There
    is a standard VS options dialog. Hook into it. Putting yourself
    right at the top is like trying to install a desktop shortcut every
    time. (I figured out how to use the Start menu since Windows 95 came
    out. I don't need a desktop icon.) *Note: The exception to this is
    if your plugin actually does have a huge ton of things that are
    menu-driven. Chances are, though, your plugin doesn't fall into this
    territory. You might think it does, but it probably doesn't.*
-   **Have options to enable/disable sets of functionality.** If your
    plugin does more than one logical "thing" (e.g., it does syntax
    highlighting and enhances the Solution Explorer) you need to offer
    me options to enable or disable the individual features. You may
    have five things that your plugin does but only four of them are
    things I'm interested in, while the last one is just annoying. Let
    me disable that annoying one. Don't force me to choose between
    uninstalling your plugin or putting up with annoying behavior.

[**DevExpress**](http://www.devexpress.com)**is actually a good example
of what to do in pretty much every case here.** The CodeRush/Refactor
set of VS extensions are fantastic. They do add a top-level menu to VS,
but since there is a ton of functionality (tool windows, etc.) you'd
want to get through menus and it'd be cumbersome nested under the Tools
menu, it's justified. They cover every other item I listed here like a
champ and are, in fact, *double-plus-awesome*.

Anyway, thanks, VS Extension Developers, for hearing me out.

Sincerely, 
Me

