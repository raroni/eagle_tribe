function StartButton(game) {
  Entity2.call(this);

  var sprite = game.sprites.get('startButton');
  var rectangle = new Rectangle(Vector2.multiply(new Vector2(sprite.getAspectRatio(), 1), 0.2));
  var clickable = new Clickable(this, rectangle, this.clicked.bind(this));
  game.clickManager.add(clickable);
  var rendering = new SpriteRendering(sprite, this.transformation, rectangle);
  game.renderer.addSpriteRendering(rendering);
}

StartButton.prototype = Object.create(Entity2.prototype);

StartButton.prototype.clicked = function() {
  console.log('Start button clicked!');
};
