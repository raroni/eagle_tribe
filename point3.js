function Point3(x, y, z) {
  Vector3.call(this, x, y, z);
}

Point3.prototype = Object.create(Vector3.prototype);

Point3.origin = function() {
  return new Point3(0, 0, 0);
};
