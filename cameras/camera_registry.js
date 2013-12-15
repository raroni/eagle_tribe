function CameraRegistry(screen) {
  this.map = {};
  this.add('perspective', new PerspectiveCamera(screen));
  this.add('camera2D', new Camera2D(screen));
}

CameraRegistry.prototype.add = function(name, camera) {
  if(this.map[name]) throw "Camera name already taken.";
  this.map[name] = camera;
};

CameraRegistry.prototype.get = function(name) {
  var camera = this.map[name];
  if(!camera) throw "Camera not found.";
  return camera;
};
