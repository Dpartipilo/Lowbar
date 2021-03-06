const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_', () => {
  'use strict';
  it('is an object', () => {
    expect(_).to.be.an('object');
  });
});

describe('#identity', () => {
  it('is a function', () => {
    expect(_.identity).to.be.a('function');
  });
  it('returns the same output as the argument', () => {
    expect(_.identity('hello')).to.equal('hello');
    expect(_.identity(123)).to.equal(123);
    expect(_.identity([1, 2, '3', 4, 5])).to.eql([1, 2, '3', 4, 5]);
    expect(_.identity(true)).to.equal(true);
    expect(_.identity({ name: 'Tom' })).to.eql({ name: 'Tom' });
  });
});

describe('#first', () => {
  it('is a function', () => {
    expect(_.first).to.be.a('function');
  });
  it('returns undefined for invalid arguments', () => {
    expect(_.first()).to.be.undefined;
    expect(_.first(5)).to.be.undefined;
    expect(_.first('string')).to.be.undefined;
    expect(_.first({})).to.be.undefined;
  });
  it('returns the first index of the array', () => {
    expect(_.first([1, 2, 3])).to.eql(1);
    expect(_.first(['A', 'B', 'C'])).to.eql('A');
  });
  it('returns the first n elements of the array when a 2nd argument is given.', () => {
    expect(_.first.length).to.equal(2);
    expect(_.first([1, 2, 3, 4], 2)).to.eql([1, 2]);
    expect(_.first([1, 2, '3', '4', 5, 6, 7], 4)).to.eql([1, 2, '3', '4']);
    expect(_.first([1, 2, '3', { name: 'catch' }, 5, 6, 7], 4)).to.eql([1, 2, '3', { name: 'catch' }]);
  });
});

describe('#last', () => {
  it('is a function', () => {
    expect(_.last).to.be.a('function');
  });
  it('returns undefined for invalid input', () => {
    expect(_.last(123)).to.be.undefined;
    expect(_.last(false)).to.be.undefined;
    expect(_.last({ 1: 'a', 2: 'b', 3: 'c', })).to.be.undefined;
  });
  it('returns the last index of the array', () => {
    expect(_.last([1, 2, 3])).to.eql(3);
    expect(_.last(['A', 'B', 'C'])).to.eql('C');
  });
  it('returns the last n elements of the array when a 2nd argument is given.', () => {
    expect(_.last.length).to.equal(2);
    expect(_.last([1, 2, 3, 4], 2)).to.eql([3, 4]);
    expect(_.last([1, 2, '3', '4', 5, 6, 7], 4)).to.eql(['4', 5, 6, 7]);
    expect(_.last([4, 5, 1, 2, '3', { name: 'catch' }], 4)).to.eql([1, 2, '3', { name: 'catch' }]);
  });
});

describe('#each', () => {
  it('is a function', () => {
    expect(_.each).to.be.a('function');
  });
  it('returns the list if no iteratee is passed', () => {
    expect(_.each([1, 2, 3, 4, 5])).to.eql([1, 2, 3, 4, 5]);
  });
  it('it should count the number of iterations in the function', () => {
    const spy = sinon.spy();
    _.each([1, 2, 3], spy);
    expect(spy.callCount).to.equal(3);
  });
  it('calls the iteratee passing each element of the array as the first argument', () => {
    const spy = sinon.spy();
    _.each([1, 2, 3], spy);
    expect(spy.firstCall.calledWithExactly(1, 0, [1, 2, 3])).to.equal(true);
    expect(spy.secondCall.calledWithExactly(2, 1, [1, 2, 3])).to.equal(true);
    expect(spy.thirdCall.calledWithExactly(3, 2, [1, 2, 3])).to.equal(true);
  });
  describe('works for objects', () => {
    it('it should count the number of iterations in the function', () => {
      const spy = sinon.spy();
      _.each({ one: 1, two: 2, three: 3 }, spy);
      expect(spy.callCount).to.equal(3);
    });
    it('calls the iteratee passing each element of the object as the first argument', () => {
      const spy = sinon.spy();
      _.each({ one: 1, two: 2, three: 3 }, spy);
      expect(spy.firstCall.calledWithExactly(1, 'one', { one: 1, two: 2, three: 3 })).to.equal(true);
      expect(spy.secondCall.calledWithExactly(2, 'two', { one: 1, two: 2, three: 3 })).to.equal(true);
      expect(spy.thirdCall.calledWithExactly(3, 'three', { one: 1, two: 2, three: 3 })).to.equal(true);
    });
    it('binds the iteratee to the context if one is given', () => {
      const context = ['D', 'i', 'e', 'g', 'o'];
      const result = [];
      _.each([0, 1, 2, 3, 4], function (num) { result.push(this[num]); }, context);
      expect(result).to.eql(['D', 'i', 'e', 'g', 'o']);
    });
  });
});

