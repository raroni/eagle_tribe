function CameraHandler(game, eagle) {
  this.transformation = game.cameras.get('perspective').transformation;
  this.eagle = eagle;
}

CameraHandler.prototype.update = function(timeDelta) {
  this.transformation.set(this.eagle.transformation);
  this.transformation.translateY(0.1);
};
