function WorldScene(game) {
  Scene.call(this, game);
  this.add(new Ground(game));
  var eagle = new Eagle(game);
  this.add(eagle);
  this.add(new CameraHandler(game, eagle));
}

WorldScene.prototype = Object.create(Scene.prototype);
