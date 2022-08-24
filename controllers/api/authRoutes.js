const router = require('express').Router();
const {loggedIn} = require('./helper');

const User = require('../../models/User');
const Post = require('../../models/Post');
//after logging in the user will be redirected to this route
router.get('/dashboard',loggedIn, async (req, res) => {

    const posts = await Post.findAll();

    res.render('dashboard', {posts: posts});
})





module.exports = router;