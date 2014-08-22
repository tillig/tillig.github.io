---
layout: post
title: "Junction Shell Extensions"
date: 2005-04-20 -0800
comments: true
disqus_identifier: 795
tags: [Software / Downloads,Release Notices]
---
**UPDATE:** [Hermann Schinagl has a Link Shell
Extension](http://schinagl.priv.at/nt/hardlinkshellext/hardlinkshellext.html)
that provides a lot of excellent functionality that incorporates my icon
overlay and property sheet, which basically obsoletes this package.
[Definitely check this
out](http://schinagl.priv.at/nt/hardlinkshellext/hardlinkshellext.html)
if you want a very robust shell integration for reparse points.
 
 That said, if all you need is an icon overlay and a property sheet for
junctions, read on...
 
 
 I use junction points (aka "reparse points") a lot in my daily tasks.
I'm originally a Unix guy; I love hard and symbolic links. Very cool,
very flexible. Windows offers a sort of hard link equivalent but doesn't
directly provide tools to manipulate them or otherwise deal with them.
Instead, you have to use tools like
[junction](http://www.sysinternals.com/ntw2k/source/misc.shtml#junction)
to create them.
 
 Even when you do create them, when you're browsing in the Windows
Explorer you'll never know they're reparse points because there's no
visual cue. The only way to see is if you drop to a command prompt and
run a directory:
 
 ![Command prompt illustrating
junctions](https://hyqi8g.dm2302.livefilestore.com/y2pRcBog0zOPHaCwSRAdsLTaRcnzyJad248xaXj8uhEfmyPHRdQZd7mlqv68CpiYFnLIE92HsseRVnU4B18_TDYHUQL2g-EHpik3sTCoNHZ__w/junctioniconoverlay_cmd.gif?psid=1)
 
 See the JUNCTION up there? That's the only indicator you have a reparse
point. And, of course, if you're not paying attention in Windows
Explorer and checking for that, you'll end up accidentally deleting
something you didn't want to delete.
 
 I decided I wanted a visual cue in Windows Explorer. Enter the Junction
Icon Overlay. You know how you see little icon overlays for things like
shortcuts (or, when using [TortoiseCVS](http://www.tortoisecvs.org/),
things under CVS control)? Wouldn't it be cool if you could see
something on junctions? Now you can:
 
 ![A Windows Explorer folder showing junctions with icon
overlays](https://hyqi8g.dm2302.livefilestore.com/y2pGGKJ6vqkFcyE4-HEYxHxmYDDrxFNzNtMylgvuEHK3xSxfOXsgYIuyXpJb2g9K2zHuVGzOl6LCkX_YMpWZdh-ca_CY3zfQXRGa72p6wnf7vQ/junctioniconoverlay_folder.gif?psid=1)
 
 The "source" folder is under CVS source control and I've got
TortoiseCVS, so you see a little green checkmark overlay. The "build"
folder is just a standard folder. The "tools" folder is a junction - see
the little "link" overlay?
 
 I also added a property sheet that shows up just for junctions so you
can easily see where your junction points to. Right-click the junction,
select "Properties," and find the "Junction" tab. You should see the
path the junction points to in the text box.
 
 ![Junction property
sheet](https://hyqi8g.dm2303.livefilestore.com/y2p0fyXrRGmCxuAjy6bktc29rCZNiRxBdMcJudBO_3_RKILRdXXv-77LEueb1anWnapsM0sTUod2TAjeyEIr3sZ5-5Le0qZ8BlCg_i68pS-reQ/junctionpropertysheet_props.gif?psid=1)
 
 You can get this as a setup (MSI) or you can have the source. It's
free, but use at your own risk and all that. I'm also not offering
support on this one, so if it doesn't work for you or trashes your
machine or gives you nightmares or something, I'm sorry - can't help
ya.
 
 One drawback: It seems you can only have one overlay on an icon at a
time. So if "tools" was both under CVS control AND a junction, you'd
only see the junction icon (I cranked the priority up on it because I'm
more concerned with junctions than CVS status).
 
 You will have to reboot after you install before the shell extensions
will show up.
 
 **[Download Junction Shell Extensions 1.1.0 (Setup -
MSI)](https://skydrive.live.com/redir?resid=C2CB832A5EC9B707%2138713)**
 **[Download Junction Shell Extensions 1.1.0 (Source -
ZIP)](https://skydrive.live.com/redir?resid=C2CB832A5EC9B707%2138714)**

 
 For more on how icon overlays work, check out [lallous's article on
CodeProject](http://www.codeproject.com/shell/overlayicon.asp) (which is
how I got this going). Also, a special thanks to Mike Nordell, whose
[CodeProject article on junction
points](http://www.codeproject.com/w2k/junctionpoints.asp) provided some
code that I modified and am using here, and to Michael Dunn, whose
[series on writing shell
extensions](http://www.codeproject.com/shell/shellextguide1.asp) was
absolutely invaluable.
 
 **Version History:**
 1.0.0: First release. Included only icon overlay.
 1.1.0: Renamed from "Junction Icon Overlay" to "Junction Shell
Extensions." Added property sheet for junctions.
