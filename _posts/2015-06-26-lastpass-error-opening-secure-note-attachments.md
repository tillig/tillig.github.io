---
layout: post
title: "LastPass - Error Opening Secure Note Attachments"
date: 2015-06-26 09:00:00 -0800
comments: true
tags: [lastpass,security]
---
I use [LastPass](https://lastpass.com) for a lot of things including storing my personal software license files. I use the "secure note" function to save the license information and attach the license file to the secure note.

I was working on something today and trying to save a license to my machine and kept getting a dialog saying, **"Error opening attachment. Error C."** Nothing really specific and very confusing. I was able to save the attachment from the LastPass web site but not through the browser extension.

[I ended up finding the solution in this forum post.](https://forums.lastpass.com/viewtopic.php?f=12&t=173135&p=574455)

1. LastPass Icon > Tools > Advanced Tools > Clear Local Cache
2. LastPass Icon > Tools > Advanced Tools > Refresh Sites

After doing a clear and refresh, the attachment saved correctly. These are probably good steps to try whenever you get any sort of error with the LastPass browser extensions. Filed for future reference.
