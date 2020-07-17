---
layout: post
title: "How to Set Up JSHint in Sublime Text 2 Using SublimeLinter"
date: 2013-02-12 -0800
comments: true
disqus_identifier: 1810
tags: [javascript,sublime]
---
I've got Sublime Text 2 and I love it. (I even have a package I wrote myself for it.)

I wanted to get JSHint going in it and I saw that there was [a nice JSHint package](https://github.com/uipoet/sublime-jshint)... but then [I found SublimeLinter](https://github.com/SublimeLinter/SublimeLinter), which seems to be the *King of Sublime Text Linting Packages*. It basically can run any lint for any program type and gives a nice inline highlighting for errors. Very cool, very flexible.

And very hard to figure out all the steps needed to get JSHint up and running properly on a clean system. So here's what you do:

1.  If you don't already have it,****[**install node.js**](http://nodejs.org/)**.** JSHint comes packaged with SublimeLinter and uses node.js to run it.
2.  If you haven't already done it,****[**install Package Control for Sublime Text**](http://wbond.net/sublime_packages/package_control). Restart Sublime Text after you do that.
3.  Open the Sublime Text command palette (Tools –> Command Palette) and type "Install Package" in the palette to get the Package Control install dialog.
4.  Type "SublimeLinter" in the package list to find the SublimeLinter package.**Install that**.
5.  **Restart Sublime Text**. This isn't always strictly necessary, but sometimes (like when installing node.js) stuff in the environment changes and you need Sublime Text to refresh that.
6.  Optional: Set your JSHint user options by going to Preferences –> Package Settings –> SublimeLinter –> Settings - User. It's a blank file, so you may want to look at the default settings to get a copy/paste start.

Now when you open a JavaScript file, you'll see highlighting on lines with problems. JSHint runs in the background and updates the highlighting with problem lines. To figure out the problem, put your cursor on the line and look in the status bar at the bottom of Sublime Text.

![Sublime Linter]({{ site.url }}/images/20130212_sublimelinter.png)

For JSHint options, I'm using [the same ones as jQuery](http://https://github.com/jquery/jquery/blob/master/src/.jshintrc). My user SublimeLinter.sublime-settings is below.

```js
    {
        "jshint_options":
        {
            "curly": true,
            "expr": true,
            "newcap": false,
            "quotmark": "double",
            "regexdash": true,
            "trailing": true,
            "undef": true,
            "unused": true,
            "maxerr": 100,

            "eqnull": true,
            "evil": true,
            "sub": true,

            "browser": true,
            "wsh": true,

            "predef": [
                "define",
                "jQuery"
            ]
        }
    }
```
