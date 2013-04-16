// ==UserScript==
// @name        GitRainbow
// @namespace   http://jason.karns.name
// @version     1.3.1
// @grant       none
// @description Colorize your history! GitRainbow adds color to GitHub's history view by using each commit's sha-hash as a hex color.
// @match       https://github.com/*
// ==/UserScript==

Array.prototype.forEach.call(document.getElementsByClassName('commit-group-item'), function(commit) {
  var sha = commit.getElementsByClassName('sha')[0];
  var color = sha.textContent.match(/.{6}/)[0];

  sha.parentElement.style.position = 'relative';

  var mask = document.createElement('span');
    mask.style.backgroundColor = "#" + color;
    mask.style.position = "absolute";
    mask.style.top = 0;
    mask.style.left = 0;
    mask.style.width = "100%";
    mask.style.height = "100%";
    mask.style.borderRadius = 2;
    mask.style.opacity = 0.4;

  sha.parentElement.appendChild(mask);
});
