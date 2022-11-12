var express = require('express');
var router = express.Router();
var db = require('../lib/db.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('eatcoin-api');
});

// users
router.get('/users', function(req, res, next) {
    db.query('select * from users', function(err, results, fields) {
        if (err) throw err;
        console.log(results);
        res.json(results);
    });
    
})

// histories
router.get('/histories', function(req, res, next) {
    res.send('histories');
})

// menu
router.get('/menu', function(req, res, next) {
    res.send('menu');
})

// categories
router.get('/categories', function(req, res, next) {
    res.send('categories');
})

// statistics
router.get('/statistics', function(req, res, next) {
    res.send('statistics');
})

router.get('login', function(req, res, next) {
    res.send('login');
})

module.exports = router;
