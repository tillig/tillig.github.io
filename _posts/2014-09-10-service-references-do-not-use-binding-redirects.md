---
layout: post
title: "Service References Don't Use Binding Redirects"
date: 2014-09-10 -0800
comments: true
tags: [vs,wcf]
---
I've run into this issue a couple of times now and I always forget what the answer is, so... blog time.

We have some WCF service references in our projects and we were in the process of updating the generated code (right click on the reference, "Update Service Reference") when we got an assembly reference error:

`Could not load file or assembly AssemblyNameHere, Version=1.0.0.0, Culture=neutral, PublicKeyToken=1234567890123456 or one of its dependencies. The located assembly's manifest definition does not match the assembly reference.`

Normally you can fix this sort of thing by adding a [binding redirect](http://msdn.microsoft.com/en-us/library/7wd6ex19.aspx) to your `app.config` or `web.config` and calling it a day. But we had the binding redirect in place for the assembly already. What the... ?!

As it turns out, **`svcutil.exe` and the service reference code generation process don't use binding redirects from configuration**. It didn't matter where we put the redirect, we still got the error.

**The fix is to reduce the set of assemblies with types that get reused.** Right-click the service reference and select "Configure Service Reference." Switch the setting to reuse types in referenced assemblies to be very specific. If you aren't actually reusing types from a particular assembly (especially third-party assemblies you aren't building), don't include it in the list.

We were really only reusing types in one assembly, not the whole giant set of assemblies referenced. Cleaning that up removed the need for the binding redirect and everything started working again as normal.