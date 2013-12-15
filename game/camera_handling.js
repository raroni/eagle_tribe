function CameraHandling(game, eagle) {
  this.transformation = game.cameras.get('perspective').transformation;
  this.eagle = eagle;
}

CameraHandling.prototype.update = function(timeDelta) {
  this.transformation.set(this.eagle.transformation);
  this.transformation.translateY(0.2);
};
