function MenuScene(game) {
  console.log('menu scene!');
  Scene.call(this, game);
  this.add(new StartButton(game));
}

MenuScene.prototype = Object.create(Scene.prototype);
