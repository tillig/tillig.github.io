---
layout: post
title: "XML Tidy in Sublime Text"
date: 2015-03-12 -0800
comments: true
tags: [sublime,xml,gists]
---
I already have my [build scripts tidy up my XML configuration files](/archive/2012/06/22/format-configuration-files-on-build.aspx/) but sometimes I'm working on something outside the build and need to tidy up my XML.

There are a bunch of packages that have HTML linting and tidy, but there isn't really a great XML tidy package... and it turns out you don't really need one.

1. [Get a copy of Tidy](http://tidy.sourceforge.net/#binaries) and make sure it's in your path.
2. Install [the Sublime package "External Command"](https://packagecontrol.io/packages/External%20Command) so you can pipe text in the editor through external commands.
3. In Sublime, go to `Preferences -> Browse Packages...` and open the "User" folder.
4. Create a new file in there called `ExternalCommand.sublime-commands`. (The name isn't actually important as long as it ends in `.sublime-commands` but I find it's easier to remember what the file is for with this name.)

Add the following to the `ExternalCommand.sublime-commands` file:

``` json
[
    {
        "caption": "XML: Tidy",
        "command": "filter_through_command",
        "args": { "cmdline": "tidy --input-xml yes --output-xml yes --preserve-entities yes --indent yes --indent-spaces 4 --input-encoding utf8 --indent-attributes yes --wrap 0 --newline lf" }
    }
]
```

Sublime should immediately pick this up, but sometimes it requires a restart.

Now when you're working in XML and want to tidy it up, go to the command palette (`Ctrl+Shift+P`) and run the `XML: Tidy` command. It'll be all nicely cleaned up!

The options I put here [match the ones I use in my build scripts.](/archive/2012/06/22/format-configuration-files-on-build.aspx/). If you want to customize how the XML looks, you can change up the command line in the `ExternalCommand.sublime-commands` file using [the options available to Tidy](http://tidy.sourceforge.net/docs/quickref.html).