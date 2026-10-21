# Contributing

This is a [Jekyll](https://jekyllrb.com/) site. GitHub Pages builds and publishes it on every push to `master` using the [classic branch build](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll), not an Actions workflow, so production only has the plugins and versions on the [GitHub Pages dependency list](https://pages.github.com/versions/). Check the latest build with `gh api repos/tillig/tillig.github.io/pages/builds/latest`.

## Setup

Install Ruby (rbenv on macOS, [RubyInstaller](https://rubyinstaller.org/) with the DevKit on Windows) and [pre-commit](https://pre-commit.com/), then:

```sh
bundle install
pre-commit install
```

## Writing a Post

Create `_posts/YYYY-MM-DD-slug.md`. The slug becomes the URL, `/archive/YYYY/MM/DD/slug/`.

```yaml
---
layout: post
title: "Post Title"
date: 2026-10-21 -0800
comments: true
tags: [dotnet,autofac]
description: "A sentence or two for search results and social cards."
image: /images/20261021_thumbnail.png
---
```

- `date` always uses `-0800`, even during daylight saving time.
- Reuse tags from `_posts/tags.txt`, and add new ones there.
- `description` and `image` are optional. `image` is the social preview; without it, the Gravatar is used.
- Images go in `images/` as `YYYYMMDD_name.ext`, referenced as `{{ site.url }}/images/YYYYMMDD_name.ext`. Downloadable files go in `downloads/`.
- Link to other posts with `{% post_url 2014-08-22-moved-blog-to-github-pages %}` so the build fails if the target is missing.
- Give code fences a language. Wrap Liquid-like syntax such as `{{ }}` in `{% raw %}` and `{% endraw %}`.
- Don't hard-wrap prose. markdownlint allows only the inline HTML elements listed in `.markdownlint.json`.

Commit with a short message like `New post.`

`_posts/archived/` holds posts imported from Subtext. Their `.aspx` slugs and `disqus_identifier` values keep old URLs and comment threads working, so don't rename them or add posts there. `404.html` redirects even older pMachine URLs using `pmachine_redirects.json`.

## Validating Changes

- `bundle exec jekyll serve --watch` serves the site at <http://localhost:4000> and rebuilds on save, except for `_config.yml` changes, which need a restart. It's also the default VS Code build task, and `go.bat` on Windows.
- `bundle exec rake test` builds the site and runs [HTML-Proofer](https://github.com/gjtorikian/html-proofer) to find broken internal links and images. The `rakefile` explains what it skips.
- pre-commit runs on staged files when you commit. Don't run `pre-commit run --all-files`: the archived posts fail markdownlint, and its `--fix` rewrites them.

## Changing the Site

`_config.yml` holds site settings and plugins, and a plugin only runs in production if it's on the GitHub Pages list. Jekyll publishes every file it doesn't exclude, so add root-level files that shouldn't be published, like this one, to `exclude` in `_config.yml`.

## Updating Dependencies

Commit each of these separately, then run `bundle exec rake test`:

- `bundle update` refreshes `Gemfile.lock` so local builds match GitHub Pages. Pages ignores the lockfile and uses its own pinned versions.
- `pre-commit autoupdate --freeze` updates the hooks, pinned to commit SHAs.
