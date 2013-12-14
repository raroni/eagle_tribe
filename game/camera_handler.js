function CameraHandler(game, eagle) {
  this.transformation = game.renderer.camera.transformation;
  this.eagle = eagle;
}

CameraHandler.prototype.update = function(timeDelta) {
  var position = Point3D.add(this.eagle.transformation.position, new Vector3(0, 0.1, 0));
  this.transformation.setPosition(position);
};
