function Mouse(canvas) {
  this.canvas = canvas;
  Mouse.instance = this;
  this.position = new Point2D();
  canvas.addEventListener('mousedown', this.press.bind(this));
  document.addEventListener('mousemove', this.move.bind(this));
  this.canvas = canvas;
  this.clicked = false;
};

Mouse.prototype = Object.create(Notifier);

Mouse.prototype.press = function() {
  var click = new Click(this.position.clone());
  this.notify('clicked', click);
  this.clicked = true;
};

Mouse.prototype.reset = function() {
  this.clicked = false;
};

Mouse.getInstance = function() {
  if(!this.instance) throw "Mouse not initialized.";
  return this.instance;
};

Mouse.prototype.move = function(event) {
  this.position[0] = ((event.x-this.canvas.offsetLeft+document.body.scrollLeft) / this.canvas.width)*2-1;
  this.position[1] = ((event.y-this.canvas.offsetTop+document.body.scrollTop) / this.canvas.height)*-2+1;
};
