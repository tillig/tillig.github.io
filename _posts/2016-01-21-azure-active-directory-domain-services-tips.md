---
layout: post
title: "Azure Active Directory Domain Services Tips and Tricks"
date: 2016-01-21 -0800
comments: true
tags: [windows,azure,security]
description: "In working with the preview of Azure Active Directory Domain Services I've found a few gotchas. This article explains what I found."
---

I've been experimenting with [Azure Active Directory Domain Services](https://azure.microsoft.com/en-us/services/active-directory-ds/) (currently in preview) and it's pretty neat. If you have a lot of VMs you're working with, it helps quite a bit in credential management.

However, it hasn't all been "fall-down easy." There are a couple of gotchas I've hit that folks may be interested in.

##Active Directory Becomes DNS Control for the Domain
When you join an Azure VM to your domain, you have to set the network for that VM to use the Azure Active Directory as the DNS server. This results in any DNS entries for the domain - for machines on that network - only being resolved by Active Directory.

This is clearer with an example: Let's say you own the domain `mycoolapp.com` and you enable Azure AD Domain Services for `mycoolapp.com`. You also have...

- A VM named `webserver`.
- A cloud service responding to `mycoolapp.cloudapp.net` that's associated with the VM.

You join `webserver` to the domain. The full domain name for that machine is now `webserver.mycoolapp.com`. You want to expose that machine to the outside (outside the domain, outside of Azure) to serve up your new web application. It needs to respond to `www.mycoolapp.com`.

You can add a public DNS entry mapping `www.mycoolapp.com` to the `mycoolapp.cloudapp.net` public IP address. You can now get to `www.mycoolapp.com` correctly from _outside your Azure domain_. However, **you can't get to it from inside the domain**. Why not?

You can't because Active Directory is serving DNS inside the domain and there's no VM named `www`. It doesn't proxy external DNS records for the domain, so you're stuck.

**There is not currently a way to manage the DNS for your domain within Azure Active Directory.**

**Workaround**: Rename the VM to match the desired external DNS entry. Which is to say, call the VM `www` instead of `webserver`. That way you can reach the same machine using the same DNS name both inside and outside the domain.

##Unable to Set User Primary Email Address
When you enable Azure AD Domain Services you get the ability to start authenticating against joined VMs using your domain credentials. However, if you try managing users with the standard Active Directory MMC snap-ins, you'll find some things don't work.

A key challenge is that **you can't set the primary email address field for a user**. It's totally disabled in the snap-in.

This is really painful if you are trying to manage a cloud-only domain. Domain Services sort of _assumes_ that you're synchronizing an on-premise AD with the cloud AD and that the workaround would be to change the user's email address in the on-premise AD. However, **if you're trying to go cloud-only, you're stuck**. There's no workaround for this.

##Domain Services Only Connects to a Single ASM Virtual Network
When you set up Domain Services, you have to associate it with a _single_ virtual network (the vnet your VMs are on), and it _must be an Azure Service Manager_ style network. If you created a vnet with Azure Resource Manager, you're kinda stuck. If you have ARM VMs you want to join (which must be on ARM vnets), you're kinda stuck. If you have more than one virtual network on which you want Domain Services, you're kinda stuck.

**Workaround**: Join the "primary vnet" (the one associated with Domain Services) to other vnets using VPN gateways.

There is not a clear "step-by-step" guide for how to do this. You need to sort of piece together the information in these articles:

- [Connecting Classic VNets to New VNets](https://azure.microsoft.com/en-us/documentation/articles/virtual-networks-arm-asm-s2s-howto/) - Tells you how to create a VPN connection between an ARM and an ASM vnet.
- [Connect Multiple On-Premises Sites to a Virtual Network](https://azure.microsoft.com/en-us/documentation/articles/vpn-gateway-multi-site/) - Tells you how to get more than one VPN connection working against a vnet.

##Active Directory Network Ports Need to be Opened
Just attaching the Active Directory Domain Services to your vnet and setting it as the DNS server may not be enough. Especially when you get to connecting things through VPN, you need to make sure the right ports are open through the network security group or you won't be able to join the domain (or you may be able to join but you won't be able to authenticate).

[Here's the list of ports required by all of Domain Services.](https://technet.microsoft.com/en-us/library/dd772723(WS.10).aspx) Which is not to say you need _all of them open_, just that you'll want that for reference.

I found that enabling these ports _outbound_ for the network seemed to cover joining and authenticating against the domain. YMMV. There is no specific guidance (that I've found) to explain exactly what's required.

- LDAP: `Any/389`
- LDAP SSL: `TCP/636`
- DNS: `Any/53`


