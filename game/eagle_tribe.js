function EagleTribe(canvas) {
  Game.call(this, canvas);
}

EagleTribe.prototype = Object.create(Game.prototype);

EagleTribe.prototype.onInitialize = function() {
  MeshData.load(this.meshes);
};
