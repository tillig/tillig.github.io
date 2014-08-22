---
layout: post
title: "Convert a Relative Path to Absolute Path with jQuery and ASP.NET AJAX"
date: 2009-10-02 -0800
comments: true
disqus_identifier: 1571
tags: [Web Development,Code Snippets]
---
I was messing around with relative paths to files (e.g.,
"../images/error.gif") and needed to convert them to absolute paths
(e.g., "http://server/images/error.gif") on the client but couldn't
figure out how. Then I saw [this nifty trick to HTML encode things using
jQuery](http://debuggable.com/posts/encode-html-entities-with-jquery:480f4dd6-13cc-4ce9-8071-4710cbdd56cb)
and it gave me an idea.

    String.toAbsolutePath = function(relativePath) {
      /// <summary>
      /// Converts a relative file path into an absolute file path.
      /// </summary>
      /// <param name="relativePath" type="String">
      /// The string with the relative path, like "../foo/bar.gif"
      /// </param>
      /// <returns type="String" />
      var path = $("<div style=\"background-image:url('" + relativePath + "');\"></div>").css("background-image");
      if (path.startsWith("url(")) {
        path = path.substring(4);
      }
      if (path.endsWith(")")) {
        path = path.substring(0, path.length - 1);
      }
      if (path.startsWith("\"")) {
        path = path.substring(1, path.length);
      }
      if (path.endsWith("\"")) {
        path = path.substring(0, path.length - 1);
      }
      return path;
    }

Basically, I'm using the CSS style "background-image" and feeding in the
relative path, then resolving it immediately. Turns out the browser
converts that to an absolute path for you. At least, Firefox 3.5.3 and
IE 7 do, which is what I was testing with at the time.

The path.startsWith and path.endsWith checks are because sometimes the
URL comes back like: 
url("http://server/images/error.gif") 
...with the url("") wrapper, and sometimes it comes back like: 
http://server/images/error.gif 
...without the wrapper at all.

Note the String.startsWith and String.endsWith methods come from ASP.NET
AJAX so if you wanted to do it in just jQuery, you'd have to regex your
way out of it or do a little more brute force work.

Of course, in the end, I figured out a different way to do what I was
doing so I didn't actually need to convert the path at all, but I
thought this was sort of neat so I'd post it for folks. I didn't really
test it in a bunch of browsers or anything, so YMMV. ["Works on My
Machine."](http://www.codinghorror.com/blog/archives/000818.html)

