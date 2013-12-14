function Transformation3() {
  this.position = new Point3();
  this.yaw = 0;
  this.pitch = 0;
}

Transformation3.prototype.getMatrix = function() {
  return Matrix4.identity();
};
