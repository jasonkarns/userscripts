// ==UserScript==
// @name           TreasuryDirect Login
// @namespace      http://jason.karns.name
// @include        https://www.treasurydirect.gov/RS/BPDLogin?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$("input[type='password']").removeAttr("readonly");
