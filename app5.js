"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// ==========================================
// 既存の課題: 京葉線データ定義
// ==========================================
let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

// ==========================================
// 最終課題用データ定義 (DBの代わり)
// ==========================================
let book_list = [
  { id: 1, title: "こころ", author: "夏目漱石", price: 400, publisher: "新潮文庫" },
  { id: 2, title: "人間失格", author: "太宰治", price: 350, publisher: "角川文庫" }
];

let product_list = [
  { id: 1, code: "A001", name: "鉛筆", category: "文房具", price: 100 },
  { id: 2, code: "F002", name: "おにぎり", category: "食品", price: 150 }
];

let user_list = [
  { id: 1, userid: "taro01", name: "山田太郎", age: 20, email: "taro@example.com" },
  { id: 2, userid: "hanako02", name: "佐藤花子", age: 22, email: "hanako@example.com" }
];


// ==========================================
// 京葉線アプリ (station2)
// ==========================================

// 一覧
app.get("/keiyo2", (req, res) => {
  res.render('keiyo2', {data: station2} );
});

// Create (画面)
app.get("/keiyo2/create", (req, res) => {
  res.redirect('/public/keiyo2_new.html');
});

// Read
app.get("/keiyo2/:number", (req, res) => {
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {id: number, data: detail} );
});

// Delete
app.get("/keiyo2/delete/:number", (req, res) => {
  station2.splice( req.params.number, 1 );
  res.redirect('/keiyo2' );
});

// Create (処理)
app.post("/keiyo2", (req, res) => {
  const id = station2.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;
  station2.push( { id: id, code: code, name: name, change: change, passengers: passengers, distance: distance } );
  res.render('keiyo2', {data: station2} );
});

// Edit
app.get("/keiyo2/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_edit', {id: number, data: detail} );
});

// Update
app.post("/keiyo2/update/:number", (req, res) => {
  station2[req.params.number].code = req.body.code;
  station2[req.params.number].name = req.body.name;
  station2[req.params.number].change = req.body.change;
  station2[req.params.number].passengers = req.body.passengers;
  station2[req.params.number].distance = req.body.distance;
  res.redirect('/keiyo2' );
});


// ==========================================
// 1. 書籍管理アプリ (books)
// ==========================================

// 一覧表示
app.get("/books", (req, res) => {
  res.render('book_list', {data: book_list});
});

// 新規登録画面 (静的HTMLへ)
app.get("/books/create", (req, res) => {
  res.redirect('/public/book_new.html');
});

// 詳細表示
app.get("/books/:number", (req, res) => {
  const number = req.params.number;
  const detail = book_list[number];
  res.render('book_detail', {id: number, data: detail});
});

// 削除処理 (GET)
app.get("/books/delete/:number", (req, res) => {
  book_list.splice(req.params.number, 1);
  res.redirect('/books');
});

// 新規登録処理 (POST)
app.post("/books", (req, res) => {
  const id = book_list.length + 1;
  const title = req.body.title;
  const author = req.body.author;
  const price = req.body.price;
  const publisher = req.body.publisher;
  book_list.push({ id: id, title: title, author: author, price: price, publisher: publisher });
  res.redirect('/books');
});

// 編集画面表示
app.get("/books/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = book_list[number];
  res.render('book_edit', {id: number, data: detail});
});

// 更新処理 (POST)
app.post("/books/update/:number", (req, res) => {
  book_list[req.params.number].title = req.body.title;
  book_list[req.params.number].author = req.body.author;
  book_list[req.params.number].price = req.body.price;
  book_list[req.params.number].publisher = req.body.publisher;
  res.redirect('/books');
});

// ==========================================
// 2. 商品管理アプリ (products)
// ==========================================

// 一覧
app.get("/products", (req, res) => {
  res.render('product_list', {data: product_list});
});

// 新規登録 (画面)
app.get("/products/create", (req, res) => {
  res.redirect('/public/product_new.html');
});

// 詳細
app.get("/products/:number", (req, res) => {
  const number = req.params.number;
  const detail = product_list[number];
  res.render('product_detail', {id: number, data: detail});
});

// 削除 (GET)
app.get("/products/delete/:number", (req, res) => {
  product_list.splice(req.params.number, 1);
  res.redirect('/products');
});

// 新規登録 (処理)
app.post("/products", (req, res) => {
  const id = product_list.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const category = req.body.category;
  const price = req.body.price;
  product_list.push({ id: id, code: code, name: name, category: category, price: price });
  res.redirect('/products');
});

// 編集 (画面)
app.get("/products/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = product_list[number];
  res.render('product_edit', {id: number, data: detail});
});

// 更新 (処理)
app.post("/products/update/:number", (req, res) => {
  product_list[req.params.number].code = req.body.code;
  product_list[req.params.number].name = req.body.name;
  product_list[req.params.number].category = req.body.category;
  product_list[req.params.number].price = req.body.price;
  res.redirect('/products');
});


// ==========================================
// 3. ユーザー管理アプリ (users)
// ==========================================

// 一覧
app.get("/users", (req, res) => {
  res.render('user_list', {data: user_list});
});

// 新規登録 (画面)
app.get("/users/create", (req, res) => {
  res.redirect('/public/user_new.html');
});

// 詳細
app.get("/users/:number", (req, res) => {
  const number = req.params.number;
  const detail = user_list[number];
  res.render('user_detail', {id: number, data: detail});
});

// 削除 (GET)
app.get("/users/delete/:number", (req, res) => {
  user_list.splice(req.params.number, 1);
  res.redirect('/users');
});

// 新規登録 (処理)
app.post("/users", (req, res) => {
  const id = user_list.length + 1;
  const userid = req.body.userid;
  const name = req.body.name;
  const age = req.body.age;
  const email = req.body.email;
  user_list.push({ id: id, userid: userid, name: name, age: age, email: email });
  res.redirect('/users');
});

// 編集 (画面)
app.get("/users/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = user_list[number];
  res.render('user_edit', {id: number, data: detail});
});

// 更新 (処理)
app.post("/users/update/:number", (req, res) => {
  user_list[req.params.number].userid = req.body.userid;
  user_list[req.params.number].name = req.body.name;
  user_list[req.params.number].age = req.body.age;
  user_list[req.params.number].email = req.body.email;
  res.redirect('/users');
});
// ==========================================
// その他の練習用コード
// ==========================================
app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';

  // 勝敗判定ロジック
  if (hand === cpu) {
      judgement = 'あいこ';
  } else if (
      (hand === 'グー' && cpu === 'チョキ') ||
      (hand === 'チョキ' && cpu === 'パー') ||
      (hand === 'パー' && cpu === 'グー')
  ) {
      judgement = '勝ち';
      win += 1;
  } else {
      judgement = '負け';
  }
  total += 1;

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});
// トップページ (メニュー)
app.get("/", (req, res) => {
  res.render('index');
});
app.listen(8080, () => console.log("Example app listening on port 8080!"));