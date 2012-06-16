// ==UserScript==
// @name           Instasubmit
// @namespace      http://jason.karns.name
// @match          http://*.instapaper.com/edit?url=*
// @match          https://*.instapaper.com/edit?url=*
// @description    When sending articles to Instapaper from Google Reader via the SendTo mechanism, automatically submit the Instapaper form
// @author         Jason Karns
// @version        2.0.0-alpha
// ==/UserScript==

var form = document.querySelector("form[action$=edit]");
form.__proto__.submit.apply(form);
