const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { bottender } = require('bottender');

const app = bottender({
  dev: process.env.NODE_ENV !== 'production',
});

const port = Number(process.env.PORT) || 5000;

// the request handler of the bottender app
const handle = app.getRequestHandler();

// setup MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/messenger-bot';
const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology : true
};

mongoose
  .connect(MONGO_URI, mongooseOptions)
  .then(() => console.log('Connected to DB!'))

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

require('./model/Message')

//declare route
const messageRouter = require('./routes/index')

app.prepare().then(() => {
  const server = express();

  const verify = (req, _, buf) => {
    req.rawBody = buf.toString();
  };
  server.use(bodyParser.json({ verify }));
  server.use(bodyParser.urlencoded({ extended: false, verify }));

  // // your custom route
  // server.get('/api', (req, res) => {
  //   res.json({ ok: true });
  // });

  server.use('/api', messageRouter)

  // route for webhook request
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
