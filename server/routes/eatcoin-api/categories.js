const { json } = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const { listenerCount } = require('../../lib/config');
const router = express.Router();
const db = require('../../lib/config');
const getDate = require('../../lib/etc');

router.use(morgan("combined"));

// 1. 카테고리 조회
router.get('/', (req, res) => {
    console.log("search all categories");

    const sql = `select * from categories`;
    const list = [];

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        result.map(data => {
            let { ...cate } = {
                cid : data.cid,
                name : data.name,
                image : data.image,
            };

            list.push(cate);
        })

        console.log(list);
        res.status(200).json(list);

    })
})

// 1-1. 특정 카테고리 조회
router.get('/:id', (req, res) => {
    console.log("search all categories");

    const id = req.params.id;
    const sql = `select * from categories where cid = ${id}`;
    const list = [];

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        let { ...cate } = {
            cid : result[0].cid,
            name : result[0].name,
            image : result[0].image,
        };

        console.log(cate);
        res.status(200).json(cate);

    })
})

// 2, 카테고리 추가
router.post('/', (req, res) => {
    console.log("add category");

    const { name, image } = req.body;
    const sql = `insert into categories(name, image) values('${name}', '${image}')`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        console.log(result);
        res.status(200).json({ message : "OK" });
    });

})

// 3. 카테고리 수정
router.put('/:id', (req, res) => {
    console.log("Edit category");

    const id = req.params.id;
    const { name, image } = req.body;
    const sql = `update categories set name = '${name}', image = '${image}' where cid = ${id}`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        console.log(result);

        res.status(200).json({message : "OK"});
    })
})

// 4. 카테고리 삭제 (하위에 데이터 있으면 기타 카테고리로 이동)
router.delete('/:id', (req, res) => {
    console.log("Delete category");

    const id = req.params.id;
    const sql = `delete from categories where cid = ${id}`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        console.log(result);
        res.status(200).json({message : "OK"});
    })
})

module.exports = router;