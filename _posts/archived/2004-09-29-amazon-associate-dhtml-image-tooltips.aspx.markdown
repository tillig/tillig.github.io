---
layout: post
title: "Amazon Associate DHTML Image Tooltips"
date: 2004-09-29 -0800
comments: true
disqus_identifier: 668
tags: [Software / Downloads,Release Notices]
---
I love the Amazon Associate program. I'm a member and I even *buy stuff
from myself* to get a kickback. It's also a good place to send people
when you want to show them books, music, movies, etc., that you're
talking about. Sort of like a database of "stuff."
 
 One of the beauties of the way Amazon set their stuff up is that
everything is standardized - link formats, image naming, etc.
Everything. Which means, of course, that people outside Amazon can
interface with their stuff pretty easily. Good for them, good for us.
 
 I integrated Associate links into my blogging program (pMachine) so I
only have to enter the ASIN for an item and it builds the link for me. I
wanted to take that one step further, though, so I present to you:
**Amazon Affiliate DHTML Image Tooltips!**
 
 The idea is this: Hover your cursor over any Amazon Associate link to a
product and *get a picture of the item right there in the tooltip*. How
sweet is that?
 
 It doesn't even require any change to your page structure, which is
what I really dig. Just add a straight-up Amazon Associate link to your
page like you usually do:
 
`<a href="http://www.amazon.com/exec/obidos/ASIN/1234567890/myaffiliateid">A Cool Product</a>`
 
 Then add a reference to the script at the head of the page:
 
 `<script type="text/javascript" src="dhtmltooltip.js"></script>`
 
 The script will automatically rewrite all of the Amazon Associate links
in the page (that are in the correct format, as noted above) *on the fly
for you with the correct events and everything*.
 
 (It will also do text tooltips - it's a modification to the [Dynamic
Drive "Cool Tooltip"
script](http://www.dynamicdrive.com/dynamicindex5/dhtmltooltip.htm).)
 
 It all ends up looking like this:
 ![Screenshot of Amazon Associate DHTML
tooltip](https://hyqi8g.blu.livefilestore.com/y2pyuqdpMLOYPK_krB0hVpKuEIv6FOtCqH_oibu3sxInKcJ6f_N042dFdQmWL1ijdzjipOnBe7ovUxK9f0uWWDfXHH4RVnXQ5GR-IvehdhceHE/20040929tooltipsample.jpg?psid=1)
 
 The download includes:

-   dhtmltooltip.js - The actual script that performs the DHTML and link
    rewrites. Information on usage is included in the header of the
    script.
-   test.html - A test page illustrating the script usage (both Amazon
    Associate and text tooltips).


 
 Note: Since the original release of this DHTML tooltip script, Amazon
has released their own "link-enhancer" script that performs a similar
functionality but in a more robust fashion, adding product description
information and so forth to the tooltip. This DHTML tooltip script has
been updated to work in conjunction with that, not modifying links that
the Amazon script has already modified. As such, previous users of this
script can easily add the use of the Amazon script to their site without
worrying about clashing tooltips appearing. Amazon modified links appear
correctly; those not modified by Amazon or explicitly using this DHTML
tooltip script will continue to function as usual.
 
 I've tested it in IE 6.0 and Firefox 1.0, which I think covers most of
the people who show up to my site. I'm sure it'll work with most any
up-level browser, though if someone finds it doesn't work on a
particular browser, *tell me how to fix it and I will*.
 
 Like it? Want it? Here you go!
 
 [**Download Amazon Associate DHTML Image Tooltips Script 2.1 (.zip
file)**](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!45405&authkey=!APe805TlxJsFAqI&ithint=file%2czip)
 
 **Version History:**
 **2.1:** Added support to allow co-existing with Amazon "link-enhancer"
script. The DHTMLToolTip will not be added to links that have been
"enhanced" by the Amazon script.
 **2.0:**
Converted to "object oriented" JavaScript to avoid name clashes.
Fixed minor bug with positioning in newer browsers.
Safely attaching to all events (thanks to Phil Haack for this).
Updated so script is placed in HEAD of document.
 **1.0:** First release.
