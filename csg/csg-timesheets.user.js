// ==UserScript==
// @name           CSG IFrames
// @namespace      http://jason.karns.name
// @match          https://portal.cardinalsolutions.com/Pages/ViewTimesheets.aspx
// @match          https://empsrv.cardinalsolutions.com/empsrv/Timesheets/*
// @description    Auto-resize IFrames to fit their content
// @author         Jason Karns
// @version        1.5
// @date           2012-06-23
// ==/UserScript==

var portal = (document.domain == "portal.cardinalsolutions.com");
document.domain="cardinalsolutions.com";

if(portal){
  (function(iframes) {
    iframes
    .filter(function(iframe){
      return !!iframe;
    })
    .forEach(function(iframe){
      try {
        iframe.addEventListener('load', function(){
          setTimeout(function(){
            var body = (iframe.contentDocument || iframe.contentWindow.document).body;
            console.log("H: " + body.scrollHeight + "; W: " + body.scrollWidth);
            iframe.style.height = body.scrollHeight + 30 + 'px';
//            iframe.style.width = body.scrollWidth + 'px';
          }, 3000);
        });
      }
      catch(err) {
        console.error(err);
      }
    });
  })([
    document.querySelector('#MSOPageViewerWebPart_WebPartWPQ2')
  ])

  document.querySelector('#WebPartWPQ2').style['min-height']=document.querySelector('#WebPartWPQ2').style.height;
  document.querySelector('#WebPartWPQ2').style.height='';
  document.querySelectorAll('#MSOZoneCell_WebPartWPQ2 .s4-wpTopTable, #WebPartWPQ2').style.width='100%';
}
