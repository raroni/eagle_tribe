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

Point2D.prototype.set = function(vector) {
  this[0] = vector[0];
  this[1] = vector[1];
};
