const express = require('express')
const Post = require('./../models/post')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('posts/new', { post: new Post() })
})

router.get('/edit/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('posts/edit', { post: post })
})

router.get('/:id', async (req,res) => {
    const post = await Post.findById(req.params.id)
    if (post == null) res.redirect('/')
    res.render('posts/show', { post: post })
})

router.post('/', async (req, res, next) => {
    req.post = new Post()
    next()
}, savePostAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
    req.post = await Post.findById(req.params.id)
    next()
}, savePostAndRedirect('edit'))

router.delete('/:id', async (req,res) => {
    await Post.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function savePostAndRedirect(path) {
    return async (req, res) => {
        let post = req.post
            post.title = req.body.title,
            post.description = req.body.description,
            post.markdown = req.body.markdown
        try {
            post = await post.save()
            res.redirect(`/posts/${post.id}`)
        } catch (e) {
            res.render(`posts/${path}`, { post: post })
        }
    }
}

module.exports = router