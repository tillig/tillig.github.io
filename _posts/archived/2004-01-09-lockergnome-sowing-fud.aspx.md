---
layout: post
title: "Lockergnome Sowing FUD"
date: 2004-01-09 -0800
comments: true
disqus_identifier: 442
tags: [web]
---
I regularly read various IT-related newsletters published by
[Lockergnome](http://www.lockergnome.com). Normally I'd recommend them
as a great place for both newbies and experienced folks alike to keep
abreast of technology and trends.

 Unfortunately, since they've changed their site and the way they
generate their content, their editorial ability seems to be lacking. I
just read the January 8 issue of the [IT Professional
newsletter](http://channels.lockergnome.com/it/) and found an article
someone submitted regarding computer and network security (*SECURITY:
Feasibility Of Standards*).

 The writer pretty much makes blanket statements about how cookies are
bad and JavaScript is bad and Java is bad... and it irritates me that
stuff like that gets published in a spot where newbies read it and then
get the idea that security means being paranoid and disabling the
technology rather than educating themselves.

 I tried to write in to the author of the article, but his mail server
seems to be down (or he provided a bad email address on his web site).
So I wrote in to the content editor (or *supposed* content editor) of
the newsletter.

 Below is what I sent him:
 Just read Howie's column on security in Lockergnome. For the most part
I agree with everything he put forth - very good points on all but two
topics: cookies and javascript. (I'd have sent this directly to Howie,
but his mail serve seems to be down.)

 So we're on the same page, let me paste in what I read him as saying:

 1) Is Your Browser Set To Allow Cookies?
 Why? Well, gee, if I go to this game site, they automatically plug in
my username and password. Very nice. I hope you know better than to
believe that cookies only do this! There ARE good cookies, and most of
them are time savers. But most are either nothing special or downright
miserable!

 2) Is Javascript and/or Java enabled on your browser?
 Do you randomly surf the Web? Would you ever know if a script or java
program was executing or implanting garbage on your PC?

 Yeah, eventually. When you need to reboot and strange things start to
happen!

 The web has become a much more accessible platform for application
development and delivery than it was even a few years ago. Being a web
developer by trade for almost 8 years now (and an application developer
for much longer than that), I've followed these developments with
eagerness and anticipation of the next huge development to come around
(and when it does, making use of it).

 Unfortunately, what I've found is that there seem to be two types of
people when it comes to the web being an application platform: the
paranoid, who seem to sow fear, uncertainty, and doubt when it comes to
the web; and the open-minded, who are probably a bit too liberal when it
comes to how they work within the web. I'll admit I tend toward the
liberal side, and normally I let things like this slide by, but when
someone makes pretty bold statements like this in a forum like
Lockergnome that newbies trust, I have to take issue. Let's look at each
of the statements in turn.

 Cookies:

 Howie says that most cookies are "nothing special or downright
miserable." He also gives the impression (though it's not directly said)
that all the good cookies do is fill in your name on a form. I know that
he, with the experience he claims on his PuterGeek site, is smarter than
that, but the newbies out there reading your stuff don't have a context
like the more experienced folks. Cookies, in many cases nowadays, are
what make web applications function - period. Due to the stateless
nature of the web, many times you can't write a robust application
without assuming there be some sort of state maintenance. Can you get
around that? Sometimes, using hidden form fields and so on. What about
disconnected or mobile users? Gets more tricky.

 He also makes the statement that he "hope [the reader] know[s] better
than to believe cookies only" fill in forms. Sure they do. In the
context of his statement, though, he makes it sound like they primarily
have malicious abilities beyond the filling-in-of-forms. That's a
problem, especially when you start reaching audiences like
less-than-educated network admins (like I had at a company I used to
work for) who start filtering cookies out at the proxy level because
they believe they're huge security risks.

 I guess my thoughts are when talking about security and cookies, it's
necessary to tell people that cookies may potentially be used to TRACK
you, but they can't siphon information out of your computer like your
name or email address. They can't steal anything that you didn't provide
in the first place. I still talk to users who think cookies can
magically figure out your credit card information. Reading a statement
like his, implying that cookies should probably be disabled entirely,
only contributes to that mindset, and I think that's not such a Good
Thing.

 Javascript:

 This is another of those things where the newbie, I feel, is going to
read this as "all Javascript or Java is bad." There are actually many
commercial web-based applications (Microsoft SharePoint Portal Server or
Windows SharePoint Services are two I can think of off hand) that simply
won't function unless you have Javascript enabled. For the Windows-based
users, that's why there are "security zones" - so you can define who you
trust and who you don't, and what you trust each person to run on your
computer. A blanket statement like you'll only know if Java or
Javascript is running "when you need to reboot and strange things start
to happen" is a FUD statement if I've ever read one. Are there malicious
script kiddies out there? Sure. Are there more constructive ways to warn
people about configuring security on their browser? You bet.

 I'm sorry if I seem to have run off at the virtual mouth here. I just
find that, as I develop applications of my own and support both
customers internal and external to my company, I run into people who
call me up and complain that applications aren't as "dynamic" or
"functional" as they could be (or USED to be) and it always turns out
they read an article like this and decided it was a great idea to
disable scripting, cookies, and any other dynamic behaviors. I don't
think disabling the technology entirely is the key - I think it's
knowing who to trust and working accordingly. And that's the point I
feel was missing from the whole thing.

 Thanks for your time,
 -T
