const { json } = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const router = express.Router();
const db = require('../../lib/config');
const getDate = require('../../lib/etc');

router.use(morgan("combined"));

const from = ' from histories';
const where = ' where hid = ?';

// todo: 에러 핸들링!!!
// cors 찾아보기

// 1-1. 최근 내역 조회
router.get('/', function(req, res, next) {
    console.log("find recent");

    let list = [];
    const date = getDate().slice(2);
    const sql = `select * from histories as h inner join categories as c on h.category = c.cid where payment_date >= "${date}" order by h.hid asc`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        result.map((data) => {
            let { ...history } = {
                hid : data.hid,
                title : data.title,
                amount : data.amount,
                payment_date : data.payment_date,
                category : {
                    cid : data.cid,
                    name : data.name,
                    type : data.type,
                    image : data.image
                },
            };

            list.push(history);

        });

        console.log(list);
        res.json(list);
    });
});

// 1-2. 특정 내역 디테일 조회
router.get('/detail/:id', (req, res, next) => {
    console.log("find one");

    const list = [];
    const id = req.params.id;
    const sql = `select * from (histories as h inner join categories as c on h.category = c.cid) inner join details as d on c.cid = d.did where h.hid = "${id}" order by h.hid asc`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        result.map((data) => {
            let { ...detail } = {
                hid : data.hid,
                title : data.title,
                amount : data.amount,
                payment_date : data.payment_date,
                category : {
                    cid : data.cid,
                    name : data.name,
                    type : data.type,
                    image : data.image
                },
                isfixed : data.isfixed,
                method : data.method,
                memo : data.memo,
            }
            
            list.push(detail);

        });

        console.log(list);
        res.json(list);
    });
});

// 1-3. 월별 내역 조회
router.get('/:ym', (req, res, next) => {
    console.log("find month");

    const list = [];
    const date = req.params.ym;
    const sql = `select * from histories as h inner join categories as c on h.category = c.cid where payment_date like "${date}%" order by h.hid asc`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        result.map((data) => {
            let { ...history } = {
                hid : data.hid,
                title : data.title,
                amount : data.amount,
                payment_date : data.payment_date,
                category : {
                    cid : data.cid,
                    name : data.name,
                    type : data.type,
                    image : data.image
                }
            }
            
            list.push(history);
            
        });

        console.log(list);
        res.json(list);
    });
});

// 1-4. 연별 수입/지출 금액 조회
router.get('/amount/:date', (req, res, next) => {
    console.log('check amount');

    const date = req.params.date;
    const sql = `select * from histories as h inner join categories as c on h.category = c.cid where payment_date like "${date}%" order by h.hid asc`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        const income = result
        .filter(data => {return data.type == '수입'})
        .reduce((acc, data) => {return acc += data.amount}, 0);

        const expend = result
        .filter(data => {return data.type == '지출'})
        .reduce((acc, data) => {return acc += data.amount}, 0);
        
        let { ...amount } = {
            income,
            expend,
        };

        console.log(income, expend);
        res.json(amount);
    });
});

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
    });
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
    });
});

module.exports = router;