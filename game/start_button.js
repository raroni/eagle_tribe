function StartButton(game) {
  Entity2.call(this);
  var rectangle = new Rectangle(new Vector2(0.5, 0.5));
  var clickable = new Clickable(rectangle);
  game.clickManager.add(clickable);
  var rendering = new SpriteRendering(this, game.sprites.get('startButton'), rectangle);
  game.renderer.addSpriteRendering(rendering);
}

StartButton.prototype = Object.create(Entity2.prototype);
