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

_.indexOf = function (array, value, isSorted) {
  
  if (isSorted) {
    let low = 1, high = array.length;
    while (low <= high) {
      let mid = low + (high - low) / 2;
      if (array[mid] === value) return mid;
      else if (array[mid] < value) low = mid + 1;
      else high = mid - 1;
    }
  }

  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) return i;
  }
  return -1;
};

module.exports = _;