---
layout: post
title: "Connect to an Azure Virtual Machine from Behind a Firewall via Terminal Services"
date: 2014-11-12 -0800
comments: true
tags: [vs,azure]
---
I have an [MSDN subscription](http://msdn.microsoft.com/subscriptions) at work which comes with some [Azure services](http://azure.microsoft.com/) like virtual machines. I'm using one of these VMs to explore the VS 14 CTP.

The problem is... port 3389 isn't open through the firewall at work, so using the default port for Terminal Services doesn't work for me.

Luckily, you can change the port your VM uses for Terminal Services. Knowing I won't be hosting a web site here, changing to port 80 makes it easy.

First, open up the VM in the Azure Portal and click the "Settings" button.

![Click the Settings button on the VM]({{ site.url }}/images/20141112_vmmain.png)

Now click the "Endpoints" entry on the list of settings.

![Click Endpoints in the settings menu]({{ site.url }}/images/20141112_vmsettings.png)

We want the public port for Terminal Services to be port 80. Click the Terminal Services entry to edit it.

![We want TS on port 80]({{ site.url }}/images/20141112_vmendpoints.png)

Update the public port to 80 and click the Save button at the top.

![Update the public port to 80]({{ site.url }}/images/20141112_vmendpointedit.png)

Now go back to the main VM dashboard and click the "Connect" button.

![Click the Connect button]({{ site.url }}/images/20141112_vmconnect.png)

A small <code>.rdp</code> file will download. If you open it in a text editor it will look like this:

    full address:s:yourmachine.cloudapp.net:3389
    prompt for credentials:i:1

Change that port at the end to 80.

    full address:s:yourmachine.cloudapp.net:80
    prompt for credentials:i:1

Save that and double-click the file to start a Terminal Service session. Boom! Done.