'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

const defaultAccessToken = 'PS2uwMMzJqD1VhKeggCYoQXuS8N1XmQel8U5kfBnww1bh5VBGZvXFMTH0U08IBlMuwym/nFlKC1mG+OdE26JCPdpY0gvzY6UvhgVHxTusSSmfyMueu8KKhHTAWOG6lcPg5GnUMX4MKfdV24EARzt8QdB04t89/1O/w1cDnyilFU=';
const defaultSecret = 'a624fb16c0828e450002e369a918e859';

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || defaultAccessToken,
  channelSecret: process.env.CHANNEL_SECRET || defaultSecret,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});