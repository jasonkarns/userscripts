Array.prototype.forEach.call(document.querySelectorAll('.commit-group-item'), function(commit) {
  var sha = commit.querySelector('.sha');
  var color = sha.textContent.match(/.{6}/)[0];

  sha.parentElement.style.backgroundImage = "linear-gradient(#F2F5F6, #"+ color +")";
});
