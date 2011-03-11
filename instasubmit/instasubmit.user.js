// ==UserScript==
// @name           Instasubmit
// @namespace      http://jason.karns.name
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://www.instapaper.com/edit?url=http%3A%2F%2Ffeedproxy.google.com*
// ==/UserScript==

console.log($);
jQuery(function($){
	$("#content form").submit();
})();
