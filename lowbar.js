var _ = {};

_.identity = function (value) {
  return value;
};

_.first = function (array, n) {
  if (!Array.isArray(array)) return [];
  if (n) return array.slice(0, n);
  return array[0];
};

_.last = function (array, n) {
  if (!Array.isArray(array)) return [];
  if (n) return array.slice(-n);
  return array[array.length - 1];
};

_.each = function (list, iteratee) {
  if (Array.isArray(list) || typeof list === 'string') {
    for (var i = 0; i < list.length; i++) {
      iteratee(list[i], i, list);
    }
  }
  else {
    for (let key in list) {
      iteratee(list[key], key, list);
    }
  }
};

module.exports = _;