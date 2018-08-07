---
layout: post
title: "Figuring Out Spinnaker Pipeline Expressions"
date: 2018-08-07 -0800
comments: true
tags: [spinnaker,kubernetes]
description: "New to Spinnaker deployments and pipeline expressions? Here's a quick list of resources to help."
---

I'm using [Spinnaker](https://www.spinnaker.io) to manage microservice deployments in one of my projects. One of the nice features in Spinnaker is [pipeline expressions](https://www.spinnaker.io/guides/user/pipeline/expressions/) - a way to do a little dynamic calculation based on the current state of the pipeline.

I'm somewhat new to Spinnaker and I just got through trying to figure out a way to do some conditional stage execution using pipeline expressions but found the learning curve was steep. I don't plan on repeating everything already in the docs... but hopefully I can help you out.

**The Layers**: [Spinnaker pipeline expressions](https://www.spinnaker.io/guides/user/pipeline/expressions/) use the [Spring Expression Language](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#expressions) syntax to expose the currently executing [Spinnaker pipeline object model](https://github.com/spinnaker/orca/tree/master/orca-core/src/main/java/com/netflix/spinnaker/orca/pipeline/model) along with some [whitelisted Java classes](https://www.spinnaker.io/reference/pipeline/expressions/#whitelisted-java-classes) so you can make your pipeline stages more dynamic.

That's a lot to build on: The Spinnaker object model, Spring Expression Language, and Java. If you're, say, a Node or .NET developer, it's a bit of an uphill battle.

**Resources**:
- [Spinnaker Pipeline Expressions User Guide](https://www.spinnaker.io/guides/user/pipeline/expressions/)
- [Spinnaker Pipeline Expressions Reference](https://www.spinnaker.io/reference/pipeline/expressions/)
- [Spring Expression Language](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#expressions)
- [Spinnaker Pipeline Object Model (code)](https://github.com/spinnaker/orca/tree/master/orca-core/src/main/java/com/netflix/spinnaker/orca/pipeline/model)
- [Spinnaker Pipeline `ExecutionStatus` (code)](https://github.com/spinnaker/orca/blob/master/orca-core/src/main/java/com/netflix/spinnaker/orca/ExecutionStatus.java)

**The Data**: The best way you can see what pipeline data you have available is to run a pipeline. Once you have that, expand the pipeline and click the "Source" link in the bottom right. That will get you a JSON document.

![Get the pipeline source]({{ site.url }}/images/20180807_pipelinesource.png)

The JSON doc is an "execution." In there you'll see the "stages" each of which has a "context" object. This is the stuff you'll get when you use the helper functions like `#stage("My Stage")` - it'll find the JSON stage in the execution with the appropriate name and expose the properties so you can query them.

**Troubleshooting**: There are two ways I've found to troubleshoot.

1. _Create a test pipeline._ Actually just run the expression in a test pipeline. You'll get the most accurate results from this, but you may not be able to test the queries or operations against a "real pipeline execution" this way.
2. _Use the REST API._ Spinnaker has [a REST API](https://www.spinnaker.io/reference/api/docs.html) and one of the operations on a pipeline is [`evaluateExpression`](https://www.spinnaker.io/reference/api/docs.html#api-Pipelinecontroller-evaluateExpressionForExecutionUsingPOST). This runs against already-complete executions but is the fastest way to iterate over most queries. I'll show you how to use that.

If you want to use the REST API to test an expression, first find a pipeline execution you want to use for testing. As with earlier, go get the JSON doc for a pipeline run by clicking the "Source" link on a complete pipeline. Now look at the URL. It'll look like `http://spinnaker-api.yourcompany.com/pipelines/01CMAJQ6T8XC0NY39T8M3S6906`. Grab that URL.

Now with your favorite tool (`curl`, Postman, etc.)...
- Create a POST request to the `evaluateExpression` endpoint for that pipeline, like: `http://spinnaker-api.fiserv.io/pipelines/01CMAJQ6T8XC0NY39T8M3S6906/evaluateExpression`
- In the body of the request, send a single parameter called `expression`. The value of `expression` should be the expression you want to evaluate, like `${ 1 + 1 }` or whatever.
- The response will come back with the result of the expression, like `{ result: 2 }`. _If you get an error, read the message carefully!_ The error messages will usually help you know where to look to solve the issue. For example, if you see the error `Failed to evaluate [expression] EL1004E: Method call: Method length() cannot be found on java.util.ArrayList type` - you know that whatever you're calling `length()` on is actually an `ArrayList` so go [look at the `ArrayList` documentation](https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html) and you'll find out it's `size()` not `length()`. The errors will help you search!

**Example**: The pipeline expression I wanted was to determine if any prior step in the pipeline had a failure. The expression:

`${ #stage("My Stage").ancestors().?[status.isFailure() && name != "My Stage"].isEmpty() }`

Let's walk through how I got there.

- `${ ... }` [wraps every pipeline expression in Spinnaker](https://www.spinnaker.io/guides/user/pipeline/expressions/).
- `#stage("...")` is [a shortcut for getting a stage from the pipeline by name](https://www.spinnaker.io/reference/pipeline/expressions/#stagestring).
- `"My Stage"` is just the name of the stage running the expression. There isn't a way I could find to access the current stage. [`#root` gives you the stage _context_](https://www.spinnaker.io/guides/user/pipeline/expressions/#root) but not the _stage definition_.
- `ancestors()` is [a method on the Spinnaker `Stage` object](https://github.com/spinnaker/orca/blob/36b9419d33f93fc42ae3ef5a4cd98a9f8c9b8af6/orca-core/src/main/java/com/netflix/spinnaker/orca/pipeline/model/Stage.java#L364). Notice that `ancestors()` returns all the ancestor stages _and the current stage_.
- `.?` is the [Spring Expression Language collection selection operator](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#expressions-collection-selection). It runs the expression in the brackets and returns a filtered `ArrayList`.
- `status` is [a property on the `Stage` object](https://github.com/spinnaker/orca/blob/36b9419d33f93fc42ae3ef5a4cd98a9f8c9b8af6/orca-core/src/main/java/com/netflix/spinnaker/orca/pipeline/model/Stage.java#L217) and is of [type `ExecutionStatus`](https://github.com/spinnaker/orca/blob/8e705b9b33427db35d762f761472d56286ae0d24/orca-core/src/main/java/com/netflix/spinnaker/orca/ExecutionStatus.java).
- `isFailure()` is [a method on `ExecutionStatus`](https://github.com/spinnaker/orca/blob/8e705b9b33427db35d762f761472d56286ae0d24/orca-core/src/main/java/com/netflix/spinnaker/orca/ExecutionStatus.java) that determines if the specific status is one of several that qualify as unsuccessful.
- `name` is [a property on the `Stage` object](https://github.com/spinnaker/orca/blob/36b9419d33f93fc42ae3ef5a4cd98a9f8c9b8af6/orca-core/src/main/java/com/netflix/spinnaker/orca/pipeline/model/Stage.java#L150) that has the human-readable name. This clause is how we exclude the current stage from the result set.
- `isEmpty()` is [a method on the Java `ArrayList` class](https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html), which is what comes out of a SpEL collection selection.

How did I figure all that out? Lots of trial and error, lots of poking around through the source. That REST API evaluation mechanism was huge.
