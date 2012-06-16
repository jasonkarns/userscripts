// ==UserScript==
// @name           Instasubmit
// @namespace      http://jason.karns.name
// @match          http://*.instapaper.com/edit?url=http%3A%2F%2Ffeedproxy.google.com*
// @match          https://*.instapaper.com/edit?url=http%3A%2F%2Ffeedproxy.google.com*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description    When sending articles to Instapaper from Google Reader via the SendTo mechanism, automatically submit the Instapaper form
// @author         Jason Karns
// @version        1.0
// ==/UserScript==

console.log($);
jQuery(function($){
	$("#content form").submit();
})();
