---
layout: post
title: "AJAX Not So Cool With External Data"
date: 2006-06-08 -0800
comments: true
disqus_identifier: 1015
tags: [GeekSpeak]
---
In my [feverish realization
yesterday](/archive/2006/06/07/contact-information-foaf-microformats-and-microtemplates.aspx)
of how much interesting technology is coming out of seemingly nowhere,
and in my desire to integrate [FOAF](http://www.foaf-project.org/),
[hCard](http://microformats.org/wiki/hcard), and every other
up-and-coming data format into [my ContactCard
script](/archive/2006/06/06/contactcard-dhtml-contact-information.aspx),
there's something I totally spaced out on.

 Cross-site scripting.

 There is no way I can tell the ContactCard to get all the contact
information from all these external sites because that's cross-site
scripting and the browser's not going to allow it (or the user's going
to have to click a little dialog to OK the transaction).

 Which brings me to another realization: AJAX is neat, but it's not so
cool if you want to do anything with data gathered elsewhere.

 It puts a pretty severe limit on what you can push into the client and
what you can't. There seems to be this huge push to get things back in
the client (the classic "centralize/decentralize" seesaw), but we've got
this [justifiable] security barrier that's stopping truly rich
client-side web-based applications from working.

 It's so limiting. There are a lot cool services available out there -
[Amazon](http://aws.amazon.com),
[Google](http://code.google.com/apis.html), etc. - and I have to proxy
the web service calls. Which means I can't just stick the script on my
site and call 'er good.

 So what now? Do I need to set up a web request proxy? Is it worth the
bother?

 Think about *this* - I can include script from other servers
dynamically (through \<script /\> tags), I just can't make separate
requests for it. What if people stopped coming up with XML description
formats and microformats and all of these other ways that I can't access
the data from the client and instead came up with data formats in
[JSON](http://json.org/)? (Yeah, I'm throwing away security on that one,
but let's ditch the practicality for just a second and think outside the
box. You can shoot me down later.)

 What about having a public, trusted service that provides
known-object-to-JSON conversion? Something that knows how to proxy
requests for certain known resource types and return the results in a
JavaScript-interpretable format? If you did it right, you could ensure
that the JSON object had any offensive script filtered out so you'd be
reasonably safe.

 How about this - let XMLHttpRequest make external requests for data but
build into the JavaScript interpreter some way to flag the contents of
the response so a person can't just "eval" it because it's not marked
safe. If you really want to evaluate the response as script, you'd have
to somehow copy the data to another variable or perform some other overt
action, at which point it's your own fault for being insecure.

 Maybe you could be allowed to make requests to external sources, but
only ones that return a valid XML document. Limiting, but not quite as
limiting as what we've got today.

 Or is AJAX just overrated? By the time I get my safe JSON object proxy,
will we be back to storing everything on the server because the client
is too bloated?
