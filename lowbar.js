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


_.filter = function (list, predicate) {
  if (!Array.isArray(list)) return [];
  let result = [];

  for (var i = 0; i < list.length; i++) {
    if (predicate(list[i])) result.push(list[i]);
  }
  return result;
};

_.reject = function (list, predicate) {
  if (!Array.isArray(list)) return [];
  let result = [];

  for (var i = 0; i < list.length; i++) {
    if (!predicate(list[i])) result.push(list[i]);
  }
  return result;
};

_.uniq = function (array) {
  if (!Array.isArray(array)) return [];

  let uniqueArray = [];

  _.each(array, (element) => {
    if (!uniqueArray.includes(element)) {
      uniqueArray.push(element);
    }
  });

  // ***********WITHOUT _.each*************
  // for (var i = 0; i < array.length; i++) {
  //   if (!uniqueArray.includes(array[i]))
  //     uniqueArray.push(array[i]);
  // }
  return uniqueArray;
};

_.map = function (array, iteratee) {
  let newArray = [];
  let nestedArray = [];

  if (Array.isArray(array)) {

    _.each(array, (element) => {
      if (Array.isArray(element)) {

        for (var i = 0; i < element.length; i++) {
          nestedArray.push(iteratee(element[i]));
        }
        newArray.push(nestedArray);
        nestedArray = [];
      }

      if (!Array.isArray(element)) {
        newArray.push(iteratee(element));
      }
    });
  }

  // for objects
  if (typeof array === 'object' && !Array.isArray(array)) {
    for (var key in array) {
      newArray.push(iteratee(array[key]));
    }
  }
  return newArray;
};

_.contains = function (input, value) {
  if (!Array.isArray(input)) {
    for (let i = 0; i < input.length; i++) {
      if (input[i] === value) return true;
    }
  }
  if (Array.isArray(input)) {
    for (let i = 0; i < input.length; i++) {
      if (input[i] === value) {
        return true;
      }
    }
  }
  if (typeof input === 'object' && !Array.isArray(input)) {
    for (var key in input) {
      if (input[key] === value) return true;
      else if (key === value) return true;
    }
  }
  return false;
};

module.exports = _;