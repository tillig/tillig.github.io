---
layout: post
title: "Filing Music: Dealing with Artist Names"
date: 2009-11-24 -0800
comments: true
disqus_identifier: 1591
tags: [media,music]
---
A few days ago I was listening to some music on my iPod and noticed that
a couple of tracks had metadata filed as "Firstname Lastname," which is
not how I file my music. I think I picked them up off AmazonMP3, and it
kind of irritated me that I had to fix it, so [I
tweeted](http://twitter.com/tillig/status/5898128427):

> Wondering why so many folks file their music "Firstname Lastname"
> instead of "Lastname, Firstname."

That actually brought a lot of responses (more than some questions I
have where I actually really need to know the answer). I got a couple of
responses from folks who wondered the same thing, but **the opposition
to the idea cited basically two problems:**

1. Most metadata out there is stored this way so it's easier to just
    use it as-is than it is to fix it for your own collection.
2. There could be confusion if you have a solo artist who also has a
    band. For example, "Ben Folds" should show up by "Ben Folds Five" if
    you have music by both.

**My logic in storing "Lastname, Firstname" is pretty simple.**

- When I go looking in the store (or at the library) for "Michael
    Jackson," I don't go looking under "M." I don't think that should be
    different on my iPod.
- I have no desire to store separate "display data" and "sort data,"
    though that possibility exists. Doing it that way means
    double-metadata to manage and makes the list look messy.

I looked around at how libraries file things and, while I couldn't get
my hands on a copy of [the Library of Congress filing
rules](http://www.loc.gov/cds/catman.html) I did gather that,
**generally speaking, the accepted convention for Folks Who File For a
Living is:**

- **If it's an individual person: Lastname, Firstname** (e.g., "Folds,
    Ben")
- **If it's a collective, corporation, or group: Firstname Lastname**
    (e.g., "Ben Folds Five" or "Steve Miller Band")

That's actually how I have my music filed, and that makes sense to me. I
contacted a good friend of mine who actually went to school for this
stuff and he concurred. He also mentioned that there are interesting
edge cases to consider - for example, "Alice Cooper" was not originally
the name of the *singer* but the name of the *band*, so you could argue
it either way.

That would, in fact, mean you would *not* normally see solo work by Ben
Folds sitting alongside his group work in Ben Folds Five, and you'd see
Dave Matthews Band under "D" not "M," but if Dave Matthews had solo
work, it'd be under "M."

My friend pointed me to [DMOZ, the Open Directory
Project](http://www.dmoz.org/), which is a place some folks feel is a
good starting place to look if you don't know how something would be
filed. This general premise - individuals as Lastname, Firstname and
groups as Firstname Lastname - appears to hold there.

Of course, I see why online music stores chose to skip this - so there
are no edge cases. Trade potentially "incorrect" metadata to avoid forum
flame wars about why individual artists don't appear right next to their
bands and such. I guess I'll just have to continue fixing it manually.

Now to figure out the best way to store artist collaborations - duets,
for example. If only there were multiple artist fields in the ID3 spec.
Oh, wait, [ID3 does support
that](http://www.id3.org/id3v2.3.0#head-a0ac5e01361fd414b67a39130716fea4c970e004).
Too bad [iTunes doesn't](http://www.id3.org/iTunes). (Yeah, I know, MP4
doesn't directly support ID3 [but
atoms](http://atomicparsley.sourceforge.net/mpeg-4files.html)... I still
think it's possible to support multiple artists.)
