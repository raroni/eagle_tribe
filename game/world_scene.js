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
  var directionalLight1 = new DirectionalLight();
  directionalLight1.direction = Vector3.normalize(new Vector3(-0.3, -1, 0));
  directionalLight1.intensity = new Color(0.3, 0.3, 0.3);
  this.game.renderer.setDirectionalLight(directionalLight1, 1);

  var directionalLight2 = new DirectionalLight();
  directionalLight2.direction = Vector3.normalize(new Vector3(-0.3, 1, 0));
  directionalLight2.intensity = new Color(0.1, 0.1, 0.1);
  this.game.renderer.setDirectionalLight(directionalLight2, 2);


  var ambientLight = new Color(0.5, 0.5, 0.5);
  this.game.renderer.setAmbientLightIntensity(ambientLight);
};
