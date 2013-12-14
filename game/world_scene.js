function WorldScene(game) {
  Scene.call(this, game);
  this.add(new Ground(game));
  this.add(new CameraHandler(game));
}

WorldScene.prototype = Object.create(Scene.prototype);
