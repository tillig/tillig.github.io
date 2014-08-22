---
layout: post
title: "Moved Blog to GitHub Pages"
# date: 2014-08-22 -0800
comments: true
tags: [blog,github]
---
Well, I finally did it.

[For quite some time I've been looking at migrating my blog away from Subtext.](/archive/2013/08/19/checking-in-checking-out.aspx) At first I wanted to go to WordPress, but then... evaluating all the options, the blog engines, etc., I started thinking "less is more." I originally started out using [Subtext](http://www.subtextproject.com/) because I thought I'd want to extend the blog to do a lot of cool things. It was a great .NET blog platform and I'm a .NET guy, it was perfect.

The problem was... *I didn't do any of that.*

I contributed as I could to the project, and there was a lot of great planning for the ever-impending "3.0" release, but... it just never came together. People got busy, stuff happened. Eventually, Subtext development pretty much stopped.

Part of my challenge with Subtext was the complexity of it. So many moving pieces. Database, assemblies, tons of pages and settings, skins, totally no documentation. (Well, there *was* some documentation that I had been writing but an unfortunate server crash lost it all.) I started looking at hosted solutions like WordPress that would be easy to use and pretty common. But, then, the challenge with any of those systems is getting your data in/out, etc. Plus, hosting costs.

So I started leaning toward a code generation sort of system. Fewer moving pieces, simpler data storage. Also, cheap. Because I'm cheap.

I decided on [GitHub Pages](https://pages.github.com/) because it's simple, free, reliable... plus, it's pretty well documented, Jekyll usage is simple, and Markdown is pretty sweet.

## Good Stuff About GitHub Pages

- **It's simple.** Push a new post in Markdown format to your blog repo and magic happens.
- **It's portable.** All the posts are in simple text, right in the repo, so if you need to move somewhere else, it's all right there. No database export, no huge format conversion craziness.
- **It's free.** Doesn't get cheaper than that.
- **It's reliable.** I'm not saying 100% uptime, but putting your blog in GitHub Pages means you have the whole GitHub team watching to see if the server is down.

## Less Awesome Stuff About GitHub Pages

- **There's no server-side processing even if you need it.** Ideally I'd want a 404 handler that can issue a 302 from the server-side to help people get to broken permalinks. But the 404 is just HTML generated with Jekyll, so you have to rely on JS to do the redirect. Not so awesome for search engines. I have some [really old] blog entries that were on a PHP system where the permalink is querystring-based, so I can't even use [jekyll-redirect-from](https://github.com/jekyll/jekyll-redirect-from) to fix it.
- **The Jekyll plugins are limited.** GitHub Pages [has very few plugins for Jekyll that it supports](https://pages.github.com/versions/). On something like [OctoPress](http://octopress.org/) you hook up the page generation yourself so you can have whatever plugins you want... but you can't add plugins to GitHub Pages, so the things you can do are kind of limited. (I totally understand *why* this is the case, doesn't make it *awesome*.)

## My Migration Process

A lot of folks who move their blog to GitHub Pages sort of "yadda yadda" away the details. "I exported my content, converted it, and imported it into GitHub Pages." That... doesn't help much. So I'll give you as much detail as I can.

### Standing on the Shoulders of Giants

Credit where credit is due:

[Phil Haack posted a great article](http://haacked.com/archive/2013/12/02/dr-jekyll-and-mr-haack/) about how he migrated from Subtext to GitHub Pages that was super helpful. He even [created a Subtext exporter](https://github.com/Haacked/subtext-jekyll-exporter) that was the starting point for my data export. I, uh, *liberated*, a lot of code from his blog around the skin, RSS feed, and so on to get this thing going.

[David Ebbo also moved to GitHub Pages and borrowed from Mr. Haack](http://blog.davidebbo.com/2014/01/moving-to-github-pages.html) but had some enhancements I liked, like using GitHub user pages for the repository and using "tags" instead of "categories." So I also borrowed some ideas and code from Mr. Ebbo.

If you don't follow these blogs, go subscribe. These are some smart guys.

### You Need to Know Jekyll and Liquid

You don't have to be an expert, but it is very, *very* helpful to know [Jekyll](http://jekyllrb.com/) (the HTML content generator) and [Liquid](http://docs.shopify.com/themes/liquid-documentation/basics) (the template engine) at least on a high-level basis. As you work through issues and fix styles or config items, this helps a lot to track things down. 

### Initialize the Repository

I'm using [GitHub user pages](https://help.github.com/articles/user-organization-and-project-pages) for my blog, so I created a repository called `tillig.github.io` to host my blog. For your blog, it'd be `yourusername.github.io`. The article on user pages is pretty good to get you going.

### Get the Infrastructure Right

Clone that repo to your local machine so you can do local dev/test to get things going. Note that if you check things in and push to the repo as you develop, you may get some emails about build failures, so local dev is good.

The [GitHub page on using Jekyll](https://help.github.com/articles/using-jekyll-with-pages) tells you about how to get your local dev environment set up to run Jekyll locally.

There's a lot to set up here, from folder structure to configuration, so the easiest way to start is to copy from someone else's blog. This is basically what I did - I grabbed Haack's blog, put that into my local repo, and got it running. Then I started changing the values in `_config.yml` to match my blog settings and fixed up the various template pieces in the `_includes` and `_layouts` folders.

> GOTCHA: GitHub uses pygments.rb for code syntax highlighting. If you're developing on Windows, there's something about pygments.rb that Windows hates. Or vice versa. Point being, for local dev on Windows, you will need to **turn off syntax highlighting during local Windows dev** by setting `highlighter: null` in your `_config.yml`.

### Add Search

I didn't see any GitHub Pages blogs that had search on them, so I had to figure that one out myself. Luckily, [Google Custom Search](https://www.google.com/cse/) makes it pretty easy to get this going. Create a new "custom search engine" and set it up to search just your site. You can configure the look and feel of the search box and results page right there and it'll give you the script to include in your site. Boom. Done.

### Fix Up RSS

The Octopress-based RSS feed uses a custom plugin `expand_urls` to convert relative URLs like `/about.html` into absolute URLs like `http://yoursite.com/about.html` That no worky in GitHub Pages, so you have to use a manual `replace` filter on URLs in the RSS feed. (If you look at [my `atom.xml` file](https://github.com/tillig/tillig.github.io/blob/master/atom.xml) you can see this in action.)
