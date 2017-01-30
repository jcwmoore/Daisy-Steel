var promise = require('bluebird');
var model = require('./weather_observation.model');

module.exports = {

    /**
     * @param {any} body the body from the http request
     */
    posts: function (body){
        return new promise(function(resolve, reject) {
            if(body == null){
                reject('null input');
            }
            model.create({ timeStamp: body.ts, temperature: body.temperature, humidity: body.humidity }).then(function(){
                resolve();
            }).catch(function(err){
                reject(err);
            })
        });
    }
};

//module.exports = t();