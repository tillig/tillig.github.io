---
layout: post
title: "Windows and Linux Docker Containers: Side by Side!"
date: 2019-06-12 -0800
comments: true
tags: [docker,linux,windows]
description: "Here's how to get Windows and Linux containers running on Docker for Windows at the same time."
---

Working in an environment of mixed containers - both Windows and Linux - I wanted to run them all on my dev machine at the same time if possible. I found [some instructions from a while ago](https://blogs.msdn.microsoft.com/appconsult/2018/09/20/running-containers-based-on-different-platforms-side-by-side-with-docker-preview/) about this but following them didn't work.

Turns out some things have changed in the Docker world so here are some updated instructions.

_As of this writing, I'm on Docker Desktop for Windows 2.0.0.3 (31259) Community Edition._ The instructions here work for that; I can't guarantee more won't change between now and whenever you read this.

1. **Clean up existing containers before switching to Windows containers.** Look to see if you're using Windows containers. Right-click on the Docker icon in the system tray. If you see "Switch to Windows containers..." then you are _not_ currently using Windows containers. Stop any running containers you have and remove all images. You'll need to switch to Windows containers and the image storage mechanism will change. You won't be able to manage the images once you switch.

2. **Switch to Windows Containers.** Right-click on the Docker icon in the system tray and select "Switch to Windows containers..." If you're already using Windows containers, great!

3. **Enable experimental features.** Right-click on the Docker icon in the system tray and select "Settings." Go to the "Daemon" tab and check the box marked "Experimental features."

![Enable experimental features.]({{ site.url }}/images/20190612_experimentalfeatures.jpg)

That's it! You're ready to run side-by-side containers.

**The big key is to specify `--platform` as `linux` or `windows` when you run a container.**

Open up a couple of PowerShell prompts.

In one of them, run `docker images` just to make sure things are working. The list of images will probably be empty if you had to switch to Windows containers. If you were already on Windows containers, you might see some.

In that same PowerShell window, run:

```ps
docker run --rm -it --platform windows microsoft/nanoserver:1803
```

This is a command-prompt-only version of Windows Server. You should get a `C:\>` prompt once things have started up.

Leave that there, and in the _other_ PowerShell window, run:

```ps
docker run --rm -it --platform linux ubuntu
```

This will get you to an Ubuntu shell.

See what you have there? Windows and Linux running side by side!

![Windows and Linux containers - side by side!]({{ site.url }}/images/20190612_sidebyside.jpg)

Type `exit` in each of these containers to get out of the shell and have the container clean itself up.

Again, **the big key is to specify `--platform` as `linux` or `windows` when you run a container.**

If you forget to specify the `--platform` flag, it will default to Windows _unless you've already downloaded the container image_. Once you have used the image, the correct version will be found and used automatically:

```ps
# Works because you already used the image once.
docker run --rm -it ubuntu
```

If you try to run a Linux container you haven't already used, you _may_ get a message like this:

`no matching manifest for windows/amd64 10.0.18362 in the manifest list entries`

I'm not sure on the particulars on why sometimes `--platform` is required and sometimes it's not. Even after removing all my container images, I was able to run an Ubuntu container without specifying platform, like some cache was updated to indicate which platform should be used by default. YMMV. It doesn't _hurt_ to include it, however, if you try to use `--platform` on another machine it may not work - **you can only use it when experimental features are enabled**.
