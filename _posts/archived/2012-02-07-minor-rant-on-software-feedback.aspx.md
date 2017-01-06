---
layout: post
title: "Minor Rant on Software Feedback"
date: 2012-02-07 -0800
comments: true
disqus_identifier: 1767
tags: [GeekSpeak]
---
I think getting feedback on your software is valuable. It's nice to know
people are using what you put out there and it's interesting to see what
they think.

Usually.

The thing I'm sort of stewing over is something I'll call, for the sake
of discussion, "unjustified negative feedback." Let me dive into an
example.

I have [a free, open-source add-on for
Firefox](https://addons.mozilla.org/en-US/firefox/addon/integrated-auth-for-firefox/)
that makes it easier to manage the list of sites to which you allow
Windows pass-through authentication. It's called [Integrated
Authentication for
Firefox](https://addons.mozilla.org/en-US/firefox/addon/integrated-auth-for-firefox/).
The description is as follows:

> Most people don't realize it, but Firefox will do integrated
> authentication like NTLM (Windows pass-through) just like Internet
> Explorer. Some people solve the issue by going around Firefox and
> hosting IE right in Firefox. The other way to do it is to keep Firefox
> as the rendering engine and tell Firefox it's OK to use integrated
> authentication with a given site.
>
> The problem is that managing the list of sites you allow Firefox to
> pass-through authenticate with is not straightforward and involves
> manually manipulating configuration settings.
>
> This add-on makes it easier to manage this list, allowing you to stick
> with Firefox but still use pass-through authentication like
> Windows/NTLM or Kerberos.
>
> **NOTE: This add-on does not actually DO the authentication. [Firefox
> itself already has built-in integrated
> authentication](https://developer.mozilla.org/en/Integrated_Authentication)**,
> it's just not obvious how to get it to work. This add-on makes it easy
> to configure Firefox to use its already-existing features, but *it
> does not do the authentication proper*.

The problem this add-on solves is in that second paragraph: "managing
the list of sites... is not straightforward and involves manually
manipulating configuration settings." If you're a power user (and not
everyone out there is), you can hit the "about:config" page in Firefox
and tweak the "network.negotiate-auth.trusted-uris,"
"network.negotiate-auth.delegation-uris," and
"network.automatic-ntlm-auth.trusted-uris" settings in the appropriate
format and accomplish the same thing. But it's not pretty and it's not
really a first-class interface.

The point is, there's a certain audience for this software. Most people
seem to like it because they didn't know about those buried settings and
this makes it nice and easy to deal with. And then there are folks who
leave reviews like this:

![](https://hyqi8g.bl3301.livefilestore.com/y2pMG6mdTTa2sRxdZlB7KQHQuZXB95zlPzJqtYun89J6ucyXWaaJz54CKSoIUyDB33tyz8zURl8d9ibFlDXoQGZgChgThqoY9WHMgBmQSlijFs/20120207ffreviews.png?psid=1)

> [Disappointing.](https://addons.mozilla.org/en-US/firefox/addon/integrated-auth-for-firefox/reviews/335045/)
> http or https is required before each entry when it really isn't
> required when set manually. You can't paste in a ton of coma separated
> items to add them quickly. This isn't any better than going to
> about:config unfortunately.

That got me a one-star. Or this one:

> [This is just a
> GUI](https://addons.mozilla.org/en-US/firefox/addon/integrated-auth-for-firefox/reviews/299861/)
> for the "network.automatic-ntlm-auth.trusted-uris" value of the
> "about:config" page... if anything, it makes adding the URL's more
> difficult, since you can't add them comma-separated or without "http"
> prefix. For this to be actually useful a content menu like "Add this
> URL" or automatic/wildcard addition of an HTTP Auth protected pages
> (not a good idea from security perspective) would need to be added; as
> of right now this could very well be replaced with a link to above
> configuration value.

That one was two stars.

Notice any common theme? "This isn't any better than going to
about:config..." "This is just a GUI for the ... value of the
'about:config' page..." **I feel like the folks giving the bad reviews
didn't actually read what the plugin did. Of course it's not any better
than going to "about:config" – that's all the plugin does.**

The folks leaving the reviews were **obviously not the target audience
for the plugin**. If you're comfortable messing around in "about:config"
then *just do it*. But I don't have a ton of ratings over there, so just
a few bad reviews take my overall average down pretty easily.

I use my plugin as an example, but this sort of thing is pretty common
in software feedback. Here's a one-star review from [a recent Free App
of the Day in the Amazon
AppStore](http://www.amazon.com/dp/B006357W8Y?tag=mhsvortex):

![](https://hyqi8g.blu.livefilestore.com/y2pcn1hdsjmufLydhaCjqprBJQO-w5tfif0dbVUjYWgiRZfkmLD3MfIJ9qVZttL8fCZhFYTdf28rs9CfH9oeW9yIoLyjEy1GUhR9Gggr-_iEYk/20120207amazon.png?psid=1)

> I haved played a lot of drawing apps for my kindle fire but this one
> is the ultimate worst it needs to be User friendly and I hate it so
> take that people who made this app you just got pwned lookout swaggar
> alert....... so yea u guys suk

That's not even worth the electrons it's printed on. Maybe you didn't
like the app... but you sort of got what you paid for it (nothing), and
I can't imagine it was worth *only one star* when there are actual
thoughtful reviews that give it much higher ratings.

**And that's what I'm talking about: unjustified negative feedback.**

I feel like there's always that guy who has to say, "I know this is a
screen shot app, but how come it doesn't make coffee, too? ONE STAR!"
It's like there needs to be a screener before people leave feedback.
"Did you actually use the software? Did you read the description of what
the software was intended to do? Did it do what it said?"

I know there's not really any way to solve it because there are always
going to be trolls, people who use the software who aren't the target
for it, and folks just generally having a bad day who will take it out
on the developer.

At the same time, I'm not entirely sure the people leaving the feedback,
especially for free/open source software, realize there's probably only
one or two people working on it... in their *spare time*... for *no
money*... and maybe something more constructive would be beneficial.

Maybe this is what Jeff Atwood was talking about when he said, "[90% of
all community feedback is
crap](http://www.codinghorror.com/blog/2012/02/listen-to-your-community-but-dont-let-them-tell-you-what-to-do.html)."
I wish we could reduce that percentage. It'd be a far more motivating
experience to build better products.

**Note: I think there's a strong (inversely-proportional) correlation
between "valuable feedback" and "community breadth."** The wider the
audience for a product, the larger the percentage of crap feedback. The
user base for Firefox is huge and there's a wide range of skill levels,
so you get a higher crap percentage. The user base for Android apps in
the Amazon AppStore is huge and, again, there's a wide range of skill
levels, so, again, high percentage of crap. On the other hand, I find
that slightly smaller, more focused communities like [the user base for
CodeRush/DXCore
plugins](http://community.devexpress.com/forums/default.aspx?GroupID=18),
has a *vastly* lower percentage of crap feedback. Everyone seems willing
to work together to make the ecosystem better. Something to think about.