describe('#indexOf', () => {
  it('is a function', () => {
    expect(_.indexOf).to.be.a('function');
  });
  it('the function takes 3 arguments 3rd boolean [optional]', () => {
    expect(_.indexOf.length).to.equal(3);
  });
  it('return the index of the value in the array', () => {
    expect(_.indexOf([1, 2, 3, 'a'], 3)).to.eql(2);
    expect(_.indexOf([1, 2, 3, 'a'], 'a')).to.eql(3);
  });
  it('return -1 if value is not present in the array', () => {
    expect(_.indexOf([1, 2, 3, 'a'], 4)).to.eql(-1);
  });
  it('if the array is sorted apply binary search', () => {
    expect(_.indexOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 9, true)).to.eql(8);
  });
});

describe('#filter', () => {
  it('is a function', () => {
    expect(_.filter).to.be.a('function');
  });
  it('returns an empty array for invalid arguments', () => {
    expect(_.filter('test')).to.eql([]);
    expect(_.filter({})).to.eql([]);
    expect(_.filter(4)).to.eql([]);
  });
  it('returns an array of all the values that pass a truth test', () => {
    expect(_.filter([1, 2, 3, 4], (elem) => elem % 2 === 0)).to.eql([2, 4]);
    expect(_.filter([1, 'a', 3, 'b'], (elem) => typeof elem === 'string')).to.eql(['a', 'b']);
    expect(_.filter([1, 'a', 3, 'b'], (elem) => typeof elem === 'number')).to.eql([1, 3]);
  });
});

describe('#reject', () => {
  it('is a function', () => {
    expect(_.reject).to.be.a('function');
  });
  it('returns an empty array for invalid arguments', () => {
    expect(_.reject('test')).to.eql([]);
    expect(_.reject({})).to.eql([]);
    expect(_.reject(4)).to.eql([]);
  });
  it('returns an array of all the values that does not pass a truth test', () => {
    expect(_.reject([1, 2, 3, 4], (num) => num % 2 === 0)).to.eql([1, 3]);
    expect(_.reject([1, 'a', 3, 'b'], (elem) => typeof elem === 'number')).to.eql(['a', 'b']);
    expect(_.reject([1, 'a', 3, 'b'], (elem) => typeof elem === 'string')).to.eql([1, 3]);
  });
});

describe('#uniq', () => {
  it('is a function', () => {
    expect(_.uniq).to.be.a('function');
  });
  it('returns an empty array for invalid arguments', () => {
    expect(_.uniq('test')).to.eql([]);
    expect(_.uniq({})).to.eql([]);
    expect(_.uniq(4)).to.eql([]);
  });
  it('returns an array with only 1st occurence of each value', () => {
    expect(_.uniq([1, 2, 2, 3, 3, 1, 4])).to.eql([1, 2, 3, 4]);
    expect(_.uniq([1, 2, '2', 3, 3, '2', 1, 4])).to.eql([1, 2, '2', 3, 4]);
    expect(_.uniq([1, 2, [2, 3], 3, 1, 4])).to.eql([1, 2, [2, 3], 3, 4]);
  });
});

describe('#map', () => {
  it('is a function', () => {
    expect(_.map).to.be.a('function');
  });
  it('return an empty array if the passed argument is not an array', () => {
    expect(_.map(undefined)).to.eql([]);
    expect(_.map(5, (num) => { return num * 2; })).to.eql([]);
    expect(_.map(true, (bool) => { return bool === true; })).to.eql([]);
  });
  it('Produces a new array of values by mapping each value in list through a transformation function (iteratee)', () => {
    expect(_.map([1, 2, 3], (num) => num * 3)).to.eql([3, 6, 9]);
  });
  describe('works for objects', () => {
    it('if it\'s and object, it returns an array with the resulted values', () => {
      expect(_.map({ one: 1, two: 2, three: 3 }, (num) => num * 3)).to.eql([3, 6, 9]);
    });
  });
  it('binds the iteratee to the context if one is given', () => {
    const context = [1, 2, 3, 4, 5];
    const result = [];
    _.map([0, 1, 2, 3, 4], function (num) { result.push(this[num] + num); }, context);
    expect(result).to.eql([1, 3, 5, 7, 9]);
  });
});

