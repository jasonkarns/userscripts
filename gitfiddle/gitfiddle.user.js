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

var Gist = function(location){
  this.sounds_like_a_fiddle = function(){
    return document.querySelector("#files .file[id^=file_fiddle]");
  };
  this.insert_fiddle_link = function(){
    var link = new LinksGist(location);
    var tr = document.createElement('tr');
    tr.appendChild(link.label);
    tr.appendChild(link.link);
    document.querySelector('#repos .meta table tbody').appendChild(tr);
  };
};
var Repo = function(){};

var LinksGist = function(location){
  var fiddle_base = 'http://jsfiddle.net/gh/gist/mootools/1.2/';
  this.url = fiddle_base + location.pathname.match(/^\/([0-9]+)\//)[1] + '/';

  var link = document.createElement("td");
  link.innerHTML = '<a class="gist-fiddle-link" href="'+this.url+'">'+this.url+'</a>';
  this.link = link;

  var label = document.createElement("td");
  label.className = 'label';
  console.log(label);
  this.label = label;
};



function giddler(location){
  if(location.match(new RegExp("^https://gist.github.com/"))){
    return new Gist();
  }
  if(location.match(new RegExp("^https://github.com/.+"))){
    return new Repo();
  }
}