var express = require('express');
var router = express.Router();

var users = require('./users');
var menu = require('./menu');
var login = require('./login');
var categories = require('./categories');
var histories = require('./histories');
var statistics = require('./statistics');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('eatcoin-api');
});

router.use('/users', users);
router.use('/menu', menu);
// router.use('/login', login);
router.use('/categories', categories);
router.use('/histories', histories);
router.use('/statistics', statistics);

module.exports = router;