function MenuScene(game) {
  Scene.call(this, game);
  this.add(new StartButton(game));
}

MenuScene.prototype = Object.create(Scene.prototype);
