const { json } = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const router = express.Router();
const db = require('../../lib/config');
const getDate = require('../../lib/etc');

router.use(morgan("combined"));

const getToday = (today) => {
  const y = today.getFullYear();
  const m = today.getMonth() + 1;
  const d = today.getDate();
  
  return `${y}-${m}-${d}`;
}

// 1. 수입/지출 금액 통계
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

// 1-2. 수입/지출 한달 일별 금액 통계
router.get('/amount/detail/:date', (req, res, next) => {
  console.log('check amount for a month');

  const date = req.params.date;
  //const sql = `select * from histories as h inner join categories as c on h.category = c.cid where payment_date like "${date}%" order by payment_date asc`;
  //const sql_date = `select distinct payment_date from histories as h inner join categories as c on h.category = c.cid where payment_date like "${date}%" order by payment_date asc`;

  const list = [];
  const sql = `select payment_date as date, sum(if(c.type = '지출', h.amount, 0)) as expend, sum(if(c.type = '수입', h.amount, 0)) as income from histories as h inner join categories as c on h.category = c.cid where payment_date like "${date}%" group by h.payment_date order by h.payment_date`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    
    console.log(result);

    result.map(data => {

      let { ...amount } = {
        date : data.date,
        income : data.income,
        expend : data.expend,
      };

      list.push(amount);
    });

    console.log(list);
    res.status(200).json(list);


    // const income = result
    // .filter(data => {return data.type == '수입'})
    // .reduce((acc, data) => {return acc += data.amount}, 0);

    // const expend = result
    // .filter(data => {return data.type == '지출'})
    // .reduce((acc, data) => {return acc += data.amount}, 0);
    
    // let { ...amount } = {
    //     income,
    //     expend,
    // };

    // console.log(income, expend);
    // res.json(amount);
  });
});

// 2. 자산별 통계
router.get('/asset', (req, res) => {
  console.log('check asset statistics');

  const today = getToday(new Date()).slice(0,7);

  console.log(today);

  const list = [];
  const sql_asset = `select * from asset`;
  const sql_hist = `select amount, method from histories where payment_date like '${today}%'`;

  db.query(sql_asset, (err, result) => {
    if (err) throw err;

    db.query(sql_hist, (err, result2) => {
      if (err) throw err;

      result.map((assets) => {
        const sum = result2
        .filter(hists => {return hists.method == assets.name})
        .reduce((acc, data) => {return acc += data.amount}, 0);
        
        let { ...info } = {
          asset : assets.name,
          account : sum,
        }

        list.push(info);
      });

      console.log(list);
      res.status(200).json(list);
    });
  });
});

// 2-1. 특정 년월 자산 통계
router.get('/asset/:ym', (req, res) => {
  console.log('check asset statistics');

  const date = req.params.ym;
  console.log(date);

  const list = [];
  const sql_asset = `select * from asset`;
  const sql_hist = `select amount, method from histories where payment_date like '${date}%' order by name`;

  console.log(sql_hist);
  db.query(sql_asset, (err, result) => {
    if (err) throw err;
    
    console.log(result);
    db.query(sql_hist, (err, result2) => {
      if (err) throw err;

      console.log(result2);

      result.map((assets) => {
        const sum = result2
        .filter(hists => {return hists.method == assets.name})
        .reduce((acc, data) => {return acc += data.amount}, 0);
        
        let { ...info } = {
          asset : assets.name,
          account : sum,
        }

        list.push(info);
      });

      console.log(list);
      res.status(200).json(list);
    });
  });
});


// 3. 카테고리별 통계
router.get('/category', (req, res) => {
  console.log(`check category statistics`);

  const list = [];
  const sql_cate = `select * from categories`;
  const sql_hist = `select amount, category from histories`;

})

// 4. 

module.exports = router;