describe('#contains', () => {
  it('is a function', () => {
    expect(_.contains).to.be.a('function');
  });
  it('returns false if the value is not present', () => {
    expect(_.contains('Hello', 'd')).to.equal(false);
    expect(_.contains({ name: 'moe', age: 40 }, 'maria')).to.equal(false);
    expect(_.contains([1, '2', 3, 4], 5)).to.equal(false);
  });
  it('returns true if the value is present in a string', () => {
    expect(_.contains('Hello', 'e')).to.equal(true);
    expect(_.contains('Hello', 'o')).to.equal(true);
    expect(_.contains('Hello World', 'W')).to.equal(true);
  });
  it('returns true if the value is present in an object', () => {
    expect(_.contains({ name: 'moe', age: 40 }, 'moe')).to.equal(true);
    expect(_.contains({ name: 'moe', age: 40 }, 40)).to.equal(true);
    expect(_.contains({ name: 'moe', age: 40 }, 'name')).to.equal(true);
    expect(_.contains({ name: 'moe', age: 40 }, 'age')).to.equal(true);
  });
  it('returns true if the value is present in an array', () => {
    expect(_.contains([1, 2, 3, 4], 3)).to.equal(true);
    expect(_.contains([1, '2', 3, 4], '2')).to.equal(true);
  });
});

describe('#pluck', () => {
  it('is a function', () => {
    expect(_.pluck).to.be.a('function');
  });
  it('should return undefined for invalid arguments', () => {
    expect(_.pluck('str')).to.be.undefined;
    expect(_.pluck(5)).to.be.undefined;
    expect(_.pluck(undefined)).to.be.undefined;
    expect(_.pluck({})).to.be.undefined;
  });
  it('return a array of property values', () => {
    expect(_.pluck([{ name: 'moe', age: 40 }], 'age')).to.eql([40]);
    expect(_.pluck([{ name: 'moe', age: 40 }], 'name')).to.eql(['moe']);
    expect(_.pluck([
      { name: 'moe', age: 40 },
      { name: 'mia', age: 35 },
      { name: 'jack', age: 25 }], 'name'))
      .to.eql(['moe', 'mia', 'jack']);
  });
});

describe('#reduce', () => {
  it('returns undefined for invalid arguments', () => {
    expect(_.reduce('str')).to.be.undefined;
    expect(_.reduce({})).to.be.undefined;
    expect(_.reduce(undefined)).to.be.undefined;
  });
  it('calls the iteratee as many times as elements in the list', () => {
    const spy = sinon.spy();
    _.reduce([1, 2, 3], spy);
    expect(spy.callCount).to.eql(3);
  });
  it('passes (accumulator, element, index, list) to the iteratee', () => {
    const spy = sinon.spy((memo, element) => memo + element);
    _.reduce([1, 2, 3], spy, 0);
    expect(spy.firstCall.calledWithExactly(0, 1, 0, [1, 2, 3])).to.equal(true);
    expect(spy.secondCall.calledWithExactly(1, 2, 1, [1, 2, 3])).to.equal(true);
  });
  it('reduce a list of elements to a single element', () => {
    expect(_.reduce([1, 2, 3, 4], (memo, element) => memo + element, 0)).to.equal(10);
    expect(_.reduce(['h', 'e', 'l', 'l', 'o'], (memo, element) => memo + element, '')).to.equal('hello');
  });
  it('takes the first element in the list if no memo is passed', () => {
    expect(_.reduce([5, 2, 3, 4], (memo, element) => memo + element)).to.equal(14);
  });
  it('binds the iteratee to the context if one is given', () => {
    const context = [2, 3, 4, 5, 6];
    expect(_.reduce([1, 2, 3, 4], function (memo, element) { return memo + this[element]; }, 0, context)).to.equal(18);
  });
});

describe('#every', () => {
  it('returns true if invalid arguments are passed', () => {
    expect(_.every(true, () => { })).to.equal(true);
    expect(_.every(null, () => { })).to.equal(true);
    expect(_.every(1234, (element) => { return element % 2 === 0; })).to.equal(true);
  });
  it('returns true if all of the values in the list pass the predicate truth test.', () => {
    expect(_.every([2, 4, 6], (element) => element % 2 === 0)).to.equal(true);
  });
  it('stops traversing the list if a false element is found.', () => {
    const spy = sinon.spy((element) => element % 2 === 0);
    _.every([2, 5, 6, 8, 10], spy);
    expect(spy.callCount).to.eql(2);
  });
  it('binds the iteratee to the context if one is given', () => {
    const context = [2, 4, 6];
    const iteratee = function (element) { return this[element] % 2 === 0; };
    expect(_.every([0, 1, 2], iteratee, context)).to.equal(true);
  });
  describe('Works for strings', () => {
    it('returns true if all of the values in the string pass the predicate truth test.', () => {
      expect(_.every('Diego', (element) => typeof element === 'string')).to.equal(true);
    });
  });
  describe('Works for objects', () => {
    it('returns true if all of the values in the object pass the predicate truth test.', () => {
      expect(_.every({ a: 2, b: 4, c: 6 }, (element) => element % 2 === 0)).to.equal(true);
      expect(_.every({ a: 'D', b: 'P', c: 'M' }, (element) => typeof element === 'string')).to.equal(true);
    });
  });
});

