---
layout: post
title: "MVC, Task.Run, and HttpContext.Current"
date: 2013-11-19 -0800
comments: true
disqus_identifier: 1831
tags: [.NET,Web Development]
---
For reasons I won’t get into, we recently ended up with a scenario in
MVC where we needed to use
[RenderAction](http://msdn.microsoft.com/en-us/library/system.web.mvc.html.childactionextensions.renderaction.aspx)
to get some data into a view. Some of the data was exposed via async
calls to services.

The challenge is that **RenderAction doesn’t support asynchronous
controller actions**. To accomplish the task, we ended up with a
synchronous controller action that used
[Task.Run](http://msdn.microsoft.com/en-us/library/system.threading.tasks.task.run.aspx)
to get data from certain async calls. And, yeah, [I know that’s not
really the greatest thing in the
world](http://msdn.microsoft.com/en-us/magazine/jj991977.aspx) but there
wasn’t a great way around that.

That landed us with a new challenge: **HttpContext.Current was null in
the Task.Run action but not in the partial view the controller action
returned**.

Normally that wouldn’t bother me, a service call not having a web
request context, but due to a certain chain of logic (again, which I
won’t get into) **we had a call to DependencyResolver.Current** in the
asynchronous action. We’re using
[Autofac](https://autofac.googlecode.com), which creates a lifetime
scope per web request, but without any request context – *explosions*.

In the end, we had two solutions.

**The first solution manually set the call context** in the asynchronous
task.

    var context = System.Web.HttpContext.Current;
    return Task.Run(() =>
      {
        CallContext.HostContext = context;
        return this.AsyncCallThatReturnsTask();
      }).Result;

That worked in some simple cases, but for some reason it didn’t stick in
certain chained async/await calls down the stack.

**The second solution was to rewrite certain things to be synchronous**
and only make async calls on things that don’t need HttpContext. That’s
sort of a cop-out, but we couldn’t really find a way around it without
getting… really, really deep. This is where we actually ended up.

I have a feeling there is something more that could be done by cloning
bits of the current
[SynchronizationContext](http://msdn.microsoft.com/en-us/library/system.threading.synchronizationcontext.aspx)
and/or
[ExecutionContext](http://msdn.microsoft.com/en-us/library/system.threading.hostexecutioncontext.aspx),
setting up a custom
[TaskFactory](http://msdn.microsoft.com/en-us/library/system.threading.tasks.taskfactory.aspx),
and firing up the async calls through that, but given the problem we’re
solving is sort of a one-off and the high risk of deadlock or something
crazy breaking under load…  it wasn’t worth diving that deep.

It would be nice if MVC would support asynchronous RenderAction calls,
though.

