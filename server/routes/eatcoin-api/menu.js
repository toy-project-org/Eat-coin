var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('menu-api')  // render: 응답할 페이지 렌더링
});

module.exports = router;
