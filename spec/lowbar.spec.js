var path = require('path');
var expect = require('chai').expect;
var sinon = require('sinon');
var _ = require(path.join(__dirname, '..', './lowbar.js'));

/*************************************************/
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

/*************************************************/
