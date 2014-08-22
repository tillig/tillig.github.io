---
layout: post
title: "Site Down Issues"
date: 2007-02-27 -0800
comments: true
disqus_identifier: 1153
tags: [General Ramblings]
---
Man, the last week or so my site's been acting up because the server I'm
hosted on has had disk trouble, service trouble, and any other trouble
you can conceive. First the disk went bad, then they fixed that but not
all the services (PHP) were running... then they got PHP running but
MySQL wasn't running...
 
 The last two days the MySQL service has been down but PHP has been up,
which is why the blog was accessible through RSS (it's static XML right
now) and the main page was sort of wonky and empty looking.
 
 The interesting thing is that the hosting company had said they were
going to move everyone off that server to a new server... but rather
than just doing that, they futzed around for a while trying to revive
this old server. I ended up having to specifically say, "Hey, what
happened to the migration? Maybe an expedited move to the new server for
MySQL users is in order?"
 
 I hate to be the squeaky wheel, but dammit anyway.
 
 I did learn something, though. I realized that uptime metrics described
in percentages are sort of meaningless. Maybe other people realized this
long ago, but if you think about it, you could be down for a *whole day*
and still have a 99.7% uptime. You'd have to be down for four days to
break the 99% barrier. That's *four whole days - 96 hours*.
 
 I'm no longer interested in percentage uptime. I'm interested in *hours
of downtime*. You want to impress me? Skip that "99.9% uptime" baloney
and shoot for less than one hour of downtime per year. (And, yeah, I
know the people giving out "five nines of uptime" garbage really mean an
hour of downtime or whatever, but part of useful metrics is describing
the metric in easily intelligible units. Don't make me have to calculate
that crap. "Oh, we're only down for 0.042 days per year." Give me a
freaking break.")
 
 On the plus side, I get a good, personable response from the support
people at the hosting company and they're totally understanding and nice
and easy to work with. From that standpoint, I can't complain, and
honestly, the service does make all the difference. Let's just hope we
don't have another burp like this.
