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

Point3D.origin = function() {
  return new Point3D(0, 0, 0);
};

Point3D.transform = function(point, transformation) {
  var vector = Vector3.transform(point, transformation);
  return new Point3D(vector);
};

Point3D.add = function(point, vector) {
  var result = Vector3.add(point, vector);
  return new Point3D(result);
};
