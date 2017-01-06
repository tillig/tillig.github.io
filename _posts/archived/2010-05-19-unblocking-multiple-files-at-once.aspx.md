---
layout: post
title: "Unblocking Multiple Files at Once"
date: 2010-05-19 -0800
comments: true
disqus_identifier: 1642
tags: [GeekSpeak]
---
When you download a file from the internet and save it to your Windows
computer, it "knows" where it came from and you have to right-click it
and click an "Unblock" button to allow it to run. It's a security thing,
and generally it's a good idea.

![The "Unblock" button for downloaded
files.](http://cr-documentor.googlecode.com/svn/site/screenshots/windows_unblock_button.png "The "Unblock" button for downloaded files.")

**What happens if you have 10, 100, or even 1000 different files you
need to unblock?**You don't want to do that manually.

1.  [Go download the SysInternals "Streams"
    utility](http://technet.microsoft.com/en-us/sysinternals/bb897440.aspx).
2.  Run it on the files you want to unblock using the "-d" option and
    delete the alternate filestreams. It will look something like this
    if you're unblocking a ton of help documents: 
    `streams -d *.chm`

The reason this works is that the information about where you downloaded
the file(s) from is stored in an alternate filestream. Nuking those
alternate streams means Windows will think it's a local file and will
stop blocking it.

