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

var Gist = function(){};
Gist.prototype.sounds_like_a_fiddle = function(){
  return document.querySelector("#files .file[id^=file_fiddle]");
};


var Repo = function(){};


function giddler(location){
  if(location.match(new RegExp("^https://gist.github.com/"))){
    return new Gist();
  }
  if(location.match(new RegExp("^https://github.com/.+"))){
    return new Repo();
  }
}
