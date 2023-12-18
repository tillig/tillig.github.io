---
layout: post
title: "Upgrading NuGet - The process cannot access the file because it is being used by another process"
date: 2013-07-30 -0800
comments: true
disqus_identifier: 1822
tags: [vs]
---
I tried to update to the latest version of NuGet in Visual Studio recently and failed. Miserably. The error I kept getting was:

`The process cannot access the file because it is being used by another process.`

Totally generic, not even any info about the file being locked.

Looking in the log, I see the following error:

```text
7/29/2013 7:30:36 AM - Install Error : System.IO.IOException: The process cannot access the file because it is being used by another process.
    at System.IO.__Error.WinIOError(Int32 errorCode, String maybeFullPath)
    at System.IO.__Error.WinIOError()
    at System.IO.File.InternalMove(String sourceFileName, String destFileName, Boolean checkHost)
    at Microsoft.VisualStudio.ExtensionManager.ExtensionManagerService.AtomicallyDeleteFiles(IEnumerable`1 filePaths, Boolean justMarkForDeletion)
    at Microsoft.VisualStudio.ExtensionManager.ExtensionManagerService.DeleteDiscoverableFiles(IInstalledExtension extension)
    at Microsoft.VisualStudio.ExtensionManager.ExtensionManagerService.UninstallInternal(IInstalledExtension extension, Boolean forceDelete)
    at Microsoft.VisualStudio.ExtensionManager.ExtensionManagerService.CommitInstalledAndUninstalledExtensions(IEnumerable`1 installedExtensions, IEnumerable`1 uninstalledExtensions, IEnumerable`1 packComponentChanges)
    at Microsoft.VisualStudio.ExtensionManager.ExtensionManagerService.BeginInstall(IInstallableExtension installableExtension, Boolean perMachine, AsyncOperation asyncOp)
    at Microsoft.VisualStudio.ExtensionManager.ExtensionManagerService.InstallWorker(IInstallableExtension extension, Boolean perMachine, AsyncOperation asyncOp)
```

Again, no info about which file is locked.

I used [ProcMon.exe](http://technet.microsoft.com/en-us/sysinternals/bb896645.aspx) to figure out the sharing violation was happening on NuGet.pkgdef in the new installation of NuGet. Of course, it was happening at exactly the wrong point in the installation process, so I ended up with 10 or 15 nearly-installed-but-corrupted copies of NuGet.

I'm pretty sure this has to do with our antivirus software holding a
lock just a little too long on the file, but who's to say. I just needed
it fixed.

**Here's how I fixed it.**

1. Close all instances of Visual Studio.
2. Go to your global Visual Studio extensions folder. NuGet doesn't
    install in your per-user folder; instead, you'll see it in Program
    Files. Something like:
    `C:\Program Files (x86)\Microsoft Visual Studio 11.0\Common7\IDE\Extensions`
3. Look in that folder. You will see a lot of randomly named folders
    like "sdjfksiov.djd" and so on. Most (if not all) of those are
    NuGet. You'll want to be aware of which ones are NuGet and which
    ones aren't, particularly if you have other extensions installed.
    (You can tell if it's NuGet because it'll have a bunch of
    `NuGet.*.dll` files in there. If you don't see NuGet stuff in there,
    you'll want to keep it.)
4. Rename that Extensions folder  to something like:
    `C:\Program Files (x86)\Microsoft Visual Studio 11.0\Common7\IDE\Extensions_RENAMED`
5. Download NuGet [directly from the Visual Studio extension
    gallery](http://visualstudiogallery.msdn.microsoft.com/27077b70-9dad-4c64-adcf-c7cf6bc9970c).
6. Execute the downloaded `NuGet.Tools.vsix` file you just downloaded.
    **Don't do it through Visual Studio.** Just double-click the .vsix
    file to install it.
7. NuGet should successfully install. As part of that install, it will
    create the Extensions folder again, so you will once again see
    `C:\Program Files (x86)\Microsoft Visual Studio 11.0\Common7\IDE\Extensions`
8. Open up your *renamed* extensions folder and move all of the
    **non-NuGet extensions** into the new Extensions folder.
9. Now open Visual Studio. You should see the new version of NuGet
    installed and working.
10. You can delete that *renamed* Extensions folder *once you've
    verified everything is working*.

I fought with this for a long time. Enough that I corrupted my whole VS
install and had to pave my machine and fully reinstall. Hopefully this
will help other folks that see the same issue.

One additional note: My local user account isn't an administrator, but
when I need to do admin operations I can provide credentials. **This
process seems to require you're actually running as an administrator
account.** Simply providing credentials to elevate the privileges didn't
work for me.

**UPDATE FOR VS 2015 - THIS TRICK MAY OR MAY NOT ALWAYS WORK**: After installing VS 2015 RC1 I found this problem started happening with many more extensions besides just NuGet. I'm not sure if VS 2015 extensions install differently or if more extensions have just adopted the way NuGet installs. There's also the added challenge of add-in dependencies.

For example, the "Powershell Tools" extension immediately had an update after install. I tried this, but found that "Powershell Tools" relies on another add-in also being installed, so having an empty extensions folder doesn't work. However, after locating the dependencies and making sure those were all in place, I still ended up with the file lock error. **I never did find a combination of actions that could work around it.**

I effectively can't update any add-ins after they're installed in VS 2015 RC1 on the machine with the guilty antivirus software. Installing on a VM *without* the antivirus software, everything works swimmingly.

**UPDATE MAY 8, 2017**: After a lot of research I found that this was caused, for me, by **the McAfee Endpoint Encryption full-disk encryption product**, not the antivirus. The lack of antivirus in my initial tests was a red herring; the VM I tested with *also* did not have the full-disk encryption product running. [This problem was acknowledged as an issue in this McAfee KB article.](https://kc.mcafee.com/corporate/index?page=content&id=KB85636&snspd-1015&locale=en_GB&viewlocale=en_GB) The solution if this is what's causing it for you is to tell full-disk encryption to exclude `devenv.exe` and `VSIXInstaller.exe`. Note the KB article doesn't mention `VSIXInstaller.exe`; that's an omission in the article.

Here's a registry snippet to tell McAfee Endpoint Encryption to exclude these files. Once you do that, reboot, and the problem should be solved. I've tested this on Windows 7, Windows 2008 Server, and Windows 2012 Server. *YMMV; I'm not responsible if your stuff breaks; disclaimer disclaimer disclaimer.*

```text
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\services\MfeEEFF\ExemptedProcesses]
"1"="devenv.exe"
"2"="VSIXInstaller.exe"
```
