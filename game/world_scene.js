function WorldScene(game) {
  Scene.call(this, game);
  this.setupLight();
  this.add(new Ground(game));
  var eagle = new Eagle(game);
  this.add(eagle);
  this.add(new CameraHandler(game, eagle));
  this.add(new Tree(game));
}

WorldScene.prototype = Object.create(Scene.prototype);

WorldScene.prototype.setupLight = function() {
  var directionalLight = new DirectionalLight();
  directionalLight.direction = Vector3.normalize(new Vector3(-0.3, -1, 0));
  directionalLight.intensity = new Color(0.3, 0.3, 0.3);
  this.game.renderer.setDirectionalLight(directionalLight);

  var ambientLight = new Color(0.5, 0.5, 0.5);
  this.game.renderer.setAmbientLightIntensity(ambientLight);
};
