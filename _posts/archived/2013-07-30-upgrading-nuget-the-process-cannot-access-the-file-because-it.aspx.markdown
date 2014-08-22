---
layout: post
title: "Upgrading NuGet - The process cannot access the file because it is being used by another process"
date: 2013-07-30 -0800
comments: true
disqus_identifier: 1822
tags: [Visual Studio]
---
I tried to update to the latest version of NuGet in Visual Studio
recently and failed. Miserably. The error I kept getting was:

`The process cannot access the file because it is being used by another process.`

Totally generic, not even any info about the file being locked.

Looking in the log, I see the following error:

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

Again, no info about which file is locked.

I used
[ProcMon.exe](http://technet.microsoft.com/en-us/sysinternals/bb896645.aspx)
to figure out the sharing violation was happening on NuGet.pkgdef in the
new installation of NuGet. Of course, it was happening at exactly the
wrong point in the installation process, so I ended up with 10 or 15
nearly-installed-but-corrupted copies of NuGet.

I’m pretty sure this has to do with our antivirus software holding a
lock just a little too long on the file, but who’s to say. I just needed
it fixed.

**Here’s how I fixed it.**

1.  Close all instances of Visual Studio.
2.  Go to your global Visual Studio extensions folder. NuGet doesn’t
    install in your per-user folder; instead, you’ll see it in Program
    Files. Something like: 
    `C:\Program Files (x86)\Microsoft Visual Studio 11.0\Common7\IDE\Extensions`
3.  Look in that folder. You will see a lot of randomly named folders
    like “sdjfksiov.djd” and so on. Most (if not all) of those are
    NuGet. You’ll want to be aware of which ones are NuGet and which
    ones aren’t, particularly if you have other extensions installed.
    (You can tell if it's NuGet because it'll have a bunch of
    `NuGet.*.dll` files in there. If you don't see NuGet stuff in there,
    you'll want to keep it.)
4.  Rename that Extensions folder  to something like: 
    `C:\Program Files (x86)\Microsoft Visual Studio 11.0\Common7\IDE\Extensions_RENAMED`
5.  Download NuGet [directly from the Visual Studio extension
    gallery](http://visualstudiogallery.msdn.microsoft.com/27077b70-9dad-4c64-adcf-c7cf6bc9970c).
6.  Execute the downloaded `NuGet.Tools.vsix` file you just downloaded.
    **Don’t do it through Visual Studio.** Just double-click the .vsix
    file to install it.
7.  NuGet should successfully install. As part of that install, it will
    create the Extensions folder again, so you will once again see 
    `C:\Program Files (x86)\Microsoft Visual Studio 11.0\Common7\IDE\Extensions`
8.  Open up your *renamed* extensions folder and move all of the
    **non-NuGet extensions** into the new Extensions folder.
9.  Now open Visual Studio. You should see the new version of NuGet
    installed and working.
10. You can delete that *renamed* Extensions folder *once you’ve
    verified everything is working*.

I fought with this for a long time. Enough that I corrupted my whole VS
install and had to pave my machine and fully reinstall. Hopefully this
will help other folks that see the same issue.

One additional note: My local user account isn't an administrator, but
when I need to do admin operations I can provide credentials. **This
process seems to require you're actually running as an administrator
account.** Simply providing credentials to elevate the privileges didn't
work for me.

