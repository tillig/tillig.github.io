---
layout: post
title: "MIX07 - Designing for AJAX/RIA"
date: 2007-05-01 -0800
comments: true
disqus_identifier: 1194
tags: [conferences,aspnet,dotnet,javascript]
---
This session was a more general "patterns" type of session where there
were several UI patterns demonstrated to help you make a better user
experience when working in AJAX.

 The patterns and principles discussed can be found in the [Yahoo!
Design Patterns Library](http://developer.yahoo.com/ypatterns/).

 The idea is that a common vocabulary needs to be arrived at so
designers and developers can have meaningful discussion about user
interaction.

 **Principle - Keep a Light Footprint**
 The idea here is that in a rich Internet application you can reduce the
number of steps in a workflow or process and ensure simple interactions
are simple. Identify pain points in the process and shorten the path.
Design for engagement - keep the user's attention. An interesting side
note - it's good to make things easier, but in some cases a design can
have a very real economic impact on the application - for example,
providing a lot of pre-action-lookup (like if Google Suggest returned
search results, not just search terms) might make your application less
scalable and require a lot more hardware to support.

 Patterns: Inline Editing, In-Context Tools, [Drag and
Drop](http://developer.yahoo.com/ypatterns/parent.php?pattern=dragdrop).

 **Principle - Cross Borders Reluctantly**
 If you don't have to take the user to a whole new page, don't. Rethink
flows - base the flow on the user model, not a page model. Rethink
paging - could you use scrolling or a carousel instead?

 Patterns: Hover Details, On-Demand Scrolling, In-Context Expand, Inline
Assistance, Lightweight Popups, Lightbox.

 **Principle - Give Live Feedback**
 Let the user preview the result of their action where possible. Provide
things like field validation, inline previews (like a clothing store
that lets you see what a piece of clothing might look like on you prior
to you purchasing it), and so on. Try to prevent errors before they
happen. If you refresh data on the page, be careful it's not distracting
or annoying. When an action takes place, let the user know what
happened.

 Patterns: Live Suggest, [Auto
Complete](http://developer.yahoo.com/yui/autocomplete/), Periodic
Refresh, Busy Indicators.

 **Principle - Offer an Invitation**
 Let the interface be discoverable by inviting the user to take relevant
actions. Bridge the new with the old - use hyperlinks (a commonly
understood indicator of action) provide a route to discovery, for
example. Keep actions out of it - if you take actions as the user
explores the interface, it makes them reluctant to search out new
functionality. Unfortunately, there's no easy/single solution to this.

 Patterns: [Hover
Invitation](http://developer.yahoo.com/ypatterns/pattern.php?pattern=hoverinvitation),
Tour Invitation, [Drop
Invitation](http://developer.yahoo.com/ypatterns/pattern.php?pattern=dropinvitation),
[Tooltip](http://developer.yahoo.com/ypatterns/pattern.php?pattern=tooltipinvitation)

+ Hover + [Cursor
Invitation](http://developer.yahoo.com/ypatterns/pattern.php?pattern=cursorinvitation).

 **Principle - Show Transitions**
 Show a user what happened (like when an item is deleted) by using
transitions. For example, if an item is removed from a list, fade the
deleted item out and shrink the list in an animated fashion to show the
item being visually removed.

 Patterns: [Self-Healing
Transition](http://developer.yahoo.com/ypatterns/pattern.php?pattern=selfhealing),
[Slide
Transition](http://developer.yahoo.com/ypatterns/pattern.php?pattern=slide),
[Active
Spotlight](http://developer.yahoo.com/ypatterns/pattern.php?pattern=spotlight).

 Anyway, some great pointers. Definitely gives me some ideas for ways to
solve some of the UI problems we face every day at work.
