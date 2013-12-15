function LoadingScene(game) {
  Scene.call(this, game);
  this.atlas1 = new Image();
  this.atlas1.addEventListener('load', this.loaded.bind(this));
  this.atlas1.src = './resources/atlas1.png';
}

LoadingScene.prototype = Object.create(Scene.prototype);

LoadingScene.prototype.loaded = function() {
  var texture = new Texture(this.game.renderer.context, this.atlas1);
  this.game.textures.add('atlas1', texture);

  var startButtonSprite = new Sprite(texture, new Rectangle(new Vector2(0.3125, 0.125), new Point2D(0.15625, 0.0625)));
  this.game.sprites.add('startButton', startButtonSprite);

  this.game.changeScene("menu");
};
