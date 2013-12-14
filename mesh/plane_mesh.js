function PlaneMesh(center, size, forward, normal, color) {
  Mesh.call(this);

  this.color = color;
  this.normal = normal;

  var right = Direction3D.negate(Direction3D.cross(forward, normal));

  var halfRight = Vector3.multiply(right, 0.5*size[0]);
  var halfForward = Vector3.multiply(forward, 0.5*size[1]);

  var farLeft = Vector3.add(center, halfForward);
  farLeft.subtract(halfRight);

  var farRight = Vector3.add(center, halfForward);
  farRight.add(halfRight);

  var nearLeft = Vector3.subtract(center, halfForward);
  nearLeft.subtract(halfRight);

  var nearRight = Vector3.subtract(center, halfForward);
  nearRight.add(halfRight);

  this.addVertex(this.createVertex(farLeft));
  this.addVertex(this.createVertex(farRight));
  this.addVertex(this.createVertex(nearLeft));
  this.addVertex(this.createVertex(nearRight));
  
  this.addFace(0, 2, 1);
  this.addFace(1, 2, 3);
}

PlaneMesh.prototype = Object.create(Mesh.prototype);

PlaneMesh.prototype.createVertex = function(position) {
  return new Vertex(position, this.color, this.normal);
};
