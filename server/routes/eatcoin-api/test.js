var results = [
  {
    hid: 1,
    title: "삼첩분식",
    amount: 18000,
    payment_date: "22-10-01",
    category: 1,
    name: "식비1",
    type: "지출1",
    image: "http://1",
  },
  {
    hid: 2,
    title: "교촌",
    amount: 10000,
    payment_date: "22-10-11",
    category: 2,
    name: "식비2",
    type: "지출2",
    image: "http://2",
  },
  {
    hid: 3,
    title: "BBQ",
    amount: 20000,
    payment_date: "22-10-13",
    category: 3,
    name: "식비3",
    type: "지출3",
    image: "http://3",
  },
];

var result_list = [];

/**
 * [Object Destructing] : 객체 분해하는 방식 (이하 OB)
 * 추가로, 배열 분해도 비슷하니 같이 보면 좋을 듯~!!
 * 관련 URL: https://ko.javascript.info/destructuring-assignment#ref-617
 *
 * [Spread Operator] : '...' -> 펼침 연산자
 * 관련 URL: https://paperblock.tistory.com/62
 */
results.filter((data, idx) => {
  console.log(`[INDEX ${idx}]`);

  let { ...cate } = {
    cid: data.category,
    name: data.name,
    type: data.type,
    image: data.image,
  };
  console.log("cate", cate);

  let { ...obj } = {
    hid: data.hid,
    title: data.title,
    amount: data.amount,
    payment_date: data.payment_date,
    category: { ...cate },
  };
  console.log("obj", obj, "\n");

  result_list.push(obj);
});

console.log("result_list", result_list);
