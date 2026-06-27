---
layout: post
title: "Marantz Volume Monitor v2"
date: 2026-06-27 -0800
comments: true
tags: [personal,home,hardware,network,media]
description: "I refreshed my external volume monitor for my Marantz receiver and it is a massive improvement. ESP32, touch screen, wifi... way better."
image: /images/20260627_shield_tv.jpg
---

Back in 2017 I [created an external volume monitor]({{ site.url }}/archive/2017/03/27/arduino-volume-monitor-for-marantz-receiver/) for our Marantz receiver. The receiver is in a cabinet so we can't see the display on the front, and the on-screen display doesn't work over 4K inputs. Rather than guess at the volume (to know if you're going to be blasted out or not be able to hear), I created a little monitor display with an Arduino that kinda did the job.

This is what _the original version_ looked like:

![Original volume monitor]({{ site.url }}/images/20170327_finishedbox.jpg)

At the time I was pretty good with it. It solved the problem and was... _fine_.

It's nine years later and over time I got frustrated with some of the shortcomings. The contrast on the display was never super, so it was always just a little difficult to read from a distance. Combined with my eyes (getting older), it wasn't cutting it anymore. After a power outage, it was a pain to "recover" because you had to ensure the Arduino was powered up _after_ the receiver or it'd go into a death loop.

Hardware has progressed a lot, so I decided to make an upgrade.

Presenting _the new version_:

![Updated volume monitor]({{ site.url }}/images/20260627_shield_tv.jpg)

This version has some pretty major upgrades. Built on an ESP32 (instead of Arduino) with a 4" touch screen (instead of a 1602 display), it now has:

- Wi-Fi support instead of wired networking.
- Auto-detection of networks.
- Auto-detection of receivers on the network.
- A nice, large volume display along with a visual gauge.
- Improved display of the source and sound format.
- Full settings menu for reconfiguration, calibration, or checking current connection information.

All still on a budget - the hardware cost about $30.

Here's the first page of the settings menu:

![Settings menu]({{ site.url }}/images/20260627_settings_menu.jpg)

(Admittedly, the pictures aren't great... but it's hard to take a good picture of a reflective touch screen.)

I've updated [the GitHub repo where all the source is](https://github.com/tillig/MarantzVolumeMonitor) if you want to build one, too. It has all the software, the hardware list, wiring diagrams, even the 3D model I made for the box.
