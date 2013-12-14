function Request(path, callback) {
  this.path = path;
  this.callback = callback;
  this.transport = new XMLHttpRequest();
  this.transport.onreadystatechange = this.onReadyStatechange.bind(this);
}

Request.prototype.onReadyStatechange = function() {
  if(this.transport.readyState === 4) {
    this.response = this.transport.responseText;
    this.callback(this);
  }
}

Request.prototype.send = function() {
  this.transport.open('GET', this.path);
  this.transport.send();
}
