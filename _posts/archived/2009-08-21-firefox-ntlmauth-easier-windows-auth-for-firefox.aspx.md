---
layout: post
title: "Firefox NTLMAuth - Easier Windows Auth for Firefox"
date: 2009-08-21 -0800
comments: true
disqus_identifier: 1560
tags: [downloads,javascript]
---
Most people don't realize it, but Firefox will do NTLM (Windows
pass-through) authentication just like Internet Explorer. Some people
solve the issue by going around Firefox and [hosting IE right in
Firefox](http://ietab.mozdev.org/). The other way to do it is to keep
Firefox as the rendering engine and tell Firefox it's OK to use Windows
credentials to authenticate with a given site.

The problem is that managing the list of sites you allow Firefox to
pass-through authenticate with is not straightforward and involves
[manually manipulating configuration
settings](http://kb.mozillazine.org/Network.automatic-ntlm-auth.trusted-uris).

This add-on makes it easier to manage this list, allowing you to stick
with Firefox but still use Windows pass-through authentication.

Right now it simply adds an item to your Tools menu that gives you a
first-class interface toward managing the list of sites. There are some
other things I'm thinking about doing, but you can check all that out
[on the project site](http://code.google.com/p/firefox-ntlmauth/). If
you want to try it out, you can [get it on the Mozilla
site](https://addons.mozilla.org/en-US/firefox/addon/13816).

![Edit dialog](http://firefox-ntlmauth.googlecode.com/svn/site/screenshots/edit-dialog.png)
