const { json } = require('body-parser');
var express = require('express');
const morgan = require('morgan');
var router = express.Router();
var db = require('../../lib/config');

router.use(morgan("combined"));

var from = ' from histories';
var where = ' where hid = ?';

// todo: 에러 핸들링!!!

// 1-1. 내역 조회
router.get('/', function(req, res, next) {
    console.log("find all");

    db.query('select h.hid, h.title, h.amount, h.payment_date, h.category, c.name, c.type, c.image from histories as h inner join categories as c on h.category = c.cid order by h.hid asc', (err, results, fds) => {
    if (err) throw err;

    var list = [];

    for(var i = 0; i < results.length; i++) {
        var obj = {
            hid : 1,
            title : "",
            amount : 1,
            payment_date : "",
            category : {}
        };

        var cate = {
            cid : 1,
            name : "",
            type : "",
            image : ""
        };

        for(var key in results[i]) {
            if (key == 'cid' || key == 'name' || key == 'type' || key == 'image') {
                cate[key] = results[i][key];
                continue;
            }

            obj[key] = results[i][key];
        }
        
        obj['category'] = cate;
        // console.log(obj);
        list.push(obj);

        console.log(list[i]);
    }

    res.json(list);
    
    })
});

// 1-2. 특정 내역 조회
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

// 2. 내역 추가
router.post('/', (req, res, next) => {
    console.log("add one");

    const { title, amount, payment_date, category, isfixed, card, memo } = req.body;
    var sql = 'insert into users(title, amount, payment_date, category, isfixed, card, memo) values(?, ?, ?, ?, ?, ?, ?)';
    var query = db.format(sql, [title, amount, payment_date, category, isfixed, card, memo]);

    console.log(req.body);

    db.query(query, (err, results, fds) => {
        if (err) throw err;
        
        console.log(results);
        res.status(200).json({message : "OK"});    
    });
});

// 3. 내역 수정
router.put('/:id', (req, res, next) => {
    console.log("update one");

    const { title, amount, payment_date, category, isfixed, card, memo } = req.body;

    const keys = Object.keys(req.body);
    console.log(keys);

    const { id } = req.params;
    var search = db.format('select *' + from + where, [id]);
    var update = db.format('update users set title = ?, amount = ?, payment_date = ?, category = ?, isfixed = ?, card = ?, memo  = ? where hid = ?', [title, amount, payment_date, category, isfixed, card, memo, id]);


    db.query(search, (err, results, fds) => {
        if (err) throw err;
        console.log(results);

        db.query(update, (err, results, fds) => {
            if (err) throw err;
            res.status(200).json({ message : "OK"});
        })
    })
});

// 4. 내역 삭제
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