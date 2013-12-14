function Renderer(canvas) {
  this.context = canvas.getContext("experimental-webgl");
  this.program = new ShaderProgram(this.context);
}

Renderer.prototype = {
  initialize: function(callback) {
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
    
  }
};
