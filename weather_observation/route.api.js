var express = require('express');
var router = express.Router();
const api = require('./weather_observation.api.v1');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("responded");
});

router.post('/', function(req, res, next) {
    api.post(req.body)
      .then( function() {
        res.sendStatus(200);
    }).catch( function(err) {
        next(err);
    })

});

module.exports = router;
