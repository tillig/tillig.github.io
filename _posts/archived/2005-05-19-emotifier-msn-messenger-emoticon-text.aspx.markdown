---
layout: post
title: "Emotifier: MSN Messenger Emoticon Text"
date: 2005-05-19 -0800
comments: true
disqus_identifier: 820
tags: [Software / Downloads,Release Notices]
---
I was messing around the other day with ASCII text generators like [this one](http://www.javascriptkit.com/script/script2/asciitext.shtml) when I thought I'd combine that with the power of MSN Messenger. But how to address the font kerning issue? ASCII text art needs a fixed-width font.
 
The solution? Draw in emoticons! The Emotifier was thus born.
 
Let's use, for example, the word "JAM" - Emotify it, paste it into MSN Messenger, and you get:
 
![Emotified Jam](https://hyqi8g.blu.livefilestore.com/y2p4kgwaoQjHFotqcozXicaZ7qXQoBy-pBmUaRnHXoKffyVaqWxRz-KWHIOu_SapXwxcXJ5swsLJhyUIBUtVarhbHyMXGrNzlb3i-HJVxDZt84/20050519emotifiermp2.gif?psid=1)
 
How crazy is that?
 
Here you go - try it for yourself:

<script type="text/javascript" src="/js/illig/emotifier.js"></script>

<input type="text" name="emotifyIn" id="emotifyIn" maxlength="4" />&nbsp;<input type="button" onclick="emotify('emotifyIn', 'emotifyOut')" value="Emotify Me!" />

<textarea name="emotifyOut" id="emotifyOut" rows="8" cols="52" wrap="off" style="font-family: fixed !important;"></textarea>

 A couple of notes: First, due to the max length of a Messenger message, it turns out you can really only get four characters in there, so I've limited the above demo to four characters in length. The script itself will do more. Second, it only supports letters, numbers, and space, and the following punctuation: `!@\#\$%\^&\*()`
 
 One other (sort of important) note: **The recipient's chat window needs to be opened wide enough to see the whole width of the message** or it may come in garbled because of line wrapping. Sorry, guys, there's no "nowrap" I can throw on this one.
 
Like it? Want it? Get it.
 
Get it: **[emotifier.js](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!45409&authkey=!AK1EZrbgxIjDluQ&ithint=file%2cjs)**
