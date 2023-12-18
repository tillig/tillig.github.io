---
layout: post
title: "Clipboard Manager Software"
date: 2007-01-24 -0800
comments: true
disqus_identifier: 1132
tags: [personal,windows]
---
**UPDATE**: Based on comments from readers and trying a few suggestions
out, [I ended up going with
ClipX](/archive/2007/01/25/clipboard-follow-up-clipx.aspx), a free
product that does exactly what I'm looking for.

 Clipboard manager, clipboard organizer... whatever you call it, what I
went searching for yesterday was something that would help me with
multiple copy/paste selections so I could re-use earlier items I'd
copied. (In my case, I was doing several commits to source code
repositories - fixing the same thing in different versions of software,
so I wanted identical log messages but didn't want to keep all of them
in Notepad or whatever.)

 Office comes with a clipboard manager but it only works when an Office
program is running and, frankly, it's not my favorite. I can't put my
finger on why - all I know is I see that thing and I'm instantly
confused. Maybe I'm just uninitiated.

 **For the record, there is one feature missing from every single
clipboard manager I've tried**: I want to be able to select an item from
the list and automatically have that replace whatever is currently on
the clipboard. Every single one of these keeps track of what you put on
the clipboard, but if you want to put one of the saved clips into your
application, you have to double-click it and let the application do the
"paste" action for you. I don't want that. I want to be able to select
the clip, then go back to whatever application and hit Ctrl-V myself.
Trying to make sure the app the clipboard manager is going to do the
paste in is the correct app is cumbersome and almost more trouble than
it's worth.

 **If someone knows of a [preferably free] clipboard manager that allows
you to select an item and have it become active on the clipboard, let me
know.** If it's good enough, I'd even consider paying for it. That's how
much I want that feature.

 Oh, and several clipboard managers I came across use databases to store
their stuff. No thanks. I don't need another service running just to
help manage my clipboard. I want this thing to be lightweight and
self-contained.

 Anyway, when I went searching I found a few different products. Here's
what I came out with:

 ![LW-Works Clipboard
Recorder]({{ site.url }}/images/20070124lwworks.png)[**LW-Works
Clipboard Recorder**](http://www.lw-works.com/clipboard-recorder): This
is the one I'm currently using. There are two "views" for it - this
little floating window (pictured) and a larger window that allows you to
select one of the clips and preview it. It has support to preview
several data types on the clipboard and is fairly configurable. You can
set it up to show with a Windows hotkey, you can specify what sorts of
things you want to be able to keep on the clipboard list, you can allow
(or not) duplicate clippings from the same application... it's pretty
good. I like the detail with this one - two views, the primary view
being a super-compact window that conserves space but isn't so small
it's unusable; the fact it puts the icon of the application it grabbed
the clip from right next to the clip; the fact it minimizes instead of
closes if I hit the "X" button in the corner of the main window. If it
had the selected-item-in-list-is-active-on-clipboard feature, this would
be The One.

 There is a free version and a professional version. The free version
has anything you need for a general clipboard manager. The professional
version adds the ability to have multiple clipboard lists, save lists
for later retrieval, send clipboard items to another computer, and paste
multiple items at the same time to an application.

![Clipboard.NET]({{ site.url }}/images/20070124clipmon32.png)[**Clipboard.NET**](https://clipmon32.bountysource.com/):
This is an open source project that is fairly young but is shaping up to
have some nice features. The notion of having a plug-in framework for
the clipboard monitor is appealing to me, and this has that. Several of
the features ("Paste As HTML," "Google This," etc.) are implemented as
plugins, and that's cool. The UI could use a little help as it is fairly
large to have running all the time and has a lot of wasted space. There
are a lot of options that could be added as well. Unfortunately, I spoke
to the author and he doesn't have much time to dedicate to this lately,
so unless someone else steps up, we may not see this come to fruition.

![Ditto]({{ site.url }}/images/20070124ditto.png)[**Ditto**](http://ditto-cp.sourceforge.net/):
This is a pretty popular open source project that has a lot of features.
Too many features, in fact. So many, I almost can't even tell you what
the thing can do. I mean... well, let me show you, rather than tell
you:
 ![Ditto
Options]({{ site.url }}/images/20070124ditto_options.png)
 Notice how there are six tabs' worth of options? Each tab has the
bajillion options on it that you see here. The working of the
application is about this complex. Maybe it's just me - I bet this thing
would do all I need it to if I could only wade through all the options
and figure out how to get it to work.

 It feels like this started out cool but ended up with huge
feature-creep. Definitely by programmers for programmers. My mom would
never be able to figure this out. And, honestly, I'm not eager to
personally take something like this on.

 So there you have it. I haven't yet found "the perfect clipboard
manager." Like I said above, though - if someone has one that they think
can satisfy me, I'd love to hear about it. Leave me a comment with a
link so I can try it out. The key feature - in fact, it might have the
worst UI ever but this feature would make it worth it - is to select an
item and have that become the active clipboard item. None of these do
that.
