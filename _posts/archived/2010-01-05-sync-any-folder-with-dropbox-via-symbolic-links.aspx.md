---
layout: post
title: "Sync Any Folder with Dropbox via Symbolic Links"
date: 2010-01-05 -0800
comments: true
disqus_identifier: 1601
tags: [GeekSpeak]
---
I have some files (like my local Subversion repository, some documents,
etc.) that I need to sync between computers and I was recommended
[Dropbox](http://www.dropbox.com) as the way to get that done. I signed
up, installed it, and it works brilliantly.

That said, my primary complaint is that it only synchronizes files
inside a special "My Dropbox" folder that it creates. Anything you want
to synchronize has to live in there. Thing is, while I don't mind
changing the location of some things, like my documents, I really would
rather not change the location of other things, like my local Subversion
repository. I like it in "C:\\LocalSVN" rather than "C:\\Documents and
Settings\\tillig\\My Documents\\My Dropbox\\LocalSVN" or whatever.

Turns out you can use the magic of symbolic links to fix that right up.
If you create a symbolic link (junction point) inside "My Dropbox" to
content that actually lives outside "My Dropbox" then the content gets
synchronized just fine but can live wherever you want.

If you are in Windows XP, you'll need to [go get a free copy of
Junction](http://technet.microsoft.com/en-us/sysinternals/bb896768.aspx)
and put it somewhere in your path like your `C:\Windows\System32`
folder. In Windows Vista or Windows 7, you'll use the built-in "mklink"
command.

1. Get Dropbox set up and synchronizing on your computer without the
    external content.
2. Open a command prompt as an administrator on your machine.
3. Change to the "My Dropbox" folder that you set up.
    In Vista or Windows 7 it'll be like:
    `cd "\Users\yourusername\Documents\My Dropbox"`
    In Windows XP it'll be like:
    `cd "\Documents and Settings\yourusername\My Documents\My Dropbox"`
4. Create a directory link to the folder containing the external
    content.
    In Vista or Windows 7 it'll be like:
    `mklink /d "External Content" "C:\Path\To\External Content"`
    In Windows XP it'll be like:
    `junction "External Content" "C:\Path\To\External Content"`

That's it. Dropbox will see the symbolic directory link as a new folder
with content it needs to synchronize and it'll get done.

Note that you can do things the other way around, too - move the content
into the "My Dropbox" folder and then create the symbolic link from the
original location into the moved content... but this way it means you
don't have to do the moving to begin with. Admittedly, I kinda wish I
had figured this out before I moved everything, but now I know.
