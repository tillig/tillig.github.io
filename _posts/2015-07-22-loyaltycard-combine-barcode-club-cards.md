---
layout: post
title: "LoyaltyCard: Combine Your Barcode Club/Rewards Cards"
date: 2015-07-22 -0800
comments: true
tags: [javascript,home]
---
I have, like, 1,000 of those little keyring cards for loyalty/rewards. You do, too. There are a ton of apps for your phone that manage them, and that's cool.

**Loyalty card phone apps never work for me.**

For some reason, I seem to go to all the stores where they've not updated the scanners to be able to read barcodes off a phone screen. I've tried different phones and different apps, all to no avail.

**You know what always works? The card in my wallet.** Which means I'm stuck carrying around these 1,000 stupid cards.

There are sites, some of them connected to the phone apps, that will let you buy a combined physical card. But I'm cheap and need to update just frequently enough that it's not worth paying the $5 each time. I used to use a free site called "JustOneClubCard" to create a combined loyalty card but that site has gone offline. I think it was purchased by one of the phone app manufacturers. ((Seriously.)

So...

## Enter: LoyaltyCard

[**I wrote my own app: LoyaltyCard.** You can go there right now and make your own combined loyalty card.](http://app.paraesthesia.com/LoyaltyCard/)

You can use the app to enter up to eight bar codes and then download the combined card as a PDF to print out. Make as many as you like.

**And if you want to save your card? Just bookmark the page with the codes filled in.** Done. Come back and edit anytime you like.

[Go make a loyalty card.](http://app.paraesthesia.com/LoyaltyCard/)

## Behind the Scenes

I made the app not only for this but as a way to play with some Javascript libraries. The whole app runs in the client with the exception of one tiny server-side piece that loads the high-resolution barcodes for the PDF.

[You can check out the source over on GitHub.](https://github.com/tillig/LoyaltyCard)
