function Mouse(canvas) {
  Mouse.instance = this;
  this.position = new Vector2();
  canvas.addEventListener('mousedown', this.press.bind(this));
  document.addEventListener('mousemove', this.move.bind(this));
  this.canvas = canvas;
  this.clicked = false;
};

Mouse.prototype.press = function() {
  this.clicked = true;
};

Mouse.prototype.reset = function() {
  this.clicked = false;
};

Mouse.initialize = function(canvas) {
  console.log('y');
  this.instance = new Mouse(canvas);
};

Mouse.getInstance = function() {
  if(!this.instance) throw "Mouse not initialized.";
  return this.instance;
};

Mouse.prototype.move = function(event) {
  this.position[0] = event.x-this.canvas.offsetLeft+document.body.scrollLeft;
  this.position[1] = event.y-this.canvas.offsetTop+document.body.scrollTop;
};
