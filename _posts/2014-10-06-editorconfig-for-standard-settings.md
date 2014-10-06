---
layout: post
title: "EditorConfig: Your Key to Standard Editor Settings"
date: 2014-10-06 -0800
comments: true
tags: [vs,sublime]
---
As developers, we've all argued over [tabs vs. spaces](http://blog.codinghorror.com/death-to-the-space-infidels/), indentation size, [how line endings should be](https://help.github.com/articles/dealing-with-line-endings/), and so on.

And, of course, each project you work on has different standards for these things. Because *why not*.

What really kills me about these different settings, and what probably kills you, is *remembering to reconfigure all your editors* to match the project settings. Then when you switch, reconfigure again.

**The [open source project EditorConfig](http://editorconfig.org/) aims to rescue you from this nightmare.** Simply place an `.editorconfig` file in your project and your editor can pick up the settings from there. Move to the next project (which also uses `.editorconfig`) and *everything dynamically updates*.

**I don't know why this isn't the most popular Visual Studio add-in ever.**

Here's the deal:

* Put an `.editorconfig` file at the root of your project.
* Read up [on EditorConfig.org](http://editorconfig.org/) all of the options you can use in there. It's pretty flexible and you can override settings at various levels in the project.
* [Install a plugin for each of your editors](http://editorconfig.org/#download). They support [Visual Studio](https://github.com/editorconfig/editorconfig-visualstudio#readme), [Sublime Text](https://github.com/sindresorhus/editorconfig-sublime#readme), and several other popular editors.
* ...
* *Profit!*

Here's the `.editorconfig` I use. I like tab indentation except in view markup. We're a Windows shop, so lines end in CRLF. I hate trailing whitespace. I also like to keep the default settings for some project/VS files.

```
root = true

[*]
end_of_line = CRLF
indent_style = tab
trim_trailing_whitespace = true

[*.ascx]
indent_style = space
indent_size = 4

[*.aspx]
indent_style = space
indent_size = 4

[*.config]
indent_style = space
indent_size = 4

[*.cshtml]
indent_style = space
indent_size = 4

[*.csproj]
indent_style = space
indent_size = 2

[*.html]
indent_style = space
indent_size = 4

[*.resx]
indent_style = space
indent_size = 2

[*.wxi]
indent_style = space
indent_size = 4

[*.wxl]
indent_style = space
indent_size = 4

[*.wxs]
indent_style = space
indent_size = 4
```

Note there's a recent update to the EditorConfig format that supports multiple matching, like:

```
[{*.wxl,*.wxs}]
indent_style = space
indent_size = 4
```

...but there's [a bug in the Sublime Text plugin around this](https://github.com/sindresorhus/editorconfig-sublime/issues/39) so I've expanded those for now to maintain maximum compatibility.

I've added one of these to [Autofac](https://github.com/autofac/Autofac) to help our contributors and us. It makes it really easy to switch from my (preferred) tab settings to use the spaces Autofac likes. No more debate, no more forgetting.

**Now, get out there and standardize your editor settings!**