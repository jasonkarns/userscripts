// ==UserScript==
// @name           Radapaper
// @namespace      http://jason.karns.name
// @include        http://www.instapaper.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


(function(){
  $(".tableViewCell").each(function(index, element){
    var link = $(element).find("a.tableViewCellTitleLink");
    var r = {
      t: link.text(),
      url: link.attr("href"),
	  sr: "Radapaper"
    };
    var radLink = $('<a href="http://radbox.me/api/add?'+$.param(r)+'" target="_blank">Radbox</a>');
    $(element).find(".secondaryControls").append(' <span class="separator">&bull;</span> ').append(radLink.addClass('actionLink'));
  });
})();
