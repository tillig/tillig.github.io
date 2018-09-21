---
layout: post
title: "Docker on Windows Subsystem for Linux using VirtualBox and Docker Machine"
date: 2018-09-20 -0800
comments: true
tags: [kubernetes,docker,windows,linux]
description: "Using VirtualBox and Docker Machine you can get Docker running on Windows and Windows Subsystem for Linux without Hyper-V or dual-boot."
---
I use [VirtualBox](https://www.virtualbox.org/) a lot. I have a few different [Vagrant](https://www.vagrantup.com/) images, not all of which have Hyper-V equivalents. There's also a lot of mindshare for VirtualBox as a default virtualization provider when it comes to working with Kubernetes and Docker tooling. Defaults are for VirtualBox with Hyper-V added later and not quite as flexible.

Of course, you can't have Hyper-V and VirtualBox running at the same time. It's a problem many have run into. The default on Docker for Windows is to use Hyper-V and it pretty well hides the details from you to get things running. If you want to use VirtualBox, the common solution is to [add an entry to optionally enable Hyper-V at boot.](https://www.hanselman.com/blog/SwitchEasilyBetweenVirtualBoxAndHyperVWithABCDEditBootEntryInWindows81.aspx)

**I want my VirtualBox / Vagrant images on Windows.**

**_And_ I want my Docker.**

**How do I make that happen?**

Well, before there was Docker for Windows, [there was "Docker Toolbox."](https://docs.docker.com/toolbox/toolbox_install_windows/) Part of Docker Toolbox was [`docker-machine`, sort of like Vagrant but for bringing up a preconfigured Docker host](https://github.com/docker/machine). Conveniently, `docker-machine` runs in VirtualBox! So let's get Docker running.

First, **install [VirtualBox](https://www.virtualbox.org/)** if you don't already have that installed. Obviously you can't have Hyper-V enabled if you're doing this.

Next, **enable [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)** and install a Linux distro. I installed Ubuntu.

In your WSL Ubuntu, **[install Docker CE](https://docs.docker.com/install/linux/docker-ce/ubuntu/)**. Once this is done, you're going to try running `docker run hello-world` and you'll get a message like this:

```
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
```

No, it's not. You can't run Docker inside Windows Subsystem for Linux. At this point, you'll see solutions where people [install Docker for Windows and expose the daemon on port 2375](https://medium.com/@sebagomez/installing-the-docker-client-on-ubuntus-windows-subsystem-for-linux-612b392a44c4). But... that requires Hyper-V, and we're not using Hyper-V. So.

Back in Windows land, **go download [`docker-machine`](https://github.com/docker/machine/releases)**. Put that somewhere in your path so you can call it.

**Run: `docker-machine create docker-host`**

This is the magic, right here. This will automatically provision a VirtualBox VM running a small Linux host that just exposes the Docker daemon. It might take a second, be patient. When it's done you'll have a VM called `docker-host` running.

You need some info about the Docker host, so **run `docker-machine env docker-host`** - this will dump a bunch of values you'll want. Here's what a PowerShell output looks like:

```
PS> .\docker-machine env docker-host
$Env:DOCKER_TLS_VERIFY = "1"
$Env:DOCKER_HOST = "tcp://192.168.99.100:2376"
$Env:DOCKER_CERT_PATH = "C:\Users\username\.docker\machine\machines\docker-host"
$Env:DOCKER_MACHINE_NAME = "docker-host"
$Env:COMPOSE_CONVERT_WINDOWS_PATHS = "true"
# Run this command to configure your shell:
# & "C:\util\docker-machine.exe" env docker-host | Invoke-Expression
```

Those environment variables are the important bits.

**Jump back in WSL Ubuntu and edit your `~/.bash_profile`** to have those values.

```bash
export DOCKER_HOST=192.168.99.100:2376
export DOCKER_TLS_VERIFY=1
export DOCKER_CERT_PATH=/mnt/c/users/username/.docker/machine/machines/docker-host
export DOCKER_MACHINE_NAME=docker-host
export COMPOSE_CONVERT_WINDOWS_PATHS=true
Note the cert path has changed a bit - WSL mounts the C: drive at /mnt/c so you need to update accordingly. Also, if you're not using Windows-formatted Docker Compose files, you probably don't need that COMPOSE_CONVERT_WINDOWS_PATHS bit, but I left it.
```

**Run `source ~/.bash_profile`** to update the info in your environment.

**You should now have**:

- A VirtualBox VM called `docker-host` created by `docker-machine` up and running.
- A WSL Ubuntu instance with Docker installed and configured to use the docker-host daemon.

**In WSL Ubuntu try it again: `docker run hello-world`**

You should get the message from the Docker `hello-world` container. Yay! Docker on Windows using VirtualBox!

Additional items to note:

- The IP address of the `docker-host` may change. `docker-machine` makes a DHCP server in VirtualBox that enables the daemon only for your local machine, but depending on how many Docker hosts you have running or other VMs using that network adapter you may see the IP address shift. You'll have to update your `~/.bash_profile` if that happens.
- You can change how much CPU and memory is associated with the `docker-host` you create. Run `docker-machine` to see the available parameters and help.
- You should be able to install the Docker CLI for Windows and tell it (using the `docker-host` environment variables) to also use that `docker-host`. That way WSL and Windows itself would share the host. I haven't tried this myself. My goal was getting WSL running with Docker, so that's what I did. (Why not just use a Linux VM in VirtualBox and skip all this? Great question. I could make something up like, "This way all your VirtualBox machines and the physical machine can use the same Docker host and share resources," but... Oh, look at the time! I have to, uh, go now.)