---
layout: post
title: "Adventures in mTLS Debugging"
date: 2021-07-12 -0800
comments: true
tags: [kubernetes]
description: "I use Istio service mesh in Kubernetes and Prometheus to scrape metrics. I use mTLS for authentication when scraping and wanted to update Prometheus. That's when things went sideways"
---
I have a Kubernetes 1.19.11 cluster deployed along with Istio 1.6.14. I have a central instance of Prometheus for scraping metrics, and based on the documentation, I have a manually-injected sidecar so Prometheus can make use of the Istio certificates for mTLS during scraping. Under Prometheus v2.20.1 this worked great. However, I was trying to update some of the infrastructure components to take advantage of new features and Prometheus after v2.21.0 just would not scrape.

**These are my adventures in trying to debug this issue.** Some of it is to remind me of what I did. Some of it is to save you some trouble if you run into the issue. Some of it is to help you see what I did so you can apply some of the techniques yourself.

> **TL;DR**: The problem is [that Prometheus v2.21.0 disabled HTTP/2](https://github.com/prometheus/prometheus/issues/9068) and that needs to be re-enabled for things to work. There should be a Prometheus release soon that allows you to re-enable HTTP/2 with environment variables.

I created a [repro repository](https://github.com/tillig/prometheus-repro) with a minimal amount of setup to show how things work. It can get you from a bare Kubernetes cluster up to Istio 1.6.14 and Prometheus using the same values I am. You'll have to supply your own microservice/app to demonstrate scraping, but [the `prometheus-example-app`](https://hub.docker.com/r/kubespheredev/prometheus-example-app) may be a start.

I deploy Prometheus using [the Helm chart](https://github.com/prometheus-community/helm-charts). As part of that, I have an Istio sidecar manually injected [just like they do in the official 1.6 Istio release manifests](https://github.com/istio/istio/blob/release-1.6/manifests/charts/istio-telemetry/prometheus/templates/deployment.yaml). By doing this, the sidecar will download and share the certificates but it won't proxy any of the Prometheus traffic.

I then have a Prometheus scrape configuration that uses the certificates mounted in the container. If it finds a pod that has the Istio sidecar annotations (indicating it's got the sidecar injected), it'll use the certificates for authentication and communication.

```yaml
- job_name: "kubernetes-pods-istio-secure"
  scheme: https
  tls_config:
    ca_file: /etc/istio-certs/root-cert.pem
    cert_file: /etc/istio-certs/cert-chain.pem
    key_file: /etc/istio-certs/key.pem
    insecure_skip_verify: true
```

If I deploy Prometheus v2.20.1, I see that my services are being scraped by the `kubernetes-pods-istio-secure` job, they're using HTTPS, and everything is good to go. Under v2.20.1, I see the error `connection reset by peer`. I tried [asking about this in the Prometheus newsgroup](https://groups.google.com/g/prometheus-users/c/MwbmFYmtf9M) to no avail, so... I dove in.

My first step was to update the Helm chart `extraArgs` to turn on Prometheus debug logging.

```yaml
extraArgs:
  log.level: debug
```

I was hoping to see more information about what was happening. Unfortunately, I got basically the same thing.

`level=debug ts=2021-07-06T20:58:32.984Z caller=scrape.go:1236 component="scrape manager" scrape_pool=kubernetes-pods-istio-secure target=https://10.244.3.10:9102/metrics msg="Scrape failed" err="Get \"https://10.244.3.10:9102/metrics\": read tcp 10.244.4.89:36666->10.244.3.10:9102: read: connection reset by peer"`

This got me thinking one of two things may have happened in v2.21.0:

- Something changed _in Prometheus_; OR
- Something changed _in the OS configuration of the Prometheus container_

I had recently fought with a `dotnet` CLI problem where [certain TLS cipher suites were disabled by default](https://docs.microsoft.com/en-us/dotnet/core/compatibility/cryptography/5.0/default-cipher-suites-for-tls-on-linux) and some OS configuration settings on our build agents affected what was seen as allowed vs. not allowed. This was stuck in my mind so I couldn't immediately rule out the container OS configuration.

To validate the OS issue I was going to try using `curl` and/or `openssl` to connect to the microservice and see what the cipher suites were. Did I need an Istio upgrade? Was there some configuration setting I was missing? Unfortunately, it turns out [the Prometheus Docker image is based on](https://github.com/prometheus/prometheus/blob/e98b639ac7d34d6ec6b8a4e4462b4bbe16cf7996/Dockerfile#L3) a custom [busybox image where there are no package managers or tools](https://github.com/prometheus/busybox). I mean, this is actually _a very good thing_ from a security perspective but it's a pain for debugging.

What I ended up doing was getting a recent Ubuntu image and connecting using that, just to see. I figured if there was anything obvious going on that I could take the extra steps of creating a custom Prometheus image with `curl` and `openssl` to investigate further. I mounted a manual sidecar just like I did for Prometheus so I could get to the certificates without proxying traffic, then I ran some commands:

```bash
curl https://10.244.3.10:9102/metrics \
  --cacert /etc/istio-certs/root-cert.pem \
  --cert /etc/istio-certs/cert-chain.pem \
  --key /etc/istio-certs/key.pem \
  --insecure

openssl s_client \
  -connect 10.244.3.10:9102 \
  -cert /etc/istio-certs/cert-chain.pem  \
  -key /etc/istio-certs/key.pem \
  -CAfile /etc/istio-certs/root-cert.pem \
  -alpn "istio"
```

Here's some example output from `curl` to show what I was seeing:

```text
root@sleep-5f98748557-s4wh5:/# curl https://10.244.3.10:9102/metrics --cacert /etc/istio-certs/root-cert.pem --cert /etc/istio-certs/cert-chain.pem --key /etc/istio-certs/key.pem --insecure -v
*   Trying 10.244.3.10:9102...
* TCP_NODELAY set
* Connected to 10.244.3.10 (10.244.3.10) port 9102 (#0)
* ALPN, offering h2
* ALPN, offering http/1.1
* successfully set certificate verify locations:
*   CAfile: /etc/istio-certs/root-cert.pem
  CApath: /etc/ssl/certs
* TLSv1.3 (OUT), TLS handshake, Client hello (1):
* TLSv1.3 (IN), TLS handshake, Server hello (2):
* TLSv1.3 (IN), TLS handshake, Encrypted Extensions (8):
* TLSv1.3 (IN), TLS handshake, Request CERT (13):
* TLSv1.3 (IN), TLS handshake, Certificate (11):
* TLSv1.3 (IN), TLS handshake, CERT verify (15):
* TLSv1.3 (IN), TLS handshake, Finished (20):
* TLSv1.3 (OUT), TLS change cipher, Change cipher spec (1):
* TLSv1.3 (OUT), TLS handshake, Certificate (11):
* TLSv1.3 (OUT), TLS handshake, CERT verify (15):
* TLSv1.3 (OUT), TLS handshake, Finished (20):
* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384
* ALPN, server accepted to use h2
* Server certificate:
*  subject: [NONE]
*  start date: Jul  7 20:21:33 2021 GMT
*  expire date: Jul  8 20:21:33 2021 GMT
*  issuer: O=cluster.local
*  SSL certificate verify ok.
* Using HTTP2, server supports multi-use
* Connection state changed (HTTP/2 confirmed)
* Copying HTTP/2 data in stream buffer to connection buffer after upgrade: len=0
* Using Stream ID: 1 (easy handle 0x564d80d81e10)
> GET /metrics HTTP/2
> Host: 10.244.3.10:9102
> user-agent: curl/7.68.0
> accept: */*
>
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* old SSL session ID is stale, removing
* Connection state changed (MAX_CONCURRENT_STREAMS == 2147483647)!
< HTTP/2 200
```

A few things in particular:

1. I found the `--alpn "istio"` thing for `openssl` [while looking through Istio issues](https://github.com/istio/istio/issues/12513) to see if there were any pointers there. It's always good to read through issues lists to get ideas and see if other folks are running into the same problems.
2. Both `openssl` and `curl` were able to connect to the microservice using the certificates from Istio.
3. The cipher suite shown in the `openssl` output was one that was considered "recommended." I forgot to capture that output for the blog article, sorry about that.

At this point I went to the [release notes for Prometheus v2.21.0](https://github.com/prometheus/prometheus/releases/tag/v2.21.0) to see what had changed. I noticed two things that I thought may affect my situation:

1. This release is built with Go 1.15, which deprecates [X.509 CommonName](https://golang.org/doc/go1.15#commonname) in TLS certificates validation.
2. [CHANGE] Disable HTTP/2 because of concerns with the Go HTTP/2 client. [#7588](https://github.com/prometheus/prometheus/issues/7588) [#7701](https://github.com/prometheus/prometheus/pull/7701)

I did see in that `curl` output that it was using `HTTP/2` but... is it required? Unclear. However, looking at the [Go docs about the X.509 CommonName thing](https://golang.org/doc/go1.15#commonname), that's easy enough to test. I just needed to add an environment variable to the Helm chart for Prometheus:

```yaml
env:
  - name: GODEBUG
    value: x509ignoreCN=0
```

After redeploying... it didn't fix anything. That wasn't the problem. That left the HTTP/2 thing. However, what I found was [it's hardcoded off, not disabled through some configuration mechanism](https://github.com/prometheus/prometheus/blob/6a055f118aa9c021f40591d081634953117763b2/scrape/scrape.go#L378) so there isn't a way to just turn it back on to test. The only way to test it is to do a fully custom build.

[The Prometheus build for a Docker image](https://github.com/prometheus/prometheus#building-the-docker-image) is really complicated. They have this [custom build tool `promu`](https://github.com/prometheus/promu) that runs the build in a [custom build container](https://github.com/prometheus/golang-builder) and all this is baked into layers of `make` and `yarn` and such. As it turns out, not _all_ of it happens in the container, either, because **if you try to build on a Mac** you'll get an error like this:

```text
... [truncated huge list of downloads] ...
go: downloading github.com/PuerkitoBio/urlesc v0.0.0-20170810143723-de5bf2ad4578
go: downloading github.com/Azure/go-autorest/autorest/validation v0.3.1
go: downloading github.com/Azure/go-autorest/autorest/to v0.4.0
go build github.com/aws/aws-sdk-go/service/ec2: /usr/local/go/pkg/tool/linux_amd64/compile: signal: killed
!! command failed: build -o .build/linux-amd64/prometheus -ldflags -X github.com/prometheus/common/version.Version=2.28.1 -X github.com/prometheus/common/version.Revision=b0944590a1c9a6b35dc5a696869f75f422b107a1 -X github.com/prometheus/common/version.Branch=HEAD -X github.com/prometheus/common/version.BuildUser=root@76a91e410d00 -X github.com/prometheus/common/version.BuildDate=20210709-14:47:03  -extldflags '-static' -a -tags netgo,builtinassets github.com/prometheus/prometheus/cmd/prometheus: exit status 1
make: *** [Makefile.common:227: common-build] Error 1
!! The base builder docker image exited unexpectedly: exit status 2
```

**You can only build on Linux** even though it's happening in a container. At least right now. Maybe that'll change in the future. Anyway, this meant I needed to create a Linux VM and set up an environment there that could build Prometheus... or figure out how to force a build system to do it, say by creating a fake PR to the Prometheus project. I went the Linux VM route.

I changed the two lines where the HTTP/2 was disabled, I pushed that to a temporary Docker Hub location, and I got it deployed in my cluster.

**Success! Once HTTP/2 was re-enabled, Prometheus was able to scrape my Istio pods again.**

[I worked through this all with the Prometheus team](https://github.com/prometheus/prometheus/issues/9068) and they were able to replicate the issue [using my repro repo](https://github.com/tillig/prometheus-repro). They are now working through how to re-enable HTTP/2 using environment variables or configuration.

**All of this took close to a week to get through.**

It's easy to read these blog articles and think the writer just blasted through all this and it was all super easy, that I already knew the steps I was going to take and flew through it. I didn't. There was a lot of reading issues. There was a lot of trying things and then retrying those same things because I forgot what I'd just tried, or maybe I discovered I forgot to change a configuration value. I totally deleted and re-created my test Kubernetes cluster like five times because I also tried updating Istio and... well, you can't really "roll back Istio." It got messy. Not to mention, debugging things at the protocol level is a spectacular combination of "not interesting" and "not my strong suit."

My point is, **don't give up.** Pushing through these things and reading and banging your head on it is how you get the experience so that _next time_ you will have been through it.
