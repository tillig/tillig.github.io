---
layout: post
title: "Two Minute WF: WorkflowInstance"
date: 2008-04-29 -0800
comments: true
disqus_identifier: 1382
tags: [.NET]
---
In this [Two Minute WF](/archive/2008/03/20/two-minute-wf.aspx), I'm
going to tell you about
[WorkflowInstance](http://msdn2.microsoft.com/en-us/library/system.workflow.runtime.workflowinstance.aspx).

This is a really simple one: A WorkflowInstance is - *wait for it* - a
single instance of a workflow. Yes, it really is that simple. You pick
your [workflow
type](/archive/2008/03/20/two-minute-wf-workflow-types.aspx), fill in
the [activities](/archive/2008/03/21/two-minute-wf-activities.aspx)
it'll use, and you have a workflow definition. Once you have the
definition, you instantiate it and start it running. It's sort of like
defining your class/type and then newing one up. For objects it's like
this:

`MyCustomType myVar = new MyCustomType();`

For workflows, it's like this:

    using(WorkflowRuntime workflowRuntime = new WorkflowRuntime())
    {
      AutoResetEvent wh = new AutoResetEvent(false);
      workflowRuntime.WorkflowCompleted +=
        delegate(object sender, WorkflowCompletedEventArgs e) {wh.Set();};
      workflowRuntime.WorkflowTerminated +=
        delegate(object sender, WorkflowTerminatedEventArgs e) {wh.Set();};
      WorkflowInstance instance = workflowRuntime.CreateWorkflow(typeof(MyCustomWorkflowType));
      instance.Start();
      wh.WaitOne();
    }

In the example, I not only create an instance of my custom workflow
type, but I also start it running. It's a little more complex than just
creating a new object, but it's not that much worse.

The
[WorkflowRuntime](/archive/2008/04/02/two-minute-wf-workflowruntime.aspx)
is responsible for instantiating workflows and starting them running.
Since workflow instances run on a different thread than the main
program, I'm using an AutoResetEvent to do thread synchronization - we
don't want to end the program or dispose of the WorkflowRuntime until
the WorkflowInstance has had a chance to complete its run.

Something to watch for when you're working in a larger environment with
lots of instances - you only get one WorkflowRuntime for a given
AppDomain. What that means is the WorkflowCompleted and
WorkflowTerminated events are for all WorkflowInstances - you don't get
one for each instance. Be careful when subscribing to these events when
you just want info on a single instance. If you forget to unsubscribe
from the event and the event subscriber goes out of scope, you may have
a memory leak on your hands. (The Garbage Collector won't clean up the
now-unreferenced event subscriber because there's still one reference to
it - the subscription to the global WorkflowRuntime event.)

