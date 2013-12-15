function WorldScene(game) {
  Scene.call(this, game);
  this.setupLevel();
  this.setupLight();
  this.add(new Ground(this.game));
  var eagle = new Eagle(this.game);
  this.add(eagle);
  this.add(new CameraHandling(this.game, eagle));
  this.game.mouse.hide();
}

WorldScene.prototype = Object.create(Scene.prototype);

WorldScene.prototype.setupLevel = function() {
  var levelGenerator = new LevelGenerator();
  var level = levelGenerator.getLevel();

  for(var i=0; level.trees.length>i; i++) {
    this.add(new Tree(this.game, new Point3D(level.trees[i].x, 0, level.trees[i].y)));
  }
};

WorldScene.prototype.setupLight = function() {
  var directionalLight1 = new DirectionalLight();
  directionalLight1.direction = Vector3.normalize(new Vector3(-0.5, -1, 0));
  directionalLight1.intensity = new Color(0.3, 0.3, 0.3);
  this.game.renderer.setDirectionalLight(directionalLight1, 1);

  var directionalLight2 = new DirectionalLight();
  directionalLight2.direction = Vector3.normalize(new Vector3(0.5, 1, 0));
  directionalLight2.intensity = new Color(0.1, 0.1, 0.1);
  this.game.renderer.setDirectionalLight(directionalLight2, 2);

  var ambientLight = new Color(0.5, 0.5, 0.5);
  this.game.renderer.setAmbientLightIntensity(ambientLight);
};
