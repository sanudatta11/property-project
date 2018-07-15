var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var propertyRouter = require('./routes/property.js');

var app = express();

// database connection
let options = {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
};
mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://oyo:nikhil123@ds161042.mlab.com:61042/oyo', options);

mongoose.connect('mongodb://admin:admin123@ds137661.mlab.com:37661/property-db', options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('We\'re connected!');
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//Swagger UI
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');
// const swaggerDocument = require('./swagger.yaml');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
let optionsSwagger = {
  explorer: true
};
app.use('/v1', propertyRouter);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, optionsSwagger));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
