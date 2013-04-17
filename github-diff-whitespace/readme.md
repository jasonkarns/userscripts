GitHub-Diff-Whitespace
===========
Adds a button to GitHub diff views (commits, pull requests) to toggle whitespace-significance for the diff.

GitHub has a hidden feature whereby adding `?w=1` to the end of any diff url will turn off whitespace significance in the diff. (essentially, the same as `git diff -w`.) This userscript simply adds a toggle button to make use of this awesome feature!

Before and After:

<img src="https://github.com/jasonkarns/userscripts/raw/master/github-diff-whitespace/before-header.png" alt="before screenshot" width="800" />
<img src="https://github.com/jasonkarns/userscripts/raw/master/github-diff-whitespace/after-header.png" alt="after screenshot" width="800" />


Effect of toggling whitespace significance:

<img src="https://github.com/jasonkarns/userscripts/raw/master/github-diff-whitespace/whitespace-significant.png" alt="'whitespace significance on' screenshot" width="400" />
<img src="https://github.com/jasonkarns/userscripts/raw/master/github-diff-whitespace/whitespace-insignificant.png" alt="'whitespace significance off' screenshot" width="400" />


Installation
------------
Chrome:
 - install from [Chrome Web Store](https://chrome.google.com/webstore/detail/github-diff-whitespace/lhbcdehjihmbiafeodkfnbndleijnnhp)

Firefox with Greasemonkey:
 - install from [userscripts.org](http://userscripts.org/scripts/show/137968)

Browsers
------------
Tested in Firefox (with Greasemonkey) and Google Chrome
