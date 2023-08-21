---
layout: post
title: "JSON Sort CLI and Pre-Commit Hook"
date: 2023-08-21 -0800
comments: true
tags: [javascript,git]
description: "I made a command-line interface to json-stable-stringify that obeys .editorconfig and you can use it as a pre-commit hook."
---
I was recently introduced to [`pre-commit`](https://pre-commit.com/), and I really dig it. It's a great way to double-check basic linting and validity in things without having to run a full build/test cycle.

Something I commonly do is sort JSON files using `json-stable-stringify`. I even [wrote a VS Code extension to do just that.](https://github.com/tillig/vscode-json-stable-stringify) The problem with it being locked in the VS Code extension is that it's not something I can use to verify formatting or invoke outside of the editor, so I set out to fix that. The result: [`@tillig/json-sort-cli`](https://github.com/tillig/json-sort-cli).

This is a command-line wrapper around `json-stable-stringify` which adds a couple of features:

- It obeys `.editorconfig` - which is also something the VS Code plugin does.
- It can warn when something isn't formatted (the default behavior) or autofix it if you want.
- It supports JSON with comments (using `json5` for parsing) but it _will remove those comments on format_.

I put all of that together and included configuration for `pre-commit` so you can either run it manually via CLI or have it automatically run at pre-commit time.

I do realize there is already [a `pretty-format-json` hook](https://github.com/pre-commit/pre-commit-hooks/blob/main/pre_commit_hooks/pretty_format_json.py), but the above features I mentioned are differentiators. Why not just submit PRs to enhance the existing hook? The existing hook is in Python (not a language I'm super familiar with) and I really wanted - explicitly - the `json-stable-stringify` algorithm here, which I didn't want to have to re-create in Python. I also wanted to add `.editorconfig` support and ability to use `json5` to parse, which I suppose is all technically possible in Python but not a hill I really wanted to climb. Also, I wanted to offer a standalone CLI, which isn't something I can do with that hook.

This is my first real npm package I've published, and I did it without TypeScript (I'm not really a JS guy, but to work with `pre-commit` you need to be able to install right from the repo), so I'm pretty pleased with it. I learned a lot about stuff I haven't really dug into in the past - from some new things around npm packaging to how to get GitHub Actions to publish the package (with provenance) on release.

If this sounds like something you're into, **[go check out how you can install and start using it!](https://github.com/tillig/json-sort-cli)**
