paraesthesia.com
================

Travis Illig's blog on GitHub Pages.

I followed [Phil Haack's lead](http://haacked.com/archive/2013/12/02/dr-jekyll-and-mr-haack/) and moved my blog from Subtext to GitHub Pages. (I also sorta-forked/stole the layout and basic Jekyll stuff, because Haack's awesome and I'm not.)

I had to [fork the Subtext blog exporter](https://github.com/tillig/subtext-jekyll-exporter) to get my content out, but you're welcome to that as well.

[Using Jekyll with GitHub Pages](https://help.github.com/articles/using-jekyll-with-pages)

Stuff I always forget because I don't live in this world for very long at a given time:

- `bundle exec jekyll serve --watch` to run the site local
- `rake test` for HTML:Proofer link testing
- `bundle update` to get the latest libraries
- Windows hates pygments and GitHub pages doesn't yet support rouge, so set `highlighter: null` in configuration while testing on Windows.
- [Liquid filters](https://github.com/pattex/octopod/wiki/Liquid-filters) are pretty helpful.