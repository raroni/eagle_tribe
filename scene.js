function Scene(game) {
  this.entities = [];
  this.game = game;
}

Scene.prototype = {
  update: function(timeDelta) {
    for(var i=0; this.entities.length>i; i++) {
      this.entities[i].update(timeDelta);
    }
  }
};
