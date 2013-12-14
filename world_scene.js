function WorldScene(game) {
  Scene.call(this, game);
  this.setupGround();
}

WorldScene.prototype = Object.create(Scene.prototype);

WorldScene.prototype.setupGround = function() {
  var plane = new Plane(Point3.origin(), Direction3.up());
  var size = new Vector2(100, 100);
  var planeMesh = new PlaneMesh(plane, 100, 100);
  var rendering = new MeshRendering(planeMesh, { static: true });
  this.game.renderer.addMeshRendering(rendering);
};
