function Transformation2D() {
  this.position = new Vector2();
  this.markMatricesDirty();
}

Transformation2D.prototype.markMatricesDirty = function() {
  this.worldMatrixDirty = true;
  this.inverseWorldMatrixDirty = true;
};

Transformation2D.prototype.getWorldMatrix = function() {
  if(this.worldMatrixDirty) this.recalculateWorldMatrix();
  return this.worldMatrix;
};

Transformation2D.prototype.recalculateWorldMatrix = function() {
  this.worldMatrix = Matrix3.translation(this.position);
  this.worldMatrixDirty = false;
};

Transformation2D.prototype.setPosition = function(position) {
  this.position = position;
  this.markMatricesDirty();
};

Transformation2D.prototype.getInverseWorldMatrix = function() {
  if(this.inverseWorldMatrixDirty) this.recalculateInverseWorldMatrix();
  return this.inverseWorldMatrix;
};

Transformation2D.prototype.recalculateInverseWorldMatrix = function() {
  this.inverseWorldMatrix = Matrix3.translation(Vector2.negate(this.position));
  this.inverseWorldMatrixDirty = false;
};