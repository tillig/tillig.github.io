---
layout: post
title: "Using Portable Class Libraries - Update .NET Framework"
date: 2013-01-21 -0800
comments: true
disqus_identifier: 1804
tags: [net]
---
We switched [Autofac](https://autofac.googlecode.com) 3.0 to be a
Portable Class Library so we can target multiple platforms. In consuming
the updated Autofac, I've noticed some folks receive errors like this at
runtime:

    Test 'MyNamespace.MyFixture.MyTest' failed: System.IO.FileLoadException : Could not load file or assembly 'System.Core, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e, Retargetable=Yes' or one of its dependencies. The given assembly name or codebase was invalid. (Exception from HRESULT: 0x80131047)
        at Autofac.Builder.RegistrationData..ctor(Service defaultService)
        at Autofac.Builder.RegistrationBuilder`3..ctor(Service defaultService, TActivatorData activatorData, TRegistrationStyle style)
        at Autofac.RegistrationExtensions.RegisterInstance[T](ContainerBuilder builder, T instance)
        MyProject\MyFixture.cs(49,0): at MyNamespace.MyFixture.MyTest()

**You can solve this by getting the latest .NET framework patches from
Windows Update.** [Article KB2468871 and the associated
patch](http://support.microsoft.com/kb/2468871) specifically address
this, however in practice I've noticed that specific patch doesn't
always fix it for everyone. I actually don't know if it's a different
patch that fixes the 100% case or if it's different patches for
different people. What I do know is that once the machine is patched up
with the latest, the problem goes away.

If you're on a domain where there's an internal [Windows Server Update
Services](http://technet.microsoft.com/en-us/windowsserver/bb332157.aspx)
instance running, you may think you have the latest **but you might
not**. If it looks like you're all patched up but still seeing the
error, **make sure you've checked online for updates**.

See here, it *looks* like I've got the latest…

![Check online for updates from Microsoft
Update]({{ site.url }}/images/20130121_wsus.png)

…but really, I'm missing several updates.

![After checking online, several updates were
missing]({{ site.url }}/images/20130121_wsus2.png)

**A note on the version 2.0.5.0 you see in the error message**: That's
the version of the framework Autofac references as an artifact of being
a Portable Class Library. 2.0.5.0 is Silverlight, which is one of the
platforms we target. You won't see it installed on your machine, don't
go trying to manually hack around and install it. But don't freak out,
that version is expected and it's OK. The .NET framework patches should
allow you to dynamically redirect that reference at runtime to the
appropriate version (e.g., 4.0.0.0) and the error will go away.

