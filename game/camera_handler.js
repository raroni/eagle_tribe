function CameraHandler(game, eagle) {
  this.transformation = game.renderer.camera.transformation;
  this.eagle = eagle;
}

CameraHandler.prototype.update = function(timeDelta) {
  this.transformation.setPosition(this.eagle.transformation.position);
};
