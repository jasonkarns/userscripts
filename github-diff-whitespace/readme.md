GitHub-Diff-Whitespace
===========
Adds a button to GitHub diff views (commits, pull requests) to toggle whitespace-significance for the diff.

GitHub has a hidden feature whereby adding `?w=1` to the end of any diff url will turn off whitespace significance in the diff. (essentially, the same as `git diff -w`.) This userscript simply adds a toggle button to make use of this awesome feature!

Before:

<img src="https://github.com/jasonkarns/userscripts/raw/master/github-diff-whitespace/before-header.png" alt="before screenshot" width="700" />

After:

<img src="https://github.com/jasonkarns/userscripts/raw/master/github-diff-whitespace/after-header.png" alt="after screenshot" width="700" />


With whitespace significance on (default):

<img src="https://github.com/jasonkarns/userscripts/raw/master/github-diff-whitespace/whitespace-significant.png" alt="before screenshot" width="700" />

With whitespace significance off:

<img src="https://github.com/jasonkarns/userscripts/raw/master/github-diff-whitespace/whitespace-insignificant.png" alt="before screenshot" width="700" />


Installation
------------
[Install from the script page at userscripts.org](http://userscripts.org/scripts/show/137968) or simply [browse the raw script source on github](https://github.com/jasonkarns/userscripts/raw/master/github-diff-whitespace/github-diff-whitespace.user.js).

Browsers
------------
Works in Firefox (with Greasemonkey) and Google Chrome

