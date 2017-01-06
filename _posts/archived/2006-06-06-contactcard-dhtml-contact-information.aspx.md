---
layout: post
title: "ContactCard - DHTML Contact Information"
date: 2006-06-06 -0800
comments: true
disqus_identifier: 1013
tags: [downloads,javascript]
---
Recently inspired by a trip through [*Pragmatic
Ajax*](http://www.amazon.com/exec/obidos/ASIN/0976694085/mhsvortex) and
a look at [Phil Haack's XFN Highlighter
Script](http://haacked.com/archive/2006/04/05/MakingMicroformatsMoreVisibleAnnouncingTheXFNHighlighterScript.aspx),
I decided to play around with [the prototype JavaScript
library](http://prototype.conio.net/) and create a little pop-up contact
information script.

 What this allows you to do is specify the contact information for a
given person including their name, email address, web site URL, a short
description of them, and their Xbox Live Gamertag and have the contact
info pop up automatically when you put your cursor over a link
describing them.

 To use it, you need to add the prototype library and the ContactCard
library to the \<head /\> of your page. Then you define your list of
contacts and related information in a separate script and add that -
whenever you need to add, remove, or change contact info, you then just
modify that separate script.

 By adding the CSS class `contactcard` followed by a period and the ID
of the given contact, the ContactCard script will automatically rewrite
the page with the popup. If it's a link, including XFN relationship
information will automatically have that added to the contact card:

 `<a href="/" rel="me" class="contactcard.tillig">Travis Illig</a>`

 This works on any HTML element, not just links:

 `<span class="contactcard.tillig">Travis Illig</span>`

 The script will also automatically find links that have URLs matching
those you have defined for contacts and will attach a contact's card to
those links without you having to do anything. (You can disable this
behavior if you want.)

 Full usage instructions, including how to customize the look of the
popup card, are included. Check out the test page that is included for
working examples.

**Note 8/22/2014:** There are better ways to do this with jQuery and Bootstrap now, but I've not bothered updating this script. You can still grab it if you like, but it's totally unsupported.

[**Download ContactCard
1.2.0**](https://github.com/tillig/ContactCard/archive/v1.2.0.zip)

 **Version History:**
 **1.0.0:** First release.
 **1.1.0:**
Added support for rendering XFN information for a link without having
contact info attached.
Fixed positioning bug.
 **1.2.0:** Added option to automatically rewrite links that match the
URL for a contact. Enabled by default.
