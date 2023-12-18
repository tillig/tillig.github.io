---
layout: post
title: "TFS 2015 Build Environment Variables"
date: 2015-09-17 -0800
comments: true
tags: [dotnet,build,tfs]
---
I'm working with some builds in [Visual Studio Online](https://www.visualstudio.com/en-us/products/what-is-visual-studio-online-vs.aspx) which, right now, is basically Team Foundation Server 2015. As part of that, I wanted to do some custom work in my build script but _only if the build was running in TFS_.

The build runs using the **Visual Studio Build** build step. I couldn't find any documentation for what additional / special environment variables where available, so I ran a small build script like this...

```xml
<Exec Command="set" />
```

...and got the environment variables. For reference, here's what you get when you run the **Visual Studio Build** task on an agent with **Visual Studio 2015**:

```text
agent.jobstatus=Succeeded
AGENT_BUILDDIRECTORY=C:\a\ba99c3da
AGENT_HOMEDIRECTORY=C:\LR\MMS\Services\Mms\TaskAgentProvisioner\Tools
AGENT_ID=1
AGENT_JOBNAME=Build
AGENT_MACHINENAME=TASKAGENT-0001
AGENT_NAME=Hosted Agent
AGENT_ROOTDIRECTORY=C:\a
AGENT_WORKFOLDER=C:\a
AGENT_WORKINGDIRECTORY=C:\a\SourceRootMapping\2808d0ee-383a-4503-86cd-e9c64da409e3\Job-070e8691-db73-41a3-88e3-97deaf4dd9a1
ALLUSERSPROFILE=C:\ProgramData
ANDROID_HOME=C:\java\androidsdk\android-sdk
ANDROID_NDK_HOME=C:\java\androidsdk\android-ndk-r10d
ANT_HOME=C:\java\ant\apache-ant-1.9.4
APPDATA=C:\Users\buildguest\AppData\Roaming
build.fetchtags=false
BUILDCONFIGURATION=release
BUILDPLATFORM=any cpu
BUILD_ARTIFACTSTAGINGDIRECTORY=C:\a\ba99c3da\artifacts
BUILD_BUILDID=15
BUILD_BUILDNUMBER=2015.09.17.3
BUILD_BUILDURI=vstfs:///Build/Build/15
BUILD_CONTAINERID=85945
BUILD_DEFINITIONNAME=Continuous Integration
BUILD_DEFINITIONVERSION=8
BUILD_QUEUEDBY=[DefaultCollection]\Project Collection Service Accounts
BUILD_QUEUEDBYID=a75bc823-f51a-48bc-8ec8-4d7dacaf7dc9
BUILD_REPOSITORY_CLEAN=True
BUILD_REPOSITORY_GIT_SUBMODULECHECKOUT=False
BUILD_REPOSITORY_LOCALPATH=C:\a\ba99c3da\MyProject
BUILD_REPOSITORY_NAME=MyProject
BUILD_REPOSITORY_PROVIDER=TfsGit
BUILD_REPOSITORY_URI=https://myvsoproject.visualstudio.com/DefaultCollection/_git/MyProject
BUILD_REQUESTEDFOR=Your Name Here
BUILD_REQUESTEDFORID=8c477f14-acc1-4765-b1a0-ec6cfb88740d
BUILD_SOURCEBRANCH=refs/heads/master
BUILD_SOURCEBRANCHNAME=master
BUILD_SOURCESDIRECTORY=C:\a\ba99c3da\MyProject
BUILD_SOURCESDIRECTORYHASH=ba99c3da
BUILD_SOURCEVERSION=91c1ef45e3fcc91873cd599d4a7e2e1adf15d9a5
BUILD_STAGINGDIRECTORY=C:\a\ba99c3da\staging
CommonProgramFiles=C:\Program Files (x86)\Common Files
CommonProgramFiles(x86)=C:\Program Files (x86)\Common Files
CommonProgramW6432=C:\Program Files\Common Files
COMPUTERNAME=TASKAGENT-0001
ComSpec=C:\Windows\system32\cmd.exe
CORDOVA_CACHE=C:\cordova\cli
CORDOVA_DEFAULT_VERSION=5.1.1
CORDOVA_HOME=C:\cordova\cli\_cordova
EnableNuGetPackageRestore=True
FP_NO_HOST_CHECK=NO
GRADLE_USER_HOME=C:\java\gradle\user
GTK_BASEPATH=C:\Program Files (x86)\GtkSharp\2.12\
JAVA_HOME=C:\java\jdk\jdk1.8.0_25
LOCALAPPDATA=C:\Users\buildguest\AppData\Local
M2_HOME=C:\java\maven\apache-maven-3.2.2
MSBuildLoadMicrosoftTargetsReadOnly=true
NPM_CONFIG_CACHE=C:\NPM\Cache
NPM_CONFIG_PREFIX=C:\NPM\Modules
NUMBER_OF_PROCESSORS=2
OS=Windows_NT
Path=C:\LR\MMS\Services\Mms\TaskAgentProvisioner\Tools\agent\worker\Modules\Microsoft.TeamFoundation.DistributedTask.Task.Internal\NativeBinaries\amd64;C:\ProgramData\Oracle\Java\javapath;C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Program Files (x86)\Microsoft SQL Server\100\Tools\Binn\;C:\Program Files\Microsoft SQL Server\100\Tools\Binn\;C:\Program Files\Microsoft SQL Server\100\DTS\Binn\;C:\Program Files (x86)\Microsoft ASP.NET\ASP.NET Web Pages\v1.0\;C:\Program Files\Microsoft SQL Server\110\Tools\Binn\;C:\Program Files (x86)\Microsoft SDKs\TypeScript\1.0\;C:\Program Files\Microsoft SQL Server\120\Tools\Binn\;C:\Users\VssAdministrator\.dnx\bin;C:\Program Files\Microsoft DNX\Dnvm\;C:\Program Files (x86)\Windows Kits\10\Windows Performance Toolkit\;C:\Program Files (x86)\Microsoft Emulator Manager\1.0\;C:\Program Files (x86)\GtkSharp\2.12\bin;C:\Program Files (x86)\Microsoft SDKs\TypeScript\1.4\;C:\Program Files (x86)\Git\bin;C:\Program Files (x86)\Microsoft SQL Server\110\Tools\Binn\ManagementStudio\;C:\Program Files (x86)\Microsoft SQL Server\110\Tools\Binn\;C:\Program Files (x86)\Microsoft Visual Studio 11.0\Common7\IDE\PrivateAssemblies\;C:\Program Files (x86)\Microsoft SQL Server\110\DTS\Binn\;C:\Program Files (x86)\Microsoft SQL Server\120\Tools\Binn\ManagementStudio\;C:\Program Files (x86)\Microsoft SQL Server\120\Tools\Binn\;C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\IDE\PrivateAssemblies\;C:\Program Files (x86)\Microsoft SQL Server\120\DTS\Binn\;C:\Program Files\Microsoft\Web Platform Installer\;C:\NPM\Modules;C:\Program Files\nodejs\;C:\NPM\Modules;C:\cordova;C:\java\ant\apache-ant-1.9.4\bin;
PATHEXT=.COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC;.CPL
PLUGMAN_HOME=C:\cordova\cli\_plugman
PROCESSOR_ARCHITECTURE=x86
PROCESSOR_ARCHITEW6432=AMD64
PROCESSOR_IDENTIFIER=Intel64 Family 6 Model 45 Stepping 7, GenuineIntel
PROCESSOR_LEVEL=6
PROCESSOR_REVISION=2d07
ProgramData=C:\ProgramData
ProgramFiles=C:\Program Files (x86)
ProgramFiles(x86)=C:\Program Files (x86)
ProgramW6432=C:\Program Files
PROMPT=$P$G
PSModulePath=C:\Users\buildguest\Documents\WindowsPowerShell\Modules;C:\Program Files\WindowsPowerShell\Modules;C:\Windows\system32\WindowsPowerShell\v1.0\Modules\;C:\Program Files\SharePoint Online Management Shell\;C:\Program Files (x86)\Microsoft SQL Server\110\Tools\PowerShell\Modules\;C:\Program Files (x86)\Microsoft SQL Server\120\Tools\PowerShell\Modules\;C:\Program Files (x86)\Microsoft SDKs\Azure\PowerShell\ServiceManagement;C:\LR\MMS\Services\Mms\TaskAgentProvisioner\Tools\agent\worker\Modules
PUBLIC=C:\Users\Public
SYSTEM=mstf
SystemDrive=C:
SystemRoot=C:\Windows
SYSTEM_ARTIFACTSDIRECTORY=C:\a\ba99c3da
SYSTEM_COLLECTIONID=2808d0ee-383a-4503-86cd-e9c64da409e3
SYSTEM_DEFAULTWORKINGDIRECTORY=C:\a\ba99c3da\MyProject
SYSTEM_DEFINITIONID=1
SYSTEM_HOSTTYPE=build
SYSTEM_TEAMFOUNDATIONCOLLECTIONURI=https://myvsoproject.visualstudio.com/DefaultCollection/
SYSTEM_TEAMFOUNDATIONSERVERURI=https://myvsoproject.visualstudio.com/DefaultCollection/
SYSTEM_TEAMPROJECT=MyProject
SYSTEM_TEAMPROJECTID=a9f2e0a9-752d-4529-a657-35a421584815
SYSTEM_WORKFOLDER=C:\LR\MMS\Services\Mms\TaskAgentProvisioner\Tools\_work
TEMP=C:\Users\BUILDG~1\AppData\Local\Temp
TF_BUILD=True
TMP=C:\Users\BUILDG~1\AppData\Local\Temp
USERDOMAIN=TASKAGENT-0001
USERNAME=buildguest
USERPROFILE=C:\Users\buildguest
VS100COMNTOOLS=C:\Program Files (x86)\Microsoft Visual Studio 10.0\Common7\Tools\
VS110COMNTOOLS=C:\Program Files (x86)\Microsoft Visual Studio 11.0\Common7\Tools\
VS120COMNTOOLS=C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\Tools\
VS140COMNTOOLS=C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\Tools\
VSSDK110Install=C:\Program Files (x86)\Microsoft Visual Studio 11.0\VSSDK\
VSSDK120Install=C:\Program Files (x86)\Microsoft Visual Studio 12.0\VSSDK\
VSSDK140Install=C:\Program Files (x86)\Microsoft Visual Studio 14.0\VSSDK\
windir=C:\Windows
WIX=C:\Program Files (x86)\WiX Toolset v3.7\
XNAGSShared=C:\Program Files (x86)\Common Files\Microsoft Shared\XNA\
```

Note that `BUILDCONFIGURATION` and `BUILDPLATFORM` are parameters to the **Visual Studio Build** task. You'll see that text right in the TFS build system dashboard.

The `BUILD_BUILDNUMBER` value is the one I'm the most interested in - that's what I can key off to set the assembly version. `TF_BUILD` seems to be what you use to determin if the build is running in TFS.
