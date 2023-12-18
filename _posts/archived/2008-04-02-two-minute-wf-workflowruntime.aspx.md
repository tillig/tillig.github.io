---
layout: post
title: "Two Minute WF: WorkflowRuntime"
date: 2008-04-02 -0800
comments: true
disqus_identifier: 1368
tags: [net]
---
In this [Two Minute WF](/archive/2008/03/20/two-minute-wf.aspx), we'll
talk about the **WorkflowRuntime**.

The
[WorkflowRuntime](http://msdn2.microsoft.com/en-us/library/system.workflow.runtime.workflowruntime.aspx)
is the service that coordinates the execution of workflows and the
services that workflows use. Once you've [defined a
workflow](/archive/2008/03/20/two-minute-wf-workflow-types.aspx) using
the various
[activities](/archive/2008/03/21/two-minute-wf-activities.aspx) you need
the workflow to perform, you tell the WorkflowRuntime to create an
instance of that workflow and start it running. The WorkflowRuntime uses
the various services available to it to start the workflow instance
running on a thread, persist the workflow when it becomes idle, and
generally manage the execution of the workflow.

The WorkflowRuntime provides events you can handle to let you know when
significant things happen like when a WorkflowInstance is finished
running, has thrown an exception, or has been terminated. You can also
use the WorkflowRuntime to enumerate the list of currently loaded
workflows or retrieve references to workflow-related services.

You can only have one WorkflowRuntime per
[AppDomain](http://msdn2.microsoft.com/en-us/library/system.appdomain.aspx)
(generally this means you get one per application), so in more than the
simplest application it can be kind of tricky to manage your
WorkflowRuntime.

For example, say you have an object that needs to know when a workflow
completes. You might have that object subscribe to the
[WorkflowRuntime.WorkflowCompleted](http://msdn2.microsoft.com/en-us/library/system.workflow.runtime.workflowruntime.workflowcompleted.aspx)
event. Later, you might no longer need that object so you stop
referencing it and assume the garbage collector will clean it up for
you... but it won't. Why? Because it's still subscribed to the
WorkflowRuntime.WorkflowCompleted event so there's still a reference to
it. This sort of thing becomes a little tricky particularly in
applications like an ASP.NET web app where a page instance might need to
know when a workflow it started is done running. (There are other issues
with using workflows in ASP.NET that I'll get into in a later topic.)

There's a lot to consider when working with WorkflowRuntime, but it does
a lot of the work for you. Once you get your head wrapped around it,
WorkflowRuntime is your best friend in Windows Workflow Foudnation.
You'll be seeing a lot of each other, so [get to know
it](http://msdn2.microsoft.com/en-us/library/system.workflow.runtime.workflowruntime_members.aspx).
