function Direction3() {
  Vector3.call(this);
}

Direction3.prototype = Object.create(Vector3.prototype);

Direction3.up = function() {
  return new Direction3(0, 1, 0);
};