describe('#some', () => {
  it('returns false if invalid arguments are passed', () => {
    expect(_.some(true, () => { })).to.equal(false);
    expect(_.some(null, () => { })).to.equal(false);
    expect(_.some(1234, (element) => element % 2 === 0)).to.equal(false);
  });
  it('returns true if any of the values in the list pass the predicate truth test.', () => {
    expect(_.some([null, 0, 'yes', false], (element) => element)).to.equal(true);
  });
  it('stops traversing the list if a true element is found.', () => {
    const spy = sinon.spy((element) => element % 2 === 0);
    _.some([3, 5, 6, 8, 10], spy);
    expect(spy.callCount).to.eql(3);
  });
  it('binds the iteratee to the context if one is given', () => {
    const context = [1, 3, 6];
    expect(_.some([0, 1, 2], function (element) { return this[element] % 2 === 0; }, context)).to.equal(true);
  });
  describe('Works for strings', () => {
    it('returns true if any of the values in the string pass the predicate truth test.', () => {
      expect(_.some([1, undefined, 'Diego'], (element) => typeof element === 'string')).to.equal(true);
    });
  });
  describe('Works for objects', () => {
    it('returns true if any of the values in the object pass the predicate truth test.', () => {
      expect(_.some({ a: 1, b: 2, c: 3 }, (element) => element % 2 === 0)).to.equal(true);
      expect(_.some({ a: 5, b: 7, c: 'M' }, (element) => typeof element === 'string')).to.equal(true);
    });
  });
});

describe('#extend', () => {
  it('is a function', () => {
    expect(_.extend).to.be.a('function');
  });
  it('returns destination if given invalid arguments', () => {
    expect(_.extend(1234)).to.equal(1234);
    expect(_.extend(null, {})).to.equal(null);
    expect(_.extend('Diego', { age: 50 })).to.equal('Diego');
    expect(_.extend([1234], [123])).to.eql([123]);
  });
  it('should replace a value in the destination array with the value of the same index from the source array(s). The last source will override properties of the same index in previous arguments', function () {
    expect(_.extend(['I was\'t', 'a', 'developer'], ['I am'])).to.eql(['I am', 'a', 'developer']);
    expect(_.extend(['I wanted', 'to be a', 'developer'], ['worked hard to be', 'a'], ['I am'])).to.eql(['I am', 'a', 'developer']);
    expect(_.extend(['http', 'angular', 'SQL'], ['https', 'React', ['TDD']], ['JavaScript'])).to.eql(['JavaScript', 'React', ['TDD']]);
  });
  it('should copy all of the properties in the source objects over to the destination object and return the destination object.', () => {
    expect(_.extend({ name: 'moe' }, { age: 50 })).to.eql({ name: 'moe', age: 50 });
    expect(_.extend({ name: 'Mae' }, { age: 30 }, { skill: 'Music' })).to.eql({ name: 'Mae', age: 30, skill: 'Music' });
    expect(_.extend({ name: 'moe' }, { age: 50, pet: { name: 'Jack', type: 'dog' } }))
      .to.eql({ name: 'moe', age: 50, pet: { name: 'Jack', type: 'dog' } });
  });
  it('should copy all of the properties in the source objects over to the destination array, and return the destination array', function () {
    let expected = ['Good', 'Music'];
    expected.instrument = 'Piano';
    expect(_.extend(['Good', 'Music'], { instrument: 'Piano' })).to.eql(expected);
  });
});

describe('#defaults', () => {
  it('is a function', () => {
    expect(_.defaults).to.be.a('function');
  });
  it('returns the object when invalid data type is given', () => {
    expect(_.defaults(1234)).to.eql(1234);
    expect(_.defaults('string')).to.eql('string');
    expect(_.defaults([1234], [3456])).to.eql([1234]);
    expect(_.defaults(1234, { music: 'jazz' })).to.eql(1234);
    expect(_.defaults(true, { music: 'classic' })).to.eql(true);
  });
  it('Fills in undefined properties in object with the first value present in the following list of defaults objects.', () => {
    let iceCream = { flavor: 'chocolate' };
    expect(_.defaults(iceCream, { flavor: 'vanilla', sprinkles: 'lots' })).to.eql({ flavor: 'chocolate', sprinkles: 'lots' });
    expect(_.defaults(iceCream, { flavor: 'vanilla' }, { sprinkles: 'lots' })).to.eql({ flavor: 'chocolate', sprinkles: 'lots' });
  });
  it('returns the array filled in with any unfilled index positions corresponding to index positions in any defaults array(s)', () => {
    expect(_.defaults(['jazz', 'classic'], ['movies', 'rap', 'pop', 'opera'])).to.eql(['jazz', 'classic', 'pop', 'opera']);
    expect(_.defaults(['jazz'], ['reggae', 'classic', 'movie theme'], ['rap', 'pop', 'gospel', 'instrumental'])).to.eql(['jazz', 'classic', 'movie theme', 'instrumental']);
  });
  it('returns the array with any undefined values filled in with corresponding information from the defaults object(s)', function () {
    let expected = ['jazz', 'classic'];
    expected.instrument = 'piano';
    expect(_.defaults(['jazz', 'classic'], { instrument: 'piano' })).to.eql(expected);
  });
});

