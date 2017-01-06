---
layout: post
title: "Sublime Text Template for GitHub Blog Posts"
date: 2014-09-03 -0800
comments: true
tags: [blog,sublime,gists]
---
Now that I've [moved to GitHub Pages for my blog]({% post_url 2014-08-22-moved-blog-to-github-pages %}) I find that I sometimes forget what all the YAML front matter should be for a blog entry so I end up copy/pasting.

To make the job easier, I've created a little snippet/template for [Sublime Text](http://www.sublimetext.com) for blog entries. Take this XML block and save it in your User package as `Empty GitHub Blog Post.sublime-snippet` and it'll be available when you switch syntax to Markdown:

``` xml
<snippet>
  <content><![CDATA[
---
layout: post
title: "$1"
date: ${2:2014}-${3:01}-${4:01} -0800
comments: true
tags: [$5]
---
$6
]]></content>
  <scope>text.html.markdown</scope>
</snippet>
```

I've added placeholders so you can tab your way through each of the front matter fields and finally end up at the body of your post.