---
layout: post
title: "Sort JSON in Sublime Text (User Package)"
date: 2016-06-08 -0800
comments: true
tags: [json,sublime]
description: "You might have JSBeautify running in Sublime, but can you sort your JSON objects? Now you can."
---
I wanted to be able to not only _tidy_ my JSON objects, but also _sort by property_. I wanted to do this so I could unify my `project.json` and `config.json` files while working in .NET Core. Figuring out where people were adding keys, finding redundant things added to files, and so on... having a predictable order makes it all that much easier.

Up front, I'll tell you **this is a total hack.** I got it to work as a user package (code in your `User` folder) but haven't taken it as far as putting it into a repo or adding it to [Package Control](https://packagecontrol.io/). That's probably the next step. I just wanted to get this out there.

I'll also say **this is instructions for a Windows environment**. The places you'll have to adjust for Linux should be obvious, but I don't have guidance or instructions to help you. Sorry.

First, **install the `External Command` package.** This is a great general-purpose package for setting up external commands and pushing Sublime Text buffers through. Select some text and have that text passed to an external shell command on `stdin`. (No selection? It runs the whole file.)

Next, **create a folder called `SortJson` in your `User` package folder.** This is where we'll put the contents of the user module.

**If you don't have Node installed**... why not? Really, though, if you don't, [go get it and install it](https://nodejs.org/). We need it because we use the Node `json-stable-stringify` package to do the work.

**Drop to a command prompt in the `SortJson` folder** and install the `json-stable-stringify` module.

```
npm install json-stable-stringify
```

You should get a `node_modules` folder under that `SortJson` folder and inside you'll have `json-stable-stringify` (and maybe dependencies, but that's fine).

Now we need a little script to take the contents of `stdin` and pass it through `json-stable-stringify`.

**Create a script called `sort-json.js` in the `SortJson` folder.** In that script, put this:

```js
var stringify = require('json-stable-stringify');
var opts = {
    "space": 2
};

var stdin = process.stdin,
    stdout = process.stdout,
    inputChunks = [];

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
    inputChunks.push(chunk);
});

stdin.on('end', function () {
    var inputJSON = inputChunks.join(""),
        parsedData = JSON.parse(inputJSON),
        outputJSON = stringify(parsedData, opts);
    stdout.write(outputJSON);
    stdout.write('\n');
});
```

Unfortunately, the External Command package doesn't let you set a working directory, so you can't just fire up Node and run the `sort-json.js` directly. We have to create a little batch file that helps our script find the `json-stable-stringify` module at runtime.

**Create a batch script called `sort-json.cmd` in the `SortJson` folder.** In that script, put this:

```bat
@SETLOCAL
@SET NODE_MODULES=%~dp0node_modules
@node "%~dp0sort-json.js" %*
```

That temporarily adds the `SortJson\node_modules` folder to the `NODE_MODULES` environment variable before running the `sort-json.js` script.

The last thing you need is a tie to the Sublime Text command palette so you can run the command to sort JSON.

**Create a file called `sort-json.sublime-commands` in the `SortJson` folder.** In that file, put this:

```js
[
    {
        "caption": "JSON: Sort Object",
        "command": "filter_through_command",
        "args": { "cmdline": "\"%APPDATA%\\Sublime Text 3\\Packages\\User\\SortJson\\sort-json.cmd\"" }
    }
]
```

You'll have to restart Sublime, but when you do you'll see a command in the palette "JSON: Sort Object". Load up a file with a JSON object and run that command. You should get a sorted JSON object.

I try to pair this with the `JsFormat` package (for JSBeautify integration) as well as `SublimeLinter-json` (for linting/error checking), both of which are in Package Control. If you want to tweak the formatting that comes out of the sort directly, the `opts` variable you see at the top of `sort-json.js` are the options [used by `json-stable-stringify`](https://github.com/substack/json-stable-stringify).