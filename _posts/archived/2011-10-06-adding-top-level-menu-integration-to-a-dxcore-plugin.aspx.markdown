---
layout: post
title: "Adding Top Level Menu Integration to a DXCore Plugin"
date: 2011-10-06 -0800
comments: true
disqus_identifier: 1739
tags: [.NET,Visual Studio]
---
Most of the DXCore/CodeRush plugins I write are Tool Window plugins like
[CR\_Documentor](http://cr-documentor.googlecode.com) or are plugins
you'd bind to a hot key like
[CR\_JoinLines](http://code.google.com/p/dxcorecommunityplugins/wiki/CR_JoinLines).
For Tool Windows, DXCore automatically gives you menu integration...

![DXCore Tool Window plugin menu
integration](https://hyqi8g.blu.livefilestore.com/y2pMuQKgapYDewdfVjYXXZ2hhsvf0DxrLxKAsWLDJxi-wA2M3K6689Wo3PIYwIPE2U2yzkseBudI7EgiWRRz_fd2eERaQP0vW2bssPjIKNxSco/20111006toolwindowmenu.png?psid=1)

...and for hot key plugins, you don't need it. But sometimes your plugin
isn't really a tool window, or maybe you need to integrate into a
different menu, like the standard "Tools" menu. I'll show you how to do
that.

**Before you begin, consider if you really need this.** It's not hard to
add, but if you're like me, you already have a ton of stuff flooding the
various menus. Before you add that to your plugin, determine if you
really need to. "With great power comes great responsibility," right?

OK, so you want the top level integration. Let's do it.

**First, I'll create a standard plugin project** and call it
TopLevelMenuDemo. If you already have a plugin project, you can add a
new plugin to your existing project. The key here is you need a
"standard plugin" rather than a "tool window plugin" for this.

![The TopLevelMenuDemo plugin in Solution
Explorer](https://hyqi8g.bl3301.livefilestore.com/y2pWEC0gyaTx-9Ig8nEz75R2xKdnrM9QQl8qrrb_noVm12P6HixX9vapBFALRZUWKuJrSRd4szdqRGfxErUGZ-wUt94i1DJcUrAHM9iJO7ZJhk/20111006toplevelmemosol.png?psid=1)

Next, I'm going to **drag an Action onto my plugin designer** from the
"DXCore" part of my toolbox. I'll name it "menuAction" so we know what
it's for.

![](https://hyqi8g.bl3301.livefilestore.com/y2phYiIlPiSYhbDeuOUB9kBeX8D2YJEcsRWnIpgA1eX9laD0XYHJVDnNRrphdKj3lJYu0yA3YLeG68G5n9442KYRwAsm-A_S-qOWDGfU1a0Pq8/20111006menuaction.png?psid=1)

**Select the "menuAction" Action and open the Properties window.** You
need to set...

-   **ActionName** - Set this to the name of the action. It won't be
    visible, but I usually set this to the text I expect to see in the
    menu.
-   **ButtonText** - This is the text you'll actually see in the menu.
-   **CommonMenu** - This is the top-level menu to which your item
    should be added.

For our demo integration, we'll set "ActionName" and "ButtonText" to
"Demo Menu Integration" and we'll set "CommonMenu" to "DevExpress" so we
appear in the top-level DevExpress menu.

![Properties on the plugin
action.](https://hyqi8g.bl3302.livefilestore.com/y2pNMm3BL1buqWa9N4lTYeeNhqKq12wLudVfEnJh2k57Lc5aBOuIoJHeSpuJ1zN89AHfFVR3X636JaHHDf1Ff_5lTvCRVGhxeMCmn9HRejnWCg/20111006properties.png?psid=1)

**Switch the Properties menu over to show events and set an Execute
event handler.** The Execute handler is what happens when someone clicks
your menu item.

![Events on the plugin
action.](https://hyqi8g.blu.livefilestore.com/y2p2-3FJCBvrCPfrlxlnDQv5scldV1v-q60NPqpFqa6tZUfjwZgeaYKBtwUWI8CnMRiT5BPyTzzpDD5ag3L4vRPngdnl15ekORiJDLiZBFta3s/20111006events.png?psid=1)

For our demo handler, we'll just show a quick message box.

    private void menuAction_Execute(ExecuteEventArgs ea)
    {
      MessageBox.Show("Demo success!");
    }

**That's it!**

Hit F5 to start debugging. A new instance of Visual Studio will pop up
and you should see your menu integration in place.

![The plugin menu integration in
action.](https://hyqi8g.bl3302.livefilestore.com/y2pppHsP2O3gfcFcEeN-QZVrq9n5aWSoLu9CHfs2MHcJtMdOqycl0kWfyQxVW09nsWTt8ALfuNngvDyncuj774LSlwrU9Up-NwxMphNz5WXBvA/20111006menudisplay.png?psid=1)

Selecting the menu item, you should see the message box pop up. Success!

![The demo success message
box.](https://hyqi8g.blu.livefilestore.com/y2pdRIku4zaywE97WOHN5spfexROE0TrSk42EgbZAc7MnkzJGbyuu1pNRWnPXhMg3EGQ70zISG7ALFiWMtGXPQS8YeEUMEXkSsOj5AcFISEwN8/20111006demosuccess.png?psid=1)

**For the more advanced users**... check out the other events you can
handle on the action if you want even more control. For example, the
PositionMenuButton event can give you more control over the positioning
of your menu item within the parent menu. There's not a lot of
documentation out there on this, so you'll need to experiment a bit, but
a lot can be achieved.

