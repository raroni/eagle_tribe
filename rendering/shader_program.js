function ShaderProgram(context) {
  this.name = name;
  this.handle = context.createProgram();
  this.context = context;
  this.attributeHandles = {};
  this.uniformHandles = {};
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
  load: function(urlToken, callback) {
    this.loadedCallback = callback;
    var request = new Request('./shaders/' + urlToken + '.vertex', function(request) {
      this.handleShaderSource('vertex', request.response);
    }.bind(this));
    request.send();

    request = new Request('./shaders/' + urlToken + '.fragment', function(request) {
      this.handleShaderSource('fragment', request.response);
    }.bind(this));
    request.send();
  },
  handleShaderSource: function(type, source) {
    this[type + 'Source'] = source;
    if(this.fragmentSource && this.vertexSource) {
      this.compile();
      this.link();
      this.loadedCallback();
      delete this.loadedCallback;
    }
  },
  setMatrix4Uniform: function(uniformName, matrix) {
    var handle = this.getUniformHandle(uniformName);
    var array = new Float32Array(16);
    for(var i=0; 16>i; i++) array[i] = matrix[i];
    this.use();
    this.context.uniformMatrix4fv(handle, false, array);
  },
  setIntegerUniform: function(uniformName, integer) {
    var handle = this.getUniformHandle(uniformName);
    this.use();
    this.context.uniform1i(handle, integer);
  },
  setMatrix3Uniform: function(uniformName, matrix) {
    var handle = this.getUniformHandle(uniformName);
    var array = new Float32Array(9);
    for(var i=0; 9>i; i++) array[i] = matrix[i];
    this.use();
    this.context.uniformMatrix3fv(handle, false, array);
  },
  setVector3Uniform: function(uniformName, vector) {
    var handle = this.getUniformHandle(uniformName);
    var array = new Float32Array(3);
    for(var i=0; 3>i; i++) array[i] = vector[i];
    this.use();
    this.context.uniform3fv(handle, array);
  },
  setVector2Uniform: function(uniformName, vector) {
    var handle = this.getUniformHandle(uniformName);
    var array = new Float32Array(2);
    for(var i=0; 2>i; i++) array[i] = vector[i];
    this.use();
    this.context.uniform2fv(handle, array);
  },
  use: function() {
    this.context.useProgram(this.handle);
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
  },
  getUniformHandle: function(uniformName) {
    if(this.uniformHandles[uniformName]) return this.uniformHandles[uniformName];
    var handle = this.context.getUniformLocation(this.handle, uniformName);
    if(handle === null) throw "Could not find shader uniform '" + uniformName + "'.";
    this.context.enableVertexAttribArray(handle);
    this.uniformHandles[uniformName] = handle;
    return handle;
  },
  getAttributeHandle: function(attributeName) {
    if(this.attributeHandles[attributeName]) return this.attributeHandles[attributeName];
    var handle = this.context.getAttribLocation(this.handle, attributeName);
    if(handle === -1) throw "Could not find shader attribute '" + attributeName + "'.";
    this.context.enableVertexAttribArray(handle);
    this.attributeHandles[attributeName] = handle;
    return handle;
  }
};
