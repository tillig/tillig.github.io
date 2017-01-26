---
layout: post
title: "Exclude Anonymous Types in NDepend"
date: 2014-10-29 -0800
comments: true
tags: [net,ndepend]
---
[NDepend](http://www.ndepend.com) is awesome and [I use it](/archive/2013/10/28/ndepend-5-new-ui-new-features.aspx) to analyze all sorts of different projects.

One of the nice things in NDepend is you can define queries that help qualify what is your code (`JustMyCode`) and what isn't (`notmycode`).

I've seen two challenges lately that make rule analysis a bit tricky.

- `async` and `await`: These generate state machines on the back end and NDepend always flags the generated code as complex (because it is). However, you can't just exclude the code because basically the generated state machine moves your code in there, so excluding the state machine will exclude some of your code.
- Anonymous types: I see these a lot in MVC code, for example, where the anonymous type is being used as a dictionary of values to truck around.

I haven't figured out the `async` and `await` thing yet... **but here's how to exclude anonymous types from the `JustMyCode` set of code**:

First, in the "Queries and Rules Explorer" window in your project, go to the "Defining JustMyCode" group.

![Defining JustMyCode](https://hyqi8g.dm2302.livefilestore.com/y2pRWsGHJfdq-aKV13qjgTkAuPvnOg5GK92RRVZ6c6vZcIccQ5YPqdO5BWSfKe4DTvJyM6DfG1UMIWDYNlyjXtpFhuBj55NAEQqYLqf2k6bZXs/20141029_definingjustmycode.png?psid=1)

In there, create a query like this:

```csharp
// <Name>Discard anonymous types from JustMyCode</Name>
notmycode
from t in Application.Types where
t.Name.Contains("<>f__AnonymousType")
select new { t, t.NbLinesOfCode }
```

Save that query.

Now when you run your code analysis, you won't see anonymous types causing any violations in queries.