function Vector4() {
  if(arguments.length === 0) {
    this[0] = 0;
    this[1] = 0;
    this[2] = 0;
    this[3] = 0;
  } else {
    this[0] = arguments[0];
    this[1] = arguments[1];
    this[2] = arguments[2];
    this[3] = arguments[3];
  }
}
