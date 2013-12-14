function Eagle(game) {
  Entity3.call(this);
}

Eagle.prototype.update = function(timeDelta) {
  this.transformation.translateY(0.0001*timeDelta);
};
