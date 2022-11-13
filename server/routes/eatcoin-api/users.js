var express = require('express');
var router = express.Router();
var db = require('../../lib/config');

router.get('/', function(req, res, next) {
    db.query('select * from users', (err, results, fds) => {
    if (err) throw err;

    console.log(results);
    res.json(results);
    })
});

module.exports = router;