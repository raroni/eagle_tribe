function Transformation3D() {
  this.position = new Point3D();
  this.yaw = 0;
  this.pitch = 0;
  this.markMatricesDirty();
}

Transformation3D.prototype.setPositionZ = function(z) {
  this.position[2] = z;
  this.markMatricesDirty();
}

Transformation3D.prototype.markMatricesDirty = function() {
  this.worldMatrixDirty = true;
  this.inverseWorldMatrixDirty = true;
}

Transformation3D.prototype.setPositionY = function(y) {
  this.position[1] = y;
  this.markMatricesDirty();
}

Transformation3D.prototype.getWorldMatrix = function() {
  if(this.worldMatrixDirty) this.recalculateWorldMatrix();
  return this.worldMatrix;
};

Transformation3D.prototype.recalculateWorldMatrix = function() {
  this.worldMatrix = Matrix4.translation(this.position);
  this.worldMatrixDirty = false;
};

Transformation3D.prototype.getInverseWorldMatrix = function() {
  if(this.inverseWorldMatrixDirty) this.recalculateInverseWorldMatrix();
  return this.inverseWorldMatrix;
};

Transformation3D.prototype.recalculateInverseWorldMatrix = function() {
  this.inverseWorldMatrix = Matrix4.translation(Vector3.negate(this.position));
  this.inverseWorldMatrixDirty = false;
};

