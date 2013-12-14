function Eagle(game) {
  Entity3.call(this);
  this.keyboard = Keyboard.getInstance();
  this.speed = 0.0017;
}

Eagle.prototype.update = function(timeDelta) {
  if(this.keyboard.keysPressed.space) {
    this.transformation.translateY(this.speed*timeDelta);
  }
  if(this.transformation.position[1] != 0) {
    this.transformation.translateY(-0.0002*timeDelta);
  }

  var translation, forward;
  if(this.keyboard.keysPressed.w || this.keyboard.keysPressed.s || this.keyboard.keysPressed.a || this.keyboard.keysPressed.d) {
    forward = Direction3D.transform(Direction3D.forward(), this.transformation.getWorldMatrix());
  }
  if(this.keyboard.keysPressed.w || this.keyboard.keysPressed.s) {
    translation = Vector3.multiply(forward, timeDelta*this.speed);
    if(this.keyboard.keysPressed.s) translation.negate();
    this.transformation.translate(translation);
  }
  if(this.keyboard.keysPressed.a || this.keyboard.keysPressed.d) {
    var left = Direction3D.cross(forward, Direction3D.up());
    translation = Vector3.multiply(left, timeDelta*this.speed);
    if(this.keyboard.keysPressed.d) translation.negate();
    this.transformation.translate(translation);
  }

  if(this.keyboard.keysPressed.r) {
    this.transformation.rotateY(0.02);
  }

  if(this.keyboard.keysPressed.q) {
    this.transformation.rotateX(0.02);
  }

  if(this.transformation.position[1] < 0) {
    this.transformation.setPositionY(0);
  }
};
