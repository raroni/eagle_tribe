function LevelGenerator() {
  this.clearings = {};
}

LevelGenerator.prototype.getLevel = function() {
  if(!this.level) this.generate();
  return this.level;
};

LevelGenerator.prototype.generate = function() {
  this.level = new Level();
  //this.createStartClearing();
  this.createPaths();
  this.growForest();
};

LevelGenerator.prototype.growForest = function() {
  var size = 50, position;
  for(var x=-size; size>=x; x++) {
    for(var y=-size; size>=y; y++) {
      position = new Point2D(x, y)
      if(
        !this.clearings[x + '-' + y] &&
        position.getLength() < size
      ) {
        this.level.addTree({ position: position });
      }
    }
  }
};

LevelGenerator.prototype.createStartClearing = function() {
  var size = 4, position;
  for(var x=-size; size>=x; x++) {
    for(var y=-size; size>=y; y++) {
      position = new Point2D(x, y);
      if(position.getLength() < 3.5) {
        this.clearings[x + '-' + y] = true;
      }
    }
  }
};

LevelGenerator.prototype.createPaths = function() {
  var x, y, width, momentum;
  for(var p=0; 5>p; p++) {
    position = new Point2D();
    momentum = Vector2.multiply(new Vector2(Math.random(), Math.random()), Math.random()-0.5);
    width = 0.25;
    for(var t=0; 50>t; t++) {
      position.add(Vector2.normalize(momentum));
      momentum.add(Vector2.multiply(new Vector2(Math.random(), Math.random()), Math.random()-0.5));
      width += (Math.random())-.5;
      width = Math.max(width, 0.5);
      for(var a=-width; width>=a; a+=width) {
        for(var b=-width; width>=b; b+=width) {
          this.clearings[(Math.round(position[0]+a)) + '-' + (Math.round(position[1]+b))] = true;
        }
      }
    }
  }
};
