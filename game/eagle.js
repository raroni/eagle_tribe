function Eagle(game) {
  Entity3.call(this);
  this.keyboard = Keyboard.getInstance();
}

Eagle.prototype.update = function(timeDelta) {
  if(this.keyboard.keysPressed.space) {
    this.transformation.translateY(0.001*timeDelta);
  } else {
    this.transformation.translateY(-0.0001*timeDelta);
  }

  if(this.keyboard.keysPressed.w || this.keyboard.keysPressed.s) {
    var forward = Direction3D.transform(Direction3D.forward(), this.transformation.getWorldMatrix());
    var translation = Vector3.multiply(forward, timeDelta*0.001);
    if(this.keyboard.keysPressed.s) translation.negate();
    this.transformation.translate(translation);
  }

  if(this.transformation.position[1] < 0) this.transformation.setPositionY(0);
};
