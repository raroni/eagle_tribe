function Transformation3D() {
  this.position = new Point3D();
  this.yaw = 0;
  this.pitch = 0;
  this.worldMatrixDirty = true;
}

Transformation3D.prototype.setPositionZ = function(z) {
  this.position[2] = z;
  this.worldMatrixDirty = true;
}

Transformation3D.prototype.getWorldMatrix = function() {
  if(this.worldMatrixDirty) this.recalculateWorldMatrix();
  return this.worldMatrix;
};

Transformation3D.prototype.recalculateWorldMatrix = function() {
  console.log(this.position);
  this.worldMatrix = Matrix4.translation(this.position);
  this.worldMatrixDirty = false;
};
