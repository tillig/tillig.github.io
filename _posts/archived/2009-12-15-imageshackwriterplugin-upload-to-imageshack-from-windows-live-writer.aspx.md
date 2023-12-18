---
layout: post
title: "ImageShackWriterPlugin - Upload to ImageShack from Windows Live Writer"
date: 2009-12-15 -0800
comments: true
disqus_identifier: 1597
tags: [downloads,dotnet,blog]
---
I have to admit - I'm a [Windows Live
Writer](http://windowslivewriter.spaces.live.com/) convert. I tried
earlier versions and wasn't impressed, but I'm all over it now.

I'm also an [ImageShack](http://www.imageshack.us/) user. I love their
free image hosting service for its ability to save me bandwidth on image
hosting. It makes a surprising difference. (I even use
[YFrog](http://www.yfrog.com/) on Twitter.)

The only real problem I ran into was that Windows Live Writer wants to
upload every image to your blog for hosting. I don't want that - I want
my images on ImageShack. That means leaving Windows Live Writer to
upload the image from some other uploader tool, getting the URL to the
image, and manually inserting it. Sort of a pain in the workflow, if you
know what I mean.

As an experiment to see how different applications enable extensibility
through plugins, and to ease a problem I was seeing, I wrote a Windows
Live Writer plugin that uploads images to ImageShack directly. No more
having to leave Windows Live Writer.

Simply drop the plugin DLL in the Windows Live Writer plugins folder,
paste your ImageShack registration key into the plugin options box, and
upload/insert images from the "Insert" menu in WLW:

![Insert ImageShack Upload menu
option](http://imageshackwriterplugin.googlecode.com/svn/site/screenshots/insert-menu.png "Insert ImageShack Upload menu option")

It was surprisingly easy to write, which was cool.

**It's free and open source.**[**Go pick it up on Google
Code**](http://code.google.com/p/imageshackwriterplugin/)**.**
