function Screen(canvas) {
  this.canvas = canvas;
}

Screen.prototype = {
  getAspectRatio: function() {
    return this.canvas.width/this.canvas.height;
  }
};
