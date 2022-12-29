const { json } = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const router = express.Router();
const db = require('../../lib/config');
const getDate = require('../../lib/etc');

router.use(morgan("combined"));

// todo: 에러 핸들링, 로그 파일에 저장하기
// cors 찾아보기

// 1-1. 최근 내역 조회
router.get('/', function(req, res, next) {
    
})