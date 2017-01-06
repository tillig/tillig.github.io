---
layout: post
title: "Two Minute WF: Core Services"
date: 2008-05-16 -0800
comments: true
disqus_identifier: 1389
tags: [net]
---
In this [Two Minute WF](/archive/2008/03/20/two-minute-wf.aspx), we'll
talk about Core Services.

When the
[WorkflowRuntime](/archive/2008/04/02/two-minute-wf-workflowruntime.aspx)
is hosting your
[WorkflowInstance](/archive/2008/04/29/two-minute-wf-workflowinstance.aspx),
there are certain things going on to help manage the environment the
WorkflowInstance is running in. These runtime-level, globally accessible
services are the Core Services. There are four Core Services:

-   **Scheduler**: This is responsible for managing the threads used to
    run workflow instances. The default scheduler service implementation
    used if you don't specify otherwise is the
    [DefaultWorkflowSchedulerService](http://msdn.microsoft.com/en-us/library/system.workflow.runtime.hosting.defaultworkflowschedulerservice.aspx).
    If you're hosting your workflows in an environment with specific
    threading requirements (like within an ASP.NET application), you'll
    need to change the scheduler.
-   **Persistence**: This is responsible for saving and restoring
    workflow instance state. For example, you may have a long-running
    workflow (maybe minutes, maybe days) and you don't want it in memory
    that whole time - this service saves the state when the workflow
    instance becomes idle and re-hydrates the instance when it's time to
    resume. There is no default implementation of persistence, but a
    [SqlWorkflowPersistenceService](http://msdn.microsoft.com/en-us/library/system.workflow.runtime.hosting.sqlworkflowpersistenceservice.aspx)
    is available out-of-the-box.
-   **Tracking**: This service helps in monitoring workflow instance
    progress. Very helpful in troubleshooting and tracing workflow
    instances for auditing and management. There is no default
    implementation of tracking, but a
    [SqlTrackingService](http://msdn.microsoft.com/en-us/library/system.workflow.runtime.tracking.sqltrackingservice.aspx)
    is available.
-   **Commit Work Batch**: This service manages the transactions around
    batched work. For example, if you have several activities in a
    workflow that need to succeed or fail as an atom, they'll
    participate in a work batch. If you don't specify otherwise, the
    [DefaultWorkflowCommitWorkBatchService](http://msdn.microsoft.com/en-us/library/system.workflow.runtime.hosting.defaultworkflowcommitworkbatchservice.aspx)
    will be used.

You can only have one of each of these services (except tracking - you
can have multiple tracking services) per runtime.

The beauty of the way WF was written is that you can create your own
custom implementations of any of these services and instruct the
WorkflowRuntime to use them. For example, if you wanted to create a
persistence service that stores all of your workflow states in XML files
in the filesystem, you could do that. Or if you had a special way you
wanted to track workflow instance events, like in a proprietary logging
system, you could implement your own tracking service.

