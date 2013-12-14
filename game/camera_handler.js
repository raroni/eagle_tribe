function CameraHandler(game) {
  this.transformation = game.renderer.camera.transformation;
  this.transformation.setPositionY(0.4);
}

CameraHandler.prototype.update = function(timeDelta) {
  this.transformation.translateY(0.0001*timeDelta);
};
