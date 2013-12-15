function Point3D() {
  if(arguments.length == 1) {
    Vector3.call(this, arguments[0][0], arguments[0][1], arguments[0][2]);
  } else if(arguments.length == 3) {
    Vector3.call(this, arguments[0], arguments[1], arguments[2]);
  } else {
    Vector3.call(this);
  }
}

Point3D.prototype = Object.create(Vector3.prototype);

Point3D.prototype.transform = function(transformation) {
  this.set(Point3D.transform(this, transformation));
};

Point3D.origin = function() {
  return new Point3D(0, 0, 0);
};

Point3D.transform = function(point, transformation) {
  var homoVector = new Vector4(point[0], point[1], point[2], 1);
  var result = Matrix4.multiplyVector(transformation, homoVector);
  return new Point3D(result[0], result[1], result[2]);
};

Point3D.add = function(point, vector) {
  var result = Vector3.add(point, vector);
  return new Point3D(result);
};
