function Transformation3() {
  this.position = new Point3();
  this.yaw = 0;
  this.pitch = 0;
  this.worldMatrixDirty = true;
}

Transformation3.prototype.setPositionZ = function(z) {
  this.position[2] = z;
  this.worldMatrixDirty = true;
}

Transformation3.prototype.getWorldMatrix = function() {
  if(this.worldMatrixDirty) this.recalculateWorldMatrix();
  return this.worldMatrix;
};

Transformation3.prototype.recalculateWorldMatrix = function() {
  console.log(this.position);
  this.worldMatrix = Matrix4.translation(this.position);
  this.worldMatrixDirty = false;
};
