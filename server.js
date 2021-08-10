const express = require('express')
const mongoose = require('mongoose')
const postRouter = require('./routes/posts')
const app = express()

mongoose.connect('mongodb://localhost/retroblog', { useNewUrlParser: true, useUnifiedTopology: true })

app.set('view engine', 'ejs')

app.use('/posts', postRouter)

app.get('/', (req, res) => {
    const posts = [{
        title: 'Test Article',
        createdAt: new Date(),
        description: 'Test description'
    },

    {
        title: 'Test Article 2',
        createdAt: new Date(),
        description: 'Test description 2'
    }]
    res.render('posts/index', { posts: posts })
})

app.listen(3000)