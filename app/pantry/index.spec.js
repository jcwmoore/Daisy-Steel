/* eslint-env mocha */

const mocha = require('mocha');
const should = require('should');
const target = require('./index');
const item = require('./item.model');
const db = require('../index/sequelize');

describe('index', function() {
    beforeEach(function(){
        db.removeHook('beforeFind', 'error');
    });
    it('GET db error', function(done){        
        db.beforeFind('error', function(){ throw new Error('the database is down') });
        target.get()
            .then( r1 => should.fail(r1, {}, "should have failed"))
            .catch( err => done());
    });
    it('normal GET', function(done) {
        db.sync({force: true})
          .then(r1 => item.create({ name: 'test item 1', category: 'Pantry', idealLow: 1, idealHigh: 10, currentCount: 0 }))
          .then(r2 => target.get())
          .then(r3 => {
              r3.length.should.equal(1, 'nothing was returned');
              r3[0].name.should.eql('test item 1');
              r3[0].category.should.eql('Pantry');
              done();
          })
          .catch(err => done(err));
    });
});