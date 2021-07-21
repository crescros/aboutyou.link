const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../utils');

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ success: true, msg: "You are successfully authenticated to this route!"});
});

router.post('/login', function(req, res, next) {
    if(!req.body.username || !req.body.password)
        return res.json({ success: false, msg: "no username or password has been provided"});
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) {
                return res.json({ success: false, msg: "could not find user" });
            }
            
            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

            if (isValid) {
                const tokenObject = utils.issueJWT(user);
                res.set('Authorization', tokenObject.token);
                //res.setHeader('Authorization', tokenObject.token);
                res.json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
            } else {
                res.json({ success: false, msg: "you entered the wrong password" });
            }

        })
        .catch((err) => {
            next(err);
        });
});

router.post('/register', function(req, res, next) {
    if(!req.body.password || !req.body.username || !req.body.email)
        return res.json({ success: false, msg: "no password/email/name has been given" });

    const saltHash = utils.genPassword(req.body.password);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    try {

        User.findOne({ username: req.body.username })
        .then(async user => {
            if(user) {
                return res.json({ success: false, msg: "this user already exists"});
            } else {
                if(!utils.validateEmail(req.body.email))
                    return res.json({ success: false, msg: "an invalid email has been provided" });

                const newUser = new User({
                    username: req.body.username,
                    hash: hash,
                    salt: salt,
                    createdAt: Date.now(),
                    email: req.body.email,
                    isAdmin: 0,
                    reputation: 0,
                    verified: {
                        is: 0,
                        startDate: 0
                    },
                    links: [],
                    bio: "Hello! I'm new to aboutyou.link :)"
                });

                newUser.save()
                .then((user) => {
                    res.json({ success: true, user: user });
                });
            }
        });
    } catch (err) {
        res.json({ success: false, msg: err });
    }

});

router.get('/get', async function(req, res, next) {
    if(!req.body.user) return res.json({ success: false, msg: "no user id has been provided" });
    return res.json({ success: true, user: await User.findOne({ _id: req.body.user }) });
})

module.exports = router;