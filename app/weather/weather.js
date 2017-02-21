const model = require('./weather.model');

module.exports = {
    current: function() {
        return new Promise((resolve, reject) => {
            model.aggregate('location', 'DISTINCT', { plain: false })
                .then(r1 =>{

                })
        });
    }
};