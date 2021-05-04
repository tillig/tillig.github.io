---
layout: post
title: "Using Azure DevOps Artifacts NuGet Feeds from Azure DevOps Pipeline Builds"
date: 2019-02-07 -0800
comments: true
tags: [azure,build,net,tfs,vs]
description: "Consuming a package in an Azure DevOps Artifacts feed can be painful in an Azure DevOps build pipeline. Here's how."
---

Azure DevOps has the ability to [publish things to a private NuGet feed](https://docs.microsoft.com/en-us/azure/devops/pipelines/artifacts/nuget?toc=%2Fazure%2Fdevops%2Fartifacts%2Ftoc.json&view=azure-devops&tabs=yaml) as part of its artifacts handling.

Working with a private feed from a developer machine running builds from the command line or Visual Studio is pretty easy. [There is documentation on using a NuGet credential provider](https://docs.microsoft.com/en-us/azure/devops/artifacts/nuget/nuget-exe?view=azure-devops&tabs=new-nav) to authenticate with Azure DevOps and make that seamless.

However, getting this to work from a pipeline build is challenging. Once you've published a package, you may want to consume it from something else you're building... but the feed is secured. What do you do?

> At the time of writing in this article (February 2019) I was told the second half of 2019 would include some improvements to this. It appears there's a new [`NuGetAuthenticate` task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/package/nuget-authenticate?view=azure-devops) that might be helpful here. I'm also unclear if any changes have been made in how the `NuGetCommand` or `DotNetCoreCLI` tasks deal with authentication. I'll leave this article as it was for reference. Note as of May 2021, I'm _still_ using option #3 below and it still works.

# Option 1: Separate Restore from Build

The documentation shows how to use NuGet or the dotnet CLI for package restore from your feed. Both of the solutions effectively amount to separating the call to `NuGet restore` or `dotnet restore` from the rest of your build.

[For NuGet, you'd use a NuGet build step (`NuGetCommand@2`)](https://docs.microsoft.com/en-us/azure/devops/pipelines/packages/nuget-restore?view=azure-devops) and specify the [restore](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/package/nuget?view=azure-devops). Do that before you execute the build on your solution.

[For the dotnet CLI, you'd use a dotnet CLI build step (`DotNetCoreCLI@2`)](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/build/dotnet-core?view=azure-devops) and indicate the `restore` command.

In both cases, the special build command will generate a NuGet.Config file on the fly that contains the system access token. The restore operation will use that custom temporary config during the restore and it will succeed.

However, if you later try running `dotnet build` or `dotnet publish` it'll fail - because [there's an implicit restore that runs during those](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/build/dotnet-core?view=azure-devops#why-is-my-build-or-publish-step-failing-to-restore-packages). These will not have the system credentials in place. You have to use `--no-restore` on builds, for example, to avoid the auto-restore. It can get painful in a larger build.

If you have a build script, like a bash or PowerShell script, manually executing `dotnet restore` in that script will _also_ not work. You _must_ use the build tasks to get the magic to happen.

# Option 2: Use the Azure Artifacts Credential Provider

[Another option in the docs](https://docs.microsoft.com/en-us/azure/devops/artifacts/nuget/dotnet-exe?view=azure-devops#on-build-machines-and-in-non-interactive-scenarios) is that you can use the [Azure Artifacts credential provider](https://github.com/Microsoft/artifacts-credprovider). While it seems this is primarily geared toward running on build agents you host yourself, you can possibly get this working on hosted agents.

**I have not tried this myself.** I went with option 3, below. However, if you want to give it a shot, here's what you'd do.

First, [you'll want to be aware of how NuGet credential providers work](https://docs.microsoft.com/en-us/nuget/reference/extensibility/nuget-exe-credential-providers). I don't mean the internals, but, like, where you need to put the credential provider executable to make it work and how to troubleshoot it. All of that [is documented](https://docs.microsoft.com/en-us/nuget/reference/extensibility/nuget-exe-credential-providers).

Now...

- Download [the latest release of the credential provider](https://github.com/Microsoft/artifacts-credprovider/releases). Make sure you get the version that will run on your _build agent_, not your _development machine_.
- Follow the instructions [in the readme](https://github.com/Microsoft/artifacts-credprovider/blob/master/README.md) to find the self-contained executable version of the credential provider in the archive you just downloaded.
- Extract the credential provider to somewhere in the source you'll be building. Maybe a separate `build` folder.
- As part of your build pipeline, you'll need to...
  - Set the `NUGET_CREDENTIALPROVIDERS_PATH` to point to the `build` folder in your checked-out source that contains the provider.
  - On Linux, you may need to `chmod +x` that provider.
  - Set the `VSS_NUGET_EXTERNAL_FEED_ENDPOINTS` to indicate the location of your external NuGet feed and provide the system access token. It takes a JSON format: `{"endpointCredentials": [{"endpoint":"http://example.index.json", "username":"vsts", "password":"$(System.AccessToken)"}]}`

In the `VSS_NUGET_EXTERNAL_FEED_ENDPOINTS` you'll notice the use of the `$(System.AccessToken)` variable. That's a [predefined system variable](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops#system-variables) in Azure DevOps build pipelines. You'll see that again later.

Anyway, if all the planets have aligned, when you run your standard `dotnet restore` or `NuGet restore`, it will use the credential provider for authentication. The credential provider will use the environment variable and magic will happen.

One other note there - the username `vsts` isn't special. It can be any value you want, the endpoint doesn't actually end up checking. It just can't be omitted.

# Option 3: Update NuGet.Config

The final option is to update your NuGet.Config on the fly with the system access token as part of the build. **I went with this option because it was simpler and had fewer moving pieces.**

In your source you likely already have a `NuGet.Config` file that has both the standard NuGet.org feed and your private Azure DevOps feed in it. It should look something like this:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <solution>
    <add key="disableSourceControlIntegration" value="true" />
  </solution>
  <packageSources>
    <clear />
    <add key="NuGet Official" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
    <add key="Azure DevOps" value="https://pkgs.dev.azure.com/yourorg/_packaging/yourfeed/nuget/v3/index.json" protocolVersion="3" />
  </packageSources>
</configuration>
```

The name, `Azure DevOps`, is the key here. Doesn't matter what you name it, just make sure you remember it. You'll need it.

In your build pipeline, before you do any operations to build or restore packages, Use the `NuGetCommand@2` task and run a custom command to update the source in that `NuGet.Config` to have the system credentials attached.

```yaml
- task: NuGetCommand@2
  displayName: 'Authenticate with Azure DevOps NuGet'
  inputs:
    command: custom
    arguments: sources update -Name "Azure DevOps" -Username "vsts" -Password "$(System.AccessToken)" -StorePasswordInClearText -ConfigFile ./NuGet.Config
```

What this will do is add the credentials right into the XML of the `NuGet.Config` as checked out in your source. The `NuGet` or `dotnet` commands will already be using that config file to locate your feed, the creds will come along for free.

Items to note:

- Again, you see that `$(System.AccessToken)` show up. That's the magic.
- **If you do this, you need to avoid using `DotNetCLI` and `NuGetCommand` tasks that might try to authenticate automatically behind the scenes.** The cleartext credentials in the configuration conflict with the credential provider auto-authenticate mechanism and things blow up. This likely means the build steps in your pipeline need to become PowerShell, bash, or MSBuild scripts that do the restore, build, test, publish, etc.
- You need to have `-StorePasswordInClearText` or the `dotnet` CLI won't be able to use the credentials. If you're _only_ using `NuGet` commands, you should be OK not storing in clear text.
- If you're on a Linux agent, don't forget filenames are case-sensitive. If you get an error, make sure you got all the capitalization right for your config file.
- The _source name_ is case-sensitive. If `NuGet.Config` has a source named `Azure DevOps` then the authentication step with NuGet needs to specify the source name as `Azure DevOps`, too - `azure devops` won't work.
