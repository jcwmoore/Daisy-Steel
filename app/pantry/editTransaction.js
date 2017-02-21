const item = require('./item.model');
const tran = require('./transaction.model');

module.exports = {

    /**
     * The GET operation for the edit transaction action
     * @param {number} id - The id for the record to edit, undefined for new records
     */
    get: function(id) {
        return new Promise((resolve, reject) => {
            if(id){
                tran.find({ where: { id: id } })
                    .then(r1 => resolve(r1))
                    .catch(err => reject(err));
            } else {
                resolve(item.build().dataValues);
            }
        });
    },
    /**
     * The POST operation for the edit transaction action, inserts or updates the record
     * @param {object} body - object to be inserted
     */
    post: function(body){
        return new Promise((resolve, reject) => {
            var prom = item.findById(body.itemId);
            prom = prom.then(r1 => {
                r1.currentCount += body.amountCount;
                return r1.save();
            });
            if(body.id){
                var old = 0;
                prom = prom.then(r2 => tran.findById(body.id))
                prom = prom.then(r3 => {
                    old = r3.dataValues.amountCount;
                    return item.findById(body.itemId);
                });
                prom = prom.then(r4 => {
                    r4.currentCount -= old;
                    return r4.save();
                });
            }
            prom.then(r5 => tran.insertOrUpdate(body))
                .then(r6 => resolve(body))
                .catch(err => reject(err));
        });
    }
}