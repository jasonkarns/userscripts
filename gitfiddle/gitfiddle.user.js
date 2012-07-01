// ==UserScript==
// @name           gitFiddle
// @namespace      http://jason.karns.name
// @match          https://gist.github.com/*
// @description    When on a GitHub gist that looks like it contains jsFiddle content, add a quick link to easily load the fiddle.
// @author         Jason Karns
// @version        0.1
// ==/UserScript==

var GitFiddle = function(location){
  GitFiddle.Gist = function(location){
    this.location = location;
    this.sounds_like_a_fiddle = function(){
      return document.querySelector("#files .file[id^=file_fiddle]");
    };
    this.insert_link = function(){
      var link = new GitFiddle.LinksGist(this.location);
      var tr = document.createElement('tr');
      tr.appendChild(link.label);
      tr.appendChild(link.link);
      document.querySelector('#repos .meta table tbody').appendChild(tr);
    };
  };
  GitFiddle.Repo = function(){};

  GitFiddle.LinksGist = function(location){
    var fiddle_base = 'http://jsfiddle.net/gh/gist/mootools/1.2/';
    var gist_slug = location.pathname.match(/^\/([0-9]+)\//)[1] + '/';
    var url = fiddle_base + gist_slug;

    var link = document.createElement("td");
    link.innerHTML = '<a class="gist-fiddle-link" href="'+ url +'">'+ url +'</a>';

    var label = document.createElement("td");
    label.className = 'label';

    this.url = url;
    this.link = link;
    this.label = label;
  };
  
  switch(true){
    case new RegExp("^https://gist.github.com/").test(location):
      return new GitFiddle.Gist(location);
    case new RegExp("^https://github.com/.+").test(location):
      return new GitFiddle.Repo(location);
  }
};
