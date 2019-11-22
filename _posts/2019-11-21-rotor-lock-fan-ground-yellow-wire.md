---
layout: post
title: "Rotor Lock Fan Hack - Ground the Yellow Wire"
date: 2019-11-21 -0800
comments: true
tags: [hardware]
description: "Trying to replace a rotor lock detecting fan with a speed sensing fan? Ground that yellow! (YMMV, disclaimer, disclaimer)"
---
**WARNING** I'm going to explain a total hack here that worked for me. If you do this, any consequences are totally on you. I'm not responsible if your hardware gets fried.

I have a Synology Diskstation DS1010+ with... loud fans. It's old, the fans are starting to sound like a rock tumbler. For the life of me, I can't find a _quiet fan_ alternative. I can replace the fans with the same ones I already have, but they've always been kind of loud.

Unfortunately, the fans in the DS1010+ are the kind that detect locked rotors.

Let me explain.

Fans for computers come in three-wire or four-wire varieties. Let's focus on three-wire because that's what the DS1010+ and many other systems use.

The three wires are _sometimes_:

- Red: Power
- Black: Ground
- Yellow: Fan speed sensor

However, server fans usually don't control the speed this way; instead they want to detect if the fan is dead. So the three wires there are:

- Red: Power
- Black: Ground
- Yellow: Locked rotor detection

What's important to know about the locked rotor signal is that if the signal is _grounded_ then the server thinks the fan is still spinning. Alarms don't go off, things work as normal. When the rotors get locked, power comes out that yellow cable and that's when the alarms sound.

I bought really nice [be quiet! cooling fans](https://amzn.to/2XIEG5K) that are totally quiet... but they have a speed sensor on the yellow wire, not locked rotor detection.

This caused the Diskstation to generate all sorts of fan alarms - flashing lights, emails, beeping, the whole thing. You can search for this in forums, lots of people see it. You can silence the beeping and stop the emails, but you'll still periodically get a yellow flashing light on the side, the fans spin up like jet engines, and alerts show up in the UI. No, thanks.

[I tried building this circuit that someone figured out that would fake the rotor lock.](http://www.askrprojects.net/other/synofan/index.html) Either I did it wrong or I have yet different fans than that person has. Point being, that was some time I'll never get back.

The missing piece is that info about _grounding_. I found it on that page:

> As long as it is rotating, the signal pin is tied to ground, but left floating once the rotor stopped spinning (the output stage of these types of fans is of an open collector type and pulled up by the main board. Hence, "floating" is equivalent to "high").

I don't really care if the Diskstation, at this point in its way-past-the-warranty life, alerts me about the fans. They're gonna work. It'll be fine. I just need the beeping to stop.

**The answer: clip the yellow wire between the fan and the main board.** On the side that comes from the fan, just bundle it up so it doesn't make contact with anything. On the side that connects to the main board, connect the other end of the yellow wire to the case somewhere that's grounded.

**WARNING** I'll again warn you, this works for me. If it doesn't work for you and things overheat and your house burns down or you lose all your data, that's not my fault. Do this at your own risk!

Here's a picture:

![Ground the yellow wire!]({{ site.url }}/images/20191121_groundyellow.png)

I did this with both fans in the Diskstation and it's been quiet for days.

I also did this with an HP ProCurve 2810-24G switch - the fans in there are like jet engines, no joke. You can't be in the room with the thing. Swapped them out for some nice equivalent Noctua fans and it's so quiet... but it also required that I ground the yellow wire or it would fill up error logs and lights would flash.

Now I have new quiet fans, no alarms, and things are working great.

**FINAL WARNING** Last time, if you do this, it's all at your own risk!
