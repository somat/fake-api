var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

let data = []

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Allow CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

router.get('/', (req, res) => {
  return res.json({message: 'Hello world'})
});

router.post('/login', (req, res) => {
  if (req.body.username === 'airputih' && req.body.password === 'rahasia') {
    return res.json({
      success: true,
      message: 'Authentication success',
      token: Math.random().toString(36).substring(2, 20)
    })
  } else {
    return res.json({
      success: false,
      message: 'Authentication failed'
    })
  }
});

router.get('/post', (req, res) => {
  return res.json({
    success: true,
    message: 'List article success',
    data: data
  })
})

router.post('/post', (req, res) => {
  data.push(req.body.article)

  return res.json({
    success: true,
    message: 'Post article success',
    data: data
  })
})

app.use(router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err)

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500)
  .json({
    success: false,
    message: err
  });
});

module.exports = app;