describe('#once', () => {
  it('should be a function', () => {
    expect(_.once).to.be.a('function');
  });
  it('creates a version of the function that can only be called one time.', () => {
    let spy = sinon.spy();
    let spyOnce = _.once(spy);
    spyOnce();
    spyOnce();
    expect(spy.callCount).to.equal(1);
  });
  it('should forward all the arguments from the returned function to the original function', () => {
    let spy = sinon.spy();
    let spyOnce = _.once(spy);
    spyOnce(1, 2, 3);
    expect(spy.calledWithExactly(1, 2, 3)).to.equal(true);
  });
  it('should always return the result of the first call', () => {
    let doubles = _.once((n) => n * 2);
    let results = [];
    results.push(doubles(1));
    results.push(doubles(2));
    results.push(doubles(3));
    expect(results).to.eql([2, 2, 2]);
  });
});

describe('#negate', () => {
  const superman = {
    name: 'Superman',
    strength: 'Super',
    heroism: true
  };
  it('is a function', () => {
    expect(_.negate).to.be.a('function');
  });
  it('returns a new negated version of the predicate function', () => {
    function isSuperStrong(character) {
      return character.strength === 'Super';
    }
    let result = _.negate(isSuperStrong);
    expect(result(superman)).to.equal(false);
    expect(!result(superman)).to.equal(true);
  });
});

describe('#shuffle', () => {
  it('is a function', () => {
    expect(_.shuffle).to.be.a('function');
  });
  it('returns an empty array when invalid data type is given', () => {
    expect(_.shuffle(1234)).to.eql([]);
    expect(_.shuffle(true)).to.eql([]);
  });
  it('the shuffled list and the original list should have the same length', () => {
    let list = [1, 2, 3, 4, 5, 6];
    expect(_.shuffle(list)).to.be.an('array');
    expect(_.shuffle(list)).to.have.lengthOf(6);
  });
  it('shuffles the order of values in the list each time it is called', () => {
    let list = [1, 2, 3, 4, 5, 6];
    let shuffle1 = _.shuffle(list);
    let shuffle2 = _.shuffle(list);
    expect(shuffle1 && shuffle2).to.be.an('array');
    expect(shuffle1).to.not.equal(shuffle2);
  });
  it('[strings]- returns an array of characters of the same length as the original string', () => {
    let str = 'Testing shuffle!';
    expect(_.shuffle(str)).to.be.an('array');
    expect(_.shuffle(str)).to.have.lengthOf(16);
  });
  it('[strings]- shuffles the order of characters each time it is called', () => {
    let str = 'Shuffle this!';
    let shuffledStr1 = _.shuffle(str);
    let shuffledStr2 = _.shuffle(str);
    expect(shuffledStr1 && shuffledStr2).to.be.an('array');
    expect(shuffledStr1).to.not.equal(shuffledStr2);
  });
  it('[objects]- returns an array of values, the same length as the original object', () => {
    let obj = { a: 5, b: 'piano', c: 15, d: '25', e: 'coding' };
    let shuffledObj1 = _.shuffle(obj);
    let shuffledObj2 = _.shuffle(obj);
    expect(shuffledObj1.length).to.equal(shuffledObj2.length);
  });
  it('[objects]- shuffles the order of values each time it is called', () => {
    let obj = { a: 5, b: 'coding', c: 23, d: 55, e: 'banana' };
    let shuffledObj1 = _.shuffle(obj);
    let shuffledObj2 = _.shuffle(obj);
    expect(shuffledObj1 && shuffledObj2).to.be.an('array');
    expect(shuffledObj1).to.not.equal(shuffledObj2);
  });
});

describe('#invoke', () => {
  it('is a function', () => {
    expect(_.invoke).to.be.a('function');
  });
  it('returns an empty array if invalid data type is given', () => {
    expect(_.invoke(6413, 'sort')).to.eql([]);
    expect(_.invoke(false, 'sort')).to.eql([]);
    expect(_.invoke('string', 'sort')).to.eql([]);
  });
  it('returns a sorted list of values when passed methodName sort', () => {
    expect(_.invoke([[5, 1, 7], [3, 2, 1]], 'sort')).to.eql([[1, 5, 7], [1, 2, 3]]);
  });
  it('returns an array of stringified object values when passed an object and methodName toString', () => {
    expect(_.invoke({ a: 123, b: 456, c: 789 }, 'toString')).to.eql(['123', '456', '789']);
  });
  it('forwards any other arguments to the methodName and call that method on each value in the list', () => {
    expect(_.invoke([[1, 2, 3, 4], [4, 3, 2, 1]], 'join', '')).to.eql(['1234', '4321']);
  });
});

