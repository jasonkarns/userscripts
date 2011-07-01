// ==UserScript==
// @name           gitFiddle
// @namespace      http://jason.karns.name
// @include        https://gist.github.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @description    When on a GitHub gist that looks like it contains jsFiddle content, add a quick link to easily load the fiddle.
// @author         Jason Karns
// @version        0.1
// @date           2011-07-01
// @change         initial release
// ==/UserScript==

jQuery(function($){
  function gist_is_a_fiddle(){
    return $("#file_fiddle\\.manifest, .file[id^='file_fiddle']", $("#files")).size() > 1;
  }
  function insert_fiddle_link(){
    $("#repos .meta table tbody").append('<tr><td class="label">jsFiddle URL:</td><td><a class="gist-jsfiddle-link" href="'+fiddle_link()+'">'+fiddle_link()+'</td></tr>');
  }
  function fiddle_link(){
    return "http://jsfiddle.net/gh/gist/jquery/1.6/" + location.pathname.match(/^\/([0-9]+)\//)[1];
  }
  
  if(gist_is_a_fiddle()) insert_fiddle_link();
});
