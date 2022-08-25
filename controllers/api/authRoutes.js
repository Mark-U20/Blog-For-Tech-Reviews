const router = require('express').Router();
const {loggedIn} = require('./helper');
const bcrypt = require('bcrypt');

const User = require('../../models/User');
const Post = require('../../models/Post');
//after logging in the user will be redirected to this route
router.get('/dashboard',loggedIn, async (req, res) => {
    //find all posts made by the user
    const posts = await Post.findAll({
        where: {
            user_id: req.session.user_id
        }
    });
    res.render('dashboard', {posts: posts});  
})

router.post('/register', async (req, res) => {

    console.log("testing if user is logged in for register");
    const {username} = req.body;
    const {password} = req.body;

    if(!username || !password){
        const error = "Please enter a username and password";
        res.render('register', {error});
    }
    else{
        const user = await User.findOne({
            where: {
                name: username
            }
        });
        if(user){
            const error = "Username already exists";
            res.render('register', {error});
        }
        else{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const newUser = await User.create({
                name: username,
                password: hash
            });
            req.session.user_id = newUser.id;
            res.redirect('/dashboard');
        }
    }

})






module.exports = router;