Math.clamp = function(number, min, max) {
  number = Math.max(min, number);
  number = Math.min(max, number);
  return number;
};
