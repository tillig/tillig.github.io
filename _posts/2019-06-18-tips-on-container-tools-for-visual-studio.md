---
layout: post
title: "Tips on Container Tools for Visual Studio"
date: 2019-06-18 -0800
comments: true
tags: [docker,vs]
description: "A few tips I recently learned about working with Container Tools for Visual Studio."
---

[Container Tools in Visual Studio](https://docs.microsoft.com/en-us/visualstudio/containers/overview?view=vs-2019) offers the ability to develop an application and have it run inside a container while Visual Studio debugs it on your host machine. It's a cool way to see how your app will behave in the container environment with the flexibility of edit-and-refresh functionality that doesn't require the overhead of rebuilding the container each time.

I ran into a bunch of trouble getting some things working the other day which caused me to dive a little deeper into how this works and I found a few interesting things. Gotchas? Tips? Sure. That.

**I'm primarily using the single-container support** - not the Docker Compose multi-container support. If you're all Docker Compose up in there, this may or may not be helpful to you.

## You Only Need 'base' for VS

The `Dockerfile` that gets generated has a bunch of named intermediate containers in it - `base`, `build`, `publish`. This is helpful if you don't already have a `Dockerfile`, but if you're really just trying to get debugging working with VS, you only need the `base` container. You can delete or modify the others.

**UPDATE August 16, 2019**: [Microsoft has some documentation now on how Container Tools builds Dockerfiles.](https://docs.microsoft.com/en-us/visualstudio/containers/container-build?view=vs-2019) It's not necessarily `base` that's a magic target - it's "the first stage found in the Dockerfile."

When VS builds the container, you can see in the Container Tools output window it's running a command like this:

`docker build -f "C:\src\solution\project\Dockerfile" -t project:dev --target base  --label "com.microsoft.created-by=visual-studio" "C:\src\solution"`

The `--target base` is the key - it's not going to build the rest.

(You can change this using `<DockerfileFastModeStage>` in your project - see below.)

## VS Controls Container Startup and Teardown

In Visual Studio the container for debugging will get built and will start as soon as you select the `Docker` configuration for running. Even if you don't actually start a debug setting, the container will be pulled, built, and run in the background. The container will continue to run until VS shuts down.

`docker run -dt -v "C:\Users\yourname\vsdbg\vs2017u5:/remote_debugger:rw" -v "C:\src\solution\project:/app" -v "C:\Users\yourname\AppData\Roaming\Microsoft\UserSecrets:/root/.microsoft/usersecrets:ro" -v "C:\Users\yourname\.nuget\packages\:/root/.nuget/fallbackpackages2" -v "C:\Program Files\dotnet\sdk\NuGetFallbackFolder:/root/.nuget/fallbackpackages" -e "DOTNET_USE_POLLING_FILE_WATCHER=1" -e "ASPNETCORE_ENVIRONMENT=Development" -e "NUGET_PACKAGES=/root/.nuget/fallbackpackages2" -e "NUGET_FALLBACK_PACKAGES=/root/.nuget/fallbackpackages;/root/.nuget/fallbackpackages2" -p 58260:80 --entrypoint tail project:dev -f /dev/null`

There are some interesting things to note here:

- **A ton is mounted through volumes.** Look at all those `-v` commands. There's a remote debugger; your application code/source; user secrets; your local NuGet package cache; and your local installation of fallback packages. You'll get a warning that pops up if you don't have volume sharing enabled in Docker. You have to allow the drive with your source code to be mounted. _VPNs and firewalls can really mess this up by blocking the SMB port._
- **The remote debugger isn't associated with a VS 2017 install.** The path to the remote debugger you see is `C:\Users\yourname\vsdbg\vs2017u5` but this isn't part of a VS 2017 install. Even if you only have VS 2019, it's still this path. It could change later, but don't be fooled.
- **The default environment is `Development`.** The Container Tools put the `ASPNETCORE_ENVIRONMENT=Development` thing in there. You can override this by updating `launchSettings.json` (see below).
- **The entrypoint is _not_ your application.** Notice the entrypiont is `tail -f /dev/null`. This just ensures the container keeps running but isn't tied to your application. A separate `docker run` call will be issued when it's time to start your app.

During build, you'll see something like this in the Build output window:

`docker exec -i 40b49d8d963bb682a08fed17248212bcfd939456c8030689e9a28f17f5b067e3 /bin/sh -c "if PID=$(pidof dotnet); then kill $PID; fi"`

What this is doing is killing the running `dotnet` command in the container so any files that might be getting regenerated by Visual Studio or whatever won't mess up the running process.

When you start debugging, the remote debugger starts in the container. I used [Process Explorer](https://docs.microsoft.com/en-us/sysinternals/downloads/process-explorer) and [Process Monitor](https://docs.microsoft.com/en-us/sysinternals/downloads/procmon) to look for `docker` commands going by. I see that the command to start the remote debugger is:

`"docker" exec -i 40b49d8d963bb682a08fed17248212bcfd939456c8030689e9a28f17f5b067e3 /bin/sh -c "ID=.; if [ -e /etc/os-release ]; then . /etc/os-release; fi; if [ $ID = alpine ] && [ -e /remote_debugger/linux-musl-x64/vsdbg ]; then VSDBGPATH=/remote_debugger/linux-musl-x64; else VSDBGPATH=/remote_debugger; fi; $VSDBGPATH/vsdbg --interpreter=vscode"`

**UPDATE June 18, 2019**: After publishing this post [I found out](https://github.com/microsoft/DockerTools/issues/193#issuecomment-503290222) that Visual Studio communicates the `dotnet` startup command directly to the remote debugger. The debugger is what launches the `dotnet` command and provides the additional environment variables from `launchSettings.json`. This allows VS to catch any startup errors.

Using `ps -axwwe` on a running container being debugged, I can see the command line and the environment for the running `dotnet` process. The command line looks like:

`/usr/bin/dotnet --additionalProbingPath /root/.nuget/fallbackpackages2 --additionalProbingPath /root/.nuget/fallbackpackages bin/Debug/netcoreapp2.1/project.dll`

The environment is big so I won't paste it all here, but I can see `environmentVariables` things (from `launchSettings.json`) show up.

## launchSettings.json Gets Extra Stuff

Once you've right-clicked in VS and added Docker support to your ASP.NET Core project, `launchSettings.json` will be updated to include a `Docker` configuration that looks something like this:

```json
{
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "https://localhost:44308",
      "sslPort": 44308
    }
  },
  "$schema": "http://json.schemastore.org/launchsettings.json",
  "profiles": {
    "IIS Express (Development)": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "launchUrl": "",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "Kestrel (Development)": {
      "commandName": "Project",
      "launchBrowser": true,
      "launchUrl": "",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      },
      "applicationUrl": "https://localhost:44308"
    },
    "Docker": {
      "commandName": "Docker",
      "launchBrowser": true,
      "launchUrl": "{Scheme}://{ServiceHost}:{ServicePort}/",
      "httpPort": 58260,
      "useSSL": false,
      "sslPort": 44308
    }
  }
}
```

There are some things to note in here.

- **`environmentVariables` will work, but just in the app.** Just like in the other configruations that have an `environmentVariables` node, you can add that to the `Docker` node and the environment variables there will be available in your application. However, they won't be added as global environment variables to the container - they'll instead get passed in to your application. If you launch a separate shell process in there to poke around, you won't see them.
- **`iisSettings` is still important.** Even if you don't use it, the `iisSettings.iisExpress.sslPort` and `iisSettings.iisExpress.applicationUrl` values are still important.
- **`Docker` as the _command name_ is the key.** This seems to be a magic thing interpreted by the add-in to know to launch Docker. The name of the configuration doesn't appear to matter.
- **There are curly-brace magic strings that work in the `launchUrl` field.** I can't find any beyond `{Scheme}`, `{ServiceHost}`, and `{ServicePort}` that do anything, though in the `Microsoft.Docker` assembly I see a definition for `{ServiceIPAddress}` that doesn't seem used.

## You Can Affect `docker run` Through Project Settings

**UPDATE August 16, 2019**: Microsoft has [added documentation about the available MSBuild properties](https://docs.microsoft.com/en-us/visualstudio/containers/container-msbuild-properties?view=vs-2019) that can influence the Container Tools behavior. I've updated my doc below based on the official docs, but there's more to be seen over there.

There are some magic XML elements you can put in your project properties that will affect the `docker run` command. These are found in the `.targets` files in the `Microsoft.VisualStudio.Azure.Containers.Tools.Targets` package, which you can find in your local cache in a spot like `C:\Users\yourname\.nuget\packages\microsoft.visualstudio.azure.containers.tools.targets\1.4.10\build`.

Ones that seem interesting which I have pulled straight out of the `Container.targets` file...

- `<DockerfileTag>`: The default tag used when building the Docker image. When using the container debugging tools this defaults to `dev`.
- `<DockerDefaultTargetOS>`: The default target OS used when building the Docker image.
- `<DockerfileBuildArguments>`: Additional arguments passed to the Docker build command. I'm not sure what you might do with that, but it may be an interesting hook.
- `<DockerfileRunArguments>`: Additional arguments passed to the Docker run command.  You can use this to add volume mounts and such to the VS process that starts up the container for your project. You can add environment variables this way, too, if you don't want to use `launchSettings.json`.
- `<DockerfileRunEnvironmentFiles>`: Semicolon-delimited list of environment files applied during Docker run.
- `<DockerfileFastModeStage>`: The Dockerfile stage (i.e. target) to be used when building the Docker image in fast mode for debugging. This defaults to the first stage found in the Dockerfile, which is usually `base`.

I've only really tried the `DockerfileRunArguments` to see if I could use that for environment variables (before I figured out the `launchSettings.json` part) and it seemed to work. On the others, YMMV.

## Troubleshooting Container Startup

**If you have an error starting the container, restart Visual Studio after resolving it.** I can't figure out a way to manually force the container to restart and still have it controlled (start/stop/cleanup) by VS.

If you see...

`docker: Error response from daemon: driver failed programming external connectivity on endpoint hungry_nash (09d5705dc88b7afc229be8c3ed8c92bc30c3c4a2e11fdc9ece423cfb4bfe50b3): Error starting userland proxy:.`

...then close VS and restart the Docker daemon. I've seen this a lot when my machine starts up and maybe has a race condition between networking getting established and the Docker daemon needing networking. A simple restart usually fixes it.

If you see...

`Launching failed because the directory '/remote_debugger' in the container is empty. This might be caused by the Shared Drives credentials used by Docker Desktop being out of date. Try resetting the credentials in the Shared Drives page of the Docker Desktop Settings and then restarting Docker.`

or...

`Error response from daemon: error while creating mount source path '/host_mnt/c/Users/yourname/vsdbg/vs2017u5': mkdir /host_mnt/c: file exists.`

...then there's a problem with drive mounting. Make sure your drive sharing settings in Docker allow the drive with your source and the drive with the remote debugger to both be mounted. Further, if you're on a VPN like Cisco Anyconnect, chances are the SMB sharing port 445 is blocked. Try getting off the VPN. You'll need to close VS and restart the Docker daemon once you've resolved that.

No, I haven't found a fix for the VPN thing. I wish I had.

If the container fails to start for whatever reason, you may be left with zombie containers or images.

- Use `docker ps -a` to see the containers that are created but will never be used again. When VS is closed these will remain in `Created` state. Use `docker rm image_name_here` to clean them up.
- Use `docker images` to see the images on your machine. If you see one that's named like your project with the tag `dev`, that's the dev container. Clean that up with `docker rmi project:dev` (using the appropriate project name in there).

## The Actual Documentation

**UPDATE August 16, 2019**: [I opened an issue to request some on June 18, 2019](https://github.com/microsoft/DockerTools/issues/193) to get some documentation. There is now some official doc on [how Container Tools builds the container](https://docs.microsoft.com/en-us/visualstudio/containers/container-build?view=vs-2019) as well as the [MSBuild properties available to control that process](https://docs.microsoft.com/en-us/visualstudio/containers/container-msbuild-properties?view=vs-2019). They are working on additional docs.
