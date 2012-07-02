// ==UserScript==
// @name           gitFiddle
// @namespace      http://jason.karns.name
// @match          https://gist.github.com/*
// @description    When on a GitHub gist that looks like it contains jsFiddle content, add a quick link to easily load the fiddle.
// @author         Jason Karns
// @version        0.1
// ==/UserScript==

var GitFiddle = function(location){
  switch(location.host){
    case "gist.github.com":
      return new GitFiddle.Gist(location);
    case "github.com":
      return new GitFiddle.Repo(location);
  }
};

GitFiddle.Gist = function(location){
  this.id = (location && location.pathname)? location.pathname.match(/^\/([0-9]+)\//)[1] : "";

  this.sounds_like_a_fiddle = function(){
    var selector = ["#files .file[id^=file_fiddle\\.css]",
                    "#files .file[id^=file_fiddle\\.html]",
                    "#files .file[id^=file_fiddle\\.js]",
                    "#files .file[id^=file_fiddle\\.manifest]"].join(",");
    return document.querySelector(selector);
  };

  this.insert_link = function(){
    var fiddle_link = new GitFiddle.LinksGist(this.id).build();
    document.querySelector('#repos .meta table tbody').appendChild(fiddle_link);
  };
};

GitFiddle.Repo = function(){};

GitFiddle.LinksGist = function(gist){
  this.url = (function(gist_id){
    var fiddle_base = 'http://jsfiddle.net/gh/gist/mootools/1.2/';
    return fiddle_base + gist_id + '/';
  })(gist.id);

  this.link = (function(url){
    var link = document.createElement('a');
    link.className = 'gist-fiddle-link';
    link.href = url;
    link.textContent = url;
    return link;
  })(this.url);

  this.label = (function(){
    var label = document.createElement("td");
    label.textContent = 'Run Jasmine Specs';
    label.className = 'label';
    return label;
  })();

  this.build = function() {
    var tr = document.createElement('tr');
    tr.appendChild(this.label);
    var td = document.createElement('td');
    td.appendChild(this.link);
    tr.appendChild(td);
    return tr;
  };
};