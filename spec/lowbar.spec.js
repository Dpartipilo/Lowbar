const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require(path.join(__dirname, '..', './lowbar.js'));

/** ***********************************************/
describe('_', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
  });
  describe('#identity', function () {
    it('is a function', function () {
      expect(_.identity).to.be.a('function');
    });
    it('returns the same output as the argument', function () {
      expect(_.identity('hello')).to.equal('hello');
      expect(_.identity(123)).to.equal(123);
      expect(_.identity([1, 2, '3', 4, 5])).to.eql([1, 2, '3', 4, 5]);
      expect(_.identity(true)).to.eql(true);
      expect(_.identity({ name: 'Tom' })).to.eql({ name: 'Tom' });
    });
  });
});

/** **********************************************/

describe('#first', function () {
  it('is a function', function () {
    expect(_.first).to.be.a('function');
  });
  it('returns an empty array for invalid input', function () {
    expect(_.first()).to.eql([]);
    expect(_.first(5)).to.eql([]);
    expect(_.first('string')).to.eql([]);
    expect(_.first({})).to.eql([]);
  });
  it('returns the first index of the array', function () {
    expect(_.first([1, 2, 3])).to.eql(1);
    expect(_.first(['A', 'B', 'C'])).to.eql('A');
  });
  it('returns the first n elements of the array when a 2nd argument is given.', function () {
    expect(_.first.length).to.equal(2);
    expect(_.first([1, 2, 3, 4], 2)).to.eql([1, 2]);
    expect(_.first([1, 2, '3', '4', 5, 6, 7], 4)).to.eql([1, 2, '3', '4']);
    expect(_.first([1, 2, '3', { name: 'catch' }, 5, 6, 7], 4)).to.eql([1, 2, '3', { name: 'catch' }]);
  });
});

/** **********************************************/

describe('#last', function () {
  it('is a function', function () {
    expect(_.last).to.be.a('function');
  });
  it('returns an empty array for invalid input', function () {
    expect(_.last()).to.eql([]);
  });
  it('returns the last index of the array', function () {
    expect(_.last([1, 2, 3])).to.eql(3);
    expect(_.last(['A', 'B', 'C'])).to.eql('C');
  });
  it('returns the last n elements of the array when a 2nd argument is given.', function () {
    expect(_.last.length).to.equal(2);
    expect(_.last([1, 2, 3, 4], 2)).to.eql([3, 4]);
    expect(_.last([1, 2, '3', '4', 5, 6, 7], 4)).to.eql(['4', 5, 6, 7]);
    expect(_.last([4, 5, 1, 2, '3', { name: 'catch' }], 4)).to.eql([1, 2, '3', { name: 'catch' }]);
  });
});

/** **********************************************/

describe('#each', function () {
  it('is a function', function () {
    expect(_.each).to.be.a('function');
  });
  it('it should count the number of iterations in the function', function () {
    const spy = sinon.spy();
    _.each([1, 2, 3], spy);
    expect(spy.callCount).to.equal(3);
  });
  it('calls the iteratee passing each element of the array as the first argument', function () {
    const spy = sinon.spy();
    _.each([1, 2, 3], spy);
    expect(spy.firstCall.calledWithExactly(1, 0, [1, 2, 3])).to.equal(true);
    expect(spy.secondCall.calledWithExactly(2, 1, [1, 2, 3])).to.equal(true);
    expect(spy.thirdCall.calledWithExactly(3, 2, [1, 2, 3])).to.equal(true);
  });
  it('works for objects', function () {
    const spy = sinon.spy();
    _.each({ one: 1, two: 2, three: 3 }, spy);
    expect(spy.callCount).to.equal(3);
  });
  it('calls the iteratee passing each element of the object as the first argument', function () {
    const spy = sinon.spy();
    _.each({ one: 1, two: 2, three: 3 }, spy);
    expect(spy.firstCall.calledWithExactly(1, 'one', { one: 1, two: 2, three: 3 })).to.equal(true);
    expect(spy.secondCall.calledWithExactly(2, 'two', { one: 1, two: 2, three: 3 })).to.equal(true);
    expect(spy.thirdCall.calledWithExactly(3, 'three', { one: 1, two: 2, three: 3 })).to.equal(true);
  });
});

/** **********************************************/

describe('#indexOf', function () {
  it('is a function', function () {
    expect(_.indexOf).to.be.a('function');
  });

  it('the function takes 3 arguments 3rd boolean [optional]', function () {
    expect(_.indexOf.length).to.equal(3);
  });

  it('return the index of the value in the array', function () {
    expect(_.indexOf([1, 2, 3, 'a'], 3)).to.eql(2);
    expect(_.indexOf([1, 2, 3, 'a'], 'a')).to.eql(3);
  });

  it('return -1 if value is not present in the array', function () {
    expect(_.indexOf([1, 2, 3, 'a'], 4)).to.eql(-1);
  });

  it('if the array is sorted apply binary search', function () {
    expect(_.indexOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 9, true)).to.eql(8);
  });
});

/** **********************************************/