---
layout: post
title: "Two Minute WF: Workflow Types"
date: 2008-03-20 -0800
comments: true
disqus_identifier: 1362
tags: [.NET]
---
In this [Two Minute WF](/archive/2008/03/20/two-minute-wf.aspx), I'll
tell you about the types of workflows you can run in Windows Workflow
Foundation.

Out of the box, you get two types of workflow:

-   Sequential workflow
-   State machine workflow

A **sequential workflow** runs a lot like a flow chart and its
design-time experience reflects that. (Yes, I realize that's technically
inaccurate, but from a conceptual perspective, that's pretty much it.)
Usually sequential workflows run in services or other automated
processes that don't require user interaction.

A **state machine workflow** is exactly what it sounds like - a [state
machine](http://en.wikipedia.org/wiki/Finite_state_machine). You define
the set of states the workflow can be in and the valid set of
transitions between the states. The actions that occur in each state
determine which transition to take to move to the next state. When
integrating with ASP.NET, you'll be looking at state machine workflows.

Both workflow types can be modified (within certain limits) on the fly
to be dynamic and both can communicate with external services, listen
for events, or evaluate rules to determine their flows. Both use the
same set of activities (actions - like "if/else," "execute code," etc.)
to perform their internal work. (I'll do a different Two Minute WF post
on activities.)

Visual Studio 2008 comes with templates that let you very easily create
console applications that host either of these workflow types so you can
experiment with them and decide which type is right for your
application.

