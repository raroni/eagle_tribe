function WorldScene(game) {
  Scene.call(this, game);
  this.add(new Ground(game));
}

WorldScene.prototype = Object.create(Scene.prototype);
