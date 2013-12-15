function Mouse(canvas, screen) {
  this.position = new Point2D();
  this.screen = screen;
  this.canvas = canvas;
  this.pressed = false;
  this.pressCallback = this.press.bind(this);
  this.moveCallback = this.move.bind(this);
  this.visible = true;
};

Mouse.prototype = Object.create(Notifier);

Mouse.prototype.resume = function() {
  this.canvas.addEventListener('mousedown', this.pressCallback);
  this.canvas.addEventListener('mousemove', this.moveCallback);
};

Mouse.prototype.hide = function() {
  this.visible = false;
  this.position.reset();
};

Mouse.prototype.show = function() {
  this.visible = true;
};

Mouse.prototype.pause = function() {
  this.canvas.removeEventListener('mousedown', this.pressCallback);
  this.canvas.removeEventListener('mousemove', this.moveCallback);
};

Mouse.prototype.press = function() {
  var click = new Click(this.position.clone());
  this.notify('clicked', click);
  this.clicked = true;
};

Mouse.prototype.getViewPosition = function() {
  var position = Point2D.transform(this.position, this.screen.getViewTransformation());
  return position;
};

Mouse.prototype.reset = function() {
  this.clicked = false;
};

Mouse.prototype.move = function(event) {
  var movementX = event.movementX || event.webkitMovementX || event.mozMovementX;
  var movementY = event.movementY || event.webkitMovementY || event.mozMovementY;

  var movement = new Vector2();
  if(movementX) {
    if(this.visible) {
      movementX = Math.clamp(movementX, this.position[0]*-1-this.screen.getWidth()/2, this.screen.getWidth()/2-this.position[0]);
      this.position[0] += movementX;
    }
    movement[0] = movementX;
  }
  if(movementY) {
    movementY *= -1;
    if(this.visible) {
      movementY = Math.clamp(movementY, this.position[1]*-1-this.screen.getHeight()/2, this.screen.getHeight()/2-this.position[1]);
      this.position[1] += movementY;
    }
    movement[1] = movementY;
  }

  this.notify('moved', movement);
};
