// ==UserScript==
// @name           Instasubmit
// @namespace      http://jason.karns.name
// @match          http://*.instapaper.com/edit?url=http%3A%2F%2Ffeedproxy.google.com*
// @match          https://*.instapaper.com/edit?url=http%3A%2F%2Ffeedproxy.google.com*
// @description    When sending articles to Instapaper from Google Reader via the SendTo mechanism, automatically submit the Instapaper form
// @author         Jason Karns
// @version        2.0
// ==/UserScript==

var form = document.querySelector("form[action$=edit]");
form.__proto__.submit.apply(form);
