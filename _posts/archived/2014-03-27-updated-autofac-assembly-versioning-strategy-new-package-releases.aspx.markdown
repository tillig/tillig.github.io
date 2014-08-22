---
layout: post
title: "Updated Autofac Assembly Versioning Strategy - New Package Releases"
date: 2014-03-27 -0800
comments: true
disqus_identifier: 1838
tags: [.NET]
---
Until now, Autofac assemblies have changed version using a slow-changing
assembly version but a standard [semantic version](http://semver.org/)
for the NuGet package and file version.

The benefit of that approach is we could avoid some painful assembly
redirect issues.

The drawback, of course, is that even minor changes (adding new
functionality in a backwards-compatible way) can cause problems – one
project uses version 3.0.0.0 of Autofac and works great, a different
project also uses version 3.0.0.0 of Autofac but breaks because it needs
some of that newer functionality. That’s hard to troubleshoot and pretty
much impossible to fix. (It’s the *wrong version* of 3.0.0.0? That’s a
*new kind of dependency hell*.)

As a compromise to that, we’ve switched to work sort of like MVC and Web
API – **for major and minor (X.Y) changes, the assembly version will
change, but not for patch-level changes; for all changes, the NuGet
package and file versions will change.**

This initial switch will potentially be a little painful for folks since
**it means every Autofac package has to be re-issued to ensure assembly
dependencies line up**. After that, we should be running smooth again.

**You’ll see a 0.0.1 update to the packages** – all of those have the
new assemblies with the new versions and proper prerequisite references.
(Not entirely sure 0.0.1 was the right semantic version increment, but,
well, *c’est la vie*.)

**Really sorry about the bit of upgrade pain here.** I had hoped we
could sneak the change out on a package-by-package basis, but as each
integration or extras package gets released, it gets its dependencies
set and has assembly references, so we’d end up releasing everything a
few times – the first time for when the version of the integration
package changes; a second time for when core Autofac changes; and one
more time for every time any other dependencies change. For packages
like Autofac.Extras.Multitenant.Wcf (which relies on Autofac,
Autofac.Integration.Wcf, and Autofac.Extras.Multitenant), it’d mean
releasing it a minimum of four times just for the assembly reference
changes. Best just to rip the bandage off, right? (I hope?)

**NuGet should take care of the assembly redirect issues for you, but if
you see assembly dependency conflict warnings in your build, it’s
because you’ve not updated all of your Autofac packages.**

Relevant GitHub issues:
[\#502](https://github.com/autofac/Autofac/issues/502),
[\#508](https://github.com/autofac/Autofac/issues/508)

