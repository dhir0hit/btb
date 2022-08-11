var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongo = require('mongodb')
const connectionUrl = 'mongodb+srv://admin:admin1234567890@btbdb.ivtsmni.mongodb.net/?retryWrites=true&w=majority';
var monk = require('monk');
var db = monk(connectionUrl);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

var app = new express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// loading db in website
app.use(function (req, res, next) {
    req.db = db;
    next();
});

/* Loading session in website
 * key is set to secreetKeeey will be randomly set each session
 * setting it to last 600000 milliseconds*/
app.use(session({
    secret: "secreetKeeey",
    saveUninitialized:true,
    cookie: {maxAge: 600000},
    resave: false
}));


app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/product', productsRouter);

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
