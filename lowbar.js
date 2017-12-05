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
  _.each(list, (element, index, list) => {
    newList.push(iteratee(element, index, list));
  });
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
      if (input[i] === value) return true;
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

_.some = function (list, predicate, context) {
  if (context) predicate = predicate.bind(context);
  if (Array.isArray(list) || typeof list === 'string') {
    for (let i = 0; i < list.length; i++) {
      if (predicate(list[i])) return true;
    }
  }
  if (typeof list === 'object' && !Array.isArray(list)) {
    for (let key in list) {
      if (predicate(list[key])) return true;
    }
  }
  return false;
};

_.extend = function (destination, sources) {
  if (typeof destination === 'object' && destination !== null) {
    sources = [].slice.call(arguments, 1);
    Object.assign(destination, ...sources);
  }
  return destination;
};

_.defaults = function (object, defaults) {
  for (let i = 1; i < arguments.length; i++) {
    defaults = arguments[i];
    for (let key in defaults) {
      if (object[key] === undefined) {
        object[key] = defaults[key];
      }
    }
  }
  return object;
};

_.once = function (fn) {
  let returnValue, called = false;
  return function () {
    if (!called) {
      called = true;
      returnValue = fn.apply(this, arguments);
    }
    return returnValue;
  };
};

_.negate = function (predicate) {
  return function () {
    return !predicate.apply(this, arguments);
  };
};

_.shuffle = function (list) {
  if (typeof list !== 'object' && typeof list !== 'string') return [];
  if (Array.isArray(list)) {
    list = [...list];
  }
  else if (typeof list === 'string') {
    list = list.split('');
  }
  else if (typeof list === 'object' && list !== null) {
    list = Object.values(list);
  }
  let shuffled = list.length, t, i;
  while (shuffled) {
    i = Math.floor(Math.random() * shuffled--);
    t = list[shuffled];
    list[shuffled] = list[i];
    list[i] = t;
  }
  return list;
};

_.invoke = function (list, methodName, args) {
  if (typeof list !== 'object') return [];
  args = [].slice.call(arguments, 2);
  return _.map(list, (value) => {
    return value[methodName].apply(value, args);
  });
};

_.sortBy = function (list, iteratee, context) {
  if (context) iteratee = iteratee.bind(context);
  if (typeof list !== 'object' && typeof list !== 'string') return [];
  let listCopy;
  if (typeof iteratee === 'string') {
    listCopy = [...list];
    return listCopy.sort((a, b) => {
      if (a[iteratee] < b[iteratee]) return -1;
      if (a[iteratee] > b[iteratee]) return 1;
      return 0;
    });
  }
  Array.isArray(list) ? listCopy = [...list] : listCopy = list.split('');
  return listCopy.sort((a, b) => {
    if (iteratee(a) < iteratee(b)) return -1;
    if (iteratee(a) > iteratee(b)) return 1;
    return 0;
  });
};

_.zip = function (arrays) {
  if (!Array.isArray(arrays) && typeof arrays !== 'string') return [];
  let result = [];
  arrays = [].slice.apply(arguments);
  for (let i = 0; i < arrays.length; i++) {
    _.map(arrays[i], (element, index) => {
      if (result[index]) result[index].push(element);
      else result[index] = [element];
    });
  }
  return result;
};

_.sortedIndex = function (array, obj, iteratee, context) {
  if (!Array.isArray(array) && typeof array !== 'string') return 0;
  if (context) iteratee = iteratee.bind(iteratee);
  iteratee = iteratee || _.identity;
  let prop = iteratee;
  iteratee = (typeof iteratee === 'string' || iteratee instanceof String) ? (elem) => elem[prop] : iteratee;
  let value = iteratee(obj);
  let low = 0, high = array.length - 1;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
  }
  return low;
};

_.flatten = function (array, shallow) {
  if (!Array.isArray(array) && typeof array !== 'string') return [];
  if (typeof array === 'string') return array.split('');

  return _.reduce(array, (flattened, item) => {
    if (Array.isArray(item) && (!shallow)) item = _.flatten(item);
    return flattened.concat(item);
  }, []);
};

_.intersection = function (arrays) {
  arrays = [].slice.call(arguments);
  if (!Array.isArray(arrays[0]) && typeof arrays[0] !== 'string') return [];
  if (typeof arrays[0] === 'string') arrays[0] = arrays[0].split('');
  return _.reduce(arrays[0], (result, item) => {
    let isPresent = true;
    _.each(arrays, (list) => {
      if (!_.contains(list, item)) isPresent = false;
    });
    if (isPresent && !_.contains(result, item)) result.push(item);
    return result;
  }, []);
};

_.difference = function (array, others) {
  if (!Array.isArray(array) && typeof array !== 'string') return [];
  if (typeof array === 'string') return array.split('');
  others = _.flatten(others.slice.call(arguments, 1));
  return _.filter(array, (value) => {
    return !_.contains(others, value);
  });
};

module.exports = _;