---
layout: post
title: "Two Minute WF: Activities"
date: 2008-03-21 -0800
comments: true
disqus_identifier: 1364
tags: [net]
---
In this [Two Minute WF](/archive/2008/03/20/two-minute-wf.aspx), we'll
talk about **Activities**.

When you create a workflow in WF, the actions that it can take are
referred to as "Activities." Think of all the things you might want to
do in a workflow:

-   Flow control (while loops, if/else decisions, etc.).
-   Executing code.
-   Handling events.
-   Calling external services.

...and so on. Each of these things is an activity. In a state machine
workflow, each state the workflow can be in is an activity. Even
workflows proper are activities - they're "composite activities" that
contain other activities. Which activities get used in your workflow
will depend on [the type of
workflow](/archive/2008/03/20/two-minute-wf-workflow-types.aspx) you're
using and your specific needs.

![Simple sequential workflow showing various
activities.](https://hyqi8g.dm2302.livefilestore.com/y2pd4U2MAyX7zzSxHk-MOKjoipbanHgl_0l4X-Q6-F3FVf9cXNSb5QD5mJwsfC8W-3OuEWsl3iEarJGW0JyxoqumPgWw8CZCvat0OodTHkcPSI/20080321simpleworkflow.png?psid=1)

This simple sequential workflow shows what it might be like to do
division in a workflow. Some inputs come into the workflow and are
looked at to see if the user is trying to divide by zero. If so, an
exception is thrown; if not, the division is done and the results are
returned. Looking at the diagram, each of the "boxes" is an activity:

-   The workflow itself.
-   The if/else branching activity.
-   Each branch inside the if/else branching activity.
-   The exception-throwing activity ("divideByZeroFault").
-   The code activity that performs the division.

Windows Workflow Foundation comes with a lot of activities, found in the
[System.Workflow.Activities](http://msdn2.microsoft.com/en-us/library/system.workflow.activities.aspx)
assembly, but if you don't like the ones that come with WF, or if you
have a special business need, you can create your own custom activities
to reuse in your own workflows.

