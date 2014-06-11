(function(){

  var WaffleButton = function(){ };

  WaffleButton.prototype.template = function(){
    return '<li><a class="minibutton" href="'+ this.href() +'">' +
           '<span class="octicon" style="height:16px;width:16px;background:url(//waffle.io/favicon.ico) 0/16px no-repeat;"></span>' +
           'Waffle</a></li>';
  };

  WaffleButton.prototype.userRepo = function(){
    return location.pathname.match(/^(\/[0-9a-z_\-]+\/[0-9a-z_\-]+)/i)[1];
  };

  WaffleButton.prototype.href = function(){
    return "https://waffle.io" + this.userRepo();
  };

  WaffleButton.prototype.prependTo = function(element){
    element.insertAdjacentHTML('afterbegin', this.template());
  };

  new WaffleButton().prependTo(document.querySelector('.pagehead-actions'));
})();
