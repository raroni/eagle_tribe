function Scene(game) {
  this.entities = [];
  this.game = game;
}

Scene.prototype = {
  update: function(timeDelta) {
    var entity;
    for(var i=0; this.entities.length>i; i++) {
      entity = this.entities[i];
      if(entity.update) entity.update(timeDelta);
    }
  },
  add: function(entity) {
    this.entities.push(entity);
  },
  exit: function() {
    this.game.clickManager.clear();
    this.game.renderer.clear();
    this.game.mouse.show();
  }
};
