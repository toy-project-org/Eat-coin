const { json } = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const { listenerCount } = require('../../lib/config');
const router = express.Router();
const db = require('../../lib/config');
const getDate = require('../../lib/etc');

router.use(morgan("combined"));

// 1. 자산 조회
router.get('/', (req, res) => {
    console.log("search all assets");

    const sql = `select * from asset`;
    const list = [];

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        result.map(data => {
            let { ...asset } = {
                aid : data.aid,
                name : data.name,
                image : data.image,
            };

            list.push(asset);
        })

        console.log(list);
        res.status(200).json(list);

    })
})

// 1-1. 특정 자산 조회
router.get('/:id', (req, res) => {
    console.log("search all asset");

    const id = req.params.id;
    const sql = `select * from asset where aid = ${id}`;
    const list = [];

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        let { ...cate } = {
            aid : result[0].aid,
            name : result[0].name,
            image : result[0].image,
        };

        console.log(cate);
        res.status(200).json(cate);

    })
})

// 2, 자산 추가
router.post('/', (req, res) => {
    console.log("add asset");

    const { name, image } = req.body;
    const sql = `insert into asset(name, image) values('${name}', '${image}')`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        console.log(result);
        res.status(200).json({ message : "OK" });
    });

})

// 3. 자산 수정
router.put('/:id', (req, res) => {
    console.log("Edit asset");

    const id = req.params.id;
    const { name, image } = req.body;
    const sql = `update asset set name = '${name}', image = '${image}' where aid = ${id}`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        console.log(result);

        res.status(200).json({message : "OK"});
    })
})

// 4. 자산 삭제
router.delete('/:id', (req, res) => {
    console.log("Delete asset");

    const id = req.params.id;
    const sql = `delete from asset where aid = ${id}`;

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