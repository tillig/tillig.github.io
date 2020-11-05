---
layout: post
title: "Scripts for Managing Azure Container Registry"
date: 2020-11-05 08:00:00 -0800
comments: true
tags: [azure,docker,powershell]
description: "A few helpful scripts for working with creating and managing Azure Container Registry instances."
---

I've been doing some work with creating and migrating Azure Container Registry instances around lately so I thought I'd share a few helpful scripts. Obvious disclaimers - YMMV, works on my machine, I'm not responsible if you delete something you shouldn't have, etc.

## New-AzureContainerRegistry.ps1

I need to create container registries that [have customer managed key support enabled](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-customer-managed-keys). Unfortunately, there are a lot of steps to this and there are some things that aren't obvious, like:

- You need to use the "Premium" SKU for this to work.
- The Key Vault and the thing being encrypted using customer managed keys (e.g., the container registry) need to be in the same subscription and geographic region. [They only say this in the docs about VM disk encryption](https://docs.microsoft.com/en-us/azure/virtual-machines/disk-encryption) but it seems to be applicable to all CMK usage.

Normally I'd think about doing this with something like Terraform but [as of this writing, Terraform doesn't have support for ACR + CMK](https://github.com/terraform-providers/terraform-provider-azurerm/issues/8150) so... script it is.

{% gist b410d2fe173c5080cd983716a58756e2 %}

## Delete-AzureContainerImages.ps1

This is more a "pruning" operation than deleting, but "prune" isn't [an approved PowerShell verb](https://docs.microsoft.com/en-us/powershell/scripting/developer/cmdlet/approved-verbs-for-windows-powershell-commands?view=powershell-7.1) and I do love me some PowerShell.

In a CI/CD environment, generally you want to keep:

- The current successfully deployed image.
- The previous successfully deployed image.
- The image you want to deploy next (canary style).

...and, actually, that's about it. CI/CD is fail-forward, so there's not really a roll-back-three-versions case. You'd roll back the code and build a new container.

Point being, there's not really a retention policy that handles this in ACR right now. While this script also doesn't _totally_ handle it the way I'd like, what it _can_ do is keep the most recent X tags of an image and prune all the old ones. I also added a way to regex match a container repository by name so you can be more precise about targeting what you want to prune.

{% gist 51139dadc905231629555cae0ce92e52 %}

## Copy-AzureContainerImages.ps1

This is sort of a bulk copy operation for ACR. For reasons I won't get into, I needed to copy all the images off an ACR, delete/re-create the ACR, and copy them all back. While the `az` CLI supports importing one image/tag at a time, there's not really a bulk copy. [There's a 'transfer artifacts' mechanism](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-transfer-images) but it's sort of complex to set up and the `az` CLI is already here, so...

This script gets all the repositories and all the tags from each repository and does `az acr import` on all of them. It's not fast, but it gets the job done.

{% gist 0f918b574c46290cd5904745984a3f32 %}
