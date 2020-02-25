---
layout: post
title: "Tips for Creating Custom Azure DevOps Build Tasks"
date: 2020-02-25 -0800
comments: true
tags: [azure,build,javascript]
description: "A few helpful things to know if you're creating a custom build task for Azure DevOps pipelines."
---

I'm in the process of creating some custom pipeline tasks for Azure DevOps build and release. I've hit some gotchas that hopefully I (and you!) can avoid. Some of these are undocumented, some are documented but maybe not so easy to find.

## Your Task Must Be In a Folder

You can't put your `task.json` in the root of the repo. Convention assumes that your task is in a folder of the same name as the task. Azure DevOps won't be able to find your task in the extension if it's in the root.

```text
# THIS DOESN'T WORK

/
+- task.json
+- vss-extension.json
```

I messed with it for a really long time, you really just need that task folder. They show it that way [in the tutorial](https://docs.microsoft.com/en-us/azure/devops/extend/develop/add-build-task?view=azure-devops) but they never explain the significance.

```text
# THIS WORKS

/
+- YourTaskName/
|  +- task.json
+- vss-extension.json
```

## You Can Have Multiple Task Versions in One Extension

You may have seen tasks show up like `NuGetInstaller@0` and `NuGetInstaller@1` in Azure DevOps. [You can create a versioned task using a special folder structure](https://docs.microsoft.com/en-us/azure/devops/extend/develop/integrate-build-task?view=azure-devops) where the name of the task is at the top and each version is below:

```text
/
+- YourTaskName/
|  +- YourTaskNameV0/
|     +- task.json
|  +- YourTaskNameV1/
|     +- task.json
+- vss-extension.json
```

[This repo has a nice example showing it in action.](https://github.com/jessehouwing/azure-pipelines-demo-ping-task/blob/master/vss-extension.multipingtask.json)

## Don't Follow the Official Azure Pipeline Tasks Repo

[The official repo with the Azure DevOps pipeline tasks](https://github.com/microsoft/azure-pipelines-tasks) is a great place to learn how to use the task SDK and write a good task... but don't follow their pattern for your repo layout or build. Their tasks don't get packaged as a VSIX or deployed as an extension the way your custom tasks will, so looking for hints on packaging will lead you down a pretty crazy path.

[This repo](https://github.com/microsoft/azure-devops-extension-tasks) is a bit of a better example, with some tasks that... help you build task extensions. It's a richer sample of how to build and package a task extension.

## You Have Two Versions to Change

In a JavaScript/TypeScript-based project, there are like four different files that have versions:

- The root `package.json`
- The VSIX manifest `vss-extension.json`
- The task-level `package.json`
- The task-level `task.json`

The only versions that matter in Azure DevOps are the VSIX manifest `vss-extension.json` and the task-level `task.json`. The Node `package.json` versions don't matter.

In order to get a new version of your VSIX published, the `vss-extension.json` version must change. Even if the VSIX fails validation on the Marketplace, that version is considered "published" and you can't retry without updating the version.

Azure DevOps appears to cache versions of your _tasks_, too, so if you publish a VSIX and forget to update your `task.json` version, your build may not get the latest version of the task. You need to increment that `task.json` version for your new task to be used.

## You're Limited to 50MB

Your VSIX package [must be less than 50MB in size or the Visual Studio Marketplace will reject it](https://docs.microsoft.com/en-us/azure/devops/extend/publish/overview?view=azure-devops#check-package-size).

This is important to know, because it combines with...

## Each Task Gets Its Own node_modules

[Visual Studio Marketplace extensions pre-date the loader mechanism](https://github.com/microsoft/azure-pipelines-task-lib/issues/485#issuecomment-590568830) so your extension, as a package, isn't actually used as an atomic entity. Let's say you have two tasks in an extension:

```text
/
+- FirstTask/
|  +- node_modules/
|  +- package.json
|  +- task.json
+- SecondTask/
|  +- node_modules/
|  +- package.json
|  +- task.json
+- node_modules/
+- package.json
+- vss-extension.json
```

Your build/package process might have some `devDependencies` like TypeScript in the root `package.json` and each task might have its own set of `dependencies` in its child `package.json`.

At some point, you might see that both tasks need mostly the same stuff and think to move the dependency up to the top level - Node module resolution will still find it, TypeScript will still compile things fine, all is well on your local box.

**Don't do that.** Keep all the `dependencies` for a task at the task level. It's OK to share `devDependencies`, don't share `dependencies`.

The reason is that, even if on your dev box and build machine the Node module resolutiono works, when the Azure DevOps agent runs the task, the "root" is wherever that `task.json` file is. No modules will be found above there.

What that means is you're going to have a lot of duplication across tasks (and task versions). At a minimum, you know every task requires the Azure Pipeline Task SDK, and a pretty barebones "Hello World" level task packs in at around 1MB in the VSIX if you're not being careful.

This means you can pretty easily hit that 50MB limit if you have a few tasks in a single extension.

It also means if you have some shared code, like a "common" library, it can get a little tricky. You can't really resolve stuff outside that task folder.

You might think "I can Webpack it, right?" Nope.

## You Can't Webpack Build Tasks

I found this one out the hard way. It may have been in the past this was possible, but as of right now [the localization functions in the Azure Pipeline Task SDK are hard-tied to the filesystem](https://github.com/microsoft/azure-pipelines-task-lib/blob/34e17f6ca02c256bcb4e121880f6d4b7da65eed2/node/internal.ts#L183). If the SDK needs to display an error message, it goes to look up its localized message data which requires several `.resjson` files in the same folder as the SDK module. Failing that, it tries some fallback... and eventually you get a stack overflow. The Azure Pipelines Tool SDK also has localized stuff, so even if you figured out how to move all the Task SDK localization files to the right spot, you'd also have to merge in the localization files from other libraries.

The best you can do is make use of `npm install --production` and/or `npm prune --production` to reduce the `node_modules` folder as much as possible. You could also selectively delete files, like you could remove all the `*.ts` files from the `node_modules` folder. A few of these tricks can save a lot of space.

## It's Best to Have One Task Per Repo Per Extension

All of the size restrictions, complexity around trimming `node_modules`, and so on means that it's really going to make your life easier if you stick to one task per extension. Further, it'll be even simpler if you keep that in its own repo. It could be a versioned task, but **one VSIX, one task [with all its versions], one repo**.

- You won't exceed the 50MB size limit.
- You can centralize/automate the versioning - the VSIX `vss-extension.json` and the task `task.json` versions can stay in sync to make it easier to track and manage.
- Your build will generally be less complex. You don't have to recurse into different tasks/versions to build things, repo size will be smaller, fewer moving pieces.
- VS Code integration is easier. Having a bunch of different tasks with their own tests and potentially different versions of Mocha (or whatever) all over... it makes debugging and running tests harder.
- Shared code will have to be published as a Node module, possibly on an internal feed, so it can be shipped along with the extension/task.
- GitHub Actions require one task per repo.

Wait, what? GitHub Actions? We're talking about Azure DevOps Pipelines.

With Microsoft's acquisition of GitHub, more and more integration is happening between GitHub and Azure DevOps. [You can trigger Azure Pipelines from GitHub Actions](https://docs.microsoft.com/en-us/azure/devops/release-notes/2019/sprint-161-update) and a lot of work is going into GitHub Actions. [Some of the Microsoft tasks](https://github.com/microsoft/azure-pipelines-task-lib/issues/485#issuecomment-590577367) are looking at ways to share logic between both pipeline types - write once, use both places. Having one task per repo will make it easier to support this sort of functionality without having to refactor or pull your extension apart.
