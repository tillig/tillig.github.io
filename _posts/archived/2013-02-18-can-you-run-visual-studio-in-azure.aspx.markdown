---
layout: post
title: "Can You Run Visual Studio in Azure?"
date: 2013-02-18 -0800
comments: true
disqus_identifier: 1811
tags: [net,vs]
---
**UPDATE 6/1/2013:** As of June 1, 2013, the licensing has been updated
so you can run all of your MSDN software except Windows client and
Windows Server on Azure. [This is outlined in the licensing
whitepaper.](http://www.microsoft.com/en-us/download/details.aspx?id=13350)
I'll leave the below discussion in place for posterity but the latest
update has rendered it irrelevant.

I was sitting at the car repair place on Saturday with my Surface RT
thinking it'd be nice to have a Visual Studio instance to tinker with.
Given I have an MSDN subscription that comes with a free Azure VM and
Visual Studio, it made sense to me that I could just set up the VM with
Visual Studio and play on that.

**It doesn't look like licensing allows you to do that.**

I'm still waiting to [hear something somewhat "official" from Barry
Dorrans
(@blowdart)](https://twitter.com/blowdart/status/302850244041928705) but
[Mark Brown (@markjbrown, an Azure community person) says you can't do
that](https://twitter.com/markjbrown/status/302886731898826752), and my
research agrees with Mark. Here's what I've put together:

[The Azure licensing
FAQ](http://www.windowsazure.com/en-us/pricing/licensing-faq/) says you
can't install Windows 7 or Office in Azure because **they're classified
as "Desktop Applications"** and can't run on virtual machines. There's
also a question about running MSDN licensed items in the cloud
indicating you can't extend your rights there. I'll copy/paste those
here:

> **Q: Can customers run Microsoft Office and Windows 7 Client on
> Virtual Machines? 
> A:** No.  Under the Microsoft Product Usage Rights (PUR), Office and
> Windows 7 are not licensed to run on Virtual Machines.  In particular,
> Microsoft Office is classified in the PUR as “Desktop Applications”,
> which is not included in Licensing Mobility.
>
> More information is available at the site for [Microsoft Product Use
> Rights](http://www.microsoft.com/licensing/about-licensing/product-licensing.aspx).
>
> **Q: Can a customer extend their MSDN use rights to the cloud?** 
> **A:** No, the software licensed under MSDN subscriptions is not for
> use in cloud environments.  However, most MSDN subscribers are
> entitled to a significant amount of Windows Azure services as a
> benefit of their subscription and can use these benefits to run
> instances of Windows Server on the Windows Azure IaaS or to run
> Windows Azure PaaS services.  For details on the amount of Windows
> Azure services included with MSDN subscriptions, please see
> [http://www.windowsazure.com/en-us/pricing/member-offers/msdn-benefits/](http://www.windowsazure.com/en-us/pricing/member-offers/msdn-benefits/).
>
> To run a VM including Microsoft server software such as SharePoint
> Server, Exchange Server, SQL Server, or BizTalk Server in a Windows
> Azure VM, an MSDN subscriber could use their Windows Azure benefits to
> cover the usage of the Windows Azure services and Windows Server
> running in the VM, then use license mobility on server licenses that
> their organization has covered under Software Assurance in order to
> run instances of the server software in the VM.

Following that [Product Use
Rights](http://www.microsoft.com/licensing/about-licensing/product-licensing.aspx)
link, you can get the latest product list document and you'll see that
**Visual Studio is also classified as a "Desktop Application,"** so I
have to assume it's considered in the same way Office and Windows 7 are.

**UPDATE 2/20/2013**: Looking at [the Visual Studio 2012 and MSDN
Licensing White
Paper](http://www.microsoft.com/en-us/download/details.aspx?id=13350),
there's this section:

> When Virtual Environments Require a Separate License
>
> If a physical machine running one or more virtual machines is used
> entirely for development and test, then the operating system used on
> the physical host system can be MSDN software. However, if the
> physical machine or any of the VMs hosted on that physical system are
> used for other purposes, then both the operating system within the VM
> and the operating system for the physical host must be licensed
> separately. The same holds true for other software used on the
> system—for example, Microsoft SQL Server obtained as MSDN software can
> only be used to design, develop, test, and demonstrate your programs.

I can see how Azure is a cloudy (haha) area here because the physical
hardware backing it is hosting multiple VMs - some are production sites,
some are dev/test.

It also appears there is some discrepancy in interpretation of whether
or not you can use Windows 7 on a VM. [It looks like if you have certain
licenses for it, you actually can run Windows 7 in a
VM](http://blogs.technet.com/b/simonmay/archive/2011/01/13/windows-7-licensing-and-virtual-machines-clarified.aspx).

**This makes me re-think whether or not you really can use Visual Studio
in the cloud**. I'm less certain than I was when I posted the original
article

From a personal standpoint, if you can't use VS in the cloud… *I think
that's dumb*. From a business standpoint, if a company wanted to pay for
Azure VM resources to host all of their dev machines or something in the
cloud so you can stamp them out easily, scale up or down… why not?
Sounds like a missed opportunity to me. But even if you ignore that, I
feel like Visual Studio should be a kind of "special case" app. Yeah,
it's a desktop app, but there are different reasons you'd want to
install it in places like Azure so I don't know why you'd restrict it.
Maybe they'll change it in the future. Maybe they'll extend MSDN
licensing to allow for that special case or something. I hope they do.
Until then… looks like I don't get to dev on my Surface RT unless I want
to set up the hosting for that myself… *on a real, physical machine*.

**Standard disclaimers apply here.** Doubly so because we're in legal
territory. I'm no lawyer, and I don't know if you or your company
negotiated different licensing. I don't know about all the different
crazy combinations of licensing out there and there's a lot of craziness
around licensing you need to be aware of to be fully compliant. For me,
**I'd recommend erring on the side of caution** - if you don't know for
sure, don't do it. Check with your Microsoft rep or company or whatever
to find out for sure. I'm just providing the above research to show you
what I found and maybe help inform you. If it turns out I'm wrong… let
me know (and provide some docs I can refer to). I'll be happy to update
the article.

