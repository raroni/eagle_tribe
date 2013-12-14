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
  if(this.transformation.position[1] < 0) this.transformation.setPositionY(0);
};
