var express = require('express');
var router = express.Router();

var users = require('./users');
var menu = require('./menu');
var login = require('./login');
var histories = require('./histories');
var statistics = require('./statistics');
var categories = require('./categories');
var assets = require('./assets');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('eatcoin-api');
});

router.use('/users', users);
router.use('/menu', menu);
// router.use('/login', login);
router.use('/histories', histories);
router.use('/statistics', statistics);
router.use('/categories', categories);
router.use('/assets', assets);

module.exports = router;