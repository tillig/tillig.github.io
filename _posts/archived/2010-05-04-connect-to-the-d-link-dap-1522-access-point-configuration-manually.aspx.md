---
layout: post
title: "Connect to the D-Link DAP-1522 Access Point Configuration Manually"
date: 2010-05-04 -0800
comments: true
disqus_identifier: 1637
tags: [home,network]
---
I had a problem this morning where my D-Link DAP-1522 access point had
to be reset to factory defaults. After clicking the reset button on the
back and having it reboot, I was unable to go to the configuration page
following the instructions (visit 192.168.0.50 and log in). Totally
inaccessible.

I ended up calling D-Link support and they explained how to do a more
manual connection to the access point. Basically the DHCP server wasn't
enabled so I wasn't able to get an IP address when connecting directly
to the access point so I had to mangle my network settings a bit long
enough to connect and set things up.

Connect your computer to the access point with an Ethernet cable.

Go into the adapter settings for the network adapter you've connected to
the access point.

Update the TCP/IPv4 settings on the adapter so it's not DHCP anymore.
Use these settings:

- IP = 192.168.0.99
- Subnet Mask = 255.255.255.0
- Gateway = 192.168.0.50

Now open up a browser and go to 192.168.0.50 as you normally would to
get to the configuration page. It should come up.

I kinda wish that had been in the instruction manual, but since it's
not, there you go.
