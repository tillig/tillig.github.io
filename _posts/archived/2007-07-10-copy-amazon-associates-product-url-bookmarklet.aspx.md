---
layout: post
title: "Copy Amazon Associates Product URL Bookmarklet"
date: 2007-07-10 -0800
comments: true
disqus_identifier: 1230
tags: [downloads,javascript]
---
I'm a member of the [Amazon Associates
program](http://associates.amazon.com) and when I put links to products
in my blog postings or in emails, I like to make sure they're referral
links.  On a web site, that also means you can take advantage of the
automatic popup link script they provide.

The problem is that you have to create links to particular products by
going to their site and doing a search or plugging in the ASIN number so
the URL can be generated.  But the URL has a pattern, so if you know the
pattern and have it handy you can pretty easily create the URL yourself.

To make this way easier, I created a little bookmarklet that lets you
navigate to a product page on Amazon and automatically copy the
affiliate URL for the item to your clipboard for use in email, blog
links, etc.

**NOTE:  The bookmarklet is for IE ONLY.** You can't easily copy data to
the Firefox clipboard so I have a different mechanism (slightly more
manual) for the FF users, below.

## Internet Explorer

### Installation for IE

1. Download the zip file and drop the .url file in it into your
    Favorites folder.
2. Open up the file in Notepad.  You'll find a really long line (line
    4) that starts out like this:
     `URL=javascript:aid='mhsvortex';if(!window...`
     Change the value of 'aid' to be your Amazon Associate ID.  (By
    default it's mine - mhsvortex.)
3. That's it - you're ready to go.

### Usage for IE

1. Navigate to a product page on Amazon that you want an Associate link
    to.
2. Select the bookmarklet from your Favorites list.  It will
    automatically parse the URL and create a product link using the
    product's ASIN and your Associate ID.  You will get an alert message
    telling you what link got copied to your clipboard.
3. Paste the URL wherever you want to use it.
4. If you try the bookmarklet on a non-product page or on a non-Amazon
    site, it'll prompt you for the ASIN of the product you want to link
    to.

[[Download 'Copy Amazon Product URL'
Bookmarklet]({{ site.url }}/downloads/CopyAmazonProductURL.zip)]

## Firefox

Sorry, FF users, but the security and pain around copying to the
clipboard means you have a slightly more manual process to endure.

### Installation for Firefox

1. **Right-click** this link and create a bookmark to it: [Build Amazon
    Product
    URL](javascript:aid='mhsvortex';ur=new%20RegExp('<sup>(https?:\/\/www\.amazon\.[</sup>\/]+)(.*\/([A-Z0-9]{10})\/)?.*$');ur.exec(location.href);svr=RegExp.$1;if(!svr){svr='http://www.amazon.com'}asin=RegExp.$3;if(!asin){asin=prompt('Enter%20the%20product%20ASIN%20number.');}if(!asin){void(null)}else{lnk='http://www.amazon.com/dp/'+asin+'?tag='+aid;alert('Amazon%20Associates%20Link:%20'+lnk);})
2. On the main toolbar, go to "Bookmarks" and find the bookmark you
    just created. Right-click it and select "Properties."
3. In the "Location" field, you'll see a big string that starts like
    this:
     `URL=javascript:aid='mhsvortex';ur=new...`
     Change the value of 'aid' to be your Amazon Associate ID.  (By
    default it's mine - mhsvortex.)
4. That's it - you're ready to go.

### Usage for Firefox

1. Navigate to a product page on Amazon that you want an Associate link
    to.
2. Select the bookmark from your Bookmarks list.  It will automatically
    parse the URL and create an alert that tells you what the URL is.
    Select this URL and copy it to your clipboard. (This is the manual
    part.)
3. Paste the URL wherever you want to use it.
4. If you try the bookmarklet on a non-product page or on a non-Amazon
    site, it'll prompt you for the ASIN of the product you want to link
    to.
