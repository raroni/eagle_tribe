function MouseRenderer(context, shaderProgram, mouse) {
  this.context = context;
  this.mouse = mouse;
  this.program = shaderProgram;
}

MouseRenderer.prototype.initialize = function() {
  this.vertexBufferHandle = this.context.createBuffer();
  this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBufferHandle);

  this.positionAttributeHandle = this.program.getAttributeHandle('position');
  this.colorAttributeHandle = this.program.getAttributeHandle('color');

  this.stride = 5*4;;

  var vertexData = new Float32Array([
    0, 0, 1, 0, 0,
    0, -0.1, 1, 0, 0,
    0.05, -0.08, 1, 0, 0
  ]);

  this.context.bufferData(this.context.ARRAY_BUFFER, vertexData, this.context.STATIC_DRAW);
};

MouseRenderer.prototype.draw = function() {
  this.program.use();

  this.program.setVector2Uniform("offset", this.mouse.getViewPosition());

  this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBufferHandle);

  this.context.vertexAttribPointer(this.positionAttributeHandle, 2, this.context.FLOAT, false, this.stride, 0);
  this.context.vertexAttribPointer(this.colorAttributeHandle, 3, this.context.FLOAT, false, this.stride, 2*4);

  this.context.drawArrays(this.context.TRIANGLES, 0, 3);
};
