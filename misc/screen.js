function Screen(canvas) {
  this.canvas = canvas;
}

Screen.prototype = {
  getAspectRatio: function() {
    return this.canvas.width/this.canvas.height;
  },
  getWidth: function() {
    return this.canvas.width;
  },
  getHeight: function() {
    return this.canvas.height;
  },
  getViewTransformation: function() {
    var transformation = Matrix3.scaling(new Vector2(
      this.getAspectRatio()/((this.canvas.width*0.5)),
      1/(this.canvas.height*0.5)
    ));
    return transformation;
  }
};
