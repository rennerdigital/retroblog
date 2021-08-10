const express = require('express')
const postRouter = require('./routes/posts')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000)