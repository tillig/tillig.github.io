---
layout: post
title: "Using the az CLI Behind Zscaler"
date: 2024-06-06 -0800
comments: true
tags: [azure]
description: "At work I use the az CLI behind a sort of VPN/proxy thing, Zscaler. This is how to make it work properly and trust Zscaler."
---
At work I use the `az` CLI behind a VPN/proxy package called Zscaler. I'm not a big fan of these TLS-intercepting-man-in-the-middle-attack sort of "security" products, but it is what it is.

The problem for me is that, if I move to a new machine, or if someone else is setting up a machine, I always forget how to make the `az` CLI trust Zscaler so it can function properly and not get a TLS certificate error. I've re-figured this out countless times, so this time I'm writing it down. It does seem to be slightly different on Mac and Windows and I'm not sure why. Perhaps it has to do with the different ways the network stack works or something.

**The `az` CLI is Python-based** so this will ostensibly work to generally solve Python issues, but I always encounter it as part of `az`, so I'm blogging it as such.

> [Zscaler does have some help for enabling trust](https://help.zscaler.com/zia/adding-custom-certificate-application-specific-trust-store) but you sometimes have to fudge the steps, like with this.

## On Mac

- Make sure you have the Zscaler certificate in your system keychain as a trusted CA. Likely if you have Zscaler running this is already set up.
- [Install the latest `ca-certificates` package](https://formulae.brew.sh/formula/ca-certificates#default) or get the content [from here](https://curl.se/docs/sslcerts.html).
- Set the `REQUESTS_CA_BUNDLE` environment variable to point at the `cert.pem` that has all the CA certs in it.

This works because the Homebrew package for `ca-certificates` automatically [includes all the certificates from your system keychain](https://github.com/Homebrew/homebrew-core/blob/d4e3c5c9a6d1744e4f5b714cac2897227daa4e60/Formula/c/ca-certificates.rb#L32) so you don't have to manually append your custom/company CA info.

## On Windows

- Go get [the latest `ca-certificates` bundle from here](https://curl.se/docs/sslcerts.html).
- Open that `cert.pem` file in your favorite text editor. Just make sure you keep the file with `LF` line endings.
- Get your Zscaler CA certificate in PEM format. Open that up in the text editor, too.
- At the bottom of the `cert.pem` main file, paste in the Zscaler CA certificate contents, thereby adding it to the list of CAs.
- Set the `REQUESTS_CA_BUNDLE` environment variable to point at the `cert.pem` that has all the CA certs in it.

Again, not sure why on Windows you need to have the Zscaler cert added to the main cert bundle but on Mac you don't. This also could just be something environmental - like there's something on my work machines that somehow auto-trusts Zscaler but does so to the exclusion of all else.

Regardless, this is what worked for me.
