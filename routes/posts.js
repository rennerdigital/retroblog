const express = require('express')
const Post = require('./../models/post')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('posts/new', { post: new Post() })
})

router.get('/edit/:id', (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('/posts/edit', { post: new Post() })
})

router.get('/:id', async (req,res) => {
    const post = await Post.findById(req.params.id)
    if (post == null) res.redirect('/')
    res.render('posts/show', { post: post })
})

router.post('/', async (req, res) => {
    let post = new Post({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })
    try {
        post = await post.save()
        res.redirect(`/posts/${post.id}`)
    } catch (e) {
        console.log(e)
        res.render('posts/new', { post: post })
    }
})

router.delete('/:id', async (req,res) => {
    await Post.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router