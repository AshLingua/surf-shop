const Post = require('../models/post');
const User = require('../models/user');
const passport = require('passport');
const mapBoxToken = process.env.MAPBOX_TOKEN;

module.exports = {
    // landing Page (map logic)
    async landingPage(req, res, next) {
        const posts = await Post.find({});
        // res.render('index', { posts, mapBoxToken, title: 'Surf Shop - Home' });
        // video 108: 9:29 has mapBoxToken: process.env.MAPBOX_TOKEN
        res.send('landing page!!')
    },

    // POST /register
    async postRegister(req, res, next) {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            image: req.body.image
        });

        await User.register(newUser, req.body.password);
        res.redirect('/');
    },
    // POST /login
    postLogin(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
        })(req, res, next);
    },
    // GET /logout
    getLogout(req, res, next) {
        req.logout();
        res.redirect('/');
    }
}