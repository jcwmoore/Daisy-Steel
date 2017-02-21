/* eslint-env mocha */

const mocha = require('mocha');
const should = require('should');
const target = require('./editTransaction');
const item = require('./item.model');
const tran = require('./transaction.model');
const db = require('../index/sequelize');

describe('pantry editTransaction', function() {
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
          .then(r1 => item.create({ name: 'test item 1', category: 'Pantry', idealLow: 1, idealHigh: 10, currentCount: 0 }))
          .then(r2 => tran.create({ itemId: r2.id, transactionType: 'ISSUE', amountCount: 2, timeStamp: new Date('2017-01-29T23:14:43') }))
          .then(r3 => target.get(r3.id))
          .then(r4 => {
              r4.amountCount.should.eql(2);
              r4.timeStamp.should.eql(new Date('2017-01-29T23:14:43'));
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
    it('POST insert', function(done) {
        db.sync({force: true})
          .then(r1 => item.create({ name: 'test item 1', category: 'Pantry', idealLow: 1, idealHigh: 10, currentCount: 0 }))
          .then(r2 => target.post({ itemId: r2.id, transactionType: 'ISSUE', amountCount: 2, timeStamp: new Date('2017-01-29T23:14:43') }))
          .then(r3 => tran.findAll({ where: { timeStamp: r3.timeStamp } }))
          .then(r4 => {
              r4.length.should.eql(1);
              r4[0].amountCount.should.eql(2);
              r4[0].timeStamp.should.eql(new Date('2017-01-29T23:14:43'));
              return item.findById(r4[0].itemId);
          })
          .then(r5 =>{
              r5.currentCount.should.eql(2);
              done();
          })
          .catch(err => done(err));
    });
    it('POST update', function(done) {
        db.sync({force: true})
          .then(r1 => item.create({ name: 'test item 1', category: 'Pantry', idealLow: 1, idealHigh: 10, currentCount: 1 }))
          .then(r2 => tran.create({ itemId: r2.id, transactionType: 'ISSUE', amountCount: 1, timeStamp: new Date('2017-01-29T23:14:43') }))
          .then(r3 => target.post({ id: r3.id, itemId: r3.itemId, transactionType: 'ISSUE', amountCount: 2, timeStamp: new Date('2017-01-29T23:14:43') }))
          .then(r4 => tran.findAll({ where: { timeStamp: r4.timeStamp } }))
          .then(r5 => {
              r5.length.should.eql(1);
              r5[0].amountCount.should.eql(2);
              r5[0].timeStamp.should.eql(new Date('2017-01-29T23:14:43'));
              return item.findById(r5[0].itemId);
          })
          .then(r6 =>{
              r6.currentCount.should.eql(2);
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