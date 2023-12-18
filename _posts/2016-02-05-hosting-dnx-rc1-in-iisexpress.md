---
layout: post
title: "Hosting DNX RC1 Web Applications in IIS Express"
date: 2016-02-05 -0800
comments: true
tags: [dotnet,aspnet]
description: "Want to start IIS Express to host a DNX app without doing it through Visual Studio? This shows you how."
---
Here's the situation:

- I have a .NET Core / ASP.NET Core (DNX) web app. (Currently it's an RC1 app.)
- When I start it in Visual Studio, I get IIS Express listening for requests and handing off to DNX.
- When I start the app from a command line, I want the same experience as VS - IIS Express listening and handing off to DNX.

Now, I know I can just `dnx web` and get Kestrel to work from a simple self-host perspective. I really want IIS Express here. Searching around, I'm not the only one who does, though everyone's reasons are different.

Since the [change to the IIS hosting model](https://github.com/aspnet/Announcements/issues/69) you can't really do the thing that the ASP.NET Music Store was doing where you [copy the `AspNet.Loader.dll` to your `bin` folder](https://github.com/aspnet/MusicStore/blob/1.0.0-rc1/src/MusicStore/CopyAspNetLoader.cmd) and have magic happen [when you start IIS Express](https://github.com/aspnet/MusicStore/blob/1.0.0-rc1/src/MusicStore/Helios.cmd).

When Visual Studio starts up your application, it actually creates an all-new `applicationhost.config` file with some special entries that allow things to work. I'm going to tell you how to update your per-user IIS Express `applicationhost.config` file so things can work outside VS just like they do inside.

**There are two pieces to this:**

1. Update your `applicationhost.config` (one time) to add the `httpPlatformHandler` module so IIS Express can "proxy" to DNX.
2. Use `appcmd.exe` to point applications to IIS Express.
3. Set environment variables and start IIS Express using the application names you configured using `appcmd.exe`

Let's walk through each step.

## applicationhost.config Updates

Before you can host DNX apps in IIS Express, you need to update your default IIS Express `applicationhost.config` to know about the `httpPlatformHandler` module that DNX uses to start up its child process.

**You only have to do this one time.** Once you have it in place, you're good to go and can just configure your apps as needed.

To update the `applicationhost.config` file I used the XML transform mechanism you see in `web.config` transforms - those `web.Debug.config` and `web.Release.config` deals. However, I didn't want to go through MSBuild for it so I did it in PowerShell.

First, **save this file as `applicationhost.dnx.xml`** - this is the set of transforms for `applicationhost.config` that the PowerShell script will use.

```xml
<?xml version="1.0"?>
<configuration xmlns:xdt="http://schemas.microsoft.com/XML-Document-Transform">
    <configSections>
        <sectionGroup name="system.webServer"
                      xdt:Locator="Match(name)">
            <section name="httpPlatform"
                     overrideModeDefault="Allow"
                     xdt:Locator="Match(name)"
                     xdt:Transform="InsertIfMissing" />
        </sectionGroup>
    </configSections>
    <location path=""
              xdt:Locator="Match(path)">
        <system.webServer>
            <modules>
                <add name="httpPlatformHandler"
                     xdt:Locator="Match(name)"
                     xdt:Transform="InsertIfMissing" />
            </modules>
        </system.webServer>
    </location>
    <system.webServer>
        <globalModules>
            <add name="httpPlatformHandler"
                 image="C:\Program Files (x86)\Microsoft Web Tools\HttpPlatformHandler\HttpPlatformHandler.dll"
                 xdt:Locator="Match(name)"
                 xdt:Transform="InsertIfMissing" />
        </globalModules>
    </system.webServer>
</configuration>
```

I have it structured so you can run it over and over without corrupting the configuration - so if you forget and accidentally run the transform twice, don't worry, it's cool.

Here's the PowerShell script you'll use to run the transform. Save this as `Merge.ps1` in the same folder as `applicationhost.dnx.xml`:

```ps1
function script:Merge-XmlConfigurationTransform
{
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory=$True)]
        [ValidateNotNullOrEmpty()]
        [String]
        $SourceFile,

        [Parameter(Mandatory=$True)]
        [ValidateNotNullOrEmpty()]
        [String]
        $TransformFile,

        [Parameter(Mandatory=$True)]
        [ValidateNotNullOrEmpty()]
        [String]
        $OutputFile
    )

    Add-Type -Path "${env:ProgramFiles(x86)}\MSBuild\Microsoft\VisualStudio\v14.0\Web\Microsoft.Web.XmlTransform.dll"

    $transformableDocument = New-Object 'Microsoft.Web.XmlTransform.XmlTransformableDocument'
    $xmlTransformation = New-Object 'Microsoft.Web.XmlTransform.XmlTransformation' -ArgumentList "$TransformFile"

    try
    {
        $transformableDocument.PreserveWhitespace = $false
        $transformableDocument.Load($SourceFile) | Out-Null
        $xmlTransformation.Apply($transformableDocument) | Out-Null
        $transformableDocument.Save($OutputFile) | Out-Null
    }
    finally
    {
        $transformableDocument.Dispose();
        $xmlTransformation.Dispose();
    }
}

$script:ApplicationHostConfig = Join-Path -Path ([System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::MyDocuments)) -ChildPath "IISExpress\config\applicationhost.config"
Merge-XmlConfigurationTransform -SourceFile $script:ApplicationHostConfig -TransformFile (Join-Path -Path $PSScriptRoot -ChildPath applicationhost.dnx.xml) -OutputFile "$($script:ApplicationHostConfig).tmp"
Move-Item -Path "$($script:ApplicationHostConfig).tmp" -Destination $script:ApplicationHostConfig -Force
```

**Run that script and transform your `applicationhost.config`.**

Note that the `HttpPlatformHandler` isn't actually a DNX-specific thing. [It's an IIS 8+ module that can be used for any sort of proxying/process management situation.](http://www.iis.net/learn/extensions/httpplatformhandler/httpplatformhandler-configuration-reference) However, it doesn't come set up by default on IIS Express so this adds it in.

Now you're set for the next step.

## Configure Apps with IIS Express

I know you can run IIS Express with a bunch of command line parameters, and if you want to do that, go for it. However, it's just a bunch easier if you set it up as an app within IIS Express so you can more easily launch it.

**Set up applications pointing to the `wwwroot` folder.**

A simple command to set up an application looks like this:

```batch
"C:\Program Files (x86)\IIS Express\appcmd.exe" add app /site.name:"MyApplication" /path:/ /physicalPath:C:\some\folder\src\MyApplication\wwwroot
```

Whether you use the command line parameters to launch every time or set up your app like this, make sure the path points to the `wwwroot` folder.

## Set Environment Variables and Start IIS Express

If you look at your `web.config` file in `wwwroot` you'll see something like this:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
    <system.webServer>
        <handlers>
            <add name="httpPlatformHandler"
                 path="*"
                 verb="*"
                 modules="httpPlatformHandler"
                 resourceType="Unspecified" />
        </handlers>
        <httpPlatform processPath="%DNX_PATH%"
                      arguments="%DNX_ARGS%"
                      stdoutLogEnabled="false"
                      startupTimeLimit="3600" />
    </system.webServer>
</configuration>
```

The important bit there are the two variables `DNX_PATH` and `DNX_ARGS`.

- `DNX_PATH` points to the `dnx.exe` executable for the runtime you want for your app.
- `DNX_ARGS` are the arguments to `dnx.exe`, as if you were running it on a command line.

A very simple PowerShell script that will launch an IIS Express application looks like this:

```ps1
$env:DNX_PATH = "$($env:USERPROFILE)\.dnx\runtimes\dnx-clr-win-x86.1.0.0-rc1-update1\bin\dnx.exe"
$env:DNX_ARGS = "-p `"C:\some\folder\src\MyApplication`" web"
Start-Process "${env:ProgramFiles(x86)}\IIS Express\iisexpress.exe" -ArgumentList "/site:MyApplication"
```

Obviously you'll want to set the runtime version and paths accordingly, but this is basically the equivalent of running `dnx web` and having IIS Express use the site settings you configured above as the listening endpoint.
