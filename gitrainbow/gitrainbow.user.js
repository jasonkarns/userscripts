// ==UserScript==
// @name        GitRainbow
// @namespace   http://jason.karns.name
// @match       https://github.com/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// @version     1.3
// @grant       none
// ==/UserScript==

jQuery(".commit-group-item").each(function() {
  var sha = $(this).find(".sha");
  var color = sha.text().match(/.{6}/)[0];

  $(sha).parent().css('position', 'relative');
  $(sha).after("<span>").next().css({
    'background-color': "#" + color,
    "position": "absolute",
    "top": 0,
    "left": 0,
    "width": "100%",
    "height": "100%",
    "border-radius": 2,
    "opacity": 0.4
  });
});
