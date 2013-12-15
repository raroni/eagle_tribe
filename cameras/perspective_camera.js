function PerspectiveCamera(screen) {
  this.screen = screen;
  this.transformation = new Transformation3D();
}

PerspectiveCamera.prototype.getClipTransformation = function() {
  var matrix = Matrix4.perspective(Math.PI/2, this.screen.getAspectRatio(), 0.1, 10);;
  return matrix;
};

PerspectiveCamera.prototype.getViewTransformation = function() {
  return this.transformation.getInverseWorldMatrix();
};

