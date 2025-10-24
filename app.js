// --- ここから ---
const express = require("express");
const app = express();

// 問題点２の修正：EJSを使えるように設定する
app.set('view engine', 'ejs');

// 問題点１の修正：URLに/publicを不要にする
app.use(express.static('public'));

// ----------------------------------------------
// ↓↓↓ 作成したじゃんけんの処理はここに書きます ↓↓↓
// ----------------------------------------------

// ===== ラジオボタン版じゃんけんの処理を追加 =====
app.get("/janken_radio", (req, res) => {
  // EJSが使えるように、一番上に app.set('view engine', 'ejs'); が必要です

  // 1. ブラウザから送られてきたデータを変数に入れる
  let userHand = req.query.hand;
  let win = Number(req.query.win);
  let total = Number(req.query.total);

  // 2. コンピュータの手をランダムで決める
  let comHand;
  const rand = Math.random() * 3;
  if (rand < 1) {
    comHand = "グー";
  } else if (rand < 2) {
    comHand = "チョキ";
  } else {
    comHand = "パー";
  }

  // 3. 勝敗を判定する
  let result;
  if (userHand === comHand) {
    result = "あいこ";
  } else if (
    (userHand === "グー" && comHand === "チョキ") ||
    (userHand === "チョキ" && comHand === "パー") ||
    (userHand === "パー" && comHand === "グー")
  ) {
    result = "勝ち";
    win++; // 勝利数を1増やす
  } else {
    result = "負け";
  }

  // 4. 対戦数を1増やす
  total++;

  // 5. EJSテンプレートにデータを渡して、画面を表示する
  res.render('janken_radio', { // .ejsは省略できます
    result: result,
    userHand: userHand,
    comHand: comHand,
    win: win,
    total: total
  });
});

// ----------------------------------------------
// ↑↑↑ 作成したじゃんけんの処理はここに書きます ↑↑↑
// ----------------------------------------------

// 問題点３の修正：404エラー処理は、全ての正しいページの処理の後に書く
app.use( (req, res, next) => {
  res.status(404).send('ページが見つかりません');
});

// 問題点３の修正：サーバー起動の命令は、必ずファイルの最後に書く
app.listen(8080, () => console.log("Example app listening on port 8080!"));

// --- ここまで ---