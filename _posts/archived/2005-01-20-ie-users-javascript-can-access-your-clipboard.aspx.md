---
layout: post
title: "IE Users: JavaScript Can Access Your Clipboard"
date: 2005-01-20 -0800
comments: true
disqus_identifier: 730
tags: [GeekSpeak]
---
Just read an article over at [harriyott.com](http://www.harriyott.com):
Looks like [there are JavaScript
functions](http://www.harriyott.com/2005/01/javascript-clipboard-control.aspx)
built into IE that not only allow a site to set the contents of your
clipboard but retrieve them as well.
 
 IE users, try this one on for size (this only works with Internet
Explorer, to my knowledge):
 
 First, [click this link to copy the phrase "My Dog Has Fleas" to your
clipboard](#). Now open up a Notepad window (or whatever your favorite
text editor is) and paste it in - sure enough, it adds info to your
clipboard.
 
 Now copy some arbitrary text to your clipboard. Doesn't matter what it
is - type something in that Notepad window, or highlight something on
this page, and copy it. Now [click this link to show your clipboard
contents](#).
 
 Pretty freaky, huh?
 
 For the curious... the "insert data into clipboard" code is:
 `window.clipboardData.setData('Text', 'My Dog Has Fleas');`
 
 ...and the "retrieve data from clipboard" code is:
 `window.clipboardData.getData('Text');`
