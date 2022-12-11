const { json } = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const router = express.Router();
const db = require('../../lib/config');
const getDate = require('../../lib/etc');

router.use(morgan("combined"));

// todo: 에러 핸들링!!!
// cors 찾아보기

// 1-1. 최근 내역 조회
router.get('/', function(req, res, next) {
    console.log("find recent");

    let list = [];
    const date = getDate(new Date());
    const sql = `select * from histories as h inner join categories as c on h.category = c.cid where payment_date >= "${date}" order by h.hid asc`;

    console.log('a week ago', date);

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
                isfixed : data.isfixed,
                method : data.method,
                memo : data.memo,
            };

            list.push(history);

        });

        console.log(list);
        res.json(list);
    });
});

// 1-2. 특정 내역 조회
router.get('/:id', (req, res, next) => {
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
router.get('/month/:ym', (req, res, next) => {
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
                },
                isfixed : data.isfixed,
                method : data.method,
                memo : data.memo,
            }
            
            list.push(history);

        });

        console.log(list);
        res.json(list);
    });
});

// 2. 내역 추가
router.post('/', (req, res, next) => {
    console.log("add one");

    const { title, amount, payment_date, category, isfixed, method, memo } = req.body;
    const { name, type, image } = category;

    const sql_cid = `select cid from categories where name = '${name}' and type = '${type}'`;

    db.query(sql_cid, (err, result) => {
        if (err) throw err;

        console.log(result);

        const cid = result[0].cid;
        const sql_add = `insert into histories(title, amount, payment_date, category, isfixed, method, memo) values('${title}', ${amount}, '${payment_date}', ${cid}, '${isfixed}', '${method}', '${memo}')`;

        db.query(sql_add, (err, result) => {
            if (err) throw err;

            res.status(200).json({message : 'OK'});
        });
    });
});

// 3. 내역 수정
router.put('/:id', (req, res, next) => {
    console.log("update one");

    const { id } = req.params;
    const { title, amount, payment_date, category, isfixed, method, memo } = req.body;
    const { name, type, image } = category;

    console.log(id, req.body);

    const sql_hid = `select * from histories where hid = ${id}`;
    const sql_cid = `select cid from categories where name = '${name}'`;

    // 해당 목록 있는지 체크
    db.query(sql_hid, (err, result) => {
        if (err) throw err;
        console.log(result);

        // cid 입력을 위해 카테고리 이름으로 아이디 찾음
        db.query(sql_cid, (err, result) => {
            if (err) throw err;
            
            console.log(result);

            const cid = result[0].cid;
            const sql_update = `update histories set title = '${title}', amount = ${amount}, payment_date = '${payment_date}', category = ${cid}, isfixed = '${isfixed}', method = '${method}', memo = '${memo}' where hid = ${id}`;
            console.log(sql_update);
            // 찾은 cid와 함께 목록 업데이트
            db.query(sql_update, (err, result) => {
                if (err) throw err;
                res.status(200).json({message : 'OK'});
            });
        });
    });
});

// 4. 내역 삭제
router.delete('/:id', (req, res, next) => {
    console.log("delete one");

    const { id } = req.params;
    const search = `select * from histories where hid = ${id}`;
    const del = `delete from histories where hid = ${id}`;

    db.query(search, (err, results) => {
        if (err) throw err;
        console.log(results);

        db.query(del, (err, results) => {
            if (err) throw err;
            res.status(200).json({ massage : "OK"});
        })
    });
});

module.exports = router;