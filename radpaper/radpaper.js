Array.prototype.forEach.call(document.querySelectorAll('.tableViewCell'), function(item){
  var link = item.querySelector('.tableViewCellTitleLink');

  var radLink = document.createElement('a');
    radLink.textContent = "Radbox";
    radLink.className   = "actionLink";
    radLink.href        = "http://radbox.me/api/add?url="+ encodeURIComponent(link.href) +"&t="+ encodeURIComponent(link.textContent);
    radLink.target      = "_blank";

  var separator = document.createElement('span');
    separator.textContent = "\u2022 ";
    separator.className   = "separator";

  var controls = item.querySelector('.secondaryControls');
    controls.appendChild(separator);
    controls.appendChild(radLink);
});
