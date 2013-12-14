function Renderer(canvas) {
  this.camera = new Camera();
  this.canvas = canvas;
  this.context = canvas.getContext("experimental-webgl");
  this.shaderProgram = new ShaderProgram(this.context);
  this.meshRenderers = [];
}

Renderer.prototype = {
  initialize: function(callback) {
    this.initializedCallback = callback;

    this.context.clearColor(0.0, 0.0, 0.0, 1.0);
    this.context.enable(this.context.DEPTH_TEST);

    this.canvas.width = 800;
    this.canvas.height = 600;

    this.context.viewport(0, 0, 800, 600);

    new Request('./shader.vertex', this.handleResponse.bind(this)).send();
    new Request('./shader.fragment', this.handleResponse.bind(this)).send();
  },
  handleResponse: function(request) {
    if(request.path === './shader.vertex') {
      this.shaderProgram.vertexSource = request.response;
    } else {
      this.shaderProgram.fragmentSource = request.response;
    }
    if(this.shaderProgram.vertexSource && this.shaderProgram.fragmentSource) {
      this.finalizeInitialization();
    }
  },
  finalizeInitialization: function() {
    this.shaderProgram.compile();
    this.shaderProgram.link();
    this.initializedCallback();
    delete this.initializedCallback;
  },
  draw: function() {
    this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
    
    if(this.currentStaticRenderer) {
      this.currentStaticRenderer.bake();
      delete this.currentStaticRenderer;
    }
    
    this.shaderProgram.use();
    for(var i=0; this.meshRenderers.length>i; i++) {
      this.meshRenderers[i].draw();
    }
  },
  add: function(meshRendering) {
    if(meshRendering.static) {
      if(!this.currentStaticRenderer) {
        this.currentStaticRenderer = new StaticMeshRenderer(this.context, this.shaderProgram);
        this.meshRenderers.push(this.currentStaticRenderer);
      }
      this.currentStaticRenderer.add(meshRendering);
    } else {
      console.log('should create dynamic renderer');
    }
  }
};
