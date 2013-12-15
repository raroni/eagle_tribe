function ClickManager() {
  var mouse = Mouse.getInstance();
  mouse.on('clicked', this.storeClick.bind(this));
  this.clickables = [];
  this.clicks = [];
}

ClickManager.prototype.update = function() {
  var localPosition, transformation, click;
  for(var i=0; this.clicks.length>i; i++) {
    click = this.clicks[i];
    for(var n=0; this.clickables.length>n; n++) {
      transformation = this.clickables[n].getInverseWorldTransformation();
      localPosition = Point2D.transform(click.position, transformation);
      console.log(click.position);
      //console.log(localPosition);
    }
  }
  this.clicks.length = 0;
};

ClickManager.prototype.storeClick = function(click) {
  this.clicks.push(click);
}

ClickManager.prototype.add = function(clickable) {
  this.clickables.push(clickable);
};
