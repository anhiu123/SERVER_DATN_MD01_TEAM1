var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var taikhoanRouter = require('./routes/taikhoan');
var sanphamRouter = require('./routes/sanpham');
var theloaiRouter = require('./routes/theloai');
var sizeRouter = require('./routes/size');
var mauRouter = require('./routes/mau');
var thongkeRouter = require('./routes/thongke');
var chatRouter = require('./routes/chat');
// var loginRouter = require('./routes/login');

var apiSP = require('./routes/API/api.sanpham');
var apiTK = require('./routes/API/api.taikhoan');
var apiTL = require('./routes/API/api.theloai');
var apiM = require('./routes/API/api.mau');
var apiMSP = require('./routes/API/api.mausanpham');
var apiDH = require('./routes/API/api.donhang');
var apiDG = require('./routes/API/api.danhgia');
var apiTB = require('./routes/API/api.thongbao');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret:'nhNNGHSNFGH83sdf23435Fdzgsfnksjdfh9', // chuỗi ký tự đặc biệt để Session mã hóa, tự viết
  resave:true,
  saveUninitialized:true
  }));
  


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/sanpham', sanphamRouter);
app.use('/taikhoan', taikhoanRouter);
app.use('/theloai', theloaiRouter);
app.use('/size', sizeRouter);
app.use('/mau', mauRouter);
app.use('/thongke', thongkeRouter);
app.use('/chat', chatRouter);
// app.use('/login', loginRouter);

app.use('/api-sanpham', apiSP);
app.use('/api-taikhoan', apiTK);
app.use('/api-theloai', apiTL);
app.use('/api-mau', apiM);
app.use('/api-mausanpham', apiMSP);
app.use('/api-donhang', apiDH);
app.use('/api-danhgia', apiDG);
app.use('/api-thongbao', apiTB);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
