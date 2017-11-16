const _ = {};

_.identity = function (value) {
  return value;
};

_.first = function (array, n) {
  if (!Array.isArray(array)) return undefined;
  if (n) return array.slice(0, n);
  return array[0];
};

_.last = function (array, n) {
  if (!Array.isArray(array)) return undefined;
  if (n) return array.slice(-n);
  return array[array.length - 1];
};

_.each = function (list, iteratee, context) {
  if (!iteratee) return list;
  if (context) iteratee = iteratee.bind(context);
  if (Array.isArray(list) || typeof list === 'string') {
    for (let i = 0; i < list.length; i++) {
      iteratee(list[i], i, list);
    }
  }
  else {
    for (let key in list) {
      iteratee(list[key], key, list);
    }
  }
  return list;
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
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) return i;
  }
  return -1;
};

_.filter = function (list, predicate) {
  if (!Array.isArray(list)) return [];
  let result = [];
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) result.push(list[i]);
  }
  return result;
};

_.reject = function (list, predicate) {
  if (!Array.isArray(list)) return [];
  let result = [];
  for (let i = 0; i < list.length; i++) {
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
  // for (let i = 0; i < array.length; i++) {
  //   if (!uniqueArray.includes(array[i]))
  //     uniqueArray.push(array[i]);
  // }
  return uniqueArray;
};

_.map = function (list, iteratee, context) {
  if (context) iteratee = iteratee.bind(context);
  let newList = [];
  let nestedList = [];

  if (Array.isArray(list)) {
    _.each(list, (element) => {
      if (Array.isArray(element)) {
        for (let i = 0; i < element.length; i++) {
          nestedList.push(iteratee(element[i]));
        }
        newList.push(nestedList);
        nestedList = [];
      }
      if (!Array.isArray(element)) {
        newList.push(iteratee(element));
      }
    });
  }
  // for objects
  if (typeof list === 'object' && !Array.isArray(list)) {
    for (let key in list) {
      newList.push(iteratee(list[key]));
    }
  }
  return newList;
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
    for (let key in input) {
      if (input[key] === value) return true;
      else if (key === value) return true;
    }
  }
  return false;
};


_.pluck = function (list, propertyName) {
  if (!Array.isArray(list)) return undefined;
  let newArr = [];

  _.map(list, (element) => {
    for (let key in element) {
      if (propertyName === key) newArr.push(element[propertyName]);
    }
  });

  // *************** WITHOUT MAP ****************
  // for (let i = 0; i < list.length; i++) {
  //   for (let key in list[i]) {
  //     if (propertyName === key) { newArr.push(list[i][propertyName]); }
  //   }
  // }
  return newArr;
};

_.reduce = function (list, iteratee, memo, context) {
  if (!Array.isArray(list)) return undefined;
  if (context) iteratee = iteratee.bind(context);

  _.each(list, (element, index, list) => {
    if (memo === undefined) {
      memo = element;
      iteratee(memo, element, index, list);
    }
    else memo = iteratee(memo, element, index, list);
  });
  return memo;
};


_.every = function (list, predicate, context) {
  if (!Array.isArray(list)) return true;
  if (context) predicate = predicate.bind(context);

  if (Array.isArray(list) || typeof list === 'string') {
    for (let i = 0; i < list.length; i++) {
      if (!predicate(list[i])) return false;
    }
  }
  if (typeof list === 'object' && !Array.isArray(list)) {
    for (let key in list) {
      if (!predicate(list[key])) return false;
    }
  }
  return true;
};


module.exports = _;