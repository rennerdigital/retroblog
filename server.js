var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');
const express = require('express')
const mongoose = require('mongoose')
const Post = require('./models/post')
const postRouter = require('./routes/posts')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/retroblog', { useNewUrlParser: true, useUnifiedTopology: true })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const posts = await Post.find().sort({ createdAt: 'desc' })
    res.render('posts/index', { posts: posts })
})

app.use('/posts', postRouter)

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

app.listen(3000)