function Ground(game) {
  Entity3.call(this);
  var size = new Vector2(200, 200);
  var planeMesh = new PlaneMesh(Point3D.origin(), size, Direction3D.forward(), Direction3D.up(), new Color(0.52, 0.91, 0.32));
  this.transformation.setPositionZ(1);
  var rendering = new MeshRendering(this, planeMesh, { static: true });
  game.renderer.addMeshRendering(rendering);
}

Ground.prototype = Object.create(Entity3.prototype);
