function Color(x, y, z) {
  Vector3.call(this, x, y, z);
}

Color.red = function() {
  return new Color(1, 0, 0);
};

Color.brown = function() {
  return new Color(0.64, 0.38, 0.1);
};

Color.green = function() {
  return new Color(0, 1, 0);
};
