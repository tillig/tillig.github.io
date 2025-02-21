---
layout: post
title: "Using RHEL subscription-manager in a Container Image"
date: 2025-02-21 -0800
comments: true
tags: [docker,linux]
description: "When building Red Hat Enterprise Linux in a container image hierarchy, subscription-manager handling can be hard. Here's what you need to do to make it work."
---

Scenario:

- You have a Red Hat Enterprise Linux (RHEL) subscription.
- You are building a series of containers based on RHEL, like:
  - Base container with RHEL 8 and some small amount of packages.
  - In a different repo, a container based on your RHEL 8 base image which adds some packages.
  - Your application container, based on that second image, which adds yet other packages.

The problem: When you build these containers they all seem to be seen by the RHEL `subscription-manager` as the same logical machine, so you get a bunch of errors like `410 Gone` when you try to [register the container with the package management system](https://access.redhat.com/solutions/253273).

My experience is that this is because, by default, the hostname of every container image being built is `buildkitsandbox` by default. This is set up by the Docker build kit. When you run `subscription-manager register` to attach to the subscription, depending on a few things (whether you're using the public customer portal or an internal subscription portal, etc.) you may see registrations get stomped because the same hostname is trying to register from different places at the same time.

The answer: Set the hostname by providing the build argument `BUILDKIT_SANDBOX_HOSTNAME` to your container.

`docker build --build-arg BUILDKIT_SANDBOX_HOSTNAME=something-unique .`

Then in your container, just make sure you do some cleanup before installing things.

```dockerfile
RUN subscription-manager clean \
  && subscription-manager register --org="XXX" --activationkey="YYY" --force \
  && yum update -y \
  && yum install -y some-package \
  && yum clean all \
  && subscription-manager unregister \
  && subscription-manager clean \
  && rm -rf /var/cache/yum /var/cache/dnf
```

The combination of the unique hostname and proactive cleanup should get you past the issues.
