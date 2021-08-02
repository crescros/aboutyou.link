const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../utils');

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ success: true, msg: "You are successfully authenticated to this route!"});
});

router.post('/newentry', async (req, res, next) => {
    if(!req.headers.authorization)
        return res.sendStatus(401);
    if(!req.body.link || !req.body.name)
        return res.json({ success: false, msg: "no link/name has been given" });

    let token = utils.validateJWT(next, req.headers.authorization);
    let user = await User.findOne({ _id: token.sub });
    if(!user) return res.json({ success: false, msg: "no user has been found" });

    if(user.links.length >= 50)
        return res.json({ success: false, msg: "you can only have 50 links." });

    user.links.push({
        name: req.body.name,
        description: req.body.description ? req.body.description : "Default description",
        addedAt: Date.now(),
        link: req.body.link
    })

    user.save();

    return res.json({ success: true, links: user.links });
});

router.get('/get', async (req, res, next) => {
    if(!req.headers.authorization)
        return res.sendStatus(401);
    
    let token = utils.validateJWT(next, req.headers.authorization);
    let user = await User.findOne({ _id: token.sub });
    if(!user) return res.json({ success: false, msg: "no user has been found" });

    return res.json({ success: true, links: user.links });
});

router.patch('/edit/:linkid', async (req, res, next) => {
    if(!req.headers.authorization) return res.sendStatus(401);
    
    let token = utils.validateJWT(next, req.headers.authorization);
    let user = await User.findOne({ _id: token.sub });
    if(!user) {
        res.statusCode = 401;
        return res.json({ success: false, msg: "no user has been found" });
    }

    let editableFields = [
        "link",
        "name",
        "description"
    ];

    var result = Object.keys(req.body).map((key) => [String(key), req.body[key]]);

    result.forEach(r => {
        if(!editableFields.includes(r[0])) return;
        let link = user.links.find(elem => elem._id == req.params.linkid);
        link[r[0]] = r[1];
    });
         
    user.save();

    return res.json({ success: true, links: user.links });
});

router.delete("/:linkid", async (req, res, next) => {
    if(!req.headers.authorization)
        return res.sendStatus(401);
    
    let token = utils.validateJWT(next, req.headers.authorization);
    let user = await User.findOne({ _id: token.sub });
    if(!user) return res.json({ success: false, msg: "no user has been found" });

    //user.links.filter(link => link._id === req.params.linkid);
    user.links = user.links.filter(link => link._id != req.params.linkid)
    user.save();

    return res.json({ success: true, links: user.links });
});

module.exports = router;