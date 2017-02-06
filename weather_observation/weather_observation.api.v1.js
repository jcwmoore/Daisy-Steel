const model = require('./weather_observation.model');

module.exports = {

    /**
     * @param {any} body the body from the http request 
     */
    get: function(body){
        return new Promise((resolve, reject) => {
            model.all()
                .then(r1 => { resolve(r1) })
                .catch(err => { reject(err) });
        });
    },
    /**
     * @param {any} body the body from the http request
     */
    post: function (body){
        
        return new Promise(function(resolve, reject) {
            if(body == null){
                reject('null input');
            }
            if(Array.isArray(body)) {
                reject('api operation only accepts a single input')
            }
            model.create({ timeStamp: body.ts, temperature: body.temperature, humidity: body.humidity })
              .then(function(){
                resolve();
            }).catch(function(err){
                reject(err);
            })
        });
    }
};

//module.exports = t();