var express = require('express');
const morgan = require('morgan');
var router = express.Router();
var db = require('../../lib/config');

router.use(morgan("combined"));

var from = ' from users';
var where = ' where uid = ?';

// todo: 에러 핸들링!!!

// 1-1. users 조회
router.get('/', function(req, res, next) {
    console.log("find all");

    db.query('select *' + from, (err, results, fds) => {
    if (err) throw err;

    console.log(results);
    res.json(results);
    })
});

// 1-2. 특정 user 조회
router.get('/:id', (req, res, next) => {
    console.log("find one");

    const { id } = req.params;
    var query = db.format('select *' + from + where, [id]);

    db.query(query, (err, results, fds) => {
        if (err) throw err;

        console.log(results);
        res.json(results);
    })
})

// 2. user 추가
router.post('/', (req, res, next) => {
    console.log("add one");

    const { name, email, password} = req.body;
    var sql = 'insert into users(name, email, password) values(?, ?, ?)';
    var query = db.format(sql, [name, email, password]);

    console.log(req.body);

    db.query(query, (err, results, fds) => {
        if (err) throw err;
        
        console.log(results);
        res.status(200).json({message : "OK"});    
    });
});

// 3. user 수정
router.put('/:id', (req, res, next) => {
    console.log("update one");

    const { name, email, password } = req.body;

    const keys = Object.keys(req.body);
    console.log(keys);

    const { id } = req.params;
    var search = db.format('select *' + from + where, [id]);
    var update = db.format('update users set name = ?, email = ?, password = ? where uid = ?', [name, email, password, id]);


    db.query(search, (err, results, fds) => {
        if (err) throw err;
        console.log(results);

        db.query(update, (err, results, fds) => {
            if (err) throw err;
            res.status(200).json({ message : "OK"});
        })
    })
});

// 4. user 삭제
router.delete('/:id', (req, res, next) => {
    console.log("delete one");

    const { id } = req.params;
    var search = db.format('select *' + from + where, [id]);
    var del = db.format('delete' + from + where, [id]);

    db.query(search, (err, results, fds) => {
        if (err) throw err;
        console.log(results);

        db.query(del, (err, results, fds) => {
            if (err) throw err;
            res.status(200).json({ massage : "OK"});
        })
    })
})

module.exports = router;