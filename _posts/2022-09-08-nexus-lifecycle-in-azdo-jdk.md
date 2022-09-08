---
layout: post
title: "Sonatype Nexus IQ in Azure DevOps - Illegal Reflective Access Operation"
date: 2022-09-08 -0800
comments: true
tags: [azure,tfs,build]
description: "When using the Sonatype Nexus IQ / Nexus Lifecycle scanner in Azure DevOps, you may see some Java warnings. The answer is to force JDK 8 before the scan."
---

Using the [Sonatype Nexus IQ for Azure DevOps task](https://help.sonatype.com/integrations/nexus-and-continuous-integration/nexus-iq-for-azure-devops) in your build, you may see some warnings that look like this:

```text
WARNING: An illegal reflective access operation has occurred
WARNING: Illegal reflective access by com.google.inject.internal.cglib.core.$ReflectUtils$1 (file:/agent/_work/_tasks/NexusIqPipelineTask_4f40d1a2-83b0-4ddc-9a77-e7f279eb1802/1.4.0/resources/nexus-iq-cli-1.143.0-01.jar) to method java.lang.ClassLoader.defineClass(java.lang.String,byte[],int,int,java.security.ProtectionDomain)
WARNING: Please consider reporting this to the maintainers of com.google.inject.internal.cglib.core.$ReflectUtils$1
WARNING: Use --illegal-access=warn to enable warnings of further illegal reflective access operations
WARNING: All illegal access operations will be denied in a future release
```

The task, internally, just runs `java` to execute the Sonatype scanner JAR/CLI. The warnings here are because that JAR assumes JDK 8 and the default JDK on an Azure DevOps agent is later than that.

**The answer is to set JDK 8 before running the scan.**

```yaml
# Install JDK 8
- task: JavaToolInstaller@0
  inputs:
    versionSpec: '8'
    jdkArchitectureOption: x64
    jdkSourceOption: PreInstalled

# Then run the scan
- task: NexusIqPipelineTask@1
  inputs:
    nexusIqService: my-service-connection
    applicationId: my-application-id
    stage: "Release"
    scanTargets: my-scan-targets
```
