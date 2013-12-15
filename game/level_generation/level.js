function Level() {
  this.trees = [];
}

Level.prototype.addTree = function(tree) {
  this.trees.push(tree);
};
