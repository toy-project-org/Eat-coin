var express = require('express');
var router = express.Router();

var api = require('./eatcoin-api/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });    // render: 응답할 페이지 렌더링
  res.sendfile(path.join(__dirname, '../public', 'index.html'));
});

router.use('/eatcoin-api', api);

module.exports = router;
