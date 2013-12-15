function Ground(game) {
  Entity3.call(this);
  var size = new Vector2(20, 20);
  var planeMesh = new PlaneMesh(Point3D.origin(), size, Direction3D.forward(), Direction3D.up(), new Color(0.1, 0.9, 0.3));
  this.transformation.setPositionZ(1);
  var rendering = new MeshRendering(this, planeMesh, { static: true });
  game.renderer.addMeshRendering(rendering);
}

Ground.prototype = Object.create(Entity3.prototype);
