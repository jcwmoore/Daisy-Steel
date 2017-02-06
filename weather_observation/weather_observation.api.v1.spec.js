/* eslint-env mocha */

const mocha = require('mocha');
const should = require('should');
const obs = require('./weather_observation.api.v1');
const model = require('./weather_observation.model');
const db = require('../index/sequelize');

describe('weather_observation.api.v1', function() {
    it('null post', function(done){
        obs.post(null)
          .then( function() {
            should.fail({}, {}, 'request was not rejected');
        }).catch( function(){
            done();
        });        
    });
    it('invalid post', function(done){
        obs.post( { test: 'test' } )
          .then( function() { 
              should.fail({}, {}, 'request was not rejected'); 
        }).catch( function(err) { 
            done(); 
        });
    });
    it('valid post', function(done){
        
        db.sync({force: true})
          .then(r1 => obs.post( { ts: '2017-01-29T23:14:43' } ))
          .then(r2 => model.findAll({ where: { timeStamp: new Date('2017-01-29T23:14:43') }} )
         ).then(r3 => {
            r3.length.should.equal(1, 'there should only be one record in the database.');
            done();
        }).catch(err => { 
            done(err); 
        });          
    });
    it('valid get', function(done){
        db.sync({force: true})
          .then(r1 => model.create({ timeStamp: new Date('2017-01-29T23:14:43'), temperature: 1, humidity: 2 }))
          .then(r2 => obs.get({}))
          .then(r3 => {
              r3.length.should.equal(1, 'nothing was returned');
              r3[0].timeStamp.should.eql(new Date('2017-01-29T23:14:43'));
              r3[0].temperature.should.equal(1);
              r3[0].humidity.should.equal(2);
              done();
          }).catch(err => { 
            done(err); 
        }); 
    });
});