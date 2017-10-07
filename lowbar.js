var _ = {};

_.identity = function (value) {
  return value;
};


_.first = function (array, n) {
  if (!Array.isArray(array)) return [];
  if (n) return array.slice(0, n);
  return array[0];
};

_.last = function(array, n) {
  if (!Array.isArray(array)) return [];
  if (n) return array.slice(-n);
  return array[array.length - 1];
};
module.exports = _;