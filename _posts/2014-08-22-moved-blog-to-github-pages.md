---
layout: post
title: "Moved Blog to GitHub Pages"
date: 2014-08-22 -0800
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
- **Browser editor.** Create a new post right in the GitHub web interface. Nice and easy.

## Less Awesome Stuff About GitHub Pages

- **There's no server-side processing even if you need it.** Ideally I'd want a 404 handler that can issue a 302 from the server-side to help people get to broken permalinks. But the 404 is just HTML generated with Jekyll, so you have to rely on JS to do the redirect. Not so awesome for search engines. I have some [really old] blog entries that were on a PHP system where the permalink is querystring-based, so I can't even use [jekyll-redirect-from](https://github.com/jekyll/jekyll-redirect-from) to fix it.
- **The Jekyll plugins are limited.** GitHub Pages [has very few plugins for Jekyll that it supports](https://pages.github.com/versions/). On something like [OctoPress](http://octopress.org/) you hook up the page generation yourself so you can have whatever plugins you want... but you can't add plugins to GitHub Pages, so the things you can do are kind of limited. (I totally understand *why* this is the case, doesn't make it *awesome*.)
- **No post templates, painful preview.** With Windows Live Writer or whatever, you didn't have to deal with [YAML front matter](http://jekyllrb.com/docs/frontmatter/) or any of that. The GitHub web editor interface doesn't have an "add new post" template, so that's a bit rough. Also, to preview your post, you have to commit the post the first time, then you have the "preview" tab you can use to see "changes" in your post. It renders Markdown nicely, but it's sort of convoluted.
- **Drafts are weird.** I may be doing this wrong, but [it looks like you have to put "posts in progress"](http://jekyllrb.com/docs/drafts/) into a `_drafts` folder in your blog until it's ready to go, at which point you move it to `_posts`.
- **Comments don't exist.** It's not a blog host, really, so you need to use a system like [Disqus](https://www.disqus.com/) for your comments. That's not necessarily a *bad* thing, but it means you have some extra setup.

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

There's a lot to set up here, from folder structure to configuration, so the easiest way to start is to copy from someone else's blog. This is basically what I did - I grabbed Haack's blog, put that into my local repo, and got it running. Then I started changing the values in `_config.yml` to match my blog settings and fixed up the various template pieces in the `_includes` and `_layouts` folders. [You can start with my blog if you like.](https://github.com/tillig/tillig.github.io)

> GOTCHA: GitHub uses pygments.rb for code syntax highlighting. If you're developing on Windows, there's something about pygments.rb that Windows hates. Or vice versa. Point being, for local dev on Windows, you will need to **turn off syntax highlighting during local Windows dev** by setting `highlighter: null` in your `_config.yml`.

### Add Search

I didn't see any GitHub Pages blogs that had search on them, so I had to figure that one out myself. Luckily, [Google Custom Search](https://www.google.com/cse/) makes it pretty easy to get this going. Create a new "custom search engine" and set it up to search just your site. You can configure the look and feel of the search box and results page right there and it'll give you the script to include in your site. Boom. Done.

### Fix Up RSS

The Octopress-based RSS feed uses a custom plugin `expand_urls` to convert relative URLs like `/about.html` into absolute URLs like `http://yoursite.com/about.html` That no worky in GitHub Pages, so you have to use a manual `replace` filter on URLs in the RSS feed. (If you look at [my `atom.xml` file](https://github.com/tillig/tillig.github.io/blob/master/atom.xml) you can see this in action.)

### Make Last Minute Fixes to Existing Content

I found that it was easier to do any last-minute fixes in my existing blog content rather than doing it post-export. For example, I was hosting my images in ImageShack for a long time, but the reliability of ImageShack (even with a *paid account*) is *total crap*. I lost so many images... argh. So I went through a process of moving all of my images to OneDrive and it was easier to do that in my original blog so I could make sure the links were properly updated.

If you have anything like that, do it before export.

### Export Your Content and Comments

This was the trickiest part, at least for me.

Haack was running on his own server and had direct database access to his content so a little SQL and he was done. I was on a shared server without any real SQL Management Console access or remote access to run SQL against my database, so I had to adjust my export mechanism to be more of a two-phase thing: Get the data out of my database using an `.aspx` page that executed in the context of the blog, then take the exported content and transform that into blog posts.

There also wasn't anything in Haack's setup to handle the comment export for use in Disqus, so I had to do that, too.

Oh, and Haack was on some newer/custom version of Subtext where the database schema was different from mine, so I had to fix that to work with Subtext 2.5.2.0.

**[Here's my forked version of Haack's subtext-jekyll-exporter](https://github.com/tillig/subtext-jekyll-exporter)** that you can use for exporting your content and comments. You can also fork it as a starter for your own export process.

- Drop the `JekyllExport.aspx` and `DisqusCommentExport.aspx` files into your Subtext blog.
- Save the output of each as an XML file.
- Make your URLs relative. I have a little section on this just below, but it's way easier to deal with local blog development if your URLs don't have the protocol or host info in them for internal links. It's easier to do this in the exported content before running the exporter to process into Markdown.
- Run the `SubtextJekyllExporter.exe` on the XML from `JekyllExport.aspx` to convert it into Markdown. These will be the Markdown pages that go in the `_posts/archived` folder and they'll have Disqus identifiers ready to go to tie existing comments to the articles.
- In Disqus, import a "general" WXR file and use the XML from `DisqusCommentExport.aspx` as the WXR file. It may take a while to import, so give it some time.

You can test this out locally when it's done. Using Jekyll to host your site locally, check out your comment section on one of the posts in your site with comments. They should show up.

### Make URLs Relative

It is way easier to test your blog locally if the links work. That means if you have absolute links like `http://yoursite.com/link/target.html` they're going to only work if the link is truly live. If, however, you have `/link/target.html` then it'll work on your local test machine, it'll work from `yourusername.github.io`, and it'll work from your final blog site.

I did a crude replacement on my blog entries that seemed to work pretty well.

Replace `="http://www.mysite.com/"` with `="/"` and that seemed to be enough (using my domain name in there, of course). YMMV on that one.

### Push It

Once everything looks good locally, push it to your public repo. (If you're on Windows, don't forget to comment out that `highlighter: null` in `_config.yml`.) Give it a few minutes and you should be able to see your blog at `http://yourusername.github.io` - navigate around and do any further fix-up.

### Configure DNS

This was a finicky thing for me. I don't mess with DNS much so it took me a bit to get this just right.

My blog is at `www.paraesthesia.com` (I like the `www` part, some folks don't). [GitHub has some good info about setting up your custom domain](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages) but it was still a little bit confusing and "spread out" for me.

For the `www` case, like mine:

- **Add a CNAME file to the root of your blog repo.** It should contain one line: `www.yourdomain.com`
- **In your DNS provider, set an A record for your main domain.** That is, for `@` and `*` on your domain, set `A` records [as outlined on the GitHub A record tips page](https://help.github.com/articles/tips-for-configuring-an-a-record-with-your-dns-provider).
- **In your DNS provider, set a CNAME record for your www subdomain.** For `www`, set a `CNAME` pointed to `yourusername.github.io` [as outlined on the GitHub CNAME record tips page](https://help.github.com/articles/tips-for-configuring-a-cname-record-with-your-dns-provider)

What got me/wasn't clear was that for the `www` special case, you have to do *both* the `A` and `CNAME` records.

Once you do that, `yourdomain.com` and `www.yourdomain.com` will both make it to your blog. (If you don't like the `www` part, make your CNAME file in your repo only contain `yourdomain.com` instead of `www.yourdomain.com`.)

## Remaining Items

I still have a few things to fix up, but for the most part I'm moved over.

There are still some quirky CSS things I need to fix that I'm not happy with. Looking at the headers in this entry, for example, they have some crazy overlapping with the first line under them.

I have some in-page JS demos that were sort of challenging to set up in Subtext but should be easier in the new setup. I need to move those over; right now they're broken.

I also have the "Command Prompt Here Generator" app that was running on my blog site but is now inaccessible because I have to get it going on a site with dynamic abilities. I'll probably use my old blog host site as an "app host" now where I just put little dynamic apps. It'll be easier to do that stuff without Subtext right in the root of the site.

I'll get there, but for now... I'm feeling pretty good.
