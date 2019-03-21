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
// app.get()と同様にreqとresを引数に持つ
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise // Promiseは非同期処理を操作できる。非同期処理の成功時(resolve)、失敗時(reject)の処理を明示的に書くことが出来る。
  
    .all(req.body.events.map(handleEvent)) // Promise.all()は、引数に指定した全てのPromiseを実行するメソッド。全てのPromiseが履行(fulfilled)になるか、または1つでも拒否(rejected)になった時点で処理が終了します。

    .then((result) => res.json(result)); // thenでresolveされた時の処理
});

//==========================以下をいったん削除=======================

//============================test=================================

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    
    // 成功 -> resolve(渡したい値)
    return Promise.resolve(null);
  }
  
   var randam = Math.floor(Math.random() * 13);
   
   if(randam === 0){
    randam = "一度無くした信用取り戻すのは最初に信用作るより大変なんだ。";
  }else if(randam === 1){
    randam = "いいンじゃねーの？敵を作れねェのは善人ぶって自分に嘘を付く弱い人間だ。\n自分の本心に向き合っている分マシじゃねェーか。";
  }else if(randam === 2){
    randam = "死にてぇなら、生命保険、加入してからにしろ。返済がまだだぜ!";
  }else if(randam === 3){
    randam = "人にやっちゃいけねえ事なんてねえ。罪を背負う覚悟があればな。";
  }else if(randam === 4){
    randam = "人は嘘を平気でつく。行動で示す奴しか俺は信用しねぇ。";
  }else if(randam === 5){
    randam = "やる時は徹底的にやれ！！じゃねェーと、全部奪られちまうぞ！";
  }else if(randam === 6){
    randam = "テメェのケツはテメェで拭かねェーと人は何も変わらねェーんだ";
  }else if(randam === 7){
    randam = "自分がしてきた事の責任を何処かできちんと取れば人は変わる。";
  }else if(randam === 8){
    randam = "テメェーみてェなアホを生んだツケに\nテメェーの親は100万円払った……\nテメェー自身も100万円分の代償を覚悟しろよ!";
  }else if(randam === 9){
    randam = "ギャンブルにハマった奴の明日は信用しねェ!";
  }else if(randam === 10){
    randam = "結果なんて、どーでもイイ！\nこのテストは課程が重要なんだ。\n人に答えを求めﾝな！テメーで考えろってコトだ！";
  }else if(randam === 11){
    return client.replyMessage(event.replyToken,{
      "type": "image",
      "originalContentUrl": "https://livedoor.blogimg.jp/dondonosigoto/imgs/9/6/961e7afe.png",
      "previewImageUrl": "https://livedoor.blogimg.jp/dondonosigoto/imgs/9/6/961e7afe.png"
    });
  }else if(randam === 12){
    return client.replyMessage(event.replyToken,{
      "type": "image",
      "originalContentUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuLxdh0iDdeIPRCkTh49OAT47FGLPw16HDwZ9e6_5uk7oF9n61fQ",
      "previewImageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuLxdh0iDdeIPRCkTh49OAT47FGLPw16HDwZ9e6_5uk7oF9n61fQ"
    });
  }
  
   const echo = { type: 'text', text: randam };
  // const echo = { type: 'text', text: event.message.text };


  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

 

//=================================================================

// listen on port
// Expressの起動
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