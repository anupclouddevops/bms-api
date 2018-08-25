var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var itemsRouter = require('./routes/items');
var totalsRouter = require('./routes/totals')
var bgtRouter = require('./routes/budget')
var userRouter = require('./routes/user')
var mongoose = require('mongoose')
var swaggerUi = require('swagger-ui-express')
var swaggerDocument = require('./swagger.json');

// Connection to MongoDB hosted on mLab
mongoose.connect(`mongodb://budgetappuser:${process.env.MONGO_DB_PASSWORD}@ds113732.mlab.com:13732/budgetappdb`);

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// API endpoints
app.use('/items', itemsRouter);
app.use('/totals', totalsRouter);
app.use('/budget', bgtRouter)
app.use('/user', userRouter);

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
  res.send(err);
});

module.exports = app;
