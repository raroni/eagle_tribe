function Renderer(canvas) {
  this.context = canvas.getContext("experimental-webgl");
  this.program = new ShaderProgram(this.context);
  this.meshRenderers = [];
}

Renderer.prototype = {
  initialize: function(callback) {
    this.context.clearColor(0.0, 0.0, 0.0, 1.0);
    this.context.enable(this.context.DEPTH_TEST);

    this.initializedCallback = callback;
    new Request('./shader.vertex', this.handleResponse.bind(this)).send();
    new Request('./shader.fragment', this.handleResponse.bind(this)).send();
  },
  handleResponse: function(request) {
    if(request.path === './shader.vertex') {
      this.program.vertexSource = request.response;
    } else {
      this.program.fragmentSource = request.response;
    }
    if(this.program.vertexSource && this.program.fragmentSource) {
      this.finalizeInitialization();
    }
  },
  finalizeInitialization: function() {
    this.program.compile();
    this.program.link();
    this.initializedCallback();
    delete this.initializedCallback;
  },
  draw: function() {
    this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
    for(var i=0; this.meshRenderers.length>i; i++) {
      this.meshRenderers[i].draw();
    }
  },
  addMeshRendering: function(meshRendering) {
    if(meshRendering.static) {
      console.log('should create static renderer');
    } else {
      console.log('should create dynamic renderer');
    }
  }
};