describe('#sortBy', () => {
  it('is a function', () => {
    expect(_.sortBy).to.be.a('function');
  });
  it('returns an empty array if invalid data type is given', () => {
    expect(_.sortBy(1234)).to.eql([]);
    expect(_.sortBy(true)).to.eql([]);
    expect(_.sortBy(undefined), (element) => element === undefined).to.eql([]);
    expect(_.sortBy(1234), (num) => num * 3).to.eql([]);
  });
  it('returns an array of objects sorted by the string name of the property to sort by', () => {
    const stooges = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }];
    expect(_.sortBy(stooges, 'name')).to.eql([{ name: 'curly', age: 60 }, { name: 'larry', age: 50 }, { name: 'moe', age: 40 }]);
    expect(_.sortBy(['World of Warcraft', 'Starcraft', 'Overwatch'], 'length')).to.eql(['Starcraft', 'Overwatch', 'World of Warcraft']);
  });
  it('returns a sorted copy of list, ranked in ascending order by the results of running each value through iteratee.', () => {
    const iteratee = (num) => Math.sin(num);
    expect(_.sortBy([1, 2, 3, 4, 5, 6], iteratee)).to.eql([5, 4, 6, 3, 1, 2]);
  });
  it('returns a sorted copy of a string ranked in order of the results of running each character through iteratee.', () => {
    const iteratee = (char) => char.charCodeAt();
    expect(_.sortBy('Diego', iteratee)).to.eql(['D', 'e', 'g', 'i', 'o']);
  });
  it('binds the iteratee to the context if one is given', () => {
    const context = 5;
    const iteratee = function (num) { return this / num; };
    expect(_.sortBy([1, 2, 3, 4, 5, 6], iteratee, context)).to.eql([6, 5, 4, 3, 2, 1]);
  });
});

describe('#zip', () => {
  it('is a function', () => {
    expect(_.zip).to.be.a('function');
  });
  it('returns an empty array for invalid data types', () => {
    expect(_.zip(123)).to.eql([]);
    expect(_.zip(true)).to.eql([]);
    expect(_.zip({})).to.eql([]);
  });
  it('merges together the values of each of the arrays with the values at the corresponding position.', () => {
    expect(_.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false])).to.eql([['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]);
  });
  it('merges together the values of each of the given strings with the values at the corresponding position', function () {
    expect(_.zip('code', 'cool', 'done')).to.eql([['c', 'c', 'd'], ['o', 'o', 'o'], ['d', 'o', 'n'], ['e', 'l', 'e']]);
  });
});

describe('#sortedIndex', () => {
  it('is a function.', () => {
    expect(_.sortedIndex).to.be.a('function');
  });
  it('returns 0 if invalid data type is given.', () => {
    expect(_.sortedIndex(true, false)).to.equal(0);
    expect(_.sortedIndex(123, 4)).to.equal(0);
  });
  it('determine the index at which the value should be inserted into the list in order to maintain the list\'s sorted order.', () => {
    expect(_.sortedIndex([10, 20, 30, 40, 50], 35)).to.eql(3);
    expect(_.sortedIndex(['D', 'i', 'e', 'g'], 'o')).to.equal(3);
  });
  it('returns the index at which the object should be inserted into the list to maintain the list\'s sorted order.', () => {
    var turtles = [{ name: 'Moe', age: 40 }, { name: 'Curly', age: 60 }];
    expect(_.sortedIndex(turtles, { name: 'Larry', age: 50 }, 'age')).to.equal(1);
  });
  it('returns the index at which the value should be inserted into the list when iteratee is given as the string name of the property to sort by.', () => {
    expect(_.sortedIndex(['aero', 'javascript', 'coding', 'java'], 'cloud', 'length')).to.equal(1);
  });
});

describe('#flatten', () => {
  it('is a function', () => {
    expect(_.flatten).to.be.a('function');
  });
  it('returns an empty array for invalid data types.', () => {
    expect(_.flatten(123)).to.eql([]);
    expect(_.flatten({ skill: 'coding' })).to.eql([]);
    expect(_.flatten(true)).to.eql([]);

  });
  it('returns an splitted array with all the charaters of the string.', () => {
    expect(_.flatten('Diego')).to.eql(['D', 'i', 'e', 'g', 'o']);
    expect(_.flatten('true')).to.eql(['t', 'r', 'u', 'e']);
  });
  it('returns a single array with all the elements of the nested arrays.', () => {
    expect(_.flatten([[1], [2], [3], [4]])).to.eql([1, 2, 3, 4]);
    expect(_.flatten([[1], [2], [3], [[[4]]]])).to.eql([1, 2, 3, 4]);
  });
  it('if shallow is true the array will only be flattened a single level.', () => {
    expect(_.flatten([['uno'], [['dos']], [3], [[4]]], true)).to.eql(['uno', ['dos'], 3, [4]]);
  });
});

describe('#intersection', () => {
  it('is a function', () => {
    expect(_.intersection).to.be.a('function');
  });
  it('returns an empty array for invalid data type', () => {
    expect(_.intersection(123)).to.eql([]);
    expect(_.intersection(true)).to.eql([]);
    expect(_.intersection({ name: 'me' }, { name: 'me' })).to.eql([]);
  });
  it('returns an array that contains every item shared between all the passed-in arrays.', () => {
    expect(_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1])).to.eql([1, 2]);
    expect(_.intersection(['don\'t', 1, 'stop', 'coding', true], ['don\'t', 2, 'stop', false, 'coding'], ['don\'t', 'stop', 'coding'])).to.eql(['don\'t', 'stop', 'coding']);
  });
  it('returns an array with all characters in common between each given string', () => {
    expect(_.intersection('coding', 'code', 'cone', 'correct')).to.eql(['c', 'o']);
    expect(_.intersection('smart', 'fast', 'different')).to.eql(['t']);
  });
  it('returns an array with all items common to each array/object given when given a mix of items beginning with an array', () => {
    expect(_.intersection([1, 2, 3], [5, 2, 1, 4, 3], { a: 1, b: 55, c: 3 })).to.eql([1, 3]);
  });
});

