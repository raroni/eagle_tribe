function Direction3D() {
  if(arguments.length == 1) {
    Vector3.call(this, arguments[0][0], arguments[0][1], arguments[0][2]);
  } else {
    Vector3.call(this, arguments[0], arguments[1], arguments[2]);
  }
}

Direction3D.prototype = Object.create(Vector3.prototype);

Direction3D.up = function() {
  return new Direction3D(0, 1, 0);
};

Direction3D.forward = function() {
  return new Direction3D(0, 0, 1);
};

Direction3D.transform = function(point, transformation) {
  var homoVector = new Vector4(point[0], point[1], point[2], 0);
  var result = Matrix4.multiplyVector(transformation, homoVector);
  return new Direction3D(result[0], result[1], result[2]);
};

Direction3D.negate = function(direction) {
  var vector = Vector3.negate(direction);
  return new Direction3D(vector);
};

Direction3D.cross = function(direction1, direction2) {
  var vector = Vector3.cross(direction1, direction2);
  return new Direction3D(vector);
};
