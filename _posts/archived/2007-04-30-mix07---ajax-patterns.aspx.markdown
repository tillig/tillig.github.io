---
layout: post
title: "MIX07 - AJAX Patterns"
date: 2007-04-30 -0800
comments: true
disqus_identifier: 1192
tags: [GeekSpeak]
---
The session on AJAX patterns was very cool. In one demo application (a
photo album application), six specific patterns were addressed and a
little on how to solve it was also shown.
 
 **Pattern - Script to Enable Interactivity**
 Sort of a no-brainer, but using script to enable interactive elements
is sort of the basis of a rich application. In this particular pattern,
it was more about making it easy to script what you're looking to do.
[ASP.NET AJAX](http://ajax.asp.net/) offers a lot of shortcuts to help
you do that scripting.
 
 This pattern also addressed the notion of separating script from
behavior. ASP.NET AJAX introduces the notion of "extender controls" that
allow you to use server controls to modify the behavior of controls in
the page. An example was shown where some existing markup got modified
by adding an extender - a server control registering script to modify
HTML on the client side. It's a great way to do the separation.
 
 **Pattern - Logical Navigation**
 AJAX applications have typically lost the ability to use the
back/forward buttons and the ability to bookmark a page. [ASP.NET
Futures](http://ajax.asp.net/downloads/default.aspx) contains a
"History" control that allows you to enable your AJAX elements to
support state, sort of like ViewState, but on the URL. Modifying the
page contents modifies the browser URL and, thus, enables logical
navigation and bookmarking. As long as your scripts store enough history
state to be able to recreate a logical view, this looks like a great way
to overcome some shortcomings in AJAX.
 
 **Pattern - Update Indicators**
 Notifying a user of what changed when an AJAX request finishes is
helpful so they can see the results of an action. The UpdateAnimation
control in ASP.NET AJAX is one way to do that - it performs AJAX updates
in an animated fashion so movement is the key for the user. There is a
prototype UpdateIndicator control that scrolls the page to the location
of the change and does a highlight animation on the change; this isn't
in ASP.NET AJAX now but will hopefully be in the future.
 
 **Pattern - Smart Data Access**
 Possibly a poorly-named pattern, but the idea is that you should use
HTML properly such that external services like search engine crawlers or
programmatic site map generators can correctly access/index the content
you post. Use tags in the correct semantic sense (e.g., if it's not a
header, don't put it in \<h1 /\> tags). Also, keep in mind the way you
display pages in non-scripted environments, such as in a search engine
crawler or when the user has script disabled. Your content should look
good either way.
 
 **Pattern - Mashups (Using External Services)**
 There's a lot of data out there, and a lot of services providing added
value. Make use of them where you can. The example shown was a call to
Flickr to get images and data.
 
 What was interesting about the discussion of this pattern was less the
"what" than the "how." Browsers don't allow cross-site scripting, so you
have one of two options to get third-party data into your application.
 
 You can use a server-side proxy where you create a proxy on your site
that requests the third-party data. Your application then talks to your
proxy to get the data. This is a good general-purpose solution and
allows you to take advantage of things like caching calls on your site
and gives you the ability to manipulate the data before passing it to
the client (possibly optimizing it). The downside is that it does use up
your server's bandwidth.
 
 The other option is JSONP, which is a way you can add a script
reference to your page that requests data in JSON format from a
third-party service and when that data gets returned, it gets passed to
a callback that you specify. ASP.NET AJAX supports this by allowing you
to specify your own executor in an AJAX call, so the result of the call
gets passed to your callback.
 
 **More Resources**
 [ASP.NET AJAX](http://ajax.asp.net/)
 [AJAX Patterns](http://www.ajaxpatterns.org)
 [Yahoo! Design Pattern Library](http://developer.yahoo.com/ypatterns/)
