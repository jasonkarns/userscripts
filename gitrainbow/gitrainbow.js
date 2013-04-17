Array.prototype.forEach.call(document.querySelectorAll('.commit-group-item'), function(commit) {
  var sha = commit.querySelector('.sha');
  var color = sha.textContent.match(/.{6}/)[0];

  sha.parentElement.style.position = 'relative';

  var mask = document.createElement('span');
    mask.style.backgroundColor = "#" + color;
    mask.style.position = "absolute";
    mask.style.top = 0;
    mask.style.left = 0;
    mask.style.width = "100%";
    mask.style.height = "100%";
    mask.style.borderRadius = 2;
    mask.style.opacity = 0.4;

  sha.parentElement.appendChild(mask);
});
