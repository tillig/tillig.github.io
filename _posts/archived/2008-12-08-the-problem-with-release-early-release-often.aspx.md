---
layout: post
title: "The Problem With &quot;Release Early, Release Often&quot;"
date: 2008-12-08 -0800
comments: true
disqus_identifier: 1473
tags: [GeekSpeak]
---
One of the mantras of agile software development is "[Release Early,
Release
Often](http://www.google.com/search?q=release+early+often+agile)" -
every time you have a new, working version with fixes and updates, you
should put that in the hands of the consumer. It's a great idea - if
there's something new the consumer of your product, be they developers
or otherwise, could use, make it available.

**The problem lies in the reciprocal expectation of the producers of
said product that the consumers will instantly be able to take the
latest available version.**This isn't always a valid expectation and can
get in the way of product support.

The happy-path scenario is something like a web application that is
deployed in a central location and is consumed by various users. A new
version of the web app becomes available, the service host deploys the
new version, and the end users immediately have the new features and
fixes available to them. When the customers need support, it's pretty
safe to assume they're on the latest version.

What happens if the product isn't like that, though? What if it's a
framework component like a logging library? In my experience, there's a
little more work required as a consumer of a third-party framework
component to take the latest version than just "download and go." It
might look that way to the folks providing that component, but in larger
environments that take third-party components on as dependencies, for
every new version that comes out you have to consider:

- Has the licensing changed? (If so, do we need to run this by Legal
    to get approval for the upgrade?)
- Is there any fee associated with taking the upgrade?
- What are the breaking changes?
- What got fixed?
- Were we inadvertently assuming incorrect behavior that has changed?
- Were we working around incorrect behavior that's now rectified?
- For .NET dependencies, if it's strongly-named and not installed into
    the GAC, do we need to add binding redirects to configuration? If
    so, where?
- Does the product need to be installed on each developer machine or
    is it a dependency that can be checked in to the central source code
    repository and seamlessly updated?
- If we have to support developers working on different versions of
    our product at the same time and each of our product versions relies
    on different versions of the dependencies, how does this change the
    manner in which developers switch their envrionments from version to
    version?

...and so on. Just because a new version is out doesn't mean your
customer can take it. I, as a customer, have to budget time in the
schedule for investigating all of the above, testing the upgrade on a
standalone developer system, performing any code changes required to
take the upgrade, and synchronizing any updates to the developer
environments.

So "release early, release often" doesn't help me much in this scenario,
and contacting your support department to ask questions about version
1.2 and you not helping me because the first line of support is to
"update to version 1.3 and see if the issue is fixed" is crap. (I
understand this line more from open-source/freeware projects than I do
if I paid a licensing fee and expect support.)

**My message to the "Release Early, Release Often" folks: Remember who
your end users are.** It's great that you're getting the latest version
out as often as possible, but it may not be feasible for your customers
to take what you're dishing out as soon as it's available.
