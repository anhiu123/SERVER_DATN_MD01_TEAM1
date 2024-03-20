

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
var voucherRouter = require('./routes/voucher');
// var loginRouter = require('./routes/login');

var apiSP = require('./routes/API/api.sanpham');
var apiTK = require('./routes/API/api.taikhoan');
var apiTL = require('./routes/API/api.theloai');
var apiM = require('./routes/API/api.mau');
var apiMSP = require('./routes/API/api.mausanpham');
var apiDH = require('./routes/API/api.donhang');
var apiDG = require('./routes/API/api.danhgia');
var apiTB = require('./routes/API/api.thongbao');
var apiTN = require('./routes/API/api.tinnhan');
var apiDCGH = require('./routes/API/api.dcgh');
var apiVC = require('./routes/API/api.voucher');

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
app.use('/voucher', voucherRouter);
// app.use('/login', loginRouter);

app.use('/api-sanpham', apiSP);
app.use('/api-taikhoan', apiTK);
app.use('/api-theloai', apiTL);
app.use('/api-mau', apiM);
app.use('/api-mausanpham', apiMSP);
app.use('/api-donhang', apiDH);
app.use('/api-danhgia', apiDG);
app.use('/api-thongbao', apiTB);
app.use('/api-tinnhan', apiTN);
app.use('/api-dcgh', apiDCGH);
app.use('/api-voucher', apiVC);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// const http = require('http');
// const socketIo = require('socket.io');


// const server = http.createServer(app);
// const io = socketIo(server);

// io.on('connection', (socket) => {
//     console.log('A client connected');

//     // Gửi danh sách đơn hàng tới máy khách khi có sự kiện 'updateOrders'
//     socket.on('sendMessage', (newMessage) => {
//       // Gửi tin nhắn mới tới tất cả các máy khách đang kết nối
//       io.emit('newMessage', newMessage);
//   });
// });

// const PORT = process.env.PORT || 3001;
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

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
