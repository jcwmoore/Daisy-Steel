const item = require('./item.model');
const tran = require('./transaction.model');

module.exports = {

    /**
     * The GET operation for the index action
     */
    get: function() {
        return new Promise((resolve, reject) => {
            item.findAll({ where: { category: 'Pantry' } })
                .then(r1 => resolve(r1))
                .catch(err => reject(err));
        });
    }
}