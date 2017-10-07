const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require(path.join(__dirname, '..', './lowbar.js'));

/** ***********************************************/
describe('_', () => {
  'use strict';

  it('is an object', () => {
    expect(_).to.be.an('object');
  });
  describe('#identity', () => {
    it('is a function', () => {
      expect(_.identity).to.be.a('function');
    });
    it('returns the same output as the argument', () => {
      expect(_.identity('hello')).to.equal('hello');
      expect(_.identity(123)).to.equal(123);
      expect(_.identity([1, 2, '3', 4, 5])).to.eql([1, 2, '3', 4, 5]);
      expect(_.identity(true)).to.eql(true);
      expect(_.identity({ name: 'Tom' })).to.eql({ name: 'Tom' });
    });
  });
});

/** **********************************************/

describe('#first', () => {
  it('is a function', () => {
    expect(_.first).to.be.a('function');
  });
  it('returns an empty array for invalid input', () => {
    expect(_.first()).to.eql([]);
    expect(_.first(5)).to.eql([]);
    expect(_.first('string')).to.eql([]);
    expect(_.first({})).to.eql([]);
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

/** **********************************************/

describe('#last', () => {
  it('is a function', () => {
    expect(_.last).to.be.a('function');
  });
  it('returns an empty array for invalid input', () => {
    expect(_.last()).to.eql([]);
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

/** **********************************************/

describe('#each', () => {
  it('is a function', () => {
    expect(_.each).to.be.a('function');
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
  it('works for objects', () => {
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
});

/** **********************************************/

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

/** **********************************************/

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

/** **********************************************/

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

/** **********************************************/

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

/** **********************************************/

describe('#map', () => {
  it('is a function', () => {
    expect(_.map).to.be.a('function');
  });
  it('return an empty array if the argument is not an array', () => {
    expect(_.map(5)).to.eql([]);
    expect(_.map(true)).to.eql([]);
    expect(_.map(undefined)).to.eql([]);
  });
  it('Produces a new array of values by mapping each value in list through a transformation function (iteratee)', () => {
    expect(_.map([1, 2, 3], (num) => num * 3)).to.eql([3, 6, 9]);
  });
  it('works for nested arrays', () => {
    expect(_.map([[1, 2, 3], [4, 5, 6]], (num) => num * 3)).to.eql([[3, 6, 9], [12, 15, 18]]);
  });
  it('if it\'s and objecct, it returns an array with the resulted values', () => {
    expect(_.map({ one: 1, two: 2, three: 3 }, (num) => num * 3)).to.eql([3, 6, 9]);
  });

});

/** **********************************************/

describe('#contains', function () {
  it('is a function', function () {
    expect(_.contains).to.be.a('function');
  });
  it('returns false if the value is not present', function () {
    expect(_.contains('Hello', 'd')).to.equal(false);
    expect(_.contains({ name: 'moe', age: 40 }, 'maria')).to.equal(false);
    expect(_.contains([1, '2', 3, 4], 5)).to.equal(false);
  });
  it('returns true if the value is present in a string', function () {
    expect(_.contains('Hello', 'e')).to.equal(true);
    expect(_.contains('Hello', 'o')).to.equal(true);
    expect(_.contains('Hello World', 'W')).to.equal(true);
  });
  it('returns true if the value is present in an object', function () {
    expect(_.contains({ name: 'moe', age: 40 }, 'moe')).to.equal(true);
    expect(_.contains({ name: 'moe', age: 40 }, 40)).to.equal(true);
    expect(_.contains({ name: 'moe', age: 40 }, 'name')).to.equal(true);
    expect(_.contains({ name: 'moe', age: 40 }, 'age')).to.equal(true);
  });
  it('returns true if the value is present in an array', function () {
    expect(_.contains([1, 2, 3, 4], 3)).to.equal(true);
    expect(_.contains([1, '2', 3, 4], '2')).to.equal(true);
  });
});

/** **********************************************/

describe('#pluck', function () {
  it('is a function', function () {
    expect(_.pluck).to.be.a('function');
  });
  it('should return an empty array for invalid arguments', function () {
    expect(_.pluck('str')).to.eql([]);
    expect(_.pluck(5)).to.eql([]);
    expect(_.pluck(undefined)).to.eql([]);
    expect(_.pluck({})).to.eql([]);
  });
  it('return a array of property values', function () {
    expect(_.pluck([{ name: 'moe', age: 40 }], 'age')).to.eql([40]);
    expect(_.pluck([{ name: 'moe', age: 40 }], 'name')).to.eql(['moe']);
    expect(_.pluck([{ name: 'moe', age: 40 }, { name: 'mia', age: 35 },
    { name: 'jack', age: 25 }], 'name')).to.eql(['moe', 'mia', 'jack']);
  });
});

/** **********************************************/