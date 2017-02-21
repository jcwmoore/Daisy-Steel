/* eslint-env mocha */

const mocha = require('mocha');
const should = require('should');
const target = require('./editItem');
const item = require('./item.model');
const db = require('../index/sequelize');

describe('pantry editItem', function() {
    beforeEach(function(){
        db.removeHook('beforeFind', 'error');
    });
    it('GET with database error', function(done) {
        db.beforeFind('error', function(){ throw new Error('the database is down') });
        target.get(123)
            .then( r1 => should.fail(r1, {}, "should have failed"))
            .catch( err => done());
    });
    it('GET null data -> new record', function(done) {
        target.get()
            .then( r1 => {
                should(r1.id).be.null;
                done();
            })
            .catch(err => done(err));
    });
    it('GET invalid data', function(done) {
        db.sync({force: true})
          .then(r1 => target.get(123))
          .then(r2 => should.fail(r2, {}, "should have failed"))
          .catch(err => done());
    });
    it('GET existing record', function(done) {
        db.sync({force: true})
          .then(r1 => item.create({ id: 1, name: 'test item 1', category: 'Pantry', idealLow: 1, idealHigh: 10, currentCount: 0 }))
          .then(r2 => target.get(1))
          .then(r3 => {
              r3.name.should.eql('test item 1');
              r3.category.should.eql('Pantry');
              done();
          })
          .catch(err => done(err));
    });
    it('POST null data', function(done) {
        db.sync({force: true})
          .then(r1 => target.post())
          .then(r2 => done(new Error('error: should have failed')))
          .catch(err => done());
    });
    it('POST invalid data', function(done) {
        db.sync({force: true})
          .then(r1 => target.post({ name: 'test item 1', category: 'Pantry' }))
          .then(r2 => done(new Error('error: should have failed')))
          .catch(err => done());
    });
    it('POST', function(done) {
        db.sync({force: true})
          .then(r1 => target.post({ id: 1, name: 'test item 1', category: 'Pantry', idealLow: 1, idealHigh: 10, currentCount: 0 }))
          .then(r2 => item.findAll({ where: { id: 1 } }))
          .then(r3 => {
              r3.length.should.eql(1, 'nothing in the database');
              r3[0].name.should.eql('test item 1');
              r3[0].category.should.eql('Pantry');
              done();
          })
          .catch(err => done(err));
    });
    it('POST with database error', function(done) {
        db.beforeFind('error', function(){ throw new Error('the database is down') });
        target.post(123)
            .then( r1 => should.fail(r1, {}, "should have failed"))
            .catch( err => done());
    });
});