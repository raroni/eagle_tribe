function Point2D() {
  if(arguments.length === 0) {
    Vector2.call(this);
  } else {
    Vector2.call(this, arguments[0], arguments[1]);
  }
}

Point2D.prototype.add = function(vector) {
  this.set(Vector2.add(this, vector));
};

Point2D.prototype.clone = function() {
  return new Point2D(this[0], this[1]);
};

Point2D.prototype.set = function(vector) {
  this[0] = vector[0];
  this[1] = vector[1];
};

Point2D.transform = function(point, transformation) {
  var homoVector = new Vector3(point[0], point[1], 1);
  var result = Matrix3.multiplyVector(transformation, homoVector);
  return new Point2D(result[0], result[1]);
};
