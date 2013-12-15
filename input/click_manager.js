function ClickManager() {
  var mouse = Mouse.getInstance();
  this.clickables = [];
}

ClickManager.prototype.update = function() {
  
};

ClickManager.prototype.add = function(clickable) {
  this.clickables.push(clickable);
};
