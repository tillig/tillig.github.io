---
layout: post
title: "Changing Windows Service Runtime Behavior with Typemock Isolator"
date: 2009-07-01 -0800
comments: true
disqus_identifier: 1545
tags: [.NET]
---
Let's say you have a Windows service written in .NET that you got from a
third party. It doesn't really matter what it does - maybe it monitors
something or responds to web service requests or something. And let's
say it works really well and does everything you need it to do... except
this *one little thing* way down the stack is misbehaving.

You've done your homework - you've used
[Reflector](http://www.red-gate.com/products/reflector/) and found
exactly what the problem is, and it's just a small thing - maybe it
reads from a fixed configuration location and you need it to read from
somewhere else. Maybe it throws an exception because it isn't handling
errors right. Whatever it might be, you have this boxed service that
would be perfect for your needs if only this one thing could be fixed.

So what do you do? **One option:**[**Typemock
Isolator**](http://www.plimus.com/jsp/redirect.jsp?contractId=1655929&referrer=tillig)**.**

**WARNING:** What I'm going to show you may make you feel a little
weird. You may intially think "it's wrong" or something. But as you're
thinking this, consider - what if this could save you a year of
development time? What if it could save you a ton of QA time in testing
every function of the service and allow you to focus only on the code
path you've changed? From a pragmatic standpoint, would it be worth it?

**ADDITIONAL WARNING:** If you actually do this, it's all at your own
risk. Seriously. It's all you, baby. "Works on my machine!"

Normally you'd think of Typemock Isolator as a testing tool. But its
ability to run via the profiler API and substitute in behavior for just
about anything makes it far more useful than just testing. For example,
there's [an aspect-oriented programming framework called CThru out on
CodePlex](http://www.codeplex.com/CThru) that uses this functionality.
In our case, we can use Isolator to fix up the problematic behavior in
the boxed service. Here's how you do it:

**Set up a service account that will have Typemock Isolator enabled on
it.** You'll want this to be a separate user account that doesn't do
anything else because you're going to globally enable Typemock Isolator
on any process that account runs. You probably don't actually want that
on anything except this service you're going to fix up, so make it a
dedicated account. You'll need to make sure this account has permissions
to run as a service and has all the permissions it needs to run the
boxed service - like if it reads from a certain file location, the
account will need those rights. You'll get an "Access Denied" error if
you don't set this up right.

**Set the environment for the service account.** To enable Typemock
Isolator, you'll need to set a couple of environment variables. Run
regedit as the service user:
 `runas /user:MACHINENAME\username "regedit"`
 Make sure you don't already have regedit open or this won't work. (It
only allows one instance to run at a time.) Now navigate to the
HKEY\_CURRENT\_USER\\Environment key and add two string (REG\_SZ)
values:

-   Cor\_Enable\_Profiling = 0x1
-   COR\_PROFILER = {B146457E-9AED-4624-B1E5-968D274416EC}

Yes, they look like numbers, but make sure they're string values.
Setting those two environment variables will make it so *any process
that user account runs* will have Typemock Isolator enabled.

**Create a Windows service application.** You'll be using the main entry
point (Program class), but eventually won't need the actual Windows
service. The Windows service in your wrapper project is helpful because
it makes it easier to create an installer.

**Add references.** You will, at a minimum, need to reference the .exe
file that has the boxed service's Main method. If the malfunctioning
component is in a different assembly, you'll need to reference that,
too.

**Set up expectations and call the boxed service's Main method.** Use
Typemock Isolator to replace the problem code with code you want to run,
then just let the boxed service execute as usual. Your Program class
will probably look something like this:

    public static class Program
    {
      public static void Main()
      {
        ExpectationSetup();
        BoxedService.Program.Main();
      }

      public static void ExpectationSetup()
      {
        ReplacementComponent replacement = new ReplacementComponent();
        MalfunctioningComponent fake = new MalfunctioningComponent();
        Isolate.Swap.AllInstances<MalfunctioningComponent>().With(fake);
        Isolate.Swap.CallsOn(fake).WithCallsTo(replacement);
      }
    }

**Create a service installer.** Open up your Windows service class in
the designer. In the Properties window, give your service a name - this
is what the user will see in the Services control panel. Now right-click
on the designer for the service - the background of the designer, not
any components that may be there - and select "Add Installer." This will
add a class called "ProjectInstaller" to your wrapper application.

**Set the installer properties.** Open the "ProjectInstaller" class in
design view. You should see a two components on the designer surface:
"serviceInstaller1" and "serviceProcessInstaller1."

-   Select "serviceInstaller1." In the Properties window, check the
    ServiceName to ensure it's what you want folks to see in the
    Services control panel (it should have taken the name from your
    Windows service). Also set the StartType to be what you want -
    Automatic, Manual, or Disabled.
-   Select "serviceProcessInstaller1." In the Properties window, set the
    Account property to "User."
-   Right-click the designer surface of "ProjectInstaller" and select
    "View Code." In the ProjectInstaller constructor, just after the
    call to "InitializeComponent," update serviceProcessInstaller1
    with the username and password for the service account you created.
    This will make it easier to install; otherwise you have to manually
    go in and set this later.

The constructor of ProjectInstaller will look like this:

    public ProjectInstaller()
    {
      InitializeComponent();
      this.serviceProcessInstaller1.Password = "password";
      this.serviceProcessInstaller1.Username = @"MACHINENAME\username";
    }

**Delete the Windows service from your project.** You only really needed
this to make it easy to create the installer. It doesn't do anything and
you don't need it.

**Build the service wrapper and place the executable in the same folder
as the boxed service.** The reason you want it in the same folder as the
boxed service is because when you pass control on to the boxed service,
it's going to need to find all of its dependencies and such. Rather than
try to fight it into some other place, just stick that tiny .exe you
just built into the folder with the boxed service.

**Stop/disable the boxed service.** If the service you're wrapping is
installed, you need to stop and disable it. You can uninstall it if you
want, but you're going to basically be running a different copy of the
service and you don't want two running.

**Use InstallUtil to install your service wrapper.** With the installer
class you made, it's simple:
 `installutil MyServiceWrapper.exe`
 (Obviously you need to use the name of your service wrapper .exe file
there.) If you ever need to uninstall, it's just as simple:
 `installutil /u MyServiceWrapper.exe`

**Start your service and watch the magic happen.** Typemock Isolator
will replace the behavior you specified, just like it does in a unit
testing environment, but it'll do it in a regular Windows service
runtime environment. You may need to do some additional work if your
boxed service is really complex, but it'll work. (For example, if the
boxed service, BoxedService.exe, has a configuration file,
BoxedService.exe.config, you'll need to copy that for use by your
wrapped service  - MyServiceWrapper.exe.config or whatever. That way the
.NET configuration system will work... but that sort of tweak will be
specific to the boxed service you're wrapping.)

**HOLD THE PHONE. What's the performance impact?** Honestly, I don't
know. You'll have to measure a before-and-after on your own system and
make your own call. You'll probably also want to balance that out
against how much time something like this will save you, etc. It's all
trade-offs, right?

**SAMPLE CODE! WE WANT A SAMPLE!** I created a little sample so you can
see what this looks like. In the solution, you'll find two projects -
"BoxedService," which has a malfunctioning component in it that we want
to fix; and "ServiceWrapper," which has the Isolator expectation setup
that fixes the behavior. Both of these services write to Trace so
[you'll want to have
DebugView](http://technet.microsoft.com/en-us/sysinternals/bb896647.aspx)
so you can watch the trace output without having to fight with the
debugger. Debugging a Windows service is painful.

If you install the BoxedService, you'll see an error message get
periodically written to Trace; uninstall that and install the
ServiceWrapper (running under an account that has Isolator enabled) and
you'll see the problem behavior get replaced.

[[Download ServiceWrapperDemo.zip
(20K)](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!45429&authkey=!AItWlrPc55RXEI4&ithint=file%2czip)]

