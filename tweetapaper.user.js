// ==UserScript==
// @name           Tweetapaper
// @namespace      http://jason.karns.name
// @include        http://www.instapaper.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


$(".tableViewCell").each(function(index, element){
  var link = $(element).find("a.tableViewCellTitleLink");
  var t = {
    text: link.text(),
    url: link.attr("href")
  };
  if($("a[href*=helvetapaper]").length){
    $(element).find(".cornerControls").append('<a class="actionButton" href="http://twitter.com/share?'+$.param(t)+'" target="_blank">Tweet</a>');
  }
  else {
    $(element).find(".secondaryControls").append('<span class="separator">•</span> <a class="actionLink" href="http://twitter.com/share?'+$.param(t)+'" target="_blank">Tweet</a>');
  }
});