describe('#difference', () => {
  it('is a function', () => {
    expect(_.difference).to.be.a('function');
  });
  it('returns an empty array if invalid data type is given', () => {
    expect(_.difference(true)).to.eql([]);
    expect(_.difference(123)).to.eql([]);
    expect(_.difference({})).to.eql([]);
  });
  it('returns the values from array that are not present in the other arrays.', () => {
    expect(_.difference([1, 2, 3, 4, 5], [5, 2, 10])).to.eql([1, 3, 4]);
    expect(_.difference([1, 2, 3, 4, 5], [1, 2], [3, 4])).to.eql([5]);
  });
  it('when a string is given returns an array with the splitted characters of the first argument.', () => {
    expect(_.difference('Diego', 'coding', 'forever')).to.eql(['D', 'i', 'e', 'g', 'o']);
  });
});

describe('#memoize', () => {
  it('is a function', () => {
    expect(_.memoize).to.be.a('function');
  });
  it('returns the same value as the original function', () => {
    const ingAdder = (word) => word + 'ing';
    const memoizeIng = _.memoize(ingAdder);
    expect(memoizeIng('jump')).to.eql(ingAdder('jump'));
    expect(memoizeIng('cod')).to.eql(ingAdder('cod'));
  });
  it('calls the given function once when called multiple times with the same first argument', () => {
    const ingAdder = (word) => word + 'ing';
    const spy = sinon.spy(ingAdder);
    const memoizeIng = _.memoize(spy);
    memoizeIng('eat');
    memoizeIng('eat');
    memoizeIng('eat');
    expect(spy.callCount).to.equal(1);
  });
  it('calls the given function every time it is given a unique first argument', () => {
    const double = (num) => num * 2;
    const spy = sinon.spy(double);
    const spyMemoize = _.memoize(spy);
    spyMemoize(1);
    spyMemoize(2);
    spyMemoize(3);
    expect(spy.callCount).to.equal(3);
  });
  it('have access to multiple arguments passed in to the given function', () => {
    const add = (a, b) => a + b;
    const spy = sinon.spy(add);
    const spyMemoize = _.memoize(spy);
    spyMemoize(2, 3);
    expect(spy.calledWithExactly(2, 3)).to.equal(true);
  });
  it('uses the hashFunction given to generate keys for the cached results', () => {
    const add = (a, b) => a + b;
    function dashSeparateArgs() {
      const args = [];
      for (let i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
      return args.join('-');
    }
    const memoizeAdd = _.memoize(add, dashSeparateArgs);
    expect(memoizeAdd(4, 1)).to.equal(5);
    expect(memoizeAdd(4, 2)).to.equal(6);
  });
});

describe('#delay', () => {
  it('is a function', () => {
    expect(_.delay).to.be.a('function');
  });
  it('invokes function after "wait" milliseconds.', () => {
    let clock = sinon.useFakeTimers();
    let delay = false;
    let func = () => delay = true;

    _.delay(func, 500);
    expect(delay).to.be.false;
    clock.tick(510);
    expect(delay).to.be.true;
    clock.restore();
  });
  it('forwards optional arguments on to the function when it is invoked.', () => {
    let clock = sinon.useFakeTimers();
    let result = 2;
    const double = (num) => result = num * 2;

    _.delay(double, 500, 2);
    expect(result).to.equal(2);
    clock.tick(510);
    expect(result).to.equal(4);
    clock.restore();
  });
});

describe('#where', () => {
  it('is a function', () => {
    expect(_.where).to.be.a('function');
  });
  it('returns an empty array when invalid data type is given.', () => {
    expect(_.where()).to.eql([]);
    expect(_.where(5)).to.eql([]);
    expect(_.where(true)).to.eql([]);
  });
  it('returns an array of all the values that contain all of the key-value pairs listed in properties.', () => {
    let listOfGames = [
      { title: 'Rock & Roll Racing', year: 1993, author: 'Silicon & Synapse' },
      { title: 'Warcraft: Orcs & Humans', year: 1994, author: 'Blizzard' },
      { title: 'Starcraft', year: 1998, author: 'Blizzard' },
      { title: 'World of Warcraft', year: 2004, author: 'Blizzard' },
      { title: 'Half-Life', year: 1998, author: 'Valve' }
    ];

    expect(_.where(listOfGames, { year: 1998 })).to.eql([
      { title: 'Starcraft', year: 1998, author: 'Blizzard' },
      { title: 'Half-Life', year: 1998, author: 'Valve' }
    ]);
    expect(_.where(listOfGames, { year: 1998, author: 'Blizzard' })).to.eql([
      { title: 'Starcraft', year: 1998, author: 'Blizzard' }
    ]);
  });
});

describe('#throttle', () => {
  beforeEach(() => {
    const double = (num) => num * 2;
    this.clock = sinon.useFakeTimers();
    this.spy = sinon.spy(double);
  });
  afterEach(() => {
    this.clock.restore();
  });
  it('is a function.', () => {
    expect(_.throttle).to.be.a('function');
  });
  it('returns a function.', () => {
    expect(_.throttle()).to.be.a('function');
    expect(_.throttle('code')).to.be.a('function');
  });
  it('returns a new function passing the arguments from the given function.', () => {
    const double = (num) => num * 2;
    const throttleDouble = _.throttle(double);
    expect(throttleDouble(2)).to.equal(4);
  });
  it('will only call the original function at most once per every wait milliseconds.', () => {
    const throttleSpy = _.throttle(this.spy, 200);
    throttleSpy(2);
    throttleSpy(2);
    throttleSpy(2);
    expect(this.spy.callCount).to.equal(1);
    this.clock.tick(205);
    expect(this.spy.callCount).to.equal(2);
  });
  it('calls the function again after the wait period when leading: true is given.', () => {
    const throttleSpy = _.throttle(this.spy, 200, { leading: true });
    throttleSpy(2);
    throttleSpy(2);
    this.clock.tick(150);
    throttleSpy(2);
    expect(this.spy.callCount).to.equal(1);
    this.clock.tick(205);
    expect(this.spy.callCount).to.equal(2);
  });
  it('calls the function only after the wait period when leading: false is given.', () => {
    const throttleSpy = _.throttle(this.spy, 200, { leading: false });
    throttleSpy(2);
    throttleSpy(2);
    throttleSpy(2);
    expect(this.spy.callCount).to.equal(0);
    this.clock.tick(205);
    expect(this.spy.callCount).to.equal(1);
  });
  it('calls the function and doesn\'t call it again after the wait period when trailing: false is given.', () => {
    const throttleSpy = _.throttle(this.spy, 200, { trailing: false });
    throttleSpy(2);
    throttleSpy(2);
    throttleSpy(2);
    expect(this.spy.callCount).to.equal(1);
    this.clock.tick(205);
    expect(this.spy.callCount).to.equal(1);
  });
});

describe('#partial', () => {
  it('is a function', () => {
    expect(_.partial).to.be.a('function');
  });
  it('returns a function', () => {
    expect(_.partial()).to.be.a('function');
  });
  it('returns a new function passing the arguments from the given function if no partials are given.', () => {
    const double = (a, b) => a * b;
    const partialDouble = _.partial(double);
    expect(partialDouble(2, 2)).to.equal(4);
  });
  it('returns a new function partially filled in.', () => {
    const multiply = (a, b) => a * b;
    const subtract = (a, b) => a - b;
    const partialMultiply2 = _.partial(multiply, 2);
    const partialSub = _.partial(subtract, 20, 10);
    const partialMultiply4 = _.partial(multiply, _, 4);
    expect(partialMultiply2(2)).to.equal(4);
    expect(partialSub(12, 34)).to.equal(10);
    expect(partialMultiply4(2)).to.equal(8);
  });
});