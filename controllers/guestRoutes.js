const router = require('express').Router();
const {loggedIn} = require('./api/helper');
const Post = require('../models/Post');
router.get('/', loggedIn, async (req, res) => {
    res.render('homepage');
});
//router for login page
router.get('/login',loggedIn, async (req, res) => {
    res.render('login');
});
router.get('/register',loggedIn, async (req, res) => {
    res.render('register');
});
router.get('/dashboard',loggedIn, async (req, res) => {
    
    const posts = await Post.findAll();

    if(posts){
        console.log("there are posts??.....");
        res.render('dashboard', {posts: posts});
    }
    else{
        res.render('dashboard');
    }
})
router.get('/homepage',loggedIn, async (req, res) => {

    // const posts = await Post.findAll();

    const posts = await Post.findAll();
    console.log(`posts: ${posts}`);

    if(posts.length > 0){
        console.log("there are posts??.....");
        res.render('homepage', {posts: posts});
    }
    else{
        res.render('homepage');
    }})



module.exports = router;