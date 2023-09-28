---
layout: post
title: "Hosting Customized Homebrew Formulae"
date: 2023-09-28 -0800
comments: true
tags: [mac]
description: "What happens if you have something you want to install from Homebrew but it's just not working quite right? You can try hosting a customized formula. Here's how."
---

**Scenario**: You're installing something from Homebrew and, for whatever reason, that standard formula isn't working for you. What do you do?

I used this opportunity to learn a little about how Homebrew formulae generally work. It wasn't something where I had my own app to deploy, but it also wasn't something I wanted to submit as a PR for an existing formula. For example, I wanted to have the `bash` and `wget` formulae use a different main URL (one of the mirrors). The current one works for 99% of folks, but for reasons I won't get into, it wasn't working for me.

**This process is called ["creating a tap"](https://docs.brew.sh/How-to-Create-and-Maintain-a-Tap)** - it's a repo you'll own with your own stuff that won't go into the core Homebrew repo.

**TL;DR**:

- Create a GitHub repo called `homebrew-XXXX` where `XXXX` is how Homebrew will see your repo name.
- Copy the original formulae into your repo. Anything with a `.rb` extension will work - the name of the file is the name of the formula.
- Install using `brew install your-username/XXXX/formula.rb`

Let's get a little more specific and use an example.

First [I created my GitHub repo, `homebrew-mods`](https://github.com/tillig/homebrew-mods). This is where I can store my customized formulae. In there, I created a `Formula` folder to put them in.

I went to [the `homebrew-core` repo](https://github.com/Homebrew/homebrew-core) where all the main formulae are and found the ones I was interested in updating:

- [`gettext`](https://github.com/Homebrew/homebrew-core/blob/master/Formula/g/gettext.rb) - a dependency of `bash`
- [`bash`](https://github.com/Homebrew/homebrew-core/blob/master/Formula/b/bash.rb)
- [`libidn2`](https://github.com/Homebrew/homebrew-core/blob/master/Formula/lib/libidn2.rb) - a dependency of `wget`
- [`wget`](https://github.com/Homebrew/homebrew-core/blob/master/Formula/w/wget.rb)

I copied the formulae into my own repo and made some minor updates to switch the `url` and `mirror` values around a bit.

Finally, install time! It has to be installed in this order because otherwise the dependencies in the `bash` and `wget` modules will try to pull from `homebrew-core` instead of my mod repo.

```sh
brew install tillig/mods/gettext
brew install tillig/mods/bash
brew install tillig/mods/libidn2
brew install tillig/mods/wget
```

That's it! If other packages have dependencies on `gettext` or `libidn2`, it'll appear to be already installed since Homebrew just matches on name.

The downside of this approach is that **you won't get the upgrades for free**. You have to maintain your tap and pull version updates as needed.

If you want to read more, check out the documentation from Homebrew on [creating and maintaining a tap](https://docs.brew.sh/How-to-Create-and-Maintain-a-Tap) as well as [the formula cookbook](https://docs.brew.sh/Formula-Cookbook).
