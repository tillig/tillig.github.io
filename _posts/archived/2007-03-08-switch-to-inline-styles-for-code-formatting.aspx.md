---
layout: post
title: "Switch to Inline Styles for Code Formatting"
date: 2007-03-08 -0800
comments: true
disqus_identifier: 1161
tags: [blog]
---
Every once in a while I'll be reading a blog entry and I'll come across
a place where someone has inserted a block of code. On the blog site, it
looks like this:

 ![Formatted code on a web
site.]({{ site.url }}/images/20070308site.png)

 But in the RSS reader, it looks like this:

 ![Formatting displayed incorrectly for code in an RSS
feed.]({{ site.url }}/images/20070308rss.png)

 Not so great. I mean, the code is reasonably legible, but the style
sheet renders literally in the reader. I shouldn't see that CSS - it
should be formatting the code, not appearing in the view window.

 I also see RSS feeds that do display a nicely formatted block of code:

 ![Code displaying correctly in
RSS.]({{ site.url }}/images/20070308correctformat.png)

 At first I thought it was a bug in my reader, so I tried some other
readers and got the same result.

 So what's the difference?

 The one that appears with the styles displayed literally in the feed
uses an inline style sheet to do the formatting. Something like this:

```html
    <pre class="csharpcode">
    <span class="kwrd">virtual</span> BOOL Paint(<span class="kwrd">int</span> button) = 0;
    </pre>
    <style type="text/css">
    .csharpcode, .csharpcode pre
    {
    font-size: small;
    color: black;
    font-family: consolas, "Courier New", courier, monospace;
    background-color: #ffffff;
    }
    .csharpcode .kwrd { color: #0000ff; }
    </style>
```

 While that sort of thing works well on a web site, it turns out that
[most RSS readers today don't support inline style
sheets](http://itmanagement.earthweb.com/columns/executive_tech/article.php/3617901).

 The ones that look correct on the web site and in RSS use code like
this:

```html
    <pre style="background-color:#FFFFB9;;overflow: auto;"><div><span style="color: #000000; ">@Test
    </span><span style="color: #0000FF; ">public</span><span style="color: #000000; "> </span><span style="color: #0000FF; ">void</span><span style="color: #000000; "> emptyTest() {
     assertTrue(foo);
    }</span></div></pre>
```

 Notice how the styles applied are actually inline on the tags, not
styles from a style sheet. This sort of local style application is
fairly widely supported in RSS readers. The drawback to this sort of
style application is that not only is the HTML huge and horrible
(usually it's generated, and we all know how bad generated HTML gets),
but if you want to change the look of the code on your site or in your
RSS feed, there's no simple way to do it.

 Two recommendations for folks posting inline code snippets who want
formatting and a good looking RSS feed:

 If you're going with a style sheet and not inline styles, move the
style sheet to somewhere outside the actual entry being syndicated.
Include it with a
`<link rel="stylesheet" type="text/css" href="http://url/to/your.css" />`
line in the `<head />` section of your site. By pulling it out of the
entry proper, folks visiting your site will see the nice formatting, and
at the very least the syndicated version will be legible and won't
include a bunch of clutter. On the other hand, it won't look as pretty
in RSS as it does on your site.

 If you want people to see nicely formatted code on your site and in
RSS, you'll need to switch to the inline styles applied directly to
tags. The [Actipro CodeHighlighter control for
ASP.NET](http://www.codehighlighter.com/) does this (and there's [a
Windows Live Writer plugin that uses
it](http://dunnhq.com/codeformatterforwindowslivewriter), so you don't
have to set it up on your site if you want to post through Windows Live
Writer instead). [The GeSHi (Generic Syntax Highlighter)
project](http://qbnz.com/highlighter/) is a good PHP highlighter that
can do either inline styles or use a style sheet. Check into a solution
for your chosen platform that will let you apply the styles inline
directly to tags.
