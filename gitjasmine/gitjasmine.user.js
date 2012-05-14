// ==UserScript==
// @name           gitJasmine
// @namespace      http://jason.karns.name
// @include        https://gist.github.com/*
// @description    When on a GitHub gist that looks like it contains Jasmine specs,  add a quick link to easily load the gist with tryjasmine.com.
// @author         Jason Karns
// @version        0.3
// @date           2012-05-13
// @change         initial release
// ==/UserScript==

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js", function() {
  function gist_is_a_jasmine_spec(){
    var files = jQuery(".file[id^='file_']");
    var js_selector = "[id$='.js']",
        js_spec_selector = "[id$='_spec.js']",
        coffee_selector = "[id$='.coffee']",
        coffee_spec_selector = "[id$='_spec.coffee']";
    
    var js_sources = files.filter(js_selector).not(js_spec_selector).size();
    var js_specs = files.filter(js_spec_selector).size();
    var coffee_sources = files.filter(coffee_selector).not(coffee_spec_selector).size();
    var coffee_specs = files.filter(coffee_spec_selector).size();
    
    var sources = js_sources + coffee_sources;
    var specs = js_specs + coffee_specs;
    
    return (sources > 0 && specs > 0);
  }
  function insert_tryjasmine_link(){
    jQuery("#repos .meta table tbody").append('<tr><td class="label">Try-Jasmine URL:</td><td><a class="gist-tryjasmine-link" href="'+tryjasmine_link()+'">'+tryjasmine_link()+'</td></tr>');
  }
  function tryjasmine_link(){
    return "http://tryjasmine.com/?gist=" + location.pathname.match(/^\/([0-9]+)/)[1];
  }
  
  if(gist_is_a_jasmine_spec()) insert_tryjasmine_link();
});
