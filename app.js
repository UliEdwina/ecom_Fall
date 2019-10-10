
//needs work. I jave questions about some errors I've been getting. 
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users/users');



let app = express();


let expressValidator = require('express-validator');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

//expressValidor Not a function
app.use(expressValidator({
    errorFormatter: function(param, message, value) {
        let namespace = param.split('.');
        let root      = namespace.shift();
        let formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }

        return {
            param:   formParam,
            message: message,
            value:   value
        }
    }
}))

mongoose.connect('mongodb://localhost/05_19_ecommerce', 
                { useNewUrlParser: true, useUnifiedTopology: true })
        .then(   () => console.log('MongoDB Connected'))
        .catch( err => console.log(`MongoDB Error: ${err}`))


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
