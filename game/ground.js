function Ground(game) {
  Entity3.call(this);
  var size = new Vector2(200, 200);
  var planeMesh = new PlaneMesh(Point3D.origin(), size, Direction3D.forward(), Direction3D.up(), new Color(0.52, 0.91, 0.32));
  this.transformation.setPositionZ(1);
  var rendering = new MeshRendering(this, planeMesh, { static: true });
  this.createVariations(game);
  game.renderer.addMeshRendering(rendering);
}

Ground.prototype = Object.create(Entity3.prototype);

Ground.prototype.createVariations = function(game) {
  var size, planeMesh, rendering, color, forward;
  for(var i=0; 200>i; i++) {
    size = new Vector2(Math.random()*10, Math.random()*10);
    color = new Color(
      0.52+(Math.random()*0.2-0.1),
      0.91+(Math.random()*0.2-0.1),
      0.32+(Math.random()*0.2-0.1)
    );
    position = new Point3D(Math.random()*80-40, 0.05*Math.random(), Math.random()*80-40);
    forward = Direction3D.transform(Direction3D.forward(), Matrix4.yRotation(Math.random()*Math.PI*0.5));
    planeMesh = new PlaneMesh(position, size, forward, Direction3D.up(), color);
    this.transformation.setPositionZ(1);
    rendering = new MeshRendering(this, planeMesh, { static: true });
    game.renderer.addMeshRendering(rendering);
  }
};
