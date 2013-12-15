function Camera2D(screen) {
  this.screen = screen;
}

Camera2D.prototype.getClipTransformation = function() {
  var matrix = Matrix3.scaling(new Vector2(1/this.screen.getAspectRatio(), 1));
  return matrix;
};

Camera2D.prototype.getViewTransformation = function() {
  var matrix = Matrix3.scaling(new Vector2(this.screen.getAspectRatio(), 1));
  return matrix;
};
