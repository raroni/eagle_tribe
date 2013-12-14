function BoxMesh(transformation, color) {
  Mesh.call(this);

  this.color = color;

  // front
  this.addVertex(this.createVertex(new Point3D(-1, -1, -1)));
  this.addVertex(this.createVertex(new Point3D(1, -1, -1)));
  this.addVertex(this.createVertex(new Point3D(1, 1, -1)));
  this.addVertex(this.createVertex(new Point3D(-1, 1, -1)));
  this.addFace(0, 1, 2);
  this.addFace(2, 3, 0);

  // back
  this.addVertex(this.createVertex(new Point3D(1, 1, 1)));
  this.addVertex(this.createVertex(new Point3D(1, -1, 1)));
  this.addVertex(this.createVertex(new Point3D(-1, -1, 1)));
  this.addVertex(this.createVertex(new Point3D(-1, 1, 1)));
  this.addFace(4, 5, 6);
  this.addFace(6, 7, 4);

  // right
  this.addVertex(this.createVertex(new Point3D(1, 1, -1)));
  this.addVertex(this.createVertex(new Point3D(1, -1, -1)));
  this.addVertex(this.createVertex(new Point3D(1, 1, 1)));
  this.addVertex(this.createVertex(new Point3D(1, -1, 1)));
  this.addFace(8, 9, 10);
  this.addFace(10, 9, 11);
  
  // left
  this.addVertex(this.createVertex(new Point3D(-1, 1, 1)));
  this.addVertex(this.createVertex(new Point3D(-1, -1, -1)));
  this.addVertex(this.createVertex(new Point3D(-1, 1, -1)));
  this.addVertex(this.createVertex(new Point3D(-1, -1, 1)));
  this.addFace(12, 13, 14);
  this.addFace(15, 13, 12);
  
  // top
  this.addVertex(this.createVertex(new Point3D(-1, 1, -1)));
  this.addVertex(this.createVertex(new Point3D(1, 1, -1)));
  this.addVertex(this.createVertex(new Point3D(-1, 1, 1)));
  this.addVertex(this.createVertex(new Point3D(1, 1, 1)));
  this.addFace(16, 17, 18);
  this.addFace(18, 17, 19);

  for(var i=0; this.vertices.length>i; i++) {
    this.vertices[i].position.transform(transformation);
  }
}

BoxMesh.prototype = Object.create(Mesh.prototype);

BoxMesh.prototype.createVertex = function(position) {
  return new Vertex(position, this.color, new Direction3D(0, 1, 0)); // should fix normal
}
