---
layout: post
title: "How Do You Test Thread Safety?"
date: 2007-08-30 -0800
comments: true
disqus_identifier: 1260
tags: [GeekSpeak,dotnet]
---
I'm all about testing.  I do my best to adhere to test-driven
development (though, admittedly, sometimes that's hard when you're doing
some experimental work just to see if something's possible).  I even go
as far as [mocking full page request lifecycles to test controls and
page
behavior](http://paraesthesia.com/archive/2007/08/02/mock-a-page-request-lifecycle-with-typemock.aspx).

But say you have a little code block like this:

    if(!initialized)
    {
      lock(syncroot)
      {
        if(!initialized)
        {
          Initialize();
        }
      }
    }

Standard lock/double-check stuff to ensure things only get initialized
once.  Does anyone have a good way to test that?  A quick search of the
net turns up... well, pretty much nothing.
