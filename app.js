'use strict';

// line sdkを使うためのsdkを読み込み
const line = require('@line/bot-sdk');

// expressはnode.jsで使用できるwebアプリケーションフレームワーク(rails的なやつ)
const express = require('express');

// line Messenger登録時にもらえるトークン諸々
const defaultAccessToken = 'pvrOp3FU+E2M3bM5HzAvz+m8rh1er/aLXrYRmf38m63SME6AYlKTjEFQDcEw5S83uwym/nFlKC1mG+OdE26JCPdpY0gvzY6UvhgVHxTusSQ/iGpQ2AgesP0tNqeRc+x8pbPYd0jH6JOXm71sm0MVzwdB04t89/1O/w1cDnyilFU=';
const defaultSecret = 'a624fb16c0828e450002e369a918e859';

// config変数に対して上記で設定したトークン類か、
// HerokuのSettings / Config Variables にCHANNEL_ACCESS_TOKENとCHANNEL_SECRETに設定したトークン類を取得。
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || defaultAccessToken,
  channelSecret: process.env.CHANNEL_SECRET || defaultSecret,
};

// newを使うとなんちゃってインスタンスを生成できる。なんちゃってな理由はjavascript自体がプロトタイプベースのオブジェクト指向を採用しているので、クラスがない。
// オブジェクトしかない。今回生成しているなんちゃってインスタンス名はline、
// newで生成されたなっちゃてインスタンス(lineオブジェクト)でClientプロパティを使用して,このファイル内のconfigをプロパティとして参照している
const client = new line.Client(config);


// node.jsフレームワークを取得(なんちゃってrails)
// Express は、それ自体では最小限の機能を備えたルーティングとミドルウェアの Web フレームワーク
// https://expressjs.com/ja/guide/using-middleware.html
const app = express();


// app.get('/')は、/ にアクセスする度に呼び出されるコールバック関数を定義する。
// コールバック関数はreqとresを引数に持ちresponseでsendを呼び出して'hello world'を出力している
app.get('/', (req, res) => {
  res.send('Hello World!');
});


// app.post('/webhook')にアクセスする度に呼び出されるコールバック関数
// app.get()と同様にreqとresを引数に持ち,
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise // Promiseは非同期処理を操作できる。　非同期処理の成功時(resolve)、失敗時(reject)の処理を明示的に書くことが出来る。　
    .all(req.body.events.map(handleEvent))  // handEventは以下で定義されている
    // res.jsonはJSON レスポンスを送信する。
    .then((result) => res.json(result));
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  // const echo = { type: 'text', text: event.message.text };
   const echo = { type: 'text', text: "金が全てじゃないけど、ほとんどの問題は金で解決できるだろ" };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});


// Line botはどうやってプログラムを実行しているの？-> Procfileが大きな役割を担っている。
// herokuでResourceページを見てみると、Free Dynosの欄にこのファイルの中身が記述されているのが確認できる。
// LINE botからHerokuにプログラムが呼び出されると、Procfile参照 -> Procfileの中にはどのページを読み込むか記述されている。
// これが実行されてapp.jsが立ち上がる、という仕組み。


// コードを編集したら毎回以下のコードを打ってherokuにupdateを教えてあげないといけない。

// $ heroku login
// $ git init
// $ heroku git:remote -a ushijima-bot
// $ git add .
// $ git commit -am "First Commit."
// $ git push heroku master