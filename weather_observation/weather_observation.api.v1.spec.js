/* eslint-env mocha */

var mocha = require('mocha');
var should = require('should');
var obs = require('./weather_observation.api.v1');
var model = require('./weather_observation.model');
var db = require('../index/sequelize');

describe('weather_observation.api.v1', function() {
    it('null post', function(done){
        obs.posts().then(
            function() {
                should.fail({}, {}, 'request was not rejected');
            },
            function(){
                done();
            }
        );        
    });
    it('invalid post', function(done){
        obs.posts( { test: 'test' } ).then(
            function() {
                should.fail({}, {}, 'request was not rejected');
            },
            function(){
                done();
            }
        );        
    });
    it('valid post', function(done){
        db.sync().then(function () {
            obs.posts( { ts: '2017-01-29T23:14:43' } ).then( function() {
                model.findAll({
                    where: { timeStamp: new Date('2017-01-29T23:14:43') }
                }).then(function(d){
                    d.length.should.equal(1);
                    done();
                }).catch(function (err){
                    console.log(err);
                    done();
                });
            }).catch(function(err) {
                //console.log(err);
                done(err);
            });      
        });  
    });
});