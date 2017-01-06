---
layout: post
title: "Tips for New Higher Speed Verizon FiOS Subscribers"
date: 2010-03-01 -0800
comments: true
disqus_identifier: 1619
tags: [GeekSpeak]
---
As part of our contract renegotiation with Verizon, we upgraded our
network speed to 35/35 (35Mbps download and upload). When we did a speed
test, however, we were only seeing about 20/15. I did some research and
found out a few things that, well, it "would have been nice to know
yesterday."

**You may need a new ONT.** Some subscribers have old ONT (optical
network terminal) boxes on the side of their house that can't actually
support the faster speeds. This wasn't the case for me, but affected
folks actually need someone to come out from Verizon and replace the
hardware to get the full speed.

**Not all speed tests report higher speeds correctly.** I lost the links
where I first saw this reported, but in the Verizon forums I saw several
cases of common speed tests not actually reporting correctly. I saw this
myself. [Use the Verizon speed test to check your
speed](http://speedtest.verizon.net).

**You may need to change some settings.** Apparently Windows default
network settings don't allow the client to fully take advantage of the
higher speeds. [Verizon has a network
optimizer](http://www.verizon.net/optimize) that you can run that will
update some settings and get things working correctly (you can also use
it to reset your settings back to default). This worked for me on
Windows 7, but if you're on Vista [you may need to read this KB article
first](http://support.microsoft.com/kb/939006). The settings it modifies
(copied from their description page):

-   TCP 1323 Extensions - This parameter enables enhancements to the
    TCP/IP protocol that provide improved performance over high speed
    connections.
-   TCP Receive Window - This parameter specifies the number of bytes a
    sender (the source you are downloading from) may transmit without
    receiving an acknowledgment. Modifying it determines the maximum
    size offered by the system.
-   MTU (Maximum Transmission Units) - The MTU defines the largest
    single unit of data that can be transmitted over your connection.
    The FiOS network requires an MTU of 1492 bytes.

After running the optimizer I was able to get 35/35 on wired
connections. Wireless connections still report weird for me - like 3/50
or something. It's nice and fast, though, so I'm chalking that up to
incorrect reporting rather than misconfiguration.

