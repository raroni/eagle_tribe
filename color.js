function Color(x, y, z) {
  Vector3.call(this, x, y, z);
}

Color.red = function() {
  return new Color(1, 0, 0);
};
