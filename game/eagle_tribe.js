function EagleTribe(canvas) {
  Game.call(this, canvas);
}

EagleTribe.prototype = Object.create(Game.prototype);

EagleTribe.prototype.onInitialize = function() {
  var transformation = Matrix4.scaling(new Vector3(0.1, 1, 0.1));
  var trunkMesh = new BoxMesh(transformation, Color.brown());
  this.meshes.trunk = trunkMesh;
};
