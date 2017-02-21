const item = require('./item.model');
const tran = require('./transaction.model');

module.exports = {

    /**
     * The GET operation for the index action
     * @param {number} id - The id for the record to edit, undefined for new records
     */
    get: function(id) {
        return new Promise((resolve, reject) => {
            if(id){
                item.find({ where: { id: id } })
                    .then(r1 => resolve(r1))
                    .catch(err => reject(err));
            } else {
                resolve(item.build().dataValues);
            }
        });
    },
    /**
     * The POST operation for the edit item action, inserts or updates the record
     * @param {object} body - object to be inserted or updated
     */
    post: function(body){
        return new Promise((resolve, reject) => {
            item.insertOrUpdate(body)
                .then(r1 => resolve())
                .catch(err => reject(err));
        });
    }
}