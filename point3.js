function Point3() {
  if(arguments.length == 1) {
    Vector3.call(this, arguments[0][0], arguments[0][1], arguments[0][2]);
  } else {
    Vector3.call(this, arguments[0], arguments[1], arguments[2]);
  }

}

Point3.prototype = Object.create(Vector3.prototype);

Point3.origin = function() {
  return new Point3(0, 0, 0);
};

Point3.transform = function(point, transformation) {
  var vector = Vector3.transform(point, transformation);
  return new Point3(vector);
};
