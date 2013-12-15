function ClickManager(mouse, screen) {
  this.screen = screen;
  mouse.on('clicked', this.storeClick.bind(this));
  this.clickables = [];
  this.clicks = [];
}

ClickManager.prototype.update = function() {
  var viewPosition, click, clickable;
  var viewTransformation = this.screen.getViewTransformation();
  for(var i=0; this.clicks.length>i; i++) {
    click = this.clicks[i];
    viewPosition = Point2D.transform(click.position, viewTransformation);
    for(var n=0; this.clickables.length>n; n++) {
      clickable = this.clickables[n];
      if(clickable.contains(viewPosition)) {
        clickable.handleClick(click);
        break;
      }
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

ClickManager.prototype.clear = function() {
  this.clickables.length = 0;
};
