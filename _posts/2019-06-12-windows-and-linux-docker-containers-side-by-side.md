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

### UPDATE June 14, 2019

I've found since working in this mixed environment that there are things that don't work as one might entirely expect.

- Networking: With Linux-only containers on Windows you get a `DockerNAT` virtual network switch you can tweak if needed to adjust network connectivity. Under mixed containers, you use the Windows Container network switch, `nat` and you really can't do too much with that. I've had to reset my network a few times while trying to troubleshoot things like network connections whilst on VPN.
- Building container images that reference files from other images: A standard .NET Core build-in-container situation is to create, in one Dockerfile, two container images - the first builds and publishes the app, the second copies the published app into a clean, minimal image. When in mixed container world, I get a lot of errors like, "COPY failed: file does not exist." I can look in the intermediate containers and the files _are_ all there, so there's something about being unable to mount the filesystem from one container to copy into the other container.

Unrelated to mixed containers, it seems I can't get any container to connect to the internet when I'm on my company's VPN. VPN seems to be a pretty common problem with Docker on Windows. I haven't solved that.

It appears there's still a lot to work out here in mixed container land. You've been warned.
