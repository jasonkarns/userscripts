// ==UserScript==
// @name           gitFiddle
// @namespace      http://jason.karns.name
// @match          https://gist.github.com/*
// @description    When on a GitHub gist that looks like it contains jsFiddle content, add a quick link to easily load the fiddle.
// @author         Jason Karns
// @version        1.0
// ==/UserScript==

var GitFiddle = function(location){
  var git;
  switch(location.host){
    case "gist.github.com":
      git = new GitFiddle.Gist(location);
      break;
    case "github.com":
      git = new GitFiddle.Repo(location);
      break;
    default:
      git = new GitFiddle.Git();
  }

  if(git.sounds_like_a_fiddle && git.sounds_like_a_fiddle()){
    git.insert_link();
  }
};

GitFiddle.Git = function(){};
GitFiddle.Git.prototype.sounds_like_a_fiddle = function(){
  return false;
};

GitFiddle.Repo = Object.create(GitFiddle.Git);

GitFiddle.Gist = function(location){
  var pathname = (location && location.pathname) || "";
  var matches = /^\/([0-9]+)\/?/.exec(pathname) || [];
  this.id = matches[1];
};
GitFiddle.Gist.prototype.sounds_like_a_fiddle = function(){
  var selector = ["#files .file[id^=file_fiddle\\.css]",
                  "#files .file[id^=file_fiddle\\.html]",
                  "#files .file[id^=file_fiddle\\.js]",
                  "#files .file[id^=file_fiddle\\.manifest]"].join(",");
  return document.querySelector(selector);
};
GitFiddle.Gist.prototype.insert_link = function(){
  var fiddle_link = new GitFiddle.LinksGist(this).build();
  document.querySelector('#repos .meta table tbody').appendChild(fiddle_link);
};

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
    label.textContent = 'Run Fiddle';
    label.className = 'label';
    return label;
  })();
};
GitFiddle.LinksGist.prototype.build = function() {
  var tr = document.createElement('tr');
  tr.appendChild(this.label);
  var td = document.createElement('td');
  td.appendChild(this.link);
  tr.appendChild(td);
  return tr;
};

GitFiddle(location);
