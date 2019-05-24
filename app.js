var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var session = require('express-session');
var token = require('./untils/token')

var { Mongoose } = require('./untils/config')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));



//设置跨域访问
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", " * ");
  res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("X-Powered-By", '3.2.1')
  if (req.method == "OPTIONS") res.send(200);
  else next();
});

app.use(
  session({
    secret: 'euse.vip',              //  用来对session_id相关的cookie进行签名
    resave: false,
    saveUninitialized: true,
    cookie: { userName: "default", maxAge: 7 * 24 * 60 * 60 * 1000 }    // 设置有效期
  })
)


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'jade');

app.use('/server/public', express.static(path.join(__dirname, '/public')));//静态资源托管
app.use('/login', function (req, res, next) {
  res.redirect('/admin#/login/');
});

app.use('/admin', express.static(path.join(__dirname, '/views/index.html')));
app.use('/index', express.static(path.join(__dirname, '/views/client.html')));

app.use('/api/user', require('./routes/users'));
app.use('/api/category', require('./routes/category'));
app.use('/api/article', require('./routes/article'));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


//登录拦截器
app.use(function (req, res, next) {
  var url = req.originalUrl;
  console.log('=============token');
  console.log(req.get("Authorization"));
  if (token.checkToken(req.get("Authorization").split(' ')[1]) && url != '/login') {
    return res.redirect("/login");
  }
  next();
});

Mongoose.connect();

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
