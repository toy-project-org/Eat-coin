const { json } = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const { query } = require('../../lib/config');
const router = express.Router();
const db = require('../../lib/config');
const getDate = require('../../lib/etc');

router.use(morgan("combined"));

// todo: 에러 핸들링, 로그 파일에 저장하기
// cors 찾아보기

// 1-1. 최근 내역 조회
router.get('/', function(req, res, next) {
    console.log("find recent");

    let list = [];
    const date = getDate(new Date());
    const sql = `select * from histories as h inner join categories as c on h.category = c.cid where payment_date >= "${date}" order by h.payment_date desc, h.hid desc`;

    console.log('a week ago', date);

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        result.map((data) => {
            let { ...history } = {
                hid : data.hid,
                title : data.title,
                amount : data.amount,
                payment_date : data.payment_date,
                type : data.type,
                category : {
                    cid : data.cid,
                    name : data.name,
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
    const sql = `select * from histories as h inner join categories as c on h.category = c.cid where h.hid = ${id}`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        result.map((data) => {
            let { ...detail } = {
                hid : data.hid,
                title : data.title,
                amount : data.amount,
                payment_date : data.payment_date,
                type : data.type,
                category : {
                    cid : data.cid,
                    name : data.name,
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
    const sql = `select * from histories as h inner join categories as c on h.category = c.cid where payment_date like "${date}%" order by h.payment_date desc, h.hid desc`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        result.map((data) => {
            let { ...history } = {
                hid : data.hid,
                title : data.title,
                amount : data.amount,
                payment_date : data.payment_date,
                type : data.type,
                category : {
                    cid : data.cid,
                    name : data.name,
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

    const { title, amount, payment_date, type, category, isfixed, method, memo } = req.body;
    const { name, image } = category;

    const sql_cid = `select cid from categories where name = '${name}'`;
    const sql_add_cid = `insert into categories(name, image) values('${name}', 'mdi-dots-horizontal-circle')`

    console.log(req.body);

    function findCid() {
        return new Promise(resolve => {
            db.query(sql_cid, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                console.log(`find ${name}`, result);
                resolve(result);
            })
        })
    }
    
    function addCid() {
        return new Promise(resolve => {
            db.query(sql_add_cid, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                console.log(`add ${name}`, result);
                resolve(result.insertId);
            })
        })
    }

    async function addHist() {
        let cid;
        const find = await findCid(cid);
        
        if (find.length == 0) {
            console.log(`not found ${name}`);
            cid = await addCid();
        } else {
            console.log(`exist ${name}`, find);
            cid = find[0].cid;
        }

        console.log('add hist');
        const sql_add = `insert into histories(title, amount, payment_date, type, category, isfixed, method, memo) values('${title}', ${amount}, '${payment_date}', '${type}', ${cid}, '${isfixed}', '${method}', '${memo}')`;
        db.query(sql_add, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            }

            console.log('add hist success', result);
            res.status(200).json({ message : 'OK' });
        })
    }

    addHist();
});

// 3. 내역 수정
router.put('/:id', (req, res, next) => {
    console.log("update one");

    const { id } = req.params;
    const { title, amount, payment_date, type, category, isfixed, method, memo } = req.body;
    const { name, image } = category;

    console.log(id, req.body);

    const sql_hid = `select * from histories where hid = ${id}`;
    const sql_cid = `select cid from categories where name = '${name}'`;
    const sql_add_cid = `insert into categories(name, image) values('${name}', 'mdi-dots-horizontal-circle')`

    function findHist() {
        return new Promise(resolve => {
            db.query(sql_hid, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }

                console.log(`find hist`, result);
                resolve(result);
            })
        })
    }

    function findCid() {
        return new Promise(resolve => {
            db.query(sql_cid, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                console.log(`find ${name}`, result);
                resolve(result);
            })
        })
    }
    
    function addCid() {
        return new Promise(resolve => {
            db.query(sql_add_cid, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                console.log(`add ${name}`, result);
                resolve(result.insertId);
            })
        })
    }

    async function editHist() {
        let cid;
        let find = await findHist();

        if (find.length == 0) {
            console.log('Not found');
            res.status(400).send(`[Not found] cid = ${cid}`);
        }

        find = await findCid();

        if (find.length == 0) cid = await addCid();
        else cid = find[0].cid;

        const sql_update = `update histories set title = '${title}', amount = ${amount}, payment_date = '${payment_date}', type = '${type}', category = ${cid}, isfixed = '${isfixed}', method = '${method}', memo = '${memo}' where hid = ${id}`;

        db.query(sql_update, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            }

            res.status(200).json({message : 'OK'});
        });
    }

    editHist();
});

// 4. 내역 삭제
router.delete('/:id', (req, res, next) => {
    console.log("delete one");

    const { id } = req.params;
    const search = `select * from histories where hid = ${id}`;
    const del = `delete from histories where hid = ${id}`;

    db.query(search, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        console.log(results);

        db.query(del, (err, results) => {
            if (err) throw err;
            res.status(200).json({ massage : "OK"});
        })
    });
});

module.exports = router;