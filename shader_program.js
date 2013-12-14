function ShaderProgram(context) {
  this.handle = context.createProgram();
  this.context = context;
}

ShaderProgram.prototype = {
  compile: function() {
    this.createShader('fragment', this.fragmentSource);
    this.createShader('vertex', this.vertexSource);
  },
  link: function() {
    this.context.linkProgram(this.handle);
    if(!this.context.getProgramParameter(this.handle, this.context.LINK_STATUS)) {
      throw "Could not link the shader program!";
    }
  },
  createShader: function(type, source) {
    var glType = type === 'fragment' ? this.context.FRAGMENT_SHADER : this.context.VERTEX_SHADER;
    var handle = this.context.createShader(glType);
    this.context.shaderSource(handle, source);
    this.context.compileShader(handle);
    if(!this.context.getShaderParameter(handle, this.context.COMPILE_STATUS)) {
      throw "Could not compile " + type + " shader:\n\n" + this.context.getShaderInfoLog(handle);
    }
    this.context.attachShader(this.handle, handle);
  }
};
