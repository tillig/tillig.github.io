---
layout: post
title: "Replacing Notepad with Notepad2 on Windows 2003"
date: 2009-02-03 -0800
comments: true
disqus_identifier: 1493
tags: [GeekSpeak]
---
This process has been posted for [Windows XP
SP2](http://weblogs.asp.net/rweigelt/archive/2004/08/12/213085.aspx) and
[Vista](http://jens-schaller.de/blog/2007/07/31/102.htm), but I tried
both of those to no avail on this Windows 2003 system I'm working on.
The idea: Replace standard Windows Notepad with
[Notepad2](http://www.flos-freeware.ch/notepad2.html).

What I did to get it working:

1.  Logged in as Administrator.
2.  Downloaded Notepad2, extracted Notepad2.exe to my desktop, and
    renamed it notepad.exe.
3.  [From the Vista
    instructions](http://jens-schaller.de/blog/2007/07/31/102.htm), I
    changed the owner of the file to the Administrators group.
4.  Made a backup copy of the original notepad.exe in C:\\WINDOWS.
5.  Ran a batch file to copy the notepad.exe from my desktop into the
    SEVEN locations I found it under in the C:\\WINDOWS folder.

Only by copying it literally over all seven of the locations I found it
did the change finally take. Here's the batch script that I ran from my
desktop:

    copy /y notepad.exe "%windir%\system32\dllcache\notepad.exe"
    copy /y notepad.exe "%windir%\system32\notepad.exe"
    copy /y notepad.exe "%windir%\notepad.exe"
    copy /y notepad.exe "%windir%\$NtServicePackUninstall$\notepad.exe"
    copy /y notepad.exe "%windir%\LastGood\notepad.exe"
    copy /y notepad.exe "%windir%\LastGood\system32\notepad.exe"
    copy /y notepad.exe "%windir%\ServicePackFiles\i386\notepad.exe"

It felt like the nuclear option to me, but it was the only way to make
it work. (Should you choose to do this, you **do so at your own risk** -
I'm not responsible if the system feels like you're hacking it and sucks
you in like in *Tron* or something.)

